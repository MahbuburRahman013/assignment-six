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
    const div = document.createElement('div');
    div.innerHTML = `
    <button onclick="getCardsLink('${element?.category_id}')" class="btn normal-case rounded">${element?.category}</button>
    `
    categoryContainer.appendChild(div)
   });
}
var showView;
const sortByViews = () =>{
    showView.forEach(element=>{
        element.others.views = parseFloat((element.others.views).replace('K',''))
        
    })
    const optimize = showView.sort((a, b) => b.others.views - a.others.views);
    showAllCards(optimize)
}

const getCardsLink =async (data) =>{
    const cardsLink = await fetch(`https://openapi.programming-hero.com/api/videos/category/${data}`);
    const cardsLinkToJson = await cardsLink.json();
    const cardsLinkData = cardsLinkToJson.data;
    showAllCards(cardsLinkData)
}
getCardsLink('1000')


const showAllCards = (data) =>{
    showView = data;
   const allCardsContainer = document.getElementById('all-Cards-Container');
   const errorContainer = document.getElementById('error-container');
   allCardsContainer.innerHTML = '';
   errorContainer.innerHTML = '';
   if(data.length > 0){
    data.forEach(element => {
       const div = document.createElement('div');
       div.innerHTML =`
   <div class="card card-compact rounded-none">
   <figure class="relative"><img class="h-48 rounded-lg w-full" src="${element?.thumbnail}" alt="no image" />${element.others.posted_date ? `<p class="absolute bottom-3 right-4 bg-[#171717] px-3 py-1 text-white rounded-sm">${parseInt(element?.others?.posted_date/3600)}hrs ${parseInt(element?.others?.posted_date/60)%60} min ago</p>` : ''}</img></figure>
   <div class="pt-6">
   <div class="flex gap-2">
   <img class="w-10 h-10 rounded-full" src="${element?.authors.map(item=> item.profile_picture)}" alt="no image" />
   <div>
   <p class="text-xl font-semibold">${element?.title}</p>
   <div class="flex items-center gap-1">
   <p class="inline-block">${element?.authors.map(item=> item.profile_name)}</p>
   ${element?.authors.map(item=> item.verified === true ? `<img class="w-5" src="validate.png" alt="no image" />` : '')}
   </div>
   <p>${parseFloat(element?.others?.views)}K views</p>
   </div>
   </div>
    
  </div>
  </div>
       `
       allCardsContainer.appendChild(div)
   });
}else{
    errorContainer.innerHTML = `
    <div class="flex flex-col justify-center items-center mt-10 gap-y-5">
    <img src="Icon.png" alt="">
    <p class="text-center text-3xl font-bold">Oops!! Sorry, There is no<br> content here</p>
    </div>
    `
}
}
document.getElementById('blogSite').addEventListener('click', () =>  window.location.href = 'blog.html')