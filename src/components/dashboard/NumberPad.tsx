import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Delete } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NumberPadProps {
  onNumberPress: (num: string) => void;
  onDelete: () => void;
  onClear: () => void;
  onNext: () => void;
  entryMode: "apartment" | "amount";
}

const NumberPad: React.FC<NumberPadProps> = ({
  onNumberPress,
  onDelete,
  onClear,
  onNext,
  entryMode,
}) => {
  const isMobile = useIsMobile();
  const buttonSize = isMobile ? "h-14" : "h-16";

  return (
    <div 
      className="w-full p-4 grid grid-cols-3 gap-2 bg-white dark:bg-gray-800 rounded-t-3xl shadow-lg"
      role="group"
      aria-label="Number pad"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button
          key={num}
          onClick={() => onNumberPress(num.toString())}
          className={`${buttonSize} text-2xl font-light bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600`}
          variant="ghost"
          aria-label={`Number ${num}`}
        >
          {num}
        </Button>
      ))}

      <Button
        onClick={onClear}
        className={`${buttonSize} text-lg font-light bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600`}
        variant="ghost"
        aria-label="Clear input"
      >
        C
      </Button>

      <Button
        onClick={() => onNumberPress("0")}
        className={`${buttonSize} text-2xl font-light bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600`}
        variant="ghost"
        aria-label="Number 0"
      >
        0
      </Button>

      <Button
        onClick={onDelete}
        className={`${buttonSize} bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600`}
        variant="ghost"
        aria-label="Delete last digit"
      >
        <Delete className="h-6 w-6" />
      </Button>

      <Button
        className="w-full mt-6 h-12 md:h-14 text-xl font-light bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent/90 text-white transition-colors shadow-lg rounded-lg col-span-3"
        onClick={onNext}
        aria-label={entryMode === "apartment" ? "Next step" : "Save entry"}
      >
        {entryMode === "apartment" ? "Next" : "Save"}
        <Check className="ml-2 h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
};

export default NumberPad;
