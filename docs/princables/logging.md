# Logging

Instead of using the buildt in logging system, that are used for javascript files, the code has implemented a structured logging system using Pino to controll and manage how the logging is presented. This assist the projects in the long time, as one can adjust the logs to from the normal plain text that the **Console.log** format gives, and instead present the error in a machine parseable json object. This way we can use the json error or messaget o easily communicate through different systems, send error logs, store it, and overall manage the system much easier.

## Pino

Pino is a structured json logger for Node.js, build for speed with minimal work on the hot path a formated to offload the load to seperate processes. On top of that, it includes the standard logging framworking tools, such as; formating options, log levels for cusomizability, multiple log transportation options, etc.
The information that has been gathered and used to create the Pino code, comes from [link][https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/]