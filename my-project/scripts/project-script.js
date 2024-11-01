document.getElementById('menu').addEventListener('click', function() {
  const nav = document.querySelector('.navigation');
  nav.classList.toggle('show');
});

const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;

document.getElementById('currentyear').textContent = currentYear;
document.getElementById('lastModified').textContent = lastModified;

document.addEventListener('DOMContentLoaded', fetchnews);
const apiKey = "3f8e4928d9d64d45b9bd7d6b734c6e70";
const url = `https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=${apiKey}`;
const heroSection = document.querySelector("#hero .hero-content");
const latestNews = document.querySelector("#latest-news .news-grid");
const blogSection = document.querySelector("#blog .blog-grid");



async function fetchnews() {
  try {
      const response = await fetch(url);
      const data = await response.json();
      const articles = data.articles;
      
      if (articles.length < 7) {
          console.warn('Not enough data to display');
          return;
      }


      heroSection.innerHTML = "";


      const firstArticle = articles[0];
      const heroImg = document.createElement("img");
      heroImg.src = firstArticle.urlToImage || "placeholder-image.jpg";
      heroImg.alt = firstArticle.title;
      heroImg.loading = "lazy";

      const heroTitle = document.createElement("h3");
      heroTitle.textContent = firstArticle.title;

      const heroDescription = document.createElement("p");
      heroDescription.textContent = firstArticle.description || "No description for this article";

      const readMore = document.createElement("a");
      readMore.href = firstArticle.url;
      readMore.textContent = 'Read More';
      readMore.target = "_blank";

      heroSection.appendChild(heroImg);
      heroSection.appendChild(heroTitle);
      heroSection.appendChild(heroDescription);
      heroSection.appendChild(readMore);

  
      latestNews.innerHTML = "";


      articles.slice(1, 5).forEach(article => {
          const latestImg = document.createElement("img");
          latestImg.src = article.urlToImage || "placeholder-image.jpg";
          latestImg.alt = article.title;
          latestImg.loading = "lazy";

          const latestTitle = document.createElement("h3");
          latestTitle.textContent = article.title;

          const latestDesc = document.createElement("p");
          latestDesc.textContent = article.description || "No description for this article";

          const latestReadMore = document.createElement("a");
          latestReadMore.href = article.url;
          latestReadMore.textContent = 'Read More';
          latestReadMore.target = "_blank";

          const newsItem = document.createElement("div");
          newsItem.classList.add("news-item");
          newsItem.appendChild(latestImg);
          newsItem.appendChild(latestTitle);
          newsItem.appendChild(latestDesc);
          newsItem.appendChild(latestReadMore);

          latestNews.appendChild(newsItem);
      });


      blogSection.innerHTML = "";

    
      articles.slice(5, 7).forEach(article => {
          const blogTitle = document.createElement("h3");
          blogTitle.textContent = article.title;

          const blogDesc = document.createElement("p");
          blogDesc.textContent = article.description || "No description for this article";

          const blogUrl = document.createElement("a");
          blogUrl.href = article.url;
          blogUrl.textContent = "Read More";
          blogUrl.target = "_blank";

          const blogItem = document.createElement("div");
          blogItem.classList.add("blog-item");
          blogItem.appendChild(blogTitle);
          blogItem.appendChild(blogDesc);
          blogItem.appendChild(blogUrl);

          blogSection.appendChild(blogItem);
      });

      //Javascript code for news page
       blogSection.innerHTML = "";

    
      articles.slice(5, 7).forEach(article => {
          const blogTitle = document.createElement("h3");
          blogTitle.textContent = article.title;

          const blogDesc = document.createElement("p");
          blogDesc.textContent = article.description || "No description for this article";

          const blogUrl = document.createElement("a");
          blogUrl.href = article.url;
          blogUrl.textContent = "Read More";
          blogUrl.target = "_blank";

          const blogItem = document.createElement("div");
          blogItem.classList.add("blog-item");
          blogItem.appendChild(blogTitle);
          blogItem.appendChild(blogDesc);
          blogItem.appendChild(blogUrl);

          blogSection.appendChild(blogItem);
      });
      
      


  } catch (error) {
      console.error("Error fetching news data:", error);
  }
}

fetchnews();
