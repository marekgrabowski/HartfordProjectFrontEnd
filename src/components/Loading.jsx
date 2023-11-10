import React from 'react';
import '../styles/loading.css'; // Adjust the import path based on your file structure

const Loading = () => {
    return (
        <div className='flex justify-center w-full'>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
