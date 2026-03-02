# Tokens to use

For the current system setup, only one token is strictly required: the SonarCloud token — if you want SonarCloud to function as intended.

However, additional tokens may be required depending on your specific setup and deployment requirements. For example, you may need a token for a Render application if your code is deployed to a cloud service. Read the `SonarQube` documentation for details on how to configure it properly.

Another commonly required token is **GHCR_PAT** (GitHub Container Registry Personal Access Token).  
To learn how to set this up, go to the `CICDProcess.md` file and read the section:
- Setup: Push Your Own Docker Image to GitHub Container Registry

---

## Required Tokens

- `SONAR_TOKEN`
- `GHCR_PAT`