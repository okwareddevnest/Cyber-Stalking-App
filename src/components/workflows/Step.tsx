interface StepProps {
  stepNumber: number;
  title: string;
  description: string;
  isCompleted: boolean;
  onComplete: () => void;
}

export function Step({ stepNumber, title, description, isCompleted, onComplete }: StepProps) {
  return (
    <div className={`p-4 border rounded-md ${isCompleted ? 'bg-green-100' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-2">
        Step {stepNumber}: {title}
      </h2>
      <p className="mb-4">{description}</p>
      <button
        onClick={onComplete}
        disabled={isCompleted}
        className={`px-4 py-2 rounded-md ${
          isCompleted ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {isCompleted ? 'Completed' : 'Mark as Complete'}
      </button>
    </div>
  );
}
