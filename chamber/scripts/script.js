document.getElementById('menu').addEventListener('click', function() {
    const nav = document.querySelector('.navigation');
    nav.classList.toggle('show');
  });

  const currentYear= new Date().getFullYear();
const lastModified=document.lastModified;

document.getElementById('currentyear').textContent=currentYear;
document.getElementById('lastModified').textContent=lastModified;

  document.addEventListener("DOMContentLoaded", () => {
    const memberCardSection = document.querySelector(".member-card");
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle View";
  
    const mainElement = document.querySelector("main");
    mainElement.insertBefore(toggleButton, memberCardSection);
  
    let isGridView = true;
  
    toggleButton.addEventListener("click", () => {
      isGridView = !isGridView;
      displayMembers();
    });
  
    async function fetchMembers() {
      const response = await fetch('./data/members.json');
      const members = await response.json();
      return members;
    }
  
    async function displayMembers() {
      const members = await fetchMembers();
      memberCardSection.innerHTML = "";  
  
      members.forEach((member) => {
        const memberDiv = document.createElement("div");
        memberDiv.classList.add("member");
  
        memberDiv.innerHTML = `
          <img src="images/${member.icon}" alt="${member.name} logo" class="member-icon">
          <h2>${member.name}</h2>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
          <p><strong>Membership Level:</strong> ${member.membershipLevel === 1 ? 'Member' : member.membershipLevel === 2 ? 'Silver' : 'Gold'}</p>
          <p><strong>Other Info:</strong> ${member.otherInfo}</p>
        `;
  
        if (isGridView) {
          memberDiv.style.display = "inline-block";
          memberDiv.style.width = "30%";
          memberDiv.style.margin = "1%";
        } else {
          memberDiv.style.display = "block";
          memberDiv.style.width = "100%";
        }
  
        memberCardSection.appendChild(memberDiv);
      });
    }
  
    displayMembers();  
  });
  