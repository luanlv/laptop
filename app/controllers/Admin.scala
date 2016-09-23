package controllers

import java.io.File
import java.util.UUID
import javax.inject.{ Inject, Singleton }

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import com.sksamuel.scrimage
import com.sksamuel.scrimage.ScaleMethod.Bicubic
import com.sksamuel.scrimage.nio.JpegWriter
import models.Link
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
  postService: PostService,
  categoryService: CategoryService,
  setupService: SetupService,
  linkService: LinkService,
  socialProviderRegistry: SocialProviderRegistry) extends AuthController {

  /**
   * Handles the index action.
   *
   * @return The result to display.
   */
  def index = silhouette.SecuredAction(WithService("master")).async { implicit request =>
    //    println("==========================" + request.identity.email)
    if (request.identity.email.getOrElse("") == "admin@vndocs.com") {
      Future.successful(Redirect(routes.ApplicationController.index()))
    } else {
      Future.successful(Ok(views.html.admin.index("Trang chu")))
    }
  }

  def doPost = Action(parse.json) { implicit request =>

    request.body.asOpt[JsObject].map { post =>
      val postID = (post \ "id").get.as[String]
      val link = (post \ "link").asOpt[List[LinkInfo]].getOrElse(List()).map {
        el =>
          {
            val uuid = UUID.randomUUID().toString
            val securityLink = models.Link(
              _id = uuid,
              url = el.url,
              postID = postID
            )
            linkService.save(securityLink)
            el.copy(url = uuid)
          }
      }
      val newPost = Post(
        _id = postID,
        title = (post \ "title").get.as[String],
        categories = (post \ "categories").get.as[List[String]],
        description = (post \ "description").get.as[String],
        content = (post \ "content").get.as[String],
        link = link,
        cover = (post \ "cover").asOpt[Cover]
      )
      postService.save(newPost)
      Ok("ok")
    }.getOrElse {
      BadRequest("not json")
    }
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

  def uploadImage = Action.async(parse.multipartFormData) { implicit request =>
    val uuid = UUID.randomUUID().toString
    request.body.file("file").map { picture =>
      import java.io.File
      val filename = picture.filename
      val contentType = picture.contentType
      val path = s"/home/lvl/image/$uuid.jpg"
      resize(picture.ref.moveTo(new File(path)))
      val image = models.Image(
        id = uuid,
        filename = filename,
        contentType = contentType,
        path = path
      )
      imageService.save(image)
      Future.successful(Ok("File uploaded"))
    }.getOrElse {
      Future.successful(BadRequest("error"))
    }
  }

  def listImage(page: Int) = Action.async { implicit request =>
    imageService.getList(page).map { images =>
      Ok(Json.toJson(images))
    }
  }

  private def resize(file: File) = {

    import com.sksamuel.scrimage._
    implicit val writer = JpegWriter().withCompression(80).withProgressive(true)
    scrimage.Image.fromFile(file).scaleTo(94, 128, Bicubic).output(file)
  }

}
