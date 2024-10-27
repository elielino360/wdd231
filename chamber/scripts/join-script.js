const openButton1 = document.querySelector("#open-bt1");
const openButton2 = document.querySelector("#open-bt2");
const openButton3 = document.querySelector("#open-bt3");
const openButton4 = document.querySelector("#open-bt4");

const closeButton = document.querySelector("#close-bt");
const dialogBox = document.querySelector("#dialogBox");
const myText = document.querySelector("#dialogBox div");

openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    myText.innerHTML = `Exclusively for non-profit organizations, this free membership level offers an opportunity to gain visibility and connect with a supportive community. Access basic features like directory listings and event participation, all designed to support your mission without any cost.`;
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});

openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    myText.innerHTML = `Our Bronze Membership is perfect for small businesses and startups aiming to make their mark. Enjoy directory listings and gain access to exclusive events and basic advertising opportunities. This is a great way to build your brand and connect with potential clients.`;
});

openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    myText.innerHTML = `Take your business to the next level with our Silver Membership. In addition to the benefits of the Bronze level, you’ll receive premium directory placement, enhanced advertising options, and discounts on special events and training sessions to help grow your business.`;
});

openButton4.addEventListener("click", () => {
    dialogBox.showModal();
    myText.innerHTML = `The Gold Membership is designed for businesses ready to maximize their exposure and opportunities. Enjoy all the perks of the Silver level, plus top-tier directory placement, priority advertising on our homepage, and VIP access to exclusive events, workshops, and training sessions. Perfect for businesses seeking the ultimate growth advantage.`;
});

