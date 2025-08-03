#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Wokwi-GUEST";
const char* password = "";

const char* serverUrl = "https://doctor.uzay.info/sendesp32.php";
const char* confirmationCode = "12345678910";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  fetchData();
}

void loop() {}

void fetchData() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = String(serverUrl) + "?confirmation_code=" + confirmationCode;
    http.begin(url);
    int httpCode = http.GET();

    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      parseData(payload);
    }
    http.end();
  }
}

void parseData(String data) {
  int start = 0;
  int end = data.indexOf(';', start);

  while (end != -1) {
    String record = data.substring(start, end);
    printRecord(record);
    start = end + 1;
    end = data.indexOf(';', start);
  }

  String lastRecord = data.substring(start);
  if (lastRecord.length() > 0) {
    printRecord(lastRecord);
  }
}

void printRecord(String record) {
  String fields[6];
  int start = 0;
  int end = -1;

  for (int i = 0; i < 6; i++) {
    end = record.indexOf(',', start);
    if (end == -1 && i < 5) {
      fields[i] = record.substring(start);
      for (int j = i + 1; j < 6; j++) fields[j] = "";
      break;
    } else if (end == -1 && i == 5) {
      fields[i] = record.substring(start);
    } else {
      fields[i] = record.substring(start, end);
      start = end + 1;
    }
  }

  Serial.println("Kayıt:");
  Serial.print("Ad: "); Serial.println(fields[0]);
  Serial.print("Soyad: "); Serial.println(fields[1]);
  Serial.print("İlaç: "); Serial.println(fields[2]);
  Serial.print("Doz: "); Serial.println(fields[3]);
  Serial.print("Günlük Miktar: "); Serial.println(fields[4]);
  Serial.print("Numara: "); Serial.println(fields[5]);
  Serial.println("------------");
}
