package controllers

import javax.inject.{ Inject, Singleton }

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import models.services.{ CategoryService, IndexProductService, ProductService, SetupCategoryService }
import play.api.cache.Cached
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.libs.json.Json
import play.api.libs.ws.{ WS, WSClient }
import play.api.mvc.{ Action, BodyParsers, Controller, RequestHeader }
import utils.silhouette.{ AuthController, MyEnv }

import scala.concurrent.ExecutionContext.Implicits.global
import scala.sys.process._
import scala.language.postfixOps
import scala.concurrent.Future
import scala.concurrent.duration._

@Singleton
class ApplicationController @Inject() (
  cached: Cached,
  val silhouette: Silhouette[MyEnv],
  val messagesApi: MessagesApi,
  categoryService: CategoryService,
  setupCategoryService: SetupCategoryService,
  productService: ProductService,
  indexProductService: IndexProductService,
  socialProviderRegistry: SocialProviderRegistry) extends AuthController {

  /**
   * Handles the index action.
   *
   * @return The result to display.
   */
  def index = cached((rh: RequestHeader) => "index", 30) {
    UserAwareAction.async { implicit request =>
      val fuData = for {
        indexProduct <- indexProductService.retrieve("index")
        listProduct <- productService.getListByListID(indexProduct.get.value.flatMap { x => x.listID })
        categoryProduct <- setupCategoryService.retrieve("category")
        nav <- setupCategoryService.retrieve("nav")
      } yield (indexProduct.get, listProduct, categoryProduct.get.value, nav.get.value)
      fuData.map { data =>
        Ok(views.html.index(data._1.value, data._2.map(a => a._id -> a).toMap, data._3, data._4))
      }
    }
  }

  /**
   * Handles the Sign Out action.
   *
   * @return The result to display.
   */
  def signOut = silhouette.SecuredAction.async { implicit request =>
    val forward = request.getQueryString("forward").getOrElse("/")
    val result = Redirect(forward)
    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, result)
  }

}
