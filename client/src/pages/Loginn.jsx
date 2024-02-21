/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Loginn = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({ email: '', password: '' })
    const login = async (e) => {
        e.preventDefault()
        try {
            console.log("==========",user)
            const response = await axios.post('http://localhost:8000/api/login', user, { withCredentials: true })
            console.log('SERVER RESPONSE:', response)
            localStorage.setItem('token', response.data.token)
            navigate (window.location.href='/')
        } catch (error) {
            console.log("Error:", error.response);
            let tempErrors = {}
            for (let key of Object.keys(error.response.data)) {
                console.log(key, '------', error.response.data[key].message);
                tempErrors[key] = error.response.data[key].message
            }
            setErrors({ ...tempErrors })
        }
    }
    return (
        <div>
            <div className="main">
                <section className="signup">
                    {/* <img src="images/signup-bg.jpg" alt="" /> */}
                    <div className="containerr">
                        <div className="signup-content">
                            <form onSubmit={login} id="signup-form" className="signup-form">
                                <h2 className="form-title">User logIn</h2>
                                <div className="form-group">
                                    <input type="email" className="form-input" name="email" id="email" placeholder="Your Email"
                                        onChange={e => setUser({ ...user, email: e.target.value })}
                                        value={user.email} />
                                    <span className="text-danger">{errors.email}</span>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-input" name="password" id="password" placeholder="Password"
                                        onChange={e => setUser({ ...user, password: e.target.value })}
                                        value={user.password} />
                                    <span className="text-danger">{errors.password}</span>
                                    <span className="zmdi zmdi-eye field-icon toggle-password"></span>
                                </div>
                                <div className="form-group">
                                    <button  name="submit" id="submit" className="form-submit"> LogIn </button>
                                </div>
                            </form>
                            <p className="loginhere">
                                Don't already Have  an account ? <Link to="/reg" className="loginhere-link">Register here</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Loginn;
