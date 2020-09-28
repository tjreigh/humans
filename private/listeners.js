const opts = document.querySelector('ul#options');

const formEvent = (elem) => {
	console.log('formEvent');
	const container = document.querySelector(`div#${elem}`);
	const children = Array.from(container.children);
	container.style.display = 'block';
	console.log(opts);
	opts.style.display = 'none';
	children.forEach(child => child.style.display = 'block');
};

const buttons = Array.from(document.getElementsByTagName('button'));
buttons.forEach(b => b.addEventListener('click', formEvent.bind(this, b.id)));
