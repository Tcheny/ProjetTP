import React from "react";

import { Button } from "./";

// const StyledSearch = styled.div`
//     display: flex;
//     width: 40%;
// `;

const Search = () => {
    return (
        <div>
            <input type="search" placeholder="Recherche..." />
            <Button type="submit">
                Ok
            </Button>
        </div>
    );
};

export default Search;
