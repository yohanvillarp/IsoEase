import { useState, useEffect, useRef } from 'react';
import { flattenCollections } from '@isoflow/isopacks/dist/utils';
import isoflowIsopack from '@isoflow/isopacks/dist/isoflow';
import { useTranslation } from 'react-i18next';
import {
  DiagramData,
  mergeDiagramData,
  extractSavableData
} from '../shared/lib/diagram/diagramUtils';
import { StorageManager } from '../widgets/store-manager/ui/StorageManager';
import { DiagramManager } from '../widgets/diagram-manager/ui/DiagramManager';
import { storageManager } from '../shared/api/storage/storageService';
import ChangeLanguage from '../features/change-language/ui/ui/ChangeLanguage';
import { useIconPackManager, IconPackName } from '../features/icon-pack-toggle/model/iconPackManager';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { EditorPage } from '@/pages/editor-page';

// Load core isoflow icons (always loaded)
const coreIcons = flattenCollections([isoflowIsopack]);

interface SavedDiagram {
  id: string;
  name: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

function App() {
  // Get base path from PUBLIC_URL, ensure no trailing slash for React Router
  const publicUrl = process.env.PUBLIC_URL || '';
  // React Router basename should not have trailing slash
  const basename = publicUrl
    ? publicUrl.endsWith('/')
      ? publicUrl.slice(0, -1)
      : publicUrl
    : '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/display/:readonlyDiagramId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
