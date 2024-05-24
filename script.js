//Feature 1: Add unput to product

//declare a starting value to store data.
let upload = [];
let idCounter = 0;
let totalBuys = 0;

//function to check the file type is jpg/gif/png
function isImgUrl(imageUrl) {
	const input = new URL(imageUrl);
	return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
}

//Make function to upload
function displayUpload(upload) {
	const displaySection = document.getElementById("displaySection");
	const card = document.createElement("div");
	card.className = "inline-flex bg-white w-full mx-auto justify-left";

	card.innerHTML = `
		<label class="items-center mt-2 text-2xl px-4">
			<input type="checkbox" class="w-3 h-3 text-2xl accent-rose-600" data-id="${upload.id}" onchange="toggleLike(event)">
			
		</label>

        <img src="${upload.imageUrl}" alt="${upload.productName}" class="w-[200px] aspect-[4/3] mb-4 object-cover">
        <p class="text-gray-700 font-semibold text-2xl text-balance overflow-hidden my-4 p-4">${upload.productName}</p><br>
		<p class="text-gray-700 font-semibold text-2xl text-balance overflow-hidden my-4 p-4">$${upload.price}</p>
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
		const newUpload = {
			id: idCounter++,
			productName: productName,
			price: price,
			imageUrl: image,
			buys: false,
		};

		//push new upload into array.
		upload.push(newUpload);

		//Display the upload object in the UI below
		displayUpload(newUpload);

		//Clear all error messages(s)
		errorMessage.textContent = "";

		//Clear all documents in the form
		document.getElementById("form").reset();
	});

//Feature 2: Add ticked items to cart.

//To toggle Value when click box
function toggleLike(event) {
	const checkbox = event.target;
	const uploadId = parseInt(checkbox.getAttribute("data-id"));
	const upload = uploads.find((upload) => upload.id === uploadId);

	if (upload) {
		upload.likes = checkbox.checked;
		updateLikeCounter();
	}
}

function updateLikeCounter() {
	totalLikes = uploads.filter((upload) => upload.likes).length;
	document.getElementById(
		"likeCounter"
	).textContent = `Total Likes: ${totalLikes}`;
}
