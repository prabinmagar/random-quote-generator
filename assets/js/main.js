let categories = [];
let quotes = [];
let selectedCategory = null;
let currentQuoteIndex = null;
let filteredQuotes = [];

const generateBtn = document.getElementById("generate-btn");
const prevQuoteBtn = document.getElementById("prev-quote");
const nextQuoteBtn = document.getElementById("next-quote");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const categoryText = document.getElementById("category");
const categoriesDropdown = document.getElementById("categories-dropdown");
const messageBox = document.getElementById("message-box");
const decreaseFontBtn = document.getElementById("decrease-font-btn");
const increaseFontBtn = document.getElementById("increase-font-btn");
const quoteTextBlock = document.querySelector(".quote-text");
const themeBtn = document.getElementById('theme-btn');

async function fetchQuotesData() {
  try {
    const response = await fetch("mockData.json");
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    quotes = data;
    categories = [...new Set(quotes.map((item) => item.category))];
    if (categories.length > 0) {
      showCategoriesDropdown();
      filterQuotesByCategory(selectedCategory);
    }
  } catch (error) {
    console.log(error);
  }
}

fetchQuotesData();

const showCategoriesDropdown = () => {
  const categoriesSelect = document.createElement("select");
  const selectLabelOption = document.createElement("option");
  selectLabelOption.textContent = "Select a category";
  selectLabelOption.value = "";
  selectLabelOption.selected = true;
  categoriesSelect.appendChild(selectLabelOption);

  categories.forEach((category) => {
    const categoryOption = document.createElement("option");
    categoryOption.textContent = category;
    categoryOption.value = category;
    categoriesSelect.appendChild(categoryOption);
    quoteTextBlock.classList.add("hide");
  });

  categoriesSelect.addEventListener("change", (event) => {
    selectedCategory = event.target.value;

    if (selectedCategory) {
      filterQuotesByCategory(selectedCategory);
      quoteText.textContent = "";
      authorText.textContent = "";
      categoryText.textContent = "";
      messageBox.textContent = "";
      quoteTextBlock.classList.add("hide");
    } else {
      showMessage("Please select a category.");
    }
  });

  categoriesDropdown.appendChild(categoriesSelect);
};

const filterQuotesByCategory = (category) => {
  filteredQuotes = quotes.filter((quote) => quote.category === category);
  currentQuoteIndex = filteredQuotes.length > 0 ? 0 : null;
};

const generateRandomQuote = () => {
  if (!selectedCategory) {
    showMessage("Please select a category.");
    return;
  }

  if (filteredQuotes.length === 0) {
    showMessage("No quotes available for the selected category.");
    return;
  }

  if (currentQuoteIndex === null) {
    currentQuoteIndex = Math.floor(Math.random() * filteredQuotes.length);
  }

  const quote = filteredQuotes[currentQuoteIndex];
  quoteText.textContent = quote.quote;
  authorText.textContent = quote.author;
  categoryText.textContent = `(${quote.category})`;
  quoteTextBlock.classList.remove("hide");
};

const handlePrevQuote = () => {
  if (filteredQuotes.length === 0 || currentQuoteIndex === null) {
    showMessage("No quotes available for the selected category.");
    return;
  }
  currentQuoteIndex =
    (currentQuoteIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
  const quote = filteredQuotes[currentQuoteIndex];
  quoteText.textContent = quote.quote;
  authorText.textContent = quote.author;
  categoryText.textContent = `(${quote.category})`;
  quoteTextBlock.classList.remove("hide");
};

const handleNextQuote = () => {
  if (filteredQuotes.length === 0 || currentQuoteIndex === null) {
    showMessage("No quotes available for the selected category.");
    return;
  }
  currentQuoteIndex = (currentQuoteIndex + 1) % filteredQuotes.length;
  const quote = filteredQuotes[currentQuoteIndex];
  quoteText.textContent = quote.quote;
  authorText.textContent = quote.author;
  categoryText.textContent = `(${quote.category})`;
  quoteTextBlock.classList.remove("hide");
};

const generateRandomIndex = () => {
  return Math.floor(Math.random() * quotes.length);
};

const showMessage = (message) => {
  messageBox.textContent = message;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 1000);
};

const increaseQuoteFontSize = () => {
  const quoteText = document.getElementById("quote");
  const currentFontSize = parseInt(window.getComputedStyle(quoteText).fontSize);
  const newFontSize = currentFontSize + 2;
  quoteText.style.fontSize = `${newFontSize}px`;
};

const decreaseQuoteFontSize = () => {
  const quoteText = document.getElementById("quote");
  const currentFontSize = parseInt(window.getComputedStyle(quoteText).fontSize);
  const newFontSize = currentFontSize - 2;
  quoteText.style.fontSize = `${newFontSize}px`;
};

const toggleThemeMode = () => {
  const pageBody = document.body;
  pageBody.classList.toggle("dark-mode");

  if (pageBody.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};

const useSavedTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add('dark-mode');
  }
}

useSavedTheme();

generateBtn.addEventListener("click", generateRandomQuote);
nextQuoteBtn.addEventListener("click", handleNextQuote);
prevQuoteBtn.addEventListener("click", handlePrevQuote);
decreaseFontBtn.addEventListener("click", decreaseQuoteFontSize);
increaseFontBtn.addEventListener("click", increaseQuoteFontSize);
themeBtn.addEventListener("click", toggleThemeMode);
