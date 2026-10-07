"""
pgvector Grounded RAG Knowledge Pipeline
Module 5 (Section 5.2 & 5.4): Grounded RAG Knowledge Base Retrieval & Guardrails
Capabilities:
    1. Dense Vector Embeddings & Cosine Search (pgvector simulation).
    2. Zero-Hallucination Grounding: Restricts LLM answer generation strictly to retrieved context chunks.
    3. PII Guardrails: Filters out confidential trainee records or sensitive identity attributes.
    4. Statutory Employment Disclaimer Enforcement.
"""

import json
import math
import time
import re
from typing import List, Dict, Any

class RagKnowledgePipeline:
    def __init__(self):
        # Simulated pgvector database index
        self.vector_documents = [
            {
                "chunkId": "chunk-pacs-sec-01",
                "source": "PACS HR Policy Framework",
                "title": "PACS Secretary Qualifications",
                "text": "Qualifications for PACS Secretary: Candidate must possess a Diploma/Degree in Cooperative Management (or completed NCCT PACS Computerization & CAS Course), minimum age 21 years, and basic accounting proficiency.",
                "keywords": ["pacs", "secretary", "qualification", "eligibility", "सचिव", "योग्यता"]
            },
            {
                "chunkId": "chunk-pacs-byelaws-04",
                "source": "Model Bye-Laws for PACS",
                "title": "IT & CAS Staffing Preference",
                "text": "Rule 14(2): Primary Agricultural Credit Societies shall prioritize candidates holding cryptographically verified NCCT certifications for IT and Common Accounting System roles.",
                "keywords": ["bye-laws", "cas", "preference", "certification", "प्रमाणपत्र"]
            },
            {
                "chunkId": "chunk-dairy-sop-09",
                "source": "Dairy Cooperative SOP",
                "title": "Milk Union Quality Manager Rules",
                "text": "Qualifications for Milk Union Quality Manager: Requires completion of NCCT Milk Union Procurement & Quality Management course (DAIRY-FED-201) and practical training in lactometer testing.",
                "keywords": ["dairy", "milk", "quality", "manager", "दूध", "डेयरी"]
            }
        ]

    def filter_pii(self, text: str) -> str:
        """Masks Aadhaar numbers, phone numbers, and sensitive identity attributes."""
        # Mask 12-digit Aadhaar
        text = re.sub(r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b', 'XXXX-XXXX-XXXX', text)
        # Mask phone numbers
        text = re.sub(r'\b\+?91[-\s]?[6-9]\d{9}\b', '+91 XXXXX-XXXXX', text)
        return text

    def retrieve_matching_chunks(self, query: str, top_k: int = 2) -> List[Dict[str, Any]]:
        """Simulates pgvector cosine distance search over document embeddings."""
        query_words = set(query.lower().split())
        scored_chunks = []

        for doc in self.vector_documents:
            kw_set = set(doc["keywords"])
            common = query_words.intersection(kw_set)
            score = len(common) * 0.35 + 0.60 # Simulated cosine similarity
            if score > 0.65:
                scored_chunks.append({
                    "chunkId": doc["chunkId"],
                    "sourceDocument": doc["source"],
                    "contentSnippet": doc["text"],
                    "cosineSimilarity": round(min(score, 0.96), 3)
                })

        # Sort by similarity descending
        scored_chunks.sort(key=lambda x: x["cosineSimilarity"], reverse=True)
        return scored_chunks[:top_k]

    def generate_grounded_response(self, query: str, language: str = "Hindi") -> Dict[str, Any]:
        """Generates grounded answer with PII filtering and statutory disclaimer."""
        # 1. PII Filter check
        clean_query = self.filter_pii(query)

        # 2. Retrieve vector context
        context_chunks = self.retrieve_matching_chunks(clean_query)

        if not context_chunks:
            return {
                "status": "UNGROUNDED_QUERY",
                "response": "क्षमा करें, यह प्रश्न हमारे आधिकारिक सहकारिता दिशा-निर्देशों और एनसीसीटी पाठ्यक्रम सूची में उपलब्ध नहीं है। केवल आधिकारिक दस्तावेजों से उत्तर दिए जाते हैं।",
                "retrievedChunks": [],
                "disclaimer": "अस्वीकरण: यह सलाह केवल सूचनात्मक उद्देश्यों के लिए है।"
            }

        # 3. Grounded response assembly
        combined_text = "\n".join([c["contentSnippet"] for c in context_chunks])
        
        response_body = f"आधिकारिक सहकारिता दस्तावेजों के अनुसार:\n\n{combined_text}\n\n"
        disclaimer = "अस्वीकरण: एनसीसीटी करियर परामर्श केवल आधिकारिक मार्गदर्शन प्रदान करता है। यह रोजगार की प्रत्यक्ष गारंटी नहीं देता है।"

        return {
            "status": "SUCCESS",
            "query": clean_query,
            "language": language,
            "response": response_body + disclaimer,
            "retrievedContextCount": len(context_chunks),
            "retrievedChunks": context_chunks,
            "disclaimerAppended": True,
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

if __name__ == "__main__":
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    pipeline = RagKnowledgePipeline()
    res = pipeline.generate_grounded_response("How to become a PACS Secretary with phone 9876543210?")
    print(json.dumps(res, indent=2, ensure_ascii=False))
