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

  const [postsWithUserData, setPostsWithUserData] = useState([]);

  useEffect(() => {
    const fetchPostsUserData = async () => {
      const postsWithUserData = await Promise.all(
        posts.map(async (post) => {
          // Fetch user data for the author of the post
          try {
            //const response = await fetchUserData(post.createdBy, token);
            //const userData = await response.json();
            const userData = await fetchUserData(post.createdBy, token);
            if ( userData) {
              const updatedPost = { ...post, authorData: userData };
              return updatedPost;
            } else {
              console.error('Error fetching user details:');
              return post; // Return the original post if fetching user data fails
            }
          } catch (error) {
            console.error('Error fetching user details:', error.message);
            return post; // Return the original post if an error occurs
          }
        })
      );
      setPostsWithUserData(postsWithUserData);
    };

    fetchPostsUserData();
  }, [posts, token]);


  console.log("in feed");
  //const PostsList = posts.map((post) => {
  return (
    <div>
      {postsWithUserData.map((post) => (
        <PostItem
          _id={post._id}
          text={post.text} // Pass the text of the post
          picture={post.picture || ''} // Pass the picture URL of the post
          authorP={post.authorData.profilePic} // Pass the author profile picture URL
          authorN={post.authorData.displayName} // Pass the author name
          date={post.createdAt} // Pass the date of the post
          username={post.createdBy}
          onDeletePost={() => onDeletePost(post._id)} // Pass the delete function with post id
          onEditPost={(fieldName, newValue) => onEditPost(post._id, fieldName, newValue)} // Pass the edit function with post id
        />
      ))}
    </div>
  )
};

// return (
//   <div>
//     {PostsList}
//   </div>
// );

export default Feed;

