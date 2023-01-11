const addButton = document.querySelector("#addButton");
const subtractButton = document.querySelector("#subtractButton");
const formContainer = document.querySelector("#formContainer");
const allCategoryContainers = document.querySelectorAll(".category-container")
let localCategoryData = JSON.parse(window.localStorage.getItem('Categories'));

function getCategories() {
    if (localCategoryData) {
        localCategoryData.map((category) => {
            console.log(category);
        })
    } else {
        let categoryData = []

        for (let i = 0; i < allCategoryContainers.length; i++) {
            let obj = {};
            [...allCategoryContainers[i].children].map((item) => [...item.children].map((val) => {
                obj[val.id] = val.value;
            }))
            categoryData.push(obj);
        }
        window.localStorage.setItem('Categories', JSON.stringify(categoryData));
    }
}

window.addEventListener('onload', getCategories());


const createCategory = () => {
    const newCategoryDiv = document.createElement('div');
    newCategoryDiv.className = 'category-container';
    for (let i = 0; i < 3; i++) {
        const textInput = document.createElement('input');
        const category = document.createElement('div');
        category.classList.add('category');
        textInput.type = 'text';
        if (i === 0) {
            textInput.id = 'name';
            textInput.placeholder = 'Enter category name'
        }
        else if (i === 1) {
            textInput.id = 'weight';
            textInput.placeholder = '%'
        }
        else if (i === 2) {
            textInput.id = 'grade';
            textInput.placeholder = '%'
        }

        category.append(textInput);
        newCategoryDiv.append(category)
    }
    formContainer.append(newCategoryDiv);
};

addButton.addEventListener('click', createCategory)
