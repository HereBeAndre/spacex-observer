import React, { ReactNode } from 'react';
import { typeGuardFunction } from 'utils/functions';

import './Card.scss';

interface ICardProps {
  title?: string;
  children?: ReactNode;
  [x: string]: any;
  cardStyleContainerId?: string;
  cardStyleContentId?: string;
}

const Card: React.FC<ICardProps> = ({
  title,
  children,
  cardStyleContainerId,
  cardStyleContentId,
  ...rest
}) => {
  return (
    <div className="card__style" {...rest} id={cardStyleContainerId}>
      {title && <h3>{title}</h3>}
      <div className="card-content__style" id={cardStyleContentId}>
        {typeGuardFunction(rest, 'isLoading') && rest.isLoading ? <p>Loading...</p> : children}
      </div>
    </div>
  );
};

export default Card;
