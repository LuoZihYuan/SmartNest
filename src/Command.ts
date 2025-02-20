export enum CommandType {
  MANIFEST = "MANIFEST",
  EXECUTE = "EXECUTE",
  QUERY = "QUERY",
}

export interface Command {
  type: CommandType;
  commandId: string;
  payload?: object;
}
