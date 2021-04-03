#!/bin/zsh
echo "push code to Gihub"
git add .
git commit -m "[Update] Update Documents"
git push -u origin master
echo "finish!"
