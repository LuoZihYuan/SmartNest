import { User, UserInfo, UserRole } from "../User.js";

export class UserManager {
  /**
   * Singleton instance of UserManager.
   * @private
   */
  private static _instance: UserManager;

  /**
   * List of registered users.
   * @private
   */
  private users: Array<User> = [];

  /**
   * Private constructor to enforce singleton pattern.
   * @private
   */
  private constructor() {}

  /**
   * Gets the singleton instance of UserManager.
   * @returns {UserManager} The singleton instance.
   */
  public static get instance(): UserManager {
    this._instance = this._instance || new UserManager();
    return this._instance;
  }

  /**
   * Retrieves user information for all registered users.
   * @returns {Array<UserInfo>} An array containing user information.
   */
  public get user_infos(): Array<UserInfo> {
    return this.users.map((user: User): UserInfo => {
      return { userId: user.userId, name: user.name, role: user.role };
    });
  }

  /**
   * Registers a new user.
   * The first registered user is assigned the Admin role.
   * @param {string} name - The name of the user to register.
   * @returns {User} The newly registered user.
   */
  public registerUser(name: string): User {
    const new_user = new User(name);
    if (this.users.length === 0) {
      new_user.role = UserRole.Admin;
    }
    this.users.push(new_user);
    return new_user;
  }

  /**
   * Updates the role of a specified user.
   * Only an admin can perform this action.
   * @param {User} by - The user attempting to update another user's role.
   * @param {string} target_userId - The ID of the user whose role is being updated.
   * @param {UserRole} role - The new role to assign to the user.
   * @returns {UserManager} The updated UserManager instance.
   * @throws {TypeError} If the acting user is not an admin.
   */
  public updateUser(
    by: User,
    target_userId: string,
    role: UserRole
  ): UserManager {
    if (by.role !== UserRole.Admin) {
      throw TypeError(`${by.name} is not admin. Cannot update user role.`);
    }
    const target_user = this.users.filter(
      (user: User) => user.userId === target_userId
    )[0];
    target_user.role = role;
    return this;
  }

  /**
   * Deletes a specified user from the system.
   * Only an admin can perform this action.
   * @param {User} by - The user attempting to delete another user.
   * @param {string} target_userId - The ID of the user to delete.
   * @returns {UserManager} The updated UserManager instance.
   * @throws {TypeError} If the acting user is not an admin.
   */
  public deleteUser(by: User, target_userId: string): UserManager {
    if (by.role !== UserRole.Admin) {
      throw TypeError(`${by.name} is not admin. Cannot delete user.`);
    }
    this.users = this.users.filter(
      (user: User) => user.userId !== target_userId
    );
    return this;
  }
}
