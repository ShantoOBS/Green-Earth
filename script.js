function manageSpinner(show) {
    if (show) {
        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("cardContainier").classList.add("hidden");
    } else {
        document.getElementById("cardContainier").classList.remove("hidden");
        document.getElementById("loading").classList.add("hidden");
    }
}

function removeColor(id) {
    document.querySelectorAll(".common").forEach(ele => {
        ele.classList.remove("bg-[#15803d]", "text-white");
    });
    document.getElementById(`b${id}`).classList.add("bg-[#15803d]", "text-white");
}

function CatagoriesButtonClick(id = 1) {
    removeColor(id);
    manageSpinner(true);

    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => {
            const cardContainier = document.getElementById("cardContainier");
            cardContainier.innerHTML = ``;

            data.plants.forEach(ele => {
                const newdiv = document.createElement("div");
                newdiv.innerHTML = `
                    <div class="bg-white text-left p-[16px] rounded-lg h-full ">
                        <img src="${ele.image}" alt="" class="rounded-lg h-[186px] w-full ">
                        <p class="py-3 font-bold text-[0.8rem] cursor-pointer">${ele.name}</p>
                        <p class="text-[0.8rem] text-[#1f2937]">${ele.description}</p>
                        <div class="flex justify-between items-center text-[0.8rem]">
                            <button class="bg-[#dcfce7] rounded-full px-2 py-1 text-[#15803d] font-medium my-3">
                                ${ele.category}
                            </button>
                            <p class="font-bold">$<span>${ele.price}</span></p>
                        </div>
                        <button class="btn btn-success bg-[#15803d] text-white px-10 w-full rounded-full text-[1rem]">
                            Add to Card
                        </button>
                    </div>
                `;
                cardContainier.appendChild(newdiv);
            });

            manageSpinner(false);
        })
        .catch(err => console.log(err));
}

async function getCate() {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/categories");
        const data = await res.json();

        const CategoriesContainer = document.getElementById("CategoriesContainer");
        data.categories.forEach(element => {
            const newdiv = document.createElement("div");
            newdiv.innerHTML = `
                <button onclick="CatagoriesButtonClick(${element.id})" 
                        id="b${element.id}" 
                        class="common rounded-md text-[1rem] cursor-pointer w-full py-1 pl-2 text-left hover:bg-[#43b76f] hover:text-white">
                    ${element.category_name}
                </button>`;
            CategoriesContainer.appendChild(newdiv);
        });

        
        if (data.categories.length > 0) {
            CatagoriesButtonClick(data.categories[0].id);
        }
    } catch (err) {
        console.error(err);
    }
}

getCate();


document.getElementById("cardContainier").addEventListener('click', (ele) => {
    const clickButton = ele.target.tagName;
    const t = document.getElementById("total");
    let total = parseInt(t.textContent);

    const name = ele.target.parentElement.children[1].textContent;
    const currPrice = parseInt(ele.target.parentElement.children[3].children[1].children[0].textContent);
    const url = ele.target.parentElement.children[0].src;
    const description = ele.target.parentElement.children[2].textContent;
    const Category = ele.target.parentElement.children[3].children[0].textContent;

    if (clickButton === "BUTTON") {
        total += currPrice;
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
            <div class="flex items-center justify-between p-2 mt-2 bg-[#f0fdf4] rounded-md">
                <div>
                    <p>${name}</p>
                    <p class="text-[#6d7682]">$ <span>${currPrice}</span> <i class="fa-solid fa-xmark"></i>
                        <span>1</span></p>
                </div>
                <div>
                    <button class="cursor-pointer"><i class="fa-solid fa-xmark text-[#6d7682]"></i></button>
                </div>
            </div>
        `;
        const priceCard = document.getElementById("priceCard");
        priceCard.appendChild(newDiv);
        t.textContent = `${total}`;
    }

    if (clickButton === "P") {
        const modalBox = document.getElementById("modalBox");
        modalBox.innerHTML = "";
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
            <h3 class="text-lg font-bold ">${name}</h3>
            <img src="${url}" alt="" class="h-50 w-full my-4 rounded-md">
            <h3><span class="text-lg font-bold ">Category: </span>${Category}</h3>
            <h3 class="my-2"><span class="text-lg font-bold ">Price: </span>$${currPrice}</h3>
            <h3><span class="text-lg font-bold ">Description: </span>${description}</h3>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-primary bg-[#15803d]">Close</button>
                </form>
            </div>
        `;
        modalBox.appendChild(newDiv);
        my_modal_1.showModal();
    }
});


document.getElementById("cart").addEventListener('click',(ele) =>{


    if(ele.target.tagName==="I"){

    const t = document.getElementById("total");
    let total = parseInt(t.textContent);

    let curPrice=parseInt( ele.target.parentElement.parentElement.parentElement.children[0].children[1].children[0].textContent );

    total-=curPrice;

    t.textContent = `${total}`;
   
     ele.target.parentElement.parentElement.parentElement.parentElement.classList.add("hidden");

    }

      
})