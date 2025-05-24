import { useAuth } from '../context/AuthContext';

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded">
      Logout
    </button>
  );
}
