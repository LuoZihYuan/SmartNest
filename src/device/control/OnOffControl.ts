import { Connector } from "../../Connector.js";
import { ControlProtocol } from "./Control.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => {
  _deviceId: string;
  _connector: Connector;
  setup(manifest: { [key: string]: unknown }): unknown;
};

/**
 * A mixin that extends a base class to add on/off control functionality.
 * @template T - A base class that extends `Constructor`.
 * @param {T} Base - The base class to extend.
 * @returns {T} A new class that extends the base class with on/off control capabilities.
 */
export const OnOffControl = <T extends Constructor>(Base: T) => {
  return class OnOffControl extends Base implements ControlProtocol {
    /**
     * The current on/off state of the device.
     * @private
     */
    private _on: boolean = true;

    /**
     * Gets the current power state of the device.
     * @returns {boolean} `true` if the device is on, `false` otherwise.
     */
    public get on(): boolean {
      return this._on;
    }

    /**
     * Initializes the on/off control settings from the device manifest.
     * @param {{ [key: string]: unknown }} manifest - The device manifest data.
     * @returns {OnOffControl} The updated OnOffControl instance.
     */
    public setup(manifest: { [key: string]: unknown }): OnOffControl {
      super.setup(manifest);
      return this;
    }

    /**
     * Sets the on/off state of the device.
     * @param {boolean} on - The desired state (`true` for on, `false` for off).
     * @returns {Promise<object>} A promise resolving to the execution result.
     */
    public setOn(on: boolean): Promise<object> {
      return this._connector.execute({
        deviceId: this._deviceId,
        on: on,
      });
    }

    /**
     * Updates the current on/off state of the device.
     * @param {boolean} on - The new on/off state.
     * @returns {ControlProtocol} The updated control protocol instance.
     */
    public update(on: boolean): ControlProtocol {
      this._on = on;
      return this;
    }
  };
};
