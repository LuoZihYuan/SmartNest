/**
 * Interface representing a control protocol for device controls.
 */
export interface ControlProtocol {
  /**
   * Initializes or configures the control protocol using the provided manifest.
   * @param {object} manifest - An object containing configuration settings.
   * @returns {ControlProtocol} The configured control protocol instance.
   */
  setup(manifest: object): ControlProtocol;

  /**
   * Updates the control protocol with the provided arguments.
   * @param {...unknown} args - A list of parameters for updating the control protocol.
   * @returns {ControlProtocol} The updated control protocol instance.
   */
  update(...args: unknown[]): ControlProtocol;
}
