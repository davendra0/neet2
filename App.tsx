
import React, { useState, useCallback } from 'react';
import { GitHubInputForm } from './components/GitHubInputForm';
import { CodeDisplay } from './components/CodeDisplay';
import { generateCode } from './services/geminiService';
import { GithubIcon, SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [githubUrl, setGithubUrl] = useState<string>('');
  const [editInstructions, setEditInstructions] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCode = useCallback(async () => {
    if (!githubUrl || !editInstructions) {
      setError('Please provide both a GitHub URL and edit instructions.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const code = await generateCode({ githubUrl, editInstructions });
      setGeneratedCode(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [githubUrl, editInstructions]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <GithubIcon className="h-10 w-10 text-white" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              AI Code Editor
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Provide a GitHub link and editing instructions. Our AI will read your code and generate the updated version for you.
          </p>
        </header>

        <main className="space-y-6">
          <GitHubInputForm
            githubUrl={githubUrl}
            setGithubUrl={setGithubUrl}
            editInstructions={editInstructions}
            setEditInstructions={setEditInstructions}
            onSubmit={handleGenerateCode}
            isLoading={isLoading}
          />
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-center">
              <p>{error}</p>
            </div>
          )}
          
          <CodeDisplay code={generatedCode} isLoading={isLoading} />
        </main>

        <footer className="text-center mt-12 text-gray-500">
          <p>Powered by Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
