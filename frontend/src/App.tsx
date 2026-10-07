import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import type { ActiveModule, TabId } from './components/Sidebar';

// Module 1 Components
import { TenantManagement } from './components/TenantManagement';
import { CourseCatalog } from './components/CourseCatalog';
import { BulkNomination } from './components/BulkNomination';
import { TimetableScheduler } from './components/TimetableScheduler';
import { HostelMessOptimizer } from './components/HostelMessOptimizer';

// Module 2 Components
import { FaceVerificationKiosk } from './components/FaceVerificationKiosk';
import { DynamicQrAttendance } from './components/DynamicQrAttendance';
import { OfflineSyncManager } from './components/OfflineSyncManager';
import { AttendanceExceptions } from './components/AttendanceExceptions';

// Module 3 Components
import { MultilingualLmsPlayer } from './components/MultilingualLmsPlayer';
import { BhashiniVoiceConsole } from './components/BhashiniVoiceConsole';
import { InteractiveAssessmentEngine } from './components/InteractiveAssessmentEngine';
import { XApiProgressSync } from './components/XApiProgressSync';

// Module 4 Components
import { VerifiableCredentialCompiler } from './components/VerifiableCredentialCompiler';
import { DigiLockerGateway } from './components/DigiLockerGateway';
import { SidhCreditBridge } from './components/SidhCreditBridge';
import { PublicCertificateVerifier } from './components/PublicCertificateVerifier';

// Module 5 Components
import { IndicVoiceChatbot } from './components/IndicVoiceChatbot';
import { RagVectorInspector } from './components/RagVectorInspector';
import { ChatbotGuardrails } from './components/ChatbotGuardrails';

// Module 6 Components
import { RecruiterPortal } from './components/RecruiterPortal';
import { SemanticJobMatcher } from './components/SemanticJobMatcher';
import { TalentDiscoveryPrivacy } from './components/TalentDiscoveryPrivacy';
import { RecruitmentPipelineNcs } from './components/RecruitmentPipelineNcs';

// Module 7 Components
import { ExecutiveMisDashboards } from './components/ExecutiveMisDashboards';
import { DpdpStatutoryCompliance } from './components/DpdpStatutoryCompliance';
import { CryptographicAuditLedger } from './components/CryptographicAuditLedger';
import { SystemHealthMonitoring } from './components/SystemHealthMonitoring';

// Data Mocking
import {
  INITIAL_INSTITUTIONS,
  INITIAL_COURSES,
  INITIAL_NOMINATIONS,
  INITIAL_TIMETABLE,
  INITIAL_HOSTEL_ROOMS,
  INITIAL_MESS_LOGS,
} from './data/mockErpData';

import {
  INITIAL_FACE_TEMPLATES,
  INITIAL_ATTENDANCE_LOGS,
  INITIAL_QR_PAYLOAD,
  INITIAL_EXCEPTIONS,
} from './data/mockAttendanceData';

import {
  INITIAL_LMS_MODULES,
  SAMPLE_QUESTION_BANK,
  INITIAL_ASSESSMENT_ATTEMPTS,
  INITIAL_XAPI_STATEMENTS,
} from './data/mockLmsData';

import {
  INITIAL_CREDENTIALS,
  INITIAL_DIGILOCKER_LOGS,
  INITIAL_SIDH_ABC_RECORDS,
} from './data/mockCredentialData';

import {
  INITIAL_CHAT_MESSAGES,
  SAMPLE_VECTOR_KNOWLEDGE_BASE,
} from './data/mockChatbotData';

import {
  INITIAL_JOB_POSTINGS,
  INITIAL_CANDIDATE_TALENT,
  INITIAL_NCS_JOBS,
} from './data/mockRecruitmentData';

import {
  INITIAL_MIS_KPIS,
  INITIAL_SKILL_GAP_METRICS,
  INITIAL_DPDP_CONSENTS,
  INITIAL_CERTIN_INCIDENTS,
  INITIAL_AUDIT_BLOCKS,
  INITIAL_MICROSERVICE_HEALTH,
} from './data/mockAnalyticsData';

