# Logging

Instead of using the built-in logging system for JavaScript files, this project implements a structured logging system using **Pino** to control and manage how logs are presented. This approach benefits the project long-term, as it allows logs to be formatted not just as plain text (like **console.log**), but as machine-parsable JSON objects. This makes it easier to communicate errors across systems, store logs, and manage the application more effectively.

## Pino

**Pino** is a structured JSON logger for Node.js, built for speed with minimal impact on the hot path and designed to offload work to separate processes. It also includes standard logging tools such as formatting options, customizable log levels, multiple log transport options, and more.  
The information used to implement Pino in this project was gathered from [this guide](https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/).

## Logging structure

The current logging system is divided into two main files, each handling a slightly different task:

- **logger.js**
    - Manages the structure and format of the logs, especially those stored in `app.log`.
    - Controls how logs are displayed in the terminal when errors occur.

- **requestLogger.js**
    - Automatically stores request logs.
    - Generates a unique ID for each request, making it easier to track them later.
    - Uses `res.on('finish')` to ensure the response and status code are logged together.

- **app.log**
    - Stores the full history of logs, allowing users to review actions taken prior to an error, including hostname, timestamp, and error type.
    - Useful for detailed bug reports and testing.
    - Run `cat ./log/app.log` to view the complete log history.