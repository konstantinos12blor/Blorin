// Αρχικές μεταβλητές
let startBtn = document.getElementById("startBtn");
let introPage = document.getElementById("introPage");
let mainPage = document.getElementById("mainPage");
let usernameInput = document.getElementById("username");
let profilePicInput = document.getElementById("profilePic");
let postBtn = document.getElementById("postBtn");
let postsSection = document.getElementById("postsSection");
let postModal = document.getElementById("postModal");
let submitPostBtn = document.getElementById("submitPost");
let closeModalBtn = document.getElementById("closeModal");
let postText = document.getElementById("postText");
let mediaInput = document.getElementById("mediaInput");

// Menu variables
let hamburger = document.getElementById("hamburger");
let menuOptions = document.getElementById("menuOptions");
let exitBtn = document.getElementById("exitBtn");
let gameBtn = document.getElementById("gameBtn");
let settingsBtn = document.getElementById("settingsBtn");

// Έλεγχος αν υπάρχουν δεδομένα στο localStorage για όνομα και εικόνα
if (localStorage.getItem("username") && localStorage.getItem("profilePic")) {
    introPage.style.display = "none";
    mainPage.style.display = "block";
    displayPosts();
} else {
    introPage.style.display = "block";
    mainPage.style.display = "none";
}

// Ξεκίνημα της εφαρμογής
startBtn.addEventListener("click", () => {
    let username = usernameInput.value;
    let profilePic = profilePicInput.files[0];

    if (username && profilePic) {
        localStorage.setItem("username", username);
        localStorage.setItem("profilePic", URL.createObjectURL(profilePic));
        introPage.style.display = "none";
        mainPage.style.display = "block";
        displayPosts();
    } else {
        alert("Παρακαλώ εισάγετε όνομα και φωτογραφία προφίλ!");
    }
});

// Άνοιγμα modal για ανάρτηση
postBtn.addEventListener("click", () => {
    postModal.style.display = "flex";
});

// Κλείσιμο του modal
closeModalBtn.addEventListener("click", () => {
    postModal.style.display = "none";
});

// Αποθήκευση ανάρτησης
submitPostBtn.addEventListener("click", () => {
    let postContent = postText.value;
    let media = mediaInput.files[0];

    if (postContent || media) {
        let posts = JSON.parse(localStorage.getItem("posts") || "[]");
        posts.push({
            username: localStorage.getItem("username"),
            profilePic: localStorage.getItem("profilePic"),
            content: postContent,
            media: media ? URL.createObjectURL(media) : null
        });

        localStorage.setItem("posts", JSON.stringify(posts));
        displayPosts();
        postText.value = '';
        mediaInput.value = '';
        postModal.style.display = "none";
    } else {
        alert("Παρακαλώ εισάγετε κείμενο ή επιλέξτε αρχείο!");
    }
});

// Εμφάνιση των αναρτήσεων
function displayPosts() {
    postsSection.innerHTML = '';
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");

    posts.forEach(post => {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");

        let profileImg = document.createElement("img");
        profileImg.src = post.profilePic;
        profileImg.alt = "Profile Picture";
        profileImg.width = 50;

        let postContent = document.createElement("div");
        postContent.classList.add("post-content");
        postContent.innerHTML = `<strong>${post.username}</strong><p>${post.content}</p>`;

        if (post.media) {
            let mediaElement = document.createElement(post.media.endsWith(".jpg") || post.media.endsWith(".png") ? "img" : "video");
            mediaElement.src = post.media;
            mediaElement.width = 300;
            if (mediaElement.tagName === "VIDEO") mediaElement.setAttribute("controls", "true");
            postContent.appendChild(mediaElement);
        }

        postDiv.appendChild(profileImg);
        postDiv.appendChild(postContent);
        postsSection.appendChild(postDiv);
    });
}

// Hamburger menu functionality
hamburger.addEventListener("click", () => {
    menuOptions.style.display = (menuOptions.style.display === "block") ? "none" : "block";
});

// Exit button
exitBtn.addEventListener("click", () => {
    window.close(); // Κλείνει την εφαρμογή (ή το παράθυρο του browser)
});

// Game button (FullScreen)
gameBtn.addEventListener("click", () => {
    // Μπορείς να προσθέσεις τον κώδικα του παιχνιδιού για fullscreen εδώ
    document.documentElement.requestFullscreen();
});
