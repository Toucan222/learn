import { useState } from 'react';
import { MigrationParser } from '@/lib/migration/parser';
import { MigrationResult } from '@/lib/migration/types';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function MigrationWizard() {
  const [step, setStep] = useState<'upload' | 'mapping' | 'validation' | 'complete'>('upload');
  const [result, setResult] = useState<MigrationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [files, setFiles] = useState<{ [key: string]: File }>({});

  const handleFileUpload = async (uploadedFiles: FileList | null) => {
    if (!uploadedFiles?.length) return;

    const newFiles: { [key: string]: File } = {};
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const fileType = determineFileType(file.name);
      if (fileType) {
        newFiles[fileType] = file;
      }
    }
    setFiles(newFiles);
  };

  const determineFileType = (filename: string): string | null => {
    if (filename.includes('employee')) return 'employees';
    if (filename.includes('family')) return 'families';
    if (filename.includes('student')) return 'students';
    if (filename.includes('lesson')) return 'lessons';
    if (filename.includes('payment')) return 'payments';
    return null;
  };

  const processFiles = async () => {
    setIsProcessing(true);
    try {
      const parser = new MigrationParser();
      
      for (const [type, file] of Object.entries(files)) {
        const data = await parser.parseFile(file);
        
        switch (type) {
          case 'employees':
            parser.parseEmployeeData(data);
            break;
          case 'families':
            parser.parseFamilyData(data);
            break;
          // Add other file types...
        }
      }
      
      setResult(parser.getMigrationResult());
      setStep('mapping');
    } catch (error) {
      console.error('Migration error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Data Migration Wizard
        </h2>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
              {['Upload', 'Mapping', 'Validation', 'Complete'].map((stepName, index) => (
                <li key={stepName} className={`relative ${index !== 0 ? 'pl-6' : ''} ${
                  index !== 3 ? 'pr-6 w-full' : ''
                }`}>
                  {/* Step indicator */}
                  <div className="flex items-center">
                    <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      getStepStatus(stepName.toLowerCase(), step) === 'complete'
                        ? 'bg-primary-600'
                        : getStepStatus(stepName.toLowerCase(), step) === 'current'
                        ? 'border-2 border-primary-600'
                        : 'border-2 border-gray-300'
                    }`}>
                      {getStepStatus(stepName.toLowerCase(), step) === 'complete' ? (
                        <CheckCircleIcon className="h-5 w-5 text-white" />
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>
                    {index !== 3 && (
                      <div className="absolute right-0 h-0.5 w-full bg-gray-200" />
                    )}
                  </div>
                  <span className="absolute -bottom-6 w-full text-center text-sm">
                    {stepName}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Step Content */}
        {step === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <div className="mt-4">
                  <input
                    type="file"
                    multiple
                    accept=".csv,.xls,.xlsx"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-primary-600 hover:text-primary-500"
                  >
                    Upload Teachworks export files
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Drag and drop files or click to select
                </p>
              </div>

              {/* File List */}
              {Object.entries(files).length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Selected Files:</h4>
                  <ul className="mt-2 divide-y divide-gray-200">
                    {Object.entries(files).map(([type, file]) => (
                      <li key={type} className="py-2 flex items-center justify-between">
                        <span className="text-sm text-gray-600">{file.name}</span>
                        <button
                          onClick={() => {
                            const newFiles = { ...files };
                            delete newFiles[type];
                            setFiles(newFiles);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 'mapping' && result && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Migration Results</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Employees</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {result.stats.employeesProcessed} processed
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Families</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {result.stats.familiesProcessed} processed
                </dd>
              </div>
              {/* Add more stats... */}
            </dl>

            {/* Errors & Warnings */}
            {result.errors.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-red-700">Errors</h4>
                <ul className="mt-2 divide-y divide-gray-200">
                  {result.errors.map((error, index) => (
                    <li key={index} className="py-2 flex items-center text-sm text-red-600">
                      <XCircleIcon className="h-5 w-5 mr-2" />
                      {error.type}: {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.warnings.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-yellow-700">Warnings</h4>
                <ul className="mt-2 divide-y divide-gray-200">
                  {result.warnings.map((warning, index) => (
                    <li key={index} className="py-2 flex items-center text-sm text-yellow-600">
                      <XCircleIcon className="h-5 w-5 mr-2" />
                      {warning.type}: {warning.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          {step !== 'upload' && (
            <button
              onClick={() => setStep('upload')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Back
            </button>
          )}
          {step === 'upload' && Object.keys(files).length > 0 && (
            <button
              onClick={processFiles}
              disabled={isProcessing}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Processing...
                </span>
              ) : (
                'Process Files'
              )}
            </button>
          )}
          {step === 'mapping' && (
            <button
              onClick={() => setStep('validation')}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function getStepStatus(stepName: string, currentStep: string): 'complete' | 'current' | 'upcoming' {
  const steps = ['upload', 'mapping', 'validation', 'complete'];
  const currentIndex = steps.indexOf(currentStep);
  const stepIndex = steps.indexOf(stepName);
  
  if (stepIndex < currentIndex) return 'complete';
  if (stepIndex === currentIndex) return 'current';
  return 'upcoming';
}
