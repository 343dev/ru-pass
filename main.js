import { generate } from './generate';
import { transliterate } from './transliterate';

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.form');
	const passwordOutput = document.querySelector('.form__password');
	const copyButton = document.querySelector('.form__copy');
	const generateButton = document.querySelector('.form__generate');
	const dividerControl = document.querySelector('.form__divider-control');
	const wordCountControl = document.querySelector('.form__word-count-control');
	const wordCountIndicator = document.querySelector('.form__word-count-indicator');

	const updatePasswordField = () => {
		const formData = new FormData(form);

		passwordOutput.innerHTML = generate({
			wordsCount: formData.get('word-count'),
			wordSeparator: formData.get('divider'),
			shouldIncludeNumber: Boolean(formData.get('include-number')),
			shouldCapitalise: Boolean(formData.get('capitalise')),
		});
	}

	const updateClipboard = () => {
		navigator.clipboard.writeText(transliterate(passwordOutput.textContent))
			.catch(console.error);
	}

	form.addEventListener('change', event => {
		if (event.target === wordCountControl || event.target === dividerControl) {
			return;
		}

		updatePasswordField();
	});

	form.addEventListener('input', event => {
		if (event.target === wordCountControl) {
			wordCountIndicator.textContent = wordCountControl.value;
		}

		updatePasswordField();
	});

	copyButton.addEventListener('click', () => updateClipboard());
	generateButton.addEventListener('click', () => updatePasswordField());
	dividerControl.addEventListener('click', event => event.target.select())

	updatePasswordField();
	wordCountIndicator.textContent = wordCountControl.value;
});
