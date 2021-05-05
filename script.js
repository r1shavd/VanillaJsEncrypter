/*
JavaScript for Encrypter - VanillaJS

Author : Rishav Das
*/

// The JavaScript code for the functionality of the web page ;-)

const emptyError = 'Your Text or Password is empty';

const giveUniqueKey = (password) => {
	// Generating the unique key from the user specified password string
	let uniqueKey = 0, isEven = true;
	for (let i of password) {
		if (isEven) {
			uniqueKey += i.charCodeAt();
		} else {
			uniqueKey -= i.charCodeAt();
		}
		isEven = !isEven; // It will make the isEven false if it is true and true if it is false
	}
	if (uniqueKey < 0) {
		uniqueKey = uniqueKey * (-1);
	}
	uniqueKey += password.length;

	return uniqueKey % 256;
}
const encrypt = (text, password) => {
	/* The function to encrypt a string using a password string ;-) */

	let key = giveUniqueKey(password);
	console.log(key);

	// Jumping the characters of the text (plain)
	let encryptedText = ``;
	text.split('').forEach((element, index) => {
		// Iterating through the each characters of the plain text specified by the user

		encryptedText += String.fromCharCode((element.charCodeAt() + key) % 256);
	});

	// Changing the encoding of the encrypted format of the text to base64 from utf-8
	encryptedText = btoa(encryptedText);
	return encryptedText;
}

const decrypt = (text, password) => {
	/* The function to decrypt a string using a password string that was used to encrypt it */
	
	let key = giveUniqueKey(password);
	
	// Changing the encoding of the encrypted format of the text to base64 from utf-8
	text = atob(text);

	// Jumping the characters of the text (encrypted) to plain text (original)
	let decryptedText = ``;
	text.split('').forEach((element, index) => {
		// Iterating through the each characters of the plain text specified by the user
		if(element.charCodeAt() < key){
			decryptedText += String.fromCharCode((element.charCodeAt() - key + 256) % 256);
		}
		else{
			decryptedText += String.fromCharCode((element.charCodeAt() - key) % 256);
		}
	});

	return decryptedText;
}

// The result textarea HTML element
const result = document.querySelector('textarea[name="result"]');

// Getting the funciton keys (encrypt / decrypt)
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');

// Adding the onclick event listeners on the encrypt and decrypt button
encryptBtn.addEventListener('click', (e) => {
	/* The function to be executed when the user clicks on the encrypt button, first we will prevent the default action from happening, and then read the text from the user */

	e.preventDefault();

	// Getting the value of the HTML input values at the web page
	const text = document.querySelector('textarea[name="text"]').value;
	const password = document.querySelector('input[name="password"]').value;

	if(text && password){ // If text.length != 0 and password.length != 0 then we are continuing
		// Encrypting the user inputted text and we will use the password as provided by the user
		try {
			let encryptedText = encrypt(text, password);

			// If there are no errors then we display the result on the result textarea HTML element ( The result here is the encrypted text )
			result.value = encryptedText;
		} catch(error) {
			// If there are any errors in the process, then we display the error on the result element

			result.value = `ERROR : ${error}`;
		}
	}
	else{
		alert(emptyError);
	}
});

decryptBtn.addEventListener('click', (e) => {
	/* The function to be executed when the user clicks on the decrypt button, first we will prevent the default action from happening, and then read the text from the user */

	e.preventDefault();

	// Getting the value of the HTML input values at the web page
	const text = document.querySelector('textarea[name="text"]').value;
	const password = document.querySelector('input[name="password"]').value;

	if(text && password){ // If text.length != 0 and password.length != 0 then we are continuing
		// Decrypting the user inputted text and we will use the password as provided by the user
		try {
			let decryptedText = decrypt(text, password);

			// If there are no errors then we display the result on the result textarea HTML element ( The result here is the decrypted text )
			result.value = decryptedText;
		} catch(error) {
			// If there are any errors in the process, then we display the error on the result element

			result.value = `ERROR : ${error}`;
		}
	}
	else{
		alert(emptyError);
	}
});