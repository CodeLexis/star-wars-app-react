import React from 'react';
import './App.css';
import Table from './components/Table';

/** App
 * @return {node}
 */
function App() {
  return (
    <div id="app-container">
      <img
        alt="star-wars-logo"
        id="star-wars-logo"
        src="https://img.icons8.com/ios/256/FFE81F/star-wars.png"
      />

      <Table
        data={[
          {
            'name': 'Tomisin',
            'age': 18,
            'phone': '07065121509',
          },
          {
            'name': 'Tomisin',
            'age': 18,
            'phone': '07065121509',
          },
          {
            'name': 'Tomisin',
            'age': 18,
            'phone': '07065121509',
          },
          {
            'name': 'Tomisin',
            'age': 18,
            'phone': '07065121509',
          },
          {
            'name': 'Tomisin',
            'age': 18,
            'phone': '07065121509',
          },
        ]}
      />
    </div>
  );
}

export default App;
