import React from 'react';
import { Link } from '@reach/router';
import { APP_ROUTES } from 'components/routes/routes';

interface INavbarProps {
  routes: typeof APP_ROUTES;
  className?: string;
}

const Navbar: React.FC<INavbarProps> = ({ routes, className, children }) => {
  return (
    <nav className={className} data-testid="navbar">
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
