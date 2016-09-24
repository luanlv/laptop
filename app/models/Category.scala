package models

import com.mohiva.play.silhouette.api.Identity
import models.daos.TemporalModel
import play.api.libs.json.Json
import reactivemongo.bson.{ BSONArray, BSONHandler, BSONString, Macros }

import scala.concurrent.duration._
import org.joda.time.DateTime

case class Category(
  _id: String, name: String) extends Identity with TemporalModel {
}

object Category {
  implicit val categoryFormat = Json.format[Category]
}
