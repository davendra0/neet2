
import React from 'react';
import { SparklesIcon } from './icons';

interface GitHubInputFormProps {
  githubUrl: string;
  setGithubUrl: (url: string) => void;
  editInstructions: string;
  setEditInstructions: (instructions: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const GitHubInputForm: React.FC<GitHubInputFormProps> = ({
  githubUrl,
  setGithubUrl,
  editInstructions,
  setEditInstructions,
  onSubmit,
  isLoading,
}) => {
  const isButtonDisabled = isLoading || !githubUrl.trim() || !editInstructions.trim();

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <label htmlFor="github-url" className="block text-sm font-medium text-gray-300 mb-1">
            GitHub Project Link
          </label>
          <input
            type="url"
            id="github-url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="edit-instructions" className="block text-sm font-medium text-gray-300 mb-1">
            What changes should I make?
          </label>
          <textarea
            id="edit-instructions"
            rows={5}
            value={editInstructions}
            onChange={(e) => setEditInstructions(e.target.value)}
            placeholder="e.g., 'In App.tsx, change the main heading to blue and add a paragraph below it.'"
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-y"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={isButtonDisabled}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5" />
              Generate Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};
