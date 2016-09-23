package controllers

import java.io.File
import java.util.UUID
import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import com.sksamuel.scrimage
import com.sksamuel.scrimage.ScaleMethod.Bicubic
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
import play.Environment

class FileController @Inject() (
  ws: WSClient,
  val messagesApi: MessagesApi,
  silhouette: Silhouette[MyEnv],
  imageService: ImageService,
  socialProviderRegistry: SocialProviderRegistry,
  val environment: Environment,
  implicit val webJarAssets: WebJarAssets)
  extends Controller with I18nSupport {

  def getFile(name: String) = Action {
    val file = environment.getFile("file/" + name)
    //    val file = new java.io.File("/" + id + ".jpg")
    Ok.sendFile(
      file
    //      inline = true
    ).withHeaders("Cache-Control" -> "no-cache, no-store, must-revalidate")
  }

  def getSize = Action(parse.json) { implicit request =>
    println(request.body)
    (request.body \ "url").asOpt[String].map { url =>
      Ok(Json.obj("size" -> getSizeImpl(url)))
    }.getOrElse {
      BadRequest("Missing parameter [url]")
    }
  }

  def getSizeImpl(url: String): Long = {
    run(List(
      "curl -X HEAD -I  " + url,
      "grep Content-Length"
    )).toString.filter(_.isDigit).toLong
  }

  def run(cmd: List[String]) = {
    try {
      commandBuilder(cmd.tail.reverse, cmd.head) !!
      //            "find . -name *.txt" #| "grep ftp" !!
    } catch {
      case e: Exception => Stream()
    }
  }

  def commandBuilder(cmd: List[String], result: ProcessBuilder): ProcessBuilder = {
    if (cmd.isEmpty)
      result
    else
      commandBuilder(cmd.tail, result #| cmd.head)
  }

}
