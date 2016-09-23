package models.daos

import java.util.UUID
import javax.inject.{ Inject, Singleton }

import com.mohiva.play.silhouette.api.LoginInfo
import models.{ Image, User }
import play.api.libs.json.Json

import scala.concurrent.Future

/**
 * Give access to the user object.
 */
trait ImageDAO {

  def find(id: String): Future[Option[Image]]

  def save(image: Image): Future[Image]

  def getList(page: Int): Future[List[Image]]

}

@Singleton
class ImageDAOImpl @Inject() (repository: ImageRepository) extends ImageDAO {

  def find(id: String) =
    repository.findOne(Json.obj("_id" -> id))

  def save(image: Image) = {
    repository.insert(image)
    Future.successful(image)
  }

  def getList(page: Int) = {
    repository.findImage(sort = Json.obj("createAt" -> -1), page = page, num = 20)
  }

}

/**
 * The companion object.
 */
object ImageDAOImpl {

}