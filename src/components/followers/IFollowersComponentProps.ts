import { UserTie } from 'core/domain/circles'

export interface IFollowersComponentProps {

  /**
   * User followers info
   *
   * @type {{[userId: string]: UserTie}}
   * @memberof IFindPeopleComponentProps
   */
  followers?: {[userId: string]: UserTie}

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
