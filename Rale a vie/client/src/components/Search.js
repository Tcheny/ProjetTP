import React from "react";
import { Row, Button, InputGroup, FormControl } from "react-bootstrap";

const Search = () => {
    return (
        <div style={{ margin: "30px 0" }}>
            <InputGroup className="mb-3">
                <FormControl placeholder="Recherche..." />
                <InputGroup.Append>
                    <Button variant="dark">ok</Button>
                </InputGroup.Append>
            </InputGroup>

            <Row className="justify-content-around">
                <Button type="button" variant="dark">
                    Les plus drôles
                </Button>
                <Button type="button" variant="dark">
                    Les plus commentés
                </Button>
            </Row>
        </div>
    );
};

export default Search;
