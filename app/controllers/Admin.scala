package controllers

import java.io.File
import java.util.UUID
import javax.inject.{ Inject, Singleton }

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import com.sksamuel.scrimage
import com.sksamuel.scrimage.ScaleMethod.Bicubic
import com.sksamuel.scrimage.nio.JpegWriter
import models._
import models.services._
import org.apache.commons.io.FilenameUtils
import org.joda.time.DateTime
import play.api.libs.json.{ JsObject, JsValue, Json }
import utils.silhouette.{ AuthController, MyEnv, WithService }
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

@Singleton
class Admin @Inject() (
  val silhouette: Silhouette[MyEnv],
  val messagesApi: MessagesApi,
  imageService: ImageService,
  categoryService: CategoryService,
  setupService: SetupService,
  socialProviderRegistry: SocialProviderRegistry) extends AuthController {

  /**
   * Handles the index action.
   *
   * @return The result to display.
   */
  def index = silhouette.UnsecuredAction.async { implicit request =>
    Future.successful(Ok(views.html.admin.index("Trang chu")))
  }

  def doCategory = Action(parse.json) { implicit request =>
    request.body.asOpt[JsObject].map { category =>
      val newCategory = Category(
        _id = (category \ "slug").get.asOpt[String],
        slug = (category \ "slug").get.as[String],
        name = (category \ "name").get.as[String],
        sku = (category \ "sku").asOpt[Sku],
        description = (category \ "description").get.as[String]
      )
      categoryService.save(newCategory)
      Ok("ok")
    }.getOrElse {
      BadRequest("not json")
    }
  }

  def doMenu = Action(parse.json) { implicit request =>
    request.body.asOpt[JsValue].map { menu =>
      var newMenu = Setup(
        _id = "menu",
        value = menu.toString().replaceAll("\\\"", "\"")
      )
      setupService.save(newMenu)
      Ok("ok")
    }.getOrElse {
      BadRequest("not json")
    }
  }

}
