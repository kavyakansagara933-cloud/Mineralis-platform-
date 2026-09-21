from __future__ import annotations

import re
from typing import Any
from .calculator_service import CalculatorService

SUBSIDIARIES = ["ECL", "BCCL", "CCL", "WCL", "SECL", "MCL", "NCL", "CMPDI", "NEC", "SCCL"]
COAL_GRADES = [f"G{i}" for i in range(1, 18)] + ["Steel-I", "Steel-II", "Washery-I", "Washery-II", "Washery-III", "Washery-IV", "Semi Coking-I"]

class MiningExtractorService:
    @staticmethod
    def extract_entities_from_pages(pages: list[dict[str, Any]], doc_id: str, doc_name: str) -> dict[str, Any]:
        extracted_metrics = []
        evidence_items = []
        alerts_generated = []
        subsidiary_found = "General"
        period_found = "FY 2024-25"

        for page in pages:
            page_num = page["page_number"]
            text = page.get("text", "")
            tables = page.get("tables", [])
            ocr_applied = page.get("ocr_applied", False)

            # Detect subsidiary
            for sub in SUBSIDIARIES:
                if re.search(r'\b' + sub + r'\b', text, re.IGNORECASE):
                    subsidiary_found = sub
                    break

            # Detect period / month / FY
            fy_match = re.search(r'(FY\s*20\d\d[-\s/]?\d\d|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+20\d\d)', text, re.IGNORECASE)
            if fy_match:
                period_found = fy_match.group(0).strip()

            # 1. Table Extraction Logic
            for table_idx, table in enumerate(tables, start=1):
                if not table or len(table) < 2:
                    continue
                header = [str(col).strip().lower() for col in table[0] if col is not None]
                header_str = " ".join(header)

                for row_idx, row in enumerate(table[1:], start=2):
                    if not row or not any(row):
                        continue
                    row_str = " ".join([str(c) for c in row if c is not None])
                    
                    # Check if row refers to a mine or subsidiary
                    mine_name = MiningExtractorService._detect_mine_name(row_str, default=f"Mine-P{page_num}-R{row_idx}")
                    numbers = [float(n) for n in re.findall(r'\b\d+(?:\.\d+)?\b', row_str)]

                    if len(numbers) >= 2 and any(k in header_str for k in ["target", "actual", "prod", "dispatch", "ob"]):
                        target_val = numbers[0]
                        actual_val = numbers[1] if len(numbers) > 1 else numbers[0]
                        
                        # Decide metric type
                        entity_type = "production"
                        unit = "MT"
                        if "dispatch" in header_str or "offtake" in header_str:
                            entity_type = "dispatch"
                        elif "ob" in header_str or "overburden" in header_str:
                            entity_type = "ob_removal"
                            unit = "M.Cu.M"

                        var_pct, f_str = CalculatorService.calculate_variance(actual_val, target_val)
                        confidence = 72 if ocr_applied else 96
                        review_status = "verified" if confidence >= 85 else "pending_review"

                        snippet = f"Table {table_idx} (Row {row_idx}): {row_str} | Headers: {header_str}"
                        ev_id = f"ev-{doc_id[-6:]}-p{page_num}-t{table_idx}-r{row_idx}"

                        evidence_items.append({
                            "id": ev_id,
                            "document_id": doc_id,
                            "document_name": doc_name,
                            "page_number": page_num,
                            "table_reference": f"Table {table_idx}",
                            "snippet": snippet,
                            "confidence": confidence
                        })

                        metric_obj = {
                            "id": f"metric-{doc_id[-6:]}-p{page_num}-m{row_idx}",
                            "document_id": doc_id,
                            "page_number": page_num,
                            "table_reference": f"Table {table_idx}",
                            "entity_type": entity_type,
                            "mine_name": mine_name,
                            "subsidiary": subsidiary_found,
                            "period": period_found,
                            "actual_value": actual_val,
                            "target_value": target_val,
                            "unit": unit,
                            "variance_percent": var_pct,
                            "confidence": confidence,
                            "review_status": review_status,
                            "source_snippet": snippet,
                            "evidence_id": ev_id
                        }
                        extracted_metrics.append(metric_obj)

                        # Generate alert if target missed significantly
                        if var_pct < -5.0:
                            alerts_generated.append({
                                "id": f"alt-{doc_id[-6:]}-p{page_num}-r{row_idx}",
                                "severity": "high" if var_pct < -10 else "medium",
                                "title": f"{mine_name} is {abs(var_pct)}% below target",
                                "detail": f"Actual {entity_type} was {actual_val} {unit} vs target {target_val} {unit} ({f_str}).",
                                "evidence_id": ev_id,
                                "document_id": doc_id,
                                "status": "active"
                            })

            # 2. Text-Based Pattern Extraction (Geological terms, Coal Grades, GCV)
            MiningExtractorService._extract_geological_and_quality(
                text, page_num, doc_id, doc_name, subsidiary_found, period_found,
                extracted_metrics, evidence_items, alerts_generated, ocr_applied
            )

        return {
            "subsidiary": subsidiary_found,
            "period": period_found,
            "metrics": extracted_metrics,
            "evidence": evidence_items,
            "alerts": alerts_generated
        }

    @staticmethod
    def _detect_mine_name(text: str, default: str) -> str:
        match = re.search(r'\b([A-Z][a-zA-Z0-9_-]+(?:\s+OCP|\s+UG|\s+Mine|\s+Colliery|\s+Project|\s+Block)?)\b', text)
        if match and match.group(1).lower() not in ["target", "actual", "total", "production", "dispatch", "month"]:
            return match.group(1)
        return default

    @staticmethod
    def _extract_geological_and_quality(
        text: str, page_num: int, doc_id: str, doc_name: str, subsidiary: str, period: str,
        metrics_list: list, evidence_list: list, alerts_list: list, ocr_applied: bool
    ):
        # Grade / GCV patterns
        gcv_match = re.search(r'(?:GCV|Calorific\s+Value)\s*[:=-]?\s*(\d{3,5})\s*(?:kcal/kg)?', text, re.IGNORECASE)
        if gcv_match:
            gcv_val = float(gcv_match.group(1))
            ev_id = f"ev-{doc_id[-6:]}-p{page_num}-gcv"
            snippet = gcv_match.group(0)
            confidence = 75 if ocr_applied else 95

            evidence_list.append({
                "id": ev_id,
                "document_id": doc_id,
                "document_name": doc_name,
                "page_number": page_num,
                "table_reference": "Text Section",
                "snippet": snippet,
                "confidence": confidence
            })
            metrics_list.append({
                "id": f"metric-{doc_id[-6:]}-p{page_num}-gcv",
                "document_id": doc_id,
                "page_number": page_num,
                "table_reference": "Text Section",
                "entity_type": "gcv",
                "mine_name": "Block Assessment",
                "subsidiary": subsidiary,
                "period": period,
                "actual_value": gcv_val,
                "target_value": None,
                "unit": "kcal/kg",
                "variance_percent": None,
                "confidence": confidence,
                "review_status": "verified" if confidence >= 85 else "pending_review",
                "source_snippet": snippet,
                "evidence_id": ev_id
            })

        # Reserve patterns (MT)
        res_match = re.search(r'(?:Mineable|Geological|Proved)\s+Reserves?\s*[:=-]?\s*(\d+(?:\.\d+)?)\s*(?:MT|Million\s+Tonnes)', text, re.IGNORECASE)
        if res_match:
            res_val = float(res_match.group(1))
            ev_id = f"ev-{doc_id[-6:]}-p{page_num}-res"
            snippet = res_match.group(0)
            confidence = 75 if ocr_applied else 95

            evidence_list.append({
                "id": ev_id,
                "document_id": doc_id,
                "document_name": doc_name,
                "page_number": page_num,
                "table_reference": "Geological Section",
                "snippet": snippet,
                "confidence": confidence
            })
            metrics_list.append({
                "id": f"metric-{doc_id[-6:]}-p{page_num}-res",
                "document_id": doc_id,
                "page_number": page_num,
                "table_reference": "Geological Section",
                "entity_type": "reserve",
                "mine_name": "Geological Block",
                "subsidiary": subsidiary,
                "period": period,
                "actual_value": res_val,
                "target_value": None,
                "unit": "MT",
                "variance_percent": None,
                "confidence": confidence,
                "review_status": "verified" if confidence >= 85 else "pending_review",
                "source_snippet": snippet,
                "evidence_id": ev_id
            })
