package models.daos

import javax.inject.{ Inject, Singleton }

import models.{ Product }
import play.api.libs.json.{ JsObject, JsValue }

import scala.concurrent.Future
import scala.util.Try

/**
 * Give access to the user object.
 */
trait ProductDAO {

  def find(id: String): Future[Option[Product]]

  def save(data: Product): Future[Try[Product]]

}

@Singleton
class ProductDAOImpl @Inject() (repository: ProductRepository) extends ProductDAO {

  def find(id: String) =
    repository.findByKind(id)

  def save(data: Product) = {
    repository.upsert(data._id, data)
    //    Future.successful(data)
  }

}

object ProductDAOImpl {

}
