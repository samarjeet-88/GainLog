import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
    return (
        <div className="relative flex flex-col md:flex-row w-full min-h-screen md:h-screen bg-[#0B0A08] overflow-y-auto md:overflow-hidden">
            <div
                className="absolute inset-x-0 top-0 h-[550px] pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200, 30, 58, 0.35), transparent 70%), linear-gradient(180deg, rgba(200, 30, 58, 0.20) 0%, transparent 100%)'
                }}
            />

            <div className="relative flex flex-col md:flex-row w-full h-full z-10">
                <div className="hidden md:flex flex-col justify-center w-1/2 p-8 md:p-14 h-full">
                    <div className="max-w-md">
                        <h1 className="text-2xl md:text-3xl font-normal font-bebas tracking-wide mb-6">
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

                <div className="flex flex-col justify-center w-full md:w-1/2 px-6 py-6 md:px-14 h-full my-auto">
                    <div className="max-w-sm w-full mx-auto">
                        <div className="md:hidden mb-4 text-center">
                            <h1 className="text-3xl font-normal font-bebas tracking-wide">
                                <span className="text-white">GAIN</span>
                                <span className="text-[#C81E3A]">LOG</span>
                            </h1>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-normal font-bebas tracking-wide text-white mb-3 md:mb-4 text-center md:text-left">
                            JOIN THE CAMP
                        </h2>

                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
