// - Import action types
import { UserActionType } from 'constants/userActionType'

// - Import domain
import { User,Profile } from 'src/core/domain/users'

import { UserState } from './UserState'
import { IUserAction } from './IUserAction'

/**
 * User reducer
 */
export let userReducer = (state: UserState = new UserState(), action: IUserAction) => {
  const { payload } = action
  switch (action.type) {
    case UserActionType.USER_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          [payload.uid]: {
            ...payload.info
          }
        }
      }
    case UserActionType.ADD_USER_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          [payload.uid]: {
            ...payload.info
          }
        },
        loaded: true
      }
    case UserActionType.ADD_PEOPLE_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          ...payload
        }
      }

    case UserActionType.UPDATE_USER_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          [payload.uid]: {
            ...state.info![payload.uid],
            ...payload.info
          }
        }
      }

    case UserActionType.CLEAR_ALL_DATA_USER:
      return new UserState()

    case UserActionType.CLOSE_EDIT_PROFILE:
      return {
        ...state,
        openEditProfile: false
      }

    case UserActionType.OPEN_EDIT_PROFILE:
      return {
        ...state,
        openEditProfile: true
      }
      case UserActionType.HAS_MORE_DATA_PEOPLE:
      return {
        ...state,
        people: {
          ...state.people,
          hasMoreData: true
        }

      }
    case UserActionType.NOT_MORE_DATA_PEOPLE:
      return {
        ...state,
        people: {
          ...state.people,
          hasMoreData: false
        }

      }

    case UserActionType.REQUEST_PAGE_PEOPLE:
      return {
        ...state,
        people: {
          ...state.people,
          lastPageRequest: payload.page
        }
      }

    case UserActionType.LAST_USER_PEOPLE:
      return {
        ...state,
        people: {
          ...state.people,
          lastUserId: payload.lastUserId
        }
      }

    default:
      return state
  }
}
