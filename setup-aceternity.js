/**
 * Aceternity UI Integration & Setup Roadmap
 * 
 * This file serves as a guide and configuration script to help you integrate 
 * Aceternity UI components into your Next.js project.
 * 
 * Run it with: node setup-aceternity.js
 */

const fs = require('fs');
const path = require('path');

console.log('\x1b[36m%s\x1b[0m', '==================================================');
console.log('\x1b[35m%s\x1b[0m', '        ACETERNITY UI SETUP ROADMAP & HELPER       ');
console.log('\x1b[36m%s\x1b[0m', '==================================================');

// 1. Check folder structure
const dirs = [
  'src/lib',
  'src/components',
  'src/components/ui',
  'content/projects'
];

console.log('\n\x1b[1m1. Checking Core Directories:\x1b[0m');
dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`  \x1b[32m✔ Created directory: ${dir}\x1b[0m`);
  } else {
    console.log(`  \x1b[34mℹ Directory exists: ${dir}\x1b[0m`);
  }
});

// 2. Check cn utility
console.log('\n\x1b[1m2. Checking Utility helpers:\x1b[0m');
const utilsPath = path.join(__dirname, 'src/lib/utils.ts');
if (fs.existsSync(utilsPath)) {
  console.log('  \x1b[32m✔ cn helper is ready in src/lib/utils.ts\x1b[0m');
} else {
  const cnCode = `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;
  fs.writeFileSync(utilsPath, cnCode);
  console.log('  \x1b[32m✔ Created cn helper at src/lib/utils.ts\x1b[0m');
}

// 3. Print roadmap details
console.log('\n\x1b[1m3. Aceternity UI Setup Roadmap:\x1b[0m');
console.log(`
  To integrate new components from Aceternity UI (https://ui.aceternity.com):

  \x1b[33mStep A: Install Required Dependencies\x1b[0m
  Ensure standard libraries are installed:
  $ npm install framer-motion clsx tailwind-merge lucide-react

  \x1b[33mStep B: Add Tailwind CSS v4 Customizations\x1b[0m
  In Tailwind v4, configure animations and grids in \x1b[36msrc/app/globals.css\x1b[0m using @theme or @utility:
  
  @theme {
    --animate-shimmer: shimmer 2.5s linear infinite;
  }
  
  @utility bg-grid-pattern {
    background-image: linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px);
    ...
  }

  \x1b[33mStep C: Copy Component Code\x1b[0m
  Place the component file inside \x1b[36msrc/components/ui/[component-name].tsx\x1b[0m.
  Make sure to update imports to match:
  import { cn } from "@/lib/utils";

  \x1b[33mStep D: Import and Use\x1b[0m
  Import the component in your Next.js pages:
  import { CardHoverEffect } from "@/components/ui/card-hover-effect";
`);

console.log('\x1b[36m%s\x1b[0m', '==================================================');
console.log('\x1b[32m%s\x1b[0m', '  Integration checklist verified. You are ready to go!');
console.log('\x1b[36m%s\x1b[0m', '==================================================');
