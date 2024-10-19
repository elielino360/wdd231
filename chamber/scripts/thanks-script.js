// thanks-script.js
document.addEventListener("DOMContentLoaded", function() {
   
    const queryString = window.location.search;
    
    const urlParams = new URLSearchParams(queryString);


    const firstName = urlParams.get("first");
    const lastName = urlParams.get("last");
    const email = urlParams.get("email");
    const phoneNumber = urlParams.get("phone%20number"); 
    const organization = urlParams.get("organization");
    const timeStamp = urlParams.get("TimeStamp");

    
    const outputHTML = `
        <h2>Thank you for your submission!</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Business/Organization Name:</strong> ${organization}</p>
        <p><strong>Submission Timestamp:</strong> ${timeStamp}</p>
    `;

    document.querySelector(".showData").innerHTML = outputHTML;
});
