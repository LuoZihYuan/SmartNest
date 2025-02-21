import { Device } from "./Device.js";
import { Connector } from "../Connector.js";
import {
  ModeControl,
  OnOffControl,
  TemperatureControl,
} from "./control/index.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => any;

const ControlMap: { [key: string]: (Base: Constructor) => Constructor } = {
  mode: ModeControl,
  onoff: OnOffControl,
  temperature: TemperatureControl,
};

export class DeviceBuilder {
  /**
   * The connector for the device.
   * @private
   */
  private _connector: Connector | undefined;

  /**
   * List of controls to be added to the device.
   * @private
   */
  private _controls: Array<string> = [];

  /**
   * Sets the connector for the device.
   * @param {Connector} conn - The connector instance.
   * @returns {DeviceBuilder} The updated DeviceBuilder instance.
   */
  public setConnector(conn: Connector): DeviceBuilder {
    this._connector = conn;
    return this;
  }

  /**
   * Adds a control to the device.
   * @param {string} control - The control to add.
   * @returns {DeviceBuilder} The updated DeviceBuilder instance.
   */
  public addControl(control: string): DeviceBuilder {
    this._controls.push(control);
    return this;
  }
  /**
   * Assembles and returns a new device with the specified connector and controls.
   * @returns {Device} The assembled device.
   * @throws {Error} If no connector is set or no controls are added before assembling.
   */
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
