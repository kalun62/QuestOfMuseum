'use strict'

const app = document.querySelector('.app'),
	wrap = document.createElement('div'),
	step = document.createElement('span'),
	button = document.createElement('button'),
	errorLabel = document.createElement('label')

let i = 1

wrap.classList.add('app__wrapper')
step.classList.add('step')
button.innerText = 'Далее'

app.append(step, wrap)

fetch('https://script.google.com/macros/s/AKfycbwZhmLmaU5PojWJKZPmqbSJZ4FNiiaT8d70-7rCGHtzFwaidZH9_uW3b6H7E9_sS4vY/exec')
	.then((response) => {
		return response.json();
	})
	.then((response) => {
		const questAppend = () => {
			i > response.questions.length 
			 	? finale() 
				: questTextOrImage()
		}
		function questTextOrImage() {
			if (response.questions[i - 1].quest.includes('http')) {
				wrap.innerHTML = `
					<div class="quest img"><img src="${response.questions[i-1].quest}" type="image/jpeg"></div>
					<div class="descr">${response.questions[i-1].description}</div>
					<div class="form-group">
						<input name="ansver" type="text" placeholder="Ваш ответ"></input>
					</div>
					`
				step.innerText = `Шаг ${i} из ${response.questions.length}`
				app.append(button)
			} else {
				wrap.innerHTML = `
				<div class="quest txt">${response.questions[i-1].quest}</div>
				<div class="form-group">
					<input name="ansver" type="text" placeholder="Ваш ответ"></input>
				</div>
				`,
				step.innerText = `Шаг ${i} из ${response.questions.length}`,
				app.append(button)
			}
		}
		
		function errorLabels(input) {
			if(input.classList.contains('error')){
				errorLabel.setAttribute('for', 'ansver')
				errorLabel.classList.add('label')
				errorLabel.innerHTML = `Не правильный ответ, попробуй еще`
				input.after(errorLabel)
			}else{
				errorLabel.remove()
			}
		}
		function validate() {
			const input = document.querySelector('input')
			
			input.value.toLowerCase() != response.questions[i - 1].answer.toLowerCase() 
				? (input.classList.add('error'), errorLabels(input)) 
				: (input.classList.remove('error'), i++, questAppend())
		}

		function finale() {
			app.innerHTML = `<div class="final">Ты Молодец!!!</div>`
			button.removeEventListener('click', validate)
		}

		questAppend()

		button.addEventListener('click', validate)

	})