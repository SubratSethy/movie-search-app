const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
// Api for most popular movie list page.
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
//Api that provide you the movie page you searched for.

const moiveBox = document.querySelector("#movie-box")
// here we select the element id by using queryselector i.e, where we show our fetched data. 

//here, we use async function, because we we have to fetch data from a third party api.
//here, json function is used to show fetched data that is stored in variable response in json format.

const getMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    showMovies(data)
}
getMovies(APIURL);

//It is the init call or initial call while page get loaded for the first time i.e, it will show the popular movie page. 
// showMovies(data) , here we pass the data that fetched from api to showmovies fuction and this take the data show the result in the form of cards in the ui.

//
const showMovies = (data) => {
    moiveBox.innerHTML = "";
    //after each function call of getMovies make movieBox blank so that at every new search function call new result got shown i.e; result not get appened with previous result.  
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;
            // const box = `
            // <div class="box">
            //     <img src="${IMGPATH+result}" alt="" />
            //     <div class="overlay">
            //         <h2>Overview:</h2>
            //         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis iste doloribus quam voluptatum, illum unde nostrum dignissimos, mollitia, sapiente porro natus neque cupiditate distinctio quod possimus aliquid reiciendis vel. Soluta?
            //     </div>
            // </div>
            // `
            const box = document.createElement("div")
            //here, div named element is created but it is not a part of the web page.
            box.classList.add("box")
            //This line adds a CSS class named "box" to the div element.
            box.innerHTML = `
                <img src="${imagePath}" alt="" />
                <div class="overlay">
                    <div class="title"> 
                        <h2> ${result.original_title}  </h2>
                        <span> ${result.vote_average} <span>
                    </div>
                    <h3>Overview:</h3>
                    <p> 
                        ${result.overview}
                    </p>
                 </div>
            `
            moiveBox.appendChild(box)
            //The box element is added to the moiveBox element as a child, making it part of the DOM within that container,making it visible on the page.
            //here, all the data got fetched from api and added to div named element and at last it get appened with movie Box element.
            
        }
    )
}

document.querySelector("#search").addEventListener(
    "keyup",
    function (event) {
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
            // "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="; at last value that user type in search box got added getMovies function call every time.
            // search movies
       
            
        } else {
            getMovies(APIURL);
            //popular movies
        }
    }
)
//if we do console.log("event ") it will show that event that took place if user press a,b,c,d,e,f,g,h or any key that will show there.
// if we do console.log(event.target) it will show that where event that took place i.e; at search box.
//if we do console.log(event.target.vaule) it will show that what usaer type in the search box.


