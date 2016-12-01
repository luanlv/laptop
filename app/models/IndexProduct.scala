package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import models.daos.TemporalModel
import org.joda.time.DateTime
import play.api.libs.json._
//import reactivemongo.bson.BSONObjectID
//import reactivemongo.bson.BSONObjectID
import reactivemongo.bson.BSONObjectID

case class IndexProduct(
  _id: String,
  value: List[ListProduct]
) extends Identity with TemporalModel {

}

object IndexProduct {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val listProductFormat = Json.format[models.ListProduct]
  implicit val indexProductFormat = Json.format[models.IndexProduct]
}

case class ListProduct(
  name: String,
  listID: List[String]
) extends Identity with TemporalModel {

}

object ListProduct {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val listProductFormat = Json.format[models.ListProduct]
}