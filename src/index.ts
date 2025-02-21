#!/usr/bin/env node
import { Command } from "commander";
import { Dashboard } from "./dashboard/Dashboard.js";
import { User, UserRole } from "./User.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const program = new Command();

// Files to persist user and device data (stored in the user's home directory)
const USER_STORE_FILE = path.join(os.homedir(), ".smartnest-user.json");
const DEVICES_STORE_FILE = path.join(os.homedir(), ".smartnest-devices.json");

/**
 * Stored device data interface.
 * We only store the URL used to add the device.
 */
interface StoredDevice {
  url: string;
}

/**
 * Loads the stored user data from disk.
 * @returns {object | undefined} The stored user data, or undefined if not found.
 */
function loadStoredUserData(): { name: string; role: UserRole } | undefined {
  if (fs.existsSync(USER_STORE_FILE)) {
    try {
      const data = fs.readFileSync(USER_STORE_FILE, "utf8");
      return JSON.parse(data) as { name: string; role: UserRole };
    } catch (error) {
      console.error("Failed to load stored user data:", error);
    }
  }
  return undefined;
}

/**
 * Saves the given user data to persistent storage.
 * @param {User} user - The user to save.
 */
function saveUserData(user: User): void {
  const userData = {
    name: user.name,
    role: user.role,
  };
  try {
    fs.writeFileSync(USER_STORE_FILE, JSON.stringify(userData), "utf8");
  } catch (error) {
    console.error("Failed to save current user:", error);
  }
}

/**
 * Loads stored devices from disk.
 * @returns {StoredDevice[]} An array of stored devices.
 */
function loadStoredDevices(): StoredDevice[] {
  if (fs.existsSync(DEVICES_STORE_FILE)) {
    try {
      const data = fs.readFileSync(DEVICES_STORE_FILE, "utf8");
      return JSON.parse(data) as StoredDevice[];
    } catch (error) {
      console.error("Failed to load stored devices:", error);
    }
  }
  return [];
}

/**
 * Saves the given devices array to persistent storage.
 * @param {StoredDevice[]} devices - Array of stored device data.
 */
function saveStoredDevices(devices: StoredDevice[]): void {
  try {
    fs.writeFileSync(DEVICES_STORE_FILE, JSON.stringify(devices), "utf8");
  } catch (error) {
    console.error("Failed to save stored devices:", error);
  }
}

// Instantiate the Dashboard singleton.
const dashboard = new Dashboard();

// Global variable for the current user.
let currentUser: User | undefined;

// Global array for stored devices.
let storedDevices: StoredDevice[] = loadStoredDevices();

/**
 * Rehydrate the current user from storage using UserManager's API.
 */
const storedUserData = loadStoredUserData();
if (storedUserData) {
  // If no user exists in the user manager, register using the stored name.
  if (dashboard.user_manager.user_infos.length === 0) {
    currentUser = dashboard.user_manager.registerUser(storedUserData.name);
    currentUser.role = storedUserData.role;
    saveUserData(currentUser);
  } else {
    // Otherwise, try to find the user by name.
    currentUser = dashboard.user_manager.user_infos.find(
      (u) => u.name === storedUserData.name
    );
    if (!currentUser) {
      currentUser = dashboard.user_manager.registerUser(storedUserData.name);
      currentUser.role = storedUserData.role;
      saveUserData(currentUser);
    }
  }
}

/**
 * Re-add stored devices by using the DeviceManager's public API.
 * We only store the URL, so we re-add each device by its URL.
 */
async function rehydrateDevices(): Promise<void> {
  if (!currentUser || currentUser.role !== UserRole.Admin) {
    // Only an admin can add devices.
    return;
  }
  // If no devices are in memory, re-add stored devices.
  if (
    dashboard.device_manager.devices.length === 0 &&
    storedDevices.length > 0
  ) {
    for (const sd of storedDevices) {
      try {
        await dashboard.device_manager.addDevice(currentUser, sd.url);
      } catch (error) {
        console.error(`Error re-adding device with URL ${sd.url}:`, error);
      }
    }
  }
}

// Set the CLI command name to "smartnest"
program
  .name("smartnest")
  .version("1.0.0")
  .description("Smart Device CLI for SmartNest");

/**
 * Command: register-user
 * Registers a new user and sets it as the current user (persisting it).
 */
program
  .command("register-user <name>")
  .description("Register a new user and set as the current user")
  .action((name: string) => {
    try {
      currentUser = dashboard.user_manager.registerUser(name);
      saveUserData(currentUser);
      console.log(
        `User registered: ${currentUser.userId} (${currentUser.name}) with role ${currentUser.role}`
      );
    } catch (error) {
      console.error("Error registering user:", error);
    }
  });

/**
 * Command: current-user
 * Displays the current stored user.
 */
program
  .command("current-user")
  .description("Display the current stored user")
  .action(() => {
    if (!currentUser) {
      console.log("No current user. Please register a user.");
    } else {
      console.log(
        `Current user: ${currentUser.userId} (${currentUser.name}) with role ${currentUser.role}`
      );
    }
  });

