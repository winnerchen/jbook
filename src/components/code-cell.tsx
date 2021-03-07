import React, { useEffect, useState } from 'react';
import CodeEditor from './code-editor/index';
import Preview from './preview/index';
import bundle from '../bundler';
import Resizable from './resizable/index';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { content } = cell;
  const [err, setErr] = useState<Error | undefined>(undefined);
  const [code, setCode] = useState('');
  const { updateCell } = useActions();

  const onChange = (value: string) => {
    updateCell(cell.id, value);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(content);
      setCode(output.code);
      setErr(output.err);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue={content} onChange={onChange} />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
