import { Device } from "./Device";
import { Connector } from "../Connector";
import { ModeControl, OnOffControl, TemperatureControl } from "./control";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => any;

const ControlMap: { [key: string]: (Base: Constructor) => Constructor } = {
  mode: ModeControl,
  onoff: OnOffControl,
  temperature: TemperatureControl,
};

export class DeviceBuilder {
  private _connector: Connector | undefined;
  private _controls: Array<string> = [];

  public constructor() {}

  public setConnector(conn: Connector): DeviceBuilder {
    this._connector = conn;
    return this;
  }

  public addControl(control: string): DeviceBuilder {
    this._controls.push(control);
    return this;
  }

  public assemble(): Device {
    if (!this._connector) {
      throw new Error("Set device connector before assembling.");
    } else if (this._controls.length === 0) {
      throw new Error("Add controls to the device before assembling.");
    }
    let NewDevice = Device;
    this._controls
      .map((control_str: string) => ControlMap[control_str])
      .forEach((control) => {
        NewDevice = control(NewDevice);
      });
    return new NewDevice(this._connector);
  }
}
