import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/register';
import { handleAsync } from '../../../shared/utils/handleAsync';
import Popup from '../../popup/Popup';
import GoogleAuthButton from './GoogleAuthButton';
import AuthDivider from './AuthDivider';

const RegisterForm = () => {
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

        const [data, error] = await handleAsync(
            registerUser({ fullName, email, password, confirmPassword })
        );

        if (error) {
            console.error('Registration failed:', error.message);
            setPopupText(error.response?.data?.message || error.message || 'Registration failed');
            return;
        }

        setPopupText(data?.message || 'Operative successfully enlisted into dossier.');
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="border-t-2 border-[#C81E3A] pt-3.5 flex flex-col gap-2.5">
                <GoogleAuthButton />
                <AuthDivider />

                <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-1">
                        Full name
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#E8E4DB] text-black placeholder-black/40 rounded-sm px-3.5 py-2 text-sm outline-none border border-transparent focus:border-[#C81E3A] focus:ring-2 focus:ring-[#C81E3A]/20 transition-colors"
                        placeholder="J. Doe"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#E8E4DB] text-black placeholder-black/40 rounded-sm px-3.5 py-2 text-sm outline-none border border-transparent focus:border-[#C81E3A] focus:ring-2 focus:ring-[#C81E3A]/20 transition-colors"
                        placeholder="athlete@gainlog.co"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-1">
                        Password
                    </label>
                    <div className="relative flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#E8E4DB] text-black placeholder-black/40 rounded-sm px-3.5 py-2 pr-10 text-sm outline-none border border-transparent focus:border-[#C81E3A] focus:ring-2 focus:ring-[#C81E3A]/20 transition-colors"
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
                    <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-1">
                        Confirm Password
                    </label>
                    <div className="relative flex items-center">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-[#E8E4DB] text-black placeholder-black/40 rounded-sm px-3.5 py-2 pr-10 text-sm outline-none border border-transparent focus:border-[#C81E3A] focus:ring-2 focus:ring-[#C81E3A]/20 transition-colors"
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
                    className="mt-1 bg-[#C81E3A] hover:bg-[#E05A6D] text-white font-bebas text-lg md:text-xl tracking-wide py-2.5 rounded-sm transition-colors cursor-pointer"
                >
                    ENLIST
                </button>

                <div className="text-center mt-1">
                    <span className="text-md font-bold font-sans text-white/60">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-[#C81E3A] hover:underline font-semibold cursor-pointer"
                        >
                            Log in
                        </Link>
                    </span>
                </div>
            </form>

            <Popup
                key={popupKey}
                popupKey={popupKey}
                message={popupText}
                autoCloseMs={4000}
                onClose={() => setPopupText('')}
            />
        </>
    );
};

export default RegisterForm;
