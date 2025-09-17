import { useEffect, useState } from 'react';
import axios from 'axios';
import MapView from './MapView';
import './index.css';
import { useFavoriteShops } from './hooks/useFavoriteShops';

function App() {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedArea, setSelectedArea] = useState('morioka');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const { favorites, toggleFavorite, isFavorite } = useFavoriteShops();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/shops.json`)
      .then(res => setShops(res.data.data ?? []))
      .catch(err => console.error(err));
  }, []);

  const genres = Array.from(
    new Set(
      shops
        .filter(shop => shop.area === selectedArea)
        .map(shop => shop.genre)
        .filter(Boolean)
    )
  );

  const chosenByLabel = {
    groom: '新郎チョイス',
    bride: '新婦チョイス',
    both: '新郎・新婦チョイス',
  };

  const filteredShops = shops.filter(shop => {
    return (
      shop.area === selectedArea &&
      (selectedGenre === 'all' || shop.genre === selectedGenre) &&
      (!showOnlyFavorites || isFavorite(shop.id))
    );
  });

  return (
    <div className="bg-rose-50 min-h-screen py-8 px-4 font-serif">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-pink-600 mb-4 tracking-wide handwriting">
        盛岡・北上・花巻 おすすめマップ
      </h1>

      <p className="text-sm sm:text-base text-center text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
        本日は私たちの結婚式にご参加いただき、誠にありがとうございます。<br />
        盛岡・北上・花巻には、私たちの思い出の場所や大好きなお店がたくさんあります。<br />
        結婚式の前後に、ぜひ立ち寄ってみてください。
      </p>

      {/* 地域・ジャンル・お気に入り */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 sm:mb-10">
        {/* 地域 */}
        <select
          value={selectedArea}
          onChange={e => {
            setSelectedArea(e.target.value);
            setSelectedGenre('all');
          }}
          className="border border-pink-300 border-dashed rounded-full px-6 py-2 text-lg bg-white text-pink-600 focus:outline-none shadow-sm"
        >
          <option value="morioka">盛岡</option>
          <option value="kitakami">北上</option>
          <option value="hanamaki">花巻</option>
        </select>

        {/* ジャンル */}
        {genres.length > 0 && (
          <select
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
            className="border border-pink-300 border-dashed rounded-full px-6 py-2 text-lg bg-white text-pink-600 focus:outline-none shadow-sm"
          >
            <option value="all">すべてのジャンル</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        )}

        {/* お気に入りのみ */}
        <label className="flex items-center text-pink-600 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyFavorites}
            onChange={e => setShowOnlyFavorites(e.target.checked)}
            className="mr-2 w-4 h-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
          />
          お気に入りのみ表示
        </label>
      </div>

      {/* 地図 */}
      <div className="mb-8 sm:mb-12 border-2 border-dashed border-pink-200 rounded-xl overflow-hidden shadow-md">
        <MapView
          shops={filteredShops}
          selectedShop={selectedShop}
          selectedArea={selectedArea}
        />
      </div>

      {/* 店舗カード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredShops.map(shop => (
          <div
            key={shop.id}
            id={`shop-card-${shop.id}`} 
            onClick={() => setSelectedShop(shop)}
            className="relative bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border border-pink-100"
          >
            {/* お気に入り */}
            <button
              onClick={e => {
                e.stopPropagation();
                toggleFavorite(shop.id);
              }}
              className="absolute top-3 right-3 text-2xl text-pink-500 hover:text-pink-600 z-10"
              aria-label="お気に入り切替"
            >
              {isFavorite(shop.id) ? '♥' : '♡'}
            </button>

            {/* チョイス */}
            {shop.chosen_by && (
              <span className="inline-block bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full mb-2">
                #{chosenByLabel[shop.chosen_by] || 'ふたりの思い出の場所'}
              </span>
            )}
            {/* ジャンル */}
            {shop.genre && (
              <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full mb-2">
                #{shop.genre}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-semibold text-pink-700 mb-2 handwriting">
              {shop.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-2 leading-relaxed">{shop.description}</p>
            <p className="text-sm text-gray-500">{shop.address}</p>

            {/* 営業時間 */}
            {shop.open_time && shop.end_time && (
              <p className="text-xs text-gray-500 mt-1">
                営業時間：{shop.open_time.slice(0, 5)}〜{shop.end_time.slice(0, 5)}
              </p>
            )}

            {/* 駅からの距離 */}
            {shop.walk_minutes_from_station && (
              <p className="text-xs text-gray-400 mt-1">
                {shop.walk_minutes_from_station}分（駅から）
              </p>
            )}

            {/* 公式サイト */}
            {shop.official_url && (
              <a
                href={shop.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-pink-300 text-white px-4 py-2 rounded-full hover:bg-pink-400 text-sm shadow"
              >
                公式サイトへ
              </a>
            )}
          </div>
        ))}
      </div>

      {/* フッター */}
      <footer className="mt-16 text-center text-sm text-gray-500">
        ご来場ありがとうございました。
      </footer>
    </div>
  );
}

export default App;
