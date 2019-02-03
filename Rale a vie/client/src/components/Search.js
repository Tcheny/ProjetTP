import React from "react";
import { Button } from "react-bootstrap";

const Search = () => {
    return (
        <div>
            <div>
                <input type="search" placeholder="Recherche..." />
                <button type="submit">Ok</button>
            </div>
            <div>
                <Button type="button" variant="outline-success">
                    Les plus drôles
                </Button>
                <Button type="button" variant="outline-success">
                    Les plus commentés
                </Button>
            </div>
        </div>
    );
};

export default Search;
