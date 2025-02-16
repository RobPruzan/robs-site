'use client'

import Link from 'next/link'

interface Article {
  name: string
  title: string
  date: Date
}

interface BlogListProps {
  articles: Article[]
}

export function BlogList({ articles }: BlogListProps) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
      <div className="space-y-12">
        {articles.map((article) => (
          <Link
            key={article.name}
            href={`/blog/${article.name}`}
            className="block group"
          >
            <article className="space-y-2">
              <h2 className="text-xl text-white/90 font-mono group-hover:underline">
                {article.title}
              </h2>
              <div className="text-white/40 text-sm font-mono">
                {article.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
} 