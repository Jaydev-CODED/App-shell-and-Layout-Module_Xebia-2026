export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'FAILED_LOGIN';

export interface AuditLog {
  id: string;
  timestamp: string; // ISO Date String
  actor: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  action: AuditAction;
  resourceType: string; // e.g., "Student", "Course", "User", "Timetable"
  resourceId?: string;
  description: string;  // Human-readable summary: "Admin updated student John Doe"
  status: 'SUCCESS' | 'FAILURE';
  ipAddress: string;
  userAgent: string;
  metadata?: {
    before?: Record<string, any>;
    after?: Record<string, any>;
    reason?: string;
    errorDetails?: string;
    [key: string]: any;
  };
}

export interface AuditLogFilters {
  search: string;
  startDate: string;
  endDate: string;
  action: AuditAction | 'ALL';
  resourceType: string | 'ALL';
  status: 'SUCCESS' | 'FAILURE' | 'ALL';
  page: number;
  limit: number;
}

export interface AuditLogResponse {
  data: AuditLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
