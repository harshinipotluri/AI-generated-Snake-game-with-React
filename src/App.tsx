/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#00FFFF] font-digital overflow-x-hidden overflow-y-auto relative flex flex-col items-center justify-center p-4 py-12 scanlines">
      <div className="static-noise"></div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-6xl flex flex-col xl:flex-row items-start justify-center gap-12 screen-tear">
        
        {/* Left: Info & Audio */}
        <div className="w-full xl:w-1/3 flex flex-col gap-8">
          <div className="brutal-border bg-black p-6">
            <h1 className="text-6xl font-black mb-4 text-[#00FFFF] glitch-text" data-text="SYS.OP.TERMINAL">
              SYS.OP.TERMINAL
            </h1>
            <div className="text-[#FF00FF] text-xl mb-2">STATUS: COMPROMISED</div>
            <p className="text-[#00FFFF] text-lg">
              &gt; UPLINK_ESTABLISHED<br/>
              &gt; OVERRIDE_ACCEPTED<br/>
              &gt; AWAITING_COMMAND_INPUT...
            </p>
          </div>
          
          <MusicPlayer />
        </div>

        {/* Right: Game */}
        <div className="flex-1 w-full flex justify-center">
          <SnakeGame />
        </div>

      </div>
    </div>
  );
}
