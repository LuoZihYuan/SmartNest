import crypto from "crypto";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

/**
 * Enum representing the types of commands that can be sent to a device.
 */
enum CommandType {
  /** Command to retrieve the device manifest. */
  MANIFEST = "MANIFEST",
  /** Command to execute an action on the device. */
  EXECUTE = "EXECUTE",
  /** Command to query information from the device. */
  QUERY = "QUERY",
}

/**
 * Interface representing a command sent to a device.
 */
interface Command {
  commandId: string;
  type: CommandType;
  payload?: object;
}

/**
 * Enum representing the possible statuses of a command result.
 */
enum ResultStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

/**
 * Interface representing the result of a command execution.
 */
interface Result {
  commandId: string;
  status: ResultStatus;
  payload?: { [key: string]: unknown };
}

export class Connector {
  /**
   * Unique identifier for the connector instance.
   * @private
   */
  private _connectorId: string;

  /**
   * The URL of the connector.
   * @private
   */
  private _url: string;

  /**
   * Cached manifest data from the connected device.
   * @private
   */
  private cached_manifest: { [key: string]: unknown } | undefined;

  /**
   * Creates a new Connector instance.
   * @param {string} url - The connection URL for the smart device.
   */
  constructor(url: string) {
    this._connectorId = crypto.randomUUID();
    this._url = url;
  }

  /**
   * Gets the cached manifest data.
   * @returns {{ [key: string]: unknown } | undefined} The cached manifest data, if available.
   */
  public get manifest(): { [key: string]: unknown } | undefined {
    return this.cached_manifest;
  }

  /**
   * Sends a command to the smart device.
   * @protected
   * @param {CommandType} type - The type of command to send.
   * @param {{ [key: string]: unknown }} [payload] - The optional command payload.
   * @returns {Promise<{ [key: string]: unknown } | undefined>} A promise resolving to the command response payload.
   */
  private sendCommand(
    type: CommandType,
    payload?: { [key: string]: unknown }
  ): Promise<{ [key: string]: unknown } | undefined> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const command: Command = {
      commandId: crypto.randomUUID().toUpperCase(),
      type: type,
      payload: payload,
    };
    return readFile(
      path.join(
        dirname(fileURLToPath(import.meta.url)),
        `./response_templates/${type.toLowerCase()}.json`
      ),
      "utf8"
    ).then((str: string) => {
      return (JSON.parse(str) as Result).payload;
    });
  }

  /**
   * Establishes a connection with the smart device and retrieves the manifest.
   * @returns {Promise<Connector>} A promise resolving to the connected `Connector` instance.
   * @throws {Error} If the connection fails.
   */
  public connect(): Promise<Connector> {
    return this.sendCommand(CommandType.MANIFEST)
      .then((payload) => {
        this.cached_manifest = payload;
        return this;
      })
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Executes a command on the smart device.
   * @param {{ [key: string]: unknown }} payload - The payload for the execution command.
   * @returns {Promise<object>} A promise resolving to the execution result.
   */
  public execute(payload: { [key: string]: unknown }): Promise<object> {
    return this.sendCommand(CommandType.EXECUTE, payload).then(
      (payload) => payload as object
    );
  }

  /**
   * Queries the smart device for information.
   * @param {{ [key: string]: unknown }} payload - The payload for the query command.
   * @returns {Promise<object>} A promise resolving to the query result.
   */
  public query(payload: { [key: string]: unknown }): Promise<object> {
    return this.sendCommand(CommandType.QUERY, payload).then(
      (payload) => payload as object
    );
  }
  /**
   * Disconnects from the smart device.
   */
  public disconnect(): Connector {
    return this;
  }
}
