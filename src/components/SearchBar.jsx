import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="E.g., I want a phone, I need a gaming laptop, Suggest wireless earbuds..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
      </button>
    </form>
  );
}
