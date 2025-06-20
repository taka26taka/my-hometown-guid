import { useEffect, useState } from 'react';
import axios from 'axios';
import MapView from './MapView';
import './index.css';

function App() {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedArea, setSelectedArea] = useState('morioka');

  // API取得
  useEffect(() => {
    axios.get('http://localhost:8000/api/shops.json')
      .then(res => setShops(res.data.data ?? []))
      .catch(err => console.error(err));
  }, []);

  // 地域フィルタ
  const filteredShops = shops.filter(shop => shop.area === selectedArea);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        盛岡・北上・花巻 おすすめスポット
      </h1>

      {/* 地域選択 */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedArea}
          onChange={e => setSelectedArea(e.target.value)}
          className="border rounded px-4 py-2 text-lg"
        >
          <option value="morioka">盛岡</option>
          <option value="kitakami">北上</option>
          <option value="hanamaki">花巻</option>
        </select>
      </div>

      {/* 地図 */}
      <div className="mb-10">
        <MapView shops={filteredShops} selectedShop={selectedShop} selectedArea={selectedArea} />
      </div>

      {/* 店舗カード */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShops.map((shop, i) => (
          <div
            key={i}
            onClick={() => setSelectedShop(shop)}
            className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{shop.name}</h2>
            <p className="text-gray-600 mb-1">{shop.description}</p>
            <p className="text-sm text-gray-500">{shop.address}</p>
            <a
              href={shop.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            >
              公式サイトへ
            </a>


          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
