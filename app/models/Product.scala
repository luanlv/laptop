package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import models.daos.TemporalModel
import org.joda.time.DateTime
import play.api.libs.json._
//import reactivemongo.bson.BSONObjectID
//import reactivemongo.bson.BSONObjectID
import reactivemongo.bson.BSONObjectID

case class Product(
  _id: String,
  name: String,
  category: String,
  price: Int,
  extra: String,
  available: Boolean,
  guarantee: Int,
  image: List[LightImage],
  info: String,
  createAt: DateTime = DateTime.now()
) extends Identity with TemporalModel {

}

object Product {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val lightImageFormat = Json.format[LightImage]
  implicit val pFormat = Json.format[Product]
}

case class LightImage(
  _id: String,
  alt: String
) extends Identity with TemporalModel {

}

object LightImage {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val lightImageFormat = Json.format[LightImage]
}