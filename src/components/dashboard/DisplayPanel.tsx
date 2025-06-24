import React from "react";

interface DisplayPanelProps {
  displayValue: string;
  entryMode: "apartment" | "amount";
  apartment: string;
  apartmentBreakdown: {
    tower: string;
    floor: string;
    unit: string;
  } | null;
}

const DisplayPanel: React.FC<DisplayPanelProps> = ({
  displayValue,
  entryMode,
  apartment,
  apartmentBreakdown,
}) => {
  const getDisplayText = () => {
    if (entryMode === "apartment") {
      return "Enter apartment number";
    }
    if (apartmentBreakdown) {
      return `Tower ${apartmentBreakdown.tower}, Floor ${apartmentBreakdown.floor}, Unit ${apartmentBreakdown.unit}`;
    }
    return `For apartment ${apartment}`;
  };

  return (
    <div 
      className="bg-gray-50 dark:bg-gray-900 w-full h-[50vh] rounded-b-3xl flex flex-col items-center justify-center text-gray-900 dark:text-white px-6 relative overflow-hidden"
      role="region"
      aria-label={`${entryMode} input display`}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-accent/5 dark:to-accent/10" 
        aria-hidden="true"
      />
      <h1 className="text-5xl font-light mb-2 relative z-10">
        {entryMode === "apartment" ? "Apartment" : "Amount"}
      </h1>
      <div 
        className="mt-4 w-full max-w-xs bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 text-center relative z-10 border border-gray-200 dark:border-gray-700"
        role="textbox"
        aria-label={`Current ${entryMode} value`}
        aria-readonly="true"
      >
        <div 
          className="font-light text-6xl tracking-wider h-16 text-primary dark:text-accent"
          aria-live="polite"
        >
          {displayValue || "0"}
        </div>
        <p 
          className="text-sm text-gray-500 dark:text-gray-400 mt-2"
          aria-live="polite"
        >
          {getDisplayText()}
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-12 right-12 text-primary/20 dark:text-accent/20 text-xl" aria-hidden="true">✦</div>
      <div className="absolute top-24 left-16 text-primary/20 dark:text-accent/20 text-sm" aria-hidden="true">✦</div>
      <div className="absolute bottom-24 right-20 text-primary/10 dark:text-accent/10 text-xs" aria-hidden="true">✦</div>
      <div className="absolute bottom-32 left-12 text-primary/10 dark:text-accent/10 text-lg" aria-hidden="true">✦</div>
    </div>
  );
};

export default DisplayPanel;
