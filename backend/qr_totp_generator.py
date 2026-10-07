"""
Dynamic Geofenced TOTP QR Code Engine
Module 2 (Section 2.2): Geofenced Dynamic TOTP QR Code Verification
Formulation:
    Payload = BatchID || SessionID || T_k || HMAC_K(BatchID || SessionID || T_k)
    where T_k = floor(t_epoch / 15)  (15-second refresh window)
    Geofence Validation: Haversine distance <= 50 meters from training venue GPS/NavIC coordinates.
"""

import time
import hmac
import hashlib
import math
import json
from typing import Dict, Any, Tuple

class DynamicQrTotpEngine:
    def __init__(self, secret_key: str = "NCCT-SECRET-KEY-2026-PUNE"):
        self.secret_key = secret_key.encode('utf-8')

    def generate_totp_payload(self, batch_id: str, session_id: str, venue_coords: Tuple[float, float]) -> Dict[str, Any]:
        """Generates a 15-second refreshing TOTP payload signed via HMAC-SHA256."""
        current_time = int(time.time())
        time_step = current_time // 15
        expires_in = 15 - (current_time % 15)

        raw_data = f"{batch_id}:{session_id}:{time_step}".encode('utf-8')
        signature = hmac.new(self.secret_key, raw_data, hashlib.sha256).hexdigest()

        return {
            "batchId": batch_id,
            "sessionId": session_id,
            "timeStep": time_step,
            "signature": signature[:32], # Truncated HMAC signature
            "expiresInSeconds": expires_in,
            "geofenceVenue": {
                "latitude": venue_coords[0],
                "longitude": venue_coords[1],
                "maxRadiusMeters": 50.0
            }
        }

    @staticmethod
    def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculates geodesic distance in meters between two lat/lng coordinates."""
        R = 6371000.0 # Earth radius in meters
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlambda = math.radians(lon2 - lon1)

        a = math.sin(dphi / 2.0)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2.0)**2
        c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
        return R * c

    def verify_scanned_qr(
        self, 
        scanned_payload: Dict[str, Any], 
        user_coords: Tuple[float, float], 
        venue_coords: Tuple[float, float]
    ) -> Dict[str, Any]:
        """Verifies QR code expiration, HMAC signature, and 50m geofence coordinates."""
        current_time = int(time.time())
        current_step = current_time // 15
        scanned_step = scanned_payload.get("timeStep", 0)

        # 1. Time step validity (allow current step or previous 1 step for latency tolerance)
        if abs(current_step - scanned_step) > 1:
            return {
                "status": "REJECTED_EXPIRED_QR",
                "reason": "QR code expired (must scan within 15 seconds)",
                "verified": False
            }

        # 2. Signature verification
        batch_id = scanned_payload.get("batchId", "")
        session_id = scanned_payload.get("sessionId", "")
        expected_raw = f"{batch_id}:{session_id}:{scanned_step}".encode('utf-8')
        expected_sig = hmac.new(self.secret_key, expected_raw, hashlib.sha256).hexdigest()[:32]

        if not hmac.compare_digest(scanned_payload.get("signature", ""), expected_sig):
            return {
                "status": "REJECTED_INVALID_SIGNATURE",
                "reason": "HMAC-SHA256 signature mismatch (tampered payload)",
                "verified": False
            }

        # 3. Geofence check
        distance_meters = self.haversine_distance(
            user_coords[0], user_coords[1],
            venue_coords[0], venue_coords[1]
        )

        if distance_meters > 50.0:
            return {
                "status": "REJECTED_OUTSIDE_GEOFENCE",
                "reason": f"Device location is {round(distance_meters, 1)}m away from venue (max allowed: 50m)",
                "verified": False,
                "distanceMeters": round(distance_meters, 1)
            }

        return {
            "status": "ATTENDANCE_MARKED_QR",
            "verified": True,
            "distanceMeters": round(distance_meters, 1),
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

if __name__ == "__main__":
    pune_vamnicom = (18.5204, 73.8567)
    engine = DynamicQrTotpEngine()
    
    # Generate TOTP payload
    payload = engine.generate_totp_payload("BATCH-PACS-OCT-01", "sess-01", pune_vamnicom)
    print("Generated Payload:", json.dumps(payload, indent=2))
    
    # Test valid scan within 20 meters
    user_location = (18.5205, 73.8568) # ~15 meters away
    res = engine.verify_scanned_qr(payload, user_location, pune_vamnicom)
    print("Verification Result:", json.dumps(res, indent=2))
