package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import models.{ LightImage, Product }
import models.services.{ ProductService, SetupService }
import play.api.libs.json.JsObject
import utils.silhouette.MyEnv

import scala.concurrent.Future
//import com.sksamuel.scrimage.Image
//import com.sksamuel.scrimage.ScaleMethod.Bicubic
//import com.sksamuel.scrimage.nio.JpegWriter
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.libs.ws.WSClient
import play.api.mvc.{ Action, Controller }

import scala.concurrent.ExecutionContext.Implicits.global
import scala.language.postfixOps

class ProductController @Inject() (
  ws: WSClient,
  val messagesApi: MessagesApi,
  silhouette: Silhouette[MyEnv],
  setupService: SetupService,
  productService: ProductService,
  socialProviderRegistry: SocialProviderRegistry,
  implicit val webJarAssets: WebJarAssets)
  extends Controller with I18nSupport {

  def newProduct = Action.async(parse.json) { implicit request =>
    request.body.asOpt[JsObject].map { product =>
      var newProduct = Product(
        _id = (product \ "_id").get.as[String],
        name = (product \ "name").get.as[String],
        category = (product \ "category").get.as[String],
        price = (product \ "price").get.as[Int],
        extra = (product \ "extra").get.as[String],
        available = (product \ "available").get.as[Boolean],
        guarantee = (product \ "guarantee").get.as[Int],
        image = (product \ "image").get.as[List[LightImage]],
        info = (product \ "info").get.as[String]
      )
      productService.save(newProduct)
      Future.successful(Ok("ok"))
    }.getOrElse {
      Future.successful(BadRequest("not json"))
    }

  }

}
