"""
AI Multi-Factor Candidate-Job Semantic Matcher Engine
Module 6 (Section 6.2): AI-Assisted Candidate-Job Semantic Matching Engine
SRS Formulation:
    S(c, j) = w_skill * S_semantic(v_c, v_j) + w_cert * C(c, j) + w_exp * E(c, j) + w_geo * G(c, j)
    where:
        w_skill = 0.35, w_cert = 0.30, w_exp = 0.15, w_geo = 0.20 (Normalized sum = 1.0)
        G(c, j) = exp(-\lambda * d(c, j))  with decay constant \lambda = 0.02, d in kilometers
"""

import math
import json
from typing import List, Dict, Any, Tuple

class SemanticJobMatcherEngine:
    def __init__(
        self,
        w_skill: float = 0.35,
        w_cert: float = 0.30,
        w_exp: float = 0.15,
        w_geo: float = 0.20,
        lambda_decay: float = 0.02
    ):
        self.w_skill = w_skill
        self.w_cert = w_cert
        self.w_exp = w_exp
        self.w_geo = w_geo
        self.lambda_decay = lambda_decay

    @staticmethod
    def haversine_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculates distance d in kilometers between candidate and workplace."""
        R = 6371.0 # Earth radius in km
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlambda = math.radians(lon2 - lon1)

        a = math.sin(dphi / 2.0)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2.0)**2
        c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
        return R * c

    def compute_match_score(
        self,
        candidate_skills: List[str],
        job_skills: List[str],
        candidate_certs: List[str],
        job_required_certs: List[str],
        candidate_exp_years: float,
        job_min_exp_years: float,
        candidate_coords: Tuple[float, float],
        job_coords: Tuple[float, float]
    ) -> Dict[str, Any]:
        """Calculates multi-factor candidate match score S(c, j) and component factors."""
        # 1. Semantic Skill Match S_semantic (Jaccard/Cosine overlap)
        cand_set = set([s.lower() for s in candidate_skills])
        job_set = set([s.lower() for s in job_skills])
        overlap = cand_set.intersection(job_set)
        s_semantic = len(overlap) / len(job_set) if job_set else 1.0

        # 2. Certification Match Factor C(c, j)
        cand_cert_set = set([c.lower() for c in candidate_certs])
        req_cert_set = set([c.lower() for c in job_required_certs])
        cert_overlap = cand_cert_set.intersection(req_cert_set)
        c_cert = len(cert_overlap) / len(req_cert_set) if req_cert_set else 1.0

        # 3. Experience Match Factor E(c, j)
        if job_min_exp_years <= 0:
            e_exp = 1.0
        else:
            e_exp = min(1.0, candidate_exp_years / job_min_exp_years)

        # 4. Geographic Distance Decay G(c, j) = exp(-\lambda * d)
        d_km = self.haversine_distance_km(
            candidate_coords[0], candidate_coords[1],
            job_coords[0], job_coords[1]
        )
        g_geo = math.exp(-self.lambda_decay * d_km)

        # Total Weighted Score S(c, j)
        s_total = (
            self.w_skill * s_semantic +
            self.w_cert * c_cert +
            self.w_exp * e_exp +
            self.w_geo * g_geo
        )

        return {
            "totalMatchScore": round(min(s_total, 1.0), 4),
            "semanticSkillScore": round(s_semantic, 4),
            "certificationScore": round(c_cert, 4),
            "experienceScore": round(e_exp, 4),
            "geographicScore": round(g_geo, 4),
            "distanceKm": round(d_km, 2),
            "explanation": f"Score breakdown: Skill Match={round(s_semantic*100, 1)}%, Certs Verified={round(c_cert*100, 1)}%, Experience={round(e_exp*100, 1)}%, Distance={round(d_km, 1)}km (Geographic Decay={round(g_geo, 3)})"
        }

if __name__ == "__main__":
    engine = SemanticJobMatcherEngine()
    
    # Candidate & Job Test
    candidate_skills = ["PACS Accounting", "CAS Ledger Reconciliation", "MIS Reporting"]
    job_skills = ["PACS Accounting", "CAS Ledger Reconciliation", "MIS Reporting"]
    
    candidate_certs = ["PACS-CAS-2026"]
    job_required_certs = ["PACS-CAS-2026"]
    
    res = engine.compute_match_score(
        candidate_skills=candidate_skills,
        job_skills=job_skills,
        candidate_certs=candidate_certs,
        job_required_certs=job_required_certs,
        candidate_exp_years=2.0,
        job_min_exp_years=1.0,
        candidate_coords=(18.5250, 73.8580), # Pune
        job_coords=(18.5204, 73.8567)        # ~0.5 km away
    )
    
    print("Multi-Factor Job Match Score Result:")
    print(json.dumps(res, indent=2))
