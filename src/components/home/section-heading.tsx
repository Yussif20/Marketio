interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  /** Rendered at the inline end, e.g. a countdown or a "View all" link. */
  children?: React.ReactNode;
}

export function SectionHeading({ id, eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-primary">
          <span className="inline-block h-5 w-2.5 rounded-sm bg-primary" aria-hidden />
          {eyebrow}
        </p>
        <h2 id={id} className="text-2xl font-bold sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
