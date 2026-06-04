# 🛡️ Sistem Monitoring Keamanan Pintu Rumah

![Golang Backend](https://img.shields.io/badge/Backend-Go_1.21+-00ADD8?style=for-the-badge&logo=go)
![React Frontend](https://img.shields.io/badge/Frontend-React_Vite-61DAFB?style=for-the-badge&logo=react)
![Protocol MQTT](https://img.shields.io/badge/Protocol-MQTT_%7C_WebSocket-8A2BE2?style=for-the-badge)

Sebuah sistem pemantauan keamanan pintu cerdas (*end-to-end*) tingkat industri yang dirancang dengan arsitektur telemetri *real-time*. Proyek ini menjembatani perangkat keras mikrokontroler dengan antarmuka web modern menggunakan perutean data berkecepatan tinggi, menjadikannya sistem yang andal untuk skenario *monitoring* waktu nyata.

Dibuat oleh **Wannn Sion as a developer on the team**.

## 🚀 Arsitektur & Teknologi Utama

Sistem ini dirancang dengan memisahkan *layer* perangkat keras, jaringan/pemrosesan, dan antarmuka pengguna untuk memastikan skalabilitas dan latensi yang rendah.

*   **Edge/Hardware Layer:** Simulasi **ESP32** dilengkapi sensor **Ultrasonik (HC-SR04)** untuk pengukuran jarak presisi dan **Sensor PIR** untuk deteksi inframerah.
*   **Digital Signal Processing (DSP):** Implementasi algoritma **Moving Average Filter** pada mikrokontroler untuk menghaluskan sinyal diskrit dari sensor ultrasonik, mencegah lonjakan data ( *noise* ), dan menghasilkan kalkulasi jarak yang stabil.
*   **Backend Routing (Go):** Server tangguh berbasis **Golang** yang bertindak sebagai *broker bridge*. Mengelola *payload* telemetri dari protokol **MQTT** dan meneruskannya secara mulus ke antarmuka klien melalui **WebSocket**.
*   **Frontend Command Center (React):** Dasbor berstandar industri dengan pendekatan *Enterprise Dark Mode*. Dirancang untuk meminimalisir *cognitive overload* layaknya layar navigasi profesional, lengkap dengan *Activity Logging* otomatis.

## ⚙️ Logika Deteksi (*Double Validation*)

Untuk mencegah *false alarm* (peringatan palsu) yang sering terjadi pada sistem keamanan tunggal, sistem ini menggunakan logika validasi ganda:
1.  **PIR Sensor** harus mendeteksi pergerakan objek panas/manusia (Logika TINGGI/AKTIF).
2.  **Ultrasonic Sensor** harus memvalidasi bahwa objek tersebut berada di dalam "Zona Kritis" (Jarak < 50 cm).
*Jika kedua kondisi terpenuhi secara bersamaan, sistem akan memicu status `BAHAYA`, menyalakan aktuator (Buzzer/LED), dan mencatat waktu kejadian ke dalam log dasbor.*

## 🛠️ Panduan Instalasi & Eksekusi

Pastikan Anda telah menginstal **Node.js** dan **Go** di sistem Anda.

### 📂 Structur Project
/
├── backend/                  # Golang WebSocket & MQTT Broker Bridge
│   ├── go.mod
│   └── main.go
├── frontend/                 # React (Vite) Telemetry Dashboard
│   └── dashboard-project/
│       ├── src/
│       │   ├── components/   # Modular UI Components (Navbar, EventLog, dll)
│       │   ├── App.jsx       # Main State & WebSocket Logic
│       │   └── App.css       # Enterprise Dark Mode Styling
│       └── package.json
└── README.md

### 🖼️ Dashboard Preview
<img width="753" height="931" alt="Screenshot 2026-06-05 020009" src="https://github.com/user-attachments/assets/5f4524b7-d542-4df5-89c1-5029b9e2a188" />
<img width="781" height="927" alt="Screenshot 2026-06-05 020047" src="https://github.com/user-attachments/assets/56cea54b-7d10-4d70-b2cc-e2e2b693692c" />


### 1. Menjalankan Server Backend (Go)
Backend bertugas menangkap sinyal MQTT dan membuka jalur WebSocket.
```bash
cd backend
# Unduh semua dependensi (Paho MQTT & Gorilla WebSocket)
go mod tidy
# Jalankan server
go run main.go
