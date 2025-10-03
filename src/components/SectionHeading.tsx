type Props = { id?: string; title: string; subtitle?: string };

export default function SectionHeading({ id, title, subtitle }: Props) {
  return (
    <div id={id} className="mx-auto max-w-6xl px-4 pt-10">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
        <span className="inline-block bg-gradient-to-r from-pink-500 to-fuchsia-500 text-transparent bg-clip-text">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="mt-1 text-slate-600 dark:text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}
