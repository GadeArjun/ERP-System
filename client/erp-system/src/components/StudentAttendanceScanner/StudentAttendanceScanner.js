import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./StudentAttendanceScanner.css";
import axios from "axios";

const StudentAttendanceScanner = ({
  setIsAttendanceStart,
  studentId,
  subjectId,
}) => {
  const [scannedData, setScannedData] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    try {
      const qrScanner = new Html5QrcodeScanner("qr-reader", {
        fps: 10, // Frames per second
        qrbox: { width: 250, height: 250 }, // QR code scanning box
      });

      qrScanner.render(
        (decodedText) => {
          try {
            setScannedData(decodedText);
            // console.log(decodedText);
            sendAttendance(decodedText); // Call attendance function
          } catch (err) {
            console.error("Error handling QR data:", err);
          } finally {
            qrScanner.clear(); // Stop scanning after one successful scan
          }
        },
        (error) => {
          console.log("QR scanning error:", error); // Handle scan errors
        }
      );

      scannerRef.current = qrScanner;

      // Cleanup the scanner when the component unmounts
      return () => {
        if (scannerRef.current) {
          scannerRef.current.clear(); // Clear the scanner instance
          scannerRef.current = null;
        }
        setIsAttendanceStart(false);
      };
    } catch (err) {
      console.error("Error initializing QR scanner:", err);
    }
  }, []); // No need for scannedData dependency

  const sendAttendance = async (decodedText) => {
    try {
      setIsAttendanceStart(false);

      const data = JSON.parse(decodedText); // Parse QR code data
      const today = new Date(); // Get today's date in YYYY-MM-DD format

      // Validate the scanned data
      if (
        data.timestamp === today.toDateString() &&
        data.subjectId === subjectId
      ) {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/add-student-attendance`,
          {
            studentId: studentId,
            subjectId: subjectId,
          }
        );
        // console.log(response);

        if (response.status === 201) {
          alert(response.data.message);
        } else {
          alert(response.data.error);
        }
      } else {
        alert("QR code may be expired or invalid. Please check the QR code.");
      }
    } catch (err) {
      console.error("Error sending attendance:", err);
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Student Attendance</h2>
      <div id="qr-reader" style={{ width: "300px", margin: "auto" }}></div>
    </div>
  );
};

export default StudentAttendanceScanner;
