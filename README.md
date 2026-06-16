# Workflow Sandbox
This is a sandbox repository for nuage-agent workflows.

## Development

```bash
npm install
npm test
npm run build
```

## Infrastructure Deployment

This project runs as an AWS Lambda container image triggered daily by EventBridge.

### Prerequisites

- AWS CLI configured with appropriate credentials
- Terraform >= 1.0
- Docker

### Initial Deployment

The deployment is done in two phases because the Lambda function requires a container image to already exist in ECR.

**Phase 1: Create ECR repository**

```bash
cd terraform
terraform init
terraform apply -target=aws_ecr_repository.workflow_sandbox
```

**Phase 2: Build and push the Docker image**

```bash
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export AWS_REGION=ap-northeast-1
export ECR_REPO="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/workflow-sandbox"
export IMAGE_TAG=$(git rev-parse --short HEAD)

aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

docker build -t ${ECR_REPO}:${IMAGE_TAG} .
docker push ${ECR_REPO}:${IMAGE_TAG}
```

**Phase 3: Deploy Lambda and remaining resources**

```bash
cd terraform
terraform apply -var="image_tag=${IMAGE_TAG}"
```

### Updating the Lambda image

Build and push a new image as shown in Phase 2, then apply Terraform with the new tag:

```bash
terraform apply -var="image_tag=${IMAGE_TAG}"
```
