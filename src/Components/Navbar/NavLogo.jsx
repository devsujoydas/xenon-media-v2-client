import React from "react";
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <div className="">
      <Link
        to={"/"}
        className="text-2xl md:text-3xl font-bold font-family-winds text-blue-600 flex -gap-1 items-center "
      >
        <img src="/logo.png" className="h-8" alt="" />
        enly
      </Link>
    </div>
  );
};

export default NavLogo;
