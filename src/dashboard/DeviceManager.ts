import { Connector } from "../Connector";
import { Device, DeviceBuilder } from "../device";

export class DeviceManager {
  private static _instance: DeviceManager;
  private devices: Array<Device> = [];

  private constructor() {}

  public static get instance(): DeviceManager {
    this._instance = this._instance || new DeviceManager();
    return this._instance;
  }

  public async addDevice(url: string): Promise<DeviceManager> {
    const conn = new Connector(url);
    const builder = new DeviceBuilder(conn);
    await builder.setup();

    return this;
  }

  public deleteDevice(): DeviceManager {
    return this;
  }

  public sendCommand(): DeviceManager {
    return this;
  }
}
