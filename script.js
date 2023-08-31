const categoryLink =async () =>{
    const category = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const categoryJson = await category.json();
    const data = categoryJson.data;
    categoriesShow(data)
}
categoryLink()
const categoriesShow = (data) =>{
   const categoryContainer = document.getElementById('category-container');
    
   data.forEach(element => {
    // console.log(element)
    const div = document.createElement('div');
    div.innerHTML = `
    <button onclick="getCardsLink('${element?.category_id}')" class="btn normal-case rounded">${element?.category}</button>
    `
    categoryContainer.appendChild(div)
   });
}

const getCardsLink =async (data) =>{
    const cardsLink = await fetch(`https://openapi.programming-hero.com/api/videos/category/${data}`);
    const cardsLinkToJson = await cardsLink.json();
    const cardsLinkData = cardsLinkToJson.data;
    showAllCards(cardsLinkData)
}
getCardsLink('1000')

const showAllCards = (data) =>{
   const allCardsContainer = document.getElementById('all-Cards-Container');
   allCardsContainer.innerHTML = '';
   if(data.length > 0){
    data.forEach(element => {
       console.log(element)
       const div = document.createElement('div');
       div.innerHTML =`
   <div class="card card-compact rounded-none">
   <figure><img class="h-48 rounded-lg w-full" src="${element?.thumbnail}" alt="Shoes" /></figure>
   <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    
  </div>
  </div>
       `
       allCardsContainer.appendChild(div)
   });
}else{
    const errorContainer = document.getElementById('error-container');
}
}