# Tokens to use

For the current setup, there are two tokans that are required for the system to work as intended.

- `SONAR_TOKEN`
- `GHCR_PAT`

Where the **SONAR_TOKEN** is setup in order to assist the system in connecting the sonarqube and github project.

Where the **GHCR_PAT** (GitHub Container Registry Personal Access Token) is used to suport the systems storage solution for the container image. The container image is created with the help of the CI/CD process, that in turn published to the githubs local ecosystem for packages. Where this token is required as a password to allow the project to publish to the given location. Where the given location is currently set as *ghcr.io/alepes-8/drink_api_home_lab*. Which will also be used in the rollback.sh file in order to allow the system to get the packages and rebuild container based on the published images. Read CICDProcess to see how that is setup. But the important part is to know that the rollback.sh file contains keys that are stored localy on the system in secret, so that it it isn't stored in the git history, as well as allow repo to get images.

To learn how to set this up, go to the `CICDProcess.md` file and read the section.

---

## Required Tokens

- `SONAR_TOKEN`
- `GHCR_PAT`
