export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  popular?: boolean;
  apiRequired?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: "all", name: "All Tools", icon: "Grid3X3", color: "#6366f1" },
  { id: "text-analysis", name: "Text Analysis", icon: "FileText", color: "#8b5cf6" },
  { id: "plagiarism", name: "Plagiarism", icon: "ShieldCheck", color: "#ef4444" },
  { id: "seo", name: "SEO Tools", icon: "Search", color: "#06b6d4" },
  { id: "keywords", name: "Keyword Tools", icon: "Key", color: "#f59e0b" },
  { id: "backlinks", name: "Backlink Tools", icon: "Link", color: "#10b981" },
  { id: "website-management", name: "Website Management", icon: "Globe", color: "#3b82f6" },
  { id: "content-tools", name: "Content Tools", icon: "PenTool", color: "#ec4899" },
  { id: "image-tools", name: "Image Tools", icon: "Image", color: "#14b8a6" },
  { id: "domain", name: "Domain Tools", icon: "AtSign", color: "#f97316" },
  { id: "utility", name: "Utility Tools", icon: "Wrench", color: "#64748b" },
  { id: "ai-tools", name: "AI Tools", icon: "Sparkles", color: "#a855f7" },
];

export const tools: Tool[] = [
  // Text Analysis Tools
  { id: "word-counter", name: "Word Counter", description: "Count words, characters, sentences, and paragraphs in your text.", category: "text-analysis", icon: "Hash", popular: true },
  { id: "grammar-checker", name: "Grammar Checker", description: "Check and fix grammar, spelling, and punctuation errors.", category: "text-analysis", icon: "CheckCircle", popular: true, apiRequired: "Claude AI" },
  { id: "readability-checker", name: "Readability Checker", description: "Analyze text readability with Flesch-Kincaid and other scores.", category: "text-analysis", icon: "BookOpen" },
  { id: "text-summarizer", name: "Text Summarizer", description: "Automatically summarize long articles and text content.", category: "text-analysis", icon: "AlignLeft", apiRequired: "Claude AI" },
  { id: "sentence-counter", name: "Sentence Counter", description: "Count the number of sentences in your text.", category: "text-analysis", icon: "List" },
  { id: "word-frequency-counter", name: "Word Frequency Counter", description: "Find the most frequently used words in your text.", category: "text-analysis", icon: "BarChart3" },
  { id: "character-counter", name: "Character Counter", description: "Count characters with and without spaces.", category: "text-analysis", icon: "Type" },
  { id: "paragraph-counter", name: "Paragraph Counter", description: "Count the number of paragraphs in your text.", category: "text-analysis", icon: "AlignJustify" },
  { id: "syllable-counter", name: "Syllable Counter", description: "Count syllables in words and text.", category: "text-analysis", icon: "Music" },

  // Plagiarism Tools
  { id: "plagiarism-checker", name: "Plagiarism Checker", description: "Detect duplicate and plagiarized content in your writing.", category: "plagiarism", icon: "ShieldCheck", popular: true, apiRequired: "Copyscape API or custom search API" },
  { id: "ai-content-detector", name: "AI Content Detector", description: "Detect AI-generated content in text passages.", category: "plagiarism", icon: "Bot", popular: true, apiRequired: "Claude AI" },
  { id: "paraphrasing-tool", name: "Paraphrasing Tool", description: "Rewrite and rephrase text while keeping the meaning.", category: "plagiarism", icon: "RefreshCw", popular: true, apiRequired: "Claude AI" },
  { id: "article-rewriter", name: "Article Rewriter", description: "Automatically rewrite articles with different wording.", category: "plagiarism", icon: "RotateCw", apiRequired: "Claude AI" },
  { id: "duplicate-content-checker", name: "Duplicate Content Checker", description: "Find duplicate content across the web.", category: "plagiarism", icon: "Copy", apiRequired: "Google Custom Search API" },

  // SEO Tools
  { id: "meta-tag-generator", name: "Meta Tag Generator", description: "Generate optimized meta tags for better search rankings.", category: "seo", icon: "Code", popular: true },
  { id: "serp-simulator", name: "SERP Simulator", description: "Preview how your page will appear in Google search results.", category: "seo", icon: "Monitor" },
  { id: "robots-txt-generator", name: "Robots.txt Generator", description: "Create a robots.txt file to control search engine crawling.", category: "seo", icon: "Bot" },
  { id: "sitemap-generator", name: "XML Sitemap Generator", description: "Generate XML sitemaps for better search engine indexing.", category: "seo", icon: "Map" },
  { id: "schema-markup-generator", name: "Schema Markup Generator", description: "Create structured data markup for rich search results.", category: "seo", icon: "Braces" },
  { id: "google-index-checker", name: "Google Index Checker", description: "Check if your pages are indexed by Google.", category: "seo", icon: "Search", apiRequired: "Google Custom Search API" },
  { id: "page-speed-checker", name: "Page Speed Checker", description: "Analyze your website loading speed and performance.", category: "seo", icon: "Gauge", popular: true, apiRequired: "Google PageSpeed Insights API (free)" },
  { id: "mobile-friendly-test", name: "Mobile Friendly Test", description: "Test if your website is mobile-friendly.", category: "seo", icon: "Smartphone", apiRequired: "Google Mobile-Friendly API" },
  { id: "open-graph-checker", name: "Open Graph Checker", description: "Verify your Open Graph meta tags for social sharing.", category: "seo", icon: "Share2" },
  { id: "htaccess-redirect-generator", name: "Htaccess Redirect Generator", description: "Generate .htaccess redirect rules easily.", category: "seo", icon: "ArrowRightLeft" },
  { id: "canonical-tag-checker", name: "Canonical Tag Checker", description: "Check canonical tags on your web pages.", category: "seo", icon: "Link2" },

  // Keyword Tools
  { id: "keyword-density-checker", name: "Keyword Density Checker", description: "Analyze keyword density and distribution in your content.", category: "keywords", icon: "Target", popular: true },
  { id: "keyword-suggestion-tool", name: "Keyword Suggestion Tool", description: "Get keyword suggestions for your SEO campaigns.", category: "keywords", icon: "Lightbulb", apiRequired: "Google Ads API or SEMrush API" },
  { id: "keyword-position-checker", name: "Keyword Position Checker", description: "Check your keyword rankings on Google.", category: "keywords", icon: "TrendingUp", apiRequired: "Google Custom Search API" },
  { id: "long-tail-keyword-finder", name: "Long Tail Keyword Finder", description: "Find long-tail keywords for niche targeting.", category: "keywords", icon: "Telescope", apiRequired: "Google Suggest API (free)" },
  { id: "keyword-competition-checker", name: "Keyword Competition Checker", description: "Analyze keyword competition and difficulty scores.", category: "keywords", icon: "Swords", apiRequired: "SEMrush API or Ahrefs API" },
  { id: "keyword-cpc-checker", name: "Keyword CPC Checker", description: "Check cost-per-click for keywords in Google Ads.", category: "keywords", icon: "DollarSign", apiRequired: "Google Ads API" },
  { id: "related-keywords-finder", name: "Related Keywords Finder", description: "Discover semantically related keywords.", category: "keywords", icon: "Network", apiRequired: "Google NLP API" },

  // Backlink Tools
  { id: "backlink-checker", name: "Backlink Checker", description: "Analyze backlinks pointing to any website.", category: "backlinks", icon: "ExternalLink", popular: true, apiRequired: "Ahrefs API or Moz API" },
  { id: "backlink-maker", name: "Backlink Maker", description: "Create quality backlinks for your website.", category: "backlinks", icon: "Link" },
  { id: "broken-link-checker", name: "Broken Link Checker", description: "Find and fix broken links on your website.", category: "backlinks", icon: "Unlink", apiRequired: "Web scraping / HTTP requests" },
  { id: "anchor-text-analyzer", name: "Anchor Text Analyzer", description: "Analyze anchor text distribution of backlinks.", category: "backlinks", icon: "Anchor", apiRequired: "Ahrefs API or Moz API" },
  { id: "domain-authority-checker", name: "Domain Authority Checker", description: "Check the domain authority score of any website.", category: "backlinks", icon: "Award", popular: true, apiRequired: "Moz API" },
  { id: "page-authority-checker", name: "Page Authority Checker", description: "Check the page authority score of any URL.", category: "backlinks", icon: "FileCheck", apiRequired: "Moz API" },
  { id: "spam-score-checker", name: "Spam Score Checker", description: "Check the spam score of a domain.", category: "backlinks", icon: "AlertTriangle", apiRequired: "Moz API" },

  // Website Management
  { id: "website-seo-score-checker", name: "Website SEO Score Checker", description: "Get an overall SEO health score for your website.", category: "website-management", icon: "Activity", popular: true, apiRequired: "Multiple APIs (PageSpeed, etc.)" },
  { id: "website-status-checker", name: "Website Status Checker", description: "Check if a website is up or down.", category: "website-management", icon: "Wifi" },
  { id: "ssl-checker", name: "SSL Certificate Checker", description: "Verify SSL certificate status and details.", category: "website-management", icon: "Lock" },
  { id: "whois-lookup", name: "WHOIS Lookup", description: "Look up domain registration information.", category: "website-management", icon: "Search", apiRequired: "WHOIS API (free options available)" },
  { id: "dns-lookup", name: "DNS Lookup", description: "Query DNS records for any domain.", category: "website-management", icon: "Server" },
  { id: "ip-lookup", name: "IP Lookup", description: "Get location and details for any IP address.", category: "website-management", icon: "MapPin", apiRequired: "ip-api.com (free)" },
  { id: "http-header-checker", name: "HTTP Header Checker", description: "Inspect HTTP response headers of any URL.", category: "website-management", icon: "FileCode" },
  { id: "redirect-checker", name: "Redirect Checker", description: "Trace and analyze URL redirects.", category: "website-management", icon: "ArrowRight" },
  { id: "website-screenshot-generator", name: "Website Screenshot Generator", description: "Capture full-page screenshots of websites.", category: "website-management", icon: "Camera", apiRequired: "Puppeteer / Screenshot API" },
  { id: "hosting-checker", name: "Hosting Checker", description: "Find out where a website is hosted.", category: "website-management", icon: "HardDrive" },

  // Content Tools
  { id: "lorem-ipsum-generator", name: "Lorem Ipsum Generator", description: "Generate placeholder text for design and development.", category: "content-tools", icon: "FileText" },
  { id: "text-to-speech", name: "Text to Speech", description: "Convert text to natural-sounding speech audio.", category: "content-tools", icon: "Volume2", apiRequired: "Web Speech API (browser built-in)" },
  { id: "speech-to-text", name: "Speech to Text", description: "Transcribe speech audio to text.", category: "content-tools", icon: "Mic", apiRequired: "Web Speech API (browser built-in)" },
  { id: "case-converter", name: "Case Converter", description: "Convert text between uppercase, lowercase, title case, and more.", category: "content-tools", icon: "CaseSensitive" },
  { id: "reverse-text-generator", name: "Reverse Text Generator", description: "Reverse text, words, or sentences.", category: "content-tools", icon: "Undo2" },
  { id: "text-to-binary", name: "Text to Binary Converter", description: "Convert text to binary code and vice versa.", category: "content-tools", icon: "Binary" },
  { id: "json-formatter", name: "JSON Formatter", description: "Format, validate, and beautify JSON data.", category: "content-tools", icon: "Braces" },
  { id: "html-to-text", name: "HTML to Text Converter", description: "Strip HTML tags and extract plain text.", category: "content-tools", icon: "Code" },
  { id: "url-encoder-decoder", name: "URL Encoder/Decoder", description: "Encode or decode URLs and query strings.", category: "content-tools", icon: "Link" },
  { id: "md5-generator", name: "MD5 Hash Generator", description: "Generate MD5 hashes from text strings.", category: "content-tools", icon: "Hash" },
  { id: "password-generator", name: "Password Generator", description: "Generate strong, secure passwords.", category: "content-tools", icon: "KeyRound" },
  { id: "uuid-generator", name: "UUID Generator", description: "Generate unique UUIDs/GUIDs.", category: "content-tools", icon: "Fingerprint" },

  // Image Tools
  { id: "image-compressor", name: "Image Compressor", description: "Compress images without losing quality.", category: "image-tools", icon: "Minimize2", popular: true },
  { id: "image-resizer", name: "Image Resizer", description: "Resize images to any dimensions.", category: "image-tools", icon: "Maximize2" },
  { id: "image-to-text", name: "Image to Text (OCR)", description: "Extract text from images using OCR technology.", category: "image-tools", icon: "ScanText", popular: true, apiRequired: "Tesseract.js (free, client-side)" },
  { id: "jpg-to-png", name: "JPG to PNG Converter", description: "Convert JPG images to PNG format.", category: "image-tools", icon: "Image" },
  { id: "png-to-jpg", name: "PNG to JPG Converter", description: "Convert PNG images to JPG format.", category: "image-tools", icon: "Image" },
  { id: "image-cropper", name: "Image Cropper", description: "Crop images to custom dimensions.", category: "image-tools", icon: "Crop" },
  { id: "webp-converter", name: "WebP Converter", description: "Convert images to and from WebP format.", category: "image-tools", icon: "FileImage" },
  { id: "qr-code-generator", name: "QR Code Generator", description: "Generate QR codes for URLs, text, and more.", category: "image-tools", icon: "QrCode" },
  { id: "favicon-generator", name: "Favicon Generator", description: "Create favicons from images for your website.", category: "image-tools", icon: "Sparkle" },
  { id: "reverse-image-search", name: "Reverse Image Search", description: "Find where an image appears online.", category: "image-tools", icon: "ImageSearch", apiRequired: "Google Vision API or TinEye API" },

  // Domain Tools
  { id: "domain-age-checker", name: "Domain Age Checker", description: "Find out how old a domain is.", category: "domain", icon: "Calendar", apiRequired: "WHOIS API" },
  { id: "domain-availability-checker", name: "Domain Availability Checker", description: "Check if a domain name is available for registration.", category: "domain", icon: "Globe", apiRequired: "Domain registrar API" },
  { id: "expired-domain-finder", name: "Expired Domain Finder", description: "Find recently expired domains with authority.", category: "domain", icon: "Clock", apiRequired: "ExpiredDomains.net API" },
  { id: "domain-ip-lookup", name: "Domain to IP Lookup", description: "Find the IP address of any domain.", category: "domain", icon: "MapPin" },
  { id: "bulk-domain-checker", name: "Bulk Domain Checker", description: "Check multiple domains at once.", category: "domain", icon: "Layers", apiRequired: "WHOIS API" },

  // Utility Tools
  { id: "color-picker", name: "Color Picker", description: "Pick and convert colors between HEX, RGB, and HSL.", category: "utility", icon: "Palette" },
  { id: "unit-converter", name: "Unit Converter", description: "Convert between different units of measurement.", category: "utility", icon: "ArrowLeftRight" },
  { id: "age-calculator", name: "Age Calculator", description: "Calculate age from date of birth.", category: "utility", icon: "Calendar" },
  { id: "bmi-calculator", name: "BMI Calculator", description: "Calculate Body Mass Index.", category: "utility", icon: "HeartPulse" },
  { id: "percentage-calculator", name: "Percentage Calculator", description: "Calculate percentages easily.", category: "utility", icon: "Percent" },
  { id: "word-to-pdf", name: "Word to PDF Converter", description: "Convert Word documents to PDF format.", category: "utility", icon: "FileDown" },
  { id: "pdf-to-word", name: "PDF to Word Converter", description: "Convert PDF files to editable Word documents.", category: "utility", icon: "FileUp" },
  { id: "timestamp-converter", name: "Timestamp Converter", description: "Convert between Unix timestamps and dates.", category: "utility", icon: "Timer" },
  { id: "base64-encoder", name: "Base64 Encoder/Decoder", description: "Encode and decode Base64 strings.", category: "utility", icon: "Binary" },
  { id: "csv-to-json", name: "CSV to JSON Converter", description: "Convert CSV data to JSON format.", category: "utility", icon: "Table" },

  // AI Tools
  { id: "ai-essay-writer", name: "AI Essay Writer", description: "Generate well-structured essays on any topic using AI.", category: "ai-tools", icon: "PenLine", popular: true, apiRequired: "Claude AI" },
  { id: "ai-story-generator", name: "AI Story Generator", description: "Create creative stories with AI assistance.", category: "ai-tools", icon: "BookOpen", apiRequired: "Claude AI" },
  { id: "ai-email-writer", name: "AI Email Writer", description: "Draft professional emails with AI.", category: "ai-tools", icon: "Mail", apiRequired: "Claude AI" },
  { id: "ai-code-generator", name: "AI Code Generator", description: "Generate code snippets in any programming language.", category: "ai-tools", icon: "Code", apiRequired: "Claude AI" },
  { id: "ai-image-generator", name: "AI Image Generator", description: "Create images from text descriptions.", category: "ai-tools", icon: "ImagePlus", apiRequired: "DALL-E API or Stable Diffusion API" },
  { id: "ai-chatbot", name: "AI Chatbot", description: "Interactive AI chatbot for various tasks.", category: "ai-tools", icon: "MessageSquare", apiRequired: "Claude AI" },
  { id: "ai-translator", name: "AI Translator", description: "Translate text between languages using AI.", category: "ai-tools", icon: "Languages", apiRequired: "Claude AI" },
  { id: "ai-title-generator", name: "AI Title Generator", description: "Generate catchy titles and headlines with AI.", category: "ai-tools", icon: "Heading", apiRequired: "Claude AI" },
];

export const popularTools = tools.filter((t) => t.popular);

export function getToolsByCategory(categoryId: string): Tool[] {
  if (categoryId === "all") return tools;
  return tools.filter((t) => t.category === categoryId);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  );
}
