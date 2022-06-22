const ParticlesOption = {
    fullScreen: {
        enable: true,
        zIndex: -10
    },
    fpsLimit: 120,
    particles: {
        number: {
            value: 150,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#022F40',
            animation: {
                enable: true,
                speed: 20,
                sync: true
            }
        },
        opacity: {
            value: 1
        },
        size: {
            value: {
                min: 0.1,
                max: 3
            }
        },
        links: {
            enable: true,
            distance: 100,
            color: '#022F40',
            opacity: 0.5,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            outModes: {
                default: 'out'
            }
        }
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            onClick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 200
            },
            push: {
                quantity: 4
            }
        }
    },
    detectRetina: true
};

export default ParticlesOption;