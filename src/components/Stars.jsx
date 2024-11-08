// src/components/ParticleBack.jsx
import React, { useCallback, useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from 'tsparticles';

const ParticleBack = ({ cameraPosition }) => {



    var zoomFactor = cameraPosition?.zoom || 1;

    if (zoomFactor > 10) {
        zoomFactor = 1;
    }

    console.log(zoomFactor);
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    const ParticlesConfig = {
        background: {
            color: {
                value: "#000000" // Black background
            }
        },
        particles: {
            number: {
                value: 200 / zoomFactor, // Adjust this for more/less stars
                density: {
                    enable: true,
                    value_area: 800 / zoomFactor
                }
            },
            color: {
                value: "#ffffff" // White stars
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.7,
                random: true
            },
            size: {
                value: 1.2 * zoomFactor,
                random: true
            },
            move: {
                enable: true,
                speed: 0.1 + zoomFactor * 0.02, // Dynamic speed based on zoom
                direction: "none",
                random: true,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true
                },
                onClick: {
                    enable: false
                }
            },
        },
        retina_detect: true
    };

    return (
        <Particles
            id='tsparticles'
            particlesLoaded={particlesLoaded}
            init={particlesInit}
            options={ParticlesConfig}
            height='100vh'
            width='100vw'
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1, // Ensure it stays behind other components
            }}
        />
    );
};

export default ParticleBack;
