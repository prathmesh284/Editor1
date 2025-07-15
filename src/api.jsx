// const API_URL = 'http://localhost:8080/generate'; // Change if deployed

// // src/api.js
// export async function fetchCodeSuggestion(prompt) {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ prompt }),
//   });

//   if (!response.ok) {
//     throw new Error("API error");
//   }

//   const data = await response.json();
//   return data.generated_code;
// }
