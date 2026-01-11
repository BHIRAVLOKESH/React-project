import React from 'react';
import { DataTable } from 'primereact/datatable';
import type { DataTablePageEvent, DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Artwork } from '../types/artwork';

interface ArtworkTableProps {
    artworks: Artwork[];
    totalRecords: number;
    loading: boolean;
    first: number;
    rows: number;
    onPage: (event: DataTablePageEvent) => void;
    

    selectedArtworks: Artwork[];
    onToggleRow: (id: number, globalIndex: number) => void;
    onTogglePage: (works: Artwork[], pageIndex: number, limit: number, shouldSelect: boolean) => void;
}

export const ArtworkTable: React.FC<ArtworkTableProps> = ({
    artworks,
    totalRecords,
    loading,
    first,
    rows,
    onPage,
    selectedArtworks,
    onToggleRow
}) => {

    const handleSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Artwork[]>) => {
        const newSelection = e.value as Artwork[];
        const oldSelection = selectedArtworks;
        const added = newSelection.filter(item => !oldSelection.some(old => old.id === item.id));
        const removed = oldSelection.filter(item => !newSelection.some(newIt => newIt.id === item.id));
        added.forEach(item => {
            const indexOnPage = artworks.findIndex(a => a.id === item.id);
            if (indexOnPage !== -1) {
                const globalIndex = first + indexOnPage;
                onToggleRow(item.id, globalIndex);
            }
        });

        removed.forEach(item => {
            const indexOnPage = artworks.findIndex(a => a.id === item.id);
            if (indexOnPage !== -1) {
                const globalIndex = first + indexOnPage;
                onToggleRow(item.id, globalIndex);
            }
        });
    };

    return (
        <div className="card">
            <DataTable
                value={artworks}
                lazy
                dataKey="id"
                paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPage={onPage}
                loading={loading}
                selection={selectedArtworks}
                onSelectionChange={handleSelectionChange}
                selectionMode="checkbox"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Place of Origin"></Column>
                <Column field="artist_display" header="Artist"></Column>
                <Column field="inscriptions" header="Inscriptions"></Column>
                <Column field="date_start" header="Start Date"></Column>
                <Column field="date_end" header="End Date"></Column>
            </DataTable>
        </div>
    );
};
