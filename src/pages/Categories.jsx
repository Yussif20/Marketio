import ProductCard from '@components/ProductCard';
import Section from '@components/Section';
import Button from '@components/Button';
import { useProductContext } from '../ProductContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { products, selectedCategory } = useProductContext();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language || 'en';

  // Filter products based on the selected category
  const searchedCategory = products.filter(
    (product) =>
      product.category.toLowerCase() === selectedCategory?.toLowerCase()
  );

  return (
    <Section
      title={t('pages.categoriesPage.title')}
      headline={
        searchedCategory.length > 0
          ? `${t('pages.categoriesPage.headline')} "${selectedCategory}"`
          : t('pages.categoriesPage.emptyText')
      }
    >
      {searchedCategory.length > 0 ? (
        <div className="flex items-center flex-wrap gap-2 gap-y-8 justify-evenly py-4">
          {searchedCategory.map((product) => (
            <ProductCard
              key={product.id}
              discount={product.price.discount}
              imgSrc={product.images.primary}
              secondImg={product.images.secondary}
              firstColor={product.colors.first}
              secondColor={product.colors.second}
              title={product.titles[currentLanguage] || product.titles['en']}
              price={product.price.current}
              oldPrice={product.price.old}
              rating={product.rating.average}
              ratingCount={product.rating.count}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center pt-6">
          <Link to="/">
            <Button>{t('buttons.continue')}</Button>
          </Link>
        </div>
      )}
    </Section>
  );
};

export default Categories;
