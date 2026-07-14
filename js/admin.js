/**
 * admin.js
 * Handles admin dashboard interactivity and CRUD operations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sidebar Toggle (Mobile)
  const sidebarToggle = document.getElementById('sidebarToggle');
  const adminSidebar = document.getElementById('adminSidebar');
  
  if (sidebarToggle && adminSidebar) {
    sidebarToggle.addEventListener('click', () => {
      adminSidebar.classList.toggle('open');
    });
  }

  document.addEventListener('click', (event) => {
    if (window.innerWidth <= 992 && adminSidebar && adminSidebar.classList.contains('open')) {
      if (!adminSidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
        adminSidebar.classList.remove('open');
      }
    }
  });

  // 2. Modal interactions
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloseBtns = document.querySelectorAll('[data-modal-close]');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        // Clear forms if it's "Tambah"
        const form = modal.querySelector('form');
        if (form && !trigger.classList.contains('btn-edit')) {
          form.reset();
          const hiddenId = form.querySelector('input[type="hidden"]');
          if (hiddenId) hiddenId.value = '';
        }
        modal.classList.add('active');
      }
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });

  // --- KELOLA UMKM ---
  const tabelUmkm = document.getElementById('tabelUmkm');
  if (tabelUmkm) {
    renderAdminUMKM();
  }

  const formTambahData = document.getElementById('formTambahData');
  if (formTambahData) {
    formTambahData.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const id = document.getElementById('umkmId').value;
      const data = {
        namaUMKM: document.getElementById('umkmNama').value,
        kategori: document.getElementById('umkmKategori').value,
        namaPemilik: document.getElementById('umkmPemilik').value,
        whatsapp: document.getElementById('umkmWA').value,
        alamat: document.getElementById('umkmAlamat').value,
        latitude: document.getElementById('umkmLat').value,
        longitude: document.getElementById('umkmLong').value,
        deskripsi: document.getElementById('umkmDeskripsi').value,
        foto: document.getElementById('umkmFoto').value,
        nomorTelepon: document.getElementById('umkmWA').value // sync telp with WA for simplicity
      };

      if (id) {
        updateUMKM(id, data);
        showToast('Data UMKM berhasil diperbarui', 'success');
      } else {
        addUMKM(data);
        showToast('Data UMKM berhasil ditambah', 'success');
      }

      formTambahData.closest('.modal-overlay').classList.remove('active');
      renderAdminUMKM();
    });
  }

  // --- KELOLA PRODUK ---
  const tabelProduk = document.getElementById('tabelProduk');
  if (tabelProduk) {
    renderAdminProduk();
    populateUmkmSelect();
  }

  const formTambahProduk = document.getElementById('formTambahProduk');
  if (formTambahProduk) {
    formTambahProduk.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const umkmId = document.getElementById('produkUmkmSelect').value;
      const produk = document.getElementById('produkNama').value;
      const harga = document.getElementById('produkHarga').value;

      if (!umkmId) {
        showToast('Pilih UMKM terlebih dahulu', 'error');
        return;
      }

      updateUMKM(umkmId, { produk, harga });
      showToast('Data produk berhasil disimpan', 'success');
      
      formTambahProduk.closest('.modal-overlay').classList.remove('active');
      renderAdminProduk();
    });
  }
});

// Render Table UMKM
function renderAdminUMKM() {
  const tbody = document.getElementById('tabelUmkm');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  const data = getUMKMData();
  data.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.namaUMKM}</td>
      <td><span style="background: var(--bg-color); padding: 2px 8px; border-radius: 4px;">${item.kategori}</span></td>
      <td>${item.namaPemilik}</td>
      <td>${item.alamat}</td>
      <td>
        <div class="action-btns">
          <button class="btn-sm btn-edit" title="Edit" onclick="editUmkm('${item.id}')"><span class="material-symbols-outlined" style="font-size: 16px;">edit</span></button>
          <button class="btn-sm btn-delete" title="Hapus" onclick="hapusUmkm('${item.id}')"><span class="material-symbols-outlined" style="font-size: 16px;">delete</span></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Edit UMKM
window.editUmkm = function(id) {
  const item = getUMKMById(id);
  if (!item) return;

  document.getElementById('umkmId').value = item.id;
  document.getElementById('umkmNama').value = item.namaUMKM || '';
  document.getElementById('umkmKategori').value = item.kategori || 'Kuliner';
  document.getElementById('umkmPemilik').value = item.namaPemilik || '';
  document.getElementById('umkmWA').value = item.whatsapp || '';
  document.getElementById('umkmAlamat').value = item.alamat || '';
  document.getElementById('umkmLat').value = item.latitude || '';
  document.getElementById('umkmLong').value = item.longitude || '';
  document.getElementById('umkmDeskripsi').value = item.deskripsi || '';
  document.getElementById('umkmFoto').value = item.foto || '';

  document.getElementById('modalTambahUMKM').classList.add('active');
};

// Hapus UMKM
window.hapusUmkm = function(id) {
  if (confirm('Yakin ingin menghapus data UMKM ini?')) {
    deleteUMKM(id);
    showToast('Data berhasil dihapus', 'success');
    renderAdminUMKM();
  }
};

// Render Table Produk
function renderAdminProduk() {
  const tbody = document.getElementById('tabelProduk');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  const data = getUMKMData().filter(item => item.produk); // Only UMKM with products
  const hargaFormat = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });

  data.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.produk}</td>
      <td>${item.namaUMKM}</td>
      <td><span style="background: var(--bg-color); padding: 2px 8px; border-radius: 4px;">${item.kategori}</span></td>
      <td>${hargaFormat.format(item.harga || 0)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-sm btn-edit" title="Edit" onclick="editProduk('${item.id}')"><span class="material-symbols-outlined" style="font-size: 16px;">edit</span></button>
          <button class="btn-sm btn-delete" title="Hapus" onclick="hapusProduk('${item.id}')"><span class="material-symbols-outlined" style="font-size: 16px;">delete</span></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Populate Select UMKM for Produk form
function populateUmkmSelect() {
  const select = document.getElementById('produkUmkmSelect');
  if (!select) return;
  select.innerHTML = '<option value="">-- Pilih UMKM --</option>';
  const data = getUMKMData();
  data.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.namaUMKM;
    select.appendChild(opt);
  });
}

// Edit Produk
window.editProduk = function(id) {
  const item = getUMKMById(id);
  if (!item) return;

  document.getElementById('produkUmkmSelect').value = item.id;
  document.getElementById('produkNama').value = item.produk || '';
  document.getElementById('produkHarga').value = item.harga || '';

  document.getElementById('modalTambahProduk').classList.add('active');
};

// Hapus Produk
window.hapusProduk = function(id) {
  if (confirm('Yakin ingin menghapus produk ini? (Data UMKM akan tetap ada)')) {
    updateUMKM(id, { produk: '', harga: '' });
    showToast('Produk berhasil dihapus', 'success');
    renderAdminProduk();
  }
};
