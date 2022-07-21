import React from 'react';

import './Button.scss';

const VARIANTS = {
  primary: {
    color: 'white',
    backgroundColor: 'red',
    border: '1px solid black',
  },
  secondary: {
    color: 'yellow',
    backgroundColor: 'blue',
    border: '1px solid black',
  },
};

interface IButtonProps {
  variant: keyof typeof VARIANTS;
  onClick: () => void;
  text: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

// TODO: Missing hover behavior. Anyway, consider replacing with styled-component

const Button: React.FC<IButtonProps> = ({
  variant,
  width = 'auto',
  height = '42px',
  onClick,
  text,
  borderRadius = '8px',
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        width,
        minWidth: '64px',
        height,
        borderRadius,
        ...VARIANTS[variant],
      }}
      className="generic-btn"
      id={`${variant}-btn`}
    >
      {text}
    </button>
  );
};

export default Button;
