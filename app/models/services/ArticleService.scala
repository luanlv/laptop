package models.services

import javax.inject.Inject

import models.daos.{ ArticleDAO, ProductDAO }
import models.{ Article, Image, Product }
import play.api.libs.json.JsValue

import scala.concurrent.Future
import scala.util.Try

/**
 * Handles actions to users.
 */
trait ArticleService {

  def retrieve(name: String): Future[Option[Article]]

  def save(data: Article): Future[Try[Article]]

  def getListByListID(IDs: List[String]): Future[List[Article]]

  def getListByCategory(category: String, page: Int): Future[List[Article]]

  def getList(page: Int): Future[List[Article]]

  def countByCategory(category: String): Future[Int]

  def search(keyword: String): Future[List[Article]]

  def delete(id: String): Future[Try[Boolean]]
}

class ArticleServiceImpl @Inject() (productDAO: ArticleDAO) extends ArticleService {

  def retrieve(name: String) = productDAO.find(name)

  def save(data: Article) = productDAO.save(data)

  def getListByListID(IDs: List[String]) = productDAO.getListByListID(IDs)

  def getListByCategory(category: String, page: Int) = productDAO.getListByCategory(category, page)

  def getList(page: Int) = productDAO.getList(page)

  def countByCategory(category: String) = productDAO.countByCategory(category)

  def search(keyword: String): Future[List[Article]] = {
    productDAO.search(keyword)
  }

  def delete(id: String): Future[Try[Boolean]] = productDAO.delete(id)
}