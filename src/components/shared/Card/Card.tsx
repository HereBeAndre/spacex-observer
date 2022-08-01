import React, { MouseEventHandler, ReactNode } from 'react';

import { TSpaceXResponseStatus } from 'schemas/api_d';

import { areArgsTruthy, conditionalRender } from 'utils/functions';

import './Card.scss';

export interface ICardProps {
  title?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  cardStyleContainerId?: string;
  cardStyleContentId?: string;
  requestStatus?: TSpaceXResponseStatus;
  requestError?: unknown;
  isLoading?: boolean;
  [x: string]: any;
}

const Card: React.FC<ICardProps> = ({
  title,
  children,
  onClick,
  cardStyleContainerId,
  cardStyleContentId,
  requestStatus,
  requestError,
  isLoading,
  ...rest
}) => {
  return (
    <div
      className={`card__style ${onClick && 'clickable'}`}
      id={cardStyleContainerId}
      onClick={onClick}
      data-testid="card"
      {...rest}
    >
      {conditionalRender(areArgsTruthy(title), <h3>{title}</h3>)}
      <div className="card-content__style" id={cardStyleContentId}>
        {areArgsTruthy(isLoading) ? <p>Loading...</p> : children}
      </div>
    </div>
  );
};

export default Card;
