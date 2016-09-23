package models.daos

import javax.inject.Inject

import com.google.inject.Singleton
import models.{ Link, Post }
//import models.daos.{ DocumentDao, Repository }
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.indexes.IndexType

import scala.concurrent.Future

@Singleton
class LinkRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[Link](reactiveMongoApi) with Repository[Link] {

  override def collectionName = "link"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("" -> IndexType.Ascending), unique = true)

  ensureIndexes
}