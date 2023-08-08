// Variables
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const loader = document.getElementById("loader");

// Quotes array
let apiQuotes = [];

function showLoadingSpinner() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Choose next quote 
function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (quote.text.length > 80) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = quote.author;
}

// Get quotes from API
async function getQuotes() {
    showLoadingSpinner();
    // Set API url
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error);
    }
    removeLoadingSpinner();
}

// On load
getQuotes();