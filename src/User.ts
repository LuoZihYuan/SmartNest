import crypto from "node:crypto";

export enum UserRole {
  Admin = "Admin",
  Member = "Member",
}

export interface UserInfo {
  readonly userId: string;
  name: string;
  role: UserRole;
}

export class User implements UserInfo {
  readonly userId: string;
  public name: string;
  public role = UserRole.Member;

  constructor(name: string) {
    this.userId = crypto.randomUUID();
    this.name = name;
  }
}
