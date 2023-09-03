import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

function Dashboard() {
  const [isCameraRecording, setIsCameraRecording] = useState(false);
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [cameraMediaRecorder, setCameraMediaRecorder] = useState(null);
  const [screenMediaRecorder, setScreenMediaRecorder] = useState(null);
  const [recordedCameraChunks, setRecordedCameraChunks] = useState([]);
  const [recordedScreenChunks, setRecordedScreenChunks] = useState([]);
  const [downloadCameraLink, setDownloadCameraLink] = useState(null);
  const [downloadScreenLink, setDownloadScreenLink] = useState(null);

  const webcamRef = useRef(null);

  const startCameraRecording = async () => {
    try {
      const stream = webcamRef.current.stream;
      const recorder = new MediaRecorder(stream);
      setCameraMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedCameraChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const recordedBlob = new Blob(recordedCameraChunks, {
          type: 'video/webm',
        });
        const url = URL.createObjectURL(recordedBlob);
        setDownloadCameraLink(url);
      };

      recorder.start();
      setIsCameraRecording(true);
    } catch (error) {
      console.error('Error starting camera recording:', error);
    }
  };

  const stopCameraRecording = () => {
    if (cameraMediaRecorder && isCameraRecording) {
      cameraMediaRecorder.stop();
      setIsCameraRecording(false);
    }
  };

  const startScreenRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const recorder = new MediaRecorder(stream);
      setScreenMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedScreenChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const recordedBlob = new Blob(recordedScreenChunks, {
          type: 'video/webm',
        });
        const url = URL.createObjectURL(recordedBlob);
        setDownloadScreenLink(url);
      };

      recorder.start();
      setIsScreenRecording(true);
    } catch (error) {
      console.error('Error starting screen recording:', error);
    }
  };

  const stopScreenRecording = () => {
    if (screenMediaRecorder && isScreenRecording) {
      screenMediaRecorder.stop();
      setIsScreenRecording(false);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="camera-container">
        <Webcam
          audio={false}
          mirrored={true}
          height={480}
          width={640}
          ref={webcamRef}
        />
      </div>
      <div className="recording-controls">
        <div>
          {!isCameraRecording ? (
            <button onClick={startCameraRecording}>Start Camera Recording</button>
          ) : (
            <button onClick={stopCameraRecording}>Stop Camera Recording</button>
          )}
          {downloadCameraLink && (
            <a href={downloadCameraLink} download="camera-recording.webm">
              Download Camera Recording
            </a>
          )}
        </div>
        <div>
          {!isScreenRecording ? (
            <button onClick={startScreenRecording}>Start Screen Recording</button>
          ) : (
            <button onClick={stopScreenRecording}>Stop Screen Recording</button>
          )}
          {downloadScreenLink && (
            <a href={downloadScreenLink} download="screen-recording.webm">
              Download Screen Recording
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
