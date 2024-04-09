import React, { useState } from 'react';
import axios from 'axios';
function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can perform form validation and submit data
        console.log('Form submitted:', formData);
        // Example: Send form data to backend API
        try {
            const response = await axios.post('http://localhost:7000/users/login', formData);
            console.log('Login successful:', response.data);
            alert(` Welcome ${response.data.user.firstName} ${response.data.user.lastName}`);
            window.location.href = '/';

            
            // Handle successful login
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed : Invalid Credentials');
            //
            // Handle login error
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
