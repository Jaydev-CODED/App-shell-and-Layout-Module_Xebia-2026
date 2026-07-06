import { io } from 'socket.io-client';

const API_BASE = 'http://localhost:5000/api/v1';
const WS_BASE = 'http://localhost:5000';

// In-Memory Token Reference
let token = localStorage.getItem('auth_token') || '';

// Mock flag (if server is unreachable)
let isUsingMock = false;

// 1. Get Headers
function getHeaders() {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// 2. Auth Helper
export const authService = {
  getToken: () => token,
  isAuthenticated: () => !!token,
  
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Login failed.');
      }
      
      const data = await res.json();
      token = data.token;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_profile', JSON.stringify(data.user));
      isUsingMock = false;
      return data.user;
    } catch (err) {
      console.warn('[API Auth] Server login failed. Falling back to local mock auth:', err.message);
      // Mock Fallback
      if (email && password) {
        const mockUser = {
          id: email.includes('admin') ? 'admin-id-123' : 'member-id-456',
          email,
          name: email.includes('admin') ? 'Admin User' : 'Teammate 4',
          role: email.includes('admin') ? 'ADMIN' : 'MEMBER'
        };
        token = 'mock-jwt-token-xyz';
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_profile', JSON.stringify(mockUser));
        isUsingMock = true;
        return mockUser;
      }
      throw err;
    }
  },

  async register(name, email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Registration failed.');
      }
      const data = await res.json();
      token = data.token;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_profile', JSON.stringify(data.user));
      isUsingMock = false;
      return data.user;
    } catch (err) {
      console.warn('[API Auth] Server register failed. Falling back to mock registration:', err.message);
      const mockUser = {
        id: `mock-user-${Date.now()}`,
        email,
        name,
        role: 'MEMBER'
      };
      token = 'mock-jwt-token-xyz';
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_profile', JSON.stringify(mockUser));
      isUsingMock = true;
      return mockUser;
    }
  },

  logout() {
    token = '';
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_profile');
  },

  getCurrentUser() {
    const profile = localStorage.getItem('user_profile');
    return profile ? JSON.parse(profile) : null;
  }
};

// 3. Stats & Analytics Helper
export const statsService = {
  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE}/dashboard/stats`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch dashboard stats.');
      return await res.json();
    } catch (err) {
      // Mock Fallback
      return {
        revenue: 48259.00,
        activeUsers: 12482,
        projectCompletionPercent: 84.2,
        totalProjects: 5
      };
    }
  },

  async getThroughput() {
    try {
      const res = await fetch(`${API_BASE}/analytics/throughput`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch throughput.');
      const data = await res.json();
      return data.throughput;
    } catch (err) {
      return [120, 150, 95, 140, 110, 190, 160, 210, 185, 230, 200, 250];
    }
  },

  async simulateSpike() {
    try {
      const res = await fetch(`${API_BASE}/analytics/simulate-spike`, {
        method: 'POST',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to simulate spike.');
      const data = await res.json();
      return data.throughput;
    } catch (err) {
      return null; // Let UI generate random locally if server fails
    }
  }
};

// 4. Projects CRUD Helper
export const projectsService = {
  async getProjects() {
    try {
      const res = await fetch(`${API_BASE}/projects`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch projects.');
      const data = await res.json();
      return data.projects;
    } catch (err) {
      // Return local mock storage if server offline
      return [
        { id: 'p1', name: 'Navbar & Header Modules', owner: { name: 'Teammate 1' }, status: 'IN_REVIEW', progress: 85 },
        { id: 'p2', name: 'Drawer & Drawer Transition animations', owner: { name: 'Teammate 2' }, status: 'IN_PROGRESS', progress: 45 },
        { id: 'p3', name: 'Responsive Layout & Grid System', owner: { name: 'Teammate 3' }, status: 'NOT_STARTED', progress: 10 },
        { id: 'p4', name: 'Router & SPA Dynamic Area', owner: { name: 'You (Teammate 4)' }, status: 'ACTIVE_CODING', progress: 99 },
        { id: 'p5', name: 'Global Palette Switcher & Integration', owner: { name: 'Teammate 5' }, status: 'NOT_STARTED', progress: 5 }
      ];
    }
  },

  async createProject(name) {
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name })
      });
      if (!res.ok) throw new Error('Failed to create project.');
      const data = await res.json();
      return data.project;
    } catch (err) {
      const currentUser = authService.getCurrentUser() || { name: 'You (Teammate 4)' };
      return {
        id: `proj-${Date.now()}`,
        name,
        owner: { name: currentUser.name },
        status: 'NOT_STARTED',
        progress: 0
      };
    }
  },

  async updateProject(id, updates) {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update project.');
      const data = await res.json();
      return data.project;
    } catch (err) {
      return null;
    }
  }
};

// 5. Reports async compilation
export const reportsService = {
  async getReports() {
    try {
      const res = await fetch(`${API_BASE}/reports`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch reports.');
      const data = await res.json();
      return data.reports;
    } catch (err) {
      return [];
    }
  },

  async generateReport(title, type) {
    try {
      const res = await fetch(`${API_BASE}/reports/generate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ title, type })
      });
      if (!res.ok) throw new Error('Failed to enqueue report compilation.');
      return await res.json();
    } catch (err) {
      // Mock Fallback
      return {
        reportId: `mock-report-${Date.now()}`,
        status: 'PENDING'
      };
    }
  },

  async getStatus(reportId) {
    try {
      const res = await fetch(`${API_BASE}/reports/status/${reportId}`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch report status.');
      return await res.json();
    } catch (err) {
      return { status: 'COMPLETED' };
    }
  },

  getDownloadUrl(reportId) {
    return `${API_BASE}/reports/download/${reportId}?token=${token}`;
  }
};

