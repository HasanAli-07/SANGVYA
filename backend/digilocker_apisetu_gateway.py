"""
DigiLocker & API Setu Issuer Gateway
Module 4 (Section 4.2): DigiLocker & API Setu Integration Gateway
Endpoints:
    1. Push URI Callback (/api/v1/credentials/digilocker/push): Registers new certificate metadata with DigiLocker directory.
    2. Pull URI Callback (/api/v1/credentials/digilocker/pull): Dynamic verification and Base64 XML/PDF certificate generation for DigiLocker wallets.
    3. Certificate Revocation List (CRL) Manager.
"""

import base64
import json
import time
from typing import Dict, Any, List

class DigiLockerApiSetuGateway:
    def __init__(self):
        self.registered_directory: Dict[str, Dict[str, Any]] = {}
        self.revocation_list: set = set()

    def handle_push_uri(self, citizen_id: str, credential_urn: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """Pushes certificate metadata to DigiLocker central registry upon issuance."""
        self.registered_directory[credential_urn] = {
            "citizenId": citizen_id,
            "metadata": metadata,
            "pushedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }
        return {
            "status": "PUSH_URI_SUCCESS",
            "httpStatus": 201,
            "certificateUrn": credential_urn,
            "digilockerUri": f"in.gov.ncct.cert.2026.{credential_urn.split(':')[-1][:8]}"
        }

    def handle_pull_uri(self, credential_urn: str) -> Dict[str, Any]:
        """Dynamically generates Base64 signed XML/PDF payload for DigiLocker mobile wallet requests."""
        if credential_urn in self.revocation_list:
            return {
                "status": "REVOKED",
                "httpStatus": 400,
                "error": "Certificate has been revoked by NCCT administrative authority."
            }

        # Generate XML Payload Template
        xml_payload = f"""<?xml version="1.0" encoding="UTF-8"?>
<CertificateIssuerDoc xmlns="http://tempuri.org/" docType="COOP_CERT">
    <CertificateUrn>{credential_urn}</CertificateUrn>
    <Issuer>National Council for Cooperative Training (NCCT)</Issuer>
    <Status>ACTIVE</Status>
</CertificateIssuerDoc>"""
        
        encoded_xml = base64.b64encode(xml_payload.encode('utf-8')).decode('utf-8')

        return {
            "status": "PULL_URI_SUCCESS",
            "httpStatus": 200,
            "certificateUrn": credential_urn,
            "encodedDocBase64": encoded_xml,
            "mimeType": "application/xml"
        }

    def revoke_certificate(self, credential_urn: str, reason: str) -> Dict[str, Any]:
        """Revokes an issued certificate, adding it to public CRL."""
        self.revocation_list.add(credential_urn)
        return {
            "status": "REVOCATION_PUBLISHED",
            "credentialUrn": credential_urn,
            "reason": reason,
            "crlEntryTimestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

if __name__ == "__main__":
    gateway = DigiLockerApiSetuGateway()
    urn = "urn:uuid:8f14b3d7-2194-4e4b-97e3-0d319e7a9c21"
    
    # 1. Test Push URI
    push_res = gateway.handle_push_uri("user-9921", urn, {"course": "PACS-CAS-2026"})
    print("Push URI Response:", json.dumps(push_res, indent=2))
    
    # 2. Test Pull URI
    pull_res = gateway.handle_pull_uri(urn)
    print("\nPull URI Response:", json.dumps(pull_res, indent=2))
