import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Heart, Star, Filter, X, Menu, ChevronDown } from 'lucide-react';

const MyntraClone = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Sample product data
  const sampleProducts = [
    {
      id: 1,
      name: "Casual Cotton T-Shirt",
      brand: "Roadster",
      price: 599,
      originalPrice: 999,
      discount: 40,
      rating: 4.2,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
      category: "Men",
      colors: ["Blue", "Black", "White"]
    },
    {
      id: 2,
      name: "Floral Print Dress",
      brand: "Libas",
      price: 1299,
      originalPrice: 2199,
      discount: 41,
      rating: 4.1,
      reviews: 856,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
      category: "Women",
      colors: ["Pink", "Blue", "Yellow"]
    },
    {
      id: 3,
      name: "Leather Formal Shoes",
      brand: "Blackberrys",
      price: 2499,
      originalPrice: 4999,
      discount: 50,
      rating: 4.3,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
      category: "Men",
      colors: ["Black", "Brown"]
    },
    {
      id: 4,
      name: "Denim Jacket",
      brand: "Levis",
      price: 3499,
      originalPrice: 5999,
      discount: 42,
      rating: 4.4,
      reviews: 2341,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop",
      category: "Women",
      colors: ["Blue", "Black"]
    },
    {
      id: 5,
      name: "Sports Sneakers",
      brand: "Nike",
      price: 4999,
      originalPrice: 7999,
      discount: 37,
      rating: 4.5,
      reviews: 3456,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop",
      category: "Men",
      colors: ["White", "Black", "Red"]
    },
    {
      id: 6,
      name: "Silk Saree",
      brand: "Sabyasachi",
      price: 8999,
      originalPrice: 15999,
      discount: 44,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop",
      category: "Women",
      colors: ["Red", "Gold", "Green"]
    },
    {
      id: 7,
      name: "Casual Jeans",
      brand: "Wrangler",
      price: 1899,
      originalPrice: 2999,
      discount: 37,
      rating: 4.0,
      reviews: 1876,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop",
      category: "Men",
      colors: ["Blue", "Black", "Grey"]
    },
    {
      id: 8,
      name: "Ethnic Kurta Set",
      brand: "Biba",
      price: 2199,
      originalPrice: 3499,
      discount: 37,
      rating: 4.2,
      reviews: 987,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=300&h=400&fit=crop",
      category: "Women",
      colors: ["Pink", "Blue", "White"]
    }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, sortBy, products]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
        >
          <Heart 
            size={16} 
            className={wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
          {product.discount}% OFF
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        <div className="flex items-center mb-2">
          <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors text-sm font-medium"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-pink-600">Myntra</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setSelectedCategory('Men')}
                className={`text-gray-700 hover:text-pink-600 font-medium ${selectedCategory === 'Men' ? 'text-pink-600' : ''}`}
              >
                Men
              </button>
              <button 
                onClick={() => setSelectedCategory('Women')}
                className={`text-gray-700 hover:text-pink-600 font-medium ${selectedCategory === 'Women' ? 'text-pink-600' : ''}`}
              >
                Women
              </button>
              <button 
                onClick={() => setSelectedCategory('Kids')}
                className="text-gray-700 hover:text-pink-600 font-medium"
              >
                Kids
              </button>
              <button className="text-gray-700 hover:text-pink-600 font-medium">
                Home & Living
              </button>
              <button className="text-gray-700 hover:text-pink-600 font-medium">
                Beauty
              </button>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-pink-600">
                <User size={20} />
              </button>
              <button className="p-2 text-gray-700 hover:text-pink-600">
                <Heart size={20} />
              </button>
              <button className="p-2 text-gray-700 hover:text-pink-600 relative">
                <ShoppingBag size={20} />
                {getTotalCartItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {getTotalCartItems()}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden p-2 text-gray-700"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <button 
              onClick={() => {setSelectedCategory('Men'); setShowMobileMenu(false);}}
              className="block w-full text-left py-2 text-gray-700 hover:text-pink-600"
            >
              Men
            </button>
            <button 
              onClick={() => {setSelectedCategory('Women'); setShowMobileMenu(false);}}
              className="block w-full text-left py-2 text-gray-700 hover:text-pink-600"
            >
              Women
            </button>
            <button className="block w-full text-left py-2 text-gray-700 hover:text-pink-600">
              Kids demo 
            </button>
            <button className="block w-full text-left py-2 text-gray-700 hover:text-pink-600">
              Home & Living
            </button>
            <button className="block w-full text-left py-2 text-gray-700 hover:text-pink-600">
              Beauty
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-600"
                >
                  <Filter size={20} />
                </button>
              </div>
              
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                {/* Category Filter */}
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Category</h3>
                  <div className="space-y-2">
                    {['All', 'Men', 'Women', 'Kids'].map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-2 text-pink-600"
                        />
                        <span className="text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-pink-600"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹0</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="discount">Discount</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory} 
                <span className="text-gray-500 ml-2">({filteredProducts.length} items)</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyntraClone;