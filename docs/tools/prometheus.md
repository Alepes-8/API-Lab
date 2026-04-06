# Prometheus

Prometheus is a tool that allows scraping of the API to provide a better understanding and visualisation of data. It works as a middleware that starts before the API request is handled, and finishes when the request is complete. The data collected is dependent on what the user desires, but the current setup collects four metrics:

- **Time**
    - Measures the time it takes to execute an action, allowing statistics to be collected on the speed at which a request is executed.

- **Counter metric**
    - Never goes down, only continues to increase. Counts the number of times an HTTP request has been called and served. This allows Prometheus to check how often a given request has been called within a given time period by recording the value at one point, then again at a later time.

- **Histogram metric**
    - Records the distribution of values, such as time. This allows the system to calculate percentiles for request speed. For example: "95% of requests are completed under x ms."
    under 50ms:  892 requests
    under 100ms: 1201 requests
    under 500ms: 1430 requests
    over 500ms:  2 requests

- **Active requests**
    - The number of requests currently being handled. This value increases and decreases based on the actual current state of the system.

## Structured flow

The flow of the system works as follows in order to collect the correct data, store it, and allow future comparisons:

````
Request arrives  → gauge.inc(), start timer
Response sent    → histogram.observe(duration), gauge.dec() , counter.inc()

````

## Source

Most of the information has been based on [prometheus Tutorial][https://oneuptime.com/blog/post/2026-01-30-prometheus-instrumentation-libraries/view].