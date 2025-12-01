#!/bin/bash

# Kill any existing Next.js dev servers
echo "Stopping existing dev servers..."
pkill -f "next dev" 2>/dev/null

# Clear Next.js cache
echo "Clearing .next cache..."
rm -rf .next

# Start dev server
echo "Starting dev server..."
npm run dev
