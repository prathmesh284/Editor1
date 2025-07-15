// import React, { useState,useEffect } from "react";
// import { Editor } from "@monaco-editor/react";
// import { Play } from "lucide-react"; // Import Play icon

// const MonacoEditorComponent = () => {
//   const [code, setCode] = useState("// Write JavaScript code here");
//   const [output, setOutput] = useState("");

//   const runCode = () => {
//     try {
//       let log = [];
//       const originalConsole = { ...console };

//       ["log", "warn", "error"].forEach((method) => {
//         console[method] = (...args) => log.push(args.join(" "));
//       });

//       new Function(code)(); // Execute user code

//       Object.assign(console, originalConsole);
//       setOutput(log.join("\n"));
//     } catch (error) {
//       setOutput("Error: " + error.message);
//     }
//   };

//   useEffect(() => {
//     const savedCode = localStorage.getItem("userCode");
//     if (savedCode) setCode(savedCode);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("userCode", code);
//   }, [code]);


//   return (
//     <div style={{ display: "flex", flexDirection: "row" }}>
//         <div style={{ height: "70vh", position: "relative", border: "1px solid #ddd", width: "55%" }}>
//           <Editor
//             height="100%"
//             language="javascript"
//             theme="vs-dark"
//             options={{ minimap: { enabled: false } }}
//             onChange={(value) => setCode(value)}
//           />

//           <button
//             onClick={runCode}
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "25px",
//               height: "40px",
//               width: "40px",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               background: "grey",
//               color: "black",
//               border: "none",
//               borderRadius: "10px",
//             }}
//           >
//             <Play size={20} />
//           </button>
//         </div>

//         <div style={{ border: "1px solid #ddd", padding: "10px", minHeight: "100px", background: "grey", width: "45%" }}>
//           <h4>Output:</h4>
//           <pre style={{ fontSize: "15px", whiteSpace: "pre-wrap" }}>{output}</pre>
//         </div>
//       </div>
//   );
// };

// export default MonacoEditorComponent;





// import React, { useState, useEffect } from "react";
// import { Editor } from "@monaco-editor/react";
// import { Play } from "lucide-react";
// import { db, ref, set, onValue, signInUser, getRoomId, getCurrentUser } from "./firebase";


// export const SignInButton = () => {
//   return (
//     <button onClick={signInUser} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
//       Sign in with Google
//     </button>
//   );
// };

// const MonacoEditorComponent = () => {
//   const [code, setCode] = useState("// Write JavaScript code here");
//   const [output, setOutput] = useState("");
//   const [roomId, setRoomId] = useState("");
//   const [inputRoomId, setInputRoomId] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         const signedInUser = await getCurrentUser();
//         setUser(signedInUser);
//         const room = await getRoomId();
//         setRoomId(room);
//         syncCodeWithRoom(room);
//       } catch (error) {
//         console.log("User not signed in. Awaiting authentication.");
//       }
//     };
//     initialize();
//   }, []);

//   // Sync code with Firebase
//   const syncCodeWithRoom = (room) => {
//     const roomRef = ref(db, `rooms/${room}/code`);
//     onValue(roomRef, (snapshot) => {
//       const newCode = snapshot.val();
//       if (newCode !== null && newCode !== code) {
//         setCode(newCode);
//       }
//     });
//   };

//   // Join an existing room
//   const joinRoom = async () => {
//     if (inputRoomId.trim() !== "") {
//       setRoomId(inputRoomId);
//       await getRoomId(inputRoomId);
//       syncCodeWithRoom(inputRoomId);
//     }
//   };

//   // Handle code change & update Firebase
//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     set(ref(db, `rooms/${roomId}/code`), newCode);
//   };

//   // Run code
//   const runCode = () => {
//     try {
//       let log = [];
//       const originalConsole = { ...console };
//       ["log", "warn", "error"].forEach((method) => {
//         console[method] = (...args) => log.push(args.join(" "));
//       });

//       new Function(code)(); // Execute user code

