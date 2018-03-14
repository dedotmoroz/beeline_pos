
document.addEventListener('DOMContentLoaded', includeBeeline);
function includeBeeline() {

	//var beelineStyle = getComputedStyle(document.body);
	// if(beelineStyle.fontFamily.search( /Officina/i )!= -1){
	// search css attribute - font-family: Officina Serif and start scripts;

	var timerID = document.getElementById('timer');
	var timerID_d = document.createElement('li');
	timerID_d.setAttribute('id', 'timer_d');
	timerID_d.innerHTML = '14:38';
	timerID.insertAdjacentElement('afterend', timerID_d);


	timerID.addEventListener('DOMSubtreeModified', delBlank);
	function delBlank() {
		// console.log(timerID);
		timerID_d.innerHTML = timerID.innerHTML.replace(/ /g, "");
		timerID.insertAdjacentElement('afterend', timerID_d);
	}

	var footerBlock = document.createElement('div');
	footerBlock.innerHTML = '<a href="http://beeline.ru/customers/help/shop/oplata-dostavka/">Оплата и доставка</a><a href="http://beeline.ru/customers/help/shop/garantiya/">Гарантия</a><a href="http://beeline.ru/customers/help/shop/vozvrat-otmena/">Возврат товара</a><a href="http://beeline.ru/customers/beeline-on-map/" id="beeline-on-map">Адреса салонов продаж</a>';
	footerBlock.setAttribute('id', 'footer_beeline');
	footerBlock.style.display = 'none';
	var insertPlace = document.querySelector('.footer .container .l-padded-right');
	insertPlace.appendChild(footerBlock);

	var footerLicense = document.createElement('a');
	footerLicense.innerHTML = 'Сайт является средством массовой информации.';
	footerLicense.setAttribute('id', 'footer_license');
	footerLicense.setAttribute('href', 'http://beeline.ru/customers/legal/');
	footerLicense.style.display = 'none';
	insertPlace.appendChild(footerLicense);

	var linkDisallow = document.getElementById('headlink');
	var advTarget = linkDisallow.getAttribute('href');

	var selectCardType = document.querySelector('#uniform-card_type span');
	selectCardType.innerHTML = 'Тип карты';
	selectCardType.addEventListener('DOMSubtreeModified', defSelect);
	function defSelect() {
		setTimeout(function () {
			if (selectCardType.innerHTML == '') {
				selectCardType.innerHTML = 'Тип карты';
			}
		}, 10);
	}

	var selectMonth = document.querySelector('.card_date .padded-right .selector span');
	selectMonth.innerHTML = 'ММ';
	selectMonth.addEventListener('DOMSubtreeModified', defMonth);
	function defMonth() {
		//console.log(selectMonth.innerHTML);
		setTimeout(function () {
			if (selectMonth.innerHTML == '') {
				selectMonth.innerHTML = 'ММ';
			}
		}, 10);
	}

	var selectYear = document.querySelector('.card_date .padded-left .selector span');
	selectYear.innerHTML = 'ГГ';
	selectYear.addEventListener('DOMSubtreeModified', defYear);
	function defYear() {
		//console.log(selectYear.innerHTML);
		setTimeout(function () {
			if (selectYear.innerHTML == '') {
				selectYear.innerHTML = 'ГГ';
			}
		}, 10);
	}

	linkDisallow.onclick = function () { return false }
	var linkLogo = document.querySelector('.header .sec_1');
	linkLogo.onclick = function (e) { window.location = "http://beeline.ru/customers/products/" }
	var linkCart = document.querySelector('.header .sec_2');
	linkCart.onclick = function (e) { window.location = "http://beeline.ru/shop/" }


	function DivSelector() {

		this.nameSelect = '';
		var self = this;

		this.Build = function () {
			var divSelect = document.createElement('div');
			divSelect.setAttribute('class', 'myOption');
			divSelect.setAttribute('id', this.nameSelect);
			var selectID = document.forms[0].elements[this.nameSelect];
			var widthSelectID = getComputedStyle(selectID).width;
			var widthSelect = parseFloat(widthSelectID) + 2 + 'px';
			divSelect.style.width = widthSelect;

			for (i = 1; i < selectID.options.length; i++) {
				var selectValue = (selectID[i].value) ? selectID[i].value : '';
				var selectText = selectID[i].text;
				var divOption = document.createElement('div');
				divOption.setAttribute('data-val', selectValue);
				divOption.innerHTML = selectText;
				divSelect.appendChild(divOption);
				selectID[i].hidden = true;

			}

			selectID.parentElement.insertAdjacentElement('beforebegin', divSelect);

			document.body.addEventListener('mousedown', clickHandler);
			function clickHandler(event) {
				var targetClick = event.target.parentElement;
				if (divSelect == targetClick) { // click on menu item
					var val = event.target.getAttribute('data-val');
					var text = event.target.innerHTML;
					// post into <div class="selector fixedWidth  MI" id="uniform-card_type">
					selectID.parentElement.className = "selector fixedWidth " + val;
					// post into <select name="cardtype" id="card_type"  aria-required="true" aria-invalid="false">
					selectID.setAttribute('aria-invalid', 'false');
					// post into <span style="user-select: none;">Mir</span>
					var placeIN = selectID.parentElement.querySelector('span');
					placeIN.innerHTML = text;
					selectID.value = val;
					self.show.classList.remove("show");
					selectID.style.display = 'block';
				} else if (selectID.parentElement == targetClick) { // open-close menu
					var el = selectID.parentElement.parentElement;
					self.show = el.querySelector('.myOption');
					self.show.classList.toggle("show");
					selectID.style.display = 'none';
				} else if (event.target.matches('.myOption')) { // click on scroll bar
				} else {
					if (self.show) {
						self.show.classList.remove("show");
						selectID.style.display = 'block';
					}
				}
			}

		}

	}

	var SelectCardtype = new DivSelector();
	SelectCardtype.nameSelect = 'cardtype';
	SelectCardtype.Build();

	var SelectYear = new DivSelector();
	SelectYear.nameSelect = 'year';
	SelectYear.Build();

	var SelectMonth = new DivSelector();
	SelectMonth.nameSelect = 'month';
	SelectMonth.Build();

}
//}