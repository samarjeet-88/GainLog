import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../services/register';
import { handleAsync } from '../../../shared/utils/handleAsync';
import Popup from '../../popup/Popup';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [popupText, setPopupText] = useState('');
    const [popupKey, setPopupKey] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate unique key on every submission to restart animation & timer
        setPopupKey(Date.now());

        // Simulated popup demonstration while backend is not connected
        setPopupText(
            `The operative email ${email || 'ram22@yomail.com'} is already registered to an active dossier.`
        );

        /* 
        // Real API handler (uncomment when backend API is live)
        const [data, error] = await handleAsync(
            registerUser({ fullName, email, password, confirmPassword })
        );

        if (error) {
            console.error('Registration failed:', error.message);
            setPopupKey(Date.now());
            setPopupText(error.message || 'Registration failed');
            return;
        }
        */
    };

    return (
        <div className="relative flex flex-col md:flex-row w-full min-h-screen md:h-screen bg-[#0B0A08] overflow-y-auto md:overflow-hidden">
            <div
                className="absolute inset-x-0 top-0 h-[550px] pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200, 30, 58, 0.35), transparent 70%), linear-gradient(180deg, rgba(200, 30, 58, 0.20) 0%, transparent 100%)'
                }}
            />

            <div className="relative flex flex-col md:flex-row w-full h-full z-10">
                <div className="hidden md:flex flex-col justify-center w-1/2 p-8 md:p-16">
                    <div className="max-w-md">
                        <h1 className="text-2xl md:text-3xl font-normal font-bebas tracking-wide mb-8">
                            <span className="text-white">GAIN</span>
                            <span className="text-[#C81E3A]">LOG</span>
                        </h1>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal font-bebas leading-tight tracking-wide text-white">
                            RECORD EVERY <span className="text-[#C81E3A]">SET.</span><br />
                            LOG EVERY <span className="text-[#C81E3A]">EXERCISE.</span>
                        </h2>

                        <p className="mt-4 text-md font-semibold font-sans text-white/50 leading-relaxed max-w-sm">
                            Seamlessly log your daily exercises, weight, and set reps to track your gains and master your training.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-center w-full md:w-1/2 px-6 py-10 md:px-16 my-auto">
                    <div className="max-w-sm w-full mx-auto">
                        <div className="md:hidden mb-6 text-center">
                            <h1 className="text-3xl font-normal font-bebas tracking-wide">
                                <span className="text-white">GAIN</span>
                                <span className="text-[#C81E3A]">LOG</span>
                            </h1>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-normal font-bebas tracking-wide text-white mb-6 text-center md:text-left">
                            JOIN THE CAMP
                        </h2>

                        <form onSubmit={handleSubmit} className="border-t-2 border-[#C81E3A] pt-5 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-1.5">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-[#E8E4DB] text-black placeholder-black/40 rounded-sm px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#C81E3A] focus:ring-2 focus:ring-[#C81E3A]/20"
                                    placeholder="J. Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#E8E4DB] text-black placeholder-black/40 rounded-sm px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#C81E3A] focus:ring-2 focus:ring-[#C81E3A]/20"
                                    placeholder="athlete@gainlog.co"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-1.5">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#E8E4DB] text-black placeholder-black/40 rounded-sm px-4 py-2.5 pr-10 text-sm outline-none border border-transparent focus:border-[#C81E3A] focus:ring-2 focus:ring-[#C81E3A]/20"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 text-black/60 hover:text-black transition-colors focus:outline-none cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-1.5">
                                    Confirm Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-[#E8E4DB] text-black placeholder-black/40 rounded-sm px-4 py-2.5 pr-10 text-sm outline-none border border-transparent focus:border-[#C81E3A] focus:ring-2 focus:ring-[#C81E3A]/20"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 text-black/60 hover:text-black transition-colors focus:outline-none cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-1 bg-[#C81E3A] hover:bg-[#E05A6D] text-white font-bebas text-xl tracking-wide py-3 rounded-sm transition-colors cursor-pointer"
                            >
                                ENLIST
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Popup
                key={popupKey}
                popupKey={popupKey}
                message={popupText}
                autoCloseMs={4000}
                onClose={() => setPopupText('')}
            />
        </div>
    );
};

export default Register;

