> [!IMPORTANT]
> This is a simulation of a smart home management system, demonstrating the OOP concepts learned.

# SmartNest
SmartNest brings all of your compatible smart devices to the tip of your fingers. Automate your tasks and routines, while monitoring and controlling your smart home from anywhere, anytime.

## Business Requirements
### Functional (with highlighted nouns and verbs)

- The <ins><n>user</n>s</ins><sup>(N.)</sup> should be able to <ins><v>add</v></ins><sup>(V.)</sup> their smart <ins><n>device</n>s</ins><sup>(N.)</sup> to the <ins><n>dashboard</n></ins><sup>(N.)</sup> and <ins><v>send</v></ins><sup>(V.)</sup> <ins><n>command</n>s</ins><sup>(N.)</sup> to them.
- The <ins><n>dashboard</n></ins><sup>(N.)</sup> <ins><v>monitor</v>s</ins><sup>(V.)</sup> all <ins><n>status</n></ins><sup>(N.)</sup> of the <ins><n>device</n>s</ins><sup>(N.)</sup>, and have the ability to <ins><v>notify</v></ins><sup>(V.)</sup> <ins><n>user</n>s</ins><sup>(N.)</sup> when anomaly occurs.
- <ins><n>User</n>s</ins><sup>(N.)</sup> can <ins><v>create</v></ins><sup>(V.)</sup> automation <ins><n>rule</n>s</ins><sup>(N.)</sup> that gets <ins><v>activate</v>d</ins><sup>(V.)</sup> when certain <ins><n>condition</n>s</ins><sup>(N.)</sup> have been <ins><v>met</v></ins><sup>(V.)</sup>.
- The first <ins><n>user</n></ins><sup>(N.)</sup> <ins><v>register</v>e</ins><sup>(V.)</sup>d in the <ins><n>dashboard</n></ins><sup>(N.)</sup> will be the <ins><n>admin</n></ins><sup>(N.)</sup>. Other <ins><n>user</n>s</ins><sup>(N.)</sup> will not be given the <ins><n>admin state</n></ins><sup>(N.)</sup> by default.
- <ins><n>Admin</n>s</ins><sup>(N.)</sup> can <ins><v>update</v></ins><sup>(V.)</sup> the <ins><n>identity state</n></ins><sup>(N.)</sup> and <ins><v>delete</v></ins><sup>(V.)</sup> all <ins><n>users</n></ins><sup>(N.)</sup>.

> [!NOTE]
> <ins><n>Noun</n>s</ins><sup>(N.)</sup> are highlighted in green. <ins><v>Verb</v>s</ins><sup>(V.)</sup> are highlighted in red.

### Non-functional (rules)
- Automation rules should be feasable: does not conflict with one another, execution time not set to the past, ..., etc.
- Commands should not violate the devices' limits.


## Classify Nouns/Verbs into Classes/Attributes
1. Dashboard
    - Attributes: users, devices, rules
    - Methods: addDevice, sendCommand, monitorDevice, deleteDevice, registerUser, updateUser, deleteUser, createRule, activateRule, deactivateRule, deleteRule
2. Device
    - Attributes: status, deviceId
    - Methods: sendCommand
3. User
    - Attributes: isAdmin, userId
    - Methods:
4. Command
    - Attributes: deviceId, commandId
5. Rule
    - Attributes: condition, commands, ruleId
    - Methods: activate

## Target Audiences
1. Homeowner: Cares about energy savings. Hopes to turn off unused electronic devices to save on bills.
2. Shopkeeper: Ensures the normal operation of business. In desperate need to monitor the health of electronics and replace malfunction ones immediately to improve customer satisfaction.
3. Property Manager: Takes property security seriously. Wishes to identify any potential risks in real-time without traveling across vast distances. Have a need to provide evidence whenever anything bad happens.

## User Personas and User Stories
| Model | Version | Prompt | Attachment |
|:-----:|:-------:|--------|------------|
| ChatGPT | 4o | Create 2 user personas based on the attached document. Define their details, provide their name, back stories, scenarios, reasons to use the app, and 3 user stories. | Above contents in PDF format. |

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

    1. *"As a homeowner, I want to view the real-time status of all my connected devices on a single, intuitive dashboard so that I can quickly check and control my home from anywhere."*

    2. *"As a homeowner, I want to create and schedule automation rules (like turning on lights at dusk and adjusting the thermostat at bedtime) so that my home operates efficiently and comfortably without my constant attention."*

    3. *"As a homeowner, I want to receive immediate alerts when any device (e.g., a motion sensor) detects unusual activity so that I can take prompt action to secure my home."*

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

    1. *"As a property manager, I want to monitor the status of smart devices across all my properties from a unified dashboard so that I can efficiently identify and address any issues."*

    2. *"As a property manager, I want to group devices by property or room and execute batch operations (such as switching off all lights at closing time) so that I can manage multiple devices quickly and effectively."*

    3. *"As a property manager, I want to receive aggregated alerts and performance analytics for each property so that I can prioritize maintenance tasks and ensure consistent operation across all sites."*

## UML Class Diagram
![uml](./assets/images/uml.png)

## Low Fidelity Prototype

<style>
v { background-color: DarkRed }
n { background-color: DarkGreen }
</style>