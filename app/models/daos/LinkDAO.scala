package models.daos

import javax.inject.{ Inject, Singleton }

import models.Link

import scala.concurrent.Future
import scala.util.Try

/**
 * Give access to the user object.
 */
trait LinkDAO {

  def find(id: String): Future[Option[Link]]

  def save(data: Link): Future[Try[Link]]

}

@Singleton
class LinkDAOImpl @Inject() (repository: LinkRepository) extends LinkDAO {

  def find(id: String) =
    repository.findByKind(id)

  def save(data: Link) = {
    repository.insert(data)
    //    Future.successful(data)
  }

}

/**
 * The companion object.
 */
object LinkDAOImpl {

}