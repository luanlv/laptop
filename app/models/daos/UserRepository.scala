package models.daos

import javax.inject.Inject

import com.google.inject.Singleton
//import models.daos.{ DocumentDao, Repository }
import models.User
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.indexes.IndexType

import scala.concurrent.Future

@Singleton
class UserRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[User](reactiveMongoApi) with Repository[User] {

  override def collectionName = "users"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("email" -> IndexType.Ascending), unique = true)

  ensureIndexes
}