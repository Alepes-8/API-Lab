# CI/CD Process

The CI/CD process for the project is designed to perform continuous testing of the project's functionality when creating the necessary pull requests and merges. This approach helps improve the quality, stability, and security of the product. It is especially important when working on multiple feature or fix branches simultaneously.

---

## Continuous Integration (CI) Process

This process runs on each commit associated with a pull request, allowing users to verify whether the system is functioning as intended after the code changes are committed. This helps limit the number of changes that could unexpectedly break the project or cause undesired outcomes.

---

## Continuous Delivery (CD) Process

When changes are pushed to the main branch, the necessary tests are run to ensure everything works as intended. These tests are generally more thorough and deeper compared to the CI tests, as they are executed less frequently in this project. Once the tests pass successfully, the project is deployed to GitHub Packages in its containerized form, making it available for deployment and use as needed.

---

## CI/CD Dockerized Setup

When pushing changes to the `Production` branch, there is a GitHub Action script, **CD_Docker.yml**, which builds Docker images, runs tests, and deploys the images to GitHub’s container registry (GHCR).  

This setup provides several benefits:  
- Every change lives in one ecosystem under the umbrella of GitHub.  
- You can define who is allowed to read or write to the container images.  

However, there are also drawbacks:  
- If you want to move to another environment, the images must be rebuilt.  
- Personal accounts have limitations on bandwidth and storage.  

Once properly configured, if the `docker-compose.yml` files are accurate, you don’t need to build the images manually. Instead, you can simply pull the images from GHCR to run the services.  

Additionally, when reusing GHCR images in different CI/CD jobs, tests can be executed against the **published images**, rather than rebuilding everything from scratch in each workflow run.


## Setup: Push Your Own Docker Image to GitHub Container Registry

When forking this project and setting it up for the first time, the GitHub Actions workflow will most likely fail because GHCR is not yet configured.  

To fix this, follow these steps:  

1. **Ensure you have a GitHub account** (required to fork).  
2. **Update the `docker-compose.yml` files**:  
   - Adjust the image names to match your GitHub username.  
   - Use only **lowercase letters** (GHCR does not allow uppercase in image names).  
3. **Create a Personal Access Token (PAT):**  
   - Go to [GitHub Token Settings](https://github.com/settings/tokens).  
   - Create a **Personal Access Token (classic)**.  
   - Enable the following scopes:  
     - `write:packages`  
     - `read:packages`  
     - `delete:packages`  
4. **Add the token as a repository secret:**  
   - Go to your repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.  
   - Name the secret `GHCR_PAT`.  
   - Paste in the token you created.  

That’s it — once this is set up, GitHub Actions will be able to build and push your Docker images to GHCR.

---

## The different Files

For the different process within a CI/CD system there are different files setup in order to handle the different processs accordingly. 

### API.yml

The `API.yml` file contains the information and process required for the CI process. Which in turn is run onces for each pull request or push that are sent to the `Production`, `dev`, or `staging` branch. This way the system can verify that the the system works as intended prior any large publishing or push to production and any other main focused branch. It is important to catch the errors as quickly as possible.

This process is utulising the docker-compose.test.yml file in order to generate the nessusary docker tests.

The CI process ultimately generates a **commit SHA**, which provides a unique hash representing the exact commit that triggered the workflow. 

This allows us to track exactly which commit an image was generated from. The generated image can then be used directly in the CD process. 

Because of this, it is not necessary to generate a new image during the CD process; we can simply deploy the image that was already created during CI.


### promote_staging.yml

With the goal of having a production, staging and dev stage of the deployment and production it is important that the CI/CD process is handled correctly based on images, changes, and version control. In order for this to occur accuratly we wanna make sure that the most recent image created in the dev branch is promoted and used in the staging branch. One doesn't want it to create a new image when we more to the staging branch, but rather use an image that already exist. This way we can avoid possible coruptions in the image, as we already know the image, and have it built. now it is only there in order to be tested, and used in the staging phase. 

This file is run when we push changes into the staging branch, which idelly should only occur from the dev branch, and should only occur when we wanna test new changes on the real system, such as the service. But also, when we are prepared to publish it to production phase. So what this cd process does, is that it gets the current image that is connected to the dev tag. Then take that connection and connect it to the staging tag. this way the dev and staging tag both point towards the same image, of course if the dev tag changes later on the staging tag won't change with it but will stay on the correct image. 