import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const LoadingProgress = () => {
    const isAllTextureLoaded = useSelector(state => state.texture.isAllTextureLoaded)

    const [progressVal, setProgressVal] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressVal(prev => {
                if (isAllTextureLoaded) return 100;
                const randomStep = Math.floor(Math.random() * 10) + 1; // Random step between 1 and 10
                const newProgress = prev + randomStep;
                return newProgress >= 100 ? 100 : newProgress;
            });
        }, 550); // 250ms interval to reach 100 in approximately 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [isAllTextureLoaded]);

    return (
        <div className='loading-bar'>
            <span> Please wait ...</span>
            <div className="progress w-3/5">
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow={progressVal}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${progressVal}%` }}
                ></div>
            </div>
        </div>
    );
};

export default LoadingProgress;