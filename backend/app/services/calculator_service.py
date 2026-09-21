from __future__ import annotations

from typing import Any

class CalculatorService:
    @staticmethod
    def calculate_variance(actual: float, target: float) -> tuple[float, str]:
        if target == 0:
            return 0.0, "Target is 0; variance cannot be computed."
        variance = round(((actual - target) / target) * 100, 1)
        formula = f"({actual} - {target}) / {target} × 100 = {variance}%"
        return variance, formula

    @staticmethod
    def calculate_stripping_ratio(ob_removal_mcum: float, coal_prod_mt: float) -> tuple[float, str]:
        if coal_prod_mt == 0:
            return 0.0, "Production is 0; stripping ratio cannot be computed."
        ratio = round(ob_removal_mcum / coal_prod_mt, 2)
        formula = f"{ob_removal_mcum} M.Cu.M / {coal_prod_mt} MT = {ratio} Cu.M/Tonne"
        return ratio, formula

    @staticmethod
    def calculate_achievement_rate(actual: float, target: float) -> tuple[float, str]:
        if target == 0:
            return 0.0, "Target is 0; achievement rate cannot be computed."
        rate = round((actual / target) * 100, 1)
        formula = f"({actual} / {target}) × 100 = {rate}%"
        return rate, formula

    @staticmethod
    def audit_metric_integrity(metric: dict[str, Any]) -> dict[str, Any]:
        actual = metric.get("actual") or metric.get("actual_value", 0.0)
        target = metric.get("target") or metric.get("target_value")
        
        audit = {
            "verified": True,
            "anomalies": [],
            "formulas": []
        }

        if target is not None and target > 0:
            var, f_var = CalculatorService.calculate_variance(actual, target)
            achieve, f_ach = CalculatorService.calculate_achievement_rate(actual, target)
            audit["variance_percent"] = var
            audit["achievement_percent"] = achieve
            audit["formulas"].extend([f_var, f_ach])

            if var < -10.0:
                audit["anomalies"].append(f"Severe underperformance: {var}% below target.")
            elif var < -5.0:
                audit["anomalies"].append(f"Target missed by {abs(var)}%.")

        return audit
