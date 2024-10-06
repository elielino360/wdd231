document.getElementById('menu').addEventListener('click', function() {
    const nav = document.querySelector('.navigation');
    nav.classList.toggle('show');
  });

  const currentYear= new Date().getFullYear();
const lastModified=document.lastModified;

document.getElementById('currentyear').textContent=currentYear;
document.getElementById('lastModified').textContent=lastModified;