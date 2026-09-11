import React from 'react';

const AuthDivider = ({ label = "OR" }) => {
    return (
        <div className="flex items-center my-1 w-full">
            <div className="flex-grow border-t border-white/15"></div>
            <span className="px-3 text-xs font-bold uppercase tracking-widest text-white/50">
                {label}
            </span>
            <div className="flex-grow border-t border-white/15"></div>
        </div>
    );
};

export default AuthDivider;
