import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  {
    id: 1,
    title: "AUDIO_STREAM_01",
    artist: "UNKNOWN_ENTITY",
    url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=synthwave-80s-110045.mp3"
  },
  {
    id: 2,
    title: "AUDIO_STREAM_02",
    artist: "NEURAL_NET_V2",
    url: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=cyberpunk-2099-10701.mp3"
  },
  {
    id: 3,
    title: "AUDIO_STREAM_03",
    artist: "ALGORITHM_X",
    url: "https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b3cb0044.mp3?filename=retrowave-103681.mp3"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => {
        console.error("Audio playback failed:", e);
        setIsPlaying(false);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full bg-black p-6 brutal-border">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />

      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="border-b-4 border-[#00FFFF] pb-2 flex justify-between items-end">
          <h2 className="text-3xl text-[#00FFFF] glitch-text" data-text="AUDIO_PROTOCOL">AUDIO_PROTOCOL</h2>
          <span className="text-[#FF00FF] text-xl animate-pulse">{isPlaying ? 'ACTIVE' : 'STANDBY'}</span>
        </div>

        {/* Track Info */}
        <div className="flex flex-col gap-2">
          <div className="text-2xl text-[#FF00FF]">
            &gt; FILE: <span className="text-white">{currentTrack.title}</span>
          </div>
          <div className="text-xl text-[#00FFFF]">
            &gt; SRC: <span className="text-white">{currentTrack.artist}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-6 bg-black border-2 border-[#00FFFF] relative">
          <div 
            className="h-full bg-[#FF00FF] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-black font-bold mix-blend-difference text-sm">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={toggleMute}
            className="text-xl border-2 border-[#00FFFF] px-4 py-2 hover:bg-[#00FFFF] hover:text-black transition-colors"
          >
            {isMuted ? '[MUTE: ON]' : '[MUTE: OFF]'}
          </button>

          <div className="flex gap-4">
            <button 
              onClick={prevTrack}
              className="text-2xl border-2 border-[#FF00FF] px-4 py-2 text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black transition-colors"
            >
              &lt;&lt;
            </button>
            
            <button 
              onClick={togglePlay}
              className="text-2xl border-2 border-[#00FFFF] px-6 py-2 text-[#00FFFF] hover:bg-[#00FFFF] hover:text-black transition-colors"
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            
            <button 
              onClick={nextTrack}
              className="text-2xl border-2 border-[#FF00FF] px-4 py-2 text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black transition-colors"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
