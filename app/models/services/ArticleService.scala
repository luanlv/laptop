package models.services

import com.google.inject.{ Inject, Singleton }
import models.Article
import models.daos.ArticleDAO

import scala.concurrent.Future
import scala.util.Try

trait ArticleService {
  def find(id: String): Future[Option[Article]]

  def save(data: Article): Future[Try[Article]]

  def vote(id: String, userID: String): Future[Try[String]]

  def incComment(id: String): Future[Try[String]]

  def getList(page: Int): Future[List[Article]]
}

@Singleton
class ArticleServiceImpl @Inject() (articleDAO: ArticleDAO) extends ArticleService {
  def find(id: String) = {
    articleDAO.find(id)
  }

  def save(data: Article) = {
    articleDAO.save(data)
  }

  def vote(id: String, userID: String): Future[Try[String]] = articleDAO.vote(id, userID)

  def incComment(id: String): Future[Try[String]] = {
    articleDAO.incComment(id)
  }

  def getList(page: Int) = {
    articleDAO.getList(page)
  }
}