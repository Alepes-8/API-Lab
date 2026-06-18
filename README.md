# Drink-CatalogV2

An API for cataloging cocktail recipes, allowing users to search for drinks, save personal ratings, and store notes.  
The system also supports user authentication and integrates with multiple data sources for ingredient and recipe management.

The goal is to create a supportive system that can be easily deployed to a Linux server, or any environment that supports Docker containers.

---

# Current Setup

The project v1 [Drink-Catalog](https://github.com/Alepes-8/Drink-Catalog) is set up on **Render**, with the database hosted on **MongoDB Atlas**.

This setup is designed with an emphasis on supporting different production stages, such as development, staging, and production, ensuring that the code can be reliably deployed and maintained on a production server. The core API remains the same as [Drink-Catalog](https://github.com/Alepes-8/Drink-Catalog), but with updates to the systems surrounding the API.

## Updates in V2

The V2 setup of Drink-Catalog includes the following additions and improvements:
- **Create Production phases**
  - Supporting the separation between production, staging, and development environments
 
- **GitHub Actions workflows**
  - Separates deployment into development, staging, and production phases.
  - Improves the CI process, making it cleaner and easier to understand.

- **Docker Compose**
  - Different `docker-compose` files are configured for testing and development.
  - Staging and production environments have their own dedicated configurations.

- **Prometheus**
  - Added for system monitoring and metrics collection.
  - Enables scraping of request data, response times, and other performance-related metrics.

- **Version Control**
  - With the new CI process and environment separation, the system supports automated version transitions between stages.

- **rollback.sh script**
  - Enables easy rollback or switching between versions across environments (development, staging, production).
  - Handles version transitions for a specified stage.

- **Logging**
  - Introduces a structured logging system using **Pino**.
  - Replaces `console.log` with organized logging methods such as `logger.info`, `logger.error`, etc.

---

### Swagger UI Preview

<img width="1203" height="899" alt="Swagger UI" src="https://github.com/user-attachments/assets/fac38275-4a70-4544-9074-2fa3eee95db7" />

### JWT Authentication Dialog

<img width="536" height="240" alt="Swagger Auth Dialog" src="https://github.com/user-attachments/assets/fb51647e-1834-467d-b672-01c073592535" />

---

