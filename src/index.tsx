import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';

const App = () => {
  return (
    <div>
      <CodeCell />
      {/* <CodeCell /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
