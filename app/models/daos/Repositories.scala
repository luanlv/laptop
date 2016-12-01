package models.daos

import javax.inject.Inject

import com.google.inject.Singleton
import models._
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.indexes.IndexType

import scala.concurrent.Future

@Singleton
class CategoryRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[Category](reactiveMongoApi) with Repository[Category] {

  override def collectionName = "category"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List(), unique = true)

  ensureIndexes
}

@Singleton
class SetupCategoryRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[SetupCategory](reactiveMongoApi) with Repository[SetupCategory] {

  override def collectionName = "setupCateogry"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List(), unique = true)

  ensureIndexes
}
@Singleton
class IndexProductRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[IndexProduct](reactiveMongoApi) with Repository[IndexProduct] {

  override def collectionName = "indexProduct"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List(), unique = true)

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

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("id" -> IndexType.Ascending), unique = true)

  ensureIndexes
}

@Singleton
class ProductRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[Product](reactiveMongoApi) with Repository[Product] {

  override def collectionName = "product"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List("name" -> IndexType.Ascending), unique = true)

  ensureIndexes
}

@Singleton
class ArticleRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[Article](reactiveMongoApi) with Repository[Article] {

  override def collectionName = "article"

  override def ensureIndexes: Future[Boolean] = ensureIndex(List(), unique = true)

  ensureIndexes
}