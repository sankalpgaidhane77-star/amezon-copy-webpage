// Dynamic functionality for Amazon clone webpage

document.addEventListener('DOMContentLoaded', () => {
  // 1. Back to Top smooth scroll
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. Add dynamic interactive element: Simulate adding items to cart when clicking product images/cards
  const cartCountEl = document.querySelector('.cart-count');
  let cartCount = 0;

  // Let's add click listeners to the product card items to simulate adding to cart
  const cards = document.querySelectorAll('.card, .grid-item');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Avoid triggering when clicking links directly
      if (e.target.tagName.toLowerCase() === 'a') return;
      
      cartCount++;
      if (cartCountEl) {
        cartCountEl.textContent = cartCount;
        
        // Add a scale-up animation to the cart when count increases
        const cartIcon = document.querySelector('.cart-icon-container');
        if (cartIcon) {
          cartIcon.style.transform = 'scale(1.2)';
          cartIcon.style.transition = 'transform 0.15s ease';
          setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
          }, 1500);
        }

        // Show a temporary "Added to Cart" popup
        showToast('Added item to cart!');
      }
    });
  });

  // Toast notification helper
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      // Styling toast
      Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#232f3e',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '4px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '1000',
        fontFamily: 'inherit',
        fontSize: '14px',
        fontWeight: '500',
        opacity: '0',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        transform: 'translateY(20px)',
        borderLeft: '4px solid #febd69'
      });
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 2500);
  }

  // 3. Search Bar interactive behavior
  const searchInput = document.querySelector('.search-input');
  const searchIcon = document.querySelector('.search-icon');
  
  if (searchInput && searchIcon) {
    searchIcon.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        showToast(`Searching for: "${query}"`);
      } else {
        showToast('Please enter a search query.');
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          showToast(`Searching for: "${query}"`);
        }
      }
    });
  }
});
