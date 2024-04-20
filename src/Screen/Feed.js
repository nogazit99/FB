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
              const { displayName, profilePic } = userData;
              // Create a new object with just displayName and profilePicture
              const authorData = { displayName, profilePicture: addPrefixIfNeeded(profilePic)  };
              // const authorData = { displayName, profilePicture };
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
    //console.log(url);
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
          authorP={addPrefixIfNeeded(post.authorData ? post.authorData.profilePicture : '')} // Corrected prop name
          
          //authorP={post.authorData ? post.authorData.profilePicture : ''} // Pass the author profile picture URL with correct prefix

          //picture={post.picture || ''} // Pass the picture URL of the post
          //authorP={post.authorData ? post.authorData.profilePic : ''} // Pass the author profile picture URL
          authorN={post.authorData ? post.authorData.displayName : ''} // Pass the author name
          date={post.createdAt} // Pass the date of the post
          username={post.createdBy}
          onDelete={onDeletePost} // Pass the delete function with post id
          onEditPost={(fieldName, newValue) => onEditPost(post._id, fieldName, newValue)} // Pass the edit function with post id
        />
      ))}
    </div>
  )
};


export default Feed;



// import React, { useEffect, useState } from 'react';
// import PostItem from '../Post/PostItem';
// import { fetchUserData } from './api';

// const Feed = ({ posts, onDeletePost, onEditPost, token }) => {

//   const [postsWithUserData, setPostsWithUserData] = useState([]);

//   useEffect(() => {
//     const fetchPostsUserData = async () => {
//       const postsWithUserData = await Promise.all(
//         posts.map(async (post) => {
//           try {
//             const userData = await fetchUserData(post.createdBy, token);
//             if (userData) {
//               const { displayName, profilePicture } = userData;
//               const authorData = { displayName, profilePicture: addPrefixIfNeeded(profilePicture) }; // Prefix the profile picture URL
//               const updatedPost = { ...post, authorData };
//               return updatedPost;
//             } else {
//               console.error('Error fetching user details:');
//               return post;
//             }
//           } catch (error) {
//             console.error('Error fetching user details:', error.message);
//             return post;
//           }
//         })
//       );
//       setPostsWithUserData(postsWithUserData);
//     };
  
//     fetchPostsUserData();
//   }, [posts, token]);

//   const addPrefixIfNeeded = (url) => {
//     if (!url) {
//       return ''; // Return empty string if URL is empty
//     }
//     const prefix = 'data:image/jpeg;base64,';
//     if (!url.startsWith(prefix)) {
//       return prefix + url;
//     }
//     return url;
//   };

//   return (
//     <div>
//       {postsWithUserData.map((post) => (
//         <PostItem
//           key={post._id} // Remember to add a unique key prop
//           _id={post._id}
//           text={post.text}
//           picture={addPrefixIfNeeded(post.picture)}
//           authorP={post.authorData ? post.authorData.profilePicture : ''}
//           authorN={post.authorData ? post.authorData.displayName : ''}
//           date={post.createdAt}
//           username={post.createdBy}
//           onDeletePost={() => onDeletePost(post._id)}
//           onEditPost={(fieldName, newValue) => onEditPost(post._id, fieldName, newValue)}
//         />
//       ))}
//     </div>
//   );
// };

// export default Feed;

