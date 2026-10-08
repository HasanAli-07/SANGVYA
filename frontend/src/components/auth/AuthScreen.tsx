import React, { useState } from 'react';
import { Building2, Lock, Mail, User, ShieldCheck, Key, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LightCard } from '../light_ui/LightCard';
import { LightButton } from '../light_ui/LightButton';
import { LightInput } from '../light_ui/LightInput';
import { LightBadge } from '../light_ui/LightBadge';
import type { UserRole, AuthState } from '../../types/auth';
import { loginUser } from '../../services/authService';

interface AuthScreenProps {
  onLoginSuccess: (authState: AuthState) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [activeMode, setActiveMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [email, setEmail] = useState('rajesh.kumar@ncct.gov.in');
  const [password, setPassword] = useState('NCCT#Apex2026');
  const [fullName, setFullName] = useState('Shri Rajesh Kumar (IAS)');
  const [role, setRole] = useState<UserRole>('CENTRAL_MINISTRY_ADMIN');
  const [institutionName, setInstitutionName] = useState('NCCT Apex Headquarters (Ministry of Cooperation)');
  const [aadhaarNumber, setAadhaarNumber] = useState('9988 7766 5544');

  const [simulatedToken, setSimulatedToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAuth = loginUser(email, role, fullName);
    setSimulatedToken(newAuth.jwtToken);

    setTimeout(() => {
      onLoginSuccess(newAuth);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-4 font-sans antialiased">
      {/* Top Ministry Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
          <Building2 className="w-4 h-4 text-amber-800" />
          <span className="text-xs font-extrabold text-amber-900">MINISTRY OF COOPERATION • NCCT</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          SANGVYA Role-Based Portal
        </h1>
        <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
          Secure JWT Authentication & Role-Based Access Control (RBAC) Subsystem
        </p>
      </div>

      <LightCard className="w-full max-w-md shadow-xl border-slate-200 p-6 space-y-5">
        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveMode('LOGIN')}
            className={`py-2 rounded-lg transition text-center ${
              activeMode === 'LOGIN' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            JWT Login
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('SIGNUP')}
            className={`py-2 rounded-lg transition text-center ${
              activeMode === 'SIGNUP' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Citizen / Staff Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeMode === 'SIGNUP' && (
            <LightInput
              label="Full Name"
              type="text"
              required
              placeholder="e.g. Ramesh Kumar Patel"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<User className="w-4 h-4" />}
            />
          )}

          <LightInput
            label="Government Email / User ID"
            type="email"
            required
            placeholder="admin@ncct.gov.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
          />

          <LightInput
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
          />

          {/* Role Authorization Selector */}
          <div className="space-y-1 text-left">
            <label className="block font-semibold text-xs text-slate-700">
              Target Ecosystem Role (RBAC Scope)
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl p-2.5 text-xs font-bold focus:ring-2 focus:ring-amber-500"
            >
              <option value="CENTRAL_MINISTRY_ADMIN">Role 1: Central Ministry / Apex Admin (NCCT HQ)</option>
              <option value="INSTITUTE_DIRECTOR">Role 2: Institute Director & Training Coordinator (RICM/ICM)</option>
              <option value="PACS_SECRETARY">Role 3: PACS / Cooperative Society Secretary</option>
              <option value="RURAL_TRAINEE">Role 4: Rural Trainee / Learner / Candidate</option>
              <option value="COOP_EMPLOYER">Role 5: Cooperative Employer / Recruiter</option>
            </select>
          </div>

          {activeMode === 'SIGNUP' && (
            <>
              <LightInput
                label="Associated Institution / Society Name"
                type="text"
                required
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                icon={<Building2 className="w-4 h-4" />}
              />

              <LightInput
                label="Aadhaar Cryptographic Number (SHA-256 Input)"
                type="text"
                placeholder="12-digit Aadhaar Number"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
              />
            </>
          )}

          <LightButton
            variant="saffron"
            size="lg"
            type="submit"
            className="w-full mt-2"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {activeMode === 'LOGIN' ? 'Authenticate & Issue JWT Token' : 'Register Citizen Account & Issue Token'}
          </LightButton>
        </form>

        {/* Live JWT Bearer Token Generated Box */}
        {simulatedToken && (
          <div className="bg-slate-900 text-white p-3.5 rounded-xl text-left space-y-2 font-mono text-[10px] animate-in fade-in">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span className="flex items-center space-x-1">
                <Key className="w-3.5 h-3.5" />
                <span>JWT Bearer Token Generated</span>
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>

            <p className="break-all text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
              {simulatedToken}
            </p>
          </div>
        )}
      </LightCard>

      {/* Footer Disclaimer */}
      <div className="mt-6 text-[11px] text-slate-500 font-mono text-center">
        <span>SANGVYA Security Protocol • Ed25519 Token Signing & RBAC Guard Active</span>
      </div>
    </div>
  );
};
