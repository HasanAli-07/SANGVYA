import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AuthScreen } from './components/auth/AuthScreen';
import { Role1Sidebar, Role1TabId } from './components/role1_admin/Role1Sidebar';
import { ApexGovernanceOverview } from './components/role1_admin/ApexGovernanceOverview';
import { MasterCourseAccreditation } from './components/role1_admin/MasterCourseAccreditation';
import { NationalPacsMisReporting } from './components/role1_admin/NationalPacsMisReporting';
import { CryptographicAuditMonitor } from './components/role1_admin/CryptographicAuditMonitor';

// UI/UX Design System Components
import { SahkarVaniFloatingAssistant } from './components/SahkarVaniFloatingAssistant';
import { CelebratoryCompletionModal } from './components/CelebratoryCompletionModal';
import { MobileBottomNav } from './components/MobileBottomNav';

// Data Mocking
import {
  INITIAL_INSTITUTIONS,
  INITIAL_COURSES,
  INITIAL_NOMINATIONS,
  INITIAL_TIMETABLE,
  INITIAL_HOSTEL_ROOMS,
} from './data/mockErpData';

import {
  INITIAL_MIS_KPIS,
  INITIAL_SKILL_GAP_METRICS,
  INITIAL_DPDP_CONSENTS,
  INITIAL_AUDIT_BLOCKS,
} from './data/mockAnalyticsData';

import type { Institution, Course } from './types/erp';
import type { MisKpiMetrics, RegionalSkillGapMetric, DpdpConsentRecord, AuditLedgerBlock } from './types/analytics';
import type { AuthState, UserRole } from './types/auth';
import { getInitialAuthState, logoutUser } from './services/authService';

