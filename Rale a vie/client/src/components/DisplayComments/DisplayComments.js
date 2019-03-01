import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import { ListGroup, Row } from 'react-bootstrap';
import { ModalConfirmation } from '../ModalConfirmation/ModalConfirmation';

export default class DisplayComments extends Component {
    state = { show: false, commentsDelete: [] };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    render() {
        const { currentUser } = this.props;

        const userId = currentUser && currentUser.user_id;
        const userType = currentUser && currentUser.user_type;

        const commentsList = this.props.commentsList.map(comment => {
            let trashComment =
                comment.user_id === parseInt(userId)
                    ? true
                    : userType === 'admin'
                    ? true
                    : false;
            let authorComment = '';
            let dateComment = moment.utc(comment.date_creation).format('ll');
            let heureComment = moment
                .utc(comment.date_creation)
                .utcOffset('+0200')
                .format('LT');

            this.props.users_id.filter(user => {
                if (parseInt(user.user_id) === comment.user_id) {
                    authorComment = user.user_pseudo;
                }
            });

            return (
                <ListGroup.Item
                    key={comment.comment_id}
                    style={{
                        margin: '5px 0',
                        borderRadius: '30px'
                    }}
                >
                    <Row className='justify-content-between align-items-center'>
                        <div>
                            {authorComment}, le {dateComment} à {heureComment}
                            <div> {comment.comment}</div>
                        </div>
                        <div>
                            {trashComment && (
                                <i
                                    className='far fa-trash-alt'
                                    onClick={e =>
                                        this.props.deleteCommentById(
                                            comment.comment_id
                                        )
                                    }
                                />
                            )}
                        </div>
                    </Row>
                </ListGroup.Item>
            );
        });

        return (
            <ListGroup>
                {this.props.isToggle && (
                    <div>
                        les commentaires:
                        {commentsList}
                        <hr />
                    </div>
                )}
            </ListGroup>
        );
    }
}
