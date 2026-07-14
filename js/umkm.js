/**
 * umkm.js
 * Handles public data rendering (Directories, Products, Detail)
 */

document.addEventListener('DOMContentLoaded', () => {
  const umkmGrid = document.getElementById('umkmGrid');
  const produkGrid = document.getElementById('produkGrid');
  const detailContainer = document.getElementById('detailUmkmContainer');

  // Render UMKM Directory Page
  if (umkmGrid) {
    renderUMKMList(getUMKMData());

    // Filters
    const filterSelect = document.getElementById('filterKategori');
    const searchInput = document.getElementById('searchUMKM');

    function applyFilters() {
      const cat = filterSelect ? filterSelect.value.toLowerCase() : '';
      const query = searchInput ? searchInput.value.toLowerCase() : '';
      let data = getUMKMData();

      if (cat) data = data.filter(item => item.kategori.toLowerCase() === cat);
      if (query) data = data.filter(item => 
        item.namaUMKM.toLowerCase().includes(query) || 
        item.deskripsi.toLowerCase().includes(query)
      );

      renderUMKMList(data);
    }

    if (filterSelect) filterSelect.addEventListener('change', applyFilters);
    if (searchInput) searchInput.addEventListener('input', applyFilters);
  }

  // Render Produk Directory Page
  if (produkGrid) {
    renderProdukList(getUMKMData());
  }

  // Render Detail Page
  if (detailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const data = getUMKMById(id);

    if (data) {
      renderDetailUMKM(data, detailContainer);
    } else {
      detailContainer.innerHTML = '<div class="text-center" style="padding: 100px 0;"><h2>Data UMKM tidak ditemukan.</h2></div>';
    }
  }
});

function renderUMKMList(data) {
  const grid = document.getElementById('umkmGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (data.length === 0) {
    grid.innerHTML = '<p class="text-muted" style="grid-column: 1 / -1; text-align: center;">Tidak ada UMKM yang sesuai dengan pencarian Anda.</p>';
    return;
  }

  data.forEach(item => {
    const card = document.createElement('a');
    card.href = `detail-umkm.html?id=${item.id}`;
    card.className = 'card';
    card.style.display = 'block';
    
    card.innerHTML = `
      <div class="card-img-wrapper" style="padding-top: 50%;">
        <span class="card-badge">${item.kategori}</span>
        <img src="${item.foto}" alt="${item.namaUMKM}">
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.namaUMKM}</h3>
        <p class="card-desc" style="font-size: 0.9rem;">${item.deskripsi.substring(0, 80)}...</p>
        <div class="card-footer">
          <span style="font-size: 0.8rem; color: var(--text-muted);">
            <span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle;">location_on</span> ${item.alamat}
          </span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderProdukList(data) {
  const grid = document.getElementById('produkGrid');
  if (!grid) return;
  grid.innerHTML = '';

  data.forEach(item => {
    if (!item.produk) return; // Skip if no product
    
    const hargaFormat = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.harga || 0);

    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
      <div class="card-img-wrapper">
        <span class="card-badge">${item.kategori}</span>
        <img src="${item.foto}" alt="${item.produk}">
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.produk}</h3>
        <p class="card-desc" style="font-size: 0.9rem;">Oleh: <a href="detail-umkm.html?id=${item.id}" style="color: var(--primary);">${item.namaUMKM}</a></p>
        <div class="card-footer">
          <span class="card-price">${hargaFormat}</span>
          <button class="btn btn-primary" onclick="window.open('https://wa.me/${item.whatsapp}?text=Halo%20saya%20tertarik%20dengan%20${encodeURIComponent(item.produk)}', '_blank')">
            Beli
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderDetailUMKM(data, container) {
  const hargaFormat = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.harga || 0);
  
  container.innerHTML = `
    <div class="grid" style="grid-template-columns: 1fr 1fr; gap: var(--sp-2xl); align-items: start;">
      <div>
        <img src="${data.foto}" alt="${data.namaUMKM}" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
        
        <div style="margin-top: var(--sp-lg); background: var(--surface); padding: var(--sp-lg); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <h3 style="margin-bottom: var(--sp-md);">Lokasi Usaha</h3>
          <p class="text-muted" style="margin-bottom: var(--sp-sm);"><span class="material-symbols-outlined" style="vertical-align: middle;">location_on</span> ${data.alamat}</p>
          <div style="width: 100%; height: 250px; border-radius: var(--radius-md); overflow: hidden; margin-top: var(--sp-md);">
            <iframe 
              width="100%" 
              height="100%" 
              frameborder="0" 
              style="border:0" 
              src="https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed" 
              allowfullscreen>
            </iframe>
          </div>
          <div style="margin-top: var(--sp-md);">
            <a href="https://www.google.com/maps?q=${data.latitude},${data.longitude}" target="_blank" class="btn btn-outline" style="width: 100%;">
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
      
      <div>
        <span style="background: var(--secondary); color: white; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.9rem;">${data.kategori}</span>
        <h1 style="margin-top: var(--sp-sm); margin-bottom: var(--sp-xs);">${data.namaUMKM}</h1>
        <p class="text-muted" style="font-size: 1.1rem; margin-bottom: var(--sp-lg);">Milik: <strong>${data.namaPemilik}</strong></p>
        
        <div style="margin-bottom: var(--sp-lg);">
          <h3 style="margin-bottom: var(--sp-xs);">Deskripsi Usaha</h3>
          <p style="line-height: 1.8;">${data.deskripsi}</p>
        </div>
        
        <div style="background: var(--bg-color); padding: var(--sp-lg); border-radius: var(--radius-lg); margin-bottom: var(--sp-xl);">
          <h3 style="margin-bottom: var(--sp-sm);">Produk Unggulan</h3>
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: var(--sp-sm); margin-bottom: var(--sp-sm);">
            <span style="font-weight: 600; font-size: 1.1rem;">${data.produk || '-'}</span>
            <span class="text-primary" style="font-weight: 700; font-size: 1.2rem;">${data.harga ? hargaFormat : '-'}</span>
          </div>
          <p class="text-muted" style="font-size: 0.9rem;"><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle;">phone</span> ${data.nomorTelepon}</p>
        </div>
        
        <a href="https://wa.me/${data.whatsapp}?text=Halo%20${encodeURIComponent(data.namaPemilik)},%20saya%20mendapat%20info%20dari%20Gundih%20Digital.%20Saya%20tertarik%20dengan%20usaha%20Anda." target="_blank" class="btn" style="background: #25D366; color: white; width: 100%; font-size: 1.1rem; padding: 1rem;">
          <span class="material-symbols-outlined">chat</span> Hubungi via WhatsApp
        </a>
      </div>
    </div>
  `;
}
