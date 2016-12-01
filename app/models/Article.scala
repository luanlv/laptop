package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import models.daos.TemporalModel
import org.joda.time.DateTime
import play.api.libs.json._
//import reactivemongo.bson.BSONObjectID
//import reactivemongo.bson.BSONObjectID
import reactivemongo.bson.BSONObjectID

case class Article(
  _id: String,
  title: String,
  body: String
) extends Identity with TemporalModel {

}

object Article {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required
  implicit val articleFormat = Json.format[Article]
}
