export function iniciarMapaNDVI() {
    const mapaContainer = document.getElementById('mapa-ndvi');
    if (!mapaContainer) return; 


    const mapa = L.map('mapa-ndvi').setView([-21.1788, -44.9811], 15);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapa);

 
    const urlWMS = "https://api.eu-1.planet.com/ogc/wms/8c150558-3390-4bea-af59-8d789ccad892";
    
    
    L.tileLayer.wms(urlWMS, {
        layers: '3_NDVI-L1C', 
        format: 'image/png',
        transparent: true,
        attribution: '© Sentinel Hub',
        time: '2026-08-01/2026-08-31' 
    }).addTo(mapa);


    setTimeout(() => { mapa.invalidateSize(); }, 200);
}