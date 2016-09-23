package models.daos

import com.google.inject.{ Inject, Singleton }
import models.Article
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.indexes.IndexType

import scala.concurrent.Future

@Singleton
class ArticleRepository @Inject() (reactiveMongoApi: ReactiveMongoApi)
  extends DocumentDao[Article](reactiveMongoApi)
  with Repository[Article] {

  override def collectionName = "article"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("" -> IndexType.Ascending), unique = true)

  ensureIndexes
}