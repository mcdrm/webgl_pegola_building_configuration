import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const LoadingProgress = () => {
    const isAllTextureLoaded = useSelector(state => state.texture.isAllTextureLoaded)
    const isAllModelLoaded = useSelector(state => state.glbModel.isAllModelLoaded)

    const [progressVal, setProgressVal] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressVal(prev => {
                if (isAllTextureLoaded && isAllModelLoaded) {
                    return 100
                } else {
                    const randomStep = Math.floor(Math.random() * 10) + 1;
                    const newProgress = prev + randomStep;
                    return newProgress >= 100 ? 100 : newProgress;
                }
            });
        }, 700);

        return () => clearInterval(interval);
    }, [isAllTextureLoaded, isAllModelLoaded]);

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