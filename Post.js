class Post{
    api_url = "https://636a7429c07d8f936d9e6e32.mockapi.io";
    id = "";
    title = "";
    post_content = "";
    category = "";
    pinned = false;
    date = "";
    answers = 0;
    views = 0;

    create(){
        let data = {
            id : this.id,
            title : this.title,
            post_content : this.post_content,
            category : this.category,
            pinned : this.pinned,
            date : this.date,
            answers : this.answers,
            views : this.views,
        }
        data = JSON.stringify(data);


        fetch(this.api_url + "/posts", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : data
        })
        .then(response => response.json())
        .then(data =>{

        })
    }

    async getAllPosts(){
        let response = await fetch(this.api_url + "/posts");
        let data = await response.json();

        let pinnedSortedPosts = [];
        data.forEach(post =>{
            if(post.pinned === true)
                pinnedSortedPosts.push(post);
            else
                pinnedSortedPosts.unshift(post)
        })
        // console.log(pinnedSortedPosts)

        return pinnedSortedPosts;
    }

    answer(post_id, number){
        let data = {
            answers : number
        };

        data = JSON.stringify(data);


        fetch(this.api_url + "/posts/" + post_id, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : data
        })
        .then(response => response.json())
        .then(data =>{
        })
    }

    view(post_id, number){
        let data = {
            views : number
        };

        data = JSON.stringify(data);

        
        fetch(this.api_url + "/posts/" + post_id, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : data
        })
        .then(response => response.json())
        .then(data =>{
        })
    }
}