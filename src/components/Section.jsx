const Section = ({ title, headline, children, isMultiHeadline = false }) => {
  return (
    <section className="mx-12 py-12">
      <h3 className="ml-6 relative text-basicRed font-poppins font-semibold after:content-[' '] after:w-5 after:h-10 after:bg-red-500 after:absolute after:left-[-24px] after:top-[-8px] ">
        {title}
      </h3>
      {isMultiHeadline ? (
        headline
      ) : (
        <h3 className="text-4xl font-semibold my-4">{headline}</h3>
      )}
      <h3></h3>

      {children}
    </section>
  );
};

export default Section;
