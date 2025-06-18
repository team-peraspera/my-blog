import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '1r7bb7w',
  dataset: 'production',
  useCdn: false,
  token: 'your-write-token', // You'll need a write token
  apiVersion: '2024-01-01',
})

const testPosts = [
  {
    _type: 'post',
    title: 'Welcome to Team Per Aspera',
    slug: {
      _type: 'slug',
      current: 'welcome-to-team-per-aspera'
    },
    publishedAt: new Date().toISOString(),
    excerpt: 'Our journey to the stars begins with a single step. Here\'s what we\'re building and why it matters.',
    body: [
      {
        _type: 'block',
        children: [{
          _type: 'span',
          text: 'Welcome to our space technology blog...'
        }]
      }
    ]
  }
]

// Add the posts
testPosts.forEach(async (post) => {
  try {
    const result = await client.create(post)
    console.log('Created post:', result.title)
  } catch (error) {
    console.error('Error creating post:', error)
  }
})