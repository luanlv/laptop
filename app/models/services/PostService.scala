package models.services

import javax.inject.Inject

import models.daos.PostDAO
import models.{ Image, Post }

import scala.concurrent.Future
import scala.util.Try

trait PostService {

  def retrieve(id: String): Future[Option[Post]]

  def save(post: Post): Future[Post]

  def incComment(postID: String): Future[Try[String]]

  def vote(id: String, userID: String): Future[Try[String]]

  def count(): Future[Int]

  def countByCategory(category: String): Future[Int]

  def getList(page: Int): Future[List[Post]]

  def getListByCategory(category: String, page: Int): Future[List[Post]]
  //  def getList(page: Int): Future[List[Image]]

}

class PostServiceImpl @Inject() (postDAO: PostDAO) extends PostService {

  def retrieve(id: String) = postDAO.find(id)

  def save(post: Post) = postDAO.save(post)

  def incComment(postID: String) = postDAO.incComment(postID)

  def vote(id: String, userID: String): Future[Try[String]] = postDAO.vote(id, userID)

  def count(): Future[Int] = {
    postDAO.count
  }

  def countByCategory(category: String): Future[Int] = {
    postDAO.countByCategory(category)
  }

  def getList(page: Int) = postDAO.getList(page)

  def getListByCategory(category: String, page: Int) = postDAO.getListByCategory(category, page)

}