/**
 * Command: list-users
 * Lists all registered users.
 */
program
  .command("list-users")
  .description("List all registered users")
  .action(() => {
    const users = dashboard.user_manager.user_infos;
    if (users.length === 0) {
      console.log("No users registered.");
    } else {
      users.forEach((user) => {
        console.log(
          `ID: ${user.userId}, Name: ${user.name}, Role: ${user.role}`
        );
      });
    }
  });

/**
 * Command: update-user
 * Updates a user's role (admin only). Uses the stored current user as the acting admin.
 */
program
  .command("update-user <targetUserId> <newRole>")
  .description("Update a user's role (admin only)")
  .action((targetUserId: string, newRole: string) => {
    if (!currentUser) {
      console.error("No current user. Please register a user.");
      process.exit(1);
    }
    if (currentUser.role !== UserRole.Admin) {
      console.error("Current user is not admin.");
      process.exit(1);
    }
    try {
      dashboard.user_manager.updateUser(
        currentUser,
        targetUserId,
        newRole as UserRole
      );
      console.log(`User ${targetUserId} updated to role ${newRole}`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  });

/**
 * Command: add-device
 * Adds a new device using the provided URL (admin only). Uses the stored current user.
 */
program
  .command("add-device <url>")
  .description("Add a new device (admin only)")
  .action(async (url: string) => {
    if (!currentUser) {
      console.error("No current user. Please register a user.");
      process.exit(1);
    }
    if (currentUser.role !== UserRole.Admin) {
      console.error("Current user is not admin.");
      process.exit(1);
    }
    try {
      await dashboard.device_manager.addDevice(currentUser, url);
      // Store only the URL.
      storedDevices.push({ url });
      saveStoredDevices(storedDevices);
      console.log(`Device added from URL: ${url}`);
    } catch (error) {
      console.error("Error adding device:", error);
    }
  });

/**
 * Command: delete-device
 * Deletes a device by its ID (admin only). Uses the stored current user.
 */
program
  .command("delete-device <deviceId>")
  .description("Delete a device (admin only)")
  .action((deviceId: string) => {
    if (!currentUser) {
      console.error("No current user. Please register a user.");
      process.exit(1);
    }
    if (currentUser.role !== UserRole.Admin) {
      console.error("Current user is not admin.");
      process.exit(1);
    }
    try {
      dashboard.device_manager.deleteDevice(currentUser, deviceId);
      // For simplicity, remove all stored devices.
      storedDevices = [];
      saveStoredDevices(storedDevices);
      console.log(`Device ${deviceId} deleted`);
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  });

/**
 * Command: list-devices
 * Lists all registered devices.
 */
program
  .command("list-devices")
  .description("List all registered devices")
  .action(() => {
    const devices = dashboard.device_manager.devices;
    if (devices.length === 0) {
      console.log("No devices registered.");
    } else {
      devices.forEach((device, index) => {
        console.log(
          `${index + 1}. Device ID: ${device.deviceId}, Nickname: ${device.nickname}`
        );
      });
    }
  });

/**
 * Command: set-temperature
 * Sets the temperature of a thermometer device (admin only).
 */
program
  .command("set-temperature <deviceId> <temperature>")
  .description("Set the temperature of a thermometer device (admin only)")
  .action(async (deviceId: string, temperature: string) => {
    if (!currentUser) {
      console.error("No current user. Please register a user.");
      process.exit(1);
    }
    if (currentUser.role !== UserRole.Admin) {
      console.error("Current user is not admin.");
      process.exit(1);
    }
    // Find the device by deviceId.
    const device = dashboard.device_manager.devices.find(
      (d) => d.deviceId === deviceId
    );
    if (!device) {
      console.error("Device not found.");
      process.exit(1);
    }
    // Convert the temperature to a number.
    const temp = parseFloat(temperature);
    try {
      // Assume the device has a setTemperature method (provided by TemperatureControl).
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await (device as any).setTemperature(temp);
      console.log(`Temperature set to ${temp}.`);
    } catch (error) {
      console.error("Error setting temperature:", error);
    }
  });

/**
 * Command: get-temperature
 * Retrieves the current temperature of a thermometer device.
 */
program
  .command("get-temperature <deviceId>")
  .description("Get the current temperature of a thermometer device")
  .action((deviceId: string) => {
    // Find the device by deviceId.
    const device = dashboard.device_manager.devices.find(
      (d) => d.deviceId === deviceId
    );
    if (!device) {
      console.error("Device not found.");
      process.exit(1);
    }
    // Assume the device has a temperature getter (provided by TemperatureControl).
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    const currentTemp = (device as any).temperature;
    console.log(`Current temperature of device ${deviceId}: ${currentTemp}`);
  });

// Wrap CLI parsing in an async IIFE to allow rehydration.
await (async () => {
  // Rehydrate devices by re-adding them via the public API.
  await rehydrateDevices();
  program.parse(process.argv);
})();
