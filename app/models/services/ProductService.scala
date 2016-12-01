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

  def getListByListID(IDs: List[String]): Future[List[Product]]

  def getListByCategory(category: String, page: Int, num: Int = 40): Future[List[Product]]

  def getList(page: Int): Future[List[Product]]

  def countByCategory(category: String): Future[Int]

  def search(keyword: String): Future[List[Product]]

  def delete(id: String): Future[Try[Boolean]]

}

class ProductServiceImpl @Inject() (productDAO: ProductDAO) extends ProductService {

  def retrieve(name: String) = productDAO.find(name)

  def save(data: Product) = productDAO.save(data)

  def getListByListID(IDs: List[String]) = productDAO.getListByListID(IDs)

  def getListByCategory(category: String, page: Int, num: Int = 40) = productDAO.getListByCategory(category, page)

  def getList(page: Int) = productDAO.getList(page)

  def countByCategory(category: String) = productDAO.countByCategory(category)

  def search(keyword: String): Future[List[Product]] = {
    productDAO.search(keyword)
  }

  def delete(id: String): Future[Try[Boolean]] = productDAO.delete(id)
}