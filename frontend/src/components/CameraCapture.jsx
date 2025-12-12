import React from 'react';

const CameraCapture = ({ onCapture }) => {
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onCapture(e.target.files[0]);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 text-center">
            <div className="relative w-48 h-48 mb-6 group cursor-pointer">
                {/* Button UI */}
                <div className="absolute inset-0 bg-green-500 rounded-full shadow-lg flex items-center justify-center transform transition-transform group-hover:scale-105 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                {/* Hidden Input */}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Toca para escanear</h2>
            <p className="text-gray-500 mt-2">Identifica tu residuo con IA</p>
        </div>
    );
};

export default CameraCapture;
