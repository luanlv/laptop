package models.daos

import javax.inject.{ Inject, Singleton }

import models.{ Image, Post }
import play.api.libs.json.Json

import scala.concurrent.Future
import scala.util.Try

/**
 * Give access to the user object.
 */
trait PostDAO {

  def find(id: String): Future[Option[Post]]

  def save(post: Post): Future[Post]

  def incComment(postID: String): Future[Try[String]]

  def vote(id: String, userID: String): Future[Try[String]]

  def count(): Future[Int]

  def countByCategory(category: String): Future[Int]

  def getList(page: Int): Future[List[Post]]

  def getListByCategory(category: String, page: Int): Future[List[Post]]

  //  def getList(page: Int): Future[List[Post]]

}

@Singleton
class PostDAOImpl @Inject() (repository: PostRepository) extends PostDAO {

  def find(id: String) = {
    repository.incView(id)
    repository.findOne(Json.obj("_id" -> id))
  }

  def save(post: Post) = {
    repository.insert(post)
    Future.successful(post)
  }

  def incComment(postID: String) = {
    repository.incComment(postID)
  }

  def vote(id: String, userID: String): Future[Try[String]] = {
    repository.vote(id, userID)
  }

  def count: Future[Int] = {
    repository.count()
  }

  def countByCategory(category: String): Future[Int] = {
    repository.count(Option(Json.obj("categories" -> category)))
  }

  def getList(page: Int) = {
    repository.getList(sort = Json.obj("time" -> -1), page = page, num = 5)
  }

  def getListByCategory(category: String, page: Int) = {
    repository.getList(query = Json.obj("categories" -> category), sort = Json.obj("time" -> -1), page = page, num = 5)
  }

}

/**
 * The companion object.
 */
object PostDAOImpl {

}

