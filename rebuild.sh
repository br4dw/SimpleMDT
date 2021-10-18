#!/bin/sh

cd ~/mdt >> /dev/null 2>&1
git stash >> /dev/null 2>&1
echo "Pulling changes from git..."
git pull >> /dev/null 2>&1
echo "Changes pulled from git"
rm -rf __sapper__/ >> /dev/null 2>&1
echo "Rebuilding app..."
npm run build >> /dev/null 2>&1
echo "App rebuilt. Restarting..."
pm2 restart mdt >> /dev/null 2>&1
echo "App restarted!"