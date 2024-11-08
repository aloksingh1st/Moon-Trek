import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { markerColors, markerSizes } from '../constants/markerStyles';

const MOON_RADIUS = 1;

function latLongToCartesian(latitude, longitude, radius) {
    const latRad = (latitude * Math.PI) / 180;
    const longRad = (longitude * Math.PI) / 180;
    
    const x = radius * Math.cos(latRad) * Math.cos(longRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.sin(longRad);
    
    return [x, y, z];
}

const MarkerOnMoon = ({ 
    latitude, 
    longitude, 
    name,
    type,
    additionalInfo,
    color,
    size,
    pulseEffect = false 
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const position = latLongToCartesian(latitude, longitude, MOON_RADIUS);

    return (
        <mesh 
            position={position}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
        >
            <sphereGeometry args={[size, 8, 8]} />
            <meshStandardMaterial 
                color={color}
                emissive={color}
                emissiveIntensity={isHovered ? 0.8 : 0.3}
                transparent
                opacity={0.8}
            />
            {isHovered && (
                <Html
                    position={[0, size + 0.05, 0]}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: '8px',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '12px',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        minWidth: '120px',
                        textAlign: 'center'
                    }}
                    center
                >
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', marginBottom: '4px', paddingBottom: '4px' }}>
                        {type}
                    </div>
                    <div style={{ fontWeight: 'bold' }}>{name}</div>
                    {additionalInfo && (
                        <div style={{ fontSize: '10px', marginTop: '4px', color: '#aaa' }}>
                            {additionalInfo}
                        </div>
                    )}
                    <div style={{ fontSize: '10px', marginTop: '4px', color: '#aaa' }}>
                        {`${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`}
                    </div>
                </Html>
            )}
        </mesh>
    );
};

export default MarkerOnMoon;
