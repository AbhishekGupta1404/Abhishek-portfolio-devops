#!/bin/sh
set -e

echo "Starting Vercel build..."

# Clean previous build
rm -rf dist

# Install dependencies
npm ci

# Build the project
npm run build

echo "Build completed successfully!"
