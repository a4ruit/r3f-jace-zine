import React, { useState, useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAtom } from 'jotai';
import { pageAtom } from './UI';

const AudioPlayer = () => {
  const [currentPage] = useAtom(pageAtom);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  if (currentPage !== 6) return null;

  return (
    <Html
      position={[-0.82, -0.57, 0.1]}
      transform
      scale={0.06}
      occlude
    >
      <div className="pointer-events-auto flex flex-col bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
        <audio
          ref={audioRef}
          src="/audios/Beggin'.mp3"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
       
        <div className="flex items-center justify-between space-x-1">
          <button
            onClick={togglePlay}
            className="p-0.5 rounded-full hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </button>
         
          <div className="flex-1 px-0.5">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="relative -top-0.5 w-full h-0.5 bg-white/20 rounded-sm appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[4px] [&::-webkit-slider-thumb]:h-[4px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-[4px] [&::-moz-range-thumb]:h-[4px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
            />
          </div>
         
          <button
            onClick={toggleMute}
            className="p-0.5 rounded-full hover:bg-white/20 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3 text-white" />
            ) : (
              <Volume2 className="w-3 h-3 text-white" />
            )}
          </button>
        </div>
      </div>
    </Html>
  );
};

export default AudioPlayer;