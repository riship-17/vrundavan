const fs = require('fs');
const path = require('path');

const images = [
  "https://images.unsplash.com/photo-1541888081691-3e4a9057b1bc?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop"
];

const basePath = '/Users/rishi/Vrundavan/vrundavan';
const filesToProcess = [
  'src/data/projectsData.ts',
  'src/data/servicesData.ts',
  'src/pages/ServicesOverview.tsx',
  'src/pages/ProjectsOverview.tsx'
];

let imgIndex = 0;

filesToProcess.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace absolute @fs paths with cyclic unsplash images
  const regex = /\/@fs\/Users\/rishi\/\.gemini[^"']*\.png/g;
  
  const newContent = content.replace(regex, () => {
    const url = images[imgIndex % images.length];
    imgIndex++;
    return url;
  });

  if (content !== newContent) {
    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log(`Updated paths in ${file}`);
  }
});
