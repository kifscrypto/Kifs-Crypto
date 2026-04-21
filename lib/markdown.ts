export function parseMarkdown(content: string) {
  const paragraphs = content.split('\n\n').map((para) => {
    // Handle code blocks
    if (para.startsWith('```')) {
      const lines = para.split('\n').slice(1, -1)
      return { type: 'code', content: lines.join('\n') }
    }
    // Handle headings
    if (para.startsWith('# ')) return { type: 'h1', content: para.replace('# ', '') }
    if (para.startsWith('## ')) return { type: 'h2', content: para.replace('## ', '') }
    if (para.startsWith('### ')) return { type: 'h3', content: para.replace('### ', '') }
    // Handle lists
    if (para.startsWith('- ')) {
      const items = para.split('\n').filter((line) => line.startsWith('- '))
      return { type: 'list', content: items.map((item) => item.replace('- ', '')) }
    }
    // Handle bold paragraphs
    if (para.startsWith('**') && para.endsWith('**')) {
      return { type: 'bold', content: para.replace(/\*\*/g, '') }
    }
    // Regular paragraph
    return { type: 'paragraph', content: para }
  })
  return paragraphs
}

export const MARKDOWN_HELPERS = [
  { label: 'Heading 1', syntax: '# Your heading', example: '# Main Title' },
  { label: 'Heading 2', syntax: '## Your heading', example: '## Section Title' },
  { label: 'Bold', syntax: '**text**', example: 'This is **bold** text' },
  { label: 'List Item', syntax: '- item', example: '- First item\n- Second item' },
  { label: 'Code Block', syntax: '```\ncode\n```', example: '```\nconst x = 1\n```' },
]
