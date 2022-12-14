document.querySelector('#err').style.display = 'none'
const searchFood = () => {
    const serchField = document.querySelector('#search-field');
    const searchText = serchField.value;
    //console.log(searchText);
    serchField.value = '';

    document.querySelector('#err').style.display = 'none'
    if( searchText == ''){
        const showResult = document.getElementById('search-result');
        showResult.textContent = ''
      document.querySelector('#err').style.display = 'block'
    }else{
        document.querySelector('#err').style.display = 'none'
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    //console.log(url)
    
    fetch(url)
    .then( res => res.json())
    .then(data => searchFoodText(data.meals))
    }
}
const searchFoodText =(foods) => {
    //console.log(foods[0])
    const showResult = document.getElementById('search-result');
    showResult.textContent = ''
    if(foods === null || foods === undefined){
        
        document.querySelector('#err').style.display = 'block'
        const find = document.querySelector('#err') ;
        find.innerHTML = `<h1 class ="text-center"> We  don't find it </h1>`
    }else{
        foods.forEach(food => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card" onclick= "loadId(${food.idMeal})">
                    <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${food.strMeal}</h5>
                      <p class="card-text">${food.strInstructions.slice(0, 150)
                      }</p>
                    </div>
                </div>
            `
            //console.log(food);
            showResult.appendChild(div);
        });
    }
}
const loadId = food =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i= ${food}`
    console.log(url)
    
    fetch(url)
    .then( res => res.json())
    .then(data => foodId(data.meals))
}
const foodId = (foods) =>{
    const showResult = document.getElementById('show-id');
    showResult.textContent = ''
    foods.forEach(food => {
        //console.log(food);
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
                <h1 class ="text-center"> Id :  ${food.idMeal}</h1>
                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${food.strMeal}</h5>
                  <p class="card-text">${food.strInstructions.slice(0, 150)
                  }</p>
                </div>
        `
        //console.log(food);
        showResult.appendChild(div);
})
}