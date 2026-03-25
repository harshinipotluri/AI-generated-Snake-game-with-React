import React from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';

export const SnakeGame: React.FC = () => {
  const { snake, food, score, gameOver, isPaused, resetGame, gridSize } = useSnakeGame();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6 bg-black brutal-border-magenta">
      
      {/* Header / Score */}
      <div className="flex justify-between items-center w-full mb-6 px-4 border-b-4 border-[#FF00FF] pb-4">
        <h2 className="text-4xl font-bold text-[#FF00FF] glitch-text" data-text="SECTOR_7G">
          SECTOR_7G
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-[#00FFFF] text-4xl bg-black px-4 py-2 border-2 border-[#00FFFF]">
            DATA_HARVESTED:<span className="text-[#FF00FF] ml-2">{score.toString().padStart(4, '0')}</span>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative group w-full flex justify-center">
        <div 
          className="bg-black border-4 border-[#00FFFF] relative w-full aspect-square max-w-[500px]"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {/* Grid Background Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-30" 
               style={{
                 backgroundImage: 'linear-gradient(to right, #00FFFF 1px, transparent 1px), linear-gradient(to bottom, #00FFFF 1px, transparent 1px)',
                 backgroundSize: `${100/gridSize}% ${100/gridSize}%`
               }} 
          />

          {/* Snake */}
          {snake.map((segment, index) => {
            const isHead = index === 0;
            return (
              <div
                key={`${segment.x}-${segment.y}-${index}`}
                className={`${isHead ? 'bg-[#FF00FF]' : 'bg-[#00FFFF]'}`}
                style={{
                  gridColumnStart: segment.x + 1,
                  gridRowStart: segment.y + 1,
                  border: '1px solid #000'
                }}
              />
            );
          })}

          {/* Food */}
          <div
            className="bg-[#FF00FF] animate-pulse z-0"
            style={{
              gridColumnStart: food.x + 1,
              gridRowStart: food.y + 1,
              border: '2px solid #00FFFF'
            }}
          />

          {/* Overlays */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 border-4 border-[#FF00FF]">
              <h3 className="text-5xl font-black text-[#FF00FF] mb-4 text-center glitch-text" data-text="CRITICAL_ERROR">CRITICAL_ERROR</h3>
              <p className="text-[#00FFFF] mb-8 text-2xl">ENTITY_TERMINATED // SCORE: {score}</p>
              <button 
                onClick={resetGame}
                className="bg-[#00FFFF] text-black font-bold py-4 px-8 text-2xl hover:bg-[#FF00FF] hover:text-white transition-colors uppercase"
              >
                &gt; EXECUTE_REBOOT
              </button>
            </div>
          )}

          {isPaused && !gameOver && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 border-4 border-[#00FFFF]">
              <h3 className="text-5xl font-bold text-[#00FFFF] mb-4 glitch-text" data-text="SYSTEM_PAUSED">SYSTEM_PAUSED</h3>
              <p className="text-[#FF00FF] text-2xl">&gt; AWAITING_INPUT [SPACE]</p>
            </div>
          )}
        </div>
      </div>

      {/* Controls Hint */}
      <div className="mt-6 text-[#00FFFF] text-xl flex flex-col items-center gap-2">
        <span>&gt; INPUT_VECTOR: [W,A,S,D] OR [ARROWS]</span>
        <span>&gt; HALT_EXECUTION: [SPACE]</span>
      </div>
    </div>
  );
};
