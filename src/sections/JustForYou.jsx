import { useProductContext } from '../ProductContext';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import Section from '../components/Section';

const JustForYou = () => {
  const { t } = useTranslation();
  const { products } = useProductContext();

  const getTopRatedProducts = (productsData) => {
    // Sort products by the average rating in descending order
    const sortedProducts = productsData.sort(
      (a, b) => b.rating.average - a.rating.average
    );
    // Get the top 4 products
    return sortedProducts.slice(0, 4);
  };

  const { i18n } = useTranslation();

  const currentLanguage = i18n.language || 'en';

  return (
    <Section title={t('pages.wishlist.justForYou')} isMultiHeadline={false}>
      <div className="flex items-center flex-wrap gap-2 justify-evenly">
        {getTopRatedProducts(products).map((product, index) => {
          if (index >= 4) return;
          return (
            <ProductCard
              key={product.id}
              discount={product.price.discount}
              imgSrc={product.images.primary}
              secondImg={product.images.secondary}
              firstColor={product.colors.first}
              secondColor={product.colors.second}
              title={product.titles[currentLanguage]}
              price={product.price.current}
              oldPrice={product.price.old}
              rating={product.rating.average}
              ratingCount={product.rating.count}
              product={product}
            />
          );
        })}
      </div>
    </Section>
  );
};

export default JustForYou;
