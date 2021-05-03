#!/bin/zsh
echo "push code to Github"
git add .
git commit -m "[Update] Update Documents"
git push -u origin master
echo "finish!"
