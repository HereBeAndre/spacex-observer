import React, { ReactNode } from 'react';
import { typeGuardFunction } from 'utils/functions';

import './Card.scss';

interface ICardProps {
  title?: string;
  children?: ReactNode;
  [x: string]: any;
}

const Card: React.FC<ICardProps> = ({ title, children, ...rest }) => {
  return (
    <div className="card__style" {...rest}>
      {title && <h3>{title}</h3>}
      <div className="card-content__style">
        {typeGuardFunction(rest, 'isLoading') && rest.isLoading ? <p>Loading...</p> : children}
      </div>
    </div>
  );
};

export default Card;
