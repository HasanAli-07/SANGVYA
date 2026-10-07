export interface MisKpiMetrics {
  totalPacsComputerised: number;
  targetPacs: number;
  totalTraineesEnrolled: number;
  totalCertifiedCandidates: number;
  totalPlacements: number;
  overallPlacementRatePct: number;
  activeInstitutionsCount: number;
}

export interface RegionalSkillGapMetric {
  regionCode: string;
  regionName: string;
  instituteName: string;
  enrolledCount: number;
  certifiedCount: number;
  placedCount: number;
  demandSupplyGapRatio: number; // e.g. 1.4x demand
}

export interface DpdpConsentRecord {
  consentId: string;
  citizenAadhaarHash: string;
  traineeName: string;
  purpose: string;
  aadhaarConsentGranted: boolean;
  biometricConsentGranted: boolean;
  placementProfileConsentGranted: boolean;
  grantedAt: string;
  expiryDate: string;
  retentionDaysRemaining: number;
  status: 'ACTIVE' | 'REVOKED' | 'PURGED_EXPIRED';
}

export interface CertInIncidentReport {
  incidentId: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  incidentType: string;
  affectedSubsystem: string;
  detectedAt: string;
  reportedToCertInAt: string;
  status: 'CONTAINED' | 'INVESTIGATING' | 'CLOSED';
  remediationSummary: string;
}

export interface AuditLedgerBlock {
  blockIndex: number;
  timestamp: string;
  actionType: 'MARK_OVERRIDE' | 'VC_REVOCATION' | 'ROLE_ELEVATION' | 'CONSENT_PURGE';
  actorId: string;
  actorRole: string;
  previousHash: string;
  blockHash: string;
  details: string;
  isValid: boolean;
}

export interface MicroserviceHealth {
  serviceId: string;
  serviceName: string;
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  uptimePercentage: number;
  latencyMs: number;
  cpuUsagePct: number;
  memoryUsageMB: number;
  activeConnections: number;
  lastChecked: string;
}
