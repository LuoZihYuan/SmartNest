export interface ControlProtocol {
  load(manifest: object): ControlProtocol;
  on(...args: unknown[]): ControlProtocol;
}
