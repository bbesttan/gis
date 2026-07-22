let cacheKecamatan = null;
let cacheDesa = null;

self.onmessage = async (e) => {
  const { type, filterVal } = e.data;
  try {
    if (type === 'kecamatan') {
      if (!cacheKecamatan) {
        const resp = await fetch('/data/gadm41_IDN_3.json');
        cacheKecamatan = await resp.json();
      }
      const prov = filterVal.toLowerCase().replace(/\s+/g, '').trim();
      const filtered = {
        type: 'FeatureCollection',
        features: cacheKecamatan.features.filter(f => {
          const name1 = (f.properties.NAME_1 || '').toLowerCase().replace(/\s+/g, '');
          return name1.includes(prov);
        })
      };
      self.postMessage({ success: true, type, data: filtered });
    } else if (type === 'desa') {
      if (!cacheDesa) {
        const resp = await fetch('/data/gadm41_IDN_4.json');
        cacheDesa = await resp.json();
      }
      const kab = filterVal.toLowerCase().replace(/^(kota|kabupaten)\s*/, '').replace(/\s+/g, '').trim();
      const filtered = {
        type: 'FeatureCollection',
        features: cacheDesa.features.filter(f => {
          const name2 = (f.properties.NAME_2 || '').toLowerCase().replace(/^(kota|kabupaten)\s*/, '').replace(/\s+/g, '');
          return name2 === kab || name2.includes(kab);
        })
      };
      self.postMessage({ success: true, type, data: filtered });
    }
  } catch (err) {
    self.postMessage({ success: false, type, error: err.message });
  }
};
