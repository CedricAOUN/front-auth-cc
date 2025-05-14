import { useNavigate, Outlet } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const isValidToken = token && new Date(token.expiresAt) > new Date();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isValidToken) {
      dispatch(logout());
      navigate('/connexion');
      return;
    }
  }, [navigate]);
  
  return <Outlet />;
};
export default PrivateRoute;
