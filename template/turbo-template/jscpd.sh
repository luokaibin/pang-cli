#!/bin/bash
# Target directory
echo 'start jscpd checking...'

for i in $(git diff --name-only)
    do
        ./node_modules/jscpd/bin/jscpd  "$i" 
    done
echo 'finish jscpd checking...'
