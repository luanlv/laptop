package models.daos

import javax.inject.Inject

import com.google.inject.Singleton
import models.{ Category, Post }
//import models.daos.{ DocumentDao, Repository }
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.indexes.IndexType

import scala.concurrent.Future

@Singleton
class CategoryRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[Category](reactiveMongoApi) with Repository[Category] {

  override def collectionName = "category"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("slug" -> IndexType.Ascending), unique = true)

  ensureIndexes
}