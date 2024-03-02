
const loadCategory = async() => {

    const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    
    const allbtn = document.getElementById("nav");
    const data = await response.json();
    data.data.news_category.forEach(item => {

        const div = document.createElement("div");
        div.innerHTML=`<button onclick="loadNews('${item.category_id}')" class="btn">${item.category_name}</button>`;
        allbtn.appendChild(div);
        
    });

}

loadCategory();



const loadNews = async(catId) => {


    document.getElementById("loading").style.display="flex";

    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);

    const data = await response.json();
    
    const newsLoad = document.getElementById("news");
    newsLoad.innerHTML='';
    data.data.forEach(item => {


        document.getElementById("loading").style.display="none";



        console.log(item);

        const div = document.createElement("div")
        div.innerHTML=`<div class="card card-side bg-base-100 shadow-xl h-[370px] w-[1000px]">
        <figure><img class="h-[370px] w-[1000px]" src="${item.
            thumbnail_url}" alt="Movie"/></figure>
        <div class="card-body">
          <div class="flex justify-around">
            <h2 class="card-title flex-1">${item.title}</h2>
            <div>
                <p>${item.rating.number}</p>
                <p class="font-bold">${item.rating.badge}</p>
            </div>
          </div>
          <div class="mt-6">
            <p>${item.details.slice(0,200)}</p>

          </div>
          <div class="flex gap-20 mt-1 ">
            <div class="flex gap-2 mt-10 items-center">
                <div>

                    <img class="h-24 w-24 rounded-full" src="${item.author.img}" alt="">

                </div>

                <div>

                    <p class="font-semibold">${item.author.name}</p>
                    <p class="font-semibold">${item.author.published_date}</p>

                </div>
            </div>
            <div class="flex gap-7 items-center mt-10">
                <div class="flex gap-3 items-center">
                    <img class="h-16 w-16 rounded-full" src="./images.png" alt="">
                    <p class="font-bold">${item.total_view}</p>
                </div>
                <div>
                    <button class="btn p-4 bg-slate-400">Details</button>
                </div>
            </div>
          </div>
        </div>
      </div>`
      newsLoad.appendChild(div)

    })
}


loadNews("01");

const handleSearch = () => {
    const inputField = document.getElementById("search").value;

    if(inputField){
        loadNews(inputField)

    }else{
        alert("Kindly Give Some Input")
    }
}

