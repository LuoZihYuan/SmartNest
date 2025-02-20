import { Connector } from "../../Connector";
import { ControlProtocol } from "./Control";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => {
  _deviceId: string;
  _connector: Connector;
  setup(manifest: { [key: string]: unknown }): unknown;
};

type Unit = "Celsius" | "Ferenheit" | "Kelvin";

/**
 * A mixin that extends a base class to add temperature control functionality.
 * @template T - A base class that extends `Constructor`.
 * @param {T} Base - The base class to extend.
 * @returns {T} A new class that extends the base class with temperature control capabilities.
 */
export const TemperatureControl = <T extends Constructor>(Base: T) => {
  return class TemperatureControl extends Base implements ControlProtocol {
    /**
     * The current temperature setting of the device.
     * @private
     */
    private _temperature: number = 0;

    /**
     * The valid temperature range [min, max].
     * @private
     */
    private _range: Array<number> = [0, 0];

    /**
     * The unit of measurement for temperature.
     * @private
     */
    private _unit: Unit = "Celsius";

    /**
     * Gets the current temperature of the device.
     * @returns {number} The current temperature.
     */
    public get temperature(): number {
      return this._temperature;
    }

    /**
     * Gets the minimum allowable temperature.
     * @returns {number} The minimum temperature.
     */
    public get min_temp(): number {
      return this._range[0];
    }

    /**
     * Gets the maximum allowable temperature.
     * @returns {number} The maximum temperature.
     */
    public get max_temp(): number {
      return this._range[1];
    }

    /**
     * Initializes the temperature control settings from the device manifest.
     * @param {{ [key: string]: unknown }} manifest - The device manifest data.
     * @returns {TemperatureControl} The updated TemperatureControl instance.
     */
    public setup(manifest: { [key: string]: unknown }): TemperatureControl {
      super.setup(manifest);
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

    /**
     * Sets the temperature of the device.
     * @param {number} temperature - The desired temperature value.
     * @throws {Error} If the temperature is outside the allowable range.
     * @returns {Promise<object>} A promise resolving to the execution result.
     */
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

    /**
     * Updates the current temperature setting of the device.
     * @param {number} temperature - The new temperature value.
     * @returns {TemperatureControl} The updated TemperatureControl instance.
     */
    public update(temperature: number): TemperatureControl {
      this._temperature = temperature;
      return this;
    }
  };
};
