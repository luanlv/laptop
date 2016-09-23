package models.daos

import javax.inject.{ Inject, Singleton }

import models.{ Category, Image }
import play.api.libs.json.Json

import scala.concurrent.Future

/**
 * Give access to the user object.
 */
trait CategoryDAO {

  def find(id: String): Future[Option[Category]]

  def listParent: Future[List[Category]]

  def save(category: Category): Future[Category]

}

@Singleton
class CategoryDAOImpl @Inject() (repository: CategoryRepository) extends CategoryDAO {

  def find(id: String) =
    repository.findOne(Json.obj("_id" -> id))

  def listParent =
    repository.listParent()

  def save(category: Category) = {
    repository.insert(category)
    Future.successful(category)
  }

}

/**
 * The companion object.
 */
object CategoryDAOImpl {

}