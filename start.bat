@echo off
echo Debug info:
echo Node Version:
call node -v
echo NPM Version:
call npm -v
echo Path is:
echo %PATH%
echo Running NPM Install...
call npm install --verbose
echo Done with NPM!
