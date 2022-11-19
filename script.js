function createPost() {
    let title = document.querySelector(".title-of-post").value;
    let content = document.querySelector("#textarea").value;
    let pinned = document.querySelector("#check").checked;
    let category = document.querySelector(".category").value;
    let date = new Date();

    let words = content.split(" ");

    if (words.length > 15) content = modifyContent(content);

    const dateStr = date.toLocaleString("sr-RS", {
        timeZone: "Europe/Belgrade",
    });

    let post = new Post();

    post.title = title;
    post.post_content = content;
    post.pinned = pinned;
    post.category = category;
    post.date = dateStr;

    let html = document.querySelector(".info-wrapper").innerHTML;
    if (content !== "" && title !== "" && category !== "") {
        if (pinned === true) {
            document.querySelector(".info-wrapper").innerHTML =
                `<div class = "data-wrapper">
        <div class = "post-wrapper" data-post-id = "${post.id}">
        <div class="personal-info">
          <div class="pinned-wrapper">
            <img src="images/pinned.png" alt="" />
            <h1 class="post-title">${post.title}</h1>
          </div>
          <div class="poster">
            <img src="images/calendarimg.png" alt="" />
            <p>${post.date}</p>
            <img src="images/personimg.png" alt="" />
            <p>Дуња</p>
            <p>Категорија: ${post.category}</p>
          </div>
          <p class="inner-text">
            ${content}
          </p>
        </div>
        <div class="answers">
          <h2>Одговора</h2>
          <p>${post.answers}</p>
          <button class = "answer button" onclick = "answer(this)"> Одговори и ти</button>
        </div>
        <div class="views">
          <h2>Прегледа</h2>
          <p>${post.views}</p>
        </div>
        </div>
        <div class = "comment">
          <form class = "comment-form"> 
            <input type = "text" placeholder = "Одговор">
            <button class = "button" onclick = "sendAnswer(this)"> Пошаљи </button>
          </form>
        </div>
        </div>` + html;
        } else {
            document.querySelector(".info-wrapper").innerHTML =
                html +
                `<div class = "data-wrapper"> 
        <div class = "post-wrapper" data-post-id = "${post.id}">
        <div class="personal-info">
          <div class="pinned-wrapper">
            <h1 class="post-title">${post.title}</h1>
          </div>
          <div class="poster">
            <img src="images/calendarimg.png" alt="" />
            <p>${post.date}</p>
            <img src="images/personimg.png" alt="" />
            <p>Дуња</p>
            <p>Категорија: ${post.category}</p>
          </div>
          <p class="inner-text">
            ${content}
          </p>
        </div>
        <div class="answers">
          <h2>Одговора</h2>
          <p >${post.answers}</p>
          <button class = "answer button" onclick = "answer(this)"> Одговори и ти</button>
        </div>
        <div class="views">
          <h2>Прегледа</h2>
          <p>${post.views}</p>
        </div>
        </div>
        <div class = "comment"><form class = "comment-form"> 
            <input type = "text" placeholder = "Одговор">
            <button class = "button" onclick = "sendAnswer(this)"> Пошаљи </button>
          </form></div>
        </div>`;
        }
    } else alert("Unesite sva polja");

    post.create();
}

document.querySelector(".post-form").addEventListener("submit", (event) => {
    event.preventDefault();

    createPost();
});

let modifyContent = (content) => {
    let words = content.split(" ");
    console.log(content);
    if (words.length > 15) {
        let text1 = content.substring(0, content.indexOf(words[15]));
        let text2 = content.substring(content.indexOf(words[15]));
        return (
            text1 +
            `<button class = "readMoreBtn" onclick = "showMore(this)">... Прочитај више </button> <span class = "second-part">${text2}</span>`
        );
    } else return content;
};

const showMore = (button) => {
    button.style.display = "none";

    button.closest(".inner-text").querySelector(".second-part").style.display =
        "inline";

    button.closest(
        ".inner-text"
    ).innerHTML += `<button class = "readMoreBtn" onclick = "showLess(this)">Прочитај мање</button>`;
};

const showLess = (button) => {
    button.style.display = "none";

    button.closest(".inner-text").querySelector(".second-part").style.display =
        "none";

    button.closest(
        ".inner-text"
    ).innerHTML += `<button class = "readMoreBtn" onclick = "showMore(this)">... Прочитај више </button>`;
};

