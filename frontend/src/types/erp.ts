export type InstitutionTier = 'APEX' | 'RICM' | 'ICM' | 'JCTC';

export interface Institution {
  id: string;
  name: string;
  code: string;
  location: string;
  state: string;
  tier: InstitutionTier;
  capacity: number;
  hostelBeds: number;
  activeBatches: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  sector: 'PACS Computerization' | 'Cooperative Banking' | 'Dairy & Agriculture' | 'Cyber Security' | 'Governance';
  durationHours: number;
  creditHours: number;
  nosCode: string; // National Occupational Standard code
  languages: string[];
  intakeLimit: number;
  eligibility: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
}

export type ApplicationStatus = 
  | 'SUBMITTED' 
  | 'SPONSOR_VERIFIED' 
  | 'UNDER_REVIEW' 
  | 'ACCEPTED' 
  | 'WAITLISTED' 
  | 'ENROLLED' 
  | 'REJECTED';

export interface CandidateNomination {
  id: string;
  sponsoringSociety: string;
  societyRegistrationId: string;
  candidateName: string;
  aadhaarHash: string; // SHA-256 of Aadhaar
  phone: string;
  email: string;
  district: string;
  state: string;
  courseId: string;
  submittedAt: string;
  status: ApplicationStatus;
  isDuplicate?: boolean;
}

export interface TimetableSession {
  id: string;
  batchId: string;
  batchCode: string;
  courseTitle: string;
  trainerName: string;
  roomName: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  timeSlot: '09:00 - 10:30' | '10:45 - 12:15' | '13:30 - 15:00' | '15:15 - 16:45';
  hasConflict?: boolean;
  conflictDetails?: string;
}

export interface HostelRoom {
  id: string;
  wing: 'Block A (Male)' | 'Block B (Female)' | 'Executive Wing';
  roomNumber: string;
  capacity: number;
  occupied: number;
  genderQuota: 'MALE' | 'FEMALE' | 'ANY';
  assignedTraineeIds: string[];
  maintenanceStatus: 'AVAILABLE' | 'UNDER_MAINTENANCE' | 'FULL';
}

export interface MessLog {
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  plannedCount: number;
  actualCount: number;
  specialDietCount: number;
  estimatedCostINR: number;
}
