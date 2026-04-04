# Logging

Instead of using the buildt in logging system, that are used for javascript files, the code has implemented a structured logging system using Pino to controll and manage how the logging is presented. This assist the projects in the long time, as one can adjust the logs to from the normal plain text that the **Console.log** format gives, and instead present the error in a machine parseable json object. This way we can use the json error or messaget o easily communicate through different systems, send error logs, store it, and overall manage the system much easier.

## Pino

Pino is a structured json logger for Node.js, build for speed with minimal work on the hot path a formated to offload the load to seperate processes. On top of that, it includes the standard logging framworking tools, such as; formating options, log levels for cusomizability, multiple log transportation options, etc.
The information that has been gathered and used to create the Pino code, comes from [link][https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/]

## Logging structure

The current logging structure is divided up into two files, that handle slightly diffferent

- logger.js
    - This file manages the structure and the format of the respective logging code. Specificly the code that will be stored in the app.log file. But also structure how it should be presented in the terminal when an error does present it self.
- requestLogger.js
    - This file handles the automatic storeage of requests. This generates a it for the request and in turn allows the user to find the request much easier in the future. Where the res.on('finish') fires after the response is sent allowing the response and status code to share the same time in the log line.
- app.log
    - this file keeps the history of the logs, this way as a user, it is possible to go back to see the different actions that was done before an error was executed, what hostname, what time, and what type of error it keeps. Allowing for extended bug reports, and testing.
    - Run **cat ./log/app.log** to get the whole log history.