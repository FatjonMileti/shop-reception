#!/bin/bash

# [~] from https://www.storyblok.com/faq/setup-dev-server-https-proxy
# Running the proxy to target port 3000, you can change that any port of your choice but it should be what your app is running on in development.
# local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem
# HTTPS is now running on port 3010 and forwarding requests to http 3000.

local-ssl-proxy --source 8484 --target 8080 --cert localhost.pem --key localhost-key.pem  

# [!] .env.dev redirect urls need to be updated to https:// & source port
# REDIRECT_URI=https://192.168.0.17:8484/signin-oidc

# [!] keycloak needs to have the https://... url version in its 'Valid redirect URIs' list (crf realm::Clients::client_dex_be::Settings)

# [!] on the phone:
# 1. in chrome, open a new tab to chrome://flags
# 2. search for the #unsafely-treat-insecure-origin-as-secure
# 3. enable the flag and add entries for the keycloak and mockoon servers as in the screenshot attached
# 4. https://<ip>:<source> should now be available on the phone