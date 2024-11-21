export interface EvidenceMetadata {
  _id?: string;
  uploadedBy: string;
  uploadDate: Date;
  fileName: string;
  fileType: string;
  fileSize: number;
  chainOfCustody: ChainOfCustodyEntry[];
  // Additional metadata fields as needed
}

export interface ChainOfCustodyEntry {
  action: string;
  timestamp: Date;
  performedBy: string;
}
