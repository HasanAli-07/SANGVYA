import React from 'react';
import { 
  Building2, 
  BookOpen, 
  UserPlus, 
  CalendarDays, 
  Hotel, 
  Layers,
  Camera,
  QrCode,
  Database,
  ShieldAlert,
  Globe,
  Sparkles,
  Award,
  FileCode,
  Smartphone,
  CheckCircle2,
  Bot,
  Search,
  ShieldCheck,
  Briefcase,
  Zap,
  Lock,
  ExternalLink,
  BarChart3,
  Activity
} from 'lucide-react';

export type ActiveModule = 'module1' | 'module2' | 'module3' | 'module4' | 'module5' | 'module6' | 'module7';
export type TabId = 
  // Module 1
  | 'tenant' | 'catalog' | 'nominations' | 'timetable' | 'hostel'
  // Module 2
  | 'face_kiosk' | 'dynamic_qr' | 'offline_sync' | 'exceptions'
  // Module 3
  | 'multilingual_player' | 'bhashini_console' | 'interactive_assessment' | 'xapi_sync'
  // Module 4
  | 'w3c_compiler' | 'digilocker_gateway' | 'sidh_credit_bridge' | 'public_verifier'
  // Module 5
  | 'indic_chatbot' | 'rag_inspector' | 'guardrails'
  // Module 6
  | 'recruiter_portal' | 'semantic_matcher' | 'talent_privacy' | 'pipeline_ncs'
  // Module 7
  | 'executive_mis' | 'dpdp_compliance' | 'crypto_ledger' | 'system_health';

