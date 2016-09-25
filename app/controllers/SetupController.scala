package controllers

import java.io.File
import java.util.UUID
import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import com.sksamuel.scrimage
import com.sksamuel.scrimage.ScaleMethod.Bicubic
import models.{ CategoryMenu, Image, SetupCategory }
import models.services.{ ImageService, SetupCategoryService }
import play.api.libs.json.{ JsArray, JsObject, JsValue, Json }
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

class SetupController @Inject() (
  ws: WSClient,
  val messagesApi: MessagesApi,
  silhouette: Silhouette[MyEnv],
  setupCategoryService: SetupCategoryService,
  socialProviderRegistry: SocialProviderRegistry,
  implicit val webJarAssets: WebJarAssets)
  extends Controller with I18nSupport {

  def postSetupCategory = Action(parse.json) { implicit request =>
    request.body.asOpt[JsValue].map { category =>
      {
        var newSetupCategory = SetupCategory(
          _id = "category",
          value = category.as[List[CategoryMenu]]
        )
        setupCategoryService.save(newSetupCategory)
        Ok("ok")
      }
    }.getOrElse {
      BadRequest("not json")
    }
  }

  def getSetupCategory = Action.async { implicit request =>

    setupCategoryService.retrieve("category").map { category =>
      category match {
        case Some(category) => {
          Ok(Json.toJson(category.value))
        }
        case None => Ok(Json.toJson(JsArray()))
      }
    }

  }
}
