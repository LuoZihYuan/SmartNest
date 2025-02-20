import crypto from "crypto";
import { Connector } from "../Connector";

export interface DeviceInfo {
  name: string;
  manufacturer: string;
  model: string;
  hwVersion: string;
  swVersion: string;
}

export class Device {
  private _deviceId: string;
  private _info: DeviceInfo | undefined;
  private _connector: Connector;
  public nickname: string = "";

  constructor(conn: Connector) {
    this._deviceId = crypto.randomUUID();
    this._connector = conn;
  }

  public get deviceId(): string {
    return this._deviceId;
  }

  public get info(): DeviceInfo | undefined {
    return this._info;
  }

  public load(manifest: { [key: string]: unknown }) {
    this._info = manifest["info"] as DeviceInfo;
  }
}
