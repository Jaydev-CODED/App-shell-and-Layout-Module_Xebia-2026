import { useQuery, useMutation } from '@tanstack/react-query';
import { auditApi } from './auditApi';
import type { AuditLogFilters } from '../types';

export const useAuditLogs = (filters: AuditLogFilters) => {
  return useQuery({
    queryKey: ['auditLogs', filters],
    queryFn: () => auditApi.getLogs(filters),
    placeholderData: (previousData) => previousData,
  });
};

export const useAuditLogDetail = (id: string | null) => {
  return useQuery({
    queryKey: ['auditLogDetail', id],
    queryFn: () => auditApi.getLogById(id!),
    enabled: !!id,
  });
};

export const useExportAuditLogs = () => {
  return useMutation({
    mutationFn: (filters: Omit<AuditLogFilters, 'page' | 'limit'>) => auditApi.exportLogs(filters),
  });
};
