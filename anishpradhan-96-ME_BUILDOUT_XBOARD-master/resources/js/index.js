const magazines = [
  "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
  "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
  "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss"
]

let arr =[];
//getting data from the api
const news = async()=>{
for(let i=0; i<magazines.length; i++){
  let response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazines[i]}`);
  let data = await response.json();
  arr.push(data);
}
return arr;
}

(async function(){
let dataFromApi =  await news();
accordion(dataFromApi);
// console.log(dataFromApi);
// createCarousel(dataFromApi);
})();

//creating accordian
const accordion = (data)=>{
// console.log(items)
const parent_div = document.createElement("div");
parent_div.setAttribute("class","accordion mx-4 mx-sm-4 mx-lg-2");
parent_div.setAttribute("id","accordion-id");
// console.log(parent_div)


data.forEach((item,index)=>{
const accordionItem = document.createElement("div");
accordionItem.className = "accordion-item";
const h2 = document.createElement("h2");
h2.className ="accordion-header";
h2.setAttribute("id",`heading${index}`);
const button = document.createElement("button");
button.setAttribute ("class",`accordion-button ${index ===0?"":"collapsed"}`);
button.setAttribute("type","button");
button.setAttribute("data-bs-toggle","collapse")
button.setAttribute("data-bs-target",`#collapse-${index}`);
button.setAttribute("aria-expanded",`${index===0?"true":"false"}`);
button.setAttribute("aria-controls",`collapse-${index}`);
button.textContent =item.feed.title;
const div = document.createElement("div");
div.setAttribute("id",`collapse-${index}`);
div.setAttribute("class",`accordion-collapse collapse ${index ===0?"show":""}`);
div.setAttribute("aria-labelledby",`heading${index}`);
div.setAttribute("data-bs-parent",`accordion-id`);
const body_div = document.createElement("div");
body_div.setAttribute("class","accordion-body");

//carousel part


const carousel_div = document.createElement("div");
carousel_div.setAttribute("id",`carousel${index}`);
carousel_div.setAttribute("class","carousel slide");
carousel_div.innerHTML =`
<div class="carousel-inner" id="carousel-inner-${index}">
 
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carousel${index}" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carousel${index}" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
`
// console.log(document.getElementById(`carousel-inner-${index}`))


let items =  item.items;
items.forEach((list,index)=>{
const carouselItem_div = document.createElement("div");
carouselItem_div.setAttribute("class",`carousel-item ${index===0?"active":""}`);
const a = document.createElement("a");
a.setAttribute("href",`${list.link}`);
a.setAttribute("target","_blank");
// console.log(list.title)
a.innerHTML = `
<div class="card">
<img class="card-img-top" src="${list.enclosure.link}" alt="Card image cap">
<div class="card-body">
<h5 class="card-title">${list.title}</h5>
<h6 class="card-subtitle mb-2 text-muted">${list.author}</h6>
<p class="card-text">${list.content}</p>

</div>
</div>
`
carouselItem_div.append(a);
// console.log(carouselItem_div)
// document.getElementById(`carousel${index}`).append(carouselItem_div);
})




h2.append(button);
accordionItem.append(h2);
accordionItem.append(div);
div.append(body_div);
body_div.append(carousel_div);
parent_div.append(accordionItem);

})
document.getElementById("main").append(parent_div)
}