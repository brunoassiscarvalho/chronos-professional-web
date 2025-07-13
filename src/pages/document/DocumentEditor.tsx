import { Paper } from '@mui/material';
import { Document } from '@react-pdf/renderer';
import { EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function DocumentEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  return (
    <Paper sx={{ minHeight: '70vh', padding: 3 }}>
      <Document>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </Document>
    </Paper>
  );
}
