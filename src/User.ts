import crypto from "node:crypto";

/**
 * Enum representing the roles a user can have.
 */
export enum UserRole {
  Admin = "Admin",
  Member = "Member",
}

/**
 * Interface representing user information.
 */
export interface UserInfo {
  readonly userId: string;
  name: string;
  role: UserRole;
}

/**
 * Class representing a user in the system.
 */
export class User implements UserInfo {
  readonly userId: string;
  public name: string;
  public role = UserRole.Member;

  /**
   * Creates a new User instance.
   * @param {string} name - The name of the user.
   */
  constructor(name: string) {
    this.userId = crypto.randomUUID();
    this.name = name;
  }
}
