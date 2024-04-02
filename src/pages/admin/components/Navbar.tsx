import React from 'react';
import MenuBtn from '../../../menu_btn/MenuBtn';

interface NavbarProps {
  menuState: boolean;
  setMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ menuState, setMenuState }) => {
  return (
    <nav>
      <div className='logo'>
        <div className='logo_box'>
          <img
            src="https://theme.hstatic.net/1000231532/1001093179/14/logo_nshop.png?v=6746"
            alt="Logo"
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </div>
        <MenuBtn onClickFn={setMenuState} open={menuState} />
      </div>
      <div
        className='log-out'
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <i className="fa-solid fa-right-from-bracket"></i>
      </div>
    </nav>
  );
};

export default Navbar;
