import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {user && (
          <>
            <Link to="/create">Add Recipe</Link>
            <Link to="/favorites">Favorites</Link>
          </>
        )}
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span>{user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
