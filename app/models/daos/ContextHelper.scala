package models.daos

import scala.concurrent.ExecutionContext

/**
 * Helper around implicit contexts
 */
trait ContextHelper {

  implicit def ec: ExecutionContext = ExecutionContext.Implicits.global

}