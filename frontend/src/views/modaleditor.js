import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './editor.css';

const ConsultationModal = ({ show, handleClose, handleSave, handleDelete }) => {
  const [editorData, setEditorData] = useState('');

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-fullscreen" centered>
      <Modal.Header closeButton>
        <Modal.Title>Rapport de consultation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={handleEditorChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Supprimer
        </Button>
        <Button variant="primary" onClick={() => handleSave(editorData)}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConsultationModal;
