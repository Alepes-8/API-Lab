# Dev vs Production vs Testing

Given the structure that has been set up, the goal is to separate testing, development, and production so that each stage of the development process only has access to the necessary resources—and nothing more. For example, the development phase does not need to run tests automatically, while the test stage does. Similarly, the test stage does not necessarily require a large database volume, whereas the development and production stages may require one.

## Running Docker Compose

The `docker-compose` files that have been created are set up slightly differently based on their intended use. For a more detailed explanation, refer to the `docker.md` file to learn more about the purpose of Docker Compose. Here, it is important to understand why these differences exist and how `docker-compose.dev.yml` is run locally.

The Docker Compose files are created so that the test configuration is run only through the CI process defined in the `api.yml` file under `.github/workflows`. It is not intended to be run elsewhere.

The default `docker-compose.yml` file is used when creating a production-based Docker container locally or when the CD process is triggered through the `CD_Docker.yml` file. In these cases, the purpose is to build a Docker container suitable for production use. However, both of these configurations lack development tools that may be helpful for local testing, such as hot reloading after code changes. These tools allow a container to be quickly adjusted and updated during development.

Therefore, `docker-compose.dev.yml` is intended to be run locally only. It is not deployed through the CI or CD processes and is used purely to support the development workflow.

To run it:

1. Open a terminal  
2. Run:

   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```
  - or you can run `npm run dev which can be much quicker.`
  - Note is it the first time setting the docker-compose.dev.yml system up you will also need to include --build after the command
  - if the a change has been made to the package.json or such files, a clean instalation needs to be done. Run 
     ```bash
    docker compose -f docker-compose.dev.yml down -v
    and
    docker-compose -f docker-compose.dev.yml up --build
    ```