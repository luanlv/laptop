package models.daos

import javax.inject.{ Inject, Singleton }

import models.Product
import play.api.libs.json.{ JsObject, JsValue, Json }

import scala.concurrent.Future
import scala.util.Try

/**
 * Give access to the user object.
 */
trait ProductDAO {

  def find(id: String): Future[Option[Product]]

  def save(data: Product): Future[Try[Product]]

  def getListByListID(IDs: List[String]): Future[List[Product]]

  def getListByCategory(category: String, page: Int, num: Int = 40): Future[List[Product]]

  def getList(page: Int): Future[List[Product]]

  def countByCategory(category: String): Future[Int]

  def search(keyword: String): Future[List[Product]]

  def delete(id: String): Future[Try[Boolean]]
}

@Singleton
class ProductDAOImpl @Inject() (repository: ProductRepository) extends ProductDAO {

  def find(id: String) =
    repository.findByKind(id)

  def save(data: Product) = {
    repository.upsert(data._id, data)
    //    Future.successful(data)
  }
  def getListByListID(IDs: List[String]) = {
    repository.getListByListID(IDs)
  }

  def getListByCategory(category: String, page: Int, num: Int = 40) = {
    repository.getList(query = Json.obj("category" -> category), page = page, num = 40)
  }

  def getList(page: Int): Future[List[Product]] = {
    repository.getList(page = page, num = 20)
  }

  def countByCategory(category: String) = {
    repository.count(Some(Json.obj("category" -> category)))
  }

  def search(keyword: String): Future[List[Product]] = {
    repository.search(keyword)
  }

  def delete(id: String): Future[Try[Boolean]] = repository.delete(id)
}

object ProductDAOImpl {

}
