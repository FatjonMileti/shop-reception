#!/bin/bash

# from https://www.storyblok.com/faq/setup-dev-server-https-proxy

brew install mkcert
mkcert -install
mkcert localhost

# Installing the proxy
npm install -g local-ssl-proxy

# -> carry on with the setup in run.sh