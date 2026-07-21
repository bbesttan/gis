// Comprehensive Relational Mock Data for GIS Stunting Dashboard
// Includes Kecamatan, Desa, Posyandu, Puskesmas, Balita records & Growth History

export const mockKecamatan = [
  { id: 'kec_1', name: 'Beji', code: '32.76.01', totalBalita: 420, totalStunting: 68, riskCount: 45, normalCount: 307 },
  { id: 'kec_2', name: 'Pancoran Mas', code: '32.76.02', totalBalita: 580, totalStunting: 112, riskCount: 78, normalCount: 390 },
  { id: 'kec_3', name: 'Sukmajaya', code: '32.76.03', totalBalita: 510, totalStunting: 75, riskCount: 62, normalCount: 373 },
  { id: 'kec_4', name: 'Cimanggis', code: '32.76.04', totalBalita: 490, totalStunting: 52, riskCount: 41, normalCount: 397 },
  { id: 'kec_5', name: 'Sawangan', code: '32.76.05', totalBalita: 620, totalStunting: 134, riskCount: 89, normalCount: 397 },
  { id: 'kec_6', name: 'Limo', code: '32.76.06', totalBalita: 340, totalStunting: 38, riskCount: 28, normalCount: 274 },
  { id: 'kec_7', name: 'Tapos', code: '32.76.07', totalBalita: 460, totalStunting: 82, riskCount: 54, normalCount: 324 },
  { id: 'kec_8', name: 'Bojongsari', code: '32.76.08', totalBalita: 390, totalStunting: 79, riskCount: 48, normalCount: 263 }
]

export const mockDesa = [
  { id: 'des_1', name: 'Pondok Cina', kecamatanId: 'kec_1', kecamatanName: 'Beji', totalBalita: 140, stuntingRate: 14.2, status: 'Kuning', polygon: [[-6.368, 106.828], [-6.360, 106.838], [-6.372, 106.845], [-6.378, 106.832]] },
  { id: 'des_2', name: 'Kukusan', kecamatanId: 'kec_1', kecamatanName: 'Beji', totalBalita: 150, stuntingRate: 18.6, status: 'Kuning', polygon: [[-6.360, 106.818], [-6.352, 106.828], [-6.365, 106.833], [-6.370, 106.822]] },
  { id: 'des_3', name: 'Beji Timur', kecamatanId: 'kec_1', kecamatanName: 'Beji', totalBalita: 130, stuntingRate: 22.4, status: 'Merah', polygon: [[-6.375, 106.812], [-6.368, 106.822], [-6.382, 106.826], [-6.388, 106.815]] },
  { id: 'des_4', name: 'Depok Jaya', kecamatanId: 'kec_2', kecamatanName: 'Pancoran Mas', totalBalita: 210, stuntingRate: 24.8, status: 'Merah', polygon: [[-6.388, 106.802], [-6.380, 106.815], [-6.395, 106.820], [-6.402, 106.808]] },
  { id: 'des_5', name: 'Mekarjaya', kecamatanId: 'kec_3', kecamatanName: 'Sukmajaya', totalBalita: 180, stuntingRate: 12.5, status: 'Oranye', polygon: [[-6.385, 106.835], [-6.378, 106.848], [-6.392, 106.855], [-6.398, 106.840]] },
  { id: 'des_6', name: 'Harjamukti', kecamatanId: 'kec_4', kecamatanName: 'Cimanggis', totalBalita: 190, stuntingRate: 8.4, status: 'Hijau', polygon: [[-6.365, 106.885], [-6.358, 106.898], [-6.372, 106.905], [-6.378, 106.890]] },
  { id: 'des_7', name: 'Sawangan Baru', kecamatanId: 'kec_5', kecamatanName: 'Sawangan', totalBalita: 240, stuntingRate: 26.5, status: 'Merah', polygon: [[-6.395, 106.775], [-6.388, 106.788], [-6.405, 106.795], [-6.410, 106.780]] },
  { id: 'des_8', name: 'Meruyung', kecamatanId: 'kec_6', kecamatanName: 'Limo', totalBalita: 160, stuntingRate: 9.8, status: 'Hijau', polygon: [[-6.382, 106.762], [-6.375, 106.772], [-6.388, 106.778], [-6.394, 106.766]] }
]

