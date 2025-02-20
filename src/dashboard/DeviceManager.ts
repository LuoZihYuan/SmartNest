import { Connector } from "../Connector";
import { Device, DeviceFactory } from "../device";

export class DeviceManager {
  private static _instance: DeviceManager;
  private _devices: Array<Device> = [];

  public get devices() {
    return this._devices;
  }

  private constructor() {}

  public static get instance(): DeviceManager {
    this._instance = this._instance || new DeviceManager();
    return this._instance;
  }

  public async addDevice(url: string): Promise<DeviceManager> {
    const conn = new Connector(url);
    const new_device = await DeviceFactory.instance.createDevice(conn);
    this._devices.push(new_device);
    return this;
  }

  public deleteDevice(deviceId: string): DeviceManager {
    this._devices = this._devices.filter((device) => {
      return device.deviceId !== deviceId;
    });
    return this;
  }
}
