import React from 'react';
import { Link } from '@reach/router';
import { APP_ROUTES } from 'components/routes/routes';

interface INavbarProps {
  routes: typeof APP_ROUTES;
  className?: string;
}

const Navbar: React.FC<INavbarProps> = ({ routes, className, children }) => {
  return (
    <nav className={className}>
      {children}
      {Object.entries(routes).map((route) => (
        <Link to={route[1]} key={route[0]}>
          {route[0]}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
