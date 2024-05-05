// src/components/Filter.js
import React, { useState } from 'react';

const Filter = ({ applyFilters }) => {
  const [minExperience, setMinExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);

  const handleApplyFilters = () => {
    applyFilters({ minExperience, companyName, location, remote });
  };

  return (
    <div className="filter">
      <label>
        Min. Experience:
        <input
          type="text"
          value={minExperience}
          onChange={e => setMinExperience(e.target.value)}
        />
      </label>
      <label>
        Company Name:
        <input
          type="text"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={remote}
          onChange={e => setRemote(e.target.checked)}
        /> Remote
      </label>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;
