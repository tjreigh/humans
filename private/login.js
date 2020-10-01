const toggleLoader = (disp) => {
	const loader = document.querySelector('#loader');
	console.log('loading');
	const display = disp ? 'block' : 'none';
	loader.style.display = display;
};

const loginEvent = (e) => {
	e.preventDefault();

	const pass = document.querySelector('input#pass').value;

	toggleLoader(true);

	fetch(`https://lhs-humans-auth.glitch.me/auth?pass=${pass}`)
		.then(res => res.text())
		.then(data => {
			toggleLoader(false);
			console.log(data);
			document.body.innerHTML = data;
		});
};

const form = document.querySelector('form#login');
form.addEventListener('submit', loginEvent.bind(this));
