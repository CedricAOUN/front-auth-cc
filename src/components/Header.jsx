import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router';
import '../assets/styles/Header.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isValidToken = auth.token && new Date(auth.expiresAt) > new Date();
  const token = isValidToken ? auth.token : null;

  useEffect(() => {
    if(!isValidToken) {
      dispatch(logout());
    }
  }, [location, isValidToken, dispatch]);

  return (
    <Navbar bg='light' data-bs-theme='light'>
      <Container>
        <Nav className='ms-auto'>
          <Nav.Link as={NavLink} to='/'>
            Accueil
          </Nav.Link>
          <Nav.Link as={NavLink} to='/offres/publiques'>
            Offres Publiques
          </Nav.Link>
          {token ? (
            <>
              <Nav.Link as={NavLink} to='/offres/professionnelles'>
                Offres Professionnelles
              </Nav.Link>
              <Nav.Link as={NavLink} to='/deconnexion'>
                Déconnexion
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to='/inscription'>
                Inscription
              </Nav.Link>
              <Nav.Link as={NavLink} to='/connexion'>
                Connexion
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
