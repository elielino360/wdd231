document.getElementById('menu').addEventListener('click', function() {
    const nav = document.querySelector('.navigation');
    nav.classList.toggle('show');
  });

  const currentYear= new Date().getFullYear();
  const lastModified=document.lastModified;

  document.getElementById('currentyear').textContent=currentYear;
  document.getElementById('lastModified').textContent=lastModified;

  const visitMessageDiv = document.getElementById("visitMessage");
  const lastVisit = localStorage.getItem("lastVisit");

  // Code for discovery page

  const now = Date.now(); 

  if (!lastVisit) {

    visitMessageDiv.textContent = "Welcome! Let us know if you have any questions.";
  } else {

    const lastVisitDate = parseInt(lastVisit, 10);
    const timeDifference = now - lastVisitDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {

      visitMessageDiv.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {

      visitMessageDiv.textContent = "You last visited 1 day ago.";
    } else {

      visitMessageDiv.textContent = `You last visited ${daysDifference} days ago.`;
    }
  }
  
  localStorage.setItem("lastVisit", now.toString());

