import words from './russian-word-list.js';

const MAX_RANDOM_NUMBER = 10;

const wrapNumber = number => `<span class="form__password-number">${number}</span>`;
const wrapDivider = divider => `<span class="form__password-divider">${divider}</span>`;

export function generate({
	wordsCount = 3,
	wordSeparator = '-',
	shouldIncludeNumber = true,
	shouldCapitalise = true
} = {}) {
	const getRandomNumber = () => Math.floor(Math.random() * MAX_RANDOM_NUMBER);
	const capitalizeFirstLetter = word => word.charAt(0).toUpperCase() + word.slice(1);

	const wordsLength = words.length;
	const selectedWords = Array.from({ length: wordsCount }, () => {
		const randomWord = words[Math.floor(Math.random() * wordsLength)];

		return shouldCapitalise
			? capitalizeFirstLetter(randomWord)
			: randomWord;
	});

	if (shouldIncludeNumber) {
		const randomIndex = Math.floor(Math.random() * selectedWords.length);

		selectedWords[randomIndex] += wrapNumber(getRandomNumber());
	}

	return selectedWords.join(wrapDivider(wordSeparator || '-'));
}
