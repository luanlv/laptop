package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import models.daos.TemporalModel
import org.joda.time.DateTime
import play.api.libs.json._
//import reactivemongo.bson.BSONObjectID
//import reactivemongo.bson.BSONObjectID
import reactivemongo.bson.BSONObjectID

case class SetupCategory(
  _id: String,
  value: List[CategoryMenu]
) extends Identity with TemporalModel {

}

object SetupCategory {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val categoryMenuFormat = Json.format[models.CategoryMenu]
  implicit val setupCategoryFormat = Json.format[models.SetupCategory]
}