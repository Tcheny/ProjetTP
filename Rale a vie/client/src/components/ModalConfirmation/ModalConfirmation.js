import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class ModalConfirmation extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Body>{this.props.message}</Modal.Body>
                <Modal.Footer className='justify-content-around'>
                    <Button variant='primary' onClick={this.props.onClick}>
                        Oui
                    </Button>
                    <Button variant='secondary' onClick={this.props.handleClose}>
                        Non
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
