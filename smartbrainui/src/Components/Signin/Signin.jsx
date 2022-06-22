import React, { useState } from 'react';

const Signin = ({ onRouteChange, loadUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const onSubmit = (e) => {
        fetch('http://localhost:5000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.id) {
                    loadUser(data);
                    onRouteChange('home');
                } else {
                    alert('Wrong Email and Passowrd');
                }
            });
    };

    return (
        <div className='br3 ba b--black-10 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center tc'>
            <div className='pa4 black-80'>
                <div className='measure'>
                    <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                        <div className='f2 fw6 ph0 mh0 tc'>Sign In</div>
                        <div className='mt4'>
                            <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                                Email
                            </label>
                            <input
                                className='pa2 input-reset ba bg-transparent b--black hover-bg-black hover-white w-100'
                                type='email'
                                name='email-address'
                                id='email-address'
                                onChange={onEmailChange}
                            />
                        </div>
                        <div className='mv3'>
                            <label className='db fw6 lh-copy f6' htmlFor='password'>
                                Password
                            </label>
                            <input
                                className='b pa2 input-reset ba bg-transparent b--black hover-bg-black hover-white w-100'
                                type='password'
                                name='password'
                                id='password'
                                onChange={onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className=''>
                        <input
                            className='br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                            type='submit'
                            value='Sign in'
                            onClick={onSubmit}
                        />
                    </div>
                    <div className='lh-copy mt3'>
                        <p onClick={() => onRouteChange('register')} className='f5 underline link dim black db pointer'>
                            Register
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
