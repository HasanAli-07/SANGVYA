import type { JobPosting, CandidateTalentProfile, NcsJobImport } from '../types/recruitment';

export const INITIAL_JOB_POSTINGS: JobPosting[] = [
  {
    jobId: 'job-101',
    recruiterId: 'rec-pacs-khed',
    societyName: 'Khed Primary Agricultural Credit Society',
    societyType: 'PACS',
    societyRegId: 'PACS-MH-PUNE-8842',
    title: 'PACS Senior Accountant & CAS Specialist',
    requiredSkills: ['PACS Accounting', 'CAS Ledger Reconciliation', 'MIS Reporting'],
    requiredCourseCodes: ['PACS-CAS-2026'],
    minExperienceYears: 1,
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.5204,
    lng: 73.8567,
    vacanciesCount: 2,
    salaryMinINR: 25000,
    salaryMaxINR: 35000,
    postedAt: '2026-10-01T10:00:00Z',
    status: 'OPEN',
  },
  {
    jobId: 'job-102',
    recruiterId: 'rec-dairy-baramati',
    societyName: 'Baramati Farmer Dairy Cooperative Union',
    societyType: 'MILK_UNION',
    societyRegId: 'MILK-MH-PUNE-1024',
    title: 'Milk Collection & Quality Control Supervisor',
    requiredSkills: ['Milk Testing & Quality Control', 'Cold Chain Logistics'],
    requiredCourseCodes: ['DAIRY-FED-201'],
    minExperienceYears: 0,
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.1506,
    lng: 74.5768,
    vacanciesCount: 3,
    salaryMinINR: 22000,
    salaryMaxINR: 28000,
    postedAt: '2026-10-03T11:30:00Z',
    status: 'OPEN',
  },
  {
    jobId: 'job-103',
    recruiterId: 'rec-pdccb-main',
    societyName: 'Pune District Central Cooperative Bank (DCCB)',
    societyType: 'DCCB',
    societyRegId: 'DCCB-MH-PUNE-0001',
    title: 'Branch Audit & Compliance Officer',
    requiredSkills: ['Cooperative Banking Audit', 'Compliance Checks', 'Cyber Security'],
    requiredCourseCodes: ['DCCB-AUDIT-102'],
    minExperienceYears: 2,
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.5314,
    lng: 73.8446,
    vacanciesCount: 1,
    salaryMinINR: 40000,
    salaryMaxINR: 55000,
    postedAt: '2026-10-05T09:15:00Z',
    status: 'OPEN',
  }
];

export const INITIAL_CANDIDATE_TALENT: CandidateTalentProfile[] = [
  {
    candidateId: 'cand-201',
    traineeName: 'Ramesh Kumar Patel',
    phoneMasked: '+91 987XXXX210',
    emailMasked: 'ramesh.p***@khedpacs.org',
    phoneActual: '+91 9876543210',
    emailActual: 'ramesh.p@khedpacs.org',
    isContactInfoRevealed: false,
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.5250,
    lng: 73.8580, // ~1.2 km away from Khed PACS
    skills: ['PACS Accounting', 'CAS Ledger Reconciliation', 'MIS Reporting', 'Audit Compliance'],
    verifiedCertificates: [
      {
        courseCode: 'PACS-CAS-2026',
        courseTitle: 'PACS Computerization & CAS',
        grade: 'A',
        certificateUrn: 'urn:uuid:8f14b3d7-2194-4e4b-97e3-0d319e7a9c21',
      }
    ],
    experienceYears: 2,
    currentPipelineStage: 'SHORTLISTED',
  },
  {
    candidateId: 'cand-202',
    traineeName: 'Priya Sharma',
    phoneMasked: '+91 981XXXX678',
    emailMasked: 'priya.s***@dairybaramati.in',
    phoneActual: '+91 9812345678',
    emailActual: 'priya.sharma@dairybaramati.in',
    isContactInfoRevealed: false,
    district: 'Baramati',
    state: 'Maharashtra',
    lat: 18.1520,
    lng: 74.5780, // ~0.3 km away from Baramati Dairy
    skills: ['Milk Testing & Quality Control', 'Cold Chain Logistics', 'Societal Audit'],
    verifiedCertificates: [
      {
        courseCode: 'DAIRY-FED-201',
        courseTitle: 'Milk Union Procurement & Quality Management',
        grade: 'A+',
        certificateUrn: 'urn:uuid:5c10294e-981a-4f2b-881c-1a2b3c4d5e6f',
      }
    ],
    experienceYears: 1,
    currentPipelineStage: 'INTERVIEW_SCHEDULED',
  },
  {
    candidateId: 'cand-203',
    traineeName: 'Sunil Deshmukh',
    phoneMasked: '+91 998XXXX655',
    emailMasked: 'sunil.d***@pdccbank.co.in',
    phoneActual: '+91 9988776655',
    emailActual: 'sunil.d@pdccbank.co.in',
    isContactInfoRevealed: false,
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.5300,
    lng: 73.8450, // ~0.2 km from DCCB Main
    skills: ['Cooperative Banking Audit', 'Compliance Checks', 'Cyber Security'],
    verifiedCertificates: [
      {
        courseCode: 'DCCB-AUDIT-102',
        courseTitle: 'District Central Cooperative Bank Audit',
        grade: 'A',
        certificateUrn: 'urn:uuid:7e384e6e-e76f-44cd-9cbb-1e5c27fe19d3',
      }
    ],
    experienceYears: 3,
    currentPipelineStage: 'APPLIED',
  }
];

export const INITIAL_NCS_JOBS: NcsJobImport[] = [
  {
    ncsJobId: 'NCS-2026-889921',
    jobTitle: 'Assistant Cooperative Accounts Officer',
    employerName: 'Maharashtra State Cooperative Bank',
    location: 'Mumbai, Maharashtra',
    vacancies: 5,
    syncedAt: '2026-10-07T08:00:00Z',
  }
];
