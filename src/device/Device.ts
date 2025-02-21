import { Connector } from "../Connector.js";

/**
 * Represents device information.
 * @interface DeviceInfo
 */
export interface DeviceInfo {
  name: string;
  manufacturer: string;
  model: string;
  hwVersion: string;
  swVersion: string;
}

/**
 * Represents a smart device connected through a `Connector`.
 */
export class Device {
  /**
   * The unique identifier of the device.
   * @protected
   */
  protected _deviceId: string | undefined;

  /**
   * Information about the device.
   * @protected
   */
  protected _info: DeviceInfo | undefined;

  /**
   * The connector used to communicate with the device.
   * @protected
   */
  protected _connector: Connector;

  /**
   * A user-defined nickname for the device.
   * @public
   */
  public nickname: string = "";

  /**
   * Creates a new Device instance.
   * @param {Connector} conn - The connector instance used for communication.
   */
  constructor(conn: Connector) {
    this._connector = conn;
  }

  /**
   * Gets the unique identifier of the device.
   * @returns {string | undefined} The device ID, or `undefined` if not set.
   */
  public get deviceId(): string | undefined {
    return this._deviceId;
  }

  /**
   * Gets the device information.
   * @returns {DeviceInfo | undefined} The device information, or `undefined` if not set.
   */
  public get info(): DeviceInfo | undefined {
    return this._info;
  }

  /**
   * Initializes the device with data from the provided manifest.
   * @param {{ [key: string]: unknown }} manifest - The device manifest data.
   * @returns {Device} The updated `Device` instance.
   */
  public setup(manifest: { [key: string]: unknown }): Device {
    this._info = manifest["info"] as DeviceInfo;
    this._deviceId = manifest["deviceId"] as string;
    return this;
  }

  public update(): Device {
    return this;
  }
}
