import { useProductContext } from '../ProductContext';

import Section from '@components/Section';

const SearchResult = () => {
  const { products, searchQuery } = useProductContext();

  return (
    <Section
      title="Account Info"
      headline={`The searched products aren't Found`}
    ></Section>
  );
};

export default SearchResult;
