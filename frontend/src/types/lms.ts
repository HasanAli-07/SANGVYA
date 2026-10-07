export type ScheduledLanguage =
  | 'Hindi'
  | 'English'
  | 'Marathi'
  | 'Kannada'
  | 'Tamil'
  | 'Telugu'
  | 'Gujarati'
  | 'Bengali'
  | 'Odia'
  | 'Punjabi'
  | 'Malayalam'
  | 'Assamese';

export interface LmsLessonModule {
  id: string;
  courseCode: string;
  title: string;
  contentType: 'SCORM_2004' | 'HTML5_INTERACTIVE' | 'AUDIO_MICRO_LECTURE' | 'VIDEO_WEBM';
  durationMinutes: number;
  downloadSizeMB: number;
  isDownloadedOffline: boolean;
  contentUrl: string;
  translations: Record<string, string>; // Bhashini localized strings
  nosMapping: string;
}

export interface AssessmentQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  topicTag: string;
  explanation: string;
}

export interface AssessmentAttempt {
  attemptId: string;
  quizTitle: string;
  courseCode: string;
  scorePercent: number;
  passed: boolean; // >= 75%
  proctoringTelemetry: {
    tabSwitches: number;
    focusLossEvents: number;
    faceCheckVerified: boolean;
  };
  remedialRecommendedModules: string[];
  timestamp: string;
}

export interface XApiStatement {
  id: string;
  actor: { name: string; mbox: string };
  verb: { id: string; display: string };
  object: { id: string; definition: { name: string } };
  result?: { score?: { scaled: number }; completion?: boolean; duration?: string };
  timestamp: string;
  lamportTimestamp: number;
}
