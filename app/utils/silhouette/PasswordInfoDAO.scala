package utils.silhouette

import javax.inject.Inject

import models.User
import com.mohiva.play.silhouette.api.util.PasswordInfo
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import com.mohiva.play.silhouette.api.LoginInfo

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import Implicits._
import models.daos.UserDAO

class PasswordInfoDAO @Inject() (userDAO: UserDAO) extends DelegableAuthInfoDAO[PasswordInfo] {

  def add(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] =
    {
      println("running password info ==============================")
      update(loginInfo, authInfo)
    }

  def find(loginInfo: LoginInfo): Future[Option[PasswordInfo]] =
    userDAO.find(loginInfo).map {
      case Some(user) if user.activated => Some(user.password)
      case _ => None
    }

  def remove(loginInfo: LoginInfo): Future[Unit] = userDAO.remove(loginInfo).map { result => Unit }

  def save(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] =
    find(loginInfo).flatMap {
      case Some(_) => update(loginInfo, authInfo)
      case None => add(loginInfo, authInfo)
    }

  def update(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] =
    userDAO.find(loginInfo).map {
      case Some(user) => {
        userDAO.save(user.copy(password = authInfo))
        authInfo
      }
      case _ => throw new Exception("PasswordInfoDAO - update : the user must exists to update its password")
    }

}