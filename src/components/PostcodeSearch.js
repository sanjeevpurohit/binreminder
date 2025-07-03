import React, { useState } from 'react';

const PostcodeSearch = ({ onSearch, availablePostcodes, currentPostcode }) => {
  const [inputValue, setInputValue] = useState(currentPostcode || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Generate suggestions
    if (value.trim().length >= 2) {
      const filtered = availablePostcodes
        .filter(postcode => 
          postcode.toLowerCase().includes(value.toLowerCase().trim())
        )
        .slice(0, 10); // Limit to 10 suggestions
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    onSearch(inputValue);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (postcode) => {
    setInputValue(postcode);
    onSearch(postcode);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setInputValue('');
    onSearch('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="postcode-search">
      <div className="search-container">
        <h2>🔍 Search by Postcode</h2>
        
        <div className="search-input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter postcode (e.g., SW1A 1AA, B3 6NA, LE2 8IQ)"
            className="search-input"
            onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
          />
          
          <div className="search-buttons">
            <button onClick={handleSearch} className="search-button">
              🔍 Search
            </button>
            {inputValue && (
              <button onClick={clearSearch} className="clear-button">
                ❌ Clear
              </button>
            )}
          </div>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-container">
            <div className="suggestions-header">
              💡 Suggested postcodes:
            </div>
            <ul className="suggestions-list">
              {suggestions.map((postcode, index) => (
                <li 
                  key={index}
                  onClick={() => handleSuggestionClick(postcode)}
                  className="suggestion-item"
                >
                  📮 {postcode}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="search-help">
          <p>💡 <strong>Tips:</strong></p>
          <ul>
            <li>Type at least 2 characters to see suggestions</li>
            <li>Partial postcodes work (e.g., "SW1", "B3", "LE2")</li>
            <li>Available postcodes: {availablePostcodes.length} total</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostcodeSearch;