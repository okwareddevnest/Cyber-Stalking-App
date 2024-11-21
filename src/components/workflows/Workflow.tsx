import { Step } from './Step';

interface WorkflowProps {
  workflowId: string;
  steps: {
    title: string;
    description: string;
  }[];
  completedSteps: number[];
  onStepComplete: (stepIndex: number) => void;
}

export function Workflow({ workflowId, steps, completedSteps, onStepComplete }: WorkflowProps) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <Step
          key={index}
          stepNumber={index + 1}
          title={step.title}
          description={step.description}
          isCompleted={completedSteps.includes(index)}
          onComplete={() => onStepComplete(index)}
        />
      ))}
    </div>
  );
}
