import React from 'react';

import './Grid.scss';

const Grid: React.FC = ({ children }) => {
  return <div className="grid-container">{children}</div>;
};

export default Grid;
