"use client";
import SpinningStars from '@/components/SpinningStars';
import WaterColor from '@/components/WaterColor';
import React from 'react';


const CanvasPage: React.FC = () => {
    
    return (
        <div>
            <h1>Canvas Page</h1>
            <SpinningStars height="500px"></SpinningStars>
            <WaterColor height="400px"></WaterColor>
        </div>
    );
};

export default CanvasPage;