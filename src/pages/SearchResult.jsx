import { useProductContext } from '../ProductContext';
import ProductCard from '@components/ProductCard';
import Button from '@components/Button';
import Section from '@components/Section';
import { Link } from 'react-router-dom';

export const SearchResult = () => {
  const { products, searchQuery } = useProductContext();
  const SearchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Section
      title="Search Result"
      headline={
        SearchedProducts.length > 0
          ? `The result of "${searchQuery}"`
          : `The searched products aren't Found`
      }
    >
      {SearchedProducts.length > 0 ? (
        <div className="flex items-center flex-wrap gap-2 justify-evenly py-4">
          {SearchedProducts.map((product) => {
            return (
              <ProductCard
                key={product.id}
                imgSrc={product.imgSrc}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                rating={product.rating}
                ratingCount={product.ratingCount}
                product={product}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center pt-6">
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      )}
    </Section>
  );
};
