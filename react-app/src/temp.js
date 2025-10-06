// import React, { useState } from "react";

// function App() {
//   const [message, setMessage] = useState("");
//   const [listening, setListening] = useState(false);

//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US"; // You can change language here
//     recognition.continuous = false; // stop after one sentence
//     recognition.interimResults = false; // only final result

//     recognition.onstart = () => {
//       setListening(true);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       console.log("You said:", transcript);
//       setMessage(transcript); // store text in state
//     };

//     recognition.start();
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>🎤 Jarvis Voice Command</h1>
      
//       <button onClick={startListening} style={styles.micButton}>
//         {listening ? "🛑 Stop Listening" : "🎙 Start Listening"}
//       </button>

//       <div style={styles.outputBox}>
//         <h3>Recognized Text:</h3>
//         <p>{message || "Say something..."}</p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: "center",
//     marginTop: "100px",
//     fontFamily: "Arial, sans-serif",
//   },
//   heading: {
//     fontSize: "28px",
//     marginBottom: "20px",
//   },
//   micButton: {
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     padding: "15px 30px",
//     fontSize: "18px",
//     borderRadius: "50px",
//     cursor: "pointer",
//   },
//   outputBox: {
//     marginTop: "40px",
//     padding: "20px",
//     border: "2px solid #ccc",
//     borderRadius: "10px",
//     width: "400px",
//     marginLeft: "auto",
//     marginRight: "auto",
//     backgroundColor: "#f9f9f9",
//   },
// };

// export default App;
// // // App.js
// // import React, { useState, useRef } from "react";

// // function App() {
// //   const [recording, setRecording] = useState(false);
// //   const [recognizedText, setRecognizedText] = useState("");
// //   const [status, setStatus] = useState("idle");
// //   const mediaRecorderRef = useRef(null);
// //   const audioChunksRef = useRef([]);

// //   const startRecording = async () => {
// //     setRecognizedText("");
// //     setStatus("requesting_microphone");
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// //       const options = { mimeType: "audio/webm" }; // webm is widely supported in browsers
// //       const recorder = new MediaRecorder(stream, options);

// //       recorder.ondataavailable = (e) => {
// //         if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
// //       };

// //       recorder.onstop = async () => {
// //         const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
// //         audioChunksRef.current = [];
// //         setStatus("sending_to_stt");
// //         try {
// //           // send to FastAPI STT endpoint
// //           const fd = new FormData();
// //           fd.append("file", blob, "speech.webm");

// //           const res = await fetch("http://127.0.0.1:8000/stt", {
// //             method: "POST",
// //             body: fd,
// //           });

// //           if (!res.ok) {
// //             const text = await res.text();
// //             throw new Error("STT failed: " + text);
// //           }
// //           const json = await res.json();
// //           // json expected: { "raw_text": "...", "corrected_text": "..." }
// //           setRecognizedText(json.corrected_text ?? json.raw_text ?? "");
// //           setStatus("done");
// //         } catch (err) {
// //           console.error(err);
// //           setStatus("error_sending");
// //         }
// //       };

// //       recorder.start();
// //       mediaRecorderRef.current = recorder;
// //       setRecording(true);
// //       setStatus("recording");
// //     } catch (err) {
// //       console.error("microphone error", err);
// //       setStatus("mic_error");
// //     }
// //   };

// //   const stopRecording = () => {
// //     setRecording(false);
// //     setStatus("stopping");
// //     try {
// //       const recorder = mediaRecorderRef.current;
// //       if (recorder && recorder.state !== "inactive") {
// //         recorder.stop();
// //         // stop tracks
// //         recorder.stream.getTracks().forEach((t) => t.stop());
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const sendToBrain = async () => {
// //     // example: send recognizedText to your Jarvis brain
// //     if (!recognizedText) return alert("No text to send");
// //     const res = await fetch("http://127.0.0.1:8001/brain", { // change to your brain endpoint
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ text: recognizedText }),
// //     });
// //     const j = await res.json();
// //     console.log("brain response", j);
// //     alert(JSON.stringify(j));
// //   };

// //   return (
// //     <div style={{ textAlign: "center", marginTop: 80 }}>
// //       <h1>Jarvis — Record & Send</h1>
// //       <p>Status: {status}</p>

// //       {recording ? (
// //         <button onClick={stopRecording} style={buttonStyle}>⏹ Stop</button>
// //       ) : (
// //         <button onClick={startRecording} style={buttonStyle}>🎙 Start</button>
// //       )}

// //       <div style={{ marginTop: 20 }}>
// //         <h3>Recognized / Corrected Text</h3>
// //         <div style={{ border: "1px solid #ccc", padding: 16, width: 600, margin: "auto" }}>
// //           {recognizedText || <i>Say something and stop to transcribe...</i>}
// //         </div>
// //       </div>

// //       <div style={{ marginTop: 12 }}>
// //         <button onClick={sendToBrain} style={buttonStyle}>➡️ Send to Jarvis Brain</button>
// //       </div>
// //     </div>
// //   );
// // }

// // const buttonStyle = {
// //   padding: "12px 24px",
// //   fontSize: 18,
// //   margin: 8,
// //   cursor: "pointer",
// // };

// // export default App;

