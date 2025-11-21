import React from 'react';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export default function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  // Function to process content and ensure image URLs are absolute if needed
  // Note: In a real production app, you might want to use a library like 'dompurify' to sanitize HTML
  // But since this content comes from our trusted admin, we'll assume it's safe for now.
  
  const processedContent = content.replace(
    /src="\/media\//g,
    `src="${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/media/`
  );

  return (
    <div 
      className={`prose prose-lg max-w-none 
        prose-headings:text-primary prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900
        prose-img:rounded-lg prose-img:shadow-md
        ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
