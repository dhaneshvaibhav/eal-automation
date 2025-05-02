#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <DHT.h>
#include <MPU6050.h>
#include <WiFi.h>
#include <HTTPClient.h>

// WiFi credentials
const char* ssid = "Your_SSID";               // 🔁 Replace with your WiFi SSID
const char* password = "Your_PASSWORD";       // 🔁 Replace with your WiFi password

// Server URL (Your backend hosted on Render)
const char* serverURL = "https://eal-automation-backend.onrender.com/upload-sensor-data";

// Pin definitions
#define IR_SENSOR_PIN 2
#define DHT_PIN 15
#define MPU6050_SDA 21
#define MPU6050_SCL 22
#define BMP280_SDA 18
#define BMP280_SCL 19
#define PIR_SENSOR_PIN 27
#define LDR_PIN 34
#define MQ2_AO_PIN 35
#define MQ2_DO_PIN 25

// Sensor objects
Adafruit_BMP280 bmp;         // I2C
DHT dht(DHT_PIN, DHT11);     // DHT11
MPU6050 mpu;

void setup() {
  Serial.begin(115200);

  // Setup pins
  pinMode(IR_SENSOR_PIN, INPUT);
  pinMode(PIR_SENSOR_PIN, INPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(MQ2_AO_PIN, INPUT);
  pinMode(MQ2_DO_PIN, INPUT);

  // Initialize DHT
  dht.begin();

  // Start I2C communication
  Wire.begin(MPU6050_SDA, MPU6050_SCL);

  // Initialize MPU6050
  mpu.initialize();
  if (!mpu.testConnection()) {
    Serial.println("❌ MPU6050 connection failed");
  }

  // Initialize BMP280
  if (!bmp.begin(0x76)) {
    Serial.println("❌ BMP280 not found");
  } else {
    bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,
                    Adafruit_BMP280::SAMPLING_X2,
                    Adafruit_BMP280::SAMPLING_X16,
                    Adafruit_BMP280::FILTER_X16,
                    Adafruit_BMP280::STANDBY_MS_500);
  }

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("🔄 Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Connected to WiFi");
}

void loop() {
  // Sensor readings
  int irValue = digitalRead(IR_SENSOR_PIN);
  int pirValue = digitalRead(PIR_SENSOR_PIN);
  int ldrValue = analogRead(LDR_PIN);
  int mq2AoValue = analogRead(MQ2_AO_PIN);
  int mq2DoValue = digitalRead(MQ2_DO_PIN);
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  float pressure = bmp.readPressure() / 100.0F;
  float altitude = bmp.readAltitude(1013.25);
  int16_t ax, ay, az, gx, gy, gz;
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

  // Print to Serial
  Serial.println("📡 Sending sensor data...");
  Serial.printf("Temp: %.2f°C, Hum: %.2f%%, IR: %d, PIR: %d, LDR: %d\n", temperature, humidity, irValue, pirValue, ldrValue);
  Serial.printf("MQ2: AO=%d DO=%d, Pressure: %.2f hPa, Altitude: %.2f m\n", mq2AoValue, mq2DoValue, pressure, altitude);
  Serial.printf("MPU Accel: X=%d Y=%d Z=%d\n", ax, ay, az);

  sendDataToServer(temperature, humidity, irValue, pirValue, ldrValue, mq2AoValue, mq2DoValue, pressure, altitude, ax, ay, az);

  delay(5000); // Delay before next data send (5 seconds)
}

void sendDataToServer(float temperature, float humidity, int ir, int pir, int ldr, int mq2Ao, int mq2Do, float pressure, float altitude, int ax, int ay, int az) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    // Prepare JSON payload
    String payload = "{";
    payload += "\"temperature\":" + String(temperature) + ",";
    payload += "\"humidity\":" + String(humidity) + ",";
    payload += "\"ir\":" + String(ir) + ",";
    payload += "\"pir\":" + String(pir) + ",";
    payload += "\"ldr\":" + String(ldr) + ",";
    payload += "\"mq2Ao\":" + String(mq2Ao) + ",";
    payload += "\"mq2Do\":" + String(mq2Do) + ",";
    payload += "\"pressure\":" + String(pressure) + ",";
    payload += "\"altitude\":" + String(altitude) + ",";
    payload += "\"ax\":" + String(ax) + ",";
    payload += "\"ay\":" + String(ay) + ",";
    payload += "\"az\":" + String(az);
    payload += "}";

    // POST data
    int httpResponseCode = http.POST(payload);
    if (httpResponseCode > 0) {
      Serial.print("✅ Data sent. Server Response: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("❌ Failed to send. Error: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("❌ WiFi not connected");
  }
}