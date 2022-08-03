import React from 'react';
import { Link } from '@reach/router';

import { NAVBAR_ROUTES } from 'components/routes/routes';

import './Navbar.scss';

interface INavbarProps {
  routes: typeof NAVBAR_ROUTES;
  className?: string;
}

const Navbar: React.FC<INavbarProps> = ({ routes, className, children }) => {
  return (
    <nav className={`navbar ${className}`} data-testid="navbar">
      {children}
      {Object.entries(routes).map(([key, path]) => (
        <Link to={path} key={key}>
          {key}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
