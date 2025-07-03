#!/bin/bash

# UK Bin Collection Reminder - Deployment Verification Script
echo "🔍 Verifying Deployment Setup"
echo "=============================="

ERRORS=0

# Check if we're in the correct directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: Not in bin-reminder-app directory"
    ((ERRORS++))
else
    echo "✅ In correct directory"
fi

# Check Vercel configuration files
if [[ -f "vercel.json" ]]; then
    echo "✅ vercel.json found"
else
    echo "❌ vercel.json missing"
    ((ERRORS++))
fi

if [[ -f ".vercelignore" ]]; then
    echo "✅ .vercelignore found"
else
    echo "❌ .vercelignore missing"
    ((ERRORS++))
fi

if [[ -f "deploy.sh" && -x "deploy.sh" ]]; then
    echo "✅ deploy.sh found and executable"
else
    echo "❌ deploy.sh missing or not executable"
    ((ERRORS++))
fi

# Check CSV data file
if [[ -f "public/enhanced_postcode_bin_collection_schedule.csv" ]]; then
    echo "✅ CSV data file found"
    FILE_SIZE=$(wc -c < "public/enhanced_postcode_bin_collection_schedule.csv")
    echo "   File size: $((FILE_SIZE / 1024)) KB"
    LINE_COUNT=$(wc -l < "public/enhanced_postcode_bin_collection_schedule.csv")
    echo "   Lines: $LINE_COUNT"
    
    if [[ $LINE_COUNT -gt 800 ]]; then
        echo "✅ CSV file has expected data (>800 lines)"
    else
        echo "⚠️  Warning: CSV file seems small (only $LINE_COUNT lines)"
    fi
else
    echo "❌ CSV data file missing from public/ directory"
    ((ERRORS++))
fi

# Check package.json has deployment scripts
if grep -q "deploy" package.json; then
    echo "✅ Deployment scripts found in package.json"
else
    echo "❌ Deployment scripts missing from package.json"
    ((ERRORS++))
fi

# Check for React dependencies
if [[ -d "node_modules" ]]; then
    echo "✅ Node modules installed"
else
    echo "⚠️  Warning: Node modules not installed (run 'npm install')"
fi

# Test build process
echo ""
echo "🔨 Testing build process..."
npm run build:vercel > /dev/null 2>&1

if [[ $? -eq 0 && -d "build" ]]; then
    echo "✅ Build successful"
    BUILD_SIZE=$(du -sh build | cut -f1)
    echo "   Build size: $BUILD_SIZE"
    
    # Check if CSV is in build
    if [[ -f "build/enhanced_postcode_bin_collection_schedule.csv" ]]; then
        echo "✅ CSV file included in build"
    else
        echo "❌ CSV file not found in build directory"
        ((ERRORS++))
    fi
else
    echo "❌ Build failed"
    ((ERRORS++))
fi

# Summary
echo ""
echo "📊 Verification Summary"
echo "======================"

if [[ $ERRORS -eq 0 ]]; then
    echo "🎉 All checks passed! Ready for deployment"
    echo ""
    echo "📋 Next steps:"
    echo "1. Run './deploy.sh' to deploy to Vercel"
    echo "2. Or push to Git and deploy via Vercel dashboard"
    echo ""
    echo "🧪 Test postcodes after deployment:"
    echo "   SW1A 1AA, B3 6NA, LE2 8IQ, M1 9VF"
else
    echo "❌ $ERRORS error(s) found. Please fix before deploying."
    exit 1
fi