export interface WorkflowStep {
  title: string;
  description: string;
}

export interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
}

export interface UserWorkflowProgress {
  userId: string;
  workflowId: string;
  completedSteps: number[];
}
