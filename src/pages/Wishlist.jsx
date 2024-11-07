import { useProductContext } from '../ProductContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { favorite } = useProductContext();

  return (
    <section className="py-6 px-12">
      <h2 className="font-poppins text-xl mb-4">Wishlist({favorite.length})</h2>
      {favorite.length === 0 ? (
        <p className="text-gray-400">No items in your favorite list.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4">
          {favorite.map((product) => (
            <ProductCard
              key={product.id}
              discount={product.discount}
              imgSrc={product.imgSrc}
              title={product.title}
              icon={product.icon}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              ratingCount={product.ratingCount}
              product={product}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Wishlist;
