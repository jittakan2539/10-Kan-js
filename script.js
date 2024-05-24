//declare a starting value to store data.
let upload = [];
let idCounter = 0;
let totalBuys = 0;

//function to check the file type is jpg/gif/png
function isImgUrl(imageUrl) {
	const input = new URL(imageUrl);
	return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
}

//Event when clicking 'Create Product' button in Eventlistener
document
	.getElementById("bt-product")
	.addEventListener("click", function (event) {
		//Prevent refreshing the screen
		event.preventDefault();

		//Select DOM Element
		const productName = document.getElementById("productName").value;
		const price = document.getElementById("price").value;
		const image = document.getElementById("image").value;

		//declare a starting value to store data.
		let upload = [];
		let idCounter = 0;
		let totalBuys = 0;

		//function to check the file type is jpg/gif/png
		function isImgUrl(imageUrl) {
			const input = new URL(imageUrl);
			return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
		}

		//Event when clicking 'Create Product' button
		document
			.getElementBtId("bt-product")
			.addEventListener("click", function (event) {
				//Prevent refreshing the screen
				event.preventDefault();

				//validation if uploaded image is jpg/png/gif
				if (!isImgUrl(imageURL)) {
					errorMessage.textContent = "Please enter a valid image URL.";
					return;
				}

				//validate that price is not negative.
				if (price < 0) {
					errorMessage.textContent = "Please insert price from 0 onward.";
				}

				//Create new upload object
				const newUpload = {
					id: idCounter++,
					productName: productName,
					price: price,
					imageUrl: imageUrl,
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

		//Make function to upload
		function displayUpload(upload) {
			const displaySection = document.getElementById("displaySection");
			const card = document.createElement("div");
			card.className = "bg-white";

			card.innerHTML = `
        <img src="${upload.imageURL}" alt="${upload.caption}" class="w-full aspect-[4/3] rounded-md mb-4 object-cover">
    <p class="text-gray-700 font-semibold text-2xl text-balance overflow-hidden my-4 p-4">${upload.caption}</p>
    <label class="inline-flex items-center mt-2 text-2xl px-4">
      <input type="checkbox" class="w-8 h-8 text-2xl accent-rose-600" data-id="${upload.id}" onchange="toggleLike(event)">
      <span class="ml-2 text-gray-700 font-semibold">Love this 😍!</span>
    </label>
        
        `;
		}

		//validation if uploaded image is jpg/png/gif
		if (!isImgUrl(imageURL)) {
			errorMessage.textContent = "Please enter a valid image URL.";
			return;
		}

		//validate that price is not negative.
		if (price < 0) {
			errorMessage.textContent = "Please insert price from 0 onward.";
		}

		//Create new upload object
		const newUpload = {
			id: idCounter++,
			productName: productName,
			price: price,
			imageUrl: imageUrl,
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

//Make function to upload
function displayUpload(upload) {
	const displaySection = document.getElementById("displaySection");
	const card = document.createElement("div");
	card.className = "bg-white";

	card.innerHTML = `
        <img src="${upload.imageURL}" alt="${upload.caption}" class="w-full aspect-[4/3] rounded-md mb-4 object-cover">
    <p class="text-gray-700 font-semibold text-2xl text-balance overflow-hidden my-4 p-4">${upload.caption}</p>
    <label class="inline-flex items-center mt-2 text-2xl px-4">
      <input type="checkbox" class="w-8 h-8 text-2xl accent-rose-600" data-id="${upload.id}" onchange="toggleLike(event)">
      <span class="ml-2 text-gray-700 font-semibold">Love this 😍!</span>
    </label>
        
        `;
}
