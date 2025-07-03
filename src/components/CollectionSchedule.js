import React from 'react';
import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns';

const CollectionSchedule = ({ data, postcode }) => {
  if (!data || data.length === 0) {
    return (
      <div className="collection-schedule">
        <div className="no-results">
          <h3>❌ No Results Found</h3>
          <p>No collection schedule found for postcode: <strong>{postcode}</strong></p>
          <p>Please check your postcode and try again.</p>
        </div>
      </div>
    );
  }

  // Group data by postcode (there might be multiple postcodes in search results)
  const groupedByPostcode = data.reduce((acc, item) => {
    if (!acc[item.Postcode]) {
      acc[item.Postcode] = [];
    }
    acc[item.Postcode].push(item);
    return acc;
  }, {});

  const getBinColorEmoji = (color) => {
    const colorMap = {
      'Black': '⚫',
      'Blue': '🔵',
      'Green': '🟢',
      'Brown': '🟤',
      'Purple': '🟣',
      'White': '⚪',
      'Orange': '🟠',
      'Red': '🔴',
      'Yellow': '🟡',
      'Grey': '⚫',
      'Gray': '⚫'
    };
    return colorMap[color] || '🗑️';
  };

  const getNextCollectionDate = (dates) => {
    const today = new Date();
    for (const dateStr of dates) {
      try {
        const date = parseISO(dateStr);
        if (isAfter(date, today) || format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
          return date;
        }
      } catch (err) {
        continue;
      }
    }
    return null;
  };

  const formatDate = (dateStr) => {
    try {
      const date = parseISO(dateStr);
      return format(date, 'EEE, MMM d');
    } catch (err) {
      return dateStr;
    }
  };

  const getDaysUntilCollection = (dateStr) => {
    try {
      const date = parseISO(dateStr);
      const today = new Date();
      const diffTime = date.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today!';
      if (diffDays === 1) return 'Tomorrow';
      if (diffDays < 0) return 'Past';
      return `${diffDays} days`;
    } catch (err) {
      return '';
    }
  };

  return (
    <div className="collection-schedule">
      {Object.entries(groupedByPostcode).map(([postcodeKey, scheduleData]) => {
        const councilInfo = scheduleData[0];
        
        // Sort bins by next collection date
        const sortedSchedule = [...scheduleData].sort((a, b) => {
          const nextA = getNextCollectionDate(a.collectionDates);
          const nextB = getNextCollectionDate(b.collectionDates);
          if (!nextA && !nextB) return 0;
          if (!nextA) return 1;
          if (!nextB) return -1;
          return nextA.getTime() - nextB.getTime();
        });

        return (
          <div key={postcodeKey} className="postcode-results">
            <div className="postcode-header">
              <h2>📮 {postcodeKey}</h2>
              <div className="council-info">
                <h3>🏛️ {councilInfo.Council}</h3>
                <p>{councilInfo.Official_Council_Name}</p>
                <p>📍 {councilInfo.Region}, {councilInfo.Nation}</p>
                {councilInfo.Bin_Collection_URL && (
                  <p>
                    🌐 <a href={councilInfo.Bin_Collection_URL} target="_blank" rel="noopener noreferrer">
                      Official Collection Info
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="collection-grid">
              {sortedSchedule.map((item, index) => {
                const nextCollection = getNextCollectionDate(item.collectionDates);
                const nextDateStr = nextCollection ? format(nextCollection, 'yyyy-MM-dd') : null;
                
                return (
                  <div key={index} className="bin-card">
                    <div className="bin-header">
                      <h4>
                        {getBinColorEmoji(item.Bin_Color)} {item.Bin_Color} {item.Bin_Type}
                      </h4>
                      <span className="frequency-badge">{item.Collection_Frequency}</span>
                    </div>
                    
                    <div className="bin-details">
                      <p className="bin-description">{item.Bin_Description}</p>
                      <p className="bin-contents">
                        <strong>Contents:</strong> {item.Bin_Contents}
                      </p>
                    </div>

                    <div className="collection-info">
                      <div className="collection-day">
                        <strong>📅 Collection Day:</strong> {item.Collection_Day}s
                      </div>
                      
                      {nextDateStr && (
                        <div className="next-collection">
                          <strong>⏰ Next Collection:</strong>
                          <div className="next-date">
                            {formatDate(nextDateStr)}
                            <span className="days-until">
                              ({getDaysUntilCollection(nextDateStr)})
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="upcoming-dates">
                        <strong>📋 Upcoming Dates:</strong>
                        <div className="dates-list">
                          {item.collectionDates.slice(0, 4).map((date, dateIndex) => (
                            <span 
                              key={dateIndex} 
                              className={`date-chip ${dateIndex === 0 ? 'next-date-chip' : ''}`}
                            >
                              {formatDate(date)}
                            </span>
                          ))}
                          {item.collectionDates.length > 4 && (
                            <span className="more-dates">
                              +{item.collectionDates.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionSchedule;