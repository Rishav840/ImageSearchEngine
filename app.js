const AccessKey ="accesskey";

const form=document.querySelector("form");
const Srchinput =document.querySelector("#search-input");
const searchResult = document.querySelector(".search-res");
const showMore= document.querySelector("#more");

let inputData="";
let page =1;

async function searchImages(){
    inputData = Srchinput.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${AccessKey}`;

    const responce =await fetch(url);
    const data = await responce.json();

    console.log(data)

    const results = data.results;

    if(page===1){

        searchResult.innerHTML="";

    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("result");

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt=result.alt_description;

        const imageLink= document.createElement('a');
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);


    });

    page++;
    if(page>1){
        showMore.style.display="block";
    }

}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    page =1;
    searchImages();
});
showMore.addEventListener("click", () => {

    searchImages();
});
