/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import axios from 'axios';

function LikeButtons({ id }) {
  const updateLikes = ({ target }) => {
    const updObj = {
      likeInfo: {
        likes: target.value === 'like' ? 1 : 0,
        dislikes: target.value === 'dislike' ? 1 : 0,
      },
    };

    axios
      .patch(`/db/art/${id}`, updObj)
      .then(() => {
        console.log('triggered');
      })
      .catch((err) => {
        console.error('Error patching art in database!:', err);
      });
  };

  return (
    <div>
      <button type="button" value="like" onClick={updateLikes}>Like</button>
      <button type="button" value="dislike" onClick={updateLikes}>Dislike</button>
    </div>
  );
}

export default LikeButtons;
