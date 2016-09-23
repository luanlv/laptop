package models.services

import com.google.inject.{ Inject, Singleton }
import models.Comment
import models.daos.CommentDAO

import scala.concurrent.Future
import scala.util.Try

trait CommentService {
  def save(comment: Comment): Future[Try[Comment]]

  def getList(postID: String, page: Int): Future[List[Comment]]
}

@Singleton
class CommentServiceImpl @Inject() (commentDAO: CommentDAO) extends CommentService {
  def save(comment: Comment) = {
    commentDAO.save(comment)
  }

  def getList(postID: String, page: Int) = {
    commentDAO.getList(postID, page)
  }
}