export function App() {
  // Auth State (JWT Authentication & Authorization)
  const [authState, setAuthState] = useState<AuthState>(getInitialAuthState());

  // Role 1 Active Subsystem Tab
  const [activeRole1Tab, setActiveRole1Tab] = useState<Role1TabId>('r1_governance');

  // UI/UX Light Theme Adaptability Settings
  const [deviceView, setDeviceView] = useState<'web' | 'tablet' | 'mobile'>('web');
  const [fontScale, setFontScale] = useState<100 | 115 | 130>(100);
  const [isCelebrationModalOpen, setIsCelebrationModalOpen] = useState(false);

  // State Datasets
  const [institutions, setInstitutions] = useState<Institution[]>(INITIAL_INSTITUTIONS);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution>(INITIAL_INSTITUTIONS[0]);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [misKpis] = useState<MisKpiMetrics>(INITIAL_MIS_KPIS);
  const [skillGapMetrics] = useState<RegionalSkillGapMetric[]>(INITIAL_SKILL_GAP_METRICS);
  const [dpdpConsents, setDpdpConsents] = useState<DpdpConsentRecord[]>(INITIAL_DPDP_CONSENTS);
  const [auditBlocks, setAuditBlocks] = useState<AuditLedgerBlock[]>(INITIAL_AUDIT_BLOCKS);

  // Handlers
  const handleAddInstitution = (inst: Institution) => setInstitutions([inst, ...institutions]);
  const handleAddCourse = (course: Course) => setCourses([course, ...courses]);
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

    const newBlock: AuditLedgerBlock = {
      blockIndex: auditBlocks.length + 1,
      timestamp: new Date().toISOString(),
      actionType: 'CONSENT_PURGE',
      actorId: authState.user?.userId || 'user-role1-admin',
      actorRole: 'Role 1 Central Ministry Apex Admin',
      previousHash: auditBlocks[auditBlocks.length - 1]?.blockHash || '00000',
      blockHash: `${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      details: `Executed Right to Erasure for Consent ID ${consentId}. Cryptographically purged biometrics and zeroed Aadhaar hash.`,
      isValid: true,
    };
    setAuditBlocks([...auditBlocks, newBlock]);
  };

  const handleLogout = () => {
    setAuthState(logoutUser());
  };

  // If not authenticated, render Light Theme JWT Auth Screen
  if (!authState.isAuthenticated || !authState.user) {
    return <AuthScreen onLoginSuccess={(newAuth) => setAuthState(newAuth)} />;
  }

  // Device Container Styling for Mobile Simulation
  const deviceContainerClass =
    deviceView === 'mobile'
      ? 'max-w-[412px] mx-auto border-x-4 border-slate-300 rounded-3xl overflow-hidden shadow-2xl my-4 bg-white'
      : deviceView === 'tablet'
      ? 'max-w-[834px] mx-auto border-x-4 border-slate-300 rounded-3xl overflow-hidden shadow-2xl my-4 bg-white'
      : 'w-full';

  const fontScaleStyle =
    fontScale === 115 ? { fontSize: '115%' } : fontScale === 130 ? { fontSize: '130%' } : {};

  return (
    <div
      style={fontScaleStyle}
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased transition-all duration-200"
    >
      {/* Light Theme Navbar */}
      <Navbar
        institutions={institutions}
        selectedInstitution={selectedInstitution}
        onSelectInstitution={setSelectedInstitution}
        activeRole={authState.user.role}
        onSelectRole={(newRole) => {
          setAuthState({
            ...authState,
            user: { ...authState.user!, role: newRole as UserRole },
          });
        }}
        deviceView={deviceView}
        onChangeDeviceView={setDeviceView}
        fontScale={fontScale}
        onChangeFontScale={setFontScale}
      />

      <div className={`flex-1 flex overflow-hidden ${deviceContainerClass}`}>
        {/* Role 1 Sidebar Navigation */}
        {deviceView !== 'mobile' && (
          <Role1Sidebar
            user={authState.user}
            activeTab={activeRole1Tab}
            onSelectTab={setActiveRole1Tab}
            onLogout={handleLogout}
            stats={{
              totalInstitutions: institutions.length,
              totalCourses: courses.length,
              pacsComputerisedCount: misKpis.totalPacsComputerised,
              auditBlocksCount: auditBlocks.length,
            }}
          />
        )}

        {/* Main Role 1 Workspace Canvas */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-7xl mx-auto w-full pb-20 md:pb-6">
          {activeRole1Tab === 'r1_governance' && (
            <ApexGovernanceOverview
              institutions={institutions}
              onAddInstitution={handleAddInstitution}
            />
          )}

          {activeRole1Tab === 'r1_catalog' && (
            <MasterCourseAccreditation
              courses={courses}
              onAddCourse={handleAddCourse}
            />
          )}

          {activeRole1Tab === 'r1_mis' && (
            <NationalPacsMisReporting
              kpis={misKpis}
              skillGaps={skillGapMetrics}
            />
          )}

          {activeRole1Tab === 'r1_audit' && (
            <CryptographicAuditMonitor
              blocks={auditBlocks}
              consents={dpdpConsents}
              onTriggerPurge={handleTriggerDpdpPurge}
            />
          )}
        </main>
      </div>

      {/* Floating Indic Voice Assistant (Sahkar Vani) */}
      <SahkarVaniFloatingAssistant
        selectedLanguage="Hindi"
        onNavigateTab={(t) => {
          if (t === 'tenant' || t === 'catalog') setActiveRole1Tab('r1_governance');
          if (t === 'w3c_compiler') setActiveRole1Tab('r1_audit');
        }}
      />

      {/* Mobile Touch Navigation */}
      <MobileBottomNav
        activeModule="module1"
        onModuleChange={() => {}}
        onOpenVoiceAssistant={() => {}}
        onOpenCelebrationModal={() => setIsCelebrationModalOpen(true)}
      />

      {/* Celebration & DigiLocker Modal */}
      <CelebratoryCompletionModal
        isOpen={isCelebrationModalOpen}
        onClose={() => setIsCelebrationModalOpen(false)}
      />
    </div>
  );
}

export default App;
