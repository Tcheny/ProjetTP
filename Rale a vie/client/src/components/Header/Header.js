import React from "react";

export default props => {
    return (
        <div className="main-background">
            <h1 className="main-title">
                RALEZ <br /> MAIS FAITES LE BIEN.
            </h1>
            <i
                className="fa fa-arrow-circle-down fa-4x"
                onClick={props.scrolling}
            />
        </div>
    );
};
