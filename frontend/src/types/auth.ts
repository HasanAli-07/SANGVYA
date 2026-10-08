export type UserRole =
  | 'CENTRAL_MINISTRY_ADMIN'   // Role 1: Central Ministry / Apex Admin
  | 'INSTITUTE_DIRECTOR'        // Role 2: RICM/ICM Principal & Coordinator
  | 'PACS_SECRETARY'           // Role 3: PACS & Society Secretary
  | 'RURAL_TRAINEE'            // Role 4: Trainee / Candidate / Citizen
  | 'COOP_EMPLOYER';           // Role 5: Recruiter / Employer

export interface UserProfile {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  institutionId: string;
  institutionName: string;
  aadhaarHash?: string;
  registeredAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  jwtToken: string | null;
  tokenExpiresAt: string | null;
}

export interface JwtTokenPayload {
  sub: string;
  role: UserRole;
  inst: string;
  iat: number;
  exp: number;
}
