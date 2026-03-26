import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ─── Base path ────────────────────────────────────────────────────────────────
// `base: '/'`               → use when deploying to a custom domain
//                             (indiandivorcecoach.com via CNAME on GitHub Pages)
// `base: '/indiandivorcecoach/'` → use when serving from GitHub subdomain
//                             (username.github.io/indiandivorcecoach/)
//
// The CNAME file in public/ targets indiandivorcecoach.com, so '/' is correct.
// Change back to '/indiandivorcecoach/' only if the custom domain is removed.
const base = '/'

export default defineConfig({
  plugins: [react()],

  base,

  build: {
    outDir:    'dist',
    sourcemap: false,        // disable in production for smaller builds
    minify:    'esbuild',    // esbuild is default and fastest
    target:    'es2015',     // broad browser support
    cssCodeSplit: true,      // split CSS per chunk for better caching

    rollupOptions: {
      output: {
        // Split vendor and animation libraries into separate cached chunks.
        // Browsers cache them independently — app code changes don't bust
        // the vendor or motion chunk.
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons'
          }
        },
      },
    },
  },

  server: {
    port: 3000,
    open: true,
    // Allow access from LAN for mobile testing
    host: true,
  },

  preview: {
    port: 4173,
    open: true,
  },
})
