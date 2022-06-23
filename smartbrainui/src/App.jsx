import React, { useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ParticlesOptions from './ParticlesOptions';

import './App.css';

const App = () => {
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [box, setBox] = useState({});
    const [route, setRoute] = useState('signin');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    });

    const particlesInit = async (main) => {
        await loadFull(main);
    };

    const calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height
        };
    };

    const displayFaceBox = (box) => setBox(box);

    const onInputChange = (e) => setInput(e.target.value);

    const loadUser = (data) => setUser({ id: data.id, name: data.name, email: data.email, entries: data.entries, joined: data.joined });

    const onButtonSubmit = (e) => {
        setImageUrl(input);
        fetch(`${import.meta.env.VITE_SERVER_API_URL}/imageurl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: input })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    fetch(`${import.meta.env.VITE_SERVER_API_URL}}/image`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: user.id })
                    })
                        .then((res) => res.json())
                        .then((count) => setUser({ ...user, entries: count }))
                        .catch(console.log);
                }
                displayFaceBox(calculateFaceLocation(res));
            })
            .catch((err) => console.log(err));
    };

    const onRouteChange = (route) => {
        if (route === 'signout') {
            setUser({
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            });
            setInput('');
            setBox({});
            setImageUrl('');
            setRoute('signin');
            setIsSignedIn(false);
        }

        if (route === 'home') {
            setIsSignedIn(true);
        }

        setRoute(route);
        return;
    };

    return (
        <div className='App'>
            <Particles id='tsparticles' options={ParticlesOptions} init={particlesInit} />
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            {route === 'home' ? (
                <>
                    <Logo />
                    <Rank name={user.name} entries={user.entries} />
                    <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
                    <FaceRecognition box={box} imageUrl={imageUrl} />
                </>
            ) : route === 'register' ? (
                <Register onRouteChange={onRouteChange} loadUser={loadUser} />
            ) : (
                <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
            )}
        </div>
    );
};

export default App;
