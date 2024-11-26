import Section from '@components/Section';
import Button from '@components/Button';
import ProductCard from '@components/ProductCard';

import { productsData } from '../data';
import { useTranslation } from 'react-i18next';

const BestSelling = () => {
  const { t } = useTranslation();
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
        {productsData.map((product, index) => {
          if (index >= 4) return;
          return (
            <ProductCard
              key={product.id}
              imgSrc={product.imgSrc}
              secondImg={product.secondImg}
              firstColor={product.firstColor}
              secondColor={product.secondColor}
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
    </Section>
  );
};

export default BestSelling;
