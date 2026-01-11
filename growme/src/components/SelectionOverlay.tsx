import React, { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

interface SelectionOverlayProps {
    onSelect: (count: number) => void;
}

export const SelectionOverlay: React.FC<SelectionOverlayProps> = ({ onSelect }) => {
    const op = useRef<OverlayPanel>(null);
    const [value, setValue] = useState<number | null>(null);

    const handleSubmit = () => {
        if (value && value > 0) {
            onSelect(value);
            op.current?.hide();
        }
    };

    return (
        <>
            <Button
                type="button"
                icon="pi pi-chevron-down"
                label="Select Rows"
                onClick={(e) => op.current?.toggle(e)}
                className="p-button-secondary"
            />
            <OverlayPanel ref={op} showCloseIcon>
                <div className="flex flex-column gap-3 p-3" style={{ minWidth: '300px' }}>
                    <h3>Select Rows</h3>
                    <div className="flex gap-2 align-items-center">
                        <InputNumber
                            value={value}
                            onValueChange={(e) => setValue(e.value ?? null)}
                            placeholder="Number of rows..."
                            min={0}
                        />
                        <Button label="Submit" onClick={handleSubmit} />
                    </div>
                    <small className="text-500">
                        Enter the number of artworks you want to select from the start.
                    </small>
                </div>
            </OverlayPanel>
        </>
    );
};
