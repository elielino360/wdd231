document.addEventListener('DOMContentLoaded', fetchnews);

const apiKey = "di9RfiBPaS94TZdGa1sEH9PACwNBzaOeguFhi4MQ58K3SSLt";
const url = `https://api.currentsapi.services/v1/latest-news?category=technology&language=en&apiKey=${apiKey}`;

// JavaScript DOM elements for the news page
const myHeadline = document.querySelector("#Headline .Headline-content");
const myNews = document.querySelector("#news .news-now");

let currentPage = 1;
const articlesPerPage = 8; // Display 8 articles per page

async function fetchnews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const articles = data.news; // Currents API uses 'news' for the articles array

        if (articles.length < 7) {
            console.warn('Not enough data to display');
            return;
        }

        // Display headline news
        displayHeadline(articles[0]); // Assuming the first article as the headline

        // Initialize pagination on the Latest News section
        displayNewsPage(articles);

        // Add event listeners for pagination buttons
        document.getElementById('prev-page').addEventListener('click', () => paginate(articles, -1));
        document.getElementById('next-page').addEventListener('click', () => paginate(articles, 1));
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
}

// Display headline news
function displayHeadline(headlineNews) {
    myHeadline.innerHTML = "";

    const headLImg = document.createElement("img");
    headLImg.src = headlineNews.image || "placeholder-image.jpg"; // 'image' instead of 'urlToImage'
    headLImg.alt = headlineNews.title;
    headLImg.loading = "lazy";

    const headlineTitle = document.createElement("h3");
    headlineTitle.textContent = headlineNews.title;

    const headlineDescription = document.createElement("p");
    headlineDescription.textContent = headlineNews.description || "No description for this article";

    const visitLink = document.createElement("a");
    visitLink.href = headlineNews.url;
    visitLink.textContent = 'Read More';
    visitLink.target = "_blank";

    myHeadline.appendChild(headLImg);
    myHeadline.appendChild(headlineTitle);
    myHeadline.appendChild(headlineDescription);
    myHeadline.appendChild(visitLink);
}

// Display articles for the current page
function displayNewsPage(articles) {
    myNews.innerHTML = ""; // Clear existing articles
    const start = (currentPage - 1) * articlesPerPage + 1; // Start index, excluding the headline
    const end = start + articlesPerPage; // End index

    // Populate news section with articles for the current page
    articles.slice(start, end).forEach(article => {
        const newsImg = document.createElement("img");
        newsImg.src = article.image || "placeholder-image.jpg";
        newsImg.alt = article.title;
        newsImg.loading = "lazy";

        const newsTitle = document.createElement("h3");
        newsTitle.textContent = article.title;

        const newsDesc = document.createElement("p");
        newsDesc.textContent = article.description || "No description for this article";

        const newsReadMore = document.createElement("a");
        newsReadMore.href = article.url;
        newsReadMore.textContent = 'Read More';
        newsReadMore.target = "_blank";

        const myNewNow = document.createElement("div");
        myNewNow.classList.add("myNews-item");
        myNewNow.appendChild(newsImg);
        myNewNow.appendChild(newsTitle);
        myNewNow.appendChild(newsDesc);
        myNewNow.appendChild(newsReadMore);

        myNews.appendChild(myNewNow);
    });
}

// Handle pagination logic
function paginate(articles, direction) {
    const totalPages = Math.ceil((articles.length - 1) / articlesPerPage); // Exclude headline article
    currentPage = Math.min(Math.max(1, currentPage + direction), totalPages);
    
    // Refresh the display with the updated page
    displayNewsPage(articles);
}
