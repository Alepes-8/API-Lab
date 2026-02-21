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