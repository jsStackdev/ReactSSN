// - Import react components
import moment from 'moment/moment'
import _ from 'lodash'

// - Import domain
import { User } from 'core/domain/users'
import { Comment } from 'core/domain/comments'

// - Import action types
import { CommentActionType } from 'constants/commentActionType'

import { CommentState } from './CommentState'
import { ICommentAction } from './ICommentAction'

/**
 * Comment reducer
 * @param state
 * @param action
 */
export let commentReducer = (state: CommentState = new CommentState(), action: ICommentAction) => {
  let { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case CommentActionType.ADD_COMMENT:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...state.postComments![payload.postId],
            [payload.id]: {
              ...payload,
              editorStatus: false
            }
          }

        }
      }
    case CommentActionType.ADD_COMMENT_LIST:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          ...payload
        },
        loaded: true
      }
    case CommentActionType.UPDATE_COMMENT:
      const {comment} = payload
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [comment.postId]: {
            ...state.postComments![comment.postId],
            [comment.id]: {
              ...state.postComments![comment.postId][comment.id],
              text: comment.text,
              editorStatus: false
            }
          }
        }
      }
    case CommentActionType.DELETE_COMMENT:
      if (!state.postComments![payload.postId]) {
        return state
      }
      let parsedComments = {}
      Object.keys(state.postComments![payload.postId]).map((id) => {
        if (id !== payload.id) {
          _.merge(parsedComments, { [id]: { ...state.postComments![payload.postId][id] } })
        }

      })
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...parsedComments
          }
        }
      }
    case CommentActionType.CLOSE_COMMENT_EDITOR:
      return {
        ...state,
        editorStatus: {
          ...state.editorStatus,
          [payload.postId]: {
            ...state.editorStatus![payload.postId],
            [payload.id]: false
          }
        }
      }
    case CommentActionType.OPEN_COMMENT_EDITOR:
      return {
        ...state,
        editorStatus: {
          ...state.editorStatus,
          [payload.postId]: {
            ...state.editorStatus![payload.postId],
            [payload.id]: true
          }
        }
      }

    case CommentActionType.CLEAR_ALL_DATA_COMMENT:
      return new CommentState()
    default:
      return state

  }

}
