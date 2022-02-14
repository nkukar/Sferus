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
		formInputAll = form.querySelectorAll('.modal-input--val'),
		formCheckbox = form.querySelector('#label1'),
		formBtn = form.querySelector('button');


	formBtn.addEventListener('click', (e) => {
		e.preventDefault();
		let messageUser = {};
		let flag = false;
		formInputAll.forEach(item => {
			
			if(item.value && item.val != '') {
				messageUser[`${item.id}`] = item.value;
				item.style.borderColor = 'rgba(0, 0, 0, 0.75)'
				flag = true;
			}else {
				item.style.borderColor = 'red'
				flag = false;
				
			}
		})
		if(flag) {
			const db = firebase.database().ref('message/' + userCookie).push(messageUser);
			document.querySelector('.modal').style.display = 'none';
			document.querySelector('.modal-done').style.display = 'block';
			setTimeout(()=> {
				document.querySelector('.modal-done').style.display = 'none';
			},2000)
			document.body.style.overflow = '';
		}
		
		
		
	
	})



// Вывод текста из FireBase




	const getFireBase = firebase.database().ref('ru').on('value', (elem)=> {
		const allInfo = elem.val();
		for (let elem in allInfo) {
			if(elem == 'main') {
					document.getElementById(`${elem}-title`).textContent = allInfo[elem]['title'];
					document.getElementById(`${elem}-text`).textContent = allInfo[elem]['text'];
			}
			if(elem == 'about') {
				document.getElementById(`${elem}-title`).textContent = allInfo[elem]['title'];
				document.getElementById(`${elem}-text`).textContent = allInfo[elem]['text'];
				let itemList = '';
				allInfo[elem]['items'].forEach (item => {
					itemList += 
					`
					<div class="about__item">
						<div class="about__item-content">
							<h4 class="about__item-title">${item.title}</h4>
							<p class="about__item-text">
							${item.text}
							</p>
						</div>
						<img src="${item.img}" alt="img">
					</div>
					`;
				});
				document.getElementById(`${elem}-items`).innerHTML = itemList;

			}
			if(elem == 'cases') {
				document.getElementById(`${elem}-title`).textContent = allInfo[elem]['title'];
				let itemList = '';
				allInfo[elem]['items'].forEach (item => {
					itemList += 
					`
					<div class="cases__item">
						<div class="cases__item-bg">
							<img src="${item.bg}" alt="">
						</div>
						<img class="cases__item-img" src="${item.img}" alt="img">
						<div  class="cases__item-box">
							<h4 class="cases__item-title">
								${item.title}
							</h4>
							<p class="cases__item-text">
								${item.text}
							</p>
						</div>
						
					</div>
					`;
				});
				document.getElementById(`${elem}-items`).innerHTML = itemList;

			}
			if(elem == 'video') {
				document.getElementById(`${elem}-title`).textContent = allInfo[elem]['title'];
				document.getElementById(`${elem}-subtitle`).textContent = allInfo[elem]['subtitle'];
				document.getElementById('video-src').src = allInfo[elem]['src'];
			}
			if(elem == 'products') {
				document.getElementById(`${elem}-title`).textContent = allInfo[elem]['title'];
				let btnsList = '';
				allInfo[elem]['buttons'].forEach (item => {
					btnsList += 
					`
						<button class="products-btn products-btn--size " >${item}</button>
					`;
				});
				document.getElementById(`${elem}-btns`).innerHTML = btnsList;
				let itemsList = '';
				allInfo[elem]['items'].forEach (item => {
					itemsList += 
					`
					<div class="products__item">
						<img class="products__item-img" src="${item.img}" alt="img">
						<p class="products__item-text">${item.text}</p>

					</div>
					`;
				});
				document.getElementById(`${elem}-items`).innerHTML = itemsList;






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

				
			  
			  
				
				  
				  
				  
					
					
				
			}
			if(elem == 'templates') {
				document.getElementById(`${elem}-title`).textContent = allInfo[elem]['title'];
				document.getElementById(`${elem}-text`).textContent = allInfo[elem]['text'];
				let itemList = '';
				allInfo[elem]['items'].forEach (item => {
					itemList += 
					`
					<div class="templates__item">
						<img class="templates__item-img" src="${item.img}" alt="img">
						<h4 class="templates__item-title">
							${item.title}
						</h4>
						<p class="templates__item-text">
								${item.text}
						</p>
					</div>
					`;
				});
				document.getElementById(`${elem}-items`).innerHTML = itemList;

			}
			if(elem == 'footer') {
				document.getElementById(`${elem}-title`).textContent = allInfo[elem]['title'];
				document.getElementById(`${elem}-btn`).textContent = allInfo[elem]['btn'];
				document.getElementById(`${elem}-src`).textContent = allInfo[elem]['email'];
				document.getElementById(`${elem}-src`).href = `mailto:${allInfo[elem]['email']}`;

			}
			if(elem == 'header') {
				document.getElementById(`${elem}-btn`).textContent = allInfo[elem]['btn'];
				document.getElementById(`${elem}-link`).href = allInfo[elem]['link'];
				

			}
			
			
		}
	})





















