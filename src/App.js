import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import PostcodeSearch from './components/PostcodeSearch';
import CollectionSchedule from './components/CollectionSchedule';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPostcode, setSelectedPostcode] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    loadCSVData();
  }, []);

  const loadCSVData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/enhanced_postcode_bin_collection_schedule.csv');
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
          }
          
          // Process and clean the data
          const cleanedData = results.data
            .filter(row => row.Postcode && row.Postcode.trim() !== '')
            .map(row => ({
              ...row,
              // Parse the collection dates
              collectionDates: row.Next_2_Months_Dates ? 
                row.Next_2_Months_Dates.split('; ').filter(date => date.trim() !== '') : []
            }));
          
          setCollectionData(cleanedData);
          setLoading(false);
        },
        error: (error) => {
          setError(`Failed to parse CSV: ${error.message}`);
          setLoading(false);
        }
      });
    } catch (err) {
      setError(`Failed to load data: ${err.message}`);
      setLoading(false);
    }
  };

  const handlePostcodeSearch = (postcode) => {
    setSelectedPostcode(postcode);
    
    if (!postcode.trim()) {
      setFilteredData([]);
      return;
    }

    // Filter data by postcode (case-insensitive)
    const filtered = collectionData.filter(row => 
      row.Postcode.toLowerCase().includes(postcode.toLowerCase().trim())
    );
    
    setFilteredData(filtered);
  };

  const getUniquePostcodes = () => {
    const postcodes = [...new Set(collectionData.map(row => row.Postcode))];
    return postcodes.sort();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>❌ Error Loading Data</h2>
          <p>{error}</p>
          <button onClick={loadCSVData} className="retry-button">
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🗑️ UK Bin Collection Reminder</h1>
        <p>Find your bin collection schedule by postcode</p>
        <div className="stats">
          <span>📊 {collectionData.length} collection schedules</span>
          <span>📮 {getUniquePostcodes().length} postcodes</span>
          <span>🏛️ {[...new Set(collectionData.map(row => row.Council))].length} councils</span>
        </div>
      </header>

      <main className="app-main">
        <PostcodeSearch 
          onSearch={handlePostcodeSearch}
          availablePostcodes={getUniquePostcodes()}
          currentPostcode={selectedPostcode}
        />

        {selectedPostcode && (
          <CollectionSchedule 
            data={filteredData}
            postcode={selectedPostcode}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Data includes {[...new Set(collectionData.map(row => row.Council))].length} UK councils with domestic waste collection services</p>
      </footer>
    </div>
  );
}

export default App;