export const mockPuskesmas = [
  { id: 'pus_1', name: 'Puskesmas Beji', kecamatan: 'Beji', lat: -6.3685, lng: 106.8242, address: 'Jl. Raya Beji No. 12', phone: '021-7721890', bufferRadiusKm: 3 },
  { id: 'pus_2', name: 'Puskesmas Pancoran Mas', kecamatan: 'Pancoran Mas', lat: -6.3921, lng: 106.8115, address: 'Jl. Pemuda No. 45', phone: '021-7754321', bufferRadiusKm: 3 },
  { id: 'pus_3', name: 'Puskesmas Sukmajaya', kecamatan: 'Sukmajaya', lat: -6.3874, lng: 106.8412, address: 'Jl. Merdeka No. 88', phone: '021-7789012', bufferRadiusKm: 3 },
  { id: 'pus_4', name: 'Puskesmas Cimanggis', kecamatan: 'Cimanggis', lat: -6.3712, lng: 106.8914, address: 'Jl. Raya Bogor Km. 29', phone: '021-8712345', bufferRadiusKm: 3 },
  { id: 'pus_5', name: 'Puskesmas Sawangan', kecamatan: 'Sawangan', lat: -6.4012, lng: 106.7823, address: 'Jl. Moch. Mukhtar No. 3', phone: '021-7798765', bufferRadiusKm: 3 }
]

export const mockPosyandu = [
  { id: 'pos_1', name: 'Posyandu Mawar 1', desa: 'Pondok Cina', kecamatan: 'Beji', puskesmasId: 'pus_1', lat: -6.3662, lng: 106.8315, kaderCount: 5 },
  { id: 'pos_2', name: 'Posyandu Melati 3', desa: 'Kukusan', kecamatan: 'Beji', puskesmasId: 'pus_1', lat: -6.3584, lng: 106.8245, kaderCount: 6 },
  { id: 'pos_3', name: 'Posyandu Anggrek 2', desa: 'Beji Timur', kecamatan: 'Beji', puskesmasId: 'pus_1', lat: -6.3789, lng: 106.8198, kaderCount: 4 },
  { id: 'pos_4', name: 'Posyandu Kenanga 4', desa: 'Depok Jaya', kecamatan: 'Pancoran Mas', puskesmasId: 'pus_2', lat: -6.3912, lng: 106.8089, kaderCount: 6 },
  { id: 'pos_5', name: 'Posyandu Dahlia 1', desa: 'Mekarjaya', kecamatan: 'Sukmajaya', puskesmasId: 'pus_3', lat: -6.3845, lng: 106.8423, kaderCount: 5 },
  { id: 'pos_6', name: 'Posyandu Flamboyan 5', desa: 'Harjamukti', kecamatan: 'Cimanggis', puskesmasId: 'pus_4', lat: -6.3689, lng: 106.8967, kaderCount: 4 },
  { id: 'pos_7', name: 'Posyandu Nusa Indah 2', desa: 'Sawangan Baru', kecamatan: 'Sawangan', puskesmasId: 'pus_5', lat: -6.4023, lng: 106.7856, kaderCount: 5 }
]

