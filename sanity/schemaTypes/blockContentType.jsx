cat > sanity/schemaTypes/blockContentType.jsx << 'EOF'
import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon, CodeIcon, PlayIcon} from '@sanity/icons'

const HelveticaH1 = ({children}) => (
  <h1 style={{
    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    fontSize: '50px',
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    lineHeight: '1.2',
    marginBottom: '0.5em'
  }}>
    {children}
  </h1>
)

const HelveticaH2 = ({children}) => (
  <h2 style={{
    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    fontSize: '40px',
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    lineHeight: '1.2',
    marginBottom: '0.5em'
  }}>
    {children}
  </h2>
)

const HelveticaH3 = ({children}) => (
  <h3 style={{
    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    fontSize: '32px',
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    lineHeight: '1.2',
    marginBottom: '0.5em'
  }}>
    {children}
  </h3>
)

const HelveticaH4 = ({children}) => (
  <h4 style={{
    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    fontSize: '24px',
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    lineHeight: '1.2',
    marginBottom: '0.5em'
  }}>
    {children}
  </h4>
)

const HelveticaH5 = ({children}) => (
  <h5 style={{
    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    fontSize: '20px',
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    lineHeight: '1.2',
    marginBottom: '0.5em'
  }}>
    {children}
  </h5>
)

const HelveticaH6 = ({children}) => (
  <h6 style={{
    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    fontSize: '16px',
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    lineHeight: '1.2',
    marginBottom: '0.5em'
  }}>
    {children}
  </h6>
)

const HelveticaNormal = ({children}) => (
  <p style={{
    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    fontSize: '18px',
    fontWeight: '400',
    color: '#000000',
    lineHeight: '1.6',
    margin: '1em 0'
  }}>
    {children}
  </p>
)

const HelveticaAccent = ({children}) => (
  <p style={{
    fontFamily: "'Roboto Mono', monospace",
    fontSize: '16px',
    fontWeight: '300',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#666666',
    margin: '1em 0'
  }}>
    {children}
  </p>
)

const HelveticaBlockquote = ({children}) => (
  <blockquote style={{
    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    fontSize: '18px',
    fontStyle: 'italic',
    color: '#000000',
    borderLeft: '4px solid #000000',
    paddingLeft: '1.5rem',
    margin: '1.5em 0'
  }}>
    {children}
  </blockquote>
)

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {
          title: 'Normal - Helvetica Neue 18px',
          value: 'normal',
          component: HelveticaNormal
        },
        {
          title: 'H1 - Helvetica Neue 50px Uppercase',
          value: 'h1',
          component: HelveticaH1
        },
        {
          title: 'H2 - Helvetica Neue 40px Uppercase',
          value: 'h2',
          component: HelveticaH2
        },
        {
          title: 'H3 - Helvetica Neue 32px Uppercase',
          value: 'h3',
          component: HelveticaH3
        },
        {
          title: 'H4 - Helvetica Neue 24px Uppercase',
          value: 'h4',
          component: HelveticaH4
        },
        {
          title: 'H5 - Helvetica Neue 20px Uppercase',
          value: 'h5',
          component: HelveticaH5
        },
        {
          title: 'H6 - Helvetica Neue 16px Uppercase',
          value: 'h6',
          component: HelveticaH6
        },
        {
          title: 'Accent - Roboto Mono Gray',
          value: 'accent',
          component: HelveticaAccent
        },
        {
          title: 'Quote - Helvetica Neue Italic',
          value: 'blockquote',
          component: HelveticaBlockquote
        },
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    
    defineArrayMember({
      type: 'object',
      name: 'customHtml',
      title: 'Custom HTML',
      icon: CodeIcon,
      fields: [
        {
          name: 'html',
          type: 'text',
          title: 'HTML Code',
          description: 'Enter custom HTML that will be rendered directly in your blog post',
          rows: 10,
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (optional)',
          description: 'Optional caption that appears below the HTML block'
        }
      ],
      preview: {
        select: {
          html: 'html',
          caption: 'caption'
        },
        prepare({html, caption}) {
          return {
            title: 'Custom HTML Block',
            subtitle: caption || html?.substring(0, 50) + '...' || 'No HTML content'
          }
        }
      }
    }),

    defineArrayMember({
      type: 'object',
      name: 'iframeEmbed',
      title: 'iframe/Video Embed',
      icon: PlayIcon,
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'Embed URL',
          description: 'URL for YouTube, Vimeo, CodePen, etc.',
          validation: Rule => Rule.required()
        },
        {
          name: 'aspectRatio',
          type: 'string',
          title: 'Aspect Ratio',
          description: 'Choose the aspect ratio for the embed',
          options: {
            list: [
              {title: '16:9 (Widescreen)', value: '16:9'},
              {title: '4:3 (Standard)', value: '4:3'},
              {title: '1:1 (Square)', value: '1:1'},
              {title: '21:9 (Ultra-wide)', value: '21:9'}
            ]
          },
          initialValue: '16:9'
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          description: 'Title for accessibility'
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (optional)',
          description: 'Optional caption that appears below the embed'
        }
      ],
      preview: {
        select: {
          url: 'url',
          title: 'title',
          aspectRatio: 'aspectRatio'
        },
        prepare({url, title, aspectRatio}) {
          return {
            title: title || 'iframe Embed',
            subtitle: `${url} (${aspectRatio})`
          }
        }
      }
    }),

    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }
      ]
    }),
  ],
})
EOF