terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

variable "environment" {
  description = "Deployment environment (e.g. dev, stg, prod). Used to namespace resources and avoid cross-environment conflicts."
  type        = string
  default     = "dev"
}

variable "image_tag" {
  description = "Docker image tag to deploy (e.g. commit hash). Set by CI/CD pipeline."
  type        = string
}

variable "lambda_timeout" {
  description = "Lambda function timeout in seconds."
  type        = number
  default     = 60
}

variable "lambda_memory_size" {
  description = "Lambda function memory size in MB."
  type        = number
  default     = 256
}

locals {
  name_prefix = "workflow-sandbox-${var.environment}"
}

# ECR Repository
resource "aws_ecr_repository" "workflow_sandbox" {
  name                 = local.name_prefix
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# IAM Role for Lambda
data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_exec" {
  name               = "${local.name_prefix}-lambda-exec"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "lambda_log" {
  name              = "/aws/lambda/${local.name_prefix}"
  retention_in_days = 14
}

# Lambda Function (container image)
resource "aws_lambda_function" "workflow_sandbox" {
  function_name = local.name_prefix
  role          = aws_iam_role.lambda_exec.arn
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.workflow_sandbox.repository_url}:${var.image_tag}"
  timeout       = var.lambda_timeout
  memory_size   = var.lambda_memory_size

  depends_on = [aws_cloudwatch_log_group.lambda_log]
}

# EventBridge Schedule Rule
resource "aws_cloudwatch_event_rule" "daily_batch" {
  name                = "${local.name_prefix}-daily-batch"
  schedule_expression = "cron(0 0 * * ? *)"
}

# EventBridge Target
resource "aws_cloudwatch_event_target" "lambda_target" {
  rule      = aws_cloudwatch_event_rule.daily_batch.name
  target_id = "${local.name_prefix}-lambda"
  arn       = aws_lambda_function.workflow_sandbox.arn
}

# Lambda Permission for EventBridge
resource "aws_lambda_permission" "allow_eventbridge" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.workflow_sandbox.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.daily_batch.arn
}
