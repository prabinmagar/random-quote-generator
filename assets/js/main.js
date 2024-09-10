const API_KEY = "WmJ2GXRyRDh/+u1ejf88aA==X9ILHsAHLEfdPVDL";
let category = "happiness";
const url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;

async function fetchQuotes() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if(!response.ok){
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

fetchQuotes();