//       Object.assign(console, originalConsole);
//       setOutput(log.join("\n"));
//     } catch (error) {
//       setOutput("Error: " + error.message);
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
//       {!user ? (
//         <button onClick={signInUser} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
//           Sign in with Google
//         </button>
//       ) : (
//         <>
//           <h3>Room ID: {roomId} (Share this ID to collaborate)</h3>
//           <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//             <input
//               type="text"
//               placeholder="Enter Room ID"
//               value={inputRoomId}
//               onChange={(e) => setInputRoomId(e.target.value)}
//               style={{ padding: "8px", fontSize: "16px" }}
//             />
//             <button
//               onClick={joinRoom}
//               style={{ padding: "8px 15px", fontSize: "16px", cursor: "pointer" }}
//             >
//               Join Room
//             </button>
//           </div>

//           <div style={{ display: "flex", flexDirection: "row" }}>
//             <div style={{ height: "70vh", position: "relative", border: "1px solid #ddd", width: "55%" }}>
//               <Editor
//                 height="100%"
//                 language="javascript"
//                 theme="vs-dark"
//                 options={{ minimap: { enabled: false } }}
//                 value={code}
//                 onChange={handleCodeChange}
//               />
//               <button
//                 onClick={runCode}
//                 style={{
//                   position: "absolute",
//                   top: "10px",
//                   right: "25px",
//                   height: "40px",
//                   width: "40px",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   background: "grey",
//                   color: "black",
//                   border: "none",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <Play size={20} />
//               </button>
//             </div>

//             <div style={{ border: "1px solid #ddd", padding: "10px", minHeight: "100px", background: "grey", width: "45%" }}>
//               <h4>Output:</h4>
//               <pre style={{ fontSize: "15px", whiteSpace: "pre-wrap" }}>{output}</pre>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MonacoEditorComponent;






// import React, { useState, useEffect } from "react";
// import { Editor } from "@monaco-editor/react";
// import { Play } from "lucide-react";
// import { db, ref, set, onValue, signInUser } from "./firebase";

// const MonacoEditorComponent = ({ roomId }) => {
//   const [code, setCode] = useState("// Write JavaScript code here");
//   const [output, setOutput] = useState("");

//   useEffect(() => {
//     const initialize = async () => {
//       await signInUser(); // Ensure user is authenticated
//       syncCodeWithRoom(roomId);
//     };

//     initialize();
//   }, [roomId]);

//   const syncCodeWithRoom = (room) => {
//     const roomRef = ref(db, `rooms/${room}/code`);

//     onValue(roomRef, (snapshot) => {
//       const newCode = snapshot.val();
//       if (newCode !== null && newCode !== code) {
//         setCode(newCode);
//       }
//     });
//   };

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     set(ref(db, `rooms/${roomId}/code`), newCode);
//   };

//   const runCode = () => {
//     try {
//       let log = [];
//       const originalConsole = { ...console };

//       ["log", "warn", "error"].forEach((method) => {
//         console[method] = (...args) => log.push(args.join(" "));
//       });

//       new Function(code)();

//       Object.assign(console, originalConsole);
//       setOutput(log.join("\n"));
//     } catch (error) {
//       setOutput("Error: " + error.message);
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
//       <h3>Room ID: {roomId} (Share this ID to collaborate)</h3>
//       <div style={{ display: "flex", flexDirection: "row" }}>
//         <div style={{ height: "70vh", position: "relative", border: "1px solid #ddd", width: "55%" }}>
//           <Editor
//             height="100%"
//             language="javascript"
//             theme="vs-dark"
//             options={{ minimap: { enabled: false } }}
//             value={code}
//             onChange={handleCodeChange}
//           />

//           <button
//             onClick={runCode}
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "25px",
//               height: "40px",
//               width: "40px",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               background: "grey",
//               color: "black",
//               border: "none",
//               borderRadius: "10px",
//             }}
//           >
//             <Play size={20} />
//           </button>
//         </div>

//         <div style={{ border: "1px solid #ddd", padding: "10px", minHeight: "100px", background: "grey", width: "45%" }}>
//           <h4>Output:</h4>
//           <pre style={{ fontSize: "15px", whiteSpace: "pre-wrap", textAlign:"start"}}>{output}</pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MonacoEditorComponent;





// import React, { useState, useEffect } from "react";
// import { Editor } from "@monaco-editor/react";
// import { Play } from "lucide-react";
// import { db, ref, set, onValue, signInUser } from "../firebase/firebase";
// import "./MonacoEditorComponent.css";

// const MonacoEditorComponent = ({ roomId }) => {
//   const [code, setCode] = useState("// Write JavaScript code here");
//   const [output, setOutput] = useState("");
//   const [showOutput, setShowOutput] = useState(false);

