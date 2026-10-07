"""
Interactive Assessment & Anti-Cheating Engine
Module 3 (Section 3.3): Interactive Assessment & Anti-Cheating Examination Engine
Features:
    1. Automated Scoring: Passing score threshold >= 75%.
    2. Proctoring Telemetry: Focus loss & tab switching tracking.
    3. Automated Remedial Recommendations: Suggests specific micro-modules for incorrect topics.
"""

import json
import time
from typing import List, Dict, Any

class AssessmentProctoringEngine:
    def __init__(self, passing_threshold: float = 75.0):
        self.passing_threshold = passing_threshold

    def evaluate_examination(
        self, 
        questions: List[Dict[str, Any]], 
        user_answers: Dict[str, int], 
        proctoring_telemetry: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Evaluates quiz attempt, checks proctoring telemetry, and generates remedial links."""
        total_questions = len(questions)
        correct_count = 0
        topic_failures = []
        
        for q in questions:
            q_id = q['id']
            correct_idx = q['correctOptionIndex']
            user_idx = user_answers.get(q_id)
            
            if user_idx == correct_idx:
                correct_count += 1
            else:
                topic_failures.append({
                    "questionId": q_id,
                    "topicTag": q.get("topicTag", "General"),
                    "remedialModule": f"Remedial Micro-Module for {q.get('topicTag')}"
                })

        score_percent = round((correct_count / total_questions) * 100.0, 1) if total_questions > 0 else 0.0
        passed_score = score_percent >= self.passing_threshold
        
        # Proctoring audit
        tab_switches = proctoring_telemetry.get("tabSwitches", 0)
        focus_loss = proctoring_telemetry.get("focusLossEvents", 0)
        proctoring_passed = tab_switches <= 3 and focus_loss <= 5

        final_pass = passed_score and proctoring_passed

        remedial_links = list(set([tf["remedialModule"] for tf in topic_failures]))

        return {
            "attemptId": f"att-{int(time.time())}",
            "scorePercent": score_percent,
            "passingThreshold": self.passing_threshold,
            "scorePassed": passed_score,
            "proctoringPassed": proctoring_passed,
            "finalPass": final_pass,
            "proctoringTelemetry": {
                "tabSwitches": tab_switches,
                "focusLossEvents": focus_loss,
                "status": "CLEAN" if proctoring_passed else "SUSPICIOUS_ACTIVITY_FLAGGED"
            },
            "topicFailuresCount": len(topic_failures),
            "remedialRecommendations": remedial_links,
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

if __name__ == "__main__":
    test_questions = [
        {"id": "q-1", "correctOptionIndex": 0, "topicTag": "CAS Day-Book Reconciliation"},
        {"id": "q-2", "correctOptionIndex": 1, "topicTag": "NOS Competency Framework"},
        {"id": "q-3", "correctOptionIndex": 0, "topicTag": "CRDT Monotonic Sync"}
    ]
    test_answers = {"q-1": 0, "q-2": 1, "q-3": 2} # 2 out of 3 correct = 66.7% (Fail)
    test_telemetry = {"tabSwitches": 1, "focusLossEvents": 0}
    
    engine = AssessmentProctoringEngine()
    res = engine.evaluate_examination(test_questions, test_answers, test_telemetry)
    print(json.dumps(res, indent=2))
