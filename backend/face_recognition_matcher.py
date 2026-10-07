"""
Edge Facial Recognition & Anti-Spoofing Matcher Engine
Module 2 (Section 2.1): Edge Biometric Attendance & Anti-Spoofing
Formulation:
    Normalized vector: e in R^512, ||e||_2 = 1
    Cosine Similarity: S_cos(e_live, e_template) = e_live . e_template
    Matching Criteria: S_cos >= 0.68 (FAR <= 0.001%, FRR <= 1%)
    Liveness Check: Active Blink / Head-turn + Dual RGB+NIR texture score >= 0.99
    RAM Purging: Raw camera frames erased immediately after vector generation.
"""

import math
import time
import json
from typing import List, Dict, Any

class EdgeFaceRecognitionMatcher:
    def __init__(self, match_threshold: float = 0.68, liveness_threshold: float = 0.99):
        self.match_threshold = match_threshold
        self.liveness_threshold = liveness_threshold

    @staticmethod
    def normalize_vector(vec: List[float]) -> List[float]:
        """Ensures L2 norm ||e||_2 = 1."""
        norm = math.sqrt(sum(x * x for x in vec))
        if norm == 0:
            return vec
        return [x / norm for x in vec]

    @staticmethod
    def compute_cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
        """Computes dot product of normalized vectors."""
        if len(vec1) != len(vec2):
            raise ValueError("Vector dimensions must match (512-D required).")
        return sum(a * b for a, b in zip(vec1, vec2))

    def evaluate_liveness(self, rgb_frame_bytes: bytes, nir_frame_bytes: bytes) -> Dict[str, Any]:
        """
        Simulates dual RGB + Near-Infrared texture analysis & active blink detection.
        Immediately purges raw frame bytes from volatile memory (RAM).
        """
        # Simulate active feature evaluation
        texture_score = 0.995
        blink_detected = True
        
        # Immediate memory purge simulation
        del rgb_frame_bytes
        del nir_frame_bytes
        
        liveness_score = texture_score if blink_detected else 0.40
        return {
            "livenessScore": liveness_score,
            "passedLiveness": liveness_score >= self.liveness_threshold,
            "rawFramesPurgedFromRAM": True
        }

    def verify_attendance(
        self, 
        live_vector: List[float], 
        template_vector: List[float], 
        rgb_bytes: bytes = b'raw_rgb_data',
        nir_bytes: bytes = b'raw_nir_data'
    ) -> Dict[str, Any]:
        """Performs full biometric attendance verification pipeline."""
        # 1. Liveness check & RAM purge
        liveness_res = self.evaluate_liveness(rgb_bytes, nir_bytes)
        if not liveness_res["passedLiveness"]:
            return {
                "status": "REJECTED_LIVENESS_FAILED",
                "reason": "Anti-spoofing liveness check failed (Potential Presentation Attack)",
                "similarityScore": 0.0,
                "livenessScore": liveness_res["livenessScore"]
            }

        # 2. Vector normalization
        e_live = self.normalize_vector(live_vector)
        e_tmpl = self.normalize_vector(template_vector)

        # 3. Cosine similarity matching
        s_cos = self.compute_cosine_similarity(e_live, e_tmpl)
        is_matched = s_cos >= self.match_threshold

        return {
            "status": "ATTENDANCE_MARKED" if is_matched else "REJECTED_NO_MATCH",
            "isMatched": is_matched,
            "similarityScore": round(s_cos, 4),
            "matchThreshold": self.match_threshold,
            "livenessScore": liveness_res["livenessScore"],
            "rawFramesPurgedFromRAM": True,
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

if __name__ == "__main__":
    # Generate two 512-D test vectors
    vec_a = [math.sin(i * 0.1) for i in range(512)]
    vec_b = [math.sin(i * 0.1 + 0.05) for i in range(512)] # slightly noisy twin
    
    matcher = EdgeFaceRecognitionMatcher()
    res = matcher.verify_attendance(vec_a, vec_b)
    print(json.dumps(res, indent=2))
