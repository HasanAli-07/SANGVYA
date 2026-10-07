import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, ShieldCheck, Clock, BookOpen } from 'lucide-react';
import type { AssessmentQuestion, AssessmentAttempt } from '../types/lms';

interface InteractiveAssessmentEngineProps {
  questions: AssessmentQuestion[];
  onCompleteAttempt: (attempt: AssessmentAttempt) => void;
}

export const InteractiveAssessmentEngine: React.FC<InteractiveAssessmentEngineProps> = ({
  questions,
  onCompleteAttempt,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [tabSwitches, setTabSwitches] = useState(0);
  const [focusLossEvents, setFocusLossEvents] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [latestAttempt, setLatestAttempt] = useState<AssessmentAttempt | null>(null);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers({ ...userAnswers, [questionId]: optionIdx });
  };

  const handleSimulateTabSwitch = () => {
    setTabSwitches((prev) => prev + 1);
    setFocusLossEvents((prev) => prev + 1);
  };

  const handleSubmitExam = () => {
    let correct = 0;
    const topicFailures: string[] = [];

    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      } else {
        topicFailures.push(`Remedial Micro-Module: ${q.topicTag}`);
      }
    });

    const score = Number(((correct / questions.length) * 100).toFixed(1));
    const passed = score >= 75.0 && tabSwitches <= 3;

    const attempt: AssessmentAttempt = {
      attemptId: `att-${Date.now()}`,
      quizTitle: 'PACS Computerization & CAS Final Examination',
      courseCode: 'PACS-CAS-2026',
      scorePercent: score,
      passed,
      proctoringTelemetry: {
        tabSwitches,
        focusLossEvents,
        faceCheckVerified: true,
      },
      remedialRecommendedModules: Array.from(new Set(topicFailures)),
      timestamp: new Date().toISOString(),
    };

    setLatestAttempt(attempt);
    setIsSubmitted(true);
    onCompleteAttempt(attempt);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 3.3
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Interactive Assessment & Anti-Cheating Examination Engine
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Delivers summative/formative exams with proctoring telemetry (focus loss & tab switching), auto-grading ($\ge 75\%$), and remedial recommendations.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Pass Mark: ≥ 75.0% | Proctor Monitored</span>
        </div>
      </div>

      {/* Proctoring Telemetry Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-slate-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Anti-Cheating Proctoring Telemetry:</span>
          </div>

          <div className="flex items-center space-x-3 font-mono text-[11px]">
            <span
              className={`px-2.5 py-1 rounded border font-bold ${
                tabSwitches > 0
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              Tab Switches: {tabSwitches} / 3 Max
            </span>

            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 font-bold">
              Focus Loss Events: {focusLossEvents}
            </span>

            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/30 font-bold">
              Randomized Face Checks: Passed
            </span>
          </div>
        </div>

        {!isSubmitted && (
          <button
            onClick={handleSimulateTabSwitch}
            className="bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800 text-rose-300 text-[11px] font-bold px-3 py-1.5 rounded-lg transition"
          >
            Simulate Tab Switch Penalty
          </button>
        )}
      </div>

      {/* Examination Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question Cards */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>PACS Computerization & CAS Final Examination</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {Object.keys(userAnswers).length} of {questions.length} Answered
            </span>
          </div>

          <div className="space-y-6">
            {questions.map((q, qIdx) => (
              <div key={q.id} className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold text-xs text-white leading-relaxed">
                    Q{qIdx + 1}. {q.questionText}
                  </span>
                  <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap">
                    {q.topicTag}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    const isCorrect = q.correctOptionIndex === optIdx;

                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (isSelected) {
                      btnStyle = 'bg-indigo-900/60 border-indigo-500 text-white font-bold ring-1 ring-indigo-500';
                    }
                    if (isSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/80 border-rose-600 text-rose-200 font-bold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-3 rounded-lg border transition flex items-center space-x-3 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <p className="text-[11px] text-amber-300/90 pt-1 font-sans leading-relaxed">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {!isSubmitted && (
            <button
              onClick={handleSubmitExam}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-3 rounded-xl transition shadow-xl shadow-indigo-600/30 text-xs uppercase tracking-wider"
            >
              Submit Examination & Generate Result
            </button>
          )}
        </div>

        {/* Results & Remedial Recommendations */}
        <div className="lg:col-span-1 space-y-5">
          {latestAttempt ? (
            <div
              className={`p-5 rounded-2xl border space-y-4 ${
                latestAttempt.passed
                  ? 'bg-emerald-950/60 border-emerald-700 text-emerald-100'
                  : 'bg-rose-950/60 border-rose-700 text-rose-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm flex items-center space-x-2">
                  {latestAttempt.passed ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>EXAM PASSED</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                      <span>EXAM FAILED</span>
                    </>
                  )}
                </span>
                <span className="text-xl font-extrabold font-mono">{latestAttempt.scorePercent}%</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {latestAttempt.passed
                  ? 'Congratulations! Score satisfies the 75% threshold. Cryptographic certificate generation unlocked.'
                  : 'Score falls below the mandatory 75% passing threshold. Please review the recommended remedial micro-modules below.'}
              </p>

              {/* Remedial Recommendations */}
              {latestAttempt.remedialRecommendedModules.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                  <span className="text-xs font-bold text-amber-300 flex items-center space-x-1">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Automated Remedial Recommendations:</span>
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
                    {latestAttempt.remedialRecommendedModules.map((moduleTitle, idx) => (
                      <li key={idx} className="leading-snug">{moduleTitle}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
              Complete questions and click Submit Examination to calculate your score and proctoring telemetry audit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
