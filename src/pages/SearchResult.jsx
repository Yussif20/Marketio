import { useProductContext } from '../ProductContext';
import ProductCard from '@components/ProductCard';
import Button from '@components/Button';
import Section from '@components/Section';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SearchResult = () => {
  const { products, searchQuery } = useProductContext();

  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language || 'en';

  const SearchedProducts = products.filter(
    (product) =>
      (product.titles[currentLanguage] &&
        product.titles[currentLanguage]
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (product.titles['en'] &&
        product.titles['en'].toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Section
      title={t('pages.searchResult.title')}
      headline={
        SearchedProducts.length > 0
          ? `${t('pages.searchResult.headline')} "${searchQuery}"`
          : `${t('pages.searchResult.emptyText')}`
      }
    >
      {SearchedProducts.length > 0 ? (
        <div className="flex items-center flex-wrap gap-2 gap-y-8 justify-evenly py-4">
          {SearchedProducts.map((product) => {
            return (
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
            );
          })}
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
