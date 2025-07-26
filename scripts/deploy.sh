#!/bin/bash
# Build and deploy the Serverless project to a specified stage (default: dev)

set -e

STAGE=${1:-master}

npm run build
npx serverless deploy --stage $STAGE 