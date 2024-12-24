import React, { useState, useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { useAtom } from 'jotai';
import { pageAtom } from './UI';

const VideoPlayer = () => {
  const [currentPage] = useAtom(pageAtom);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  if (currentPage !== 5) return null;

  return (
    <Html
      position={[-1.3, 0.55, 0.04]}
      transform
      scale={0.06}
      occlude
    >
      <div 
        ref={containerRef}
        className="pointer-events-auto flex flex-col bg-white/10 backdrop-blur-sm rounded-md overflow-hidden border border-white/20 w-48"
      >
        <div className="flex justify-center p-2">
          <div className="w-64 rounded-md overflow-hidden">
            <div className="aspect-[9/16]">
              <video
                ref={videoRef}
                src="/videos/erika.mp4"
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between space-x-1 p-1">
          <button
            onClick={togglePlay}
            className="p-0.5 rounded-sm hover:bg-white/10 transition-colors"
          >
            {isPlaying ? (
              <div className="w-3 h-3 flex items-center justify-center">
                <div className="w-0.5 h-full bg-white mx-0.5"></div>
                <div className="w-0.5 h-full bg-white mx-0.5"></div>
              </div>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 2L9 6L3 10V2Z" fill="white"/>
              </svg>
            )}
          </button>
          
          <div className="flex-1 px-0.5">
            <div className="relative w-full h-4 flex items-center group">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="absolute w-full h-0.5 bg-white/20 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[6px] [&::-webkit-slider-thumb]:h-[6px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-[6px] [&::-moz-range-thumb]:h-[6px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 group-hover:bg-white/30"
              />
              <div 
                className="absolute h-0.5 bg-white/40 pointer-events-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <button
            onClick={toggleMute}
            className="p-0.5 rounded-full hover:bg-white/10 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3 text-white" />
            ) : (
              <Volume2 className="w-3 h-3 text-white" />
            )}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-0.5 rounded-full hover:bg-white/10 transition-colors"
          >
            {isFullscreen ? (
              <Minimize className="w-3 h-3 text-white" />
            ) : (
              <Maximize className="w-3 h-3 text-white" />
            )}
          </button>
        </div>
      </div>
    </Html>
  );
};

export default VideoPlayer;