// 6. Settings preferences
export const settingsService = {
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE}/settings`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch settings.');
      const data = await res.json();
      return data.settings;
    } catch (err) {
      return {
        routerTransitions: localStorage.getItem('router-transitions') !== 'false',
        routerTelemetry: localStorage.getItem('router-telemetry') !== 'false',
        routerCache: localStorage.getItem('router-cache') === 'true'
      };
    }
  },

  async updateSettings(settings) {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Failed to update settings.');
      const data = await res.json();
      return data.settings;
    } catch (err) {
      Object.keys(settings).forEach(key => {
        localStorage.setItem(
          key === 'routerTransitions' ? 'router-transitions' :
          key === 'routerTelemetry' ? 'router-telemetry' : 'router-cache', 
          settings[key]
        );
      });
      return settings;
    }
  }
};

// 7. WebSocket Socket.io client setup
let socket = null;

export const socketService = {
  connect(onTelemetryUpdate, onThroughputSpike) {
    if (isUsingMock) {
      console.log('[Socket WS] Running in mock mode. Real WebSockets are disabled.');
      return null;
    }
    
    if (socket) {
      socket.disconnect();
    }

    try {
      // Connect to Socket.io server
      socket = io(WS_BASE, {
        auth: { token },
        transports: ['websocket', 'polling']
      });

      socket.on('connect', () => {
        console.log('[Socket WS] Connected successfully to server socket.');
      });

      socket.on('handshake_ack', (data) => {
        console.log('[Socket WS] Handshake success message:', data.message);
      });

      socket.on('telemetry_update', (data) => {
        if (typeof onTelemetryUpdate === 'function') {
          onTelemetryUpdate(data);
        }
      });

      socket.on('telemetry_throughput_spike', (data) => {
        if (typeof onThroughputSpike === 'function') {
          onThroughputSpike(data.throughput);
        }
      });

      socket.on('connect_error', (err) => {
        console.warn('[Socket WS] Connection error:', err.message);
      });

      return socket;
    } catch (error) {
      console.error('[Socket WS] Initialization failed:', error);
      return null;
    }
  },

  disconnect() {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }
};
