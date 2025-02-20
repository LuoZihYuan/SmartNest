import { User, UserRole } from "../User";
import { Connector } from "../Connector";
import { Device, DeviceFactory } from "../device";

export class DeviceManager {
  /**
   * Singleton instance of DeviceManager.
   * @private
   */
  private static _instance: DeviceManager;

  /**
   * List of registered devices.
   * @private
   */
  private _devices: Array<Device> = [];

  /**
   * Gets the list of registered devices.
   * @returns {Array<Device>} The list of devices.
   */
  public get devices() {
    return this._devices;
  }

  /**
   * Private constructor to enforce singleton pattern.
   * @private
   */
  private constructor() {}

  /**
   * Gets the singleton instance of DeviceManager.
   * @returns {DeviceManager} The singleton instance.
   */
  public static get instance(): DeviceManager {
    this._instance = this._instance || new DeviceManager();
    return this._instance;
  }

  /**
   * Adds a new device if the user is an admin.
   * @param {User} user - The user attempting to add a device.
   * @param {string} url - The connection URL for the device.
   * @returns {Promise<DeviceManager>} The updated DeviceManager instance.
   * @throws {Error} If the user is not an admin.
   */
  public async addDevice(user: User, url: string): Promise<DeviceManager> {
    if (user.role !== UserRole.Admin) {
      throw new Error("Only admins can add device");
    }
    const conn = new Connector(url);
    const new_device = await DeviceFactory.instance.createDevice(conn);
    this._devices.push(new_device);
    return this;
  }

  /**
   * Deletes a device if the user is an admin.
   * @param {User} user - The user attempting to delete a device.
   * @param {string} deviceId - The ID of the device to delete.
   * @returns {DeviceManager} The updated DeviceManager instance.
   * @throws {Error} If the user is not an admin.
   */
  public deleteDevice(user: User, deviceId: string): DeviceManager {
    if (user.role !== UserRole.Admin) {
      throw new Error("Only admins can delete device");
    }
    this._devices = this._devices.filter((device) => {
      return device.deviceId !== deviceId;
    });
    return this;
  }
}
