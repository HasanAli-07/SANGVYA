"""
Timetable Resource Scheduling & Conflict Detection Engine
Module 1 (Section 1.4): Dynamic Timetabling & Conflict-Free Resource Scheduling
Checks:
    1. Trainer Conflict: Same trainer scheduled in multiple rooms at the same time.
    2. Venue Conflict: Same room scheduled for multiple batches at the same time.
"""

from typing import List, Dict, Any

class TimetableSchedulerEngine:
    def __init__(self, sessions: List[Dict[str, Any]]):
        self.sessions = sessions

    def detect_conflicts(self) -> List[Dict[str, Any]]:
        """Scans timetable sessions and flags any scheduling collisions."""
        analyzed_sessions = []
        
        for i, s1 in enumerate(self.sessions):
            session_copy = dict(s1)
            session_copy['hasConflict'] = False
            conflicts = []
            
            for j, s2 in enumerate(self.sessions):
                if i == j:
                    continue
                
                # Check overlapping day and time slot
                if s1.get('dayOfWeek') == s2.get('dayOfWeek') and s1.get('timeSlot') == s2.get('timeSlot'):
                    # Trainer collision
                    if s1.get('trainerName') == s2.get('trainerName'):
                        conflicts.append(f"Trainer Collision with batch '{s2.get('batchCode')}' (Trainer: {s1.get('trainerName')})")
                    
                    # Room collision
                    if s1.get('roomName') == s2.get('roomName'):
                        conflicts.append(f"Room Collision with batch '{s2.get('batchCode')}' (Room: {s1.get('roomName')})")
            
            if conflicts:
                session_copy['hasConflict'] = True
                session_copy['conflictDetails'] = " | ".join(conflicts)
                
            analyzed_sessions.append(session_copy)
            
        return analyzed_sessions

if __name__ == "__main__":
    test_sessions = [
        {
            "id": "sess-1",
            "batchCode": "PACS-BATCH-A",
            "trainerName": "Dr. V. K. Patil",
            "roomName": "Hall 101",
            "dayOfWeek": "Monday",
            "timeSlot": "09:00 - 10:30"
        },
        {
            "id": "sess-2",
            "batchCode": "BANK-BATCH-B",
            "trainerName": "Dr. V. K. Patil",
            "roomName": "Hall 102",
            "dayOfWeek": "Monday",
            "timeSlot": "09:00 - 10:30"
        }
    ]
    engine = TimetableSchedulerEngine(test_sessions)
    res = engine.detect_conflicts()
    import json
    print(json.dumps(res, indent=2))
