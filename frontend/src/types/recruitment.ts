export type SocietyType = 'PACS' | 'DCCB' | 'STATE_COOP_BANK' | 'MILK_UNION' | 'FPO' | 'FISHERIES_FEDERATION';

export type PipelineStage = 
  | 'APPLIED' 
  | 'SHORTLISTED' 
  | 'INTERVIEW_SCHEDULED' 
  | 'OFFERED' 
  | 'PLACED' 
  | 'REJECTED';

export interface JobPosting {
  jobId: string;
  recruiterId: string;
  societyName: string;
  societyType: SocietyType;
  societyRegId: string;
  title: string;
  requiredSkills: string[];
  requiredCourseCodes: string[];
  minExperienceYears: number;
  district: string;
  state: string;
  lat: number;
  lng: number;
  vacanciesCount: number;
  salaryMinINR: number;
  salaryMaxINR: number;
  postedAt: string;
  status: 'OPEN' | 'CLOSED';
}

export interface MatchScoreBreakdown {
  totalMatchScore: number; // S(c, j) in [0, 1]
  semanticSkillScore: number; // S_semantic
  certificationScore: number; // C(c, j)
  experienceScore: number; // E(c, j)
  geographicScore: number; // G(c, j) = exp(-0.02 * distance)
  distanceKm: number;
  explanation: string;
}

export interface CandidateTalentProfile {
  candidateId: string;
  traineeName: string;
  phoneMasked: string;
  emailMasked: string;
  phoneActual?: string;
  emailActual?: string;
  isContactInfoRevealed: boolean;
  district: string;
  state: string;
  lat: number;
  lng: number;
  skills: string[];
  verifiedCertificates: {
    courseCode: string;
    courseTitle: string;
    grade: string;
    certificateUrn: string;
  }[];
  experienceYears: number;
  matchBreakdown?: MatchScoreBreakdown;
  currentPipelineStage?: PipelineStage;
}

export interface NcsJobImport {
  ncsJobId: string;
  jobTitle: string;
  employerName: string;
  location: string;
  vacancies: number;
  syncedAt: string;
}
