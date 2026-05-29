import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutGrid, List, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import { productCategories, starterProducts } from '../data/siteData'

export default function ProductCatalog({ admin = false }) {
  const [products, setProducts] = useState(() => {
    const savedProducts = window.localStorage.getItem('yukti-artful-products')
    return savedProducts ? JSON.parse(savedProducts) : starterProducts
  })
  const [productFilter, setProductFilter] = useState('All')
  const [availabilityFilter, setAvailabilityFilter] = useState('All')
  const [priceFilter, setPriceFilter] = useState('All')
  const [productSort, setProductSort] = useState('featured')
  const [productView, setProductView] = useState('grid')
  const [cartCount, setCartCount] = useState(0)

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatches = productFilter === 'All' || product.category === productFilter
      const availabilityMatches = availabilityFilter === 'All' || product.availability === availabilityFilter
      const priceMatches =
        priceFilter === 'All' ||
        (priceFilter === 'under-500' && product.price < 500) ||
        (priceFilter === '500-1000' && product.price >= 500 && product.price <= 1000) ||
        (priceFilter === '1000-plus' && product.price > 1000)
      return categoryMatches && availabilityMatches && priceMatches
    })

    return [...filtered].sort((a, b) => {
      if (productSort === 'price-low') return a.price - b.price
      if (productSort === 'price-high') return b.price - a.price
      if (productSort === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }, [availabilityFilter, priceFilter, productFilter, productSort, products])

  return (
    <div className="product-catalog">
      <div className="cart-summary">
        <ShoppingBag size={18} />
        <span>{cartCount} items in cart</span>
      </div>
      <div className="product-toolbar">
        <div className="product-controls">
          <label>
            Availability
            <select value={availabilityFilter} onChange={(event) => setAvailabilityFilter(event.target.value)}>
              <option>All</option>
              <option>In Stock</option>
              <option>Made To Order</option>
              <option>Sold Out</option>
            </select>
          </label>
          <label>
            Price
            <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
              <option value="All">All</option>
              <option value="under-500">Under Rs. 500</option>
              <option value="500-1000">Rs. 500 - Rs. 1000</option>
              <option value="1000-plus">Above Rs. 1000</option>
            </select>
          </label>
        </div>
        <div className="product-meta">
          <span>{visibleProducts.length} items</span>
          <label>
            Sort
            <select value={productSort} onChange={(event) => setProductSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price low to high</option>
              <option value="price-high">Price high to low</option>
              <option value="name">Name A-Z</option>
            </select>
          </label>
          <div className="view-toggle">
            <button className={productView === 'grid' ? 'active' : ''} type="button" onClick={() => setProductView('grid')}>
              <LayoutGrid size={18} />
            </button>
            <button className={productView === 'list' ? 'active' : ''} type="button" onClick={() => setProductView('list')}>
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="product-category-row">
        <SlidersHorizontal size={18} />
        {productCategories.map((category) => (
          <button className={`filter-btn ${productFilter === category ? 'active' : ''}`} key={category} type="button" onClick={() => setProductFilter(category)}>
            {category}
          </button>
        ))}
      </div>
      <motion.div className={`product-grid ${productView === 'list' ? 'list-view' : ''}`} layout>
        <AnimatePresence>
          {visibleProducts.map((product) => (
            <motion.article className="product-card" key={product.id} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}>
              <div className="product-image" style={{ '--art': product.art, backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : undefined }}>
                <span>{product.badge}</span>
              </div>
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>
                <div className="product-price">Rs. {product.price.toFixed(2)}</div>
                <div className={`availability ${product.availability === 'Sold Out' ? 'sold-out' : ''}`}>{product.availability}</div>
                <button className="add-cart-btn" type="button" disabled={product.availability === 'Sold Out'} onClick={() => setCartCount((count) => count + 1)}>
                  <ShoppingBag size={18} />
                  {product.availability === 'Sold Out' ? 'Unavailable' : 'Add to cart'}
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {admin && <button className="btn btn-secondary admin-save-note" type="button" onClick={() => setProducts(starterProducts)}>Reset Public Products</button>}
    </div>
  )
}
