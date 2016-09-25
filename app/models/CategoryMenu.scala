package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import models.daos.TemporalModel
import org.joda.time.DateTime
import play.api.libs.json._
//import reactivemongo.bson.BSONObjectID
//import reactivemongo.bson.BSONObjectID
import reactivemongo.bson.BSONObjectID

case class CategoryMenu(
  id: Int,
  http: String,
  title: String,
  children: Option[List[SubCategoryMenu]]
) extends Identity with TemporalModel {

}

object CategoryMenu {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required
  implicit val subSetupCategoryFormat = Json.format[SubCategoryMenu]
  implicit val setupCategoryFormat = Json.format[CategoryMenu]
}

case class SubCategoryMenu(
  id: Int,
  http: String,
  title: String
) extends Identity with TemporalModel {

}

object SubCategoryMenu {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val subMenuFormat = Json.format[SubCategoryMenu]
}