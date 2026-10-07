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

import type { Institution, Course, CandidateNomination, TimetableSession, HostelRoom } from './types/erp';
import type { AttendanceRecord, AttendanceException } from './types/attendance';

export function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('module2');
  const [activeTab, setActiveTab] = useState<TabId>('face_kiosk');

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

  // Handlers
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
  const handleMarkAttendance = (record: AttendanceRecord) => {
    setAttendanceLogs([record, ...attendanceLogs]);
  };

  const handleTriggerSync = () => {
    setAttendanceLogs(
      attendanceLogs.map((l) => ({ ...l, syncStatus: 'SYNCED' }))
    );
  };

  const handleAddException = (exc: AttendanceException) => {
    setExceptions([exc, ...exceptions]);
  };

  const handleApproveException = (id: string, approver: string) => {
    setExceptions(
      exceptions.map((e) => (e.id === id ? { ...e, status: 'APPROVED', approvedBy: approver } : e))
    );
  };

  const conflictCount = timetable.filter((s) => s.hasConflict).length;
  const totalBeds = rooms.reduce((acc, r) => acc + r.capacity, 0);
  const totalOcc = rooms.reduce((acc, r) => acc + r.occupied, 0);
  const hostelOccupancyPercent = totalBeds > 0 ? Math.round((totalOcc / totalBeds) * 100) : 0;
  const bufferedSyncCount = attendanceLogs.filter((l) => l.syncStatus === 'BUFFERED_OFFLINE').length;
  const pendingExceptionsCount = exceptions.filter((e) => e.status === 'PENDING_APPROVAL').length;

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
              {activeTab === 'catalog' && (
                <CourseCatalog courses={courses} onAddCourse={handleAddCourse} />
              )}
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
                <FaceVerificationKiosk
                  templates={faceTemplates}
                  onMarkAttendance={handleMarkAttendance}
                />
              )}
              {activeTab === 'dynamic_qr' && (
                <DynamicQrAttendance
                  initialPayload={qrPayload}
                  onMarkAttendance={handleMarkAttendance}
                />
              )}
              {activeTab === 'offline_sync' && (
                <OfflineSyncManager
                  logs={attendanceLogs}
                  onTriggerSync={handleTriggerSync}
                />
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
        </main>
      </div>
    </div>
  );
}

export default App;
