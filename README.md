# Sistem Monitoring Keamanan Pintu Rumah

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Go_1.21+-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Go Backend" />
  <img src="https://img.shields.io/badge/Frontend-React_Vite-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React Frontend" />
  <img src="https://img.shields.io/badge/Protocol-MQTT_%7C_WebSocket-8A2BE2?style=flat-square" alt="Protocol" />
</p>

Sistem pemantauan keamanan pintu cerdas berbasis arsitektur telemetri real-time. Proyek ini menghubungkan mikrokontroler dengan antarmuka web melalui jalur perutean data berkecepatan tinggi untuk pemantauan kondisi lingkungan secara langsung.

**Developer**: Mhd. Ridwan / Wannn Sion

---

## Dashboard Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/5f4524b7-d542-4df5-89c1-5029b9e2a188" width="48%" alt="Dashboard Preview 1" />
  <img src="https://github.com/user-attachments/assets/56cea54b-7d10-4d70-b2cc-e2e2b693692c" width="48%" alt="Dashboard Preview 2" />
</p>

---

## Arsitektur System

* **Edge / Hardware**: Mikrokontroler ESP32 terhubung ke sensor ultrasonik (HC-SR04) untuk pengoperasian jarak dan sensor PIR untuk deteksi pergerakan inframerah.
* **Signal Processing**: Algoritma *Moving Average Filter* diterapkan pada firmware mikrokontroler untuk meredam noise sinyal diskrit dari sensor ultrasonik.
* **Backend Processing**: Broker bridge berbasis Golang yang mengonversi payload data dari protokol MQTT ke jalur WebSocket menuju klien.
* **Frontend Interface**: Dasbor berbasis React untuk menampilkan telemetry visual dan log aktivitas secara real-time.

---

## Logika Deteksi (Double Validation)

Sistem menggunakan metode verifikasi dua tahap untuk meminimalkan indikasi bahaya palsu:

1. Sensor PIR mendeteksi pergerakan objek/manusia (status HIGH).
2. Sensor Ultrasonik memverifikasi objek berada dalam jarak kurang dari 50 cm.

Status `BAHAYA` hanya aktif saat kedua parameter terpenuhi secara bersamaan, sekaligus memicu aktuator dan mencatat waktu kejadian pada log dasbor.

---

## Struktur Direktori

```text
.
├── backend/
│   ├── go.mod
│   └── main.go
│
├── frontend/
│   └── dashboard-project/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Navbar.jsx
│       │   │   ├── EventLog.jsx
│       │   │   └── SensorCard.jsx
│       │   ├── App.jsx
│       │   └── App.css
│       └── package.json
│
└── README.md
