import { Connector } from "../Connector";

export interface DeviceInfo {
  name: string;
  manufacturer: string;
  model: string;
  hwVersion: string;
  swVersion: string;
}

export class Device {
  private _deviceId: string | undefined;
  private _info: DeviceInfo | undefined;
  private _connector: Connector;
  public nickname: string = "";

  constructor(conn: Connector) {
    this._connector = conn;
  }

  public get deviceId(): string | undefined {
    return this._deviceId;
  }

  public get info(): DeviceInfo | undefined {
    return this._info;
  }

  public setup(manifest: { [key: string]: unknown }): Device {
    this._info = manifest["info"] as DeviceInfo;
    this._deviceId = manifest["deviceId"] as string;
    return this;
  }
}
