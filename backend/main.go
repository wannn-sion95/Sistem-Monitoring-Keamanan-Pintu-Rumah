package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/gorilla/websocket"
)

// Struktur data JSON yang akan dikirim ke React
type SecurityData struct {
	Status string `json:"status"`
	Jarak  string `json:"jarak"`
}

// Variabel global untuk menampung data terbaru dari ESP32
var latestData = SecurityData{Status: "MENUNGGU", Jarak: "0"}

// Konfigurasi WebSocket (Izinkan koneksi dari localhost React)
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// Fungsi penangkap pesan dari Broker MQTT HiveMQ
var messageHandler mqtt.MessageHandler = func(client mqtt.Client, msg mqtt.Message) {
	topic := msg.Topic()
	payload := string(msg.Payload())

	if topic == "simulasi/pintu/status" {
		latestData.Status = payload
	} else if topic == "simulasi/pintu/jarak" {
		latestData.Jarak = payload
	}
	
	fmt.Printf("Data masuk -> Topik: %s | Nilai: %s\n", topic, payload)
}

// Fungsi Endpoint WebSocket
func serveWS(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Gagal upgrade ke WebSocket:", err)
		return
	}
	defer conn.Close()

	fmt.Println("Dashboard React terhubung ke WebSocket!")

	for {
		// Tembakkan data terbaru ke React setiap 1 detik
		err := conn.WriteJSON(latestData)
		if err != nil {
			log.Println("React Client terputus.")
			break
		}
		time.Sleep(1 * time.Second)
	}
}

func main() {
	// 1. Konfigurasi Client MQTT
	opts := mqtt.NewClientOptions()
	opts.AddBroker("tcp://broker.hivemq.com:1883")
	opts.SetClientID("GoBackend-DoorSecurity")
	opts.SetDefaultPublishHandler(messageHandler)

	client := mqtt.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}
	fmt.Println("Backend Go berhasil terhubung ke Broker HiveMQ!")

	// 2. Subscribe ke topik yang sama dengan ESP32 di Wokwi
	client.Subscribe("simulasi/pintu/status", 1, nil)
	client.Subscribe("simulasi/pintu/jarak", 1, nil)

	// 3. Buka jalur WebSocket di Port 8080
	http.HandleFunc("/ws", serveWS)
	fmt.Println("Server WebSocket berjalan di ws://localhost:8080/ws")
	
	log.Fatal(http.ListenAndServe(":8080", nil))
}