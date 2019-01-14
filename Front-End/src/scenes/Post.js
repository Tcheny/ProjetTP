import React from 'react';
import styled from 'styled-components';

import { Select, Button } from '../components'

const StyledContainer = styled.div`
    background-color: #f0f5f5;
    border: 1px solid #e0ebeb;
    border-radius: 4px;
`;

const StyledForm = styled.div`
     margin: 20px;
`;

const StyledPost = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const StyledUpload = styled.div`
    position: relative;
    overflow: hidden;
`;

const StyledInput = styled.input`
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
`;

const Post = () => {
    return (
        <StyledContainer>
            <StyledForm>
                <textarea className="form-control"
                    rows="3"
                    placeholder="Ralez plus fort que jamais!">
                </textarea>
                <StyledPost>
                    <StyledUpload>
                        <Button width="10em">
                            <i className="fas fa-upload"></i> Photo / Vidéo
                        </Button>
                        <StyledInput type="file" name="myfile" />
                    </StyledUpload>
                    <Select />
                    <Button type="submit" width="10em">
                        Envoyer
                    </Button>
                </StyledPost>
            </StyledForm>
        </StyledContainer>
    )
};

export default Post;