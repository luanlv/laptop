package controllers

import java.io.File
import java.util.UUID
import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import com.sksamuel.scrimage
import com.sksamuel.scrimage.ScaleMethod.Bicubic
import com.sksamuel.scrimage.nio.JpegWriter
import models.Image
import models.services.ImageService
import play.api.libs.json.Json
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

class ImageController @Inject() (
  ws: WSClient,
  val messagesApi: MessagesApi,
  silhouette: Silhouette[MyEnv],
  imageService: ImageService,
  socialProviderRegistry: SocialProviderRegistry,
  implicit val webJarAssets: WebJarAssets)
  extends Controller with I18nSupport {

  def getCover(id: String) = Action {
    val file = new java.io.File("/home/lvl/imageLaptopThaoLinh/" + id + ".jpg")
    Ok.sendFile(
      file,
      inline = true
    )
  }

  def listImage(page: Int) = Action.async { implicit request =>
    imageService.getList(page).map { images =>
      Ok(Json.toJson(images))
    }
  }

  def upload = Action(parse.multipartFormData) { request =>
    val uuid = UUID.randomUUID().toString
    request.body.file("file_data").map { picture =>
      import java.io.File
      val filename = picture.filename
      val contentType = picture.contentType
      val path = s"/home/lvl/imageLaptopThaoLinh/$uuid.jpg"
      resize(picture.ref.moveTo(new File(path)))
      val image = models.Image(
        _id = uuid,
        filename = filename,
        contentType = contentType,
        path = path
      )
      imageService.save(image)
      Ok(Json.obj("status" -> "File uploaded!"))
    }.getOrElse {
      Ok(Json.obj("error" -> "You are not allowed to upload such a file."))
    }
  }

  private def resize(file: File) = {
    import com.sksamuel.scrimage._
    implicit val writer = JpegWriter().withProgressive(true)
    scrimage.Image.fromFile(file).scaleToWidth(500, Bicubic).output(file)
  }

}
