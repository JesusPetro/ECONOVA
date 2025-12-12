import React from 'react';

const ResultCard = ({ result, onReset }) => {
    if (!result) return null;

    return (
        <div className="glass-card p-6 w-full max-w-md mx-auto animate-fade-in-up">
            {/* Header with Bin Color */}
            <div className={`${result.bin_color} h-32 rounded-xl mb-6 flex items-center justify-center shadow-inner`}>
                <span className="text-4xl font-bold text-white uppercase tracking-wider drop-shadow-md">
                    {result.bin}
                </span>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{result.label}</h2>

                {/* Points Badge */}
                <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    + {result.points} Puntos
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    {result.explanation}
                </p>

                <button
                    onClick={onReset}
                    className="w-full bg-gray-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-black transition-colors"
                >
                    Escanear otro
                </button>
            </div>
        </div>
    );
};

export default ResultCard;
