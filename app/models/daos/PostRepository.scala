package models.daos

import javax.inject.Inject

import com.google.inject.Singleton
import models.{ Image, Post }
//import models.daos.{ DocumentDao, Repository }
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.indexes.IndexType

import scala.concurrent.Future

@Singleton
class PostRepository @Inject() (reactiveMongoApi: ReactiveMongoApi)
  extends DocumentDao[Post](reactiveMongoApi)
  with Repository[Post] {

  override def collectionName = "post"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("title" -> IndexType.Ascending), unique = true)

  ensureIndexes
}