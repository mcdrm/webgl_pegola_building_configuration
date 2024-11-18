import React from 'react'

const LoadingProgress = () => {
    return (
        <div className='loading-bar'>
            <span> Please wait ...</span>
            <div className="progress w-3/5">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="60" style={{width: "75%"}}></div>
            </div>
        </div>
    )
}

export default LoadingProgress