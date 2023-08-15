#!/bin/sh

# Usage: sh initial.sh

# Console colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Variables
SCRIPT_DIR="$(dirname "$(realpath "$0")")"
APP_DIR="$(dirname "$SCRIPT_DIR/../apps/*")"
CONFIG_FILE="$SCRIPT_DIR/config.sh"

cd "$SCRIPT_DIR" || exit

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
git pull origin master

echo "${GREEN}Installing dependencies${NC}"
yarn

echo "${GREEN}Deploying all apps${NC}"

for dir in $(ls -d "$APP_DIR"/*); do
  echo "${GREEN}Building $(basename "$dir")${NC}"
  yarn build $(basename "$dir")
done

echo "${GREEN}Migrating database${NC}"
yarn migration:run

echo "${GREEN}Restarting all apps${NC}"

for dir in $(ls -d "$APP_DIR"/*); do
  echo "${GREEN}(PM2)Starting $PREFIX$(basename "$dir")${NC}"
  pm2 start $APP_DIR/../dist/apps/$(basename "$dir")/main.js --name "$PREFIX$(basename "$dir")"
done

echo 'Finish'
