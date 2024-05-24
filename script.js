//Feature 1: Add unput to product

//declare a starting value to store data.
let products = [];
let idCounter = 0;
let cart = [];

//function to check the file type is jpg/gif/png
function isImgUrl(imageUrl) {
	const input = new URL(imageUrl);
	return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
}

//Make function to upload to product
function displayProduct(product) {
	const displaySection = document.getElementById("displaySection");
	const card = document.createElement("div");
	card.className = "inline-flex bg-white w-full mx-auto justify-left";

	card.innerHTML = `
		<label class="items-center mt-2 text-2xl px-4">
			<input type="checkbox" class="w-5 h-5 text-2xl accent-rose-600" data-id="${product.id}" onchange="toggleLike(event)">
			
		</label>

        <img src="${product.imageUrl}" alt="${product.productName}" class="w-[200px] aspect-[4/3] mb-4 object-cover">
        <p class="text-gray-700 font-semibold text-2xl text-balance overflow-hidden my-4 p-4">${product.productName}</p><br>
		<p class="text-gray-700 font-semibold text-2xl text-balance overflow-hidden my-4 p-4">$${product.price}</p>
    `;

	displaySection.appendChild(card);
}

//Event when clicking 'Create Product' button
document
	.getElementById("bt-product")
	.addEventListener("click", function (event) {
		//Prevent refreshing the screen
		event.preventDefault();

		//Select DOM Element
		const productName = document.getElementById("productName").value;
		const price = document.getElementById("price").value;
		const image = document.getElementById("image").value;
		const errorMessage = document.getElementById("errorMessage");

		//validation if uploaded image is jpg/png/gif
		if (!isImgUrl(image)) {
			errorMessage.textContent = "Please enter a valid image URL.";
			return;
		}

		//validate that price is not negative.
		if (price < 0) {
			errorMessage.textContent = "Please insert price from 0 onward.";
			return;
		}

		//Create new upload object
		const newProduct = {
			id: idCounter++,
			productName: productName,
			price: price,
			imageUrl: image,
			checked: false,
		};

		//push new upload into array.
		products.push(newProduct);

		//Display the upload object in the UI below
		displayProduct(newProduct);

		//Clear all error messages(s)
		errorMessage.textContent = "";

		//Clear all documents in the form
		document.getElementById("form").reset();
	});

//Feature 2: Add ticked items to cart.

//To toggle Value when click box
function toggleLike(event) {
	const checkbox = event.target;
	const checkboxId = parseInt(checkbox.getAttribute("data-id"));
	const product = products.find((product) => product.id === checkboxId);

	//Set checked checkbox to be true.
	if (checkbox.checked) {
		product.checked = true;
	} else {
		product.checked = false;
	}

	console.log(products);
}

//Event Handler when clicking button: 'add to cart'
document.getElementById("bt-add").addEventListener("click", () => {
	//filter that cart only has checked products from products array.
	cart = products.filter((product) => product.checked === true);
	//Add function to display cart.
	displayCart(cart);
	displayButton();
});

//Declare displayCart
function displayCart(cart) {
	//Assign constant to add content for checked product
	const displayDiv = document.getElementById("displayCart");
	displayDiv.innerHTML = "";

	//For each checked product, we create 'div' to put content in.
	cart.forEach((product) => {
		const div = document.createElement("div");
		div.className = "items-center bg-white p-4 rounded-lg shadow-lg";

		//Add the following contents into div that we created
		div.innerHTML = `
    <input type="checkbox" class="sr-only w-5 h-5 text-2xl accent-rose-600" data-id="${product.id}" onchange="calculateSelector(event)">
    <img src="${product.imageUrl}" alt="${product.productName} class="w-full aspect-[4/3] rounded-md mb-4 object-cover">
    
    <div class="flex items-center justify-between">

    <div class="mt-3 ">
    <span class="block ml-2 text-gray-700 font-semibold text-3xl">${product.productName}</span>
    <span class="block ml-2 text-gray-700 font-semibold text-2xl">${product.price}$</span>
    </div>
	
	<div>
		<button
		type ="submit"
		id="${product.id}"
		onclick = "removeCard(${product.id})"
		class="bg-blue-500 px-4 text-white rounded-md hover:bg-blue-600 hover:ring hover:ring-blue-300 py-4 mt-2"
		> Remove 
		</button>
	</div>
	`;

		//Put div to be a child of displayDiv
		displayDiv.appendChild(div);
	});

	// const btnDiv = document.createElement("btn-cal");
}

//Display calculate total button
function displayButton() {
	const btnCal = document.getElementById("btn-cal");
	btnCal.className =
		"border border-black bg-gray-200 text-black font-medium px-8 py-2 rounded-md hover:bg-blue-600 hover:ring hover:ring-blue-300";
	if (cart.length === 0) {
		alert("You haven't added any items to cart.");
		return;
	}
}

//function for button to remove card
function removeCard(productId) {
	cart = cart.filter((product) => product.id !== productId);
	displayCart(cart);
}

//Feature 3: Calculate total price

//To calculate total price when button is clicked
document.getElementById("btn-cal").addEventListener("click", function (event) {
	event.preventDefault();
	const finalPrice = calTotal(cart);
	document.getElementById(
		"totalPrice"
	).textContent = `You have to pay: ${finalPrice}$.`;
});

//Function to calculate total price
function calTotal(cart) {
	let priceFinal = cart.reduce((sum, product) => {
		return sum + parseFloat(product.price);
	}, 0);

	return priceFinal.toFixed(2);
}
