package models.daos

import javax.inject.Inject

import com.google.inject.Singleton
import models.{ Category, Image, Setup, User }
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

@Singleton
class SetupRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[Setup](reactiveMongoApi) with Repository[Setup] {

  override def collectionName = "setup"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("name" -> IndexType.Ascending), unique = true)

  ensureIndexes
}

@Singleton
class UserRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[User](reactiveMongoApi) with Repository[User] {

  override def collectionName = "users"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("email" -> IndexType.Ascending), unique = true)

  ensureIndexes
}

@Singleton
class ImageRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[Image](reactiveMongoApi) with Repository[Image] {

  override def collectionName = "image"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("filename" -> IndexType.Ascending), unique = true)

  ensureIndexes
}