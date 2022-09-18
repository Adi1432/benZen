import React from "react";

const Header = () => {
  const logo = (
    <img
      className="logo"
      src="https://tse3.mm.bing.net/th/id/OIP.hcr2l0kSdi7HLWWsgKkaOQHaKL?w=125&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
      alt="logo"
    />
  );
  return (
    <div className="header">
      {logo}
      <h3>Keep</h3>
    </div>
  );
};

export default Header;
