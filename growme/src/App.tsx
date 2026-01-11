import { useState, useEffect, useMemo } from 'react';
import type { DataTablePageEvent } from 'primereact/datatable';

import 'primeflex/primeflex.css';
import './App.css';

import { fetchArtworks } from './services/api';
import type { Artwork } from './types/artwork';
import { useArtworkSelection } from './hooks/useArtworkSelection';
import { ArtworkTable } from './components/ArtworkTable';
import { SelectionOverlay } from './components/SelectionOverlay';

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 12,
    page: 1
  });

  const selection = useArtworkSelection();

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchArtworks(lazyParams.page, lazyParams.rows);
        if (isMounted) {
          setArtworks(response.data);
          setTotalRecords(response.pagination.total);
        }
      } catch (error) {
        console.error("Failed to fetch artworks", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => { isMounted = false; };
  }, [lazyParams]);

  const onPage = (event: DataTablePageEvent) => {
    setLazyParams({
      first: event.first,
      rows: event.rows,
      page: (event.page || 0) + 1
    });
  };

  const selectedArtworks = useMemo(() => {
    return selection.computeSelectedOnPage(artworks, lazyParams.page - 1, lazyParams.rows);
  }, [selection, artworks, lazyParams]);

  return (
    <div className="min-h-screen p-4 surface-ground">
      <div className="flex justify-content-between align-items-center mb-4">
        <div className="flex flex-column">
          <h1 className="text-3xl font-bold m-0 mb-2">Art Institute of Chicago Artworks</h1>
          <span className="text-secondary">Explore the collection with server-side pagination</span>
        </div>
        <div className="flex align-items-center gap-3">
          <div className="font-bold text-lg">
            Selected: <span className="text-primary">{selection.totalSelectedCount}</span> rows
          </div>
          <SelectionOverlay onSelect={selection.selectBulk} />
        </div>
      </div>

      <div className="surface-card p-4 shadow-2 border-round">
        <ArtworkTable
          artworks={artworks}
          totalRecords={totalRecords}
          loading={loading}
          first={lazyParams.first}
          rows={lazyParams.rows}
          onPage={onPage}

          selectedArtworks={selectedArtworks}
          onToggleRow={selection.toggleRow}
          onTogglePage={selection.togglePage}
        />
      </div>
    </div>
  );
}

export default App;
