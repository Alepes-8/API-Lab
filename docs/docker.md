# Docker

The Docker setup is included in this project to ensure a high level of **environmental control**. With Docker, the container includes everything required for the project to run: the operating system, Node.js version, dependencies, and configuration.

While occasional updates may still be necessary, using a container ensures that the application behaves consistently across all environments — whether running locally or deployed on an external API service.

## Swagger UI Within the container

The current setup allows for the **Swagger UI** to be running along side the API system, allowing the users the understanding that if the **entertainment_api** container is running you will be able to se the swagger ui, unless issues has occured. Which in turn can be used to test the **entertainment_api** functionality.

## Dockerfiles

A Dockerfile does not run the system itself; rather, it contains the information required to understand which dependencies are needed to build the Docker image. In short, it is the blueprint used to create the Docker image.

The Dockerfile in this project is set up using a staged approach, where it has both a build stage and a runtime stage. A staged build means that when the Dockerfile is executed, it progresses through the different stages in the order they are defined.

The build stage performs a defined set of instructions, which can include any form of preparation work, such as downloading, unzipping, or processing data. After that, the runtime stage runs as a separate construction, but it has access to all the data that was processed and generated during the build stage.

This means that tasks such as downloading, unzipping, or processing data are not included in the final runtime stage. When the image is created, only the runtime stage is included, which reduces both the size and complexity of the final image. This is especially important when extensive preprocessing is required, but those processes do not need to be included in the final image.

## Docker-compose 

Docker Compose files are created to specify everything required to set up a multiple container Docker application and define how the containers connect to each other. Docker Compose starts all the containers, connects them automatically, manages their network configuration, sets environment variables, handles volumes, and controls the startup order to ensure everything is set up correctly as intended.

The difference between a Dockerfile and a docker-compose file is that a Dockerfile defines how a Docker image is built, what it contains, and how it runs when a container is created from it. In contrast, Docker Compose is used to define and manage multiple containers that work together. It can build images using Dockerfiles or use existing images, configure them, and establish connections between them.

For example, in a project where an application needs access to MongoDB, Docker Compose can start both the application container and the MongoDB container, configure them correctly, and connect them so the application can communicate with the database running in the other container.

It is important to clarify the following: the different Docker Compose files are used for slightly different purposes and therefore need to be run differently and contain different configurations.

### docker-compose.yml

- This Compose file contains the final production setup — everything required for the production container to run accurately and function as intended when deployed to a customer or final environment.
- It does not include a wide range of testing tools.
- It includes the volumes required for production and contains more thorough and production-accurate configuration compared to the other Docker Compose files.
- This is the Compose file that is created and used when pushing to the `production` branch, as defined in the `CD_docker.yml` (CD process).
- The same Compose file is also used when deploying to the staging environment, since staging needs to emulate production as closely as possible.

### docker-compose.test.yml

- This Docker Compose file is focused on testing the environment without leaving anything persistent after the tests have completed.
- The important part is that the system is tested correctly. This includes integration tests, Postman tests, and Docker-related tests to verify that the system behaves as intended.
- It does not need to include everything required for production. For example, it does not need a fully developed or persistent database volume.
- This Compose file is run through the CI process to test the system whenever changes are merged into the `dev`, `staging`, or `production` branches, ensuring that everything still works as intended without major issues.

### docker-compose.dev.yml

- The Docker Compose file built for development differs slightly from the other two, as it is not used in the CI/CD process executed through GitHub Actions.
- Instead, it is run locally to enhance development efficiency and productivity. You can read more about how to run and work with it in the `dev.md` file.
- It contains the necessary components that will also be used in production, but it does not necessarily need to include all test configurations, since tests are handled through the CI process.
- The key goal is to limit the configuration to only what is required for developing new features, running them accurately, and making quick changes without waiting for a long, drawn-out deployment process.

## Testing

If you ever want to inspect the Docker container and verify its internal structure, you can check what is currently running on the system with:

```bash
    docker ps
``` 

This lists all running containers.
To enter a running container:
```bash
docker exec -it drink_api_dev sh
```
Once this command is run, you will be inside the container and can inspect its contents and structure.