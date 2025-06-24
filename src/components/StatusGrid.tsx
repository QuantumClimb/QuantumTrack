import React from "react";
import StatusCard from "./StatusCard";

const StatusGrid: React.FC = () => {
  const items = [
    { type: "total" as const, amount: 100000 },
    { type: "pending" as const, amount: 25000, subtitle: "5 pending payments" },
    { type: "overdue" as const, amount: 15000, subtitle: "3 overdue accounts" },
    { type: "available" as const, amount: 60000 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-neutral-dark dark:text-accent">
        Credit Overview
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <StatusCard
            key={item.type}
            type={item.type}
            amount={item.amount}
            subtitle={item.subtitle}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-green-600 dark:text-green-400 text-lg">
          Track your credit lines efficiently
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
          Monitor your total credit, pending payments, and available balance at a glance.
        </p>
      </div>
    </div>
  );
};

export default StatusGrid; 