import { Database } from "../helpers/Database";
import * as moment from 'moment'

export class Task {

	static TABLE_NAME = 'task'
	static KEYS: ObjectKeyDefinition<Task>[] = [
		{ name: 'id', type: Number, primary: true },
		{ name: 'title', type: String },
		{ name: 'description', type: String },
		{ name: 'done', type: Boolean },
		{ name: 'create_date', type: Date },
	]

	id: number
	title: string
	description: string
	done: boolean
	create_date: Date

	/**
	 * Convert an object to a Task instance
	 * @param data Task params
	 */
	static parse(data?: ObjectKeys<Task>): Task;
	static parse(data?: ObjectKeys<Task>[]): Task[];
	static parse(data?: (ObjectKeys<Task> | ObjectKeys<Task>[])): (Task | Task[]) {
		data = data || {}
		if (Array.isArray(data)) {
			return data.map(i => Task.parse(i))
		}

		const task = new Task()
		Task.KEYS.forEach(key => {
			if (typeof data[key.name] == 'undefined') return;
			if (key.type == Date && data[key.name]) {
				try {
					task[key.name] = moment(data[key.name] as any).toDate()
				} catch (e) { console.warn('Not possible to convert date type') }
			} else if (data[key.name] === null) {
				task[key.name] = null
			} else {
				task[key.name] = key.type(data[key.name]) as any
			}
		})

		return task
	}

	/**
	 * Prepare Task table in the database
	 */
	static async prepare(): Promise<any> {
		const db = await Database.getInstance()

		const keys = Task.KEYS.map(k => {
			const name = k.name
			const primary = k.primary ? 'PRIMARY KEY AUTOINCREMENT' : ''
			let type = 'TEXT'
			switch (k.type) {
				case Number:
					type = 'INTEGER'; break;
				case String:
					type = 'VARCHAR(255)'; break;
				case Date:
					type = 'TEXT'; break;
				case Boolean:
					type = 'INTEGER'; break;
			}
			return [name, type, primary].join(' ')
		})

		const sql = `
			CREATE TABLE IF NOT EXISTS ${Task.TABLE_NAME} (
				${keys.join(',\n')}
			)
		`.trim()

		return db.query(sql)
	}

	/**
	 * Find all stored tasks
	 */
	static async findAll(): Promise<Task[]> {
		const db = await Database.getInstance()
		const rows = await db.queryAndGetRows(`SELECT * FROM ${Task.TABLE_NAME}`)
		return Task.parse(rows)
	}

	/**
	 * Find a task
	 * @param id Task id
	 */
	static async findById(id: number): Promise<Task> {
		const db = await Database.getInstance()
		const primaryKey = Task.KEYS.find(k => k.primary).name
		const rows = await db.queryAndGetRows(`SELECT * FROM ${Task.TABLE_NAME} WHERE ${primaryKey} = ?`, [id])
		if (!rows.length) return null
		return Task.parse(rows[0])
	}

	/**
	 * Save (insert or update) a task in the database
	 */
	async save(): Promise<Task> {
		const db = await Database.getInstance()
		const primaryKey = Task.KEYS.find(k => k.primary).name
		const update = !!(this[primaryKey] && (await Task.findById(this[primaryKey] as any)))
		const keys = Task.KEYS.filter(k => !k.primary).map(k => k.name)
		const values = keys.map(k => this[k])

		const updateWhere = {}
		updateWhere[primaryKey] = this[primaryKey]

		const insertId = !update ?
			await db.insert(Task.TABLE_NAME, keys, values) :
			await db.update(Task.TABLE_NAME, keys, values, updateWhere)

		if (typeof insertId == 'number') this[primaryKey] = insertId
		return this
	}

	/**
	 * Delete a task in the database
	 */
	async delete(): Promise<Task> {
		const db = await Database.getInstance()
		const primaryKey = Task.KEYS.find(k => k.primary).name
		const value = this[primaryKey]
		const where = {}
		where[primaryKey] = value
		await db.delete(Task.TABLE_NAME, where)
		this[primaryKey] = null
		return this
	}
}

type Creator<T> = (v) => T
type ObjectKeys<T> = {[K in keyof T]?: T[K]}
type ObjectKeyDefinition<T> = {
	name: keyof T
	type: Creator<Number | String | Boolean | Date>
	primary?: boolean
}
