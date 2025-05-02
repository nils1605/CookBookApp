import React from 'react';
import { useForm } from 'react-hook-form';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await API.post('/auth/register', data);
      alert('Registration successful!');
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <div>
          <label>Name</label>
          <input {...register('name', { required: true })} />
          {errors.name && <span>Name is required</span>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register('email', { required: true })} />
          {errors.email && <span>Email is required</span>}
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register('password', { required: true, minLength: 6 })} />
          {errors.password && <span>Password must be at least 6 characters</span>}
        </div>

        <button type="submit" className="btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
