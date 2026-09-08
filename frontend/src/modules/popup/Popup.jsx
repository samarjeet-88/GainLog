import React, { useEffect, useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

/**
 * Neon Tactical Cyberpunk Error Toast Notification
 */
const Popup = ({ message, text, onClose, autoCloseMs = 4000, popupKey }) => {
    const displayMessage = message || text;
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!autoCloseMs || !onClose || !displayMessage) return;

        setProgress(100);
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsedTime / autoCloseMs) * 100);
            setProgress(remaining);

            if (elapsedTime >= autoCloseMs) {
                clearInterval(interval);
                onClose();
            }
        }, 30);

        return () => clearInterval(interval);
    }, [autoCloseMs, onClose, displayMessage, popupKey]);

    if (!displayMessage) return null;

    return (
        <div className="fixed top-6 right-6 z-50 w-[90%] max-w-md animate-in slide-in-from-top-6 fade-in duration-300 ease-out">
            {/* Outer Glow Container */}
            <div className="relative overflow-hidden bg-[#0F0A0D]/95 backdrop-blur-md text-white rounded-md border border-[#3A141D] shadow-[0_0_30px_rgba(229,46,77,0.25),0_20px_50px_rgba(0,0,0,0.9)]">
                
                {/* Top Subtle Red Gradient Glow */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E52E4D] to-transparent opacity-80" />
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#E52E4D] shadow-[0_0_10px_#E52E4D]" />

                <div className="flex items-start gap-3.5 p-4 pl-5 pr-10">
                    {/* Neon Glowing Warning Icon */}
                    <div className="relative flex-shrink-0 mt-0.5">
                        <div className="absolute inset-0 rounded-full bg-[#E52E4D]/30 blur-sm animate-pulse" />
                        <AlertTriangle size={20} className="relative text-[#E52E4D] drop-shadow-[0_0_8px_rgba(229,46,77,0.9)]" />
                    </div>

                    {/* Text Message */}
                    <div className="text-sm text-white/90 leading-relaxed font-sans font-medium">
                        {typeof displayMessage === 'string' ? <p>{displayMessage}</p> : displayMessage}
                    </div>

                    {/* Close Button */}
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close notification"
                            className="absolute top-3 right-3 text-white/40 hover:text-white hover:bg-white/10 transition-colors p-1 rounded-sm cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Animated Auto-Close Countdown Progress Bar */}
                {autoCloseMs > 0 && (
                    <div className="w-full bg-white/5 h-[2px]">
                        <div
                            className="h-full bg-[#E52E4D] shadow-[0_0_8px_#E52E4D] transition-all duration-75 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Popup;