async function getAllPosts() {
    let allPosts = new Post();

    allPosts = await allPosts.getAllPosts();

    allPosts.forEach((post) => {
        let words = post.post_content.split(" ");
        let content = post.post_content;
        let html = document.querySelector(".info-wrapper").innerHTML;

        if (post.pinned === true) {
            document.querySelector(".info-wrapper").innerHTML =
                `<div class = "data-wrapper"> 
        <div class = "post-wrapper" data-post-id = "${post.id}">
        <div class="personal-info">
          <div class="pinned-wrapper">
            <img src="images/pinned.png" alt="" />
            <h1 class="post-title">${post.title}</h1>
          </div>
          <div class="poster">
            <img src="images/calendarimg.png" alt="" />
            <p>${post.date}</p>
            <img src="images/personimg.png" alt="" />
            <p>Дуња</p>
            <p>Категорија: ${post.category}</p>
          </div>
          <p class="inner-text">
            ${content}
          </p>
        </div>
        <div class="answers">
          <h2>Одговора</h2>
          <p >${post.answers}</p>
          <button class = "answer button" onclick = "answer(this)"> Одговори и ти</button>
        </div>
        <div class="views">
          <h2>Прегледа</h2>
          <p>${post.views}</p>
        </div>
        </div>
        <div class = "comment"><form class = "comment-form"> 
            <input type = "text" placeholder = "Одговор">
            <button class = "button" onclick = "sendAnswer(this)"> Пошаљи </button>
          </form></div>
        </div>` + html;
        } else {
            document.querySelector(".info-wrapper").innerHTML =
                `<div class = "data-wrapper">
        <div class = "post-wrapper" data-post-id = "${post.id}">
        <div class="personal-info">
          <div class="pinned-wrapper">
            <h1 class="post-title">${post.title}</h1>
          </div>
          <div class="poster">
            <img src="images/calendarimg.png" alt="" />
            <p>${post.date}</p>
            <img src="images/personimg.png" alt="" />
            <p>Дуња</p>
            <p>Категорија: ${post.category}</p>
          </div>
          <p class="inner-text">
            ${content}
          </p>
        </div>
        <div class="answers">
          <h2>Одговора</h2>
          <p>${post.answers}</p>
          <button class = "answer button" onclick = "answer(this)"> Одговори и ти</button>
        </div>
        <div class="views">
          <h2>Прегледа</h2>
          <p>${post.views}</p>
        </div>
        </div>
        <div class = "comment"><form class = "comment-form"> 
            <input type = "text" placeholder = "Одговор">
            <button class = "button" onclick = "sendAnswer(this)"> Пошаљи </button>
          </form></div>        
        </div>` + html;
        }
    });

    let views = () => {
        let posts = document.querySelectorAll(".post-wrapper");
        posts.forEach((post) => {
            post.addEventListener(
                "click",
                (event) => {
                    let number = parseInt(
                        post.closest(".data-wrapper").querySelector(".views p")
                            .innerText
                    );
                    let post_id = post.getAttribute("data-post-id");

                    let poster = new Post();

                    poster.view(post_id, number + 1);
                    post
                        .closest(".data-wrapper")
                        .querySelector(".views p").innerText = number + 1;
                },
                { once: true }
            );
        });
    };

    views();
}

getAllPosts();

let answer = (button) => {
    let singlePost = button.closest(".data-wrapper");

    if (singlePost.querySelector(".comment").style.display === "block") {
        singlePost.querySelector(".comment").style.display = "none";
    } else {
        singlePost.querySelector(".comment").style.display = "block";
    }
};

let sendAnswer = (button) => {
    let singlePost = button
        .closest(".data-wrapper")
        .querySelector(".post-wrapper");
    let post_id = singlePost.getAttribute("data-post-id");
    let number = parseInt(singlePost.querySelector(".answers p").innerText);

    button
        .closest(".data-wrapper")
        .querySelector(".comment-form")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            let post = new Post();

            post.answer(post_id, number + 1);
        });

    setTimeout(() => {
        button
            .closest(".data-wrapper")
            .querySelector(".comment").style.display = "none";
        alert("Odgovor poslat!");
    }, 1000);
    singlePost.querySelector(".answers p").innerText = number + 1;
};
