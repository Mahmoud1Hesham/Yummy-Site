/// <reference types="../@types/jquery" />

const mealData = document.querySelector('.meals');
const searchBox = document.querySelectorAll('.search-box');
console.log('welcome');

function closeNav() {
    let navContent = $('.side-content').outerWidth();
    $('aside').animate({ left: -navContent }, 500);
    if ($('.opennclose').hasClass('fa-x')) {
        $('.opennclose').removeClass('fa-x');
        $('.opennclose').addClass('fa-align-justify');
    }
    $(".side-content ul li").animate({
        top: 300
    }, 500);
}

function openNav() {
    let navContent = $('.side-content').outerWidth();
    $('aside').animate({ left: 0 }, 500);
    if ($('.opennclose').hasClass('fa-align-justify')) {
        $('.opennclose').removeClass('fa-align-justify');
        $('.opennclose').addClass('fa-x');
    }
    for (let i = 0; i < 5; i++) {
        $("aside .side-content ul li").eq(i).animate({
            top: 0
        }, (i + 5) * 100);
    }
}

$(".opennclose").on('click', function () {
    if ($("aside").css("left") == "0px") {
        closeNav();
    } else {
        openNav();
    }
});

function searchInputs() {
    mealData.innerHTML = ``;
    let box = ``;
    box +=
        `
            <input onkeyup="searchByName(this.value)" class="bg-inherit w-4/12 h-9 block border rounded focus:bg-inherit focus:border-[#86b7fe] focus:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)] outline-none autofill:bg-inherit px-4 text-white" placeholder="Search By Name" type="text" id="name">
            <input onkeyup="searchByLitter(this.value)" maxlength="1" class="bg-inherit w-4/12 h-9 block border rounded focus:bg-inherit focus:border-[#86b7fe] focus:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)] outline-none autofill:bg-inherit px-4 text-white" placeholder="Search By First Litter" type="text" id="litter">
    `
    searchBox.forEach((ele) => {
        ele.innerHTML = box;
    })
}

async function searchByName(val) {
    closeNav();
    mealData.innerHTML = ``;
    $('.inner-loader-box').fadeIn(500);
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
    res = await res.json();
    console.log(res);
    res.meals ? displayMeals(res.meals) : displayMeals([]);
    $('.inner-loader-box').fadeOut(500);
}


