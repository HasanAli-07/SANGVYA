import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import type { Module1Tab } from './components/Sidebar';
import { TenantManagement } from './components/TenantManagement';
import { CourseCatalog } from './components/CourseCatalog';
import { BulkNomination } from './components/BulkNomination';
import { TimetableScheduler } from './components/TimetableScheduler';
import { HostelMessOptimizer } from './components/HostelMessOptimizer';

import {
  INITIAL_INSTITUTIONS,
  INITIAL_COURSES,
  INITIAL_NOMINATIONS,
  INITIAL_TIMETABLE,
  INITIAL_HOSTEL_ROOMS,
  INITIAL_MESS_LOGS,
} from './data/mockErpData';

import type { Institution, Course, CandidateNomination, TimetableSession, HostelRoom } from './types/erp';

export function App() {
  const [activeTab, setActiveTab] = useState<Module1Tab>('tenant');
  const [institutions, setInstitutions] = useState<Institution[]>(INITIAL_INSTITUTIONS);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution>(INITIAL_INSTITUTIONS[0]);
  const [activeRole, setActiveRole] = useState<string>('Central Ministry Admin');

  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [nominations, setNominations] = useState<CandidateNomination[]>(INITIAL_NOMINATIONS);
  const [timetable, setTimetable] = useState<TimetableSession[]>(INITIAL_TIMETABLE);
  const [rooms, setRooms] = useState<HostelRoom[]>(INITIAL_HOSTEL_ROOMS);
  const [messLogs] = useState(INITIAL_MESS_LOGS);

  // Handlers for state updates
  const handleAddInstitution = (inst: Institution) => {
    setInstitutions([inst, ...institutions]);
  };

  const handleAddCourse = (course: Course) => {
    setCourses([course, ...courses]);
  };

  const handleAddNomination = (nom: CandidateNomination) => {
    setNominations([nom, ...nominations]);
  };

  const handleUpdateNominationStatus = (id: string, status: CandidateNomination['status']) => {
    setNominations(nominations.map((n) => (n.id === id ? { ...n, status } : n)));
  };

  const handleAddTimetableSession = (sess: TimetableSession) => {
    setTimetable([sess, ...timetable]);
  };

  const handleResolveTimetableConflict = (sessionId: string, newRoom: string) => {
    setTimetable(
      timetable.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              roomName: newRoom,
              hasConflict: false,
              conflictDetails: undefined,
            }
          : s
      )
    );
  };

  const handleRunHostelOptimization = () => {
    // Re-assign beds
    const updatedRooms = rooms.map((r) => {
      if (r.occupied < r.capacity && r.maintenanceStatus === 'AVAILABLE') {
        return { ...r, occupied: Math.min(r.capacity, r.occupied + 1) };
      }
      return r;
    });
    setRooms(updatedRooms);
  };

  const conflictCount = timetable.filter((s) => s.hasConflict).length;
  const totalBeds = rooms.reduce((acc, r) => acc + r.capacity, 0);
  const totalOcc = rooms.reduce((acc, r) => acc + r.occupied, 0);
  const hostelOccupancyPercent = totalBeds > 0 ? Math.round((totalOcc / totalBeds) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Top Header Navbar */}
      <Navbar
        institutions={institutions}
        selectedInstitution={selectedInstitution}
        onSelectInstitution={setSelectedInstitution}
        activeRole={activeRole}
        onSelectRole={setActiveRole}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Module 1 Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          stats={{
            totalCourses: courses.length,
            totalNominations: nominations.length,
            conflictCount,
            hostelOccupancyPercent,
          }}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
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
        </main>
      </div>
    </div>
  );
}

export default App;