export const mockBalitaList = [
  {
    id: 'bal_1',
    nik: '3276011204220001',
    name: 'Ahmad Rayhan',
    gender: 'Laki-laki',
    ageMonths: 28,
    birthDate: '2023-11-12',
    weightKg: 9.8,
    heightCm: 81.2,
    zScore: -2.85,
    statusGizi: 'Gizi Kurang',
    statusStunting: 'Sangat Pendek',
    statusColor: '#EF4444', // Red
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    parentName: 'Budi Santoso & Siti Aminah',
    parentPhone: '6281234567890',
    address: 'Jl. Margonda Raya No. 42, RT 02/RW 05',
    desa: 'Pondok Cina',
    kecamatan: 'Beji',
    posyandu: 'Posyandu Mawar 1',
    puskesmas: 'Puskesmas Beji',
    year: 2024,
    month: 6,
    lat: -6.3672,
    lng: 106.8328,
    growthHistory: [
      { month: 'Jan 2024', age: 23, weight: 9.1, height: 78.5, zScore: -2.9 },
      { month: 'Feb 2024', age: 24, weight: 9.2, height: 79.1, zScore: -2.88 },
      { month: 'Mar 2024', age: 25, weight: 9.4, height: 79.8, zScore: -2.86 },
      { month: 'Apr 2024', age: 26, weight: 9.5, height: 80.3, zScore: -2.85 },
      { month: 'Mei 2024', age: 27, weight: 9.7, height: 80.8, zScore: -2.84 },
      { month: 'Jun 2024', age: 28, weight: 9.8, height: 81.2, zScore: -2.85 }
    ]
  },
  {
    id: 'bal_2',
    nik: '3276015508220003',
    name: 'Aisyah Putri',
    gender: 'Perempuan',
    ageMonths: 22,
    birthDate: '2024-05-15',
    weightKg: 10.2,
    heightCm: 80.5,
    zScore: -2.15,
    statusGizi: 'Gizi Baik',
    statusStunting: 'Pendek',
    statusColor: '#F59E0B', // Amber
    photo: 'https://images.unsplash.com/photo-1595454223600-91fbddbbf255?w=200&auto=format&fit=crop&q=80',
    parentName: 'Hendra Wijaya & Rina Lestari',
    parentPhone: '6281298765432',
    address: 'Jl. H. Asmawi No. 18, RT 01/RW 03',
    desa: 'Kukusan',
    kecamatan: 'Beji',
    posyandu: 'Posyandu Melati 3',
    puskesmas: 'Puskesmas Beji',
    year: 2024,
    month: 6,
    lat: -6.3592,
    lng: 106.8258,
    growthHistory: [
      { month: 'Jan 2024', age: 17, weight: 9.0, height: 76.0, zScore: -2.25 },
      { month: 'Mar 2024', age: 19, weight: 9.5, height: 77.8, zScore: -2.20 },
      { month: 'Jun 2024', age: 22, weight: 10.2, height: 80.5, zScore: -2.15 }
    ]
  },
  {
    id: 'bal_3',
    nik: '3276022010210005',
    name: 'Bintang Pratama',
    gender: 'Laki-laki',
    ageMonths: 35,
    birthDate: '2023-04-20',
    weightKg: 10.5,
    heightCm: 84.0,
    zScore: -3.10,
    statusGizi: 'Gizi Buruk',
    statusStunting: 'Sangat Pendek',
    statusColor: '#EF4444',
    photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&auto=format&fit=crop&q=80',
    parentName: 'Agus Setiawan & Dewi Kartika',
    parentPhone: '6281311223344',
    address: 'Jl. Kartini No. 5, RT 04/RW 02',
    desa: 'Depok Jaya',
    kecamatan: 'Pancoran Mas',
    posyandu: 'Posyandu Kenanga 4',
    puskesmas: 'Puskesmas Pancoran Mas',
    year: 2024,
    month: 6,
    lat: -6.3928,
    lng: 106.8072,
    growthHistory: [
      { month: 'Jan 2024', age: 30, weight: 9.8, height: 81.0, zScore: -3.20 },
      { month: 'Apr 2024', age: 33, weight: 10.2, height: 82.8, zScore: -3.15 },
      { month: 'Jun 2024', age: 35, weight: 10.5, height: 84.0, zScore: -3.10 }
    ]
  },
  {
    id: 'bal_4',
    nik: '3276031401230002',
    name: 'Citra Kirana',
    gender: 'Perempuan',
    ageMonths: 18,
    birthDate: '2024-09-14',
    weightKg: 10.8,
    heightCm: 83.5,
    zScore: -1.20,
    statusGizi: 'Gizi Baik',
    statusStunting: 'Risiko Stunting',
    statusColor: '#3B82F6', // Blue
    photo: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&auto=format&fit=crop&q=80',
    parentName: 'Rahmat Hidayat & Sri Mulyani',
    parentPhone: '6281599887766',
    address: 'Jl. Tole Iskandar No. 99, RT 03/RW 08',
    desa: 'Mekarjaya',
    kecamatan: 'Sukmajaya',
    posyandu: 'Posyandu Dahlia 1',
    puskesmas: 'Puskesmas Sukmajaya',
    year: 2024,
    month: 6,
    lat: -6.3861,
    lng: 106.8435,
    growthHistory: [
      { month: 'Jan 2024', age: 13, weight: 9.2, height: 77.0, zScore: -1.40 },
      { month: 'Jun 2024', age: 18, weight: 10.8, height: 83.5, zScore: -1.20 }
    ]
  },
  {
    id: 'bal_5',
    nik: '3276042802220004',
    name: 'Daffa Ibrahim',
    gender: 'Laki-laki',
    ageMonths: 31,
    birthDate: '2023-08-28',
    weightKg: 13.5,
    heightCm: 92.4,
    zScore: 0.15,
    statusGizi: 'Gizi Baik',
    statusStunting: 'Normal',
    statusColor: '#10B981', // Green
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    parentName: 'Fajar Nugraha & Maya Indah',
    parentPhone: '6281766554433',
    address: 'Jl. Jamuju No. 14, RT 05/RW 01',
    desa: 'Harjamukti',
    kecamatan: 'Cimanggis',
    posyandu: 'Posyandu Flamboyan 5',
    puskesmas: 'Puskesmas Cimanggis',
    year: 2024,
    month: 6,
    lat: -6.3695,
    lng: 106.8978,
    growthHistory: [
      { month: 'Jan 2024', age: 26, weight: 12.1, height: 88.0, zScore: 0.10 },
      { month: 'Jun 2024', age: 31, weight: 13.5, height: 92.4, zScore: 0.15 }
    ]
  },
  {
    id: 'bal_6',
    nik: '3276050505220008',
    name: 'Erlangga Putra',
    gender: 'Laki-laki',
    ageMonths: 26,
    birthDate: '2023-11-05',
    weightKg: 9.4,
    heightCm: 79.8,
    zScore: -2.95,
    statusGizi: 'Gizi Buruk',
    statusStunting: 'Sangat Pendek',
    statusColor: '#EF4444',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    parentName: 'Dedi Kurniawan & Yulia Eka',
    parentPhone: '6281800112233',
    address: 'Jl. Sawangan Elok B4/12, RT 01/RW 09',
    desa: 'Sawangan Baru',
    kecamatan: 'Sawangan',
    posyandu: 'Posyandu Nusa Indah 2',
    puskesmas: 'Puskesmas Sawangan',
    year: 2024,
    month: 6,
    lat: -6.4038,
    lng: 106.7869,
    growthHistory: [
      { month: 'Feb 2024', age: 22, weight: 8.8, height: 77.2, zScore: -3.05 },
      { month: 'Jun 2024', age: 26, weight: 9.4, height: 79.8, zScore: -2.95 }
    ]
  },
  {
    id: 'bal_7',
    nik: '3276011111220007',
    name: 'Fatimah Zahra',
    gender: 'Perempuan',
    ageMonths: 20,
    birthDate: '2024-07-11',
    weightKg: 10.1,
    heightCm: 81.0,
    zScore: -1.85,
    statusGizi: 'Gizi Baik',
    statusStunting: 'Risiko Stunting',
    statusColor: '#3B82F6',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    parentName: 'Muhammad Ali & Zahra Nur',
    parentPhone: '6281988776655',
    address: 'Jl. Kukusan Teknik No. 3, RT 02/RW 04',
    desa: 'Kukusan',
    kecamatan: 'Beji',
    posyandu: 'Posyandu Melati 3',
    puskesmas: 'Puskesmas Beji',
    year: 2024,
    month: 6,
    lat: -6.3578,
    lng: 106.8232,
    growthHistory: [
      { month: 'Jan 2024', age: 15, weight: 9.2, height: 76.5, zScore: -1.90 },
      { month: 'Jun 2024', age: 20, weight: 10.1, height: 81.0, zScore: -1.85 }
    ]
  },
  {
    id: 'bal_8',
    nik: '3276061803230009',
    name: 'Gilang Ramadhan',
    gender: 'Laki-laki',
    ageMonths: 15,
    birthDate: '2024-12-18',
    weightKg: 10.9,
    heightCm: 84.2,
    zScore: 0.40,
    statusGizi: 'Gizi Baik',
    statusStunting: 'Normal',
    statusColor: '#10B981',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    parentName: 'Taufik Hidayat & Intan Permata',
    parentPhone: '6281233445566',
    address: 'Jl. Meruyung Raya No. 77, RT 01/RW 02',
    desa: 'Meruyung',
    kecamatan: 'Limo',
    posyandu: 'Posyandu Flamboyan 5',
    puskesmas: 'Puskesmas Beji',
    year: 2024,
    month: 6,
    lat: -6.3831,
    lng: 106.7645,
    growthHistory: [
      { month: 'Jan 2024', age: 10, weight: 9.5, height: 78.0, zScore: 0.35 },
      { month: 'Jun 2024', age: 15, weight: 10.9, height: 84.2, zScore: 0.40 }
    ]
  }
]

// Trend yearly aggregation for charts (2022 - 2025)
export const mockYearlyTrend = [
  { year: 2022, totalBalita: 3100, stuntingCount: 780, percentage: 25.1, normalCount: 2010, riskCount: 310 },
  { year: 2023, totalBalita: 3350, stuntingCount: 720, percentage: 21.5, normalCount: 2280, riskCount: 350 },
  { year: 2024, totalBalita: 3600, stuntingCount: 540, percentage: 15.0, normalCount: 2610, riskCount: 450 },
  { year: 2025, totalBalita: 3800, stuntingCount: 418, percentage: 11.0, normalCount: 2888, riskCount: 494 }
]
