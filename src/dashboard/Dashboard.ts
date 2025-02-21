import { UserManager } from "./UserManager.js";
import { DeviceManager } from "./DeviceManager.js";
export class Dashboard {
  /**
   * Instance of the UserManager, providing access to user-related operations.
   * @readonly
   */
  readonly user_manager = UserManager.instance;

  /**
   * Instance of the DeviceManager, providing access to device-related operations.
   * @readonly
   */
  readonly device_manager = DeviceManager.instance;
}
