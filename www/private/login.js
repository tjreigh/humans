const formEvent = (e) => {
	e.preventDefault();

	const pass = document.querySelector('input#pass').value;

	fetch(`https://lhs-humans-auth.glitch.me/auth?pass=${pass}`)
		.then(res => res.text())
		.then(data => {
			console.log(data);
			document.body.innerHTML = data;
		});
};

const form = document.querySelector('form#login');
form.addEventListener('submit', formEvent.bind(this));
