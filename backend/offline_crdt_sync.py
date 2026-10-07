"""
Offline Buffer & Monotonic CRDT Sync Engine
Module 2 (Section 2.3): Offline Buffer Management & Delta Sync Engine
Formulation:
    State_server = max(State_server, State_client)
    Monotonic Lamport Timestamp reconciliation for offline local buffer sync.
"""

import time
import json
from typing import List, Dict, Any

class MonotonicCrdtSyncEngine:
    def __init__(self, server_state: List[Dict[str, Any]] = None):
        self.server_state = {item['recordId']: item for item in (server_state or [])}
        self.current_lamport_clock = max([item.get('lamportTimestamp', 0) for item in (server_state or [])] or [100])

    def sync_offline_batch(self, offline_records: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Processes offline JSON transaction batches from edge terminals.
        Applies monotonic merge based on Lamport timestamps.
        """
        processed_records = 0
        merged_new = 0
        conflicts_resolved = 0
        
        for client_rec in offline_records:
            processed_records += 1
            rec_id = client_rec['recordId']
            client_clock = client_rec.get('lamportTimestamp', 0)
            
            if rec_id not in self.server_state:
                # New record from offline buffer
                client_rec['syncStatus'] = 'SYNCED'
                self.server_state[rec_id] = client_rec
                merged_new += 1
            else:
                # Conflict resolution: compare Lamport timestamps
                existing_rec = self.server_state[rec_id]
                existing_clock = existing_rec.get('lamportTimestamp', 0)
                
                if client_clock > existing_clock:
                    client_rec['syncStatus'] = 'SYNCED'
                    self.server_state[rec_id] = client_rec
                    conflicts_resolved += 1
                    
            # Advance logical clock
            self.current_lamport_clock = max(self.current_lamport_clock, client_clock) + 1

        return {
            "status": "SYNC_SUCCESSFUL",
            "totalProcessed": processed_records,
            "mergedNewRecords": merged_new,
            "conflictsResolved": conflicts_resolved,
            "serverLamportClock": self.current_lamport_clock,
            "syncedStateCount": len(self.server_state),
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

if __name__ == "__main__":
    initial_server = [
        {"recordId": "rec-001", "candidateName": "Ramesh Kumar Patel", "lamportTimestamp": 104, "syncStatus": "SYNCED"}
    ]
    
    offline_batch = [
        {"recordId": "rec-002", "candidateName": "Priya Sharma", "lamportTimestamp": 105, "syncStatus": "BUFFERED_OFFLINE"},
        {"recordId": "rec-003", "candidateName": "Sunil Deshmukh", "lamportTimestamp": 106, "syncStatus": "BUFFERED_OFFLINE"}
    ]
    
    engine = MonotonicCrdtSyncEngine(initial_server)
    res = engine.sync_offline_batch(offline_batch)
    print(json.dumps(res, indent=2))
