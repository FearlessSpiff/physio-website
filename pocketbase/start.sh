#!/bin/bash
set -e

if [ ! -f "./pocketbase" ]; then
  echo "PocketBase binary not found. Run ./download.sh first."
  exit 1
fi

echo "Starting PocketBase..."
echo "  API:   http://127.0.0.1:8090/api/"
echo "  Admin: http://127.0.0.1:8090/_/"
echo ""

./pocketbase serve --http="127.0.0.1:8090"
