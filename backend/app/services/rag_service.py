from __future__ import annotations

import re
import math
from typing import Any
from collections import Counter

class RAGRetrieverService:
    @staticmethod
    def chunk_text(text: str, chunk_size: int = 400, overlap: int = 80) -> list[str]:
        words = text.split()
        if not words:
            return []
        chunks = []
        i = 0
        while i < len(words):
            chunk = " ".join(words[i:i + chunk_size])
            chunks.append(chunk)
            i += (chunk_size - overlap)
            if i >= len(words) - overlap and i < len(words):
                break
        return chunks

    @staticmethod
    def search_chunks(query: str, chunks: list[dict[str, Any]], top_k: int = 4) -> list[dict[str, Any]]:
        query_terms = re.findall(r'\w+', query.lower())
        if not query_terms:
            return chunks[:top_k]

        query_counts = Counter(query_terms)
        scored_chunks = []

        for chunk in chunks:
            chunk_text = chunk.get("chunk_text", "").lower()
            chunk_words = re.findall(r'\w+', chunk_text)
            chunk_counts = Counter(chunk_words)

            # Fast BM25 / TF-IDF approximation
            score = 0.0
            for term, q_weight in query_counts.items():
                tf = chunk_counts.get(term, 0)
                if tf > 0:
                    score += (1 + math.log(tf)) * q_weight

            # Exact phrase bonus
            if query.lower() in chunk_text:
                score += 10.0

            scored_chunks.append((score, chunk))

        scored_chunks.sort(key=lambda x: x[0], reverse=True)
        return [item[1] for item in scored_chunks[:top_k] if item[0] > 0] or chunks[:top_k]