//   useEffect(() => {
//     const initialize = async () => {
//       // await signInUser();
//       syncCodeWithRoom(roomId);
//     };
//     initialize();
//   }, [roomId]);

//   const syncCodeWithRoom = (room) => {
//     const roomRef = ref(db, `rooms/${room}/code`);

//     onValue(roomRef, (snapshot) => {
//       const newCode = snapshot.val();
//       if (newCode !== null && newCode !== code) {
//         setCode(newCode);
//       }
//     });
//   };

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     set(ref(db, `rooms/${roomId}/code`), newCode);
//   };

//   const runCode = () => {
//     try {
//       let log = [];
//       const originalConsole = { ...console };

//       ["log", "warn", "error"].forEach((method) => {
//         console[method] = (...args) => log.push(args.join(" "));
//       });

//       new Function(code)(); 

//       Object.assign(console, originalConsole);
//       setOutput(log.join("\n"));
//     } catch (error) {
//       setOutput("Error: " + error.message);
//     }
//     setShowOutput(true); // Ensure output always shows when running
//   };


//   return (
//     <div className="editor-container">
//       <h3 className="room-info">Room ID: {roomId}</h3>

//       <div className="editor-wrapper">
//         <Editor
//           height="70vh"
//           language="javascript"
//           theme="vs-dark"
//           value={code}
//           onChange={handleCodeChange}
//           options={{ minimap: { enabled: false } }}
//         />
//         <button className="run-btn" onClick={runCode}>
//           <Play size={16} /> Run
//         </button>
//       </div>

//       {showOutput && (
//         <div className="output-box overlay">
//           <div className="output-header">
//             <h4>Output:</h4>
//             <button className="close-btn" onClick={() => setShowOutput(false)}>✖</button>
//           </div>
//           <pre>{output}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MonacoEditorComponent;



//### codellama-backend

// // MonacoEditorComponent.jsx
// import React, { useState, useEffect } from "react";
// import { Editor } from "@monaco-editor/react";
// import { Play } from "lucide-react";
// import { db, ref, set, onValue } from "../firebase/firebase";
// import "./MonacoEditorComponent.css";

// const MonacoEditorComponent = ({ roomId }) => {
//   const [code, setCode] = useState("// Write JavaScript code here");
//   const [output, setOutput] = useState("");
//   const [showOutput, setShowOutput] = useState(false);
//   const [suggestion, setSuggestion] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   useEffect(() => {
//     const roomRef = ref(db, `rooms/${roomId}/code`);
//     const unsubscribe = onValue(roomRef, (snapshot) => {
//       const newCode = snapshot.val();
//       if (newCode !== null && newCode !== code) setCode(newCode);
//     });
//     return () => unsubscribe();
//   }, [roomId,code]);

//   // Debounce Firebase code sync (optional but useful)
// let debounceTimer;

// const handleCodeChange = (newCode) => {
//   setCode(newCode);
//   clearTimeout(debounceTimer);
//   debounceTimer = setTimeout(() => {
//     set(ref(db, `rooms/${roomId}/code`), newCode);
//   }, 500);
// };

// const fetchSuggestion = async () => {
//   setShowSuggestions(true);
//   setSuggestion("⏳ Generating suggestion...");
//   try {
//     const response = await fetch("http://localhost:8080/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt: code }),
//     });
//     const data = await response.json();
//     if (data.completion) {
//       setSuggestion(data.completion.trim());
//     } else {
//       setSuggestion("⚠️ No suggestion returned.");
//     }
//   } catch (error) {
//     console.error("Suggestion fetch failed:", error);
//     setSuggestion("❌ Failed to fetch suggestion.");
//   }
// };

// const applySuggestion = () => {
//   const updatedCode = `${code}\n${suggestion}`;
//   setCode(updatedCode);
//   set(ref(db, `rooms/${roomId}/code`), updatedCode);
//   setSuggestion("");
//   setShowSuggestions(false);
// };

//   const runCode = () => {
//     try {
//       let log = [];
//       const originalConsole = { ...console };
//       ["log", "warn", "error"].forEach(
//         (method) => (console[method] = (...args) => log.push(args.join(" ")))
//       );
//       new Function(code)();
//       Object.assign(console, originalConsole);
//       setOutput(log.join("\n"));
//     } catch (error) {
//       setOutput("Error: " + error.message);
//     }
//     setShowOutput(true);
//   };


