import { Connector } from "../../Connector.js";
import { ControlProtocol } from "./Control.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => {
  _deviceId: string;
  _connector: Connector;
  setup(manifest: { [key: string]: unknown }): unknown;
  update(...args: unknown[]): unknown;
};

/**
 * A mixin that extends a base class to add mode control functionality.
 * @template T - A base class that extends `Constructor`.
 * @param {T} Base - The base class to extend.
 * @returns {T} A new class that extends the base class with mode control capabilities.
 */
export const ModeControl = <T extends Constructor>(Base: T) => {
  return class ModeControl extends Base implements ControlProtocol {
    /**
     * The current mode of the device.
     * @protected
     */
    protected _mode: string | undefined;

    /**
     * List of available modes for the device.
     * @protected
     */
    protected _available_modes: Array<string> = [];

    /**
     * Gets the current mode of the device.
     * @returns {string | undefined} The current mode, or undefined if not set.
     */
    public get mode(): string | undefined {
      return this._mode;
    }

    /**
     * Gets the list of available modes for the device.
     * @returns {Array<string>} An array of available mode names.
     */
    public get available_modes(): Array<string> {
      return this._available_modes;
    }

    /**
     * Initializes the mode control settings from the device manifest.
     * @param {{ [key: string]: unknown }} manifest - The device manifest data.
     * @returns {ModeControl} The updated ModeControl instance.
     */
    public setup(manifest: { [key: string]: unknown }): ModeControl {
      super.setup(manifest);
      const settings = (
        manifest["controls"] as Array<{ [key: string]: unknown }>
      ).filter((control: { [key: string]: unknown }) => {
        return control.type === "mode";
      })[0];
      this._available_modes = settings["options"] as Array<string>;
      return this;
    }

    /**
     * Sets the mode of the device.
     * @param {string} mode - The mode to set.
     * @returns {Promise<object>} A promise resolving to the execution result.
     * @throws {Error} If the provided mode is not available.
     */
    public setMode(mode: string): Promise<object> {
      if (!this._available_modes.includes(mode)) {
        throw new Error(`${mode} is not an available mode.`);
      }
      return this._connector.execute({
        deviceId: this._deviceId,
        mode: mode,
      });
    }

    /**
     * Updates the current mode of the device.
     * @param {string} mode - The new mode to set.
     * @returns {ModeControl} The updated ModeControl instance.
     */
    public update({ mode, ...args }: { mode: string }): ModeControl {
      super.update(args);
      this._mode = mode;
      return this;
    }
  };
};
