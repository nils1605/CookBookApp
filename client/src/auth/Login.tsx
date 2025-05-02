import { useForm } from 'react-hook-form';
import axios from '../api/axios';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('/auth/login', data);
      saveToken(res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register('email')} />
      <input placeholder="Password" type="password" {...register('password')} />
      <button type="submit">Login</button>
    </form>
  );
}
