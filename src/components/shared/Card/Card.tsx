import React, { ReactNode } from 'react';

interface ICardProps<T> {
  data?: T;
  title: string;
  children?: ReactNode;
}

const Card = <T extends unknown>({ title, data, children }: ICardProps<T>) => {
  return (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Card;
