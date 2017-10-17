#!/bin/bash

LAMBDA="YourLambdaNameHere"
ZIP_OUTPUT="lambda.zip"
TEST_OUTPUT="test_ouput.json"

# Configure AWS CLI for deployment
./configure_deployment_credentials.sh

# Zip then upload source.
cd src
zip -r $ZIP_OUTPUT *
echo "Uploading..."

aws lambda update-function-code --function-name $LAMBDA --zip-file "fileb://${ZIP_OUTPUT}"
rm lambda.zip

# Test lambda with json input.
cd ..
echo "Testing ${LAMBDA}..."
aws lambda invoke --function-name $LAMBDA --payload file://lambda_test_input.json $TEST_OUTPUT

# Print and delete test output.
python -m json.tool $TEST_OUTPUT
rm $TEST_OUTPUT
    