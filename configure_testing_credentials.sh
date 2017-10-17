#!/bin/bash

ACCESS_KEY_ID=""
SECRET_ACCESS_KEY=""

# echo $ACCESS_KEY_ID
# echo $SECRET_ACCESS_KEY

aws configure set aws_access_key_id $ACCESS_KEY_ID
aws configure set aws_secret_access_key $SECRET_ACCESS_KEY
