import crypto from "crypto";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

enum CommandType {
  MANIFEST = "MANIFEST",
  EXECUTE = "EXECUTE",
  QUERY = "QUERY",
}

interface Command {
  commandId: string;
  type: CommandType;
  payload?: object;
}

enum ResultStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

interface Result {
  commandId: string;
  status: ResultStatus;
  payload?: { [key: string]: unknown };
}

export class Connector {
  private _url: string;
  protected _connectorId: string;
  protected cached_manifest: { [key: string]: unknown } | undefined;

  constructor(url: string) {
    this._url = url;
    this._connectorId = crypto.randomUUID();
  }

  public get connectorId() {
    return this._connectorId;
  }

  public get manifest(): { [key: string]: unknown } | undefined {
    return this.cached_manifest;
  }

  /**
   * @todo Implement actual connection to smart devices.
   * @param {CommandType} type
   * @param {object} [payload]
   * @returns {Promise<{ [key: string]: unknown } | undefined>}
   */
  protected sendCommand(
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

  public execute(payload: { [key: string]: unknown }): Promise<object> {
    return this.sendCommand(CommandType.EXECUTE, payload).then(
      (payload) => payload as object
    );
  }

  public query(payload: { [key: string]: unknown }): Promise<object> {
    return this.sendCommand(CommandType.QUERY, payload).then(
      (payload) => payload as object
    );
  }

  public disconnect(): void {}
}
