// import React from 'react';
// import PostItem from '../Post/PostItem';

// const Feed = ({ posts, onDeletePost, onEditPost }) => {
//   console.log("in feed");
//   const PostsList = posts.map((post) => {
//     return <PostItem 
//               {...post} 
//               key={post.id} 
//               onDeletePost={onDeletePost} 
//               onEditPost={onEditPost}
//               />;
//   });

//   return (
//     <div>
//       {PostsList}
//     </div>
//   );
// };

// export default Feed;


import React, { useEffect, useState } from 'react';
import PostItem from '../Post/PostItem';
import { fetchUserData } from './api';

const Feed = ({ posts, onDeletePost, onEditPost, token }) => {

  console.log("in feed");
  const PostsList = posts.map((post) => {
    return (
      <PostItem 
        _id = {post._id}
        text={post.text} // Pass the text of the post
        picture={post.picture} // Pass the picture URL of the post
        authorP={post.getauthorProfilePicture} // Pass the author profile picture URL
        authorN={post.createdBy} // Pass the author name
        date={post.createdAt} // Pass the date of the post
        onDeletePost={() => onDeletePost(post._id)} // Pass the delete function with post id
        onEditPost={(fieldName, newValue) => onEditPost(post._id, fieldName, newValue)} // Pass the edit function with post id
      />
    );
  });

  return (
    <div>
      {PostsList}
    </div>
  );
};

export default Feed;

