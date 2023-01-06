#!/usr/bin/env bash
set -e



start_time=$SECONDS

echo 'start eslint checking, please wait...' 
next lint --fix
echo 'finish eslint checking, please wait...' 

npm run jscpd


echo 'start strong eslint rule checking, please wait...' 
npm run review
echo 'finish strong eslint rule checking, please wait...' 


# echo 'start flow checking, please wait...' 
# flow  
# echo 'finish flow checking, please wait...' 

git add -A .

elapsed=$(( SECONDS - start_time ))
echo " finish lint checking, good job! Elapsed time: $elapsed seconds"