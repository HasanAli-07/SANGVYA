export interface W3CCredentialSubject {
  id: string; // e.g. "did:india:trainee:992837418234"
  traineeName: string;
  programmeCode: string;
  programmeTitle: string;
  institutionName: string;
  attendancePercentage: number;
  assessmentGrade: string;
  assessmentScore: number;
  competencies: string[];
  nosCodes: string[];
  creditHours: number;
}

export interface W3CProof {
  type: 'Ed25519Signature2020';
  created: string;
  verificationMethod: string; // e.g. "did:india:ncct:keys:master-2026#key-1"
  proofPurpose: 'assertionMethod';
  proofValue: string;
}

export interface VerifiableCredential {
  context: string[];
  id: string; // URN e.g. "urn:uuid:8f14b3d7-2194-4e4b-97e3-0d319e7a9c21"
  type: string[];
  issuer: string; // e.g. "did:india:ncct:vamnicom-pune"
  issuanceDate: string;
  credentialSubject: W3CCredentialSubject;
  proof: W3CProof;
  status: 'ACTIVE' | 'REVOKED';
  digilockerUri?: string;
  qrCodeSignatureHex: string;
}

export interface DigiLockerCallbackLog {
  id: string;
  endpointType: 'PUSH_URI' | 'PULL_URI';
  citizenUri: string;
  certificateUrn: string;
  httpStatus: 200 | 201 | 400 | 404;
  responsePayloadSizeKB: number;
  timestamp: string;
}

export interface SidhAbcRecord {
  traineeId: string;
  candidateName: string;
  apaarId: string;
  nosCode: string;
  ncvetCourseCode: string;
  creditsEarned: number;
  abcSyncStatus: 'SYNCED_TO_ABC' | 'PENDING_SYNC';
  syncedAt: string;
}
