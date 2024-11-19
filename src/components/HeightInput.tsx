import React from 'react';
import { Ruler, Info } from 'lucide-react';

interface HeightInputProps {
  unit: 'metric' | 'imperial';
  height: string;
  feet: string;
  inches: string;
  onHeightChange: (value: string) => void;
  onFeetChange: (value: string) => void;
  onInchesChange: (value: string) => void;
}

export function HeightInput({ 
  unit, 
  height, 
  feet, 
  inches, 
  onHeightChange, 
  onFeetChange, 
  onInchesChange 
}: HeightInputProps) {
  if (unit === 'metric') {
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Height (cm)
        </label>
        <div className="relative">
          <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            value={height}
            onChange={(e) => onHeightChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Enter height in cm"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 group">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="invisible group-hover:visible absolute right-0 w-48 p-2 mt-2 text-sm text-gray-600 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              Measure height without shoes
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Height (ft & in)
      </label>
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            value={feet}
            onChange={(e) => onFeetChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Feet"
            min="0"
            max="8"
          />
        </div>
        <div className="relative flex-1">
          <input
            type="number"
            value={inches}
            onChange={(e) => onInchesChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Inches"
            min="0"
            max="11"
          />
        </div>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 group">
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="invisible group-hover:visible absolute right-0 w-48 p-2 mt-2 text-sm text-gray-600 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            Enter feet and inches separately
          </div>
        </div>
      </div>
    </div>
  );
}