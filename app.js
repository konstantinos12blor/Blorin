document.getElementById("postButton").addEventListener("click", function() {
    let content = prompt("Τι θέλεις να γράψεις;");
    if (!content) return;

    let media = prompt("Δώσε URL εικόνας ή βίντεο (ή άσε κενό):");

    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.unshift({
        username: localStorage.getItem("username"),
        profilePic: localStorage.getItem("profilePic"),
        content,
        media
    });

    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
});

// Εμφάνιση αναρτήσεων
function displayPosts() {
    let postsSection = document.getElementById("postsSection");
    postsSection.innerHTML = '';
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");

    posts.forEach((post, index) => {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");

        let profileImg = document.createElement("img");
        profileImg.src = post.profilePic;
        profileImg.alt = "Profile Picture";

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

        // Like Section
        let likeSection = document.createElement("div");
        likeSection.classList.add("like-section");

        let likeButton = document.createElement("button");
        likeButton.classList.add("like-button");
        likeButton.innerHTML = "❤ Like";

        let likeCount = document.createElement("span");
        likeCount.classList.add("like-count");

        let userId = localStorage.getItem("username") || "guest";
        let likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
        let likes = likedPosts[index] || 0;

        likeCount.textContent = `${likes} Likes`;

        if (likedPosts[index + "-" + userId]) {
            likeButton.classList.add("liked");
            likeButton.disabled = true;
        }

        likeButton.addEventListener("click", () => {
            if (!likedPosts[index + "-" + userId]) {
                likes++;
                likedPosts[index] = likes;
                likedPosts[index + "-" + userId] = true;
                localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
                likeCount.textContent = `${likes} Likes`;
                likeButton.classList.add("liked");
                likeButton.disabled = true;
            }
        });

        likeSection.appendChild(likeButton);
        likeSection.appendChild(likeCount);

        postDiv.appendChild(profileImg);
        postDiv.appendChild(postContent);
        postDiv.appendChild(likeSection);

        postsSection.appendChild(postDiv);
    });
}

// Επεξεργασία προφίλ
document.getElementById("edit-profile").addEventListener("click", function() {
    let username = prompt("Εισάγετε νέο όνομα:");
    if (!username) return;
    let profilePic = prompt("Εισάγετε νέο URL εικόνας προφίλ:");
    if (!profilePic) return;

    localStorage.setItem("username", username);
    localStorage.setItem("profilePic", profilePic);
    loadProfile();
});

// Φόρτωση προφίλ
function loadProfile() {
    let username = localStorage.getItem("username") || "Χρήστης";
    let profilePic = localStorage.getItem("profilePic") || "default.jpg";
    document.getElementById("username-display").textContent = username;
    document.getElementById("profile-pic").src = profilePic;
}

document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    displayPosts();
});
