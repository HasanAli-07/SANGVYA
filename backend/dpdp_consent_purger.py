"""
DPDP Act 2023 Statutory Compliance & Merkle-Tree Audit Ledger Verification Script
SIH Problem Statement #26087 Subsystem Module 7
"""

import hashlib
import json
import sys
from datetime import datetime, timezone

# Ensure UTF-8 output on Windows terminal
sys.stdout.reconfigure(encoding='utf-8')

def compute_sha256(data: str) -> str:
    return hashlib.sha256(data.encode('utf-8')).hexdigest()

def simulate_dpdp_retention_purge():
    # Mock active citizen data consent store
    consent_store = [
        {
            "citizen_id": "CIT-MH-8821",
            "name": "Ramesh Kumar Patel",
            "consent_purpose": "PACS Computerization Training & Job Matcher",
            "aadhaar_sha256": compute_sha256("Aadhaar:998877665544"),
            "retention_days_remaining": 251,
            "biometrics_stored": True,
            "status": "ACTIVE"
        },
        {
            "citizen_id": "CIT-MH-1029",
            "name": "Priya Sharma",
            "consent_purpose": "Multilingual LMS Player",
            "aadhaar_sha256": compute_sha256("Aadhaar:887766554433"),
            "retention_days_remaining": 267,
            "biometrics_stored": True,
            "status": "ACTIVE"
        },
        {
            "citizen_id": "CIT-MH-0012",
            "name": "Anil Kumar Verma (Expired Consent)",
            "consent_purpose": "NCCT 2024 Legacy Certificate",
            "aadhaar_sha256": compute_sha256("Aadhaar:112233445566"),
            "retention_days_remaining": 0,
            "biometrics_stored": True,
            "status": "EXPIRED"
        }
    ]

    purged_records = []
    retained_records = []

    for record in consent_store:
        if record["retention_days_remaining"] <= 0 or record["status"] == "EXPIRED":
            # DPDP Sec 12 Cryptographic Purge: Wipe PII & Biometrics
            record["biometrics_stored"] = False
            record["aadhaar_sha256"] = "[PURGED_CRYPTOGRAM_ZEROED]"
            record["status"] = "PURGED_STATUTORY"
            record["purged_at"] = datetime.now(timezone.utc).isoformat()
            purged_records.append(record)
        else:
            retained_records.append(record)

    # Calculate Merkle Tree Root Hash for Cryptographic Audit Ledger
    block_hashes = [
        compute_sha256(json.dumps(r, sort_keys=True)) for r in (retained_records + purged_records)
    ]
    merkle_tree_root = compute_sha256("".join(block_hashes))

    result = {
        "statute": "Digital Personal Data Protection (DPDP) Act 2023 Section 12",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "totalRecordsProcessed": len(consent_store),
        "purgedRecordsCount": len(purged_records),
        "retainedRecordsCount": len(retained_records),
        "merkleTreeAuditRoot": merkle_tree_root,
        "certInNoticeDispatched": True if len(purged_records) > 0 else False,
        "purgedDetails": purged_records,
    }

    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    simulate_dpdp_retention_purge()
