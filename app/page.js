'use client';
import { useState, useEffect } from 'react';
import { client } from '../sanity/lib/client';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load blog posts from Sanity when page loads
  useEffect(() => {
    async function fetchPosts() {
      try {
        const sanityPosts = await client.fetch(`
          *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
            _id,
            title,
            slug,
            excerpt,
            publishedAt,
            "author": author->name
          }
        `);
        
        setPosts(sanityPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback to dummy data if Sanity fails
        setPosts([
          {
            _id: 1,
            title: "Welcome to Team Per Aspera",
            excerpt: "Our journey to the stars begins with a single step. Here's what we're building and why it matters.",
            publishedAt: "2024-06-18",
            slug: { current: "welcome-to-team-per-aspera" }
          },
          {
            _id: 2,
            title: "Through Hardships to the Stars", 
            excerpt: "The meaning behind our name and the challenges we're tackling in the space industry.",
            publishedAt: "2024-06-17",
            slug: { current: "through-hardships-to-stars" }
          }
        ]);
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Hero_Background_v2.avif')`
        }}
      >
        {/* Overlay Box */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="relative w-4/5 max-w-4xl h-3/5 flex flex-col justify-start px-12 py-10"
            style={{ backgroundColor: '#FAFAFA' }}
          >
            {/* Logo - positioned at top left */}
            <div className="absolute top-10 left-12">
              <p 
                className="text-black"
                style={{ 
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  fontStyle: 'italic'
                }}
              >
                Per Aspera™
              </p>
            </div>
            
            {/* Main Content - centered vertically in remaining space */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Main Heading */}
              <h1 
                className="text-black uppercase mb-4"
                style={{ 
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: '50px',
                  lineHeight: '1.1',
                  letterSpacing: '0.02em'
                }}
              >
                JOIN THE RENAISSANCE
              </h1>
              
              {/* Subheading */}
              <h2 
                className="text-black uppercase mb-12"
                style={{ 
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 300,
                  fontSize: '15px',
                  lineHeight: '1.3',
                  letterSpacing: '0.05em'
                }}
              >
                DEEP TECH INSIGHTS, WISDOM AND WAR STORIES
              </h2>
              
              {/* Email Input and Subscribe Button */}
              <div className="flex gap-2 mb-6 max-w-md">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500"
                  style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '14px'
                  }}
                />
                <button
                  className="px-6 py-3 text-white uppercase hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: '#E55B5B',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                  }}
                >
                  Subscribe
                </button>
              </div>
              
              {/* Consent Text */}
              <div className="flex items-start gap-2 mb-8 max-w-md">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1"
                />
                <label 
                  htmlFor="consent"
                  className="text-gray-600"
                  style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '12px',
                    lineHeight: '1.4'
                  }}
                >
                  I consent to receive newsletters via email. <span className="underline cursor-pointer">Terms of use</span> and <span className="underline cursor-pointer">Privacy policy</span>.
                </label>
              </div>
            </div>
            
            {/* Free/No Spam Text - positioned at bottom */}
            <div className="absolute bottom-10 left-12">
              <p 
                className="text-black uppercase"
                style={{ 
                  fontFamily: '"Roboto Mono", "Courier New", monospace',
                  fontWeight: 300,
                  fontSize: '15px',
                  lineHeight: '1.3',
                  letterSpacing: '0.05em'
                }}
              >
                100% FREE. NO SPAM.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Blog Posts */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Latest Updates</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading posts...</p>
              </div>
            ) : (
              posts.map((post) => (
                <article key={post._id} className="bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-all shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-3 text-gray-900 hover:text-blue-600 transition-colors">
                      <a href={`/posts/${post.slug?.current || post.slug}`}>
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  
                  <a 
                    href={`/posts/${post.slug?.current || post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-500 font-semibold transition-colors"
                  >
                    Read full update
                    <span className="ml-2">→</span>
                  </a>
                </article>
              ))
            )}
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>© 2024 Team Per Aspera. Ad astra per aspera. 🌟</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default HomePage;