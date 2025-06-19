import { client } from '../../../sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

async function getPost(slug) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      excerpt,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `, { slug });

  return post;
}

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="helvetica-paragraph">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="helvetica-h1">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="helvetica-h2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="helvetica-h3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="helvetica-h4">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="helvetica-h5">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="helvetica-h6">
        {children}
      </h6>
    ),
    accent: ({ children }) => (
      <p className="helvetica-accent">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="helvetica-blockquote">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="helvetica-list">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="helvetica-list">
        {children}
      </ol>
    )
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="helvetica-list-item">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="helvetica-list-item">
        {children}
      </li>
    )
  },
  marks: {
    strong: ({ children }) => (
      <strong className="helvetica-strong">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="helvetica-em">{children}</em>
    ),
    link: ({ children, value }) => (
      <a 
        href={value.href}
        className="helvetica-link"
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },
  types: {
    customHtml: ({ value }) => (
      <div className="helvetica-embed">
        <div 
          className="w-full"
          dangerouslySetInnerHTML={{ __html: value.html }} 
        />
        {value.caption && (
          <p className="helvetica-caption">
            {value.caption}
          </p>
        )}
      </div>
    ),

    iframeEmbed: ({ value }) => {
      const aspectRatioClass = {
        '16:9': 'aspect-video',
        '4:3': 'aspect-[4/3]', 
        '1:1': 'aspect-square',
        '21:9': 'aspect-[21/9]'
      }[value.aspectRatio] || 'aspect-video';

      return (
        <div className="helvetica-embed">
          <div className={`relative w-full ${aspectRatioClass}`}>
            <iframe
              src={value.url}
              title={value.title || 'Embedded content'}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <p className="helvetica-caption">
              {value.caption}
            </p>
          )}
        </div>
      );
    },

    code: ({ value }) => (
      <div className="helvetica-code-container">
        <pre className="helvetica-code">
          <code>
            {value.code}
          </code>
        </pre>
        {value.language && (
          <p className="helvetica-code-language">
            Language: {value.language}
          </p>
        )}
      </div>
    ),

    image: ({ value }) => (
      <figure className="helvetica-image">
        <div className="w-full">
          <img
            src={value.asset.url}
            alt={value.alt || 'Blog post image'}
            className="w-full h-auto"
          />
        </div>
        {value.caption && (
          <figcaption className="helvetica-caption">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  }
};

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: `${post.title} | Per Aspera Blog`,
    description: post.excerpt || 'Read this post on Per Aspera Blog',
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [post.mainImage.asset.url] : [],
    }
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-300 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <a 
            href="/" 
            className="inline-flex items-center text-lg font-medium text-black hover:opacity-70 transition-opacity uppercase tracking-wide"
            style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" }}
          >
            <span className="mr-3">←</span>
            <span>Per Aspera Blog</span>
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <article className="max-w-3xl mx-auto">
          <header className="mb-16">
            <h1 className="helvetica-title">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 mb-10">
              {post.publishedAt && (
                <time className="helvetica-accent">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              
              {post.author && (
                <>
                  <span className="helvetica-accent">•</span>
                  <span className="helvetica-accent">By {post.author}</span>
                </>
              )}
            </div>

            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-4 mb-10">
                {post.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="helvetica-accent px-4 py-2 bg-white border border-gray-300"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {post.excerpt && (
              <p className="helvetica-excerpt">
                {post.excerpt}
              </p>
            )}
          </header>

          {post.mainImage && (
            <div className="mb-16">
              <img
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="prose-custom max-w-none">
            {post.body ? (
              <PortableText 
                value={post.body}
                components={portableTextComponents}
              />
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-black">
                  No content available for this post.
                </p>
              </div>
            )}
          </div>

          <footer className="mt-20 pt-12 border-t border-gray-300">
            <div className="text-center mb-8">
              <p className="helvetica-accent">
                "Ad astra per aspera" — Through hardships to the stars
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <a 
                href="/"
                className="helvetica-button"
              >
                <span className="mr-3">←</span>
                Back to all posts
              </a>
              
              <div className="helvetica-accent">
                © 2024 Team Per Aspera
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}
