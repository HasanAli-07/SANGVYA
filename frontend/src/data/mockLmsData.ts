import type { LmsLessonModule, AssessmentQuestion, AssessmentAttempt, XApiStatement } from '../types/lms';

export const INITIAL_LMS_MODULES: LmsLessonModule[] = [
  {
    id: 'mod-101',
    courseCode: 'PACS-CAS-2026',
    title: 'Module 1: Introduction to PACS Computerization & Common Accounting System',
    contentType: 'SCORM_2004',
    durationMinutes: 45,
    downloadSizeMB: 18.5,
    isDownloadedOffline: true,
    contentUrl: '/courses/pacs_cas_mod1.zip',
    nosMapping: 'NOS-PACS-ACC-01',
    translations: {
      Hindi: 'पैक्स संगणकीकरण और सामान्य लेखा प्रणाली (CAS) का परिचय',
      Marathi: 'पॅक्स संगणकीकरण आणि सामायिक लेखा प्रणाली परिचय',
      Kannada: 'ಪ್ರಾಥಮಿಕ ಕೃಷಿ ಪತ್ತಿನ ಸಹಕಾರ ಸಂಘಗಳ ಗಣಕೀಕರಣ ಪರಿಚಯ',
      Tamil: 'தொடக்க வேளாண்மை கூட்டுறவு சங்க கணினிமயமாக்கல் அறிமுகம்',
      Telugu: 'ప్రాధమిక వ్యవసాయ సహకార పరపతి సంఘాల కంప్యూటరీకరణ పరిచయం',
    },
  },
  {
    id: 'mod-102',
    courseCode: 'PACS-CAS-2026',
    title: 'Module 2: CAS Day-Book & Ledger Reconciliation Masterclass',
    contentType: 'HTML5_INTERACTIVE',
    durationMinutes: 60,
    downloadSizeMB: 24.0,
    isDownloadedOffline: false,
    contentUrl: '/courses/cas_daybook.html',
    nosMapping: 'NOS-PACS-ACC-02',
    translations: {
      Hindi: 'CAS रोजकी और खाता बही समाधान मास्टरक्लास',
      Marathi: 'CAS रोजकीर्द आणि खतावणी मेळ मास्टरक्लास',
      Kannada: 'ದೈನಂದಿನ ಖಾತೆ ಪುಸ್ತಕ ಮತ್ತು ಲೆಡ್ಜರ್ ಸಮನ್ವಯ',
      Tamil: 'CAS தினசரி புத்தகம் மற்றும் லெட்ஜர் சரிபார்ப்பு',
      Telugu: 'CAS దినచర్య పుస్తకం మరియు లెడ్జర్ సరిపోలిక',
    },
  },
  {
    id: 'mod-103',
    courseCode: 'DAIRY-FED-201',
    title: 'Audio Lecture: Milk Collection Testing & Fat/SNF Pricing Rules',
    contentType: 'AUDIO_MICRO_LECTURE',
    durationMinutes: 20,
    downloadSizeMB: 8.2,
    isDownloadedOffline: true,
    contentUrl: '/audio/milk_testing_rules.opus',
    nosMapping: 'NOS-AGRI-MILK-02',
    translations: {
      Hindi: 'ऑडियो व्याख्यान: दुग्ध संग्रह परीक्षण और फैट/एसएनएफ मूल्य निर्धारण नियम',
      Marathi: 'ऑडिओ व्याख्यान: दूध संकलन चाचणी आणि फॅट/एसएनएफ नियम',
      Kannada: 'ಹಾಲು ಸಂಗ್ರಹಣೆ ಪರೀಕ್ಷೆ ಮತ್ತು ಫ್ಯಾಟ್ ನಿಯಮಗಳು',
    },
  }
];

export const SAMPLE_QUESTION_BANK: AssessmentQuestion[] = [
  {
    id: 'q-101',
    questionText: 'Under the standardized Common Accounting System (CAS) for PACS, how frequently must day-book entries be reconciled with ledger accounts?',
    options: [
      'Daily before shift end',
      'Weekly on Saturdays',
      'Monthly during board meeting',
      'Annually at audit'
    ],
    correctOptionIndex: 0,
    topicTag: 'CAS Ledger Reconciliation',
    explanation: 'CAS mandates daily end-of-day reconciliation of day-book transactions to maintain audit-compliant ledgers.',
  },
  {
    id: 'q-102',
    questionText: 'What is the primary function of the National Occupational Standard (NOS) code assigned to NCCT cooperative training courses?',
    options: [
      'To calculate tax deductions',
      'To standardize skill competency frameworks across national databases (SIDH)',
      'To set hostel bed quotas',
      'To determine meal stipends'
    ],
    correctOptionIndex: 1,
    topicTag: 'NOS Competency Mapping',
    explanation: 'NOS codes align training outcomes with national occupational standards registered under MSDE and SIDH.',
  },
  {
    id: 'q-103',
    questionText: 'In offline mobile LMS synchronization, which data structure prevents state progress rollbacks during reconnection?',
    options: [
      'Conflict-Free Replicated Data Types (CRDTs) & Lamport Timestamps',
      'Simple FIFO Stack',
      'Unsigned Cookies',
      'Local Storage Clear'
    ],
    correctOptionIndex: 0,
    topicTag: 'Offline Sync Architecture',
    explanation: 'Lamport timestamps and monotonic CRDTs ensure state updates merge monotonically without overwriting newer offline logs.',
  }
];

export const INITIAL_ASSESSMENT_ATTEMPTS: AssessmentAttempt[] = [
  {
    attemptId: 'att-801',
    quizTitle: 'PACS Computerization Final Certification Examination',
    courseCode: 'PACS-CAS-2026',
    scorePercent: 86.6,
    passed: true,
    proctoringTelemetry: {
      tabSwitches: 0,
      focusLossEvents: 0,
      faceCheckVerified: true,
    },
    remedialRecommendedModules: [],
    timestamp: '2026-10-07T10:00:00Z',
  }
];

export const INITIAL_XAPI_STATEMENTS: XApiStatement[] = [
  {
    id: 'xapi-001',
    actor: { name: 'Ramesh Kumar Patel', mbox: 'mailto:ramesh.p@khedpacs.org' },
    verb: { id: 'http://adlnet.gov/expapi/verbs/completed', display: 'completed' },
    object: { id: 'http://ncct.ac.in/courses/mod-101', definition: { name: 'PACS CAS Introduction SCORM Module' } },
    result: { score: { scaled: 1.0 }, completion: true, duration: 'PT45M' },
    timestamp: '2026-10-07T09:45:00Z',
    lamportTimestamp: 110,
  }
];