import type { Institution, Course, CandidateNomination, TimetableSession, HostelRoom } from './types/erp';
import type { AttendanceRecord, AttendanceException } from './types/attendance';
import type { LmsLessonModule, ScheduledLanguage, AssessmentAttempt, XApiStatement } from './types/lms';
import type { VerifiableCredential, DigiLockerCallbackLog, SidhAbcRecord } from './types/credentials';
import type { ChatMessage, VectorContextChunk } from './types/chatbot';
import type { JobPosting, CandidateTalentProfile, NcsJobImport, PipelineStage } from './types/recruitment';
import type {
  MisKpiMetrics,
  RegionalSkillGapMetric,
  DpdpConsentRecord,
  CertInIncidentReport,
  AuditLedgerBlock,
  MicroserviceHealth,
} from './types/analytics';

export function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('module7');
  const [activeTab, setActiveTab] = useState<TabId>('executive_mis');

  // Module 1 State
  const [institutions, setInstitutions] = useState<Institution[]>(INITIAL_INSTITUTIONS);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution>(INITIAL_INSTITUTIONS[0]);
  const [activeRole, setActiveRole] = useState<string>('Central Ministry Admin');
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [nominations, setNominations] = useState<CandidateNomination[]>(INITIAL_NOMINATIONS);
  const [timetable, setTimetable] = useState<TimetableSession[]>(INITIAL_TIMETABLE);
  const [rooms, setRooms] = useState<HostelRoom[]>(INITIAL_HOSTEL_ROOMS);
  const [messLogs] = useState(INITIAL_MESS_LOGS);

  // Module 2 State
  const [faceTemplates] = useState(INITIAL_FACE_TEMPLATES);
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_LOGS);
  const [qrPayload] = useState(INITIAL_QR_PAYLOAD);
  const [exceptions, setExceptions] = useState<AttendanceException[]>(INITIAL_EXCEPTIONS);

  // Module 3 State
  const [lmsModules, setLmsModules] = useState<LmsLessonModule[]>(INITIAL_LMS_MODULES);
  const [selectedLanguage, setSelectedLanguage] = useState<ScheduledLanguage>('Hindi');
  const [assessmentAttempts, setAssessmentAttempts] = useState<AssessmentAttempt[]>(INITIAL_ASSESSMENT_ATTEMPTS);
  const [xapiStatements, setXapiStatements] = useState<XApiStatement[]>(INITIAL_XAPI_STATEMENTS);

  // Module 4 State
  const [credentials, setCredentials] = useState<VerifiableCredential[]>(INITIAL_CREDENTIALS);
  const [digilockerLogs, setDigilockerLogs] = useState<DigiLockerCallbackLog[]>(INITIAL_DIGILOCKER_LOGS);
  const [abcRecords, setAbcRecords] = useState<SidhAbcRecord[]>(INITIAL_SIDH_ABC_RECORDS);

  // Module 5 State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [vectorKb] = useState<VectorContextChunk[]>(SAMPLE_VECTOR_KNOWLEDGE_BASE);

  // Module 6 State
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(INITIAL_JOB_POSTINGS);
  const [candidates, setCandidates] = useState<CandidateTalentProfile[]>(INITIAL_CANDIDATE_TALENT);
  const [ncsJobs, setNcsJobs] = useState<NcsJobImport[]>(INITIAL_NCS_JOBS);

  // Module 7 State
  const [misKpis] = useState<MisKpiMetrics>(INITIAL_MIS_KPIS);
  const [skillGapMetrics] = useState<RegionalSkillGapMetric[]>(INITIAL_SKILL_GAP_METRICS);
  const [dpdpConsents, setDpdpConsents] = useState<DpdpConsentRecord[]>(INITIAL_DPDP_CONSENTS);
  const [certInIncidents, setCertInIncidents] = useState<CertInIncidentReport[]>(INITIAL_CERTIN_INCIDENTS);
  const [auditBlocks, setAuditBlocks] = useState<AuditLedgerBlock[]>(INITIAL_AUDIT_BLOCKS);
  const [microserviceHealth] = useState<MicroserviceHealth[]>(INITIAL_MICROSERVICE_HEALTH);

  // Module 1 Handlers
  const handleAddInstitution = (inst: Institution) => setInstitutions([inst, ...institutions]);
  const handleAddCourse = (course: Course) => setCourses([course, ...courses]);
  const handleAddNomination = (nom: CandidateNomination) => setNominations([nom, ...nominations]);
  const handleUpdateNominationStatus = (id: string, status: CandidateNomination['status']) => {
    setNominations(nominations.map((n) => (n.id === id ? { ...n, status } : n)));
  };
  const handleAddTimetableSession = (sess: TimetableSession) => setTimetable([sess, ...timetable]);
  const handleResolveTimetableConflict = (sessionId: string, newRoom: string) => {
    setTimetable(
      timetable.map((s) =>
        s.id === sessionId ? { ...s, roomName: newRoom, hasConflict: false, conflictDetails: undefined } : s
      )
    );
  };
  const handleRunHostelOptimization = () => {
    setRooms(rooms.map((r) => (r.occupied < r.capacity && r.maintenanceStatus === 'AVAILABLE' ? { ...r, occupied: r.occupied + 1 } : r)));
  };

  // Module 2 Handlers
  const handleMarkAttendance = (record: AttendanceRecord) => setAttendanceLogs([record, ...attendanceLogs]);
  const handleTriggerSync = () => setAttendanceLogs(attendanceLogs.map((l) => ({ ...l, syncStatus: 'SYNCED' })));
  const handleAddException = (exc: AttendanceException) => setExceptions([exc, ...exceptions]);
  const handleApproveException = (id: string, approver: string) => {
    setExceptions(exceptions.map((e) => (e.id === id ? { ...e, status: 'APPROVED', approvedBy: approver } : e)));
  };

  // Module 3 Handlers
  const handleDownloadModule = (id: string) => {
    setLmsModules(lmsModules.map((m) => (m.id === id ? { ...m, isDownloadedOffline: true } : m)));
  };
  const handleCompleteAssessmentAttempt = (attempt: AssessmentAttempt) => {
    setAssessmentAttempts([attempt, ...assessmentAttempts]);
  };
  const handleAddXapiStatement = (stmt: XApiStatement) => setXapiStatements([stmt, ...xapiStatements]);

  // Module 4 Handlers
  const handleIssueCredential = (vc: VerifiableCredential) => setCredentials([vc, ...credentials]);
  const handleTriggerPush = (urn: string) => {
    setDigilockerLogs([
      { id: `log-${Date.now()}`, endpointType: 'PUSH_URI', citizenUri: 'in.gov.digilocker.user.9921', certificateUrn: urn, httpStatus: 201, responsePayloadSizeKB: 3.8, timestamp: new Date().toISOString() },
      ...digilockerLogs,
    ]);
  };
  const handleTriggerPull = (urn: string) => {
    setDigilockerLogs([
      { id: `log-${Date.now()}`, endpointType: 'PULL_URI', citizenUri: 'in.gov.digilocker.user.9921', certificateUrn: urn, httpStatus: 200, responsePayloadSizeKB: 15.2, timestamp: new Date().toISOString() },
      ...digilockerLogs,
    ]);
  };
  const handleRevokeCertificate = (urn: string) => {
    setCredentials(credentials.map((c) => (c.id === urn ? { ...c, status: 'REVOKED' } : c)));
  };
  const handleTriggerAbcSync = () => {
    setAbcRecords(abcRecords.map((r) => ({ ...r, abcSyncStatus: 'SYNCED_TO_ABC' })));
  };

  // Module 5 Handlers
  const handleSendMessage = (msg: ChatMessage) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  // Module 6 Handlers
  const handleAddJobPosting = (job: JobPosting) => setJobPostings([job, ...jobPostings]);
  const handleRevealContactInfo = (candidateId: string) => {
    setCandidates(
      candidates.map((c) =>
        c.candidateId === candidateId ? { ...c, isContactInfoRevealed: true } : c
      )
    );
  };
  const handleUpdateCandidateStage = (candidateId: string, stage: PipelineStage) => {
    setCandidates(
      candidates.map((c) =>
        c.candidateId === candidateId ? { ...c, currentPipelineStage: stage } : c
      )
    );
  };
  const handleSyncNcs = () => {
    setNcsJobs([
      {
        ncsJobId: `NCS-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        jobTitle: 'PACS Assistant Manager (Rural Banking)',
        employerName: 'Maharashtra Rural Cooperative Federation',
        location: 'Satara, Maharashtra',
        vacancies: 4,
        syncedAt: new Date().toISOString(),
      },
      ...ncsJobs,
    ]);
  };

  // Module 7 Handlers
  const handleTriggerDpdpPurge = (consentId: string) => {
    setDpdpConsents(
      dpdpConsents.map((c) =>
        c.consentId === consentId
          ? {
              ...c,
              status: 'PURGED_EXPIRED',
              retentionDaysRemaining: 0,
              citizenAadhaarHash: '[PURGED_CRYPTOGRAM_ZEROED]',
              biometricConsentGranted: false,
              aadhaarConsentGranted: false,
            }
          : c
      )
    );

    // Append cryptographic audit block
    const newBlock: AuditLedgerBlock = {
      blockIndex: auditBlocks.length + 1,
      timestamp: new Date().toISOString(),
      actionType: 'CONSENT_PURGE',
      actorId: 'user-statutory-dpdp-officer',
      actorRole: 'DPDP Statutory Data Protection Officer',
      previousHash: auditBlocks[auditBlocks.length - 1]?.blockHash || '00000',
      blockHash: `${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      details: `Executed Right to Erasure for Consent ID ${consentId}. Cryptographically purged biometrics and zeroed Aadhaar hash.`,
      isValid: true,
    };
    setAuditBlocks([...auditBlocks, newBlock]);
  };

  const handleReportCertInIncident = (incident: CertInIncidentReport) => {
    setCertInIncidents([incident, ...certInIncidents]);
  };

  const conflictCount = timetable.filter((s) => s.hasConflict).length;
  const totalBeds = rooms.reduce((acc, r) => acc + r.capacity, 0);
  const totalOcc = rooms.reduce((acc, r) => acc + r.occupied, 0);
  const hostelOccupancyPercent = totalBeds > 0 ? Math.round((totalOcc / totalBeds) * 100) : 0;
  const bufferedSyncCount = attendanceLogs.filter((l) => l.syncStatus === 'BUFFERED_OFFLINE').length;
  const pendingExceptionsCount = exceptions.filter((e) => e.status === 'PENDING_APPROVAL').length;
  const downloadedLmsModules = lmsModules.filter((m) => m.isDownloadedOffline).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Navbar */}
      <Navbar
        institutions={institutions}
        selectedInstitution={selectedInstitution}
        onSelectInstitution={setSelectedInstitution}
        activeRole={activeRole}
        onSelectRole={setActiveRole}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          stats={{
            totalCourses: courses.length,
            totalNominations: nominations.length,
            conflictCount,
            hostelOccupancyPercent,
            bufferedSyncCount,
            pendingExceptionsCount,
            downloadedLmsModules,
            xapiStatementCount: xapiStatements.length,
            totalIssuedCredentials: credentials.length,
            digilockerLogCount: digilockerLogs.length,
            abcRecordCount: abcRecords.length,
            chatMessageCount: chatMessages.length,
            vectorChunkCount: vectorKb.length,
            totalJobPostings: jobPostings.length,
            totalCandidates: candidates.length,
            activeConsentsCount: dpdpConsents.filter((c) => c.status === 'ACTIVE').length,
            auditBlockCount: auditBlocks.length,
          }}
        />

        {/* Main Workspace */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* Module 1 Views */}
          {activeModule === 'module1' && (
            <>
              {activeTab === 'tenant' && (
                <TenantManagement
                  institutions={institutions}
                  selectedInstitution={selectedInstitution}
                  onSelectInstitution={setSelectedInstitution}
                  onAddInstitution={handleAddInstitution}
                />
              )}
              {activeTab === 'catalog' && <CourseCatalog courses={courses} onAddCourse={handleAddCourse} />}
              {activeTab === 'nominations' && (
                <BulkNomination
                  nominations={nominations}
                  courses={courses}
                  onAddNomination={handleAddNomination}
                  onUpdateStatus={handleUpdateNominationStatus}
                />
              )}
              {activeTab === 'timetable' && (
                <TimetableScheduler
                  sessions={timetable}
                  onAddSession={handleAddTimetableSession}
                  onResolveConflict={handleResolveTimetableConflict}
                />
              )}
              {activeTab === 'hostel' && (
                <HostelMessOptimizer
                  rooms={rooms}
                  messLogs={messLogs}
                  onRunOptimization={handleRunHostelOptimization}
                />
              )}
            </>
          )}

          {/* Module 2 Views */}
          {activeModule === 'module2' && (
            <>
              {activeTab === 'face_kiosk' && (
                <FaceVerificationKiosk templates={faceTemplates} onMarkAttendance={handleMarkAttendance} />
              )}
              {activeTab === 'dynamic_qr' && (
                <DynamicQrAttendance initialPayload={qrPayload} onMarkAttendance={handleMarkAttendance} />
              )}
              {activeTab === 'offline_sync' && (
                <OfflineSyncManager logs={attendanceLogs} onTriggerSync={handleTriggerSync} />
              )}
              {activeTab === 'exceptions' && (
                <AttendanceExceptions
                  exceptions={exceptions}
                  onAddException={handleAddException}
                  onApproveException={handleApproveException}
                />
              )}
            </>
          )}

          {/* Module 3 Views */}
          {activeModule === 'module3' && (
            <>
              {activeTab === 'multilingual_player' && (
                <MultilingualLmsPlayer
                  modules={lmsModules}
                  selectedLanguage={selectedLanguage}
                  onDownloadModule={handleDownloadModule}
                />
              )}
              {activeTab === 'bhashini_console' && (
                <BhashiniVoiceConsole
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                />
              )}
              {activeTab === 'interactive_assessment' && (
                <InteractiveAssessmentEngine
                  questions={SAMPLE_QUESTION_BANK}
                  onCompleteAttempt={handleCompleteAssessmentAttempt}
                />
              )}
              {activeTab === 'xapi_sync' && (
                <XApiProgressSync statements={xapiStatements} onAddStatement={handleAddXapiStatement} />
              )}
            </>
          )}

          {/* Module 4 Views */}
          {activeModule === 'module4' && (
            <>
              {activeTab === 'w3c_compiler' && (
                <VerifiableCredentialCompiler credentials={credentials} onIssueCredential={handleIssueCredential} />
              )}
              {activeTab === 'digilocker_gateway' && (
                <DigiLockerGateway
                  credentials={credentials}
                  logs={digilockerLogs}
                  onTriggerPush={handleTriggerPush}
                  onTriggerPull={handleTriggerPull}
                  onRevokeCertificate={handleRevokeCertificate}
                />
              )}
              {activeTab === 'sidh_credit_bridge' && (
                <SidhCreditBridge records={abcRecords} onTriggerAbcSync={handleTriggerAbcSync} />
              )}
              {activeTab === 'public_verifier' && <PublicCertificateVerifier credentials={credentials} />}
            </>
          )}

          {/* Module 5 Views */}
          {activeModule === 'module5' && (
            <>
              {activeTab === 'indic_chatbot' && (
                <IndicVoiceChatbot
                  messages={chatMessages}
                  selectedLanguage={selectedLanguage}
                  onSendMessage={handleSendMessage}
                />
              )}
              {activeTab === 'rag_inspector' && (
                <RagVectorInspector knowledgeBase={vectorKb} />
              )}
              {activeTab === 'guardrails' && (
                <ChatbotGuardrails />
              )}
            </>
          )}

          {/* Module 6 Views */}
          {activeModule === 'module6' && (
            <>
              {activeTab === 'recruiter_portal' && (
                <RecruiterPortal
                  jobPostings={jobPostings}
                  courses={courses}
                  onAddJobPosting={handleAddJobPosting}
                />
              )}
              {activeTab === 'semantic_matcher' && (
                <SemanticJobMatcher
                  jobPostings={jobPostings}
                  candidates={candidates}
                />
              )}
              {activeTab === 'talent_privacy' && (
                <TalentDiscoveryPrivacy
                  candidates={candidates}
                  onRevealContactInfo={handleRevealContactInfo}
                />
              )}
              {activeTab === 'pipeline_ncs' && (
                <RecruitmentPipelineNcs
                  candidates={candidates}
                  ncsJobs={ncsJobs}
                  onUpdateStage={handleUpdateCandidateStage}
                  onSyncNcs={handleSyncNcs}
                />
              )}
            </>
          )}

          {/* Module 7 Views */}
          {activeModule === 'module7' && (
            <>
              {activeTab === 'executive_mis' && (
                <ExecutiveMisDashboards
                  kpis={misKpis}
                  skillGaps={skillGapMetrics}
                />
              )}
              {activeTab === 'dpdp_compliance' && (
                <DpdpStatutoryCompliance
                  consents={dpdpConsents}
                  incidents={certInIncidents}
                  onTriggerPurge={handleTriggerDpdpPurge}
                  onReportIncident={handleReportCertInIncident}
                />
              )}
              {activeTab === 'crypto_ledger' && (
                <CryptographicAuditLedger
                  blocks={auditBlocks}
                />
              )}
              {activeTab === 'system_health' && (
                <SystemHealthMonitoring
                  services={microserviceHealth}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
