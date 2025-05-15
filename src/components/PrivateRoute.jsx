import { useNavigate, Outlet } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const isValidToken = auth.token && new Date(auth.expiresAt) > new Date();
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
