import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

function Attendance({ subjectId }) {
  const [qrCodeData, setQrCodeData] = useState(null); // QR Code data
  const [isActive, setIsActive] = useState(false); // Attendance session active or not
  const [timer, setTimer] = useState(null); // Timer for expiration
  const [isScanning, setIsScanning] = useState(false); // QR scanner state

  // Handle Take Attendance

  const handleTakeAttendance = () => {
    const date = new Date();

    // console.log({ subjectId });

    const newQrCodeData = {
      subjectId: subjectId._id,
      timestamp: date.toDateString(),
    };

    setQrCodeData(newQrCodeData);
    // console.log(newQrCodeData);

    setIsActive(true);
    sendAttendaceDayCount();
    // Start 20-minute expiration timer
    const newTimer = setTimeout(() => {
      handleCloseAttendance();
    }, 20 * 60 * 1000); // 20 minutes in milliseconds

    setTimer(newTimer);
  };

  async function sendAttendaceDayCount() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/attendance`,
        { subjectId: subjectId._id }
      );
      alert("Attendance day add successfully");
      // console.log(response);
    } catch (err) {
      console.log(err);
      alert("Error while taking attendance. Please take again.");
    }
  }

  // Handle Close Attendance
  const handleCloseAttendance = () => {
    clearTimeout(timer);
    setQrCodeData(null);
    setIsActive(false);
    setIsScanning(false);
    setTimer(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Attendance System</h1>

      {!isActive ? (
        <button style={styles.button} onClick={handleTakeAttendance}>
          Take Attendance
        </button>
      ) : (
        <button style={styles.closeButton} onClick={handleCloseAttendance}>
          Close Attendance
        </button>
      )}

      {/* Display QR Code */}
      {isActive && qrCodeData && (
        <div style={styles.qrContainer}>
          <p>Scan the QR code to mark attendance:</p>
          <QRCodeCanvas
            value={JSON.stringify(qrCodeData)}
            size={200}
            level="H"
          />
          <p style={styles.expiry}>
            QR Code expires in {20} minutes. Subject: {subjectId.subjectName}
          </p>
        </div>
      )}
    </div>
  );
}

// CSS styles
const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  closeButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  qrContainer: {
    marginTop: "20px",
    padding: "10px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  expiry: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#6c757d",
  },
  scanButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  qrScanner: {
    width: "300px",
    height: "300px",
    marginTop: "20px",
    border: "2px solid #ccc",
    borderRadius: "10px",
  },
};

export default Attendance;
