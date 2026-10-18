import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('archive description and social metadata describe the visible downloads', () => {
  const html = readFileSync('index.html', 'utf8');
  const head = html.split('</head>')[0];
  const description = head.match(/<meta name="description" content="([^"]+)"/)[1];
  assert.match(description, /SQLite database and WebP images/);
  assert.ok(head.includes(`<meta property="og:description" content="${description}">`));
  assert.ok(head.includes(`<meta name="twitter:description" content="${description}">`));
  assert.match(head, /<meta name="twitter:card" content="summary">/);
  assert.match(html, /href="https:\/\/downloads.poaparchive.com\/archive.zip"/);
  assert.match(html, /href="https:\/\/downloads.poaparchive.com\/archive.zim"/);
});
