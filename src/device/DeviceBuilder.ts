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
  private _connector: Connector;
  private _controls: Array<string> = ["base"];

  public constructor(conn: Connector) {
    this._connector = conn;
  }

  public async setup() {
    await this._connector.connect();
  }

  public add(control: string): void {
    this._controls.push(control);
  }

  public assemble(): Device {
    let NewDevice = Device;
    this._controls
      .map((control_str: string) => ControlMap[control_str])
      .forEach((control) => {
        NewDevice = control(NewDevice);
      });
    return new NewDevice(this._connector);
  }
}
