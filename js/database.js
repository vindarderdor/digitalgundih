/**
 * database.js
 * Handles LocalStorage as a Mock Database for UMKM Gundih Digital
 */

const DB_UMKM = 'gundih_umkm_db';

// Data Dummy UMKM (10 data)
const DUMMY_DATA = [
  {
    id: 'umkm-1',
    namaUMKM: 'Dapur Mak Gundih',
    namaPemilik: 'Siti Aminah',
    kategori: 'Kuliner',
    deskripsi: 'Menyediakan aneka jajanan pasar, kue basah, dan melayani katering untuk berbagai acara di desa maupun luar desa.',
    alamat: 'Jl. Gundih Barat RT 01 / RW 02',
    nomorTelepon: '081234567890',
    whatsapp: '6281234567890',
    foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYwcqGS-SisJVtlOQKcrgeN1y648HRkoiKE9ZRh_Sg9W_ZvU1yPpXXJa_P5j3963VrKRFUUo7GldpHBjdSXQJLc-M8-5FOXD6qVvJyql6r5t3sRZIjyg4DhGwnY_jMKbjw7HFEZ5Xqbsx1x5L0uzoKhOjEprEIjiMAuVEzT42a3VVuFYydHH72Ln9Ej5-h8yBNDKSKvG2HNS-YdOQ-z7TvFTk6QW8bb1aeq1CTo_-ebMpwjNJ9NbvK0A',
    latitude: '-7.2486',
    longitude: '112.7231',
    produk: 'Kue Basah Campur',
    harga: '15000'
  },
  {
    id: 'umkm-2',
    namaUMKM: 'Batik Tulis Gundih Asri',
    namaPemilik: 'Budi Santoso',
    kategori: 'Fashion',
    deskripsi: 'Produksi kain batik tulis dan cap dengan pewarna alami, bermotif khas flora dan fauna desa Gundih.',
    alamat: 'Pusat Desa Gundih, Blok B No. 4',
    nomorTelepon: '085612345678',
    whatsapp: '6285612345678',
    foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc7FsB9POJkpFdYC6MJCX8R4AqY2BlOVY08PhzP4_RMBqaigih-jvo4wv0-VFS1BdoqI0aKuH0DTH44_86o27PYX6lItJt_lNqz_hsx9dvd6IRSdYlmaD3viTSXnUTwd3T0fx6bwnbmYB5uEUpx2wT1W1am1tKZmg8XD0fvgei0rzFScqSBbbPxDH-kHzBuCqnv4WG6ov2gdkWjyT1kl4_zy6-zuchEyCsHh5YmsTAXxKpBMq8nws-kQ',
    latitude: '-7.2501',
    longitude: '112.7255',
    produk: 'Kain Batik Klasik 2x1m',
    harga: '250000'
  },
  {
    id: 'umkm-3',
    namaUMKM: 'Ukiran Kayu Lestari',
    namaPemilik: 'Haryanto',
    kategori: 'Kerajinan',
    deskripsi: 'Bengkel ukir kayu mahoni dan jati, memproduksi hiasan dinding, perabotan kecil, dan patung dekorasi ramah lingkungan.',
    alamat: 'Jl. Pemuda No. 12, Gundih',
    nomorTelepon: '081312345678',
    whatsapp: '6281312345678',
    foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHp1-YQrPZbJu3LTuJqjuOQURXkZYRMoy9tpgoNWZUctQr7Ef6HuHItDqTjRWMULfwmhvsh4v0OIKnk3ondUdXsebETcK6nseyGwSmB_UcQ4pq7OyssZlAYNjUJw-0MGPvNRsaxsDbyF0Io1Fg9IFHqwUU3DYdDSbc06knJDYofoOmSVDeiqpE9pL5orVDhziDh7LAIBtfDgIHBuvUv41ef2ZNS2Jt5Bz9Jk9r071_Ht5A9QaJwXInmg',
    latitude: '-7.2475',
    longitude: '112.7220',
    produk: 'Hiasan Dinding Ukir',
    harga: '120000'
  },
  {
    id: 'umkm-4',
    namaUMKM: 'Toko Sembako Barokah',
    namaPemilik: 'Hj. Fatimah',
    kategori: 'Sembako',
    deskripsi: 'Menyediakan kebutuhan pokok harian masyarakat desa, mulai dari beras kualitas lokal, minyak goreng, gula, hingga perlengkapan mandi.',
    alamat: 'Jl. Raya Gundih No. 8',
    nomorTelepon: '082212345678',
    whatsapp: '6282212345678',
    foto: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    latitude: '-7.2510',
    longitude: '112.7260',
    produk: 'Beras Premium 5kg',
    harga: '70000'
  },
  {
    id: 'umkm-5',
    namaUMKM: 'Bengkel Motor Cepat',
    namaPemilik: 'Pak Joko',
    kategori: 'Jasa',
    deskripsi: 'Melayani servis rutin sepeda motor, ganti oli, tambal ban, dan perbaikan mesin ringan hingga sedang.',
    alamat: 'Jl. Pertigaan Gundih, Kios No 2',
    nomorTelepon: '081912345678',
    whatsapp: '6281912345678',
    foto: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800',
    latitude: '-7.2495',
    longitude: '112.7240',
    produk: 'Servis Ringan + Ganti Oli',
    harga: '85000'
  },
  {
    id: 'umkm-6',
    namaUMKM: 'Sambal Bu Sri',
    namaPemilik: 'Sri Wahyuni',
    kategori: 'Kuliner',
    deskripsi: 'Sambal botolan pedas mampus asli buatan rumahan dengan bahan-bahan cabai pilihan dari petani lokal.',
    alamat: 'Perumahan Gundih Indah Blok A/5',
    nomorTelepon: '087812345678',
    whatsapp: '6287812345678',
    foto: 'https://images.unsplash.com/photo-1588194200636-6e545e85c138?auto=format&fit=crop&q=80&w=800',
    latitude: '-7.2520',
    longitude: '112.7210',
    produk: 'Sambal Bawang Botol',
    harga: '25000'
  },
  {
    id: 'umkm-7',
    namaUMKM: 'Penjahit Rapi',
    namaPemilik: 'Suryono',
    kategori: 'Jasa',
    deskripsi: 'Menerima pesanan jahit baju, permak jeans, pembuatan seragam sekolah, jas, dan pakaian dinas.',
    alamat: 'Gg. Buntu No 3, Gundih',
    nomorTelepon: '083812345678',
    whatsapp: '6283812345678',
    foto: 'https://images.unsplash.com/photo-1555529733-0e67056058e1?auto=format&fit=crop&q=80&w=800',
    latitude: '-7.2465',
    longitude: '112.7235',
    produk: 'Jasa Permak Pakaian',
    harga: '20000'
  },
  {
    id: 'umkm-8',
    namaUMKM: 'Keripik Tempe Renyah',
    namaPemilik: 'Pak Anton',
    kategori: 'Kuliner',
    deskripsi: 'Produksi keripik tempe gurih dan renyah. Cocok untuk oleh-oleh atau camilan keluarga di rumah.',
    alamat: 'Jl. Masjid Agung Gundih No 12',
    nomorTelepon: '085712345678',
    whatsapp: '6285712345678',
    foto: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800',
    latitude: '-7.2505',
    longitude: '112.7275',
    produk: 'Keripik Tempe Kemasan Besar',
    harga: '18000'
  },
  {
    id: 'umkm-9',
    namaUMKM: 'Tas Anyam Bu Rini',
    namaPemilik: 'Rini Setyawati',
    kategori: 'Kerajinan',
    deskripsi: 'Kerajinan tas anyaman pandan dan plastik daur ulang dengan desain modern dan harga terjangkau.',
    alamat: 'Gundih RT 03/01',
    nomorTelepon: '081298765432',
    whatsapp: '6281298765432',
    foto: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    latitude: '-7.2480',
    longitude: '112.7280',
    produk: 'Tas Anyaman Pandan',
    harga: '65000'
  },
  {
    id: 'umkm-10',
    namaUMKM: 'Sablon & Konveksi Kreatif',
    namaPemilik: 'Dimas',
    kategori: 'Fashion',
    deskripsi: 'Melayani cetak sablon kaos, hoodie, topi dengan desain custom satuan maupun partai besar.',
    alamat: 'Jl. Pemuda No. 45, Gundih',
    nomorTelepon: '089612345678',
    whatsapp: '6289612345678',
    foto: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800',
    latitude: '-7.2515',
    longitude: '112.7225',
    produk: 'Kaos Sablon Custom',
    harga: '55000'
  }
];

// Initialize Database
function initDB() {
  if (!localStorage.getItem(DB_UMKM)) {
    localStorage.setItem(DB_UMKM, JSON.stringify(DUMMY_DATA));
  }
}

// Get All Data
function getUMKMData() {
  const data = localStorage.getItem(DB_UMKM);
  return data ? JSON.parse(data) : [];
}

// Get Single Data
function getUMKMById(id) {
  const data = getUMKMData();
  return data.find(item => item.id === id);
}

// Add Data
function addUMKM(newData) {
  const data = getUMKMData();
  const id = 'umkm-' + Date.now();
  data.push({ id, ...newData });
  localStorage.setItem(DB_UMKM, JSON.stringify(data));
}

// Update Data
function updateUMKM(id, updatedData) {
  const data = getUMKMData();
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedData };
    localStorage.setItem(DB_UMKM, JSON.stringify(data));
  }
}

// Delete Data
function deleteUMKM(id) {
  const data = getUMKMData();
  const filtered = data.filter(item => item.id !== id);
  localStorage.setItem(DB_UMKM, JSON.stringify(filtered));
}

// Auto-initialize when the script is loaded
initDB();
