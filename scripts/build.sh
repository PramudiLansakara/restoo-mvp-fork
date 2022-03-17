#!/bin/bash

set -e

echo "Building Restoo App"

echo "Building admin app"
cd admin
yarn
yarn build
yarn generate

echo "Switching directory to root"
cd ..

echo "Building client app"
cd client
yarn
yarn build
yarn generate

echo "Switching directory to root"
cd ..

echo "Cleanup the deployment directory"
rm -rf www
mkdir -p www
mkdir -p www/admin

echo "Copy admin app build files"
mv ./admin/dist/* ./www/admin

echo "Copy client app build files"
mv ./client/dist/* ./www

echo "Installing API dependencies"
cd api
yarn

echo "Done"