async function searchByLitter(val) {
    closeNav();
    mealData.innerHTML = ``;
    $('.inner-loader-box').fadeIn(500);
    if (val === "") {
        val = "a";
    }
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`);
    res = await res.json();
    console.log(res);
    res.meals ? displayMeals(res.meals) : displayMeals([]);
    $('.inner-loader-box').fadeOut(500);
}

async function getCategories() {
    mealData.innerHTML = ``;
    searchBox.forEach((ele) => {
        ele.innerHTML = ``;
    });
    $('.inner-loader-box').fadeIn(500);
    let res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    res = await res.json();
    displayCategories(res.categories);
    $('.inner-loader-box').fadeOut(500);
}

function displayContacts() {
    if (!mealData.classList.contains('flex')) {
        mealData.classList.add('flex');
        mealData.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    }

    let box = `
        <div class="contact container mx-auto">
            <div class="contact h-screen flex justify-center items-center">
                <div class="container mx-auto sm:px-4 w-3/4 text-center">
                    <div class="flex flex-wrap justify-center items-center g-4">
                        <div class="md:w-1/2 pr-4 pl-4">
                            <input id="nameInput" onkeyup="inputsValidation()" type="text" class="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border mb-7 focus:border-[#86b7fe] focus:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)] outline-none autofill:bg-inherit rounded" placeholder="Enter Your Name">
                            <div id="nameAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                        <div class="md:w-1/2 pr-4 pl-4">
                            <input id="emailInput" onkeyup="inputsValidation()" type="email" class="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border mb-7 focus:border-[#86b7fe] focus:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)] outline-none autofill:bg-inherit rounded" placeholder="Enter Your Email">
                            <div id="emailAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                                Email not valid *example@yyy.zzz
                            </div>
                        </div>
                        <div class="md:w-1/2 pr-4 pl-4">
                            <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border mb-7 focus:border-[#86b7fe] focus:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)] outline-none autofill:bg-inherit rounded" placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                                Enter valid Phone Number
                            </div>
                        </div>
                        <div class="md:w-1/2 pr-4 pl-4">
                            <input id="ageInput" onkeyup="inputsValidation()" type="number" class="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border mb-7 focus:border-[#86b7fe] focus:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)] outline-none autofill:bg-inherit rounded" placeholder="Enter Your Age">
                            <div id="ageAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                                Enter valid age
                            </div>
                        </div>
                        <div class="md:w-1/2 pr-4 pl-4">
                            <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border mb-7 focus:border-[#86b7fe] focus:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)] outline-none autofill:bg-inherit rounded" placeholder="Enter Your Password">
                            <div id="passwordAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                        <div class="md:w-1/2 pr-4 pl-4">
                            <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border mb-7 focus:border-[#86b7fe] focus:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)] outline-none autofill:bg-inherit rounded" placeholder="Repassword">
                            <div id="repasswordAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                                Enter valid repassword
                            </div>
                        </div>
                    </div>
                    <button id="submitBtn" disabled class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-3 leading-normal no-underline text-red-600 border-red-600 bg-inherit mt-3 hover:text-white  hover:bg-red-700 focus:text-white focus:bg-red-600 focus:border-red-600 focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(220,53,69,.5);] ">Submit</button>
                </div>
            </div>
        </div>`;

    mealData.innerHTML = box;
    submitBtn = document.getElementById("submitBtn");

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true;
    });

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true;
    });

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true;
    });

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true;
    });

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true;
    });

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true;
    });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("block", "hidden");
        } else {
            document.getElementById("nameAlert").classList.replace("hidden", "block");
        }
    }
    if (emailInputTouched) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("block", "hidden");
        } else {
            document.getElementById("emailAlert").classList.replace("hidden", "block");
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("block", "hidden");
        } else {
            document.getElementById("phoneAlert").classList.replace("hidden", "block");
        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("block", "hidden");
        } else {
            document.getElementById("ageAlert").classList.replace("hidden", "block");
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("block", "hidden");
        } else {
            document.getElementById("passwordAlert").classList.replace("hidden", "block");
        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("block", "hidden");
        } else {
            document.getElementById("repasswordAlert").classList.replace("hidden", "block");
        }
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value));
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value));
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value));
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value));
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value));
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value;
}


function displayCategories(cat) {
    if (mealData.classList.contains('flex')) {
        mealData.classList.remove('flex');
        mealData.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    }

    let box = ``;
    for (let i = 0; i < cat.length; i++) {
        box +=
            `
        <div onclick="getCatMeals('${cat[i].strCategory}')" class="card rounded overflow-hidden mt-7 relative group">
            <img src="${cat[i].strCategoryThumb}" class="w-full group-hover:scale-150 transition-all duration-500 ease-in-out" alt="food">
            <div class="layer absolute inset-full transition-all duration-500 ease-in-out group-hover:inset-0 flex justify-center items-center flex-col bg-[#f9f6f6ca]">
                <h3 class="text-black text-[24px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">${cat[i].strCategory}</h3>
                <p class="text-black text-center text-[16px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">${cat[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `;
    }
    mealData.innerHTML = box;
}

async function getCatMeals(cat) {
    mealData.innerHTML = ``;
    searchBox.forEach((ele) => {
        ele.innerHTML = ``;
    });
    $('.inner-loader-box').fadeIn(500);
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    res = await res.json();
    displayMeals(res.meals);
    $('.inner-loader-box').fadeOut(500);
}

async function getMealDetails(id) {
    closeNav();
    mealData.innerHTML = ``;
    searchBox.forEach((ele) => {
        ele.innerHTML = ``;
    });
    $('.inner-loader-box').fadeIn(500);
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    res = await res.json();
    displayMealDetails(res.meals[0]);
    $('.inner-loader-box').fadeOut(500);
}

async function getArea() {
    if (mealData.classList.contains('flex')) {
        mealData.classList.remove('flex');
        mealData.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    }
    closeNav();
    mealData.innerHTML = ``;
    searchBox.forEach((ele) => {
        ele.innerHTML = ``;
    });
    $('.inner-loader-box').fadeIn(500);
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    res = await res.json();
    displayAreas(res.meals);
    $('.inner-loader-box').fadeOut(500);
}
async function getAreaMeals(area) {
    mealData.innerHTML = ``;
    searchBox.forEach((ele) => {
        ele.innerHTML = ``;
    });
    $('.inner-loader-box').fadeIn(500);
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    res = await res.json();
    displayMeals(res.meals);
    $('.inner-loader-box').fadeOut(500);
}

async function getIngredients() {
    if (mealData.classList.contains('flex')) {
        mealData.classList.remove('flex');
        mealData.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    }
    closeNav();
    mealData.innerHTML = ``;
    searchBox.forEach((ele) => {
        ele.innerHTML = ``;
    });
    $('.inner-loader-box').fadeIn(500);
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    res = await res.json();
    displayIngredients(res.meals);
    $('.inner-loader-box').fadeOut(500);
}

function displayIngredients(ing) {
    let box = ``;
    for (let i = 0; i < ing.length; i++) {
        box +=
            `
            <div onclick="getIngredientMeals('${ing[i].strIngredient}')" class="area cursor-pointer text-center mb-14">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 class="text-2xl font-medium mb-2">${ing[i].strIngredient}</h3>
            <p class="line-clamp-3">${ing[i].strDescription}</p>
        </div>
    `
    }
    mealData.innerHTML = box;
}

async function getIngredientMeals(ings) {
    if (mealData.classList.contains('flex')) {
        mealData.classList.remove('flex');
        mealData.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    }
    closeNav();
    mealData.innerHTML = ``;
    searchBox.forEach((ele) => {
        ele.innerHTML = ``;
    });
    $('.inner-loader-box').fadeIn(500);
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ings}`)
    res = await res.json();
    displayMeals(res.meals);
    $('.inner-loader-box').fadeOut(500);
}

function displayAreas(area) {
    let box = ``;
    for (let i = 0; i < area.length; i++) {
        box +=
            `
            <div onclick="getAreaMeals('${area[i].strArea}')" class="area cursor-pointer text-center mb-14">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${area[i].strArea}</h3>
        </div>
    `
    }
    mealData.innerHTML = box;
}

function displayMealDetails(meal) {
    searchBox.innerHTML = ``;
    mealData.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');

    mealData.classList.add('flex');

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li
                        class="relative h-fit w-fit px-3 py-1 mb-4 border rounded bg-teal-200 border-teal-300 text-teal-800 m-2 list-none">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="relative mb-4 border rounded bg-red-200 border-red-300 text-red-800 m-2 p-1">${tags[i]}</li>`
    }
    let box =
        `
            <div class="details container mx-auto grid grid-cols-12 gap-4 justify-center">
            <div class="headline col-span-4">
                <img src="${meal.strMealThumb}" class="w-full rounded" alt="food">
                <h2 class="font-medium text-3xl text-center mt-3 transition-all duration-500 ease-in-out hover:scale-150 ">${meal.strMeal}</h2>
            </div>
            <div class="details-content col-span-8 mb-6">
                <h2 class="font-medium text-3xl">Instructions</h2>
                <p class="py-4 pr-16">
                ${meal.strInstructions}
                </p>
                <h3 class="font-bold text-3xl mb-2">Area : ${meal.strArea}</h3>
                <h3 class="font-bold text-3xl mb-2">Category : ${meal.strCategory}</h3>
                <h3 class="font-bold text-3xl mb-2">Recipes : </h3>
                <ul class="list-unstyled flex g-3 flex-wrap">
                ${ingredients}
                </ul>
                <h3 class="font-bold text-3xl mb-2">Tags : </h3>
                <ul class="flex">
                ${tagsStr}
                </ul>
                <a target="_blank" href="${meal.strSource}"
                    class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-3 leading-normal no-underline bg-green-700 text-white hover:green-600 border-none transition-all duration-500 ease-in-out ml-2">Source</a>
                <a target="_blank" href="${meal.strYoutube}"
                    class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-3 leading-normal no-underline bg-red-800 text-white hover:bg-red-700 border-none transition-all duration-500 ease-in-out">Youtube</a>
            </div>
        </div>
    `
    mealData.innerHTML = box
}

function displayMeals(meal) {
    if (mealData.classList.contains('flex')) {
        mealData.classList.remove('flex');
        mealData.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    }

    let box = ``;
    for (let i = 0; i < meal.length; i++) {
        box +=
            `
        <div onclick="getMealDetails(${meal[i].idMeal})" class="card rounded overflow-hidden mt-7 relative group last-of-type:mb-8">
            <img src="${meal[i].strMealThumb}" class="w-full group-hover:scale-150 transition-all duration-500 ease-in-out" alt="food">
            <div class="layer absolute inset-full transition-all duration-500 ease-in-out group-hover:inset-0 flex justify-center items-center bg-[#f9f6f6ca]">
                <h3 class="text-black text-[24px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">${meal[i].strMeal}</h3>
            </div>
        </div>
        `;
    }
    mealData.innerHTML = box;
}

$(document).ready(function () {
    searchByName("")
    $('.loader-box').fadeOut(1000)
    closeNav();
});
