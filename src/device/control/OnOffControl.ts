import { Connector } from "../../Connector";
import { ControlProtocol } from "./Control";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => {
  _deviceId: string;
  _connector: Connector;
  load(manifest: { [key: string]: unknown }): unknown;
};

export const OnOffControl = <T extends Constructor>(Base: T) => {
  return class OnOffControl extends Base implements ControlProtocol {
    private _onoff: boolean = true;

    public get onoff(): boolean {
      return this._onoff;
    }

    public load(manifest: { [key: string]: unknown }): OnOffControl {
      super.load(manifest);
      return this;
    }

    public setOnOff(onoff: boolean): Promise<object> {
      return this._connector.execute({
        deviceId: this._deviceId,
        onoff: onoff,
      });
    }

    public on(onoff: boolean): ControlProtocol {
      this._onoff = onoff;
      return this;
    }
  };
};
