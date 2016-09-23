package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import models.daos.TemporalModel
import org.joda.time.DateTime
import play.api.libs.json._
//import reactivemongo.bson.BSONObjectID
//import reactivemongo.bson.BSONObjectID
import reactivemongo.bson.BSONObjectID

case class Link(
  _id: String,
  url: String,
  postID: String
) extends Identity with TemporalModel {

}

object Link {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val linkFormat = Json.format[Link]
}