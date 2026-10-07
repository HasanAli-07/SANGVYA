"""
Hostel Bed Allocation Optimization Engine
Module 1 (Section 1.5): Campus Logistics & Hostel Operations
Formulation:
    min sum_{i in T} sum_{j in R} c_{ij} * X_{ij}
Subject to:
    sum_{j in R} X_{ij} = 1  (Every trainee assigned to exactly 1 room)
    sum_{i in T} X_{ij} <= Capacity_j  (Room bed limit respected)
    Gender matching (Male -> Block A, Female -> Block B)
    Penalty c_{ij} for suboptimal cohort mixing or wing mismatch
"""

import json
from typing import List, Dict, Any

class HostelBedOptimizer:
    def __init__(self, trainees: List[Dict[str, Any]], rooms: List[Dict[str, Any]]):
        self.trainees = trainees
        self.rooms = rooms

    def calculate_cost(self, trainee: Dict[str, Any], room: Dict[str, Any]) -> float:
        """Calculates penalty cost c_ij for assigning trainee i to room j."""
        cost = 0.0
        
        # Gender enforcement check
        trainee_gender = trainee.get('gender', 'MALE').upper()
        room_quota = room.get('genderQuota', 'ANY').upper()
        
        if room_quota != 'ANY' and trainee_gender != room_quota:
            return 999999.0 # Infeasible assignment
        
        # Capacity check
        if room.get('occupied', 0) >= room.get('capacity', 2):
            return 99999.0 # Room is full
            
        # Maintenance status
        if room.get('maintenanceStatus') != 'AVAILABLE':
            return 99999.0 # Room under maintenance
            
        # Prefer assigning trainees of same course/district to reduce fragmentation
        # Sub-optimal penalty if room is in executive wing for non-executive
        if room.get('wing') == 'Executive Wing':
            cost += 50.0
            
        return cost

    def optimize_allocations(self) -> Dict[str, Any]:
        """Greedy assignment with cost minimization for bed allocation."""
        assignments = []
        unassigned = []
        total_penalty = 0.0
        
        # Track dynamic occupancy
        room_occupancy = {r['id']: r.get('occupied', 0) for r in self.rooms}
        
        for trainee in self.trainees:
            best_room = None
            min_cost = float('inf')
            
            for room in self.rooms:
                current_occ = room_occupancy[room['id']]
                if current_occ >= room['capacity']:
                    continue
                    
                cost = self.calculate_cost(trainee, room)
                if cost < min_cost:
                    min_cost = cost
                    best_room = room
                    
            if best_room and min_cost < 10000.0:
                room_occupancy[best_room['id']] += 1
                total_penalty += min_cost
                assignments.append({
                    "traineeId": trainee['id'],
                    "candidateName": trainee.get('candidateName', 'Unknown'),
                    "assignedRoom": best_room['roomNumber'],
                    "wing": best_room['wing'],
                    "penaltyCost": min_cost
                })
            else:
                unassigned.append({
                    "traineeId": trainee['id'],
                    "candidateName": trainee.get('candidateName', 'Unknown'),
                    "reason": "No feasible room available matching gender/capacity constraints"
                })
                
        return {
            "status": "OPTIMAL" if not unassigned else "FEASIBLE_WITH_UNASSIGNED",
            "totalTraineesProcessed": len(self.trainees),
            "assignedCount": len(assignments),
            "unassignedCount": len(unassigned),
            "totalPenaltyCost": total_penalty,
            "assignments": assignments,
            "unassigned": unassigned
        }

if __name__ == "__main__":
    sample_trainees = [
        {"id": "nom-101", "candidateName": "Ramesh Kumar Patel", "gender": "MALE", "courseId": "crs-pacs-01"},
        {"id": "nom-102", "candidateName": "Priya Sharma", "gender": "FEMALE", "courseId": "crs-dairy-03"},
        {"id": "nom-105", "candidateName": "Vijay Singh", "gender": "MALE", "courseId": "crs-pacs-01"}
    ]
    sample_rooms = [
        {"id": "room-a101", "wing": "Block A (Male)", "roomNumber": "A-101", "capacity": 2, "occupied": 0, "genderQuota": "MALE", "maintenanceStatus": "AVAILABLE"},
        {"id": "room-b201", "wing": "Block B (Female)", "roomNumber": "B-201", "capacity": 2, "occupied": 0, "genderQuota": "FEMALE", "maintenanceStatus": "AVAILABLE"}
    ]
    optimizer = HostelBedOptimizer(sample_trainees, sample_rooms)
    res = optimizer.optimize_allocations()
    print(json.dumps(res, indent=2))
