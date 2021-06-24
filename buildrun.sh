#!/bin/bash
# Pipeline build and run locally

# Subrotine to handle errors
function handle_error {
    if [ $? -ne 0 ] # Check if previous command status code is not 0
    then
        echo 'pipeline -> fail ->' $1 # Outout an error message
        exit 1 # Exit pipeline with status 1
    fi
}

# Build
~/go/bin/packr2 clean
handle_error 'packr2 clean initial'

~/go/bin/packr2
handle_error 'packr2'

go build -o ./target/main.exe main.go
handle_error 'Compilation'

~/go/bin/packr2 clean
handle_error 'packr2 clean after'

# Run
./target/main.exe
handle_error 'Runtime'

exit 0