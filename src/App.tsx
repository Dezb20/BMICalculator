import React, { useState, useEffect } from 'react';
import { Github, RefreshCw, Scale } from 'lucide-react';
import { HeightInput } from './components/HeightInput';
import { WeightInput } from './components/WeightInput';
import { BMIResult } from './components/BMIResult';

type Unit = 'metric' | 'imperial';
type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

interface BMIResult {
  bmi: number;
  category: BMICategory;
}

const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

function App() {
  const [unit, setUnit] = useState<Unit>('metric');
  const [height, setHeight] = useState<string>('');
  const [feet, setFeet] = useState<string>('');
  const [inches, setInches] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmiResult, setBMIResult] = useState<BMIResult | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsHeaderVisible(!scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateBMI = () => {
    if (unit === 'metric' && (!height || !weight)) return null;
    if (unit === 'imperial' && (!feet || !weight)) return null;

    let heightInInches: number;
    const numWeight = parseFloat(weight);

    if (unit === 'metric') {
      const numHeight = parseFloat(height);
      if (numHeight <= 0 || numWeight <= 0) return null;
      const bmi = numWeight / Math.pow(numHeight / 100, 2);
      return {
        bmi: Math.round(bmi * 10) / 10,
        category: getBMICategory(bmi)
      };
    } else {
      heightInInches = (parseInt(feet) * 12) + (parseInt(inches) || 0);
      if (heightInInches <= 0 || numWeight <= 0) return null;
      const bmi = (numWeight * 703) / Math.pow(heightInInches, 2);
      return {
        bmi: Math.round(bmi * 10) / 10,
        category: getBMICategory(bmi)
      };
    }
  };

  useEffect(() => {
    const result = calculateBMI();
    setBMIResult(result);
  }, [height, feet, inches, weight, unit]);

  const resetCalculator = () => {
    setHeight('');
    setFeet('');
    setInches('');
    setWeight('');
    setBMIResult(null);
  };

  const handleUnitChange = (newUnit: Unit) => {
    setUnit(newUnit);
    resetCalculator();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header 
        className={`fixed w-full top-0 z-10 transition-all duration-300 ${
          isHeaderVisible ? 'bg-white/80 backdrop-blur-md py-6' : 'bg-white/95 backdrop-blur-md py-4 shadow-md'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scale className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BMI Calculator
            </h1>
          </div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border border-gray-200 p-1">
                {(['metric', 'imperial'] as const).map((unitType) => (
                  <button
                    key={unitType}
                    onClick={() => handleUnitChange(unitType)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      unit === unitType
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    {unitType.charAt(0).toUpperCase() + unitType.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <HeightInput
                unit={unit}
                height={height}
                feet={feet}
                inches={inches}
                onHeightChange={setHeight}
                onFeetChange={setFeet}
                onInchesChange={setInches}
              />

              <WeightInput
                unit={unit}
                weight={weight}
                onWeightChange={setWeight}
              />

              {bmiResult && <BMIResult bmi={bmiResult.bmi} category={bmiResult.category} />}

              <button
                onClick={resetCalculator}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Calculator</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-4">Learn more about BMI:</p>
            <div className="space-x-4">
              <a 
                href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                WHO Guidelines
              </a>
              <a 
                href="https://www.cdc.gov/healthyweight/assessing/bmi/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                CDC Resources
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;