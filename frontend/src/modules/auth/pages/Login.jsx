import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = ({
    onGoogleSignIn,
    onSubmit,
    onForgotPassword,
    onCreateAccountClick,
}) => {
    return (
        <div className="relative flex flex-col md:flex-row w-full min-h-screen md:h-screen bg-[#0B0A08] overflow-y-auto md:overflow-hidden">
            {/* Background Red Glow Gradient */}
            <div
                className="absolute inset-x-0 top-0 h-[550px] pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(229, 46, 77, 0.35), transparent 70%), linear-gradient(180deg, rgba(229, 46, 77, 0.20) 0%, transparent 100%)'
                }}
            />

            <div className="relative flex flex-col md:flex-row w-full h-full z-10">
                {/* Left Branding Panel */}
                <div className="hidden md:flex flex-col justify-center w-1/2 p-8 md:p-14 h-full">
                    <div className="max-w-md">
                        {/* Wordmark */}
                        <h1 className="text-2xl md:text-3xl font-normal font-bebas tracking-wide mb-6">
                            <span className="text-white">GAIN</span>
                            <span className="text-[#E52E4D]">LOG</span>
                        </h1>

                        {/* Main Headline */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal font-bebas leading-tight tracking-wide text-white">
                            PICK UP WHERE YOU <span className="text-[#E52E4D]">LEFT OFF.</span>
                        </h2>

                        {/* Subtext */}
                        <p className="mt-4 text-md font-semibold font-sans text-white/50 leading-relaxed max-w-sm">
                            Your last session, your numbers, your progress — all waiting exactly where you left them.
                        </p>
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="flex flex-col justify-center w-full md:w-1/2 px-6 py-6 md:px-14 h-full my-auto">
                    <div className="max-w-sm w-full mx-auto">
                        {/* Mobile Wordmark */}
                        <div className="md:hidden mb-4 text-center">
                            <h1 className="text-3xl font-normal font-bebas tracking-wide">
                                <span className="text-white">GAIN</span>
                                <span className="text-[#E52E4D]">LOG</span>
                            </h1>
                        </div>

                        {/* Form Title & Subtitle */}
                        <h2 className="text-2xl md:text-3xl font-normal font-bebas tracking-wide text-white mb-0.5 text-center md:text-left">
                            LOG IN
                        </h2>
                        <p className="text-xs font-semibold font-sans text-white/50 mb-3 md:mb-4 text-center md:text-left">
                            Welcome back, athlete.
                        </p>

                        {/* Login Form */}
                        <LoginForm
                            onGoogleSignIn={onGoogleSignIn}
                            onSubmit={onSubmit}
                            onForgotPassword={onForgotPassword}
                            onCreateAccountClick={onCreateAccountClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
