> [!IMPORTANT]
> This is a simulation of a smart home management system, demonstrating the OOP concepts learned.

# SmartNest

SmartNest brings all of your compatible smart devices to the tip of your fingers. Automate your tasks and routines, while monitoring and controlling your smart home from anywhere, anytime.

## Usage

### Prerequsites

1. Have `pnpm` installed. Follow the [official documents](https://pnpm.io/installation) if you have not.

### Installation

In your command line:

1. Clone the repository to your machine, and `cd` into it.
2. Execute `pnpm install`
3. Execute `pnpm run build; pnpm run start; npm link;`

### Test it out

In your command line:

1. `smartnest register-user Diya`
2. `smartnest list-users`
3. `smartnest add-device "www.sample.com"`
4. `smartnest list-devices`
5. `smartnest set-temperature 123 64`
6. `smartnest get-temperature 123`

> [!NOTE]
>
> - Execute `smartnest -h` for help
> - Use `sn` as abbreviation alias for `smartnest`

## Video Demonstration

Watch on [YouTube](https://youtu.be/krr0F3sV-pU)

## Business Requirements

### Functional (with highlighted nouns and verbs)

- <ins><n>User</n>s</ins><sup>(N.)</sup> should be able to <ins><v>add</v></ins><sup>(V.)</sup> their smart <ins><n>device</n>s</ins><sup>(N.)</sup> to the <ins><n>dashboard</n>'s</ins><sup>(N.)</sup> <ins><n>device manager</n></ins><sup>(N.)</sup>.

- After <ins><v>add</v>ing</ins><sup>(V.)</sup> <ins><n>device</n>s</ins><sup>(N.)</sup>, <ins><n>user</n></ins><sup>(N.)</sup> can <ins><v>send</v></ins><sup>(V.)</sup> <ins><n>command</n>s</ins><sup>(N.)</sup> to them.

- The <ins><n>dashboard</n></ins><sup>(N.)</sup> <ins><v>monitor</v>s</ins><sup>(V.)</sup> all <ins><n>status</n></ins><sup>(N.)</sup> of the <ins><n>device</n>s</ins><sup>(N.)</sup>.

<!-- - <ins><n>User</n>s</ins><sup>(N.)</sup> can <ins><v>create</v></ins><sup>(V.)</sup> automation <ins><n>rule</n>s</ins><sup>(N.)</sup> that gets <ins><v>activate</v>d</ins><sup>(V.)</sup> when certain <ins><n>condition</n>s</ins><sup>(N.)</sup> have been <ins><v>met</v></ins><sup>(V.)</sup>. -->

- The first <ins><n>user</n></ins><sup>(N.)</sup> <ins><v>register</v>ed</ins><sup>(V.)</sup> in the <ins><n>user manager</n></ins><sup>(N.)</sup> will be <ins><v>give</v>n</ins><sup>(V.)</sup>the <ins><n>admin role</n></ins><sup>(N.)</sup>. Other <ins><n>user</n>s</ins><sup>(N.)</sup> will be <ins><v>give</v>n</ins><sup>(V.)</sup> the <ins><n>member role</n></ins><sup>(N.)</sup> by default.

- <ins><n>Admin</n>s</ins><sup>(N.)</sup> are able to <ins><v>update</v></ins><sup>(V.)</sup> the <ins><n>user role</n></ins><sup>(N.)</sup> and <ins><v>delete</v></ins><sup>(V.)</sup> <ins><n>users</n></ins><sup>(N.)</sup>.

> [!NOTE]
>
> - <ins><n>Noun</n>s</ins><sup>(N.)</sup> are highlighted in green. <ins><v>Verb</v>s</ins><sup>(V.)</sup> are highlighted in red.

<style>
v { background-color: DarkRed }
n { background-color: DarkGreen }
</style>

### Non-functional (rules)

- Automation rules should be feasable: does not conflict with one another, execution time not set to the past, ..., etc.
- Commands should not violate the devices' limits.

## Q&A (Challenges)

- Can the curtain automatically open 20% in the morning to wake me up?
- Can the coffee maker pour me a cup of coffee as soon as I sit down to have my breakfast?
- Will I be notified if there's any anomaly with my device?
- Can I control a group of devices all at once?

## Classify Nouns/Verbs into Classes/Attributes

1. Dashboard

   - Attributes: user_manager, device_manager
   - Methods:

2. UserManager

   - Attributes: users
   - Methods: registerUser, updateUser, deleteUser

3. DeviceManager

   - Attributes: devices
   - Methods: addDevice, monitorDevice, deleteDevice

4. User

   - Attributes: userId, name, role
   - Methods:

5. Device

   - Attributes: deviceId, status, deviceInfo
   - Methods: setTemperature

6. Command
   - Attributes: commandId, commandType, payload

## Target Audiences

1. Homeowner: Cares about energy savings. Hopes to turn off unused electronic devices to save on bills.
2. Shopkeeper: Ensures the normal operation of business. In desperate need to monitor the health of electronics and replace malfunction ones immediately to improve customer satisfaction.
3. Property Manager: Takes property security seriously. Wishes to identify any potential risks in real-time without traveling across vast distances. Have a need to provide evidence whenever anything bad happens.

## User Personas and User Stories

|  Model  | Version | Prompt                                                                                                                                                                | Attachment                    |
| :-----: | :-----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| ChatGPT |   4o    | Create 2 user personas based on the attached document. Define their details, provide their name, back stories, scenarios, reasons to use the app, and 3 user stories. | Above contents in PDF format. |

### Alice Chang (Homeowner)

- Age: 32
- Occupation: Software Engineer
- Location: Urban apartment in a bustling city
- Back Story:

  Alice is a tech-savvy professional who loves staying up-to-date with the latest smart home technology. She lives in a modern, well-equipped apartment where she’s integrated several smart devices such as lights, a thermostat, security cameras, and sensors. With a busy work schedule and frequent travel for conferences, Alice values convenience, energy efficiency, and a secure home environment.

- Scenario:

  Every morning, before leaving for work, Alice checks her smart home dashboard to ensure that everything is functioning correctly—whether it's adjusting the temperature, ensuring all lights are off, or confirming that the security system is active. While at work or traveling, she relies on real-time notifications to stay informed about her home’s status.

- Reasons to Use the App:

  - Centralized Control: To monitor and control all her smart devices from one unified interface.
  - Automation & Scheduling: To set up routines (like adjusting the thermostat or switching lights on/off) without manual intervention.
  - Enhanced Security: To receive immediate alerts for any unusual activities, ensuring her home stays secure even when she’s away.

- User Stories:

  1. _"As a homeowner, I want to view the real-time status of all my connected devices on a single, intuitive dashboard so that I can quickly check and control my home from anywhere."_

  2. _"As a homeowner, I want to create and schedule automation rules (like turning on lights at dusk and adjusting the thermostat at bedtime) so that my home operates efficiently and comfortably without my constant attention."_

  3. _"As a homeowner, I want to receive immediate alerts when any device (e.g., a motion sensor) detects unusual activity so that I can take prompt action to secure my home."_

### Michael Reynolds (Property Manager)

- Age: 45
- Occupation: Property Manager
- Location: Oversees multiple residential and commercial properties

- Back Story:

  Michael has over 15 years of experience managing a diverse portfolio of rental apartments and small office buildings. Although not as immersed in personal tech as Alice, Michael understands the importance of efficiency and streamlined operations. His primary focus is on maintaining high standards for security, energy efficiency, and tenant satisfaction. Michael seeks a solution that allows him to oversee and manage smart home systems across multiple properties with ease.

- Scenario:

  At the start of each day, Michael logs into a centralized dashboard that aggregates data from all properties under his management. He monitors real-time alerts and analytics to quickly identify any issues such as device malfunctions or security breaches. Throughout the day, he executes batch operations—for instance, turning off all lights after business hours—and reviews energy consumption reports to plan maintenance and improvements.

- Reasons to Use the App:

  - Centralized Management: To monitor and control devices across multiple properties from one interface.
  - Efficiency Through Batch Operations: To perform group commands (e.g., turning off lights, adjusting thermostats) on multiple devices at once, saving time and reducing effort.
  - Consolidated Alerts & Analytics: To quickly identify issues and optimize energy usage across all properties, ensuring both security and operational efficiency.

- User Stories:

  1. _"As a property manager, I want to monitor the status of smart devices across all my properties from a unified dashboard so that I can efficiently identify and address any issues."_

  2. _"As a property manager, I want to group devices by property or room and execute batch operations (such as switching off all lights at closing time) so that I can manage multiple devices quickly and effectively."_

  3. _"As a property manager, I want to receive aggregated alerts and performance analytics for each property so that I can prioritize maintenance tasks and ensure consistent operation across all sites."_

## [UML Class Diagram](https://lucid.app/lucidchart/c22237bc-5dc3-4911-8c21-e1ddb36bae19/edit?viewport_loc=3525%2C-1469%2C4701%2C2318%2C0_0&invitationId=inv_14476330-52d1-4642-8ac9-ff2464069593)

![uml](./assets/images/uml.png)

> [!NOTE]
>
> My implementation of different devices is not a straight forward one. However, when you think about it, you will soon notice the elegance behind it. The idea comes from a vision that any smart device manufacturers could easly configure their devices with a single json file, then SmartNest would be able to control it. Say we are adding a smart lamp device. The typical way is to hard code a lamp class, but we soon notice the original design does not support color control, so we modify for that. If another lamp wants mode control over dark/light mode, we have to modify that again. Notice how fast the class could bloat up, and how unnecessary it would be for a simple on/off lamp? My design, on the other hand, solves all these problems. **The Device class will dynamically extend different Control classes based on the configuration json file**, so that none of the unused properties will exist. This is done using javascript **Mixins**.

## [Low Fidelity Wireframe](https://www.figma.com/design/q1G7NpbpJOM6q0C55qGfja/NEU_CS5010_Programming-Design-Paradigm?node-id=27-81&t=d2F06mFlQLZRtcbD-4)

### Monitor

- _"As a property manager, I want to monitor the status of smart devices across all my properties from a unified dashboard so that I can efficiently identify and address any issues."_
- _"As a homeowner, I want to view the real-time status of all my connected devices on a single, intuitive dashboard so that I can quickly check and control my home from anywhere."_
  ![device](./assets/images/wireframe_device.png)

### Automation

- _"As a homeowner, I want to create and schedule automation rules (like turning on lights at dusk and adjusting the thermostat at bedtime) so that my home operates efficiently and comfortably without my constant attention."_
  ![automation](./assets/images/wireframe_rule.png)

## Documentation

|  Model  | Version | Prompt                                                                                                              | Attachment                      |
| :-----: | :-----: | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| ChatGPT |   4o    | Generate JSDoc when I provide my code to you. Do not quote the entire code I provided, only include the signatures. | All the codes that I've written |

[Document Webpage](./docs/index.html)
(Download and view it in your browser.)

## Applications of Programming Paradigms

### OOP Pillars

#### Abstraction

- Good Example: Abstracts the details that others don't have to know.

  ```typescript
  export class Connector {
    private _url: string;
    constructor(url: string) {
      this._url = url;
    }
    public connect(): Connector {
      console.log(`Connecting to ${this._url}`);
      return this;
    }
  }
  ```

- Bad Example: Expose unnecessary details to others.

  ```typescript
  export class Connector {
    private _url: string;
    constructor(url: string) {
      this._url = url;
    }
    public connect(): Connector {
      console.log(`Opening TCP socket at ${this.url}`);
      console.log("Sending authentication request...");
      console.log("Waiting for response...");
      console.log("Connected.");
    }
  }
  ```

#### Encapsulation

- Good Example: Access of deviceId and connector is controled.

  ```typescript
  export class Device {
    private _deviceId: string;
    private _connector: Connector;

    constructor(conn: Connector) {
      this._connector = conn;
      this._deviceId = crypto.randomUUID();
    }

    public get deviceId(): string {
      return this._deviceId;
    }

    public connect(): void {
      this._connector.connect();
    }
  }
  ```

- Bad Example: deviceId and connector can be directly modified in spite of security.

  ```typescript
  export class Device {
    public deviceId: string;
    public connector: Connector;
    constructor(conn: Connector) {
      this._connector = conn;
      this._deviceId = crypto.randomUUID();
    }
  }
  ```

#### Inheritance

- Good Example: TemperatureControl devices have all the properties defined in the Device class.

  ```typescript
  class Device {
    private _deviceId: string | undefined;
    private _info: DeviceInfo | undefined;
    private _connector: Connector;
    public nickname: string = "";
    public get deviceId(): string | undefined {}
    public get info(): DeviceInfo | undefined {}
    public setup(manifest: { [key: string]: unknown }): Device {}
  }

  class TemperatureControl extends Device implements ControlProtocol {
    private _temperature: number;
    private _range: Array<number> = [0, 0];
    private _unit: Unit = "Celsius";
    public get temperature(): number {}
    public get min_temp(): number {}
    public get max_temp(): number {}
    public setTemperature(temperature: number) {}
  }
  ```

- Bad Example: Define a new class directly instead of inheriting another parent class. This causes code duplication.

  ```typescript
  class Device {
    private _deviceId: string | undefined;
    private _info: DeviceInfo | undefined;
    private _connector: Connector;
    public nickname: string = "";
    public get deviceId(): string | undefined {}
    public get info(): DeviceInfo | undefined {}
    public setup(manifest: { [key: string]: unknown }): Device {}
  }

  class Thermometer {
    private _deviceId: string | undefined;
    private _info: DeviceInfo | undefined;
    private _connector: Connector;
    private _temperature: number;
    private _range: Array<number> = [0, 0];
    private _unit: Unit = "Celsius";
    public nickname: string = "";
    public get deviceId(): string | undefined {}
    public get info(): DeviceInfo | undefined {}
    public get temperature(): number {}
    public get min_temp(): number {}
    public get max_temp(): number {}
    public setTemperature(temperature: number) {}
    public setup(manifest: { [key: string]: unknown }): Device {}
  }
  ```

#### Polymorphism

- Good Example: Functions that utilize Device's setup method can also utilize ModeControl device's setup method interchangably without breaking the function.

  ```typescript
  class Device {
    public setup(manifest: { [key: string]: unknown }): Device {
      this._info = manifest["info"] as DeviceInfo;
      this._deviceId = manifest["deviceId"] as string;
      return this;
    }
  }

  class ModeControl extends Device {
    public setup(manifest: { [key: string]: unknown }): ModeControl {
      super.setup(manifest);
      const settings = (
        manifest["controls"] as Array<{ [key: string]: unknown }>
      ).filter((control: { [key: string]: unknown }) => {
        return control.type === "mode";
      })[0];
      this._available_modes = settings["options"] as Array<string>;
      return this;
    }
  }
  ```

- Bad Example: ModeControl's setup method signature is different from its parent class, thus, a function that executes Device's setup method can not be executed on ModeControl.

  ```typescript
  class Device {
    public setup(manifest: { [key: string]: unknown }): Device {
      this._info = manifest["info"] as DeviceInfo;
      this._deviceId = manifest["deviceId"] as string;
      return this;
    }
  }

  class ModeControl extends Device {
    public setup(): ModeControl {
      throw new Error("Use another method.");
    }
  }
  ```

### SOLID Principles

#### Single Responsibility Principle

- Good Example: `UserManager` and `DeviceManager` are eeach responsible for managing users and devices.

  ```typescript
  export class UserManager {
    public registerUser(name: string): User {}
    public updateUser(
      by: User,
      target_userId: string,
      role: UserRole
    ): UserManager {}
    public deleteUser(by: User, target_userId: string): UserManager {}
  }
  export class DeviceManager {
    public async addDevice(user: User, url: string): Promise<DeviceManager> {}
    public deleteDevice(user: User, deviceId: string): DeviceManager {}
  }
  ```

- Bad Example:
  ```typescript
  export class BadManager {
    public registerUser(name: string): BadManager {}
    public async addDevice(user: User, url: string): Promise<BadManager> {}
  }
  ```

#### Open-Closed Principle

- Good Example: ModeControl is open for extension. All devices that have mode control can extend this class.

  ```typescript
  export const ModeControl = <T extends Constructor>(Base: T) => {
    return class ModeControl extends Base implements ControlProtocol {
      private _mode: string | undefined;
      private _available_modes: Array<string> = [];
      public get mode(): string | undefined {}
      public get available_modes(): Array<string> {}
      public setMode(mode: string): Promise<object> {}
    };
  };
  ```

- Bad Example: If a bad device hard codes all controls into class definition, it is not open for extension. Say we have a new HumidityDevice, we will have to modify bad this device.

  ```typescript
  export class BadDevice {
    private temperature: number = 0;
    private mode: string;
    public setTemperature(temp: number): BadDevice {}
    public setMode(mode: string): BadDevice {}
  }
  ```

#### Liskov Substitution Principle

- Good Example:

  ```typescript
  export class Device {
    private _info: DeviceInfo | undefined;
    public get info(): DeviceInfo | undefined {}
    public setup(manifest: { [key: string]: unknown }): Device {
      this._info = manifest["info"] as DeviceInfo;
      return this;
    }
  }
  export class TemperatureControl extends Device {
    public setup(manifest: { [key: string]: unknown }): TemperatureControl {
      super.setup(manifest); // Focus on this line
      return this;
    }
  }
  ```

  ```typescript
  const device: Device = new TemperatureControl();
  device.setup(manifest);
  console.log(device.info);
  ```

- Bad Example: In this example, TemperatureControl's setup method does not call its parent's setup method, thus calling info returns undefined.

  ```typescript
  export class Device {
    private _info: DeviceInfo | undefined;
    public get info(): DeviceInfo | undefined {}
    public setup(manifest: { [key: string]: unknown }): Device {
      this._info = manifest["info"] as DeviceInfo;
      return this;
    }
  }
  export class TemperatureControl extends Device {
    public setup(manifest: { [key: string]: unknown }): TemperatureControl {
      // Does not call super.setup(manifest);
      return this;
    }
  }
  ```

  ```typescript
  const device: Device = new TemperatureControl();
  device.setup(manifest);
  console.log(device.info); // this is undefined
  ```

#### Interface Segregation Principle

- Good Example: All control classes implement all the methods defined in the protocol.

  ```typescript
  export interface ControlProtocol {
    setup(manifest: object): ControlProtocol;
    update(...args: unknown[]): ControlProtocol;
  }
  ```

  ```typescript
  export class TemperatureControl implements ControlProtocol {
    private temperature: number = 0;
    public setup(manifest: object): TemperatureControl {}
    public update(temperature: number): TemperatureControl {}
  }
  ```

- Bad Example: Not all devices need the methods defined in BadControlProtocol

  ```typescript
  export interface BadControlProtocol {
    setTemperature(temp: number): BadControlProtocol;
    setHumidity(humidity: number): BadControlProtocol;
    setFanSpeed(speed: number): BadControlProtocol;
  }
  ```

#### Dependency Inversion Principle

- Good Example: Device relies on Connector abstractions instead of concrete implementations.

  ```typescript
  export class Device {
    protected _connector: Connector;

    constructor(conn: Connector) {
      this._connector = conn;
    }

    public connect(): Device {
      this._connector.connect();
    }
  }
  ```

- Bad Example: BadDevice is tightly coupled to BluetoothConnector. If there's another WifiConnector, the class needs to be adjusted.

  ```typescript
  export class BadDevice {
    private connection: BluetoothConnector = new BluetoothConnector();

    public connect(): BadDevice {
      this.connection.connect();
    }
  }
  ```

### Design Patterns

#### Singleton

- Good Example: This example demonstrates that only one instance of a `DeviceManager` exists, and fits the need of a central device manager.
  ```typescript
  export class DeviceManager {
    private static _instance: DeviceManager;
    private constructor() {}
    public static get instance(): DeviceManager {
      this._instance = this._instance || new DeviceManager();
      return this._instance;
    }
  }
  ```
  ```typescript
  const device_manager = DeviceManager.instance;
  ```
- Bad Example: A device is managed by one of the two managers. When you try to find which manager it's added to, you have to look through all managers.

  ```typescript
  export class BadDeviceManager {
    public constructor() {}
  }
  ```

  ```typescript
  const manager_1 = new BadDeviceManager();
  const manager_2 = new BadDeviceManager();
  manager_1.addDevice(new Device());
  manager_2.devices.length; // 0, cuz Device is added to another manager.
  ```

#### Factory

- Good Example: Leave class selection and initialization to the DeviceFactory class. No need to imperatively map each device manifest to corresponding device subclass.
  ```typescript
  export class DeviceFactory {
    public async createDevice(conn: Connector): Promise<Device> {
      await conn.connect();
      const manifest = conn.manifest;
      // Generates different classes of new_device based on
      // the manifest file retrieved. Users do not have to
      // manually decide which class to initiate.
      return new_device.setup(conn.manifest);
    }
  }
  ```
- Bad Example: Imperatively decides which class to initiate.
  ```typescript
  export class Thermometer extends Device {}
  export class Light extends Device {}
  await conn.connect();
  const new_device: Device;
  switch (conn.manifest) {
    case "thermometer":
      new_device = new Thermometer();
      break;
    case "light":
      new_device = new Light();
      break;
  }
  new_device.setup(conn.manifest);
  ```

#### Builder

- Good Example: Construct a device object step by step. Ensures flexibility over the unique controls added to each unique device.

  ```typescript
  export class DeviceBuilder {
    public setConnector(conn: Connector): DeviceBuilder {
      this._connector = conn;
      return this;
    }

    public addControl(control: string): DeviceBuilder {
      this._controls.push(control);
      return this;
    }

    public assemble(): Device {
      let NewDevice = Device;
      // Assemble the device following the connector and controls defined
      // previously.
      return new NewDevice(this._connector);
    }
  }
  ```

- Bad Example: Huge Constructor. Bad readability.

  ```typescript
  class BadDevice {
    public constructor(conn: Connector, controls: string[]) {}
  }

  const device = new BadDevice(new Connector("http://device.url"), [
    "temperature",
    "mode",
  ]);
  ```

#### Mixin

- Good Example: Add different control capabilities to a Device by dynamically extending it.

  ```typescript
  export const TemperatureControl = <T extends Constructor>(Base: T) => {
    return class TemperatureControl extends Base implements ControlProtocol {
      private _temperature: number;
      private _range: Array<number> = [0, 0];
      private _unit: Unit = "Celsius";
      public get temperature(): number {}
      public get min_temp(): number {}
      public get max_temp(): number {}
      public setTemperature(temperature: number) {}
    };
  };
  ```

- Bad Example: Repeatedly define the same functionality over different devices.
  ```typescript
  class Device {}
  class Thermostat extends Device {
    private _temperature: number = 0;
    private _on: boolean;
    private _mode: string;
    public setTemperature(temp: number) {}
    public setOn(on: boolean) {}
    public setMode(mode: string) {}
  }
  class Light extends Device {
    private _on: boolean;
    public setOn(on: boolean) {}
  }
  ```
