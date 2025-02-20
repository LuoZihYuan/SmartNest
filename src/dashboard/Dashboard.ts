import { UserManager } from "./UserManager";
import { DeviceManager } from "./DeviceManager";
export class Dashboard {
  readonly user_manager = UserManager.instance;
  readonly device_manager = DeviceManager.instance;
  constructor() {}
}
