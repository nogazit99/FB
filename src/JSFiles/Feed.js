import React from 'react';
import PostItem from './Post/PostItem';

const Feed = ({ posts, onDeletePost, onEditPost }) => {
  const PostsList = posts.map((post) => {
    return <PostItem 
              {...post} 
              key={post.id} 
              onDeletePost={onDeletePost} 
              onEditPost={onEditPost}
              />;
  });

  return (
    <div>
      {PostsList}
    </div>
  );
};

export default Feed;
