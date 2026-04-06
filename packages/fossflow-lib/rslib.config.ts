import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';

const publicUrl = process.env.PUBLIC_URL || '';
const assetPrefix = publicUrl
  ? publicUrl.endsWith('/')
    ? publicUrl
    : publicUrl + '/'
  : '/';

const rootNodeModules = path.resolve(__dirname, '../../node_modules');

export default defineConfig({
  plugins: [pluginReact()],
  resolve: {
    alias: {
      '@': './src',
      react: path.join(rootNodeModules, 'react'),
      'react-dom': path.join(rootNodeModules, 'react-dom')
    }
  },
  source: {
    entry: {
      index: './src/app/index.tsx'
    },
    define: {
      'process.env.PUBLIC_URL': JSON.stringify(publicUrl),
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'production'
      )
    }
  },
  html: {
    template: './public/index.html',
    templateParameters: {
      assetPrefix: assetPrefix
    }
  },
  output: {
    distPath: {
      root: 'build'
    },
    polyfill: 'usage',
    assetPrefix: assetPrefix,
    copy: [
      {
        from: './src/i18n',
        to: 'i18n/app'
      }
    ]
  }
});