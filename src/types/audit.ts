export interface AuditLogEntry {
  userId: string | null;
  action: string;
  method: string;
  timestamp: Date;
  ipAddress: string;
}
