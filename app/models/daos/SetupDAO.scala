package models.daos

import javax.inject.{ Inject, Singleton }

import models.{ Image, Setup }
import play.api.libs.json.{ JsObject, JsValue }

import scala.concurrent.Future
import scala.util.Try

/**
 * Give access to the user object.
 */
trait SetupDAO {

  def find(id: String): Future[Option[Setup]]

  def save(data: Setup): Future[Try[Setup]]

}

@Singleton
class SetupDAOImpl @Inject() (repository: SetupRepository) extends SetupDAO {

  def find(id: String) =
    repository.findByKind(id)

  def save(data: Setup) = {
    repository.upsert(data._id, data)
    //    Future.successful(data)
  }

}

/**
 * The companion object.
 */
object SetupDAOImpl {

}
