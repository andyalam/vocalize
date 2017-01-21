import {
  FETCH_POSTS,
  VOTE_SUCCESS
} from '../actions/index';

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return { ...state, all: action.payload.data };

    case VOTE_SUCCESS:
      const { positive, postID } = action.vote;

      const posts = state.all.map(post => {
        if (post.id === postID) {
          const currentVote = positive * 1 ? 1 : -1;
          let previousVote = 0;

          if (post.voteHistory) {
            previousVote = post.voteHistory.positive * 1 ? 1 : -1;
            // if the vote is the same value, return the post object unmodified
            if (previousVote === currentVote){
              return post;
            }
          }
          const newTotalVotes = post.votes + currentVote - previousVote;

          return {
            ...post,
            votes: newTotalVotes,
            voteHistory: {
              ...post.voteHistory,
              positive
            }
          }
        }
        return post;
      });

      return { ...state, all: posts };

    default:
      return state;
  }
}
