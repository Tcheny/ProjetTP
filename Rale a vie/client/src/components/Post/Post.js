import React, { Component } from 'react';
import axios from 'axios';
import { Form, Card, Button, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default class Post extends Component {
    state = {
        inputPost: '',
        inputFile: null,
    };

    submitForm = async () => {
        let rale = null;
        const formData = new FormData();

        formData.append('post', this.state.inputPost);
        formData.append('type_media', 1);
        formData.append('uploadFile', this.state.inputFile);

        try {
            rale = await axios.post('http://localhost:8081/posts/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            this.setState({ inputPost: '' }, () => {
                this.props.getAllRalesId();
                toast.success('Rale exprimé');
            });
        } catch (error) {
            console.error(error);
            toast.error('Erreur dans le post Rale');
        }
    };

    render() {
        return (
            <Card>
                <Card.Header>
                    <div className='padding-xs text-center'>
                        <div className='post-title'>
                            Bienvenue {this.props.currentUser.user_pseudo}!
                        </div>
                        Vous avez le devoir de vous plaindre! Encore oui! Encore!
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId='exampleForm.ControlTextarea1'>
                            <Form.Control
                                as='textarea'
                                rows='5'
                                placeholder='Ralez plus fort que jamais !'
                                value={this.state.inputPost}
                                onChange={e => this.setState({ inputPost: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer className='text-muted'>
                    <Row className='justify-content-around'>
                        <Button
                            as='input'
                            type='file'
                            variant='dark'
                            key={this.state.inputPost}
                            name='mediaUpload'
                            onChange={this.handleChangeFile}
                            onChange={e => this.setState({ inputFile: e.target.files[0] })}
                        />

                        <Button
                            as='input'
                            type='submit'
                            variant='dark'
                            value='Envoyer'
                            onClick={this.submitForm}
                        />
                    </Row>
                </Card.Footer>
            </Card>
        );
    }
}
