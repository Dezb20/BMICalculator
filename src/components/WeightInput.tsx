import React from 'react';
import { Scale } from 'lucide-react';

interface WeightInputProps {
  unit: 'metric' | 'imperial';
  weight: string;
  onWeightChange: (value: string) => void;
}

export function WeightInput({ unit, weight, onWeightChange }: WeightInputProps) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
      </label>
      <div className="relative">
        <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="number"
          value={weight}
          onChange={(e) => onWeightChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
        />
      </div>
    </div>
  );
}