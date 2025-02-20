import { Device } from "./Device";
import { Connector } from "../Connector";
import { DeviceBuilder } from "./DeviceBuilder";

export class DeviceFactory {
  private static _instance: DeviceFactory;

  private constructor() {}

  public static get instance(): DeviceFactory {
    this._instance = this._instance || new DeviceFactory();
    return this._instance;
  }

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
