import type { AuditLog, AuditLogFilters, AuditLogResponse, AuditAction } from '../types';

// ==========================================
// MOCK DATA GENERATOR (For instant local demo)
// ==========================================
const MOCK_ACTORS = [
  { id: 'usr-1', name: 'Dr. Sarah Jenkins', email: 's.jenkins@university.edu', role: 'Super Admin' },
  { id: 'usr-2', name: 'Prof. Rajesh Kumar', email: 'r.kumar@university.edu', role: 'Department Head' },
  { id: 'usr-3', name: 'Emma Watson', email: 'e.watson@university.edu', role: 'Registrar' },
  { id: 'usr-4', name: 'David Miller', email: 'd.miller@university.edu', role: 'Compliance Officer' },
  { id: 'usr-5', name: 'Jane Doe', email: 'jane.doe@student.edu', role: 'Student' },
];

const MOCK_RESOURCES = [
  { type: 'Student', actions: ['CREATE', 'UPDATE', 'DELETE'] },
  { type: 'Course', actions: ['CREATE', 'UPDATE', 'DELETE'] },
  { type: 'Department', actions: ['CREATE', 'UPDATE'] },
  { type: 'Timetable', actions: ['CREATE', 'UPDATE', 'DELETE', 'EXPORT'] },
  { type: 'User', actions: ['CREATE', 'UPDATE', 'DELETE'] },
  { type: 'Authentication', actions: ['LOGIN', 'LOGOUT', 'FAILED_LOGIN'] },
  { type: 'Budget', actions: ['CREATE', 'UPDATE'] },
  { type: 'Transaction', actions: ['CREATE', 'EXPORT'] },
  { type: 'Invoice', actions: ['CREATE', 'UPDATE', 'DELETE'] },
];

const MOCK_IP_ADDRESSES = [
  '192.168.1.45', '10.0.0.12', '198.51.100.72', '203.0.113.19', '185.190.140.2'
];

const MOCK_USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.119 Mobile/15E148 Safari/604.1'
];

// Helper to generate a random date within the last 30 days
const getRandomDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  date.setSeconds(Math.floor(Math.random() * 60));
  return date.toISOString();
};

