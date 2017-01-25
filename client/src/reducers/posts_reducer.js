import {
  FETCH_POSTS,
  VOTE_SUCCESS,
  FETCH_CATEGORIES,
  FETCH_POSTS_OF_CATEGORY
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
          const currentVote = (positive * 1) ? 1 : -1;

          let previousVote = 0;
          try {
            if (post.voteHistory.positive.toString()) {
              previousVote = post.voteHistory.positive * 1 ? 1 : -1;
            }
          } catch (e) {
            //console.log(e)
          }

          /*console.log('post.votes', post.votes);
          console.log('currentVote', currentVote);
          console.log('previousVote', previousVote);*/
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

    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload.data };

    case FETCH_POSTS_OF_CATEGORY:
      const { cPosts, title } = action.payload.data;
      return {
        ...state,
        category: {
          cPosts,
          title
        }
      };

    default:
      return state;
  }
}
