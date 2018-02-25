// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// - Material UI
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'

// - Import app components
import CommentComponent from 'components/comment'

import * as PostAPI from 'api/PostAPI'

import { ICommentListComponentProps } from './ICommentListComponentProps'
import { ICommentListComponentState } from './ICommentListComponentState'
import { Comment } from 'core/domain/comments'

// - Import actions

const styles = (theme: any) => ({
  list: {
    width: '100%',
    maxHeight: 290,
    overflowY: 'auto'
  }
})

/**
 * Create component class
 */
export class CommentListComponent extends Component<ICommentListComponentProps, ICommentListComponentState> {

  static propTypes = {
    /**
     * If it's true the post owner is the logged in user which this post be long to the comment
     */
    isPostOwner: PropTypes.bool,
    /**
     * If it's true the comment is disable to write
     */
    disableComments: PropTypes.bool
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: ICommentListComponentProps) {
    super(props)

    /**
     * Default state
     */
    this.state = {

    }

    // Binding functions to `this`

  }

  /**
   * Get comments' DOM
   * @return {DOM} list of comments' DOM
   */
  commentList = () => {
    let {comments, commentsEditorStatus} = this.props
    if (comments) {

      let parsedComments: Comment[] = []
      Object.keys(comments).forEach((commentId) => {
        parsedComments.push({
          id: commentId,
          ...comments[commentId]
        })
      })
      let sortedComments = PostAPI.sortObjectsDate(parsedComments)

      return sortedComments.map((comment: Comment, index: number, array: Comment) => {

        return (
             <CommentComponent 
                key={comment.id!} 
                comment={comment} 
                isPostOwner={this.props.isPostOwner} 
                disableComments={this.props.disableComments}
                editorStatus={(commentsEditorStatus![comment.id!]) || false}
              />
              )

      })

    }
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const {classes} = this.props

    return (

      <List className={classes.list}>

        {this.commentList()}
      </List>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: ICommentListComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ICommentListComponentProps) => {
  const { comment } = state
  const commentsEditorStatus: { [commentId: string]: Comment } = comment.editorStatus[ownProps.postId] || {}
  return {
    commentsEditorStatus
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles as any)(CommentListComponent as any))as any)
