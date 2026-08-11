const fs = require('fs');
const path = require('path');
const https = require('https');

// Helper to convert HTML to Markdown (basic)
function htmlToMarkdown(html) {
  if (!html) return '';
  let md = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<div>/gi, '')
    .replace(/<b>(.*?)<\/b>/gi, '**$1**')
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<i>(.*?)<\/i>/gi, '*$1*')
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n')
    .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<ul>(.*?)<\/ul>/gi, '$1\n')
    .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
    .replace(/&nbsp;/gi, ' ')
    .replace(/<[^>]*>?/gm, ''); // Remove remaining tags
  return md.trim();
}

// Ensure the projects directory exists
const contentDir = path.join(process.cwd(), 'content', 'projects');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Fetch the data
https.get('https://data.youthactivismnepal.org.np/data/Projects', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const projects = json.data || [];
      
      let count = 0;
      projects.forEach((proj) => {
        if (!proj.id || !proj.name) return;
        
        const slug = proj.id.toLowerCase();
        // Convert date string if possible, or use 'role' as string
        let dateStr = proj.startDate || proj.created_at || new Date().toISOString();
        if (proj.role && !proj.role.includes(' ')) {
           // sometimes role is a year or date
           if (!isNaN(parseInt(proj.role))) {
              dateStr = `${proj.role}-01-01`;
           }
        }
        
        const contentMarkdown = htmlToMarkdown(proj.content);
        
        // Build frontmatter
        const mdxContent = `---
title: "${proj.name.replace(/"/g, '\\"')}"
description: "${(proj.subheading || proj.heading || '').replace(/"/g, '\\"').replace(/\n/g, ' ')}"
tags: ["${proj.badge || 'Project'}"]
image: "${proj.image || ''}"
featured: false
date: "${dateStr.split('T')[0]}"
---

# ${proj.heading || proj.name}

${proj.subheading ? `**${proj.subheading}**\n` : ''}
${contentMarkdown}
`;
        
        const filePath = path.join(contentDir, `${slug}.mdx`);
        fs.writeFileSync(filePath, mdxContent, 'utf8');
        count++;
        console.log(`Created ${slug}.mdx`);
      });
      console.log(`Successfully imported ${count} projects.`);
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  });
}).on('error', (e) => {
  console.error('Error fetching data:', e);
});
