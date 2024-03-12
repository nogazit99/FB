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





  // useEffect(() => {
  //   const fetchPostsUserData = async () => {
  //     const postsWithUserData = await Promise.all(
  //       posts.map(async (post) => {
  //         // Fetch user data for the author of the post
  //         try {
  //           //const response = await fetchUserData(post.createdBy, token);
  //           //const userData = await response.json();
  //           const userData = await fetchUserData(post.createdBy, token);
  //           if ( userData) {
  //             const updatedPost = { ...post, authorData: userData };
  //             return updatedPost;
  //           } else {
  //             console.error('Error fetching user details:');
  //             return post; // Return the original post if fetching user data fails
  //           }
  //         } catch (error) {
  //           console.error('Error fetching user details:', error.message);
  //           return post; // Return the original post if an error occurs
  //         }
  //       })
  //     );
  //     setPostsWithUserData(postsWithUserData);
  //   };

  //   fetchPostsUserData();
  // }, [posts, token]);


import React, { useEffect, useState } from 'react';
import PostItem from '../Post/PostItem';
import { fetchUserData } from './api';

const Feed = ({ posts, onDeletePost, onEditPost, token }) => {

  const [postsWithUserData, setPostsWithUserData] = useState([]);

  useEffect(() => {
    console.log("token in feed", token);
    const fetchPostsUserData = async () => {
      const postsWithUserData = await Promise.all(
        posts.map(async (post) => {
          try {
            const userData = await fetchUserData(post.createdBy, token);
            console.log("fetched - posts user data");
            console.log("USER DATA: ", userData)
            if (userData) {
              // Extract only displayName and profilePicture from userData
              const { displayName, profilePicture } = userData;
              // Create a new object with just displayName and profilePicture
              const authorData = { displayName, profilePicture };
              const updatedPost = { ...post, authorData };
              return updatedPost;
            } else {
              console.error('Error fetching user details:');
              return post;
            }
          } catch (error) {
            console.error('Error fetching user details:', error.message);
            return post;
          }
        })
      );
      setPostsWithUserData(postsWithUserData);
    };
  
    fetchPostsUserData();
  }, [posts, token]);


  const addPrefixIfNeeded = (url) => {
    if (!url) {
      return ''; // Return empty string if URL is empty
    }
    const prefix = 'data:image/jpeg;base64,';
    if (!url.startsWith(prefix)) {
      return prefix + url;
    }
    return url;
  };
  
  

  console.log("in feed");
  //const PostsList = posts.map((post) => {
  return (
    <div>
      {postsWithUserData.map((post) => (
        <PostItem
          _id={post._id}
          text={post.text} // Pass the text of the post
          picture={addPrefixIfNeeded(post.picture)} // Pass the picture URL of the post with correct prefix
          authorP={addPrefixIfNeeded(post.authorData ? post.authorData.profilePic : '')} // Pass the author profile picture URL with correct prefix
          //picture={post.picture || ''} // Pass the picture URL of the post
          //authorP={post.authorData ? post.authorData.profilePic : ''} // Pass the author profile picture URL
          authorN={post.authorData ? post.authorData.displayName : ''} // Pass the author name
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

