import { Connector } from "../../Connector";
import { ControlProtocol } from "./Control";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => {
  _deviceId: string;
  _connector: Connector;
  load(manifest: { [key: string]: unknown }): unknown;
};

type Unit = "Celsius" | "Ferenheit" | "Kelvin";

export const TemperatureControl = <T extends Constructor>(Base: T) => {
  return class TemperatureControl extends Base implements ControlProtocol {
    private _temperature: number = 0;
    private _range: Array<number> = [0, 0];
    private _unit: Unit = "Celsius";

    public get temperature(): number {
      return this._temperature;
    }

    public get min_temp(): number {
      return this._range[0];
    }

    public get max_temp(): number {
      return this._range[1];
    }

    public load(manifest: { [key: string]: unknown }): TemperatureControl {
      super.load(manifest);
      const settings = (
        manifest["controls"] as Array<{ [key: string]: unknown }>
      ).filter((control: { [key: string]: unknown }) => {
        return control.type === "temperature";
      })[0];
      this._unit = settings["unit"] as Unit;
      this._range[0] = settings["min"] as number;
      this._range[1] = settings["max"] as number;
      return this;
    }

    public setTemperature(temperature: number) {
      if (temperature < this._range[0] || temperature > this._range[1]) {
        throw new Error(
          `Temperature should fall within [${this._range[0]}, ${this._range[1]}] (${this._unit}).`
        );
      }
      return this._connector.execute({
        deviceId: this._deviceId,
        temperature: temperature,
      });
    }

    public on(temperature: number): TemperatureControl {
      this._temperature = temperature;
      return this;
    }
  };
};
