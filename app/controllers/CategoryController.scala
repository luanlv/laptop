package controllers

import java.io.File
import java.util.UUID
import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import com.sksamuel.scrimage
import com.sksamuel.scrimage.ScaleMethod.Bicubic
import models.{ Category, Image }
import models.services.{ CategoryService, ImageService }
import play.api.libs.json.{ JsObject, Json }
import utils.silhouette.MyEnv
//import com.sksamuel.scrimage.Image
//import com.sksamuel.scrimage.ScaleMethod.Bicubic
//import com.sksamuel.scrimage.nio.JpegWriter
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.libs.iteratee.Enumerator
import play.api.libs.ws.{ WS, WSClient }
import play.api.mvc.{ Action, Controller }

import scala.concurrent.ExecutionContext.Implicits.global
import scala.sys.process._
import scala.language.postfixOps
import scala.concurrent.Future

class CategoryController @Inject() (
  ws: WSClient,
  val messagesApi: MessagesApi,
  silhouette: Silhouette[MyEnv],
  categoryService: CategoryService,
  socialProviderRegistry: SocialProviderRegistry,
  implicit val webJarAssets: WebJarAssets)
  extends Controller with I18nSupport {

  def listCategory = Action.async {
    categoryService.listCategory map { categories =>
      Ok(Json.toJson(categories))
    }
  }

  def doCategory = Action.async(parse.json) { implicit request =>
    request.body.asOpt[JsObject].map { category =>
      val newCategory = Category(
        _id = (category \ "_id").get.as[String],
        name = (category \ "name").get.as[String]
      )
      categoryService.save(newCategory).map { category =>
        Ok(Json.toJson(category))
      }
    }.getOrElse {
      Future.successful(BadRequest("not json"))
    }
  }

}
