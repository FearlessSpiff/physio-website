#!/bin/bash
set -e

VERSION="0.22.14"
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case "$ARCH" in
  x86_64)  ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

case "$OS" in
  linux|darwin) ;;
  *) echo "Unsupported OS: $OS"; exit 1 ;;
esac

URL="https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${OS}_${ARCH}.zip"

echo "Downloading PocketBase v${VERSION} for ${OS}/${ARCH}..."
curl -L -o pocketbase.zip "$URL"
unzip -o pocketbase.zip pocketbase
chmod +x pocketbase
rm pocketbase.zip

echo ""
echo "Done! Start the server with: ./start.sh"
echo "Then open http://127.0.0.1:8090/_/ to set up your admin account."
