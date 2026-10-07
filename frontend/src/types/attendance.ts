export interface BiometricTemplate {
  templateId: string;
  traineeId: string;
  candidateName: string;
  embeddingVector: number[]; // 512-dimensional normalized array
  algorithmTag: 'MobileFaceNet-ArcFace-v2';
  livenessScore: number; // e.g. 0.994
  updatedAt: string;
}

export type AttendanceMethod = 'FACE_RECOGNITION' | 'DYNAMIC_QR' | 'MANUAL_OVERRIDE';

export interface AttendanceRecord {
  recordId: string;
  batchId: string;
  batchCode: string;
  traineeId: string;
  candidateName: string;
  sessionId: string;
  recordedAt: string;
  method: AttendanceMethod;
  similarityScore?: number; // e.g. 0.892 for Face
  livenessVerified?: boolean;
  geofenceVerified?: boolean;
  deviceId: string;
  syncStatus: 'SYNCED' | 'BUFFERED_OFFLINE' | 'SYNC_FAILED';
  lamportTimestamp: number;
}

export interface DynamicQrPayload {
  batchId: string;
  sessionId: string;
  timeStep: number;
  hmacSignature: string;
  expiresInSeconds: number;
  geofenceCenter: { lat: number; lng: number; radiusMeters: number };
}

export interface AttendanceException {
  id: string;
  recordId?: string;
  traineeId: string;
  candidateName: string;
  batchCode: string;
  requestedBy: string;
  reasonCategory: 'MEDICAL' | 'TECHNICAL_FAIL' | 'FIELD_DUTY' | 'OTHER';
  justificationNotes: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  timestamp: string;
}
