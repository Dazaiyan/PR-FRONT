import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './TemplateSelectorModal.css';

interface TemplateSelectorModalProps {
    visible: boolean;
    onHide: () => void;
}

const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({ visible, onHide }) => {
    return (
        <Dialog header="Seleccione una Plantilla" visible={visible} onHide={onHide}>
            <p>Contenido del selector de plantilla</p>
            <Button label="Cerrar" onClick={onHide} />
        </Dialog>
    );
};

export default TemplateSelectorModal;
