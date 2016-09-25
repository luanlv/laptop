package models.services

import javax.inject.Inject

import models.daos.SetupCategoryDAO
import models.{ CategoryMenu, Image, SetupCategory }
import play.api.libs.json.JsValue

import scala.concurrent.Future
import scala.util.Try

/**
 * Handles actions to users.
 */
trait SetupCategoryService {

  def retrieve(name: String): Future[Option[SetupCategory]]

  def save(data: SetupCategory): Future[Try[SetupCategory]]

}

class SetupCategoryServiceImpl @Inject() (setupDAO: SetupCategoryDAO) extends SetupCategoryService {

  def retrieve(name: String) = setupDAO.find(name)

  def save(data: SetupCategory) = setupDAO.save(data)

}