#!/bin/bash
set -e
cd $(dirname $0)/..

# Check for .env.production.local
if [ ! -f .env.production.local ]; then
    echo "Missing .env.production.local file"
    exit 1
fi

# Export environment variables from .env.production.local
export $(sed 's/#.*//g' .env.production.local | xargs)

# Run docker
docker compose -f docker/compose.yml up --build --remove-orphans --force-recreate --renew-anon-volumes
