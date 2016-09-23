package models.services

import javax.inject.Inject

import models.daos.LinkDAO
import models.{ Image, Link, Setup }
import play.api.libs.json.JsValue

import scala.concurrent.Future
import scala.util.Try

/**
 * Handles actions to users.
 */
trait LinkService {

  def retrieve(name: String): Future[Option[models.Link]]

  def save(data: models.Link): Future[Try[models.Link]]

}

class LinkServiceImpl @Inject() (linkDAO: LinkDAO) extends LinkService {

  def retrieve(name: String) = linkDAO.find(name)

  def save(data: models.Link) = linkDAO.save(data)

}