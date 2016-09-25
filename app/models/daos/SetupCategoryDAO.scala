package models.daos

import javax.inject.{ Inject, Singleton }

import models.{ Image, SetupCategory }
import play.api.libs.json.{ JsObject, JsValue }

import scala.concurrent.Future
import scala.util.Try

/**
 * Give access to the user object.
 */
trait SetupCategoryDAO {

  def find(id: String): Future[Option[SetupCategory]]

  def save(data: SetupCategory): Future[Try[SetupCategory]]

}

@Singleton
class SetupCategoryDAOImpl @Inject() (repository: SetupCategoryRepository) extends SetupCategoryDAO {

  def find(id: String) =
    repository.findByKind(id)

  def save(data: SetupCategory) = {
    repository.upsert(data._id, data)
    //    Future.successful(data)
  }

}

/**
 * The companion object.
 */
object SetupCategoryDAOImpl {

}
