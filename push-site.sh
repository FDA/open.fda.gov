#!/bin/bash

TODAY=$(date +"%Y-%m-%d")
BUCKET="open.fda.gov-website-redesign-demo"

echo "Pushing to: ${BUCKET}"

read -p "Do you want to continue (y/n)? "
[ "$(echo $REPLY | tr [:upper:] [:lower:])" == "y" ] || exit

set -x

aws --profile openfda s3 mb s3://${BUCKET} --region us-east-1

aws --profile openfda s3 website s3://${BUCKET} --index-document index.html --error-document error.html

cd public

echo "Dry run..."

aws --profile openfda s3 sync . s3://${BUCKET} --acl public-read --cache-control max-age=300 --dryrun

read -p "Do you want to continue (y/n)? "
[ "$(echo $REPLY | tr [:upper:] [:lower:])" == "y" ] || exit

echo "Pushing..."

aws --profile openfda s3 sync . s3://${BUCKET} --acl public-read --cache-control max-age=300

echo "Loading..."
open "http://${BUCKET}.s3-website-us-east-1.amazonaws.com/"
