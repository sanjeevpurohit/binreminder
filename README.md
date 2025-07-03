# 🗑️ UK Bin Collection Reminder App

A React application that helps UK residents find their bin collection schedules by searching with their postcode.

## Features

- 🔍 **Postcode Search**: Search for collection schedules using UK postcodes
- 📅 **Collection Schedules**: View detailed collection dates for the next 2 months
- 🗑️ **Multiple Bin Types**: Support for 8 different bin types with colors:
  - ⚫ Black General Waste (weekly)
  - 🔵 Blue Mixed Recycling (fortnightly)
  - 🟢 Green Garden Waste (fortnightly)
  - 🟤 Brown Food Waste (weekly)
  - 🟣 Purple Glass Recycling (monthly)
  - ⚪ White Paper Recycling (fortnightly)
  - 🟠 Orange Textile Recycling (monthly)
  - 🔴 Red Small Electrical (monthly)
- 🏛️ **Council Information**: Displays council details and official collection URLs
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 💡 **Smart Suggestions**: Auto-suggest postcodes as you type

## Data Coverage

- **15 UK councils** with verified collection services
- **149+ postcodes** across England, Scotland, and Wales
- **832+ collection schedules** with detailed information
- Real-time collection date calculations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the bin-reminder-app folder
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

### Building for Production

Create a production build:
```bash
npm run build

# For Vercel deployment (optimized)
npm run build:vercel
```

## 🚀 Deploying to Vercel

### Prerequisites for Deployment

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Code should be in a Git repository (GitHub, GitLab, Bitbucket)
3. **CSV Data**: Ensure `enhanced_postcode_bin_collection_schedule.csv` is in the `public/` folder

### Method 1: Automated Deployment Script

```bash
# Make sure you're in the bin-reminder-app directory
cd bin-reminder-app

# Run the deployment script
./deploy.sh
```

The script will:
- ✅ Check prerequisites
- ✅ Install Vercel CLI if needed
- ✅ Verify CSV data file exists
- ✅ Test build locally
- ✅ Deploy to Vercel
- ✅ Provide deployment URL

### Method 2: Manual Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy the app**:
   ```bash
   # Preview deployment
   vercel

   # Production deployment
   vercel --prod
   ```

### Method 3: Git-based Deployment (Recommended)

1. **Push to Git repository**:
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push origin main
   ```

2. **Connect repository to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect React app and deploy

### Deployment Configuration

The app includes these Vercel-specific files:

- **`vercel.json`**: Deployment configuration with CSV serving
- **`.vercelignore`**: Files to exclude from deployment
- **`deploy.sh`**: Automated deployment script

### Environment Variables

For production deployment, you can set these environment variables in Vercel dashboard:

```
GENERATE_SOURCEMAP=false
```

### Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your project dashboard on Vercel
2. Click "Domains" tab
3. Add your custom domain
4. Update DNS settings as instructed

### Post-Deployment Verification

After deployment, test these features:

1. **App loads correctly** at the Vercel URL
2. **CSV data loads** (search functionality works)
3. **Sample postcodes work**: SW1A 1AA, B3 6NA, LE2 8IQ
4. **Responsive design** on mobile/tablet
5. **Council links** redirect to official websites

### Updating the Deployed App

To update the live app:

```bash
# Make your changes
# Run the deployment script again
./deploy.sh

# Or manually
vercel --prod
```

### Troubleshooting Deployment

**CSV file not loading**:
- Ensure file is in `public/` directory
- Check file permissions
- Verify file name matches exactly

**Build failures**:
- Run `npm run build:vercel` locally first
- Check for any TypeScript/ESLint errors
- Ensure all dependencies are in package.json

**404 errors**:
- Check `vercel.json` routing configuration
- Ensure SPA routing is properly configured

## How to Use

1. **Enter a Postcode**: Type a UK postcode (e.g., "SW1A 1AA", "B3 6NA") in the search box
2. **View Suggestions**: See matching postcodes as you type
3. **Select Results**: Click on a suggestion or press Enter to search
4. **View Schedule**: See your bin collection schedule with:
   - Next collection dates
   - Collection frequency (weekly/fortnightly/monthly)
   - Bin types and colors
   - What goes in each bin
   - Council contact information

## Data Source

The app reads from `enhanced_postcode_bin_collection_schedule.csv` which contains:
- Postcode information
- Council details and official websites
- Bin types with descriptions
- Collection frequencies and schedules
- 2-month collection date ranges

## Technology Stack

- **React 18** - Frontend framework
- **Papa Parse** - CSV parsing library
- **date-fns** - Date manipulation and formatting
- **CSS3** - Styling with modern features (Grid, Flexbox, Backdrop filters)
- **HTML5** - Semantic markup

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

To add more councils or update collection data:
1. Update the CSV file with new postcode and collection information
2. Ensure data follows the existing format
3. Test with the React app

## License

MIT License - see package.json for details

---

**Note**: This app uses sample data for demonstration purposes. For official collection information, always check with your local council.