import { Connector } from "../../Connector";
import { ControlProtocol } from "./Control";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => {
  _deviceId: string;
  _connector: Connector;
  setup(manifest: { [key: string]: unknown }): unknown;
};

export const OnOffControl = <T extends Constructor>(Base: T) => {
  return class OnOffControl extends Base implements ControlProtocol {
    private _on: boolean = true;

    public get on(): boolean {
      return this._on;
    }

    public setup(manifest: { [key: string]: unknown }): OnOffControl {
      super.setup(manifest);
      return this;
    }

    public setOn(on: boolean): Promise<object> {
      return this._connector.execute({
        deviceId: this._deviceId,
        on: on,
      });
    }

    public update(on: boolean): ControlProtocol {
      this._on = on;
      return this;
    }
  };
};
