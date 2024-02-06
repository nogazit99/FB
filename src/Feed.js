import React from 'react';
import PostItem from './PostItem';

const Feed = ({ posts, addNewPost }) => {
  const PostsList = posts.map((post, key) => {
    return <PostItem {...post} key={key} />;
  });

  return (
    <div>
      {PostsList}
    </div>
  );
};

export default Feed;
