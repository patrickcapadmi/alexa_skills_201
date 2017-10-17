#!/bin/bash

# Configure awscli to publish skill as per: https://developer.amazon.com/blogs/post/Tx1UE9W1NQ0GYII/Publishing-Your-Skill-Code-to-Lambda-via-the-Command-Line-Interface 

ACCESS_KEY_ID=""
SECRET_ACCESS_KEY=""

# echo $ACCESS_KEY_ID
# echo $SECRET_ACCESS_KEY

aws configure set aws_access_key_id $ACCESS_KEY_ID
aws configure set aws_secret_access_key $SECRET_ACCESS_KEY
