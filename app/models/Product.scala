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
  Guarantee: Int,
  Image: List[Image],
  Info: String,
  createAt: DateTime = DateTime.now()
) extends Identity with TemporalModel {

}

object Product {
  import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat // This is required

  implicit val productFormat = Json.format[Product]
}