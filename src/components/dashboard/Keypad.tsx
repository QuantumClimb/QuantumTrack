import React from 'react';
import { Button } from '@/components/ui/button';

interface KeypadProps {
  onKeyPress: (key: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onKeyPress }) => {
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'C', '0', '⌫',
    '✓'
  ];

  return (
    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
      {keys.map((key) => (
        <Button
          key={key}
          variant="outline"
          size="lg"
          className={`h-16 text-xl font-light ${
            key === '✓' 
              ? 'col-span-3 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => onKeyPress(key)}
        >
          {key}
        </Button>
      ))}
    </div>
  );
};

export default Keypad; 