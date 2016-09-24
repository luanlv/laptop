package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import models.daos.TemporalModel
import org.joda.time.DateTime
import play.api.libs.json._
//import reactivemongo.bson.BSONObjectID
//import reactivemongo.bson.BSONObjectID
import reactivemongo.bson.BSONObjectID

case class Menu(
  id: Int,
  http: String,
  title: String,
  children: Option[List[SubMenu]]
) extends Identity with TemporalModel {

}

object Menu {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required
  implicit val subMenuFormat = Json.format[SubMenu]
  implicit val menuFormat = Json.format[Menu]
}

case class SubMenu(
  id: Int,
  http: String,
  title: String
) extends Identity with TemporalModel {

}

object SubMenu {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val subMenuFormat = Json.format[SubMenu]
}