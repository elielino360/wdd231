document.addEventListener('DOMContentLoaded', fetchnews);

const apiKey = "di9RfiBPaS94TZdGa1sEH9PACwNBzaOeguFhi4MQ58K3SSLt";
const url = `https://api.currentsapi.services/v1/latest-news?category=technology&language=en&apiKey=${apiKey}`;

// JavaScript DOM elements for the news page
const myHeadline = document.querySelector("#Headline .Headline-content");
const myNews = document.querySelector("#news .news-now");

let currentPage = 1;
const articlesPerPage = 9; 

async function fetchnews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const articles = data.news; 

        if (articles.length < 7) {
            console.warn('Not enough data to display');
            return;
        }

        
        displayHeadline(articles[0]); 

        
        displayNewsPage(articles);

        
        document.getElementById('prev-page').addEventListener('click', () => paginate(articles, -1));
        document.getElementById('next-page').addEventListener('click', () => paginate(articles, 1));
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
}


function displayHeadline(headlineNews) {
    myHeadline.innerHTML = "";

    const headLImg = document.createElement("img");
    headLImg.src = headlineNews.image || "placeholder-image.jpg"; 
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


function displayNewsPage(articles) {
    myNews.innerHTML = ""; 
    const start = (currentPage - 1) * articlesPerPage + 1; 
    const end = start + articlesPerPage; 


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


function paginate(articles, direction) {
    const totalPages = Math.ceil((articles.length - 1) / articlesPerPage); // Exclude headline article
    currentPage = Math.min(Math.max(1, currentPage + direction), totalPages);
    
  
    displayNewsPage(articles);
}
