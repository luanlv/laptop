package models.services

import javax.inject.Inject

import models.daos.{ ProductDAO }
import models.{ Image, Product }
import play.api.libs.json.JsValue

import scala.concurrent.Future
import scala.util.Try

/**
 * Handles actions to users.
 */
trait ProductService {

  def retrieve(name: String): Future[Option[Product]]

  def save(data: Product): Future[Try[Product]]

}

class ProductServiceImpl @Inject() (productDAO: ProductDAO) extends ProductService {

  def retrieve(name: String) = productDAO.find(name)

  def save(data: Product) = productDAO.save(data)

}