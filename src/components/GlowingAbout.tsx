
import { createLucideIcon } from 'lucide-react';

// Define your custom icon using createLucideIcon
const XIcon = createLucideIcon('X', [
  ['svg', { role: 'img', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' }],
  ['title', { children: 'X' }], // Use a single object for the title element
  ['path', { d: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' }]
]);


export function GlowingAboutIcon() {
  return (
    <div className="relative group">
      <a href='https://x.com/Swapnil_Sonker4' target='_blank'>
      <XIcon className="h-6 w-8 text-gray-900 transition-colors duration-300 group-hover:text-gray-700" />
      </a>
      <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/20 blur-xl transition-all duration-300 -z-10" />
    </div>
  );
}