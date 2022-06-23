import React, { useState } from 'react';

const Register = ({ onRouteChange, loadUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onNameChange = (e) => setName(e.target.value);
    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const onSubmit = (e) => {
        if (!name || !email || !password) {
            return alert('Enter Valid Credentials');
        }

        return fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    loadUser(data);
                    onRouteChange('home');
                } else {
                    alert('User Could Not Be Registered');
                }
            });
    };

    return (
        <div className='br3 ba b--black-10 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center tc'>
            <div className='pa4 black-80'>
                <div className='measure'>
                    <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                        <div className='f2 fw6 ph0 mh0 tc'>Register</div>
                        <div className='mt4'>
                            <label className='db fw6 lh-copy f6' htmlFor='name'>
                                Name
                            </label>
                            <input
                                className='pa2 input-reset ba bg-transparent b--black hover-bg-black hover-white w-100'
                                type='text'
                                name='name'
                                id='name'
                                required={true}
                                onChange={onNameChange}
                            />
                        </div>
                        <div className='mv3'>
                            <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                                Email
                            </label>
                            <input
                                className='pa2 input-reset ba bg-transparent b--black hover-bg-black hover-white w-100'
                                type='email'
                                name='email-address'
                                id='email-address'
                                required={true}
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
                                required={true}
                                onChange={onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className=''>
                        <input
                            className='br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                            type='submit'
                            value='Register'
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
