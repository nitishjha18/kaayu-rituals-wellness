import { useCart } from '@/context/CartContext';
import { useKaayuToast } from '@/context/ToastContext';
import { Link } from 'react-router-dom';
import type { Product } from '@/data/collections';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24"
        fill={i <= Math.floor(rating) ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2"
        className="star-filled">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const { showToast } = useKaayuToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceFormatted: product.priceFormatted,
      image: product.image,
    });
    showToast('Added to Cart ✓');
  };

  return (
    <Link to={`/product/${product.id}`}
      className="group bg-white rounded shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 overflow-hidden flex-shrink-0"
      style={{ width: '280px' }}>
      <div className="relative h-[260px] overflow-hidden">
        <img src={product.image} alt={product.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.badge && (
          <span className={`absolute top-3 left-3 ${product.badge === 'bestseller' ? 'badge-best' : 'badge-new'}`}>
            {product.badge === 'bestseller' ? 'Bestseller' : 'New'}
          </span>
        )}
        <button onClick={handleAdd}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-kaayu-primary flex items-center justify-center text-white hover:bg-kaayu-accent transition-colors shadow-md">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </button>
      </div>
      <div className="p-5">
        <StarRating rating={product.rating} />
        <h4 className="font-body text-[15px] font-semibold text-kaayu-text mt-2 line-clamp-2">{product.name}</h4>
        {product.concern && (
          <span className="inline-block text-xs text-kaayu-meadow bg-kaayu-bg px-2 py-0.5 rounded mt-2">{product.concern}</span>
        )}
        <p className="font-body text-xl font-bold text-kaayu-primary mt-3">{product.priceFormatted}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
