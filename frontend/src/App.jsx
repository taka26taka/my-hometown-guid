import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/shops.json')
      .then(response => {
        setShops(response.data.data ?? []);
      })
      .catch(error => {
        console.error('Axios error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Shops List</h1>
      <ul>
        {shops.map((shop, i) => (
          <li key={i}>
            <strong>{shop.name}</strong><br />
            {shop.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
