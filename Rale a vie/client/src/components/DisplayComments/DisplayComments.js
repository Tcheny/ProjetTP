import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { ListGroup, Row, Badge } from 'react-bootstrap';

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
            let trashComment = comment.user_id == userId ? true : userType === 'admin' ? true : false;
            let authorComment = '';
            let dateComment = moment.utc(comment.date_creation).format('ll');
            let heureComment = moment
                .utc(comment.date_creation)
                .utcOffset('+0200')
                .format('LT');

            this.props.users_id.filter(user => {
                if (user.user_id == comment.user_id) {
                    authorComment = user.user_pseudo;
                }
            });

            return (
                <ListGroup.Item key={comment.comment_id} className='wrapper-comment'>
                    <div className='comment'>
                        {authorComment}, le {dateComment} à {heureComment}
                        <div> {comment.comment}</div>
                    </div>
                    <div className='comment-trash'>
                        {trashComment && (
                            <Badge pill variant='dark' className='trash-wrapper'>
                                <i className='far fa-trash-alt' onClick={e => this.props.deleteCommentById(comment.comment_id)} />
                            </Badge>
                        )}
                    </div>
                </ListGroup.Item>
            );
        });

        return (
            <ListGroup>
                {this.props.isToggle && (
                    <div>
                        les commentaires:
                        <br />
                        {commentsList}
                        <hr />
                    </div>
                )}
            </ListGroup>
        );
    }
}
