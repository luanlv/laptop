package modes.daos

import javax.inject.{ Inject, Singleton }
import models.Comment
import models.daos.{ DocumentDao, Repository }
import play.modules.reactivemongo.ReactiveMongoApi

import scala.concurrent.Future

@Singleton
class CommentRepository @Inject() (reactiveMongoApi: ReactiveMongoApi) extends DocumentDao[Comment](reactiveMongoApi) with Repository[Comment] {
  override def collectionName = "comment"
  override def ensureIndexes: Future[Boolean] = ensureIndex(List(), unique = true)
}