package models.daos

import javax.inject.Inject

import com.google.inject.Singleton
import models.{ Image, Setup }
import play.api.libs.json.{ JsObject, JsValue }
//import models.daos.{ DocumentDao, Repository }
import models.User
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.indexes.IndexType

import scala.concurrent.Future

@Singleton
class SetupRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[Setup](reactiveMongoApi) with Repository[Setup] {

  override def collectionName = "setup"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("name" -> IndexType.Ascending), unique = true)

  ensureIndexes
}