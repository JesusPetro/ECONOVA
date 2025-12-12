import React, { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import ResultCard from './components/ResultCard';

const API_URL = "http://localhost:8000";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = async (capturedFile) => {
    setFile(capturedFile);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', capturedFile);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Error de conexión con el servidor IA");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-black text-green-600 tracking-tighter">
          SmartRecycle <span className="text-gray-800 font-light">Coach</span>
        </h1>
      </header>

      <main className="w-full max-w-md">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
            <p className="text-xl font-medium text-gray-600 animate-pulse">Analizando residuo...</p>
          </div>
        ) : result ? (
          <ResultCard result={result} onReset={handleReset} />
        ) : (
          <CameraCapture onCapture={handleCapture} />
        )}
      </main>
    </div>
  );
}

export default App;
