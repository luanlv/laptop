package models.services

import java.util.UUID
import javax.inject.Inject

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.services.IdentityService
import com.mohiva.play.silhouette.impl.providers.CommonSocialProfile
import models.User
import models.daos.UserDAO

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
/**
 * Handles actions to users.
 */
trait UserService extends IdentityService[User] {

  /**
   * Retrieves a user that matches the specified ID.
   *
   * @param id The ID to retrieve a user.
   * @return The retrieved user or None if no user could be retrieved for the given ID.
   */
  def retrieve(id: UUID): Future[Option[User]]

  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User): Future[User]

  /**
   * Saves the social profile for a user.
   *
   * If a user exists for this profile then update the user, otherwise create a new user with the given profile.
   *
   * @param profile The social profile to save.
   * @return The user for whom the profile was saved.
   */
  def save(profile: CommonSocialProfile): Future[User]

  //  def upsert(profile: CommonSocialProfile): Future[User]
}

/**
 * Handles actions to users.
 *
 * @param userDAO The user DAO implementation.
 */
class UserServiceImpl @Inject() (userDAO: UserDAO) extends UserService {

  /**
   * Retrieves a user that matches the specified ID.
   *
   * @param id The ID to retrieve a user.
   * @return The retrieved user or None if no user could be retrieved for the given ID.
   */
  def retrieve(id: UUID) = userDAO.find(id)

  /**
   * Retrieves a user that matches the specified login info.
   *
   * @param loginInfo The login info to retrieve a user.
   * @return The retrieved user or None if no user could be retrieved for the given login info.
   */
  def retrieve(loginInfo: LoginInfo): Future[Option[User]] = userDAO.find(loginInfo)

  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User) = userDAO.save(user)

  /**
   * Saves the social profile for a user.
   *
   * If a user exists for this profile then update the user, otherwise create a new user with the given profile.
   *
   * @param profile The social profile to save.
   * @return The user for whom the profile was saved.
   */
  def save(profile: CommonSocialProfile) = {
    userDAO.find(profile.loginInfo).flatMap {
      case Some(user) =>
        userDAO.updateUser(user.copy(
          firstName = profile.firstName,
          lastName = profile.lastName,
          fullName = profile.fullName,
          email = profile.email
        //          avatarURL = profile.avatarURL
        ))
      case None => // Insert a new user
        val uuid = UUID.randomUUID()
        val services = if (profile.loginInfo.providerKey == "665305433620492") {
          List("master")
        } else {
          List("user", "comment")
        }
        val newAvatar = if (profile.loginInfo.providerID == "facebook") {
          "http://graph.facebook.com/" + profile.loginInfo.providerKey + "/picture"
        } else {
          profile.avatarURL.get
        }
        userDAO.save(User(
          userID = uuid,
          loginInfo = profile.loginInfo,
          firstName = profile.firstName,
          lastName = profile.lastName,
          fullName = profile.fullName,
          email = profile.email,
          avatarURL = Some(newAvatar),
          services = services,
          activated = true
        ))
    }
  }

  //  def upsert(profile: CommonSocialProfile) = {
  //
  //  }
}