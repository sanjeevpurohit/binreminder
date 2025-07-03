#!/bin/bash

# UK Bin Collection Reminder - Vercel Deployment Script
echo "🚀 Deploying UK Bin Collection Reminder to Vercel"
echo "=================================================="

# Check if we're in the correct directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: Please run this script from the bin-reminder-app directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Vercel CLI"
        exit 1
    fi
fi

echo "✅ Vercel CLI is ready"

# Check if CSV data file exists
if [[ ! -f "public/enhanced_postcode_bin_collection_schedule.csv" ]]; then
    echo "❌ Error: CSV data file not found in public/ directory"
    echo "Please ensure enhanced_postcode_bin_collection_schedule.csv is in the public/ folder"
    exit 1
fi

echo "✅ CSV data file found"

# Install dependencies if node_modules doesn't exist
if [[ ! -d "node_modules" ]]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

echo "✅ Dependencies are ready"

# Test build locally first
echo "🔨 Testing build process..."
npm run build:vercel
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying"
    exit 1
fi

echo "✅ Build successful"

# Check build size and files
echo "📊 Build summary:"
if [[ -d "build" ]]; then
    echo "Build directory size: $(du -sh build | cut -f1)"
    echo "CSV file size: $(ls -lh public/enhanced_postcode_bin_collection_schedule.csv | awk '{print $5}')"
    echo "Build files:"
    ls -la build/
else
    echo "❌ Build directory not found"
    exit 1
fi

# Deploy to Vercel
echo ""
echo "🚀 Deploying to Vercel..."
echo "Choose deployment type:"
echo "1) Production deployment (--prod)"
echo "2) Preview deployment (default)"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo "🌐 Deploying to production..."
        vercel --prod
        ;;
    2|*)
        echo "🔍 Deploying preview..."
        vercel
        ;;
esac

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Visit the URL provided by Vercel to view your app"
    echo "2. Test the search functionality with sample postcodes:"
    echo "   SW1A 1AA, B3 6NA, LE2 8IQ, M1 9VF"
    echo "3. Share the URL with users"
    echo ""
    echo "🔧 To make changes:"
    echo "1. Update your code"
    echo "2. Run this script again to redeploy"
else
    echo "❌ Deployment failed. Check the errors above."
    exit 1
fi