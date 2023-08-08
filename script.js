// Variables
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const loader = document.getElementById("loader");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("quote-btn");
const quoteTag = document.getElementById("quote-tag");

// Quotes array
let apiQuotes = [];

const showLoadingSpinner = () => {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Choose next quote 
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from quotes array (* apiQuotes.length)
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // If the quote is longer than 80 characters, make the font size smaller
    if (quote.text.length > 80) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    // If the author is unkown, show him as "unkown"
    if (quote.author === "Unkown") {
        quoteAuthor.textContent === "Unkown";
    } else {
        quoteAuthor.textContent = quote.author;
    }
    //show quote & hide loading spinner
    quoteText.textContent = quote.text;
    quoteTag.textContent = `Quote tag: ${quote.tag}`
    removeLoadingSpinner();
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
        getQuotes();
        console.log(error);
    }
    removeLoadingSpinner();
}

//Twitte API
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, "_blank");
    newQuote();
}

// Add event listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

// On load
getQuotes();