package controllers

import javax.inject.{ Inject, Singleton }

import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import models.{ Article, LightImage, Product }
import models.services.{ ArticleService, IndexProductService, ProductService, SetupCategoryService }
import play.api.libs.json.{ JsObject, Json }
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
class ArticleController @Inject() (
  val messagesApi: MessagesApi,
  val silhouette: Silhouette[MyEnv],
  productService: ProductService,
  articleService: ArticleService,
  indexProductService: IndexProductService,
  setupCategoryService: SetupCategoryService,
  socialProviderRegistry: SocialProviderRegistry) extends AuthController {

  def index(articleID: String) = UserAwareAction.async { implicit request =>
    val fuData = for {
      article <- articleService.retrieve(articleID)
      categoryProduct <- setupCategoryService.retrieve("category")
      nav <- setupCategoryService.retrieve("nav")
    } yield (article.get, categoryProduct.get.value, nav.get.value)

    fuData map { data =>
      Ok(views.html.page(data._1, data._2, data._3))
    }
  }

  def getList(page: Int) = Action.async { implicit request =>
    articleService.getList(page) map { articles =>
      Ok(Json.toJson(articles))
    }
  }

  def getArticle(ID: String) = Action.async { implicit request =>
    articleService.retrieve(ID).map { opArticle =>
      opArticle match {
        case Some(article) => Ok(Json.toJson(article))
        case None => BadRequest
      }
    }
  }

  def newArticle = Action.async(parse.json) { implicit request =>
    request.body.asOpt[JsObject].map { article =>
      var newArticle = Article(
        _id = (article \ "_id").get.as[String],
        title = (article \ "title").get.as[String],
        body = (article \ "body").get.as[String]
      )
      articleService.save(newArticle).map {
        tryArticle =>
          tryArticle match {
            case Success(article) => {
              Ok("ok")
            }
            case Failure(ex) => BadRequest(s"Error: ${ex.getMessage}")
          }
      }
    }.getOrElse {
      Future.successful(BadRequest("not json"))
    }

  }

  def delete(articleID: String) = Action.async { implicit request =>
    articleService.delete(articleID) map { x =>
      Ok("ok")
    }
  }

}
