export interface ControlProtocol {
  setup(manifest: object): ControlProtocol;
  update(...args: unknown[]): ControlProtocol;
}
