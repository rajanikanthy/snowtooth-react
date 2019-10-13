import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
<<<<<<< HEAD
  ReactDOM.unmountComponentAtNode(div);
=======
>>>>>>> 5cbb1dcaaaeb83d71c043ce547286ef6b1aaf65b
});
