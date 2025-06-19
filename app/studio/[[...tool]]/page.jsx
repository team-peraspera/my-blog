import { NextStudio } from 'next-sanity/studio'
import { metadata } from 'next-sanity/studio/metadata'
import config from '../../../sanity.config'

export { metadata }

export default function StudioPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&display=swap');
        
        /* Target Sanity Studio editor content */
        
        /* Main editor area */
        [data-testid="text-block_text"] {
          font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;
        }
        
        /* Target H1 specifically */
        [data-testid="text-block_text"] h1,
        [data-slate-node="element"][data-slate-inline="false"]:has(h1) h1,
        h1[class*="StyledHeading"] {
          font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;
          font-size: 50px !important;
          font-weight: 500 !important;
          text-transform: uppercase !important;
          color: #000000 !important;
          line-height: 1.2 !important;
          margin: 0.5em 0 !important;
        }
        
        /* Target H2 */
        [data-testid="text-block_text"] h2,
        h2[class*="StyledHeading"] {
          font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;
          font-size: 40px !important;
          font-weight: 500 !important;
          text-transform: uppercase !important;
          color: #000000 !important;
          line-height: 1.2 !important;
          margin: 0.5em 0 !important;
        }
        
        /* Target H3 */
        [data-testid="text-block_text"] h3,
        h3[class*="StyledHeading"] {
          font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;
          font-size: 32px !important;
          font-weight: 500 !important;
          text-transform: uppercase !important;
          color: #000000 !important;
          line-height: 1.2 !important;
          margin: 0.5em 0 !important;
        }
        
        /* Target paragraphs (Normal text) */
        [data-testid="text-block_text"] p,
        [data-testid="text-block_text"] div[contenteditable="true"] {
          font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;
          font-size: 18px !important;
          font-weight: 400 !important;
          color: #000000 !important;
          line-height: 1.6 !important;
        }
        
        /* Target the actual contenteditable spans */
        [data-testid="text-block_text"] span[data-slate-leaf="true"] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          text-transform: inherit !important;
          color: inherit !important;
        }
        
        /* Override any inline styles on the text */
        [data-testid="text-block_text"] * {
          font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;
        }
        
        /* Style the studio background */
        .sanity-studio {
          background-color: #FAFAFA !important;
        }
        
        /* Style the editor container */
        [data-testid="text-block_text"] {
          background-color: #FAFAFA !important;
          padding: 2rem !important;
          border-radius: 8px !important;
        }
      `}</style>
      <NextStudio config={config} />
    </>
  )
}
