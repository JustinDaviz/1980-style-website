document.addEventListener("DOMContentLoaded", function () {

    const commentForm = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");

    if (!commentForm) return;

    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    function saveComments() {
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    function renderComments() {
        commentList.innerHTML = "";
        comments.forEach((comment, index) => {
            const commentDiv = createCommentElement(comment, index);
            commentList.appendChild(commentDiv);
        });
    }

    function createCommentElement(comment, index) {
        const div = document.createElement("div");
        div.classList.add("comment", "mb-3");

        div.innerHTML = `
            <strong>${comment.username}</strong>
            <p>${comment.text}</p>
            <small>${comment.date}</small>
            <div class="mt-2">
                <button class="btn btn-sm btn-outline-info like-btn">
                    👍 ${comment.likes}
                </button>
                <button class="btn btn-sm btn-outline-light reply-btn">
                    Reply
                </button>
            </div>
            <div class="replies mt-3"></div>
        `;

        
        div.querySelector(".like-btn").addEventListener("click", function () {
            comment.likes++;
            saveComments();
            renderComments();
        });

        
        div.querySelector(".reply-btn").addEventListener("click", function () {
            const replyText = prompt("Enter your reply:");
            if (!replyText) return;

            const reply = {
                username: "Guest",
                text: replyText,
                date: new Date().toLocaleString()
            };

            comment.replies.push(reply);
            saveComments();
            renderComments();
        });

        
        const repliesDiv = div.querySelector(".replies");
        comment.replies.forEach(reply => {
            const replyDiv = document.createElement("div");
            replyDiv.classList.add("ms-4", "mt-2", "p-2");
            replyDiv.style.borderLeft = "2px solid #00f7ff";

            replyDiv.innerHTML = `
                <strong>${reply.username}</strong>
                <p>${reply.text}</p>
                <small>${reply.date}</small>
            `;

            repliesDiv.appendChild(replyDiv);
        });

        return div;
    }

    
    commentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const text = document.getElementById("commentText").value.trim();

        if (!username || !text) return;

        const newComment = {
            username,
            text,
            date: new Date().toLocaleString(),
            likes: 0,
            replies: []
        };

        comments.unshift(newComment);
        saveComments();
        renderComments();
        commentForm.reset();
    });

    renderComments();
});