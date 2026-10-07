import type { VerifiableCredential, DigiLockerCallbackLog, SidhAbcRecord } from '../types/credentials';

export const INITIAL_CREDENTIALS: VerifiableCredential[] = [
  {
    context: [
      'https://www.w3.org/2018/credentials/v1',
      'https://schema.ncct.ac.in/v1'
    ],
    id: 'urn:uuid:8f14b3d7-2194-4e4b-97e3-0d319e7a9c21',
    type: ['VerifiableCredential', 'CooperativeSkillCertificate'],
    issuer: 'did:india:ncct:vamnicom-pune',
    issuanceDate: '2026-10-07T10:00:00Z',
    credentialSubject: {
      id: 'did:india:trainee:992837418234',
      traineeName: 'Ramesh Kumar Patel',
      programmeCode: 'PACS-CAS-2026',
      programmeTitle: 'PACS Computerization and Common Accounting System',
      institutionName: 'Vaikunth Mehta National Institute of Cooperative Management (VAMNICOM)',
      attendancePercentage: 92.5,
      assessmentGrade: 'A',
      assessmentScore: 86.6,
      competencies: ['PACS Accounting', 'CAS Ledger Reconciliation', 'MIS Reporting', 'Audit Compliance'],
      nosCodes: ['NOS-PACS-ACC-01', 'NOS-PACS-ACC-02'],
      creditHours: 4,
    },
    proof: {
      type: 'Ed25519Signature2020',
      created: '2026-10-07T10:05:00Z',
      verificationMethod: 'did:india:ncct:keys:master-2026#key-1',
      proofPurpose: 'assertionMethod',
      proofValue: 'z3h8A1x9B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6a7B8c9D0e1F2g3H4i5J6k7L8m9N0o5P6q7',
    },
    status: 'ACTIVE',
    digilockerUri: 'in.gov.ncct.cert.2026.8f14b3d7',
    qrCodeSignatureHex: '3045022100a9b8c7d6e5f4e3d2c1b0a9876543210123456789abcdef0220112233445566778899aabbccddeeff00',
  },
  {
    context: [
      'https://www.w3.org/2018/credentials/v1',
      'https://schema.ncct.ac.in/v1'
    ],
    id: 'urn:uuid:5c10294e-981a-4f2b-881c-1a2b3c4d5e6f',
    type: ['VerifiableCredential', 'CooperativeSkillCertificate'],
    issuer: 'did:india:ncct:ricm-bengaluru',
    issuanceDate: '2026-10-06T14:30:00Z',
    credentialSubject: {
      id: 'did:india:trainee:887766554433',
      traineeName: 'Priya Sharma',
      programmeCode: 'DAIRY-FED-201',
      programmeTitle: 'Milk Union Procurement & Quality Management',
      institutionName: 'Regional Institute of Cooperative Management (RICM Bengaluru)',
      attendancePercentage: 88.0,
      assessmentGrade: 'A+',
      assessmentScore: 92.0,
      competencies: ['Milk Testing & Quality Control', 'Cold Chain Logistics', 'Societal Audit'],
      nosCodes: ['NOS-AGRI-MILK-02'],
      creditHours: 2,
    },
    proof: {
      type: 'Ed25519Signature2020',
      created: '2026-10-06T14:35:00Z',
      verificationMethod: 'did:india:ncct:keys:master-2026#key-2',
      proofPurpose: 'assertionMethod',
      proofValue: 'z7k8L9m0N1o2P3q4R5s6T7u8V9w0X1y2Z3a4B5c6D7e8F9g0H1i2J3k4L5m6N7o8P9q0R1s2T3u4V5w6X7y8Z9a0B1c2D3',
    },
    status: 'ACTIVE',
    digilockerUri: 'in.gov.ncct.cert.2026.5c10294e',
    qrCodeSignatureHex: '304402201a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b02209988776655443322',
  }
];

export const INITIAL_DIGILOCKER_LOGS: DigiLockerCallbackLog[] = [
  {
    id: 'log-dl-001',
    endpointType: 'PUSH_URI',
    citizenUri: 'in.gov.digilocker.user.987654321',
    certificateUrn: 'urn:uuid:8f14b3d7-2194-4e4b-97e3-0d319e7a9c21',
    httpStatus: 201,
    responsePayloadSizeKB: 3.4,
    timestamp: '2026-10-07T10:06:00Z',
  },
  {
    id: 'log-dl-002',
    endpointType: 'PULL_URI',
    citizenUri: 'in.gov.digilocker.user.987654321',
    certificateUrn: 'urn:uuid:8f14b3d7-2194-4e4b-97e3-0d319e7a9c21',
    httpStatus: 200,
    responsePayloadSizeKB: 14.8,
    timestamp: '2026-10-07T10:12:30Z',
  }
];

export const INITIAL_SIDH_ABC_RECORDS: SidhAbcRecord[] = [
  {
    traineeId: 'nom-101',
    candidateName: 'Ramesh Kumar Patel',
    apaarId: 'APAAR-IND-2026-992188',
    nosCode: 'NOS-PACS-ACC-01',
    ncvetCourseCode: 'PACS-CAS-2026',
    creditsEarned: 4,
    abcSyncStatus: 'SYNCED_TO_ABC',
    syncedAt: '2026-10-07T10:15:00Z',
  },
  {
    traineeId: 'nom-102',
    candidateName: 'Priya Sharma',
    apaarId: 'APAAR-IND-2026-882211',
    nosCode: 'NOS-AGRI-MILK-02',
    ncvetCourseCode: 'DAIRY-FED-201',
    creditsEarned: 2,
    abcSyncStatus: 'SYNCED_TO_ABC',
    syncedAt: '2026-10-06T14:40:00Z',
  }
];