interface SidebarProps {
  activeModule: ActiveModule;
  onModuleChange: (mod: ActiveModule) => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  stats: {
    totalCourses: number;
    totalNominations: number;
    conflictCount: number;
    hostelOccupancyPercent: number;
    bufferedSyncCount: number;
    pendingExceptionsCount: number;
    downloadedLmsModules: number;
    xapiStatementCount: number;
    totalIssuedCredentials: number;
    digilockerLogCount: number;
    abcRecordCount: number;
    chatMessageCount: number;
    vectorChunkCount: number;
    totalJobPostings: number;
    totalCandidates: number;
    activeConsentsCount: number;
    auditBlockCount: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onModuleChange,
  activeTab,
  onTabChange,
  stats,
}) => {
  const module1Items = [
    { id: 'tenant' as TabId, label: 'Multi-Tenant Governance', section: 'Section 1.1', icon: Building2, badge: 'APEX / RICM / ICM' },
    { id: 'catalog' as TabId, label: 'Course & Curriculum Catalog', section: 'Section 1.2', icon: BookOpen, count: stats.totalCourses },
    { id: 'nominations' as TabId, label: 'Bulk Society Nominations', section: 'Section 1.3', icon: UserPlus, count: stats.totalNominations },
    { id: 'timetable' as TabId, label: 'Conflict-Free Timetabling', section: 'Section 1.4', icon: CalendarDays, alertCount: stats.conflictCount > 0 ? stats.conflictCount : undefined },
    { id: 'hostel' as TabId, label: 'Hostel & Mess Operations', section: 'Section 1.5', icon: Hotel, badge: `${stats.hostelOccupancyPercent}% Occupied` },
  ];

  const module2Items = [
    { id: 'face_kiosk' as TabId, label: 'Edge Face Verification Kiosk', section: 'Section 2.1', icon: Camera, badge: '512-D Vector' },
    { id: 'dynamic_qr' as TabId, label: 'Geofenced Dynamic QR TOTP', section: 'Section 2.2', icon: QrCode, badge: '15s Refresh' },
    { id: 'offline_sync' as TabId, label: 'Offline Buffer & CRDT Sync', section: 'Section 2.3', icon: Database, alertCount: stats.bufferedSyncCount > 0 ? stats.bufferedSyncCount : undefined },
    { id: 'exceptions' as TabId, label: 'Attendance Overrides & Audit', section: 'Section 2.4', icon: ShieldAlert, count: stats.pendingExceptionsCount },
  ];

  const module3Items = [
    { id: 'multilingual_player' as TabId, label: 'Multilingual SCORM / HTML5 Player', section: 'Section 3.1', icon: Globe, count: stats.downloadedLmsModules },
    { id: 'bhashini_console' as TabId, label: 'MeitY Bhashini AI Speech & NMT', section: 'Section 3.2', icon: Sparkles, badge: '22 Languages' },
    { id: 'interactive_assessment' as TabId, label: 'Interactive Assessment & Proctoring', section: 'Section 3.3', icon: Award, badge: '≥75% Pass Mark' },
    { id: 'xapi_sync' as TabId, label: 'Offline xAPI & Monotonic CRDT Sync', section: 'Section 3.4', icon: FileCode, count: stats.xapiStatementCount },
  ];

  const module4Items = [
    { id: 'w3c_compiler' as TabId, label: 'W3C VC 2.0 & Cloud HSM Signer', section: 'Section 4.1', icon: Award, count: stats.totalIssuedCredentials },
    { id: 'digilocker_gateway' as TabId, label: 'DigiLocker & API Setu Issuer Gateway', section: 'Section 4.2', icon: Smartphone, count: stats.digilockerLogCount },
    { id: 'sidh_credit_bridge' as TabId, label: 'SIDH & Academic Bank of Credits', section: 'Section 4.3', icon: Layers, count: stats.abcRecordCount },
    { id: 'public_verifier' as TabId, label: 'Public Decentralized 2D QR Verifier', section: 'Section 4.4', icon: CheckCircle2, badge: 'DID Registry' },
  ];

  const module5Items = [
    { id: 'indic_chatbot' as TabId, label: 'Indic AI Voice & Text Chatbot', section: 'Sec 5.1/5.3', icon: Bot, count: stats.chatMessageCount },
    { id: 'rag_inspector' as TabId, label: 'pgvector Grounded RAG Pipeline', section: 'Section 5.2', icon: Search, count: stats.vectorChunkCount },
    { id: 'guardrails' as TabId, label: 'PII Guardrails & Disclaimers', section: 'Section 5.4', icon: ShieldCheck, badge: 'Zero Hallucination' },
  ];

  const module6Items = [
    { id: 'recruiter_portal' as TabId, label: 'Employer Portal & Requisitions', section: 'Section 6.1', icon: Briefcase, count: stats.totalJobPostings },
    { id: 'semantic_matcher' as TabId, label: 'AI Multi-Factor Job Matcher', section: 'Section 6.2', icon: Zap, badge: 'exp(-λd) Decay' },
    { id: 'talent_privacy' as TabId, label: 'Privacy Talent Discovery Portal', section: 'Section 6.3', icon: Lock, count: stats.totalCandidates },
    { id: 'pipeline_ncs' as TabId, label: 'Recruitment Pipeline & NCS Bridge', section: 'Section 6.4', icon: ExternalLink, badge: 'Kanban + NCS' },
  ];

  const module7Items = [
    { id: 'executive_mis' as TabId, label: 'Executive MIS & Apex Reporting', section: 'Section 7.1', icon: BarChart3, badge: '63k PACS KPI' },
    { id: 'dpdp_compliance' as TabId, label: 'DPDP Statutory & CERT-In Subsystem', section: 'Section 7.2', icon: Lock, count: stats.activeConsentsCount },
    { id: 'crypto_ledger' as TabId, label: 'Cryptographic Audit Ledger', section: 'Section 7.3', icon: ShieldCheck, count: stats.auditBlockCount },
    { id: 'system_health' as TabId, label: 'Microservices Health & SLAs', section: 'Section 7.4', icon: Activity, badge: '99.9% Uptime' },
  ];

  let currentItems = module1Items;
  if (activeModule === 'module2') currentItems = module2Items;
  if (activeModule === 'module3') currentItems = module3Items;
  if (activeModule === 'module4') currentItems = module4Items;
  if (activeModule === 'module5') currentItems = module5Items;
  if (activeModule === 'module6') currentItems = module6Items;
  if (activeModule === 'module7') currentItems = module7Items;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 text-slate-300 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="space-y-5">
        {/* Module Switcher Buttons */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
            Active Ecosystem Module
          </span>
          <div className="grid grid-cols-7 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[8px]">
            <button
              onClick={() => {
                onModuleChange('module1');
                onTabChange('tenant');
              }}
              className={`py-1.5 px-0.5 font-bold rounded-lg transition text-center ${
                activeModule === 'module1' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              M1
            </button>

            <button
              onClick={() => {
                onModuleChange('module2');
                onTabChange('face_kiosk');
              }}
              className={`py-1.5 px-0.5 font-bold rounded-lg transition text-center ${
                activeModule === 'module2' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              M2
            </button>

            <button
              onClick={() => {
                onModuleChange('module3');
                onTabChange('multilingual_player');
              }}
              className={`py-1.5 px-0.5 font-bold rounded-lg transition text-center ${
                activeModule === 'module3' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              M3
            </button>

            <button
              onClick={() => {
                onModuleChange('module4');
                onTabChange('w3c_compiler');
              }}
              className={`py-1.5 px-0.5 font-bold rounded-lg transition text-center ${
                activeModule === 'module4' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              M4
            </button>

            <button
              onClick={() => {
                onModuleChange('module5');
                onTabChange('indic_chatbot');
              }}
              className={`py-1.5 px-0.5 font-bold rounded-lg transition text-center ${
                activeModule === 'module5' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              M5
            </button>

            <button
              onClick={() => {
                onModuleChange('module6');
                onTabChange('recruiter_portal');
              }}
              className={`py-1.5 px-0.5 font-bold rounded-lg transition text-center ${
                activeModule === 'module6' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              M6
            </button>

            <button
              onClick={() => {
                onModuleChange('module7');
                onTabChange('executive_mis');
              }}
              className={`py-1.5 px-0.5 font-bold rounded-lg transition text-center ${
                activeModule === 'module7' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              M7
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>
              {activeModule === 'module1' && 'Module 1 Sections'}
              {activeModule === 'module2' && 'Module 2 Sections'}
              {activeModule === 'module3' && 'Module 3 Sections'}
              {activeModule === 'module4' && 'Module 4 Sections'}
              {activeModule === 'module5' && 'Module 5 Sections'}
              {activeModule === 'module6' && 'Module 6 Sections'}
              {activeModule === 'module7' && 'Module 7 Sections'}
            </span>
          </div>

          <nav className="space-y-1.5">
            {currentItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30'
                      : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                    <div className="truncate">
                      <span className="block truncate">{item.label}</span>
                      <span className={`text-[10px] block ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {item.section}
                      </span>
                    </div>
                  </div>

                  {item.count !== undefined && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.count}
                    </span>
                  )}

                  {item.alertCount !== undefined && (
                    <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                      {item.alertCount}
                    </span>
                  )}

                  {item.badge && !item.count && !item.alertCount && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                      isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-3">
        <p className="font-semibold text-slate-400">SIH #26087</p>
        <p>Active Branch: <code className="text-indigo-400">feature/module-7</code></p>
      </div>
    </aside>
  );
};
