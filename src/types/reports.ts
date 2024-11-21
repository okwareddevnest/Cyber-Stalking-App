export interface Report {
  id: string;
  userId?: string;
  incidentDescription: string;
  contactEmail?: string;
  submittedAt: Date;
  evidenceIds?: string[];
  forwarded?: boolean;
  forwardedAt?: Date;
  // ... other fields as necessary
}

export interface ExternalServicePayload {
  report: Report;
  // Add additional fields if needed by the external service
}
