import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Reg = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ first_name: '', last_name: '', email: '', password: '', confirmPassword: '',adopte:'' })
    const [errors, setErrors] = useState({ first_name: '', last_name: '', email: '', password: '', confirmPassword: '' })
    const register = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/api/register', user, { withCredentials: true })
            console.log('SERVER RESPONSE:', response.data)
            localStorage.setItem('token', response.data.token)
            navigate (window.location.href='/')
        } catch (error) {
            console.log("Error:", error.response.data);
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
                            <form onSubmit={register} id="signup-form" className="signup-form">
                                <h2 className="form-title">Create account</h2>
                                <div className="form-group">
                                    <input type="text" className="form-input" name="name" id="name" placeholder="Your Name"
                                        onChange={e => setUser({ ...user, first_name: e.target.value })}
                                        value={user.first_name}
                                    />
                                    <span className="text-danger">{errors.first_name}</span>
                                </div>
                                <div className="form-group">
                                    <input type="text"  name="name2" className="form-input" placeholder="Your lastName"
                                        onChange={e => setUser({ ...user, last_name: e.target.value })}
                                        value={user.last_name}
                                    />
                                    <span className="text-danger">{errors.last_name}</span>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-input" name="email" id="email" placeholder="Your Email"
                                        onChange={e => setUser({ ...user, email: e.target.value })}
                                        value={user.email}
                                    />
                                    <span className="text-danger">{errors.email}</span>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-input" name="password" id="password" placeholder="Password"
                                        onChange={e => setUser({ ...user, password: e.target.value })}
                                        value={user.password}
                                    />
                                    <span className="text-danger">{errors.password}</span>
                                    <span className="zmdi zmdi-eye field-icon toggle-password"></span>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-input" name="re_password" id="re_password" placeholder="Repeat your password"
                                        onChange={e => setUser({ ...user, confirmPassword: e.target.value })}
                                        value={user.confirmPassword}
                                    />
                                    <span className="text-danger ">{errors.confirmPassword}</span>
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term"  onChange={e => setUser({ ...user, adopte: e.target.checked })}  checked={user.adopte} />
                                    <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>Do you agree to adopt an animal? <a href="#" className="term-service"></a></label>
                                </div>
                                <div className="form-group">
                                    <button name="submit" id="submit" className="form-submit">Sign up</button>
                                </div>
                            </form>
                            <p className="loginhere">
                                Have already an account ? <Link to="/login" className="loginhere-link">Login here</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Reg;
