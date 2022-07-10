import React, { ReactNode } from 'react';

import './Card.scss';

interface ICardProps {
  title: string;
  children?: ReactNode;
}

const Card: React.FC<ICardProps> = ({ title, children }) => {
  return (
    <div className="card__style">
      <h3>{title}</h3>
      <div className="card-content__style">{children}</div>
    </div>
  );
};

export default Card;
