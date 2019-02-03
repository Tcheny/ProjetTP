import React from "react";
import { Button } from "react-bootstrap";

import { Search } from "../components";

const Header = () => {
    return (
        <div className="main-background">
            <h1 className="main-title">
                RALEZ <br /> MAIS FAITES LE BIEN.
            </h1>
            <a className="js-scrollTo" href="#page-1">
                <i class="fa fa-arrow-circle-down fa-4x" />
            </a>
        </div>
    );
};

export default Header;
