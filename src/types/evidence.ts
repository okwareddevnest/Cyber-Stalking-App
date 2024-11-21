export interface EvidenceMetadata {
  uploadedBy: string;
  description: string;
  originalName: string;
  mimeType: string;
  uploadDate: Date;
  chainOfCustody: ChainOfCustodyEntry[];
}

export interface ChainOfCustodyEntry {
  action: string;
  timestamp: Date;
  performedBy: string;
  notes?: string;
}

export interface EvidenceFile {
  _id: string;
  filename: string;
  metadata: EvidenceMetadata;
}
