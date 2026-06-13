import React, { useState } from "react";

/// React router dom
import { Link } from "react-router-dom";

/// images
import logo from "../../../images/logo.png";
import logoText from "../../../images/logo-text.png";

const NavHader = () => {
   const [toggle, setToggle] = useState(false);
   return (
      <div className="nav-header">
         <Link to="/" className="brand-logo">
            <img className="logo-abbr" width="100%" src="https://cdn-icons-png.flaticon.com/512/10835/10835063.png" alt="" />
            {/* <img className="logo-compact" src="https://cdn.freebiesupply.com/logos/thumbs/2x/deploy-logo.png" alt="" /> */}
            <img className="brand-title" src="https://cdn.freebiesupply.com/logos/thumbs/2x/deploy-logo.png" alt="" />
         </Link>

         <div className="nav-control" onClick={() => setToggle(!toggle)}>
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
      </div>
   );
};

export default NavHader;
