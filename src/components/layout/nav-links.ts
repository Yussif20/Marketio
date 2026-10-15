/** Links shown after the category menu on desktop and in the mobile drawer. Labels live under `header.<key>`. */
export const navLinks = [
  { href: "/products?sort=new", key: "newArrivals" },
  { href: "/products?sort=rating", key: "bestSellers" },
  { href: "/brands", key: "brands" },
  { href: "/products?sort=discount", key: "deals", highlight: true },
] as const;

/** Company pages, shown in the mobile drawer and the footer. */
export const pageLinks = [
  { href: "/about", key: "about" },
  { href: "/journal", key: "journal" },
  { href: "/contact", key: "contact" },
] as const;
