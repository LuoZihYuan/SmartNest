import { Device } from "./Device.js";
import { Connector } from "../Connector.js";
import { DeviceBuilder } from "./DeviceBuilder.js";

export class DeviceFactory {
  /**
   * Singleton instance of the DeviceFactory.
   * @private
   */
  private static _instance: DeviceFactory;

  /**
   * Private constructor to enforce singleton pattern.
   * Use `DeviceFactory.instance` to access the instance.
   * @private
   */
  private constructor() {}

  /**
   * Gets the singleton instance of DeviceFactory.
   * @returns {DeviceFactory} The singleton instance.
   */
  public static get instance(): DeviceFactory {
    this._instance = this._instance || new DeviceFactory();
    return this._instance;
  }

  /**
   * Creates a new device using the provided connector.
   * @param {Connector} conn - The connector to use for the device.
   * @returns {Promise<Device>} A promise that resolves to the created device.
   * @throws {Error} If the device manifest cannot be retrieved.
   */
  public async createDevice(conn: Connector): Promise<Device> {
    await conn.connect();
    const manifest = conn.manifest;
    if (!manifest) {
      throw Error("Cannot get manifest for device.");
    }
    const builder = new DeviceBuilder();
    builder.setConnector(conn);
    (manifest.controls as Array<{ [key: string]: string }>).forEach(
      (control) => {
        builder.addControl(control.type);
      }
    );
    const new_device = builder.assemble();
    return new_device.setup(conn.manifest);
  }
}
