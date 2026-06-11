'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };



  return (
    <div className="fixed bottom-6 right-6 z-50 bg-transparent backdrop-blur-sm p-4 flex items-center">
      <audio
        ref={audioRef}
        src="/Turning_Page__Instrumental_(128k).mp3"
        loop
      />
      
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center hover:bg-yellow-600 transition-colors"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
      </button>
      
    </div>
  );
}
