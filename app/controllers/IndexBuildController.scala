package controllers

import java.io.File
import java.util.UUID
import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import com.sksamuel.scrimage
import com.sksamuel.scrimage.ScaleMethod.Bicubic
import models._
import models.services.{ ImageService, IndexProductService, SetupCategoryService }
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

class IndexBuildController @Inject() (
  ws: WSClient,
  val messagesApi: MessagesApi,
  silhouette: Silhouette[MyEnv],
  indexProductService: IndexProductService,
  socialProviderRegistry: SocialProviderRegistry,
  implicit val webJarAssets: WebJarAssets)
  extends Controller with I18nSupport {

  def postIndexProduct = Action(parse.json) { implicit request =>
    request.body.asOpt[JsValue].map { listProduct =>
      {
        var newIndexProduct = IndexProduct(
          _id = "index",
          value = listProduct.as[List[ListProduct]]
        )
        indexProductService.save(newIndexProduct)
        Ok("ok")
      }
    }.getOrElse {
      BadRequest("not json")
    }
  }

  def getIndexProduct = Action.async { implicit request =>

    indexProductService.retrieve("index").map { opIndexProduct =>
      opIndexProduct match {
        case Some(indexProduct) => {
          Ok(Json.toJson(indexProduct.value))
        }
        case None => Ok(Json.toJson(JsArray()))
      }
    }

  }
}
