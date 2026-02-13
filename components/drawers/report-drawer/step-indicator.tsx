import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
}

const StepIndicator = ({ currentStep, totalSteps, isComplete }: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep && !isComplete;
        const isDone = stepNum < currentStep || isComplete;

        return (
          <div key={stepNum} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isDone
                    ? "bg-primary text-primary-foreground"
                    : isActive
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : stepNum}
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  isDone || isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {stepNum === 1 ? "Verify elements" : "Configure analysis"}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`w-8 h-px transition-colors ${
                  isDone ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
