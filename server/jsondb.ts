import fs from 'fs';

export class JSONDB<T> {
	public data: T;

	constructor(private path: string, private inital: T) {
		try {
			this.data = JSON.parse(fs.readFileSync(this.path, 'utf8'));
		} catch {
			this.reset().sync();
		}
	}

	public reset() {
		this.data = this.inital;
		return this;
	}

	public sync() {
		fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2), 'utf8');
		return this;
	}
}
