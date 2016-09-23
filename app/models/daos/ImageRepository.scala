package models.daos

import javax.inject.Inject

import com.google.inject.Singleton
import models.Image
//import models.daos.{ DocumentDao, Repository }
import models.User
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.indexes.IndexType

import scala.concurrent.Future

@Singleton
class ImageRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[Image](reactiveMongoApi) with Repository[Image] {

  override def collectionName = "image"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("filename" -> IndexType.Ascending), unique = true)

  ensureIndexes
}