//   return (
//     <div className="editor-container">
//       <h3 className="room-info">Room ID: {roomId}</h3>

//       <div className="editor-wrapper">
//         <Editor
//           height="70vh"
//           language="javascript"
//           theme="vs-dark"
//           value={code}
//           onChange={handleCodeChange}
//           options={{ minimap: { enabled: false } }}
//         />
//         <button className="run-btn" onClick={runCode}>
//           <Play size={16} /> Run
//         </button>
//         {output && (
//           <>
//             <button className="apply-btn" onClick={fetchSuggestion}>
//               Generate Suggestion
//             </button>
//             {showSuggestions && suggestion && (
//               <div className="suggestion-box">
//                 <h4>Suggestion:</h4>
//                 <pre>{suggestion}</pre>
//                 <button
//                   className="apply-suggestion-btn"
//                   onClick={applySuggestion}
//                 >
//                   Apply Suggestion
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {showOutput && (
//         <div className="output-box overlay">
//           <div className="output-header">
//             <h4>Output:</h4>
//             <button className="close-btn" onClick={() => setShowOutput(false)}>
//               ✖
//             </button>
//           </div>
//           <pre>{output}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MonacoEditorComponent;



//### Gemini's api

// MonacoEditorComponent.jsx
import { useState, useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { Play } from "lucide-react";
import { db, ref, set } from "../firebase/firebase";
import "./MonacoEditorComponent.css";

const MonacoEditorComponent = ({ roomId }) => {
  const [code, setCode] = useState("// Write JavaScript code here");
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const latestCode = useRef(code);

  useEffect(() => {
    latestCode.current = code;
  }, [code]);

  const handleCodeChange = (newCode) => {
    setCode(newCode || "");
  };
  const saveCodeToFirebase = () => {
    set(ref(db, `rooms/${roomId}/code`), latestCode.current);
  };

  const fetchSuggestion = async () => {
    setShowSuggestions(true);
    setSuggestion("⏳ Generating suggestion...");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `Suggest continuation or improvement for this JavaScript code:\n\n${code}` }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const generatedText =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (generatedText) {
        setSuggestion(generatedText);
      } else {
        setSuggestion("⚠️ No suggestion returned.");
      }
    } catch (error) {
      console.error("Suggestion fetch failed:", error);
      setSuggestion("❌ Failed to fetch suggestion.");
    }
  };

  const applySuggestion = () => {
    const updatedCode = `${code}\n${suggestion}`;
    setCode(updatedCode);
    set(ref(db, `rooms/${roomId}/code`), updatedCode);
    setSuggestion("");
    setShowSuggestions(false);
  };

  const runCode = () => {
    try {
      let log = [];
      const originalConsole = { ...console };
      ["log", "warn", "error"].forEach(
        (method) => (console[method] = (...args) => log.push(args.join(" ")))
      );
      new Function(code)();
      Object.assign(console, originalConsole);
      setOutput(log.join("\n"));
    } catch (error) {
      setOutput("Error: " + error.message);
    }
    setShowOutput(true);
  };

  return (
    <div className="editor-container">
      <h3 className="room-info">Room ID: {roomId}</h3>

      <div className="editor-wrapper">
        <Editor
          height="70vh"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{ minimap: { enabled: false } }}
        />
        <button className="save-btn" onClick={saveCodeToFirebase}>💾 Save</button>
        <button className="run-btn" onClick={runCode}>
          <Play size={16} /> Run
        </button>
        <button className="apply-btn" onClick={fetchSuggestion}>
          Generate Suggestion
        </button>
        {showSuggestions && suggestion && (
          <div className="suggestion-box">
            <h4>Suggestion:</h4>
            <pre>{suggestion}</pre>
            <button
              className="apply-suggestion-btn"
              onClick={applySuggestion}
            >
              Apply Suggestion
            </button>
          </div>
        )}
      </div>

      {showOutput && (
        <div className="output-box overlay">
          <div className="output-header">
            <h4>Output:</h4>
            <button className="close-btn" onClick={() => setShowOutput(false)}>
              ✖
            </button>
          </div>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default MonacoEditorComponent;
