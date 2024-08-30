#!/bin/bash

# if has file
if [ -f scripts/deployment/config.sh ]; then
  # Load default values from config.sh
  source scripts/deployment/config.sh
fi

echo "Enter name of the app to deploy: "
read app
app=${app}

echo "Enter the server host: ($host)"
read input_host
if [ -n "$input_host" ]; then
  host=$input_host
fi

echo "Enter the server pem file: ($pem_file)"
read input_pem
if [ -n "$input_pem" ]; then
  pem_file=$input_pem
fi

echo "Enter the server user: ($user)"
read input_user
if [ -n "$input_user" ]; then
  user=$input_user
fi


echo "Enter the server path: ($to)"
read input_to
if [ -n "$input_to" ]; then
  to=$input_to
fi

echo "Building $app"
echo "User: $user"
echo "Host: $host"
echo "Pem file: $pem_file"
echo "To: $to"

## rename .env to .env.local
mv .env local.env
mv staging.env .env

## build the app
yarn build $app

scp -i $pem_file -r dist/apps/$app $user@$host:$to

## rename .env.local to .env
mv .env staging.env
mv local.env .env

echo "1. ssh to EC2 instance"
echo "2. move the app to the correct folder"
echo "cd <repo>/dist/apps && rm -rf ./$app && mv ~/$app ./"