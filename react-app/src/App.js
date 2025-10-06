import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }), // sending JSON
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setResponse(data.response); // update the response
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error connecting to backend");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎤 Jarvis - Digital Assistant</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
        style={{ padding: "8px", width: "300px" }}
      />
      <button
        onClick={handleSubmit}
        style={{ marginLeft: "10px", padding: "8px 16px" }}
      >
        Send
      </button>
      <h2>Response: {response}</h2>
    </div>
  );
}
export default App;
// import React, { useState } from "react";
// import { Box, Input, Button, Text, Heading } from "@chakra-ui/react";

// function App() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/process", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: message }),
//       });
//       const data = await res.json();
//       setResponse(data.response);
//     } catch (error) {
//       setResponse("⚠️ Error connecting to backend");
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       h="100vh"
//       bgGradient="linear(to-r, blue.500, purple.600)"
//       color="white"
//     >
//       <Box bg="blackAlpha.700" p={8} rounded="2xl" shadow="2xl" w="400px" textAlign="center">
//         <Heading mb={6}>🎤 Jarvis - Digital Assistant</Heading>
//         <Input
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           bg="white"
//           color="black"
//         />
//         <Button mt={4} colorScheme="teal" w="100%" onClick={handleSubmit}>
//           Send
//         </Button>
//         <Text mt={6} fontSize="lg">
//           Response: {response}
//         </Text>
//       </Box>
//     </Box>
//   );
// }

// export default App;
