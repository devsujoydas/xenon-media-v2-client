import React from "react";
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <div className="">
      <Link
        to={"/"}
        className="text-2xl font-bold font-family-winds text-blue-600 "
      >
        Xenly
      </Link>
    </div>
  );
};

export default NavLogo;
