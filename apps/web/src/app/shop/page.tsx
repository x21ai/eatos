// @ts-nocheck
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';

export default function ShopPage() {
  const products = [
    {
      id: 'pro',
      name: 'eatOS Pro',
      category: 'Terminals',
      price: '$999',
      image: 'https://raw.createusercontent.com/75fa62cf-3729-443e-a8de-86db72e732a9/',
      badge: 'Best Seller',
      link: '/hardware/pro',
    },
    {
      id: 'mini',
      name: 'eatOS Mini',
      category: 'Handhelds',
      price: '$299',
      image: null, // CSS Placeholder
      badge: 'New',
      link: '/hardware/mini',
    },
    {
      id: 'kitchen',
      name: 'Kitchen Display',
      category: 'Screens',
      price: '$399',
      image: null,
      link: '/hardware',
    },
    {
      id: 'printer',
      name: 'Thermal Printer',
      category: 'Accessories',
      price: '$199',
      image: null,
      link: '/hardware',
    },
    {
      id: 'stand',
      name: 'Swivel Stand',
      category: 'Accessories',
      price: '$49',
      image: null,
      link: '/hardware',
    },
    {
      id: 'drawer',
      name: 'Cash Drawer',
      category: 'Accessories',
      price: '$79',
      image: null,
      link: '/hardware',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header Space */}
      <div className="h-20"></div>

      {/* Hero */}
      <section className="bg-white pt-20 pb-16 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Shop Hardware</h1>
          <p className="text-xl text-gray-500 max-w-2xl">
            Premium hardware designed for speed, durability, and style.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.link || '#'}
                className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative aspect-square bg-gray-50 rounded-2xl mb-6 overflow-hidden flex items-center justify-center">
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      {product.badge}
                    </div>
                  )}

                  {/* Product Placeholder / Image */}
                  <div className="w-2/3 h-2/3 bg-white shadow-lg rounded-xl flex items-center justify-center text-gray-300 font-medium group-hover:scale-105 transition-transform duration-500">
                    {product.id === 'pro' ? (
                      <div className="w-full h-full bg-zinc-900 rounded-xl relative p-2">
                        <div className="w-full h-full bg-black rounded-lg border border-gray-800"></div>
                      </div>
                    ) : product.id === 'mini' ? (
                      <div className="w-1/2 h-full bg-zinc-900 rounded-xl relative"></div>
                    ) : (
                      <ShoppingBag size={32} />
                    )}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="text-sm text-gray-500 font-medium mb-1">{product.category}</div>
                  <div className="flex justify-between items-end">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <div className="text-lg font-medium text-gray-900">{product.price}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Need help choosing?</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Our specialists can help you design the perfect setup for your restaurant's floor plan
            and volume.
          </p>
          <a
            href="/contact-sales"
            className="inline-flex items-center gap-2 text-black font-bold border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            Talk to an Expert <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
