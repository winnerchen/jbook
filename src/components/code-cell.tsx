import React, { useCallback, useEffect, useRef, useState } from 'react';
import CodeEditor from './code-editor/index';
import Preview from './preview/index';
import bundle from '../bundler';
import Resizable from './resizable/index';

const CodeCell = () => {
  const initialValue = `import React from 'react';
  import ReactDOM from 'react-dom';
  
  const App = () => {
    return (<div>hi there!!</div>);
  };
  
  ReactDOM.render(<App />, document.getElementById('root'));`;

  const [input, setInput] = useState(initialValue);
  const [code, setCode] = useState('');

  const onChange = (value: string) => {
    setInput(value);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue={initialValue} onChange={onChange} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
