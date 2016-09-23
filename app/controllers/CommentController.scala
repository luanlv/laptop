package controllers

import com.google.inject.{ Inject, Singleton }
import com.mohiva.play.silhouette.api.Silhouette
import models.{ Comment, LightUser }
import models.services.{ ArticleService, CommentService, PostService }
import play.api.i18n.MessagesApi
import play.api.libs.json.{ JsObject, Json }
import utils.silhouette.{ AuthController, MyEnv, WithService }

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{ Failure, Success }

@Singleton
class CommentController @Inject() (
  val silhouette: Silhouette[MyEnv],
  val messagesApi: MessagesApi,
  commentService: CommentService,
  postService: PostService,
  articleService: ArticleService,
  socialAuthController: SocialAuthController)
  extends AuthController {

  def doComment(parrentID: String) = silhouette.SecuredAction(WithService("comment")).async(parse.json) { implicit request =>
    (request.body \ "data").asOpt[String].map {
      comment =>
        {
          val newComment = Comment(
            parentPost = parrentID,
            comment = comment,
            user = LightUser.trimUser(request.identity)
          )
          commentService.save(newComment).map {
            tryComment =>
              tryComment match {
                case Success(comment) => {
                  if ((request.body \ "type").as[String] == "post") {
                    postService.incComment(parrentID)
                  } else if ((request.body \ "type").as[String] == "article") {
                    articleService.incComment(parrentID)
                  }
                  Ok(Json.toJson(comment))
                }
                case Failure(ex) => BadRequest(s"Error: ${ex.getMessage}")
              }
          }
        }
    }.getOrElse {
      Future.successful(BadRequest("not json"))
    }
  }

  def getList(postID: String, page: Int) = silhouette.UserAwareAction.async { implicit request =>
    commentService.getList(postID, page).map {
      listComments =>
        Ok(Json.toJson(listComments))
    }
  }

}