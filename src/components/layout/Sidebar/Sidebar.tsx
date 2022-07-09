import React from 'react';

import './Sidebar.scss';

interface ISidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<ISidebarProps> = ({ isOpen }) => {
  return (
    <aside className={`sidebar__style ${isOpen ? 'open' : 'collapse'}`}>
      <div>
        <h3>stuff</h3>
      </div>
    </aside>
  );
};

export default Sidebar;
