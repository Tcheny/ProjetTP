import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    InputGroup,
    Form,
    FormControl,
    Card,
    Button,
    Row
} from 'react-bootstrap';
import { ModalConfirmation } from '../ModalConfirmation/ModalConfirmation';
import DisplayComments from '../DisplayComments/index';

export default class DisplayRale extends Component {
    state = {
        isToggle: false,
        show: false,
        post: null,
        imgUrl: '',
        comment: '',
        likeType: null,
        commentsList: [],
        likes: [{
            likeType: 1,
            likeCount: 0,
            isLikeByUser: false,
            likeIcon: '😂'
        },{
            likeType: 2,
            likeCount: 0,
            isLikeByUser: false,
            likeIcon: '😡'
        },{
            likeType: 3,
            likeCount: 0,
            isLikeByUser: false,
            likeIcon: '😱'
        }]
    };

    componentDidMount = () => {
        this.getPostInfosById();
    };

    submitForm = event => {
        event.preventDefault();

        const comment = {
            user_id: this.props.currentUser && this.props.currentUser.user_id,
            post_id: this.props.postId.post_id,
            comment: this.state.comment
        };

        axios
            .post('http://localhost:8081/comments/add', { comment })
            .then(res => {
                console.log(res.data);
                const updatedCommentsList = this.state.commentsList.concat(
                    res.data
                );
                toast.success('Commentaire ajouté');
                this.setState({
                    commentsList: updatedCommentsList,
                    comment: ''
                });
            });
    };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    getPostInfosById = () => {
        axios
            .get('http://localhost:8081/posts/postInfos', {
                params: { id: this.props.postId.post_id }
            })
            .then(res => {
                // transform buffer to 8bits unsign
                const arrayBufferView = new Uint8Array(res.data.file.data);
                // new blob
                const imgBlob = new Blob([arrayBufferView], {
                    type: 'image/jpeg'
                });
                const imgUrl = URL.createObjectURL(imgBlob);
                this.setState({ post: res.data, imgUrl: imgUrl });
            })
            .catch(error => {
                console.error(error);
            });
    };

    getAllCommentsByRaleId = () => {
        axios
            .get('http://localhost:8081/posts/comments', {
                params: { id: this.props.postId.post_id }
            })
            .then(res => {
                this.setState(prevState => ({
                    isToggle: !prevState.isToggle,
                    commentsList: res.data
                }));
            })
            .catch(error => {
                console.error(error);
            });
    };

    deletePostsById = id => {
        axios
            .delete('http://localhost:8081/posts/delete', {
                params: { id: id }
            })
            .then(res => {
                console.log(res.data);
                // MAJ Rales
                this.props.getAllPostsId();
                toast.success('Rale supprimé');
                this.handleClose();
            })
            .catch(error => {
                console.error(error);
                toast.error(error);
            });
    };

    deleteCommentById = id => {
        axios
            .delete('http://localhost:8081/comments/delete', {
                params: { id: id }
            })
            .then(res => {
                console.log(res.data);
                const updatedCommentsDeleted = this.state.commentsList.filter(
                    comment => {
                        return comment.comment_id !== id;
                    }
                );
                this.setState({
                    commentsList: updatedCommentsDeleted
                });
                this.handleClose();
                toast.success('Commentaire supprimé');
            })
            .catch(error => {
                console.error(error);
                toast.error(error);
            });
    };

    handleLike = (likeType) => {
        const like = {
            user_id: this.props.currentUser && this.props.currentUser.user_id,
            post_id: this.props.postId.post_id,
            like_type_id: likeType
        };

        axios
            .post('http://localhost:8081/likes/insertlike', { like })
            .then(res => {
                this.getPostInfosById();
            })
            .catch(error => {
                    console.error(error);
                    toast.error(error);
            });
    };

    updateImgContent = () => {
        if (this.props.file) {
            this.setState({ imgUrl: imgUrl });
        }
    };

    render() {
        const { isAuth, currentUser } = this.props;

        const userId = currentUser && currentUser.user_id;
        const userType = currentUser && currentUser.user_type;

        let date = '';
        let heure = '';
        let imgUrl = '';
        let postText = '';
        let author = '';
        let trashPost = false;

        if (this.state.post) {
            date = moment.utc(this.state.post.date_creation).format('ll');
            heure = moment
                .utc(this.state.post.date_creation)
                .utcOffset('+0200')
                .format('LT');

            imgUrl = this.state.imgUrl;
            author = this.state.post.user_pseudo;
            postText = this.state.post.post;
            trashPost =
                this.state.post.user_id === parseInt(userId)
                    ? true
                    : userType === 'admin'
                    ? true
                    : false;
        }

        const likesUser = this.state.likes.map((like, index) => {
            return (<div key={index} value={like.likeType} onClick={e=> this.handleLike(e.target.value)}>
                <InputGroup.Prepend className="likeIcon">                        
                        <Button variant='dark'>{like.likeIcon}</Button>
                    <InputGroup.Text>{like.likeCount}</InputGroup.Text>
                </InputGroup.Prepend>
            </div>)
        })

        return (
            <div style={{ margin: '30px 0' }}>
                <Card>
                    <Card.Header>
                        <Row className='justify-content-between align-items-center'>
                            <div>
                                Par {author}, le {date} à {heure}
                            </div>
                            {trashPost && (
                                <i className='far fa-trash-alt'
                                    onClick={this.handleShow}
                                />
                            )}
                            <ModalConfirmation
                                show={this.state.show}
                                handleClose={this.handleClose}
                                message='Es tu sur de vouloir supprimer ce rale 🤔 ?'
                                onClick={e => this.deletePostsById( this.props.postId.post_id )}
                            />
                        </Row>
                    </Card.Header>
                    <Card.Img variant='top' src={imgUrl} />
                    <Card.Body>
                        <Card.Text>{postText}</Card.Text>

                        <div style={{ display: 'flex' }}>

                            {likesUser}

                        </div>
                    </Card.Body>
                    <Card.Footer className='text-muted'>
                        <InputGroup className='justify-content-around'>
                            <InputGroup.Prepend>
                                <Button variant='dark'>Tu as raison!</Button>
                                <InputGroup.Text>count</InputGroup.Text>
                            </InputGroup.Prepend>

                            <InputGroup.Prepend>
                                <Button variant='dark'>Mouais bof</Button>
                                <InputGroup.Text>count</InputGroup.Text>
                            </InputGroup.Prepend>

                            <InputGroup.Prepend>
                                <Button variant='dark'
                                    onClick={this.getAllCommentsByRaleId}
                                >
                                    💬
                                </Button>
                                <InputGroup.Text>count</InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>

                        <hr />

                        <DisplayComments
                            commentsList={this.state.commentsList}
                            isToggle={this.state.isToggle}
                            deleteCommentById={this.deleteCommentById}
                        />

                        {isAuth && (
                            <Form onSubmit={this.submitForm}>
                                <InputGroup className='mb-3'>
                                    <FormControl
                                        as='textarea'
                                        rows='3'
                                        placeholder='Commentez ce rale'
                                        onChange={e => this.setState({ comment: e.target.value })}
                                    />
                                    <InputGroup.Prepend>
                                        <Button variant='dark'
                                            onClick={this.submitForm}
                                        >
                                            OK
                                        </Button>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Form>
                        )}
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
