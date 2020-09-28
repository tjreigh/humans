import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { Item, ItemStore } from '../types/item';
import { JSONDB } from './jsondb';

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({
	extended: false,
}));
app.use(bodyParser.json());
app.use(cors());

const db = new JSONDB<ItemStore>(path.join(__dirname, '../items.json'), { items: [] });

function findItem(id: number): Item | undefined {
	return db.data.items.find(item => item.id === id);
}

app.post('/add', (req, res) => {
	/* Add id to existing data
	const i = data.items.length - 1;
	data.items.map((item) => {
		item.desc = item.desc;
		item.img = item.img;
		item.id = i;
		i -= 1;
	}) */

	const obj = {
		id: (db.data.items[0].id + 1),
		img: req.body.img,
		desc: req.body.desc,
	};

	db.data.items.unshift(obj);

	console.log(obj);
	db.sync();
	res.sendStatus(200);
});

app.post('/edit', (req, res) => {
	const item = findItem(req.body.id);
	if (!item) return res.sendStatus(404);

	if (req.body.img != null) item.img = req.body.img;
	if (req.body.desc != null) item.desc = req.body.desc;

	db.sync();
});

app.get('/data', (req, res) => {
	res.json(db.data);
	console.log('Sent data');
});

app.get('/element', (req, res) => {
	const item = findItem(req.body.id);
	if (!item) return res.sendStatus(404);
	res.json(item);
	console.log(`Sent id: ${req.body.id} \n ${JSON.stringify(item)}`);
});

app.delete('/delete', (req, res) => {
	const item = db.data.items.find(item => item.id === req.body.id);
	if (!item) return res.sendStatus(404);

	db.data.items = db.data.items.filter(item => item.id !== req.body.id);

	db.sync();
	res.sendStatus(200);
});

app.purge('/entries', (req, res) => {
	db.reset().sync();
	res.sendStatus(200);
	console.log('Purged items');
});

const listener = app.listen(port, () => {
	console.log(`Your app is listening on port ${(listener.address() as any).port}`);
});
