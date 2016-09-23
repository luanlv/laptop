package models.services

import javax.inject.Inject

import models.daos.SetupDAO
import models.{ Image, Setup }
import play.api.libs.json.JsValue

import scala.concurrent.Future
import scala.util.Try

/**
 * Handles actions to users.
 */
trait SetupService {

  def retrieve(name: String): Future[Option[Setup]]

  def save(data: Setup): Future[Try[Setup]]

}

class SetupServiceImpl @Inject() (setupDAO: SetupDAO) extends SetupService {

  def retrieve(name: String) = setupDAO.find(name)

  def save(data: Setup) = setupDAO.save(data)

}