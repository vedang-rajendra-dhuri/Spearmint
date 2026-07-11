import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import { fetchProducts } from './services/productService';
import { getAIRecommendations } from './services/aiService';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [error, setError] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      setError('');
      const data = await fetchProducts();
      setProducts(data);
      console.log('Products loaded:', data.length);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleSearch = async (userPreference) => {
    if (!userPreference.trim()) {
      setError('Please enter a product preference.');
      setRecommendedProducts([]);
      setShowRecommendations(false);
      return;
    }

    try {
      setLoadingRecommendations(true);
      setError('');
      setRecommendedProducts([]);
      setShowRecommendations(false);
      
      console.log('Getting recommendations for:', userPreference);
      const recommendedIds = await getAIRecommendations(userPreference, products);
      
      console.log('Recommended IDs from AI:', recommendedIds);
      
      if (!Array.isArray(recommendedIds) || recommendedIds.length === 0) {
        console.log('No IDs returned from AI');
        setError('No matching products found for your preference.');
        setShowRecommendations(false);
        return;
      }
      
      const recommended = products.filter(product =>
        recommendedIds.includes(product.id)
      );
      
      console.log('Matched products count:', recommended.length);
      
      if (recommended.length === 0) {
        setError('No matching products found for your preference.');
        setShowRecommendations(false);
      } else {
        setRecommendedProducts(recommended);
        setShowRecommendations(true);
        console.log('Recommendations state set:', recommended.length, 'products');
        
        // Scroll to recommendations after a small delay to ensure render
        setTimeout(() => {
          const recommendationsSection = document.getElementById('recommendations-section');
          if (recommendationsSection) {
            recommendationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error('Error getting recommendations:', err);
      setRecommendedProducts([]);
      setShowRecommendations(false);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Product Recommendation System</h1>
        <p>Describe what product you're looking for.</p>
      </header>

      <main className="app-main">
        <SearchBar 
          onSearch={handleSearch}
          loading={loadingRecommendations}
        />

        {error && <div className="error-message">{error}</div>}

        {loadingProducts ? (
          <div className="loading-state">Loading products...</div>
        ) : (
          <>
            <section className="products-section">
              <h2>All Products</h2>
              <ProductList products={products} />
            </section>

            {loadingRecommendations && (
              <div className="loading-state">Getting AI recommendations...</div>
            )}

            {showRecommendations && recommendedProducts.length > 0 && (
              <section className="recommendations-section" id="recommendations-section">
                <h2>🎯 Recommended Products ({recommendedProducts.length})</h2>
                <ProductList products={recommendedProducts} />
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}