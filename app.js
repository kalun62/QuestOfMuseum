'use strict'

const app = document.querySelector('.app'),
	wrap = document.createElement('div'),
	step = document.createElement('span'),
	button = document.createElement('button')

let i = 1

wrap.classList.add('app__wrapper')
step.classList.add('step')
button.innerText = 'Далее'

app.append(step, wrap)

fetch('https://script.googleusercontent.com/macros/echo?user_content_key=suXHj9Ummr2jDROwph5s4E3Gi8IikegGVvz3SsFnx6gFq7Fj4TfsZQwT4RAMZ0KGStX6t0plmZaspQuTZsgimNvKHfYyc0Qdm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDTFaET6z9-YEMfFTPppN6O1C2e24W9DRS2TW99wJQpp-zWDEApzKaNr5aH3h9-9fg7D4DXj5yFt37x8auI8zOKV-cstmj6tCw&lib=MvEp0Mq_unqvbcetyDtqhMZTzWPfVHIZP')
	.then((response) => {
		return response.json();
	})
	.then((response) => {
		const questAppend = () => {
			i > response.questions.length
				? finale()
				: questTextOrImage()
		}

		function questTextOrImage (){
			if(response.questions[i-1].quest.includes('http') || response.questions[i-1].quest.includes('base64')){
				wrap.innerHTML = `
					<div class="quest"><img src="${response.questions[i-1].quest}" type="image/jpeg"></div>
					<input type="text" placeholder="Ваш ответ"></input>
					`
				step.innerText = `Шаг ${i} из ${response.questions.length}`
				app.append(button)
			}else{
				wrap.innerHTML = `
				<div class="quest">${response.questions[i-1].quest}</div>
				<input type="text" placeholder="Ваш ответ"></input>
				`,
			step.innerText = `Шаг ${i} из ${response.questions.length}`,
			app.append(button)
			}
			
				console.log(response.questions[i-1].quest);
		}

		function validate() {
			const input = document.querySelector('input')

			input.value.toLowerCase() != response.questions[i - 1].answer.toLowerCase() 
				? input.classList.add('error') 
				: (input.classList.remove('error'), i++, questAppend())
		}

		function finale() {
			app.innerHTML = `Ты Молодец`
			button.removeEventListener('click', validate)
		}

		questAppend()

		button.addEventListener('click', validate)

	})