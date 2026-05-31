import fs from 'fs';
import path from 'path';

const basePath = '/Users/rishi/Vrundavan/vrundavan';
const publicImagesDir = path.join(basePath, 'public', 'images');

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

const filesToProcess = [
  'src/data/projectsData.ts',
  'src/data/servicesData.ts',
  'src/pages/ServicesOverview.tsx',
  'src/pages/ProjectsOverview.tsx',
  'src/pages/HomePage.tsx',
  'src/components/Hero.tsx',
  'src/components/About.tsx',
];

const regex = /\/(@fs)?(\/Users\/rishi\/\.gemini\/antigravity-ide\/brain\/[a-f0-9-]+\/([a-zA-Z0-9_]+\.png))/g;

filesToProcess.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');
  let match;
  let changed = false;

  while ((match = regex.exec(content)) !== null) {
    const originalAbsolute = match[2];
    const fileName = match[3];
    
    // Copy file
    if (fs.existsSync(originalAbsolute)) {
      const destPath = path.join(publicImagesDir, fileName);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(originalAbsolute, destPath);
        console.log(`Copied ${fileName}`);
      }
    }
  }

  // Replace paths in content
  const newContent = content.replace(regex, '/images/$3');
  if (content !== newContent) {
    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log(`Updated paths in ${file}`);
  }
});
