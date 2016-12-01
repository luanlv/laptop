package controllers

import java.text.Normalizer
import javax.inject.{ Inject, Singleton }

import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import models.{ LightImage, Product }
import models.services.{ IndexProductService, ProductService, SetupCategoryService }
import play.api.cache.Cached
import play.api.libs.json.{ JsObject, Json }
import play.api.mvc.RequestHeader
import utils.silhouette.{ AuthController, MyEnv }

import scala.concurrent.Future
import scala.util.{ Failure, Success }
//import com.sksamuel.scrimage.Image
//import com.sksamuel.scrimage.ScaleMethod.Bicubic
//import com.sksamuel.scrimage.nio.JpegWriter
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.libs.ws.WSClient
import play.api.mvc.{ Action, Controller }

import scala.concurrent.ExecutionContext.Implicits.global
import scala.language.postfixOps

@Singleton
class ProductController @Inject() (
  val messagesApi: MessagesApi,
  val silhouette: Silhouette[MyEnv],
  productService: ProductService,
  indexProductService: IndexProductService,
  setupCategoryService: SetupCategoryService,
  socialProviderRegistry: SocialProviderRegistry) extends AuthController {

  def index(categorySlug: String, productID: String) = UserAwareAction.async { implicit request =>
    val fuData = for {
      product <- productService.retrieve(productID)
      productsInCategory <- productService.getListByCategory(categorySlug, 1, 12)
      categoryProduct <- setupCategoryService.retrieve("category")
      nav <- setupCategoryService.retrieve("nav")
    } yield (product.get, productsInCategory, categoryProduct.get.value, nav.get.value)

    fuData map { data =>
      Ok(views.html.product(data._1, data._2, data._3, data._4))
    }
  }

  def indexCategory(categorySlug: String, page: Int) = UserAwareAction.async { implicit request =>
    val fuData = for {
      products <- productService.getListByCategory(categorySlug, page)
      categoryProduct <- setupCategoryService.retrieve("category")
      nav <- setupCategoryService.retrieve("nav")
    } yield (products, categoryProduct.get.value, nav.get.value)

    fuData map { data =>
      Ok(views.html.category(data._1, data._2, data._3))
    }
  }

  def getList(page: Int) = Action.async { implicit request =>
    productService.getList(page) map { products =>
      Ok(Json.toJson(products))
    }
  }

  def getProduct(ID: String) = Action.async { implicit request =>
    productService.retrieve(ID).map { opProduct =>
      opProduct match {
        case Some(product) => Ok(Json.toJson(product))
        case None => BadRequest
      }
    }
  }

  def search(keyword: String) = UserAwareAction.async { implicit request =>
    val fuData = for {
      products <- productService.search(normalize(keyword))
      categoryProduct <- setupCategoryService.retrieve("category")
      nav <- setupCategoryService.retrieve("nav")
    } yield (products, categoryProduct.get.value, nav.get.value)

    fuData map { data =>
      println(data._1)
      Ok(views.html.search(data._1, keyword, data._2, data._3))
    }
  }

  def newProduct = Action.async(parse.json) { implicit request =>
    import java.text.Normalizer
    request.body.asOpt[JsObject].map { product =>

      var newProduct = Product(
        _id = (product \ "_id").get.as[String],
        name = (product \ "name").get.as[String],
        search = normalize((product \ "name").as[String]),
        category = (product \ "category").get.as[String],
        price = (product \ "price").get.as[Int],
        extra = (product \ "extra").get.as[String],
        available = (product \ "available").get.as[Boolean],
        guarantee = (product \ "guarantee").get.as[Int],
        image = (product \ "image").get.as[List[LightImage]],
        info = (product \ "info").get.as[String],
        driver = (product \ "driver").get.asOpt[String],
        youtube = (product \ "youtube").get.asOpt[String]
      )
      productService.save(newProduct).map {
        tryProduct =>
          tryProduct match {
            case Success(product) => {
              Ok("ok")
            }
            case Failure(ex) => BadRequest(s"Error: ${ex.getMessage}")
          }
      }
    }.getOrElse {
      Future.successful(BadRequest("not json"))
    }

  }

  def delete(productID: String) = Action.async { implicit request =>
    productService.delete(productID) map { x =>
      Ok("ok")
    }
  }

  def normalize(str: String) = {
    val regex = "\\p{InCombiningDiacriticalMarks}+".r
    val normalized = Normalizer.normalize(str, Normalizer.Form.NFD)
    val result = regex.replaceAllIn(normalized, "")
    result
  }
}
