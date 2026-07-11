export default function ProductCard({ product }) {
  if (!product) {
    return <div className="product-card">Product data unavailable</div>;
  }

  return (
    <div className="product-card">
      <div className="product-image">
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.title} onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200?text=No+Image';
          }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#f0f0f0' }}>
            No image
          </div>
        )}
      </div>
      <div className="product-content">
        <h3>{product.title || 'Untitled'}</h3>
        <p className="category">{product.category || 'Uncategorized'}</p>
        <p className="description">{product.description || 'No description'}</p>
        <div className="product-footer">
          <div className="price-rating">
            <span className="price">${product.price ? product.price.toFixed(2) : '0.00'}</span>
            <span className="rating">★ {product.rating ? product.rating.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}