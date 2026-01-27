"use client";

import {
  useLocalParticipant,
  useParticipants,
  RoomAudioRenderer,
  ConnectionStateToast,
} from "@livekit/components-react";
import { Mic, MicOff, ChevronDown, PhoneOff, Volume2, User, Radio, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomVideoConferenceProps {
  onEndCall?: () => void;
}

export function CustomVideoConference({
  onEndCall,
}: CustomVideoConferenceProps) {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const participants = useParticipants();

  // Sync state with actual participant state
  const [isMicEnabled, setIsMicEnabled] = useState(isMicrophoneEnabled ?? true);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [audioLevels, setAudioLevels] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    setIsMicEnabled(isMicrophoneEnabled ?? true);
  }, [isMicrophoneEnabled]);

  // Find agent participant (any remote participant that's not the local one)
  const agentParticipant = participants.find(
    (p) => p.identity !== localParticipant?.identity
  );

  // Check if agent is speaking
  useEffect(() => {
    if (!agentParticipant) {
      setIsAgentSpeaking(false);
      return;
    }

    // Set initial state
    setIsAgentSpeaking(agentParticipant.isSpeaking);

    // Use a polling approach to check speaking state
    // This is more reliable than event listeners which may not always fire
    const interval = setInterval(() => {
      if (agentParticipant) {
        setIsAgentSpeaking(agentParticipant.isSpeaking);
      }
    }, 100); // Check every 100ms for smooth animation

    return () => {
      clearInterval(interval);
    };
  }, [agentParticipant]);

  // Check if user (local participant) is speaking
  useEffect(() => {
    if (!localParticipant) {
      setIsUserSpeaking(false);
      return;
    }

    // Set initial state
    setIsUserSpeaking(localParticipant.isSpeaking);

    // Use a polling approach to check speaking state
    const interval = setInterval(() => {
      if (localParticipant) {
        setIsUserSpeaking(localParticipant.isSpeaking);
      }
    }, 100); // Check every 100ms for smooth animation

    return () => {
      clearInterval(interval);
    };
  }, [localParticipant]);

  // Generate dynamic audio levels for visualization
  useEffect(() => {
    const isActive = isUserSpeaking || isAgentSpeaking;
    
    if (!isActive) {
      setAudioLevels([0, 0, 0, 0, 0]);
      return;
    }

    const interval = setInterval(() => {
      // Generate random levels with center bar being highest (like in the image)
      // Center bar should be solid/highest, outer bars progressively shorter
      const centerLevel = 0.7 + Math.random() * 0.3; // 0.7 to 1.0 (center is always high)
      const levels = [
        Math.random() * 0.3, // Leftmost: 0-0.3 (lightest)
        Math.random() * 0.5 + 0.2, // Left: 0.2-0.7 (medium)
        centerLevel, // Center: 0.7-1.0 (highest/solid)
        Math.random() * 0.5 + 0.2, // Right: 0.2-0.7 (medium)
        Math.random() * 0.3, // Rightmost: 0-0.3 (lightest)
      ];
      setAudioLevels(levels);
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(interval);
  }, [isUserSpeaking, isAgentSpeaking]);

  const handleToggleMic = async () => {
    if (localParticipant) {
      try {
        if (isMicEnabled) {
          await localParticipant.setMicrophoneEnabled(false);
        } else {
          await localParticipant.setMicrophoneEnabled(true);
        }
      } catch (error) {
        console.error("Error toggling microphone:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-[#fafafa] via-white to-[#fafafa] relative overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Background Pattern - Subtle */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0a0a0a 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Professional Agent Status Panel - Left side */}
        <div className="absolute left-[8%] top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="relative flex flex-col items-start gap-4 animate-fade-in">
            {/* Main Agent Card */}
            <div className="relative group">
              {/* Glassmorphism Card */}
              <div className="px-6 py-5 bg-white/85 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                <div className="flex flex-col gap-4">
                  {/* Agent Header */}
                  <div className="flex items-center gap-3">
                    {/* Agent Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#02563d] to-[#034d35] flex items-center justify-center shadow-lg ring-2 ring-white/50">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      {/* Speaking Indicator Ring */}
                      {isAgentSpeaking && (
                        <>
                          <div className="absolute inset-0 rounded-full border-2 border-[#02563d]/40 animate-ping" />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#02563d] rounded-full border-2 border-white shadow-lg animate-pulse">
                            <div className="absolute inset-0 rounded-full bg-[#02563d] animate-ping opacity-75" />
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Agent Info */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">AI Interviewer</span>
                        {agentParticipant && (
                          <CheckCircle2 className="w-4 h-4 text-[#02563d]" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Active Session</span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200/60">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                      isAgentSpeaking 
                        ? 'bg-[#02563d]/10 border border-[#02563d]/20' 
                        : 'bg-gray-100/80 border border-gray-200/50'
                    }`}>
                      <div className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                        isAgentSpeaking 
                          ? 'bg-[#02563d] animate-pulse' 
                          : 'bg-gray-400'
                      }`}>
                        {isAgentSpeaking && (
                          <div className="absolute inset-0 rounded-full bg-[#02563d] animate-ping opacity-75" />
                        )}
                      </div>
                      <span className={`text-xs font-medium transition-colors duration-300 ${
                        isAgentSpeaking ? 'text-[#02563d]' : 'text-gray-600'
                      }`}>
                        {isAgentSpeaking ? 'Speaking' : 'Listening'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Glow Effect when Speaking */}
              {isAgentSpeaking && (
                <div className="absolute inset-0 rounded-2xl bg-[#02563d]/5 blur-xl -z-10 animate-pulse" />
              )}
            </div>

            {/* Connection Quality Indicator */}
            {agentParticipant && (
              <div className="px-4 py-2.5 bg-white/70 backdrop-blur-md rounded-xl shadow-sm border border-gray-200/40">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-[#02563d]" />
                  <span className="text-xs font-medium text-gray-700">Connection Stable</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Professional Audio Visualization - Right side */}
        <div className="absolute right-[15%] top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="relative flex flex-col items-center gap-4">
            {/* Status Label */}
            {(isUserSpeaking || isAgentSpeaking) && (
              <div className="mb-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-gray-200/50">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-700">
                    {isUserSpeaking ? "You" : "Agent"} Speaking
                  </span>
                </div>
              </div>
            )}
            
            {/* Audio Visualization Bars Container */}
            <div className="relative flex items-end justify-center gap-2.5 px-4 py-3 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50">
              {audioLevels.map((level, index) => {
                const isCenter = index === 2;
                const isActive = isUserSpeaking || isAgentSpeaking;
                // Professional color scheme: Blue for user, Green for agent
                const color = isUserSpeaking ? "#2563eb" : "#02563d";
                
                // Height calculation: Center bar tallest, outer bars progressively shorter
                const maxHeight = isCenter ? 64 : index === 1 || index === 3 ? 40 : 24;
                const dynamicHeight = maxHeight * (isActive ? Math.max(level, 0.15) : 0.15);
                
                // Opacity gradient: center solid, outer bars lighter
                const opacity = isCenter ? 1 : index === 1 || index === 3 ? 0.7 : 0.4;
                
                // Width: center bar slightly wider
                const width = isCenter ? "12px" : "8px";
                
                return (
                  <div
                    key={index}
                    className="rounded-full transition-all duration-100 ease-out will-change-transform"
                    style={{
                      width,
                      height: `${Math.max(dynamicHeight, 6)}px`,
                      backgroundColor: isActive ? color : "#e5e7eb",
                      opacity: isActive ? opacity : 0.3,
                      boxShadow: isActive && isCenter 
                        ? `0 0 12px ${color}40` 
                        : isActive 
                        ? `0 0 6px ${color}20` 
                        : 'none',
                      transform: isActive ? 'scaleY(1)' : 'scaleY(0.5)',
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Connection Status Indicator - Top Right */}
        <div className="absolute top-6 right-6 z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-gray-200/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-700">Connected</span>
          </div>
        </div>
      </div>

      {/* Professional Control Bar - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/90 to-white/85 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]" />
        
        <div className="relative flex items-center justify-between px-8 py-5">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            {/* Microphone Control */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="group relative flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-200/60 hover:border-gray-300 hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label={
                    isMicEnabled ? "Mute microphone" : "Unmute microphone"
                  }
                >
                  <div className={`relative ${isMicEnabled ? 'text-gray-700' : 'text-red-500'}`}>
                    {isMicEnabled ? (
                      <Mic className="w-5 h-5 transition-transform group-hover:scale-110" />
                    ) : (
                      <MicOff className="w-5 h-5 transition-transform group-hover:scale-110" />
                    )}
                    {isMicEnabled && isUserSpeaking && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {isMicEnabled ? "Mute" : "Unmute"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem onClick={handleToggleMic} className="cursor-pointer">
                  <Mic className="w-4 h-4 mr-2" />
                  {isMicEnabled ? "Mute Microphone" : "Unmute Microphone"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Controls - END CALL */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onEndCall}
              className="group relative flex items-center gap-2 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 border-0"
            >
              <PhoneOff className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>End Call</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Essential LiveKit Components */}
      <RoomAudioRenderer />
      <ConnectionStateToast />
    </div>
  );
}
