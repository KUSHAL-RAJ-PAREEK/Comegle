'use client';
import {HTMLAttributes} from 'react';
import useSpotlightEffect from '../../hooks/useSpotlight';

interface SpotlightConfig {
    radius?: number;
    brightness?: number;
    color?: string;
    smoothing?: number;
}

interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
    config?: SpotlightConfig;
}

const SpotlightCursor = ({
                             config = {},
                             className,
                             ...rest
                         }: SpotlightCursorProps) => {

    const spotlightConfig = {
        radius: 200,
        brightness: 0.15,
        color: '#ffffff',
        smoothing: 0.1,
        ...config,
    };

    const canvasRef = useSpotlightEffect(spotlightConfig);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className}`}
            {...rest}
        />
    );
};

export default SpotlightCursor;
