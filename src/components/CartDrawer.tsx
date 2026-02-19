import { useCart } from '@/context/CartContext';

const CartDrawer = () => {
  const { isOpen, closeCart, items, removeItem, updateQty, totalFormatted } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-kaayu-primary/40 z-[2000]" onClick={closeCart} />
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[420px] max-w-full bg-kaayu-bg z-[2001] flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="bg-kaayu-primary px-6 py-5 flex items-center justify-between">
          <h3 className="font-heading text-xl text-white">Your Ritual Cart</h3>
          <button onClick={closeCart} className="text-white hover:text-kaayu-accent transition-colors text-2xl">×</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-kaayu-meadow text-lg">Your cart is empty</p>
              <p className="text-kaayu-meadow/70 text-sm mt-2">Begin your ritual journey</p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 bg-white rounded p-4 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-body text-sm font-semibold text-kaayu-text">{item.name}</h4>
                    <p className="text-kaayu-primary font-bold mt-1">{item.priceFormatted}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 border border-kaayu-primary rounded flex items-center justify-center text-kaayu-primary hover:bg-kaayu-primary hover:text-white transition-colors text-sm">−</button>
                      <span className="font-body text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 border border-kaayu-primary rounded flex items-center justify-center text-kaayu-primary hover:bg-kaayu-primary hover:text-white transition-colors text-sm">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-kaayu-meadow hover:text-red-500 transition-colors text-lg self-start">×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-kaayu-accent/30 px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-body font-semibold text-kaayu-text">Subtotal</span>
              <span className="font-body text-xl font-bold text-kaayu-primary">{totalFormatted}</span>
            </div>
            <button className="btn-kaayu-primary w-full">Proceed to Checkout</button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in-right { animation: slideInRight 0.3s ease forwards; }
      `}</style>
    </>
  );
};

export default CartDrawer;
