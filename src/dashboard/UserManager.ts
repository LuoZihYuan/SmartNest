import { User, UserInfo, UserRole } from "../User";

export class UserManager {
  private static _instance: UserManager;
  private users: Array<User> = [];

  private constructor() {}

  public registerUser(name: string): User {
    const new_user = new User(name);
    if (this.users.length === 0) {
      new_user.role = UserRole.Admin;
    }
    this.users.push(new_user);
    return new_user;
  }

  public static get instance(): UserManager {
    this._instance = this._instance || new UserManager();
    return this._instance;
  }

  public get user_infos(): Array<UserInfo> {
    return this.users.map((user: User): UserInfo => {
      return { userId: user.userId, name: user.name, role: user.role };
    });
  }

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
