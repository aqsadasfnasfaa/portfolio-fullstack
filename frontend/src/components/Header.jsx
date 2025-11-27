import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150
        ${isActive(to)
          ? 'bg-white/10 text-white'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-semibold text-white hover:opacity-80 transition-opacity"
        >
          Portfolio
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className="px-3 py-1.5 text-sm font-medium text-white bg-[#0078d4] hover:bg-[#1a86d9] rounded-md transition-colors"
              >
                Admin
              </Link>
              <span className="text-sm text-gray-400">{user.username}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 text-sm font-medium text-white bg-[#0078d4] hover:bg-[#1a86d9] rounded-md transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
