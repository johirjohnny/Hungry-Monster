//find food item to search from the input box
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function () {
    const foodName = document.getElementById('food-name').value;
    document.getElementById('food-name').value = '';
    if (foodName.value === '') {
        //<p> SORRY, NO FOOD TO SHOW </p>
    }
    else {
        getFoodDetail(foodName);
    }
})

//fecth food from api 
function getFoodDetail(foodName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => { displayFood(data) })
}
const displayFood = foods => {
    const meal = foods.meals;
    const mealDiv = document.getElementById('item');
    meal.map(meals => {
        const mealDiv2 = document.createElement('div');
        mealDiv2.className = 'mealinformation'
        const mealInfo = `
    <div onclick = "displayFoodDetails('${meals.idMeal}')">
    <img src = "${meals.strMealThumb}">
    <h3>${meals.strMeal} </h3>
    </div>
    `
        mealDiv2.innerHTML = mealInfo;
        mealDiv.appendChild(mealDiv2);
    })
}

const displayFoodDetails = ingredient => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ingredient}`)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
        })

}
const renderFoodInfo = food => {
    const ingredients = [];
    ingredients.forEach(element => {
        ingredients.push(`${food[`strIngredient${element}`]}`);

    });
    const detailDiv = document.getElementById("detail");
    detailDiv.innerHTML = `
    <div>
    <img src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    <h5>Ingredients</h5>
    <ul>
        ${ingredients.map((ingredient) => `
            <li>${ingredient}</li>
                `)}
     </ul>
    /div>

    `
}
