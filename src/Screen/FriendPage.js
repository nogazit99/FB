import React from 'react';
import PostItem from './PostItem';

const FriendPage = ({ name, picture, posts, friends }) => {
  return (
    <div className="user-profile">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={picture} alt="Profile" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <h5>Posts</h5>
            <div className="posts-list">
              {posts.map(post => (
                <PostItem key={post.id} {...post} />
              ))}
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <h5>Friends</h5>
            <ul className="friends-list list-unstyled">
              {friends.map(friend => (
                <li key={friend.id}>
                  <img src={friend.picture} alt={friend.name} />
                  <span>{friend.name}</span>
                </li>
              ))}
            </ul>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

export default FriendPage;
