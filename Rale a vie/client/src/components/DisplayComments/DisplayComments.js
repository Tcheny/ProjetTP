import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { ListGroup, Badge } from 'react-bootstrap';

export default class DisplayComments extends Component {
    state = { show: false, commentsDelete: [] };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    render() {
        const { currentUser, commentsList, users_id, isToggle, notComment } = this.props;

        const userId = currentUser && currentUser.user_id;
        const userType = currentUser && currentUser.user_type;

        const displayCommentsList = commentsList.map(comment => {
            let trashComment = comment.user_id == userId ? true : userType === 'admin' ? true : false;
            let authorComment = '';
            let dateComment = moment.utc(comment.date_creation).format('ll');
            let heureComment = moment
                .utc(comment.date_creation)
                .utcOffset('+0200')
                .format('LT');

            users_id.filter(user => {
                if (user.user_id == comment.user_id) {
                    authorComment = user.user_pseudo;
                }
            });

            return (
                <ListGroup.Item key={comment.comment_id} className='wrapper-comment'>
                    <div className='comment'>
                        <div className='comment-name'>
                            {authorComment}, le {dateComment} à {heureComment}
                        </div>
                        <div className='comment-display'> {comment.comment}</div>
                    </div>
                    <div className='comment-trash'>
                        {trashComment && (
                            <Badge
                                pill
                                variant='dark'
                                className='trash-wrapper'
                                onClick={e => this.props.deleteCommentById(comment.comment_id)}
                            >
                                <i className='far fa-trash-alt' />
                            </Badge>
                        )}
                    </div>
                </ListGroup.Item>
            );
        });

        return (
            <ListGroup>
                {isToggle && (
                    <div>
                        les commentaires:
                        <br />
                        {notComment ? 'Aucun commentaire' : displayCommentsList}
                        <hr />
                    </div>
                )}
            </ListGroup>
        );
    }
}
