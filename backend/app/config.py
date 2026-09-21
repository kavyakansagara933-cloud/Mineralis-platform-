from __future__ import annotations

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
STORAGE_DIR = BASE_DIR / "storage"
UPLOADS_DIR = STORAGE_DIR / "uploads"
UPLOAD_DIR = UPLOADS_DIR
EXPORTS_DIR = STORAGE_DIR / "exports"
PAGES_DIR = STORAGE_DIR / "pages"
DB_PATH = STORAGE_DIR / "mining_platform.db"

STORAGE_DIR.mkdir(parents=True, exist_ok=True)
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
EXPORTS_DIR.mkdir(parents=True, exist_ok=True)
PAGES_DIR.mkdir(parents=True, exist_ok=True)

DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{DB_PATH}")

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434")
PRIMARY_AI_MODEL = os.getenv("PRIMARY_AI_MODEL", "phi4-mini")
FALLBACK_AI_MODEL = os.getenv("FALLBACK_AI_MODEL", "llama3.2:3b")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "nomic-embed-text")

CONFIDENCE_HIGH_THRESHOLD = 85
CONFIDENCE_MEDIUM_THRESHOLD = 65
