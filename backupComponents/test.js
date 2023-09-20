const fetch = require("node-fetch");

async function fetchCard() {
  try {
    const cardName = "goblin guide"; // Replace with the name of the card you want to fetch

    const apiUrl = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(
      cardName
    )}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const cardData = await response.json();

    // Log the card's JSON data to the console
    console.log(cardData);
  } catch (error) {
    console.error("Error fetching card:", error);
  }
}

// Call the fetchCard function to fetch and log the card data
fetchCard();
