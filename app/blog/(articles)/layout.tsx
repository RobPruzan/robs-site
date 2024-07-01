export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="w-full justify-start prose prose-sm max-w-none dark:prose-invert">
      {children}
    </article>
  );
}