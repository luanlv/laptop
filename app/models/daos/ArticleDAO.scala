package models.daos

import javax.inject.{ Inject, Singleton }

import models.{ Article, Product }
import play.api.libs.json.{ JsObject, JsValue, Json }

import scala.concurrent.Future
import scala.util.Try

/**
 * Give access to the user object.
 */
trait ArticleDAO {

  def find(id: String): Future[Option[Article]]

  def save(data: Article): Future[Try[Article]]

  def getListByListID(IDs: List[String]): Future[List[Article]]

  def getListByCategory(category: String, page: Int): Future[List[Article]]

  def getList(page: Int): Future[List[Article]]

  def countByCategory(category: String): Future[Int]

  def search(keyword: String): Future[List[Article]]

  def delete(id: String): Future[Try[Boolean]]
}

@Singleton
class ArticleDAOImpl @Inject() (repository: ArticleRepository) extends ArticleDAO {

  def find(id: String) =
    repository.findByKind(id)

  def save(data: Article) = {
    repository.upsert(data._id, data)
    //    Future.successful(data)
  }

  def getListByListID(IDs: List[String]) = {
    repository.getListByListID(IDs)
  }

  def getListByCategory(category: String, page: Int) = {
    repository.getList(query = Json.obj("category" -> category), page = page, num = 40)
  }

  def getList(page: Int): Future[List[Article]] = {
    repository.getList(page = page, num = 20)
  }

  def countByCategory(category: String) = {
    repository.count(Some(Json.obj("category" -> category)))
  }

  def search(keyword: String): Future[List[Article]] = {
    repository.search(keyword)
  }

  def delete(id: String): Future[Try[Boolean]] = repository.delete(id)
}

object ArticleDAOImpl {

}
