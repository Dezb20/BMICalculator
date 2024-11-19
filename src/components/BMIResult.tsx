import React from 'react';

interface BMIResultProps {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
}

const healthTips = {
  underweight: "Consider consulting a healthcare provider about a balanced diet to gain weight healthily. Focus on nutrient-rich foods and strength training.",
  normal: "Maintain your healthy lifestyle! Regular exercise and a balanced diet will help you stay in this range.",
  overweight: "Small lifestyle changes can help. Try incorporating more physical activity and focusing on portion control.",
  obese: "Consider consulting a healthcare professional for personalized advice. Focus on sustainable lifestyle changes rather than quick fixes."
};

const categoryColors = {
  underweight: 'bg-blue-500',
  normal: 'bg-green-500',
  overweight: 'bg-yellow-500',
  obese: 'bg-red-500'
};

export function BMIResult({ bmi, category }: BMIResultProps) {
  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      <div className="relative pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">BMI Scale</span>
          <span className="text-sm font-medium text-gray-600">{bmi}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${categoryColors[category]}`}
            style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
          />
        </div>
        <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Your BMI indicates: {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>
          <p className="text-gray-600">{healthTips[category]}</p>
        </div>
      </div>
    </div>
  );
}