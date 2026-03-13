import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'renter' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      alert('Registered successfully!');
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h3>Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" placeholder="Name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select className="form-select" name="role" onChange={handleChange}>
                    <option value="renter">Renter</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;