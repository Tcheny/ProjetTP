import React from "react";
import { Button } from "react-bootstrap";

const ButtonStyle = ({ type, children, onSubmit, variant }) => {
    return (
        <Button type={type} onSubmit={onSubmit} variant={variant} size="sm">
            {children}
        </Button>
    );
};

export default ButtonStyle;
