import { Connector } from "../../Connector";
import { ControlProtocol } from "./Control";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => {
  _deviceId: string;
  _connector: Connector;
  load(manifest: { [key: string]: unknown }): unknown;
};

export const ModeControl = <T extends Constructor>(Base: T) => {
  return class ModeControl extends Base implements ControlProtocol {
    private _mode: string | undefined;
    private _available_modes: Array<string> = [];

    public get mode(): string | undefined {
      return this._mode;
    }

    public get available_modes(): Array<string> {
      return this._available_modes;
    }

    public load(manifest: { [key: string]: unknown }): ModeControl {
      super.load(manifest);
      const settings = (
        manifest["controls"] as Array<{ [key: string]: unknown }>
      ).filter((control: { [key: string]: unknown }) => {
        return control.type === "mode";
      })[0];
      this._available_modes = settings["options"] as Array<string>;
      return this;
    }

    public setMode(mode: string): Promise<object> {
      if (!this._available_modes.includes(mode)) {
        throw new Error(`${mode} is not an available mode.`);
      }
      return this._connector.execute({
        deviceId: this._deviceId,
        mode: mode,
      });
    }

    public on(mode: string): ModeControl {
      this._mode = mode;
      return this;
    }
  };
};
