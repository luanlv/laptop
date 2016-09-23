package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import models.daos.TemporalModel
import org.joda.time.DateTime
import play.api.libs.json._
//import reactivemongo.bson.BSONObjectID
//import reactivemongo.bson.BSONObjectID
import reactivemongo.bson.BSONObjectID

case class Setup(
  _id: String,
  value: String
) extends Identity with TemporalModel {

}

object Setup {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val SetupFormat = Json.format[Setup]
}