const generateMockLogs = (): AuditLog[] => {
  const logs: AuditLog[] = [];
  
  for (let i = 1; i <= 85; i++) {
    const actor = MOCK_ACTORS[Math.floor(Math.random() * MOCK_ACTORS.length)];
    const resource = MOCK_RESOURCES[Math.floor(Math.random() * MOCK_RESOURCES.length)];
    const action = resource.actions[Math.floor(Math.random() * resource.actions.length)] as AuditAction;
    
    const isSuccess = Math.random() > 0.08;
    const status = isSuccess ? 'SUCCESS' : 'FAILURE';
    
    let description = '';
    let resourceId = `res-${1000 + i}`;
    let metadata: Record<string, any> = {};

    switch (action) {
      case 'LOGIN':
        description = `User ${actor.name} successfully logged in.`;
        metadata = { session_expiry: new Date(Date.now() + 8 * 3600 * 1000).toISOString() };
        break;
      case 'LOGOUT':
        description = `User ${actor.name} logged out.`;
        break;
      case 'FAILED_LOGIN':
        description = `Failed login attempt for email: ${actor.email}`;
        metadata = { errorDetails: 'Invalid credentials provided', attemptsCount: Math.floor(Math.random() * 3) + 1 };
        break;
      case 'CREATE':
        description = `Created new ${resource.type.toLowerCase()} (${resourceId}) by ${actor.name}`;
        metadata = {
          after: {
            id: resourceId,
            name: `Sample ${resource.type} Name`,
            status: 'ACTIVE',
            created_at: new Date().toISOString(),
          }
        };
        break;
      case 'UPDATE':
        description = `Updated ${resource.type.toLowerCase()} (${resourceId}) by ${actor.name}`;
        metadata = {
          before: {
            id: resourceId,
            status: 'PENDING',
            updated_at: getRandomDate(daysAgo(i) + 1),
          },
          after: {
            id: resourceId,
            status: 'ACTIVE',
            updated_at: getRandomDate(daysAgo(i)),
          }
        };
        break;
      case 'DELETE':
        description = `Deleted ${resource.type.toLowerCase()} (${resourceId}) by ${actor.name}`;
        metadata = {
          before: {
            id: resourceId,
            name: `Sample ${resource.type} Name`,
            status: 'DELETED',
          }
        };
        break;
      case 'EXPORT':
        description = `Exported ${resource.type.toLowerCase()} report by ${actor.name}`;
        metadata = { format: 'CSV', record_count: Math.floor(Math.random() * 500) + 50 };
        break;
    }

    if (status === 'FAILURE') {
      description = `FAILED: ${description}`;
      metadata.error = 'Operation rejected due to unauthorized access or validation failure.';
      metadata.errorCode = 'ERR_AUTH_DENIED';
    }

    logs.push({
      id: `evt-${5000 + i}`,
      timestamp: getRandomDate(daysAgo(i)),
      actor,
      action,
      resourceType: resource.type,
      resourceId: action !== 'LOGIN' && action !== 'LOGOUT' && action !== 'FAILED_LOGIN' ? resourceId : undefined,
      description,
      status,
      ipAddress: MOCK_IP_ADDRESSES[Math.floor(Math.random() * MOCK_IP_ADDRESSES.length)],
      userAgent: MOCK_USER_AGENTS[Math.floor(Math.random() * MOCK_USER_AGENTS.length)],
      metadata,
    });
  }

  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const daysAgo = (index: number) => {
  if (index < 15) return 0;
  if (index < 30) return 1;
  if (index < 50) return Math.floor(Math.random() * 5) + 2;
  return Math.floor(Math.random() * 23) + 7;
};

let cachedLogs = generateMockLogs();

// ==========================================
// API IMPLEMENTATION (With Local Fallback)
// ==========================================
export const auditApi = {
  getLogs: async (filters: AuditLogFilters): Promise<AuditLogResponse> => {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 250 + 150));

    let filtered = [...cachedLogs];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.description.toLowerCase().includes(searchLower) ||
          log.actor.name.toLowerCase().includes(searchLower) ||
          log.actor.email.toLowerCase().includes(searchLower) ||
          log.ipAddress.includes(searchLower) ||
          (log.resourceId && log.resourceId.toLowerCase().includes(searchLower))
      );
    }

    if (filters.action && filters.action !== 'ALL') {
      if (filters.action === 'LOGIN') {
        filtered = filtered.filter((log) => log.action === 'LOGIN' || log.action === 'FAILED_LOGIN');
      } else {
        filtered = filtered.filter((log) => log.action === filters.action);
      }
    }

    if (filters.resourceType && filters.resourceType !== 'ALL') {
      const moduleMap: Record<string, string[]> = {
        'Academics': ['Student', 'Course', 'Department', 'Timetable'],
        'Finance': ['Budget', 'Transaction', 'Invoice'],
        'User Management': ['User'],
        'System': ['Authentication', 'System'],
      };
      
      const mappedTypes = moduleMap[filters.resourceType];
      if (mappedTypes) {
        filtered = filtered.filter((log) => mappedTypes.includes(log.resourceType));
      } else {
        filtered = filtered.filter((log) => log.resourceType === filters.resourceType);
      }
    }

    if (filters.status && filters.status !== 'ALL') {
      filtered = filtered.filter((log) => log.status === filters.status);
    }

    // Fixed Timezone & Day-boundary date filtering
    if (filters.startDate) {
      const start = new Date(filters.startDate);
      start.setHours(0, 0, 0, 0);
      filtered = filtered.filter((log) => new Date(log.timestamp).getTime() >= start.getTime());
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((log) => new Date(log.timestamp).getTime() <= end.getTime());
    }

    const total = filtered.length;
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    const paginatedData = filtered.slice(startIndex, endIndex);
    const totalPages = Math.ceil(total / filters.limit);

    return {
      data: paginatedData,
      total,
      page: filters.page,
      limit: filters.limit,
      totalPages,
    };
  },

  getLogById: async (id: string): Promise<AuditLog> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const log = cachedLogs.find((l) => l.id === id);
    if (!log) {
      throw new Error(`Audit log with ID ${id} not found.`);
    }
    return log;
  },

  exportLogs: async (filters: Omit<AuditLogFilters, 'page' | 'limit'>): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    let filtered = [...cachedLogs];
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.description.toLowerCase().includes(searchLower) ||
          log.actor.name.toLowerCase().includes(searchLower) ||
          log.ipAddress.includes(searchLower)
      );
    }
    if (filters.action && filters.action !== 'ALL') {
      if (filters.action === 'LOGIN') {
        filtered = filtered.filter((log) => log.action === 'LOGIN' || log.action === 'FAILED_LOGIN');
      } else {
        filtered = filtered.filter((log) => log.action === filters.action);
      }
    }
    if (filters.resourceType && filters.resourceType !== 'ALL') {
      const moduleMap: Record<string, string[]> = {
        'Academics': ['Student', 'Course', 'Department', 'Timetable'],
        'Finance': ['Budget', 'Transaction', 'Invoice'],
        'User Management': ['User'],
        'System': ['Authentication', 'System'],
      };
      
      const mappedTypes = moduleMap[filters.resourceType];
      if (mappedTypes) {
        filtered = filtered.filter((log) => mappedTypes.includes(log.resourceType));
      } else {
        filtered = filtered.filter((log) => log.resourceType === filters.resourceType);
      }
    }
    if (filters.status && filters.status !== 'ALL') {
      filtered = filtered.filter((log) => log.status === filters.status);
    }
    
    // Fixed Timezone & Day-boundary date filtering for exports
    if (filters.startDate) {
      const start = new Date(filters.startDate);
      start.setHours(0, 0, 0, 0);
      filtered = filtered.filter((log) => new Date(log.timestamp).getTime() >= start.getTime());
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((log) => new Date(log.timestamp).getTime() <= end.getTime());
    }

    const headers = ['Event ID', 'Timestamp', 'Actor Name', 'Actor Email', 'Role', 'Action', 'Resource Type', 'Resource ID', 'Description', 'Status', 'IP Address', 'User Agent'];
    const rows = filtered.map(log => [
      log.id,
      log.timestamp,
      `"${log.actor.name}"`,
      log.actor.email,
      log.actor.role,
      log.action,
      log.resourceType,
      log.resourceId || '',
      `"${log.description.replace(/"/g, '""')}"`,
      log.status,
      log.ipAddress,
      `"${log.userAgent.replace(/"/g, '""')}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    return csvContent;
  }
};
