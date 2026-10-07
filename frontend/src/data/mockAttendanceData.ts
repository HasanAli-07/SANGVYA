import type { BiometricTemplate, AttendanceRecord, DynamicQrPayload, AttendanceException } from '../types/attendance';

// Helper to generate a dummy 512-dimensional normalized vector (L2 norm = 1)
const generateNormalized512Vector = (seed: number): number[] => {
  const vec = Array.from({ length: 512 }, (_, i) => Math.sin(seed + i * 0.1));
  const norm = Math.sqrt(vec.reduce((acc, val) => acc + val * val, 0));
  return vec.map((v) => Number((v / norm).toFixed(4)));
};

export const INITIAL_FACE_TEMPLATES: BiometricTemplate[] = [
  {
    templateId: 'tmpl-101',
    traineeId: 'nom-101',
    candidateName: 'Ramesh Kumar Patel',
    embeddingVector: generateNormalized512Vector(1.0),
    algorithmTag: 'MobileFaceNet-ArcFace-v2',
    livenessScore: 0.996,
    updatedAt: '2026-10-01T09:00:00Z',
  },
  {
    templateId: 'tmpl-102',
    traineeId: 'nom-102',
    candidateName: 'Priya Sharma',
    embeddingVector: generateNormalized512Vector(2.5),
    algorithmTag: 'MobileFaceNet-ArcFace-v2',
    livenessScore: 0.998,
    updatedAt: '2026-10-01T09:15:00Z',
  },
  {
    templateId: 'tmpl-103',
    traineeId: 'nom-103',
    candidateName: 'Sunil Deshmukh',
    embeddingVector: generateNormalized512Vector(4.2),
    algorithmTag: 'MobileFaceNet-ArcFace-v2',
    livenessScore: 0.992,
    updatedAt: '2026-10-01T09:30:00Z',
  }
];

export const INITIAL_ATTENDANCE_LOGS: AttendanceRecord[] = [
  {
    recordId: 'rec-001',
    batchId: 'BATCH-PACS-OCT-01',
    batchCode: 'PACS-BATCH-A',
    traineeId: 'nom-101',
    candidateName: 'Ramesh Kumar Patel',
    sessionId: 'sess-01',
    recordedAt: '2026-10-07T09:02:15Z',
    method: 'FACE_RECOGNITION',
    similarityScore: 0.892,
    livenessVerified: true,
    deviceId: 'KIOSK-ICM-AHM-002',
    syncStatus: 'SYNCED',
    lamportTimestamp: 104,
  },
  {
    recordId: 'rec-002',
    batchId: 'BATCH-PACS-OCT-01',
    batchCode: 'PACS-BATCH-A',
    traineeId: 'nom-102',
    candidateName: 'Priya Sharma',
    sessionId: 'sess-01',
    recordedAt: '2026-10-07T09:04:30Z',
    method: 'DYNAMIC_QR',
    geofenceVerified: true,
    deviceId: 'M-APP-AND-9921',
    syncStatus: 'SYNCED',
    lamportTimestamp: 105,
  },
  {
    recordId: 'rec-003',
    batchId: 'BATCH-BANK-OCT-02',
    batchCode: 'BANK-BATCH-B',
    traineeId: 'nom-103',
    candidateName: 'Sunil Deshmukh',
    sessionId: 'sess-03',
    recordedAt: '2026-10-07T09:15:00Z',
    method: 'FACE_RECOGNITION',
    similarityScore: 0.875,
    livenessVerified: true,
    deviceId: 'KIOSK-ICM-AHM-002',
    syncStatus: 'BUFFERED_OFFLINE',
    lamportTimestamp: 106,
  }
];

export const INITIAL_QR_PAYLOAD: DynamicQrPayload = {
  batchId: 'BATCH-PACS-OCT-01',
  sessionId: 'sess-01',
  timeStep: Math.floor(Date.now() / 1000 / 15),
  hmacSignature: 'c4b9281a6dfb48ae94a219273c5bb201e51f8a846c4f039a',
  expiresInSeconds: 15,
  geofenceCenter: { lat: 18.5204, lng: 73.8567, radiusMeters: 50 }, // Pune VAMNICOM coordinates
};

export const INITIAL_EXCEPTIONS: AttendanceException[] = [
  {
    id: 'exc-101',
    recordId: 'rec-999',
    traineeId: 'nom-104',
    candidateName: 'Vijay Singh',
    batchCode: 'PACS-BATCH-A',
    requestedBy: 'Prof. Ananya Iyer',
    reasonCategory: 'TECHNICAL_FAIL',
    justificationNotes: 'Edge Kiosk camera lens smudge caused false rejection (FRR). Physical identity verified via Aadhaar original ID card.',
    status: 'PENDING_APPROVAL',
    timestamp: '2026-10-07T09:30:00Z',
  }
];
