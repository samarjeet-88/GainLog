import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import GoogleAuthButton from './GoogleAuthButton';
import AuthDivider from './AuthDivider';

const LoginForm = ({
    onSubmit,
    onGoogleSignIn,
    onForgotPassword,
    onCreateAccountClick,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement actual login auth call
        if (onSubmit) {
            onSubmit(e, { email, password });
        } else {
            console.log('LoginForm submitted (stub):', { email, password });
        }
    };

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        // TODO: Implement forgot password navigation / modal trigger
        if (onForgotPassword) {
            onForgotPassword(e);
        } else {
            console.log('Forgot password clicked (stub)');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t-2 border-[#E52E4D] pt-3.5 flex flex-col gap-2.5">
            {/* Google OAuth Button */}
            <GoogleAuthButton label="Continue with Google" onClick={onGoogleSignIn} />

            {/* Divider */}
            <AuthDivider label="OR" />

            {/* Email Field */}
            <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-1">
                    EMAIL
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#E8E4DB] text-black placeholder-black/40 rounded-sm px-3.5 py-2 text-sm outline-none border border-transparent focus:border-[#E52E4D] focus:ring-2 focus:ring-[#E52E4D]/20 transition-colors"
                    placeholder="athlete@gainlog.co"
                />
            </div>

            {/* Password Field */}
            <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-1">
                    PASSWORD
                </label>
                <div className="relative flex items-center">
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#E8E4DB] text-black placeholder-black/40 rounded-sm px-3.5 py-2 pr-10 text-sm outline-none border border-transparent focus:border-[#E52E4D] focus:ring-2 focus:ring-[#E52E4D]/20 transition-colors"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 text-black/60 hover:text-black transition-colors focus:outline-none cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                    </button>
                </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end -mt-1">
                <a
                    href="#forgot-password"
                    onClick={handleForgotPasswordClick}
                    className="text-s font-bold font-sans text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                    Forgot password?
                </a>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-1 bg-[#E52E4D] hover:bg-[#f04562] text-white font-bebas text-lg md:text-xl tracking-wide py-2.5 rounded-sm transition-colors cursor-pointer w-full"
            >
                LOG IN
            </button>

            {/* Link to Signup */}
            <div className="text-center mt-1">
                <span className="text-md font-bold font-sans text-white/60">
                    New here?{' '}
                    <Link
                        to="/register"
                        onClick={onCreateAccountClick}
                        className="text-[#E52E4D] hover:underline font-semibold cursor-pointer"
                    >
                        Create an account
                    </Link>
                </span>
            </div>
        </form>
    );
};

export default LoginForm;
