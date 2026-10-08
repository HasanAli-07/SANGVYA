import type { UserRole, UserProfile, AuthState } from '../types/auth';

const JWT_STORAGE_KEY = 'sangvya_jwt_token';
const USER_STORAGE_KEY = 'sangvya_user_profile';

// Mock initial admin profile for Role 1
const DEFAULT_ADMIN_USER: UserProfile = {
  userId: 'usr-admin-001',
  fullName: 'Shri Rajesh Kumar (IAS)',
  email: 'rajesh.kumar@ncct.gov.in',
  phone: '+91 9811002233',
  role: 'CENTRAL_MINISTRY_ADMIN',
  institutionId: 'inst-vamnicom-pune',
  institutionName: 'NCCT Apex Headquarters (Ministry of Cooperation)',
  registeredAt: '2026-01-01T00:00:00Z',
};

// Simulate Base64 JWT generation with header.payload.signature
export function generateMockJwtToken(user: UserProfile): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: user.userId,
      role: user.role,
      name: user.fullName,
      inst: user.institutionId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days
    })
  );
  const signature = 'sig_sha256_ed25519_hsm_ncct_gov_in';
  return `${header}.${payload}.${signature}`;
}

export function parseJwtRole(token: string): UserRole | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

export function getInitialAuthState(): AuthState {
  const storedToken = localStorage.getItem(JWT_STORAGE_KEY);
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (storedToken && storedUser) {
    try {
      return {
        isAuthenticated: true,
        user: JSON.parse(storedUser),
        jwtToken: storedToken,
        tokenExpiresAt: new Date(Date.now() + 86400 * 7 * 1000).toISOString(),
      };
    } catch {
      // Fallback
    }
  }

  // Initial logged-in state as Role 1 Central Admin
  const token = generateMockJwtToken(DEFAULT_ADMIN_USER);
  return {
    isAuthenticated: true,
    user: DEFAULT_ADMIN_USER,
    jwtToken: token,
    tokenExpiresAt: new Date(Date.now() + 86400 * 7 * 1000).toISOString(),
  };
}

export function loginUser(email: string, role: UserRole, fullName?: string): AuthState {
  const user: UserProfile = {
    userId: `usr-${Date.now()}`,
    fullName: fullName || email.split('@')[0].toUpperCase(),
    email,
    phone: '+91 9876543210',
    role,
    institutionId: 'inst-vamnicom-pune',
    institutionName: 'Vaikunth Mehta National Institute of Cooperative Management (VAMNICOM)',
    registeredAt: new Date().toISOString(),
  };

  const token = generateMockJwtToken(user);
  localStorage.setItem(JWT_STORAGE_KEY, token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

  return {
    isAuthenticated: true,
    user,
    jwtToken: token,
    tokenExpiresAt: new Date(Date.now() + 86400 * 7 * 1000).toISOString(),
  };
}

export function logoutUser(): AuthState {
  localStorage.removeItem(JWT_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  return {
    isAuthenticated: false,
    user: null,
    jwtToken: null,
    tokenExpiresAt: null,
  };
}
