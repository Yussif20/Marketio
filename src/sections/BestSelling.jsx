import Section from '@components/Section';
import Button from '@components/Button';
import ProductCard from '@components/ProductCard';

import products from '../products.json';

import { useTranslation } from 'react-i18next';

const BestSelling = () => {
  const { t } = useTranslation();
  const productsData = products.products;

  const getTopRatedProducts = (productsData) => {
    // Sort products by the average rating in descending order
    const sortedProducts = productsData.sort(
      (a, b) => b.rating.average - a.rating.average
    );
    // Get the top 4 products
    return sortedProducts.slice(0, 4);
  };

  const { i18n } = useTranslation();

  // Get current language
  const currentLanguage = i18n.language;

  return (
    <Section
      title={t('sections.bestSelling.headline')}
      isMultiHeadline={true}
      headline={
        <div className="flex items-center justify-between my-4">
          <h3 className="text-4xl font-semibold mt-4">
            {t('sections.bestSelling.title')}
          </h3>
          <Button>{t('buttons.viewAll')}</Button>
        </div>
      }
    >
      <div className="flex items-center flex-wrap gap-2 justify-evenly">
        {getTopRatedProducts(productsData).map((product, index) => {
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

export default BestSelling;
