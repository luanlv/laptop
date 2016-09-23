package models.services

import java.util.UUID
import javax.inject.Inject

import com.mohiva.play.silhouette.api.services.IdentityService
import com.mohiva.play.silhouette.impl.providers.CommonSocialProfile
import models.daos.ImageDAO
import models.{ Image, User }

import scala.concurrent.Future

/**
 * Handles actions to users.
 */
trait ImageService {

  def retrieve(id: String): Future[Option[Image]]

  def save(image: Image): Future[Image]

  def getList(page: Int): Future[List[Image]]

}

class ImageServiceImpl @Inject() (imageDAO: ImageDAO) extends ImageService {

  def retrieve(id: String) = imageDAO.find(id)

  def save(image: Image) = imageDAO.save(image)

  def getList(page: Int) = imageDAO.getList(page)

}