package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import models.daos.TemporalModel
import org.joda.time.DateTime
import play.api.libs.json._
//import reactivemongo.bson.BSONObjectID
//import reactivemongo.bson.BSONObjectID
import reactivemongo.bson.BSONObjectID

case class Post(
  _id: String,
  title: String,
  author: String = "admin",
  categories: List[String],
  description: String,
  content: String,
  link: List[LinkInfo],
  cover: Option[Cover],
  nView: Int = 0,
  nLike: Int = 0,
  nComment: Int = 0,
  liker: List[String] = List(),
  time: DateTime = DateTime.now()
) extends Identity with TemporalModel {
}

object Post {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required
  implicit val LinkinfoFormat = Json.format[LinkInfo]
  implicit val coverFormat = Json.format[Cover]
  implicit val PostFormat = Json.format[Post]
}

case class LinkInfo(
  url: String,
  shortUrl: Option[String],
  filename: String,
  filesize: Long
) extends Identity with TemporalModel {

}

object LinkInfo {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val LinkinfoFormat = Json.format[LinkInfo]
}

case class Cover(
  id: String,
  alt: String

) extends Identity with TemporalModel {

}

object Cover {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val coverFormat = Json.format[Cover]
}