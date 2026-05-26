import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data/blog-posts';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | SmileCraft Dental Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://smilecraftdental.com/blog/${slug}` },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

function renderContent(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <h3 key={i} className="text-xl font-bold mt-6 mb-2" style={{ color: '#0f172a' }}>{line.slice(2, -2)}</h3>;
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="ml-4 mb-1" style={{ color: '#334155' }}>{line.slice(2)}</li>;
    }
    if (line.trim() === '') return <br key={i} />;
    // Handle inline bold
    const parts = line.split(/\*\*(.*?)\*\*/g);
    if (parts.length > 1) {
      return (
        <p key={i} className="mb-3 leading-relaxed" style={{ color: '#334155' }}>
          {parts.map((part, j) => j % 2 === 0 ? part : <strong key={j}>{part}</strong>)}
        </p>
      );
    }
    return <p key={i} className="mb-3 leading-relaxed" style={{ color: '#334155' }}>{line}</p>;
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  const categoryColors: Record<string, string> = {
    'Dental Health': '#0d9488', 'Cosmetic': '#8b5cf6', 'Implants': '#3b82f6',
    'Orthodontics': '#f59e0b', 'Gum Health': '#ef4444', default: '#64748b',
  };
  const catColor = categoryColors[post.category] || categoryColors.default;

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-12" style={{ background: 'linear-gradient(135deg, #f8fafc, #f0fdfa)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4" style={{ background: catColor }}>
            {post.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
            {post.title}
          </h1>
          <p className="text-lg mb-6" style={{ color: '#64748b' }}>{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#94a3b8' }}>
            <span className="font-semibold" style={{ color: '#0d9488' }}>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>⏱ {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article image placeholder */}
          <div className="w-full h-64 rounded-2xl mb-8 flex items-center justify-center text-4xl"
            style={{ background: `linear-gradient(135deg, ${catColor}22, ${catColor}44)` }}>
            🦷
          </div>

          <article className="prose max-w-none">
            {renderContent(post.content)}
          </article>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#f0fdfa', color: '#0d9488', border: '1px solid #99f6e4' }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="mt-8 p-6 rounded-2xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <p className="font-semibold mb-3" style={{ color: '#0f172a' }}>Share this article</p>
            <div className="flex gap-3">
              <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' https://smilecraftdental.com/blog/' + slug)}`}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: '#25d366' }}>
                WhatsApp
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://smilecraftdental.com/blog/' + slug)}`}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: '#1da1f2' }}>
                Twitter
              </a>
            </div>
          </div>

          {/* Author box */}
          <div className="mt-8 p-6 rounded-2xl flex items-start gap-4" style={{ background: '#f0fdfa', border: '1px solid #99f6e4' }}>
            <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold"
              style={{ background: '#0d9488' }}>
              {post.author.split(' ').filter((_, i) => i > 0).map((n) => n[0]).join('')}
            </div>
            <div>
              <p className="font-bold" style={{ color: '#0f172a' }}>{post.author}</p>
              <p className="text-sm" style={{ color: '#0d9488' }}>{post.authorRole} at SmileCraft Dental Clinic</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-12" style={{ background: '#f8fafc' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((p) => (
                <a key={p.id} href={`/blog/${p.slug}`} className="p-5 rounded-2xl block card-hover" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-2 text-white" style={{ background: catColor }}>{p.category}</div>
                  <h3 className="font-bold mb-1 text-sm" style={{ color: '#0f172a' }}>{p.title}</h3>
                  <p className="text-xs" style={{ color: '#64748b' }}>{p.readTime}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
