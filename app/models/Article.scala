package models

import com.mohiva.play.silhouette.api.Identity
import models.daos.TemporalModel
import org.joda.time.DateTime
import play.api.libs.json.Json

case class Article(
  _id: String,
  title: String,
  cover: Cover,
  author: LightUser,
  body: String,
  tags: List[String] = List(),
  nComment: Int = 0,
  nView: Int = 0,
  nLike: Int = 0,
  liker: List[String] = List(),
  time: DateTime = DateTime.now()
) extends Identity with TemporalModel {

}

object Article {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required
  implicit val articleFormat = Json.format[Article]
}