//  Показ модального окна

const modalBtns = document.querySelectorAll('.modal-active'),
		modalContent = document.querySelector('.modal');


modalBtns.forEach(item => {
	item.addEventListener('click', () => {
		modalContent.style.display = 'block';
		document.body.style.overflow = 'hidden';
	})
	modalContent.addEventListener('click', (e) => {
		if(e.target.classList.contains('modal__inner')) {
			modalContent.style.display = '';
			document.body.style.overflow = '';
		}
		
	})
})


// Слайдер в  products

const sliderBtns = document.querySelectorAll('.products-btn'),
		sliderContents = document.querySelectorAll('.products__item');

function hide () {
		sliderBtns.forEach(item => {
			item.classList.remove('products-btn--active');

		})
		sliderContents.forEach(items => {
			items.style.display = 'none';
		})

};


function showContent (i = 0) {
	sliderContents[i].style.display = 'block';
	sliderBtns[i].classList.add('products-btn--active');
	
}
showContent();
sliderBtns.forEach ((item,index) => {
	item.addEventListener('click', () => {
		hide();
		showContent(index)
	})
})




// Работа с FireBase


function setCookie(name,value,days) {
	if (days) {
	  var date = new Date();
	  date.setTime(date.getTime()+(days*24*60*60*1000));
	  var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
	  var c = ca[i];
	  while (c.charAt(0)==' ') c = c.substring(1,c.length);
	  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function delCookie(name) {
	setCookie(name,"",-1);
}
if (!(getCookie("id"))) {
	function uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	};
	const userId = uuidv4();
	setCookie("id",userId,365);
}


const firebaseConfig = {
	apiKey: "AIzaSyDFFnvfZMbENuJb-COBC2rPXNU9AzOyJWc",
	authDomain: "sferus360-aee4a.firebaseapp.com",
	projectId: "sferus360-aee4a",
	storageBucket: "sferus360-aee4a.appspot.com",
	messagingSenderId: "562847796404",
	appId: "1:562847796404:web:cfc9ae020a2049f61f5be1",
	measurementId: "G-W7ZT9RZXGJ",
	databaseURL: "https://sferus360-aee4a-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


const userCookie = getCookie('id');

const form = document.querySelector('form'),
		formInputAll = form.querySelectorAll('.modal-input'),
		formCheckbox = form.querySelector('#label1'),
		formBtn = form.querySelector('button');


formBtn.addEventListener('click', (e) => {
	e.preventDefault();
	
	formInputAll.forEach(item => {
		
		if(item.value) {
			const messageUser = {
				name:formInputAll[0].value,
				mail:formInputAll[1].value,
				tel:formInputAll[2].value,
			}
			const db = firebase.database().ref('message/' + userCookie).push(messageUser);
		}
	})
 

})



// Вывод текста из FireBase

// function showTextFireBase (block, nameBlock, element) {
// 	for(let itemName in block) {
// 		if(itemName == 'title') {
// 			document.getElementById(`${nameBlock + '-title'}`).innerHTML = block[itemName];
// 		}
// 		if(itemName == 'subtitle') {
// 			document.getElementById(`${nameBlock + '-subtitle'}`).innerHTML = block[itemName];
// 		}
// 		if(itemName == 'text') {
// 			document.getElementById(`${nameBlock + '-text'}`).innerHTML = block[itemName];
// 		}
// 		if(itemName == 'items') {
// 			let itemsListOut = [];
// 			block[itemName].forEach(item => {
// 				let newObject = {...item}
// 				console.log(item);
				
// 				itemsListOut += element;
// 			})
// 			document.getElementById(`${nameBlock + '-items'}`).innerHTML = itemsListOut;
// 		}
// 	}
// }




// if(window.location.pathname == '/index-ru.html') {

	// const aboutElement = 
	// 	`
	// 	<div class="about__item">
	// 		<div class="about__item-content">
	// 			<h4 class="about__item-title"> ${this.title}</h4>
	// 			<p class="about__item-text">
	// 				${this.text}
	// 			</p>
	// 		</div>
	// 		<img src="img/about-img-1--en.png" alt="img">
	// 	</div>
	// 	`;
	// const casesElement = 
	// 	`
	// 	<div class="cases__item">
	// 		<div class="cases__item-bg">
	// 			<img src="img/usage-item-bg-1.png" alt="">
	// 		</div>
	// 		<img class="cases__item-img" src="img/usage-item-img-1.png" alt="img">
	// 		<div  class="cases__item-box">
	// 			<h4 class="cases__item-title">
	// 				${this.title}
	// 			</h4>
	// 			<p class="cases__item-text">
	// 				${this.text}
	// 			</p>
	// 		</div>
			
	// 	</div>
	// 	`;
	// const productsElement = 
	// 	`
	// 	<div class="products__item">
	// 		<img class="products__item-img" src="img/products-item-1.png" alt="img">
	// 		<p class="products__item-text">${this.text}</p>

	// 	</div>
	// 	`;
	// const templatesElement = 
	// 	`
	// 	<div class="templates__item">
	// 		<img class="templates__item-img" src="img/templates-img-1.svg" alt="img">
	// 		<h4 class="templates__item-title">
	// 			${this.title}
	// 		</h4>
	// 		<p class="templates__item-text">
	// 			${this.text}
	// 		</p>
	// 	</div>
	// 	`;
// 	const getFireBase = firebase.database().ref('ru').on('value', (elem)=> {
// 		const allInfo = elem.val();
// 		for (let elem in allInfo) {
// 			if(elem == 'main') {
// 				const nameBlock = elem;
// 				const getBlock = allInfo[elem];
// 				showTextFireBase (getBlock, nameBlock)
// 			}
// 			if(elem == 'about') {
// 				const nameBlock = elem;
// 				const getBlock = allInfo[elem];
// 				showTextFireBase (getBlock, nameBlock, )
// 			}
// 		}
// 	})
// }


















