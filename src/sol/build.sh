#!/bin/sh

# private key of 9th anvil admin account
export PRIVATE_KEY=0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

# deploy contract and get address
export TARGET=$(
    forge create $(
        find src -name "hello.sol"
    ):HelloWorld \
    -r localhost:8545 \
    --private-key $PRIVATE_KEY  \
    --broadcast | grep -oE 'Deployed to: 0x[0-9a-fA-F]{40}' | sed 's/Deployed to: //'
)

# function call: "World" as default
echo "\x1b[32m$(cast call $TARGET "getName()(string)" \
--private-key $PRIVATE_KEY)\x1b[0m"

