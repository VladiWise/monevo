// app/manifest.ts
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Monevo',
    short_name: 'Monevo',
    description: 'An awesome invetment tracker',
    start_url: '/',
    display: 'standalone',
    background_color: 'red',
    theme_color: 'green',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    // screenshots: [
    //   {
    //     "src": "/screenshots/desktop.png",
    //     "sizes": "1280x800",
    //     "type": "image/png",
    //     "form_factor": "wide"
    //   },
    //   {
    //     "src": "/screenshots/mobile.png",
    //     "sizes": "750x1334",
    //     "type": "image/png"
    //   }
    // ]
  };
}
