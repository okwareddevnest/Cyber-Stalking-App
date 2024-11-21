export interface IncidentReportForm {
  name: string;
  email: string;
  incidentDescription: string;
  dateOfIncident?: string;
  evidenceLinks?: string[];
  // Add any additional fields as needed
}
