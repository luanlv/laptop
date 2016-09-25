package models.services

import javax.inject.Inject

import models.daos.{ IndexProductDAO, SetupCategoryDAO }
import models.{ CategoryMenu, Image, IndexProduct, SetupCategory }
import play.api.libs.json.JsValue

import scala.concurrent.Future
import scala.util.Try

/**
 * Handles actions to users.
 */
trait IndexProductService {

  def retrieve(name: String): Future[Option[IndexProduct]]

  def save(data: IndexProduct): Future[Try[IndexProduct]]

}

class IndexProductServiceImpl @Inject() (indexProductDAO: IndexProductDAO) extends IndexProductService {

  def retrieve(name: String) = indexProductDAO.find(name)

  def save(data: IndexProduct) = indexProductDAO.save(data)

}