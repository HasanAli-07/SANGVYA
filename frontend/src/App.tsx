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

import type { Institution, Course, CandidateNomination, TimetableSession, HostelRoom } from './types/erp';
import type { AttendanceRecord, AttendanceException } from './types/attendance';
import type { LmsLessonModule, ScheduledLanguage, AssessmentAttempt, XApiStatement } from './types/lms';
import type { VerifiableCredential, DigiLockerCallbackLog, SidhAbcRecord } from './types/credentials';

export function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('module4');
  const [activeTab, setActiveTab] = useState<TabId>('w3c_compiler');

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
  const handleIssueCredential = (vc: VerifiableCredential) => {
    setCredentials([vc, ...credentials]);
  };

  const handleTriggerPush = (urn: string) => {
    const newLog: DigiLockerCallbackLog = {
      id: `log-${Date.now()}`,
      endpointType: 'PUSH_URI',
      citizenUri: 'in.gov.digilocker.user.9921',
      certificateUrn: urn,
      httpStatus: 201,
      responsePayloadSizeKB: 3.8,
      timestamp: new Date().toISOString(),
    };
    setDigilockerLogs([newLog, ...digilockerLogs]);
  };

  const handleTriggerPull = (urn: string) => {
    const newLog: DigiLockerCallbackLog = {
      id: `log-${Date.now()}`,
      endpointType: 'PULL_URI',
      citizenUri: 'in.gov.digilocker.user.9921',
      certificateUrn: urn,
      httpStatus: 200,
      responsePayloadSizeKB: 15.2,
      timestamp: new Date().toISOString(),
    };
    setDigilockerLogs([newLog, ...digilockerLogs]);
  };

  const handleRevokeCertificate = (urn: string) => {
    setCredentials(credentials.map((c) => (c.id === urn ? { ...c, status: 'REVOKED' } : c)));
  };

  const handleTriggerAbcSync = () => {
    setAbcRecords(abcRecords.map((r) => ({ ...r, abcSyncStatus: 'SYNCED_TO_ABC' })));
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
                <VerifiableCredentialCompiler
                  credentials={credentials}
                  onIssueCredential={handleIssueCredential}
                />
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
              {activeTab === 'public_verifier' && (
                <PublicCertificateVerifier credentials={credentials} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
