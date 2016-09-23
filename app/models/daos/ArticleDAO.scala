package models.daos

import com.google.inject.{ Inject, Singleton }
import models.Article
import play.api.libs.json.Json

import scala.concurrent.Future
import scala.util.Try

trait ArticleDAO {
  def find(id: String): Future[Option[Article]]

  def save(data: Article): Future[Try[Article]]

  def vote(id: String, userID: String): Future[Try[String]]

  def incComment(id: String): Future[Try[String]]

  def getList(page: Int): Future[List[Article]]
}

@Singleton
class ArticleDAOImpl @Inject() (repository: ArticleRepository) extends ArticleDAO {
  def find(id: String) = {
    repository.incView(id)
    repository.findOne(Json.obj("_id" -> id))
  }

  def save(data: Article) = {
    repository.insert(data)
  }

  def vote(id: String, userID: String): Future[Try[String]] = {
    repository.vote(id, userID)
  }

  def incComment(id: String): Future[Try[String]] = {
    repository.incComment(id)
  }

  def getList(page: Int) = {
    repository.getList(sort = Json.obj("time" -> -1), page = page, num = 10)
  }
}