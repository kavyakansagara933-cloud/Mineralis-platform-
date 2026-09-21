# Frontend API Contract

Base URL during local development: `http://127.0.0.1:8000/api`

| Frontend screen | Endpoint | Purpose |
|---|---|---|
| Overview | `GET /dashboard` | KPIs, trend points, mine table, alerts |
| Documents | `GET /documents` | Document library |
| Source viewer | `GET /documents/{id}` | Document fields and evidence |
| Upload | `POST /documents/upload` | Multipart upload; currently returns processing state |
| Assistant | `POST /assistant/ask` | `{ "question": "..." }` returns answer, calculations, evidence |
| Reports | `POST /reports/generate` | Generates report preview with cited metrics |

## Evidence object

```json
{
  "id": "ev-production-b",
  "document_id": "doc-march-2025",
  "document_name": "Synthetic_March_2025_Production_Report.pdf",
  "page_number": 12,
  "table_reference": "Table 4 — Production Performance",
  "snippet": "Mine B achieved 8.7 MT against a monthly target of 9.4 MT.",
  "confidence": 96
}
```

Every important frontend value should render its evidence beneath it or expose it through a **View Source** action.
