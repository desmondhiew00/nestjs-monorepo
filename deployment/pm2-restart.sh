#!/bin/sh

# Description: Deploy script for all apps
# Usage: sh deploy.sh [app_name || all]

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
APP_DIR="$(dirname "$SCRIPT_DIR/../apps/*")"
CONFIG_FILE="$SCRIPT_DIR/config.sh"

cd "$SCRIPT_DIR" || exit

if [ -z "$1" ]; then
  echo "${RED}Error${NC}: Please type which app to deploy. (Exp: all)"
  exit 1
fi

if [ -f "$CONFIG_FILE" ]; then
  . "$CONFIG_FILE"

  # Access the configuration values
  echo "Prefix: $PREFIX"
else
  echo "No configuration file found. Proceeding without configuration."
fi

if [ -n "$PREFIX" ]; then
  PREFIX="$PREFIX:"
  echo "${GREEN}Using prefix for pm2 service $PREFIX${NC}"
fi

if [ -n "$GIT_BRANCH" ]; then
  echo "${GREEN}Using branch $GIT_BRANCH${NC}"
else
  GIT_BRANCH="master"
fi

echo "${GREEN}Getting latest code from git${NC}"
git pull origin "$GIT_BRANCH"

echo "${GREEN}Installing dependencies${NC}"
yarn

if [ "$1" = "all" ]; then
  echo "${GREEN}Deploying all apps${NC}"

  for dir in $(ls -d "$APP_DIR"/*); do
    echo "${GREEN}Building $(basename "$dir")${NC}"
    yarn build $(basename "$dir")
  done
else
  echo "${GREEN}Building $1${NC}"
  yarn build $1
fi

echo "${GREEN}Migrating database${NC}"
yarn migration:run

if [ "$1" = "all" ]; then
  echo "${GREEN}Restarting all apps${NC}"

  for dir in $(ls -d "$APP_DIR"/*); do
    echo "${GREEN}Restarting $(basename "$dir")${NC}"
    pm2 restart "$PREFIX$(basename "$dir")"
  done
else
  echo "${GREEN}Restarting $1${NC}"
  pm2 restart "$PREFIX$1"
fi

echo 'Finish'
