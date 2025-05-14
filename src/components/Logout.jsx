import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router';


const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // (1) Appel API pour notifier la déconnexion
        const response = await fetch('https://offers-api.digistos.com/api/auth/logout', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          const err =  new Error(data.message || 'Une erreur est survenue lors de la déconnexion.');
          err.status = response.status;
          throw err;
        }
      } catch (error) {
        console.error(error);
      } finally {
        // (2) Suppression du token côté frontend
        dispatch(logout());
        // (3) Redirection vers la page de login
        navigate('/connexion');
      }
    };
    handleLogout();
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
