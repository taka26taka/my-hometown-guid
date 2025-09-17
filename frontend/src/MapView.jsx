import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/my-hometown-guid/marker-icon-2x.png',
  iconUrl: '/my-hometown-guid/marker-icon.png',
  shadowUrl: '/my-hometown-guid/marker-shadow.png',
});

const MapView = ({ shops, selectedShop, selectedArea }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef({});

  const areaCenters = {
    morioka: [39.7036, 141.1527],
    kitakami: [39.2836, 141.1137],
    hanamaki: [39.3892, 141.1167],
  };

  // 初回のみマップ作成
  useEffect(() => {
    if (!mapRef.current) {
      const defaultCenter = areaCenters[selectedArea] || [39.7036, 141.1527];
      mapRef.current = L.map(mapContainerRef.current).setView(defaultCenter, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // マーカーの更新
  useEffect(() => {
    if (!mapRef.current) return;

    // 既存のマーカーを削除
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    shops.forEach(shop => {
      if (shop.lat && shop.lng) {
        const marker = L.marker([shop.lat, shop.lng]).addTo(mapRef.current);

        // 安全にカスタム要素を生成
        const popupDiv = L.DomUtil.create('div');
        popupDiv.innerHTML = `<strong>${shop.name}</strong><br>${shop.comment || ''}`;

        const btn = L.DomUtil.create('button', 'popup-btn', popupDiv);
        btn.innerText = '↓ 詳細を見る';
        btn.style.marginTop = '8px';
        btn.style.padding = '4px 8px';
        btn.style.background = '#ec4899'; // pink-500
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '12px';

        btn.onclick = () => {
          const target = document.getElementById(`shop-card-${shop.id}`);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.classList.add('ring', 'ring-pink-300', 'ring-offset-2');
            setTimeout(() => {
              target.classList.remove('ring', 'ring-pink-300', 'ring-offset-2');
            }, 2000);
          }
        };

        marker.bindPopup(popupDiv);
        markersRef.current[shop.id] = marker;
      }
    });
  }, [shops]);

  // 地域変更で中心位置移動
  useEffect(() => {
    const center = areaCenters[selectedArea];
    if (center && mapRef.current) {
      mapRef.current.setView(center, 13);
    }
  }, [selectedArea]);

  // 店舗選択でポップアップ表示＆ズーム
  useEffect(() => {
    if (selectedShop && mapRef.current) {
      const { lat, lng, id } = selectedShop;
      mapRef.current.setView([lat, lng], 16);
      const marker = markersRef.current[id];
      if (marker) marker.openPopup();
    }
  }, [selectedShop]);
  return (
    <div
      ref={mapContainerRef}
      id="map"
      className="h-[50vh] sm:h-[500px]"
    />
  );

};

export default MapView;