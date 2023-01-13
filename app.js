const addButton = document.querySelector("#addButton");
const subtractButton = document.querySelector("#subtractButton");
const submitButton = document.querySelector("#submitBtn");
const closeGradeButton = document.querySelector("#closeGrade");
const formContainer = document.querySelector("#formContainer");
const gradeContainer = document.querySelector(".grade-container");
const listedCategories = document.querySelector(".category-list");
const estimatedGradeDiv = document.querySelector(".grade-estimate");
let localCategoryData = JSON.parse(window.localStorage.getItem('Categories'));

function updateCategories() {
    let allCategoryContainers = document.querySelectorAll(".category-container");
    let categoryData = []

    for (let i = 0; i < allCategoryContainers.length; i++) {
        let obj = {};
        [...allCategoryContainers[i].children].map((item) => [...item.children].map((val) => {
            obj[val.id] = val.value;
        }))
        categoryData.push(obj);
    }
    window.localStorage.setItem('Categories', JSON.stringify(categoryData));
    localCategoryData = JSON.parse(window.localStorage.getItem('Categories'));
}

function getCategories() {
    if (localCategoryData) {
        localCategoryData.map((category) => {
            createStoredCategory(category);
        })
    } else {
        createCategory();
        updateCategories();
    }
}


function createCategory() {
    const newCategoryDiv = document.createElement('div');
    newCategoryDiv.className = 'category-container';
    for (let i = 0; i < 3; i++) {
        const textInput = document.createElement('input');
        const category = document.createElement('div');
        category.classList.add('category');
        textInput.required = true;
        if (i === 0) {
            textInput.type = 'text';
            textInput.id = 'name';
            textInput.placeholder = 'Enter category name';
        }
        else if (i === 1) {
            textInput.type = 'number';
            textInput.id = 'weight';
            textInput.placeholder = '%';
        }
        else if (i === 2) {
            textInput.type = 'number';
            textInput.id = 'grade';
            textInput.placeholder = '%'
        }

        category.append(textInput);
        newCategoryDiv.append(category)
    }
    formContainer.append(newCategoryDiv);
    updateCategories();
};

function deleteCategory() {
    if (formContainer.children.length === 1) {
        alert('Category is required');
        return;
    }
    formContainer.removeChild(formContainer.lastChild);
    updateCategories();
}

function createStoredCategory(storedCategory) {
    const newCategoryDiv = document.createElement('div');
    newCategoryDiv.className = 'category-container';
    for (let i = 0; i < 3; i++) {
        const textInput = document.createElement('input');
        const category = document.createElement('div');
        category.classList.add('category');
        textInput.required = true;
        if (i === 0) {
            textInput.type = 'text';
            textInput.value = storedCategory['name'];
            textInput.id = 'name';
            textInput.placeholder = 'Enter category name'
        }
        else if (i === 1) {
            textInput.type = 'number';
            textInput.value = storedCategory['weight'];
            textInput.id = 'weight';
            textInput.placeholder = '%'
        }
        else if (i === 2) {
            textInput.type = 'number';
            textInput.value = storedCategory['grade'];
            textInput.id = 'grade';
            textInput.placeholder = '%'
        }

        category.append(textInput);
        newCategoryDiv.append(category)
    }
    formContainer.append(newCategoryDiv);
};

function calculateGrade() {
    updateCategories();
    document.querySelectorAll('.new').forEach(e => e.remove());

    let totalWeight = [];
    let totalPercentageOfWeight = 0;
    localCategoryData.map((category) => {
        totalWeight.push(category.weight.length ? (Number(category.weight / 100) * category.grade).toFixed(1) : 0);
        totalPercentageOfWeight += Number(category.weight);
    })

    totalPercentageOfWeight = totalPercentageOfWeight / 100;

    let calculatedGrade = ((totalWeight.reduce((a, b) => a + Number(b), 0).toFixed(2) / totalPercentageOfWeight).toFixed(2));

    for (let i = 0; i < localCategoryData.length; i++) {
        if (localCategoryData[i]['name'] === '' || localCategoryData[i]['weight'] === '' || localCategoryData[i]['grade'] === '') {
            alert('Please fill out all input fields');
            return;
        }
        const newCategoryListItem = document.createElement('li');
        newCategoryListItem.className = 'grade-category';
        newCategoryListItem.className += ' new'

        const categoryName = document.createElement('p');
        categoryName.textContent = localCategoryData[i]['name'];
        categoryName.className = 'category-info';
        categoryName.className += ' new'

        const categoryWeight = document.createElement('p');
        categoryWeight.textContent = localCategoryData[i]['weight'] + '%';
        categoryWeight.className = 'category-info';
        categoryWeight.className += ' new';

        const categoryGrade = document.createElement('p');
        categoryGrade.textContent = localCategoryData[i]['grade'] + '%';
        categoryGrade.className = 'category-info';
        categoryGrade.className += ' new'

        newCategoryListItem.appendChild(categoryName);
        newCategoryListItem.appendChild(categoryWeight);
        newCategoryListItem.appendChild(categoryGrade);

        listedCategories.appendChild(newCategoryListItem);
    }

    const gradeTitle = document.createElement('h1');
    gradeTitle.className = 'new'
    gradeTitle.textContent = `Average Grade: ${calculatedGrade}%`;

    estimatedGradeDiv.appendChild(gradeTitle);

    gradeContainer.style.display = 'flex';
    gradeContainer.scrollIntoView({ behavior: 'smooth' });
};

const closeGrade = () => {
    gradeContainer.style.display = 'none';
}


window.addEventListener('onload', getCategories());
submitButton.addEventListener('click', calculateGrade);
addButton.addEventListener('click', createCategory);
subtractButton.addEventListener('click', deleteCategory);
closeGradeButton.addEventListener('click', closeGrade);