package models.daos

import javax.inject.{ Inject, Singleton }

import models.{ Image, IndexProduct, SetupCategory }
import play.api.libs.json.{ JsObject, JsValue }

import scala.concurrent.Future
import scala.util.Try

/**
 * Give access to the user object.
 */
trait IndexProductDAO {

  def find(id: String): Future[Option[IndexProduct]]

  def save(data: IndexProduct): Future[Try[IndexProduct]]

}

@Singleton
class IndexProductDAOImpl @Inject() (repository: IndexProductRepository) extends IndexProductDAO {

  def find(id: String) =
    repository.findByKind(id)

  def save(data: IndexProduct) = {
    repository.upsert(data._id, data)
    //    Future.successful(data)
  }

}

/**
 * The companion object.
 */
object IndexProductDAOImpl {

}
