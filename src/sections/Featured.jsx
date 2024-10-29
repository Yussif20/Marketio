import Section from '../components/Section';
import Services from '../components/Services';

const Featured = () => {
  return (
    <Section title="Featured" headline="New Arrival">
      <div className="flex items-center justify-center">
        <Services />
      </div>
    </Section>
  );
};

export default Featured;
