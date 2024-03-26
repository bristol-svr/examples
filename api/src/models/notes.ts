import crypto, { UUID } from 'crypto';

interface Note {
  id: string;
  title: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export class Model<T extends Note>{
  private db: Array<T> = [];
  constructor(data: Array<T>) {
    this.db = data;
  }

  async find(id: string): Promise<T | undefined> {
    return this.db.find((v: T) => v.id == id);
  }

  async findAll(): Promise<Array<T>> {
    return this.db;
  }

  async save(note: T): Promise<T> {
    const _note = {
      ...note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const id = crypto.randomBytes(32).toString('base64').replace(/[_+=\/]/gi, '');
    if (!_note.id) _note.id = id;

    this.db.push(_note);
    return _note;
  }

  async update(note: T): Promise<T | undefined> {
    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i].id == note.id) {
        this.db[i].note = note.note;
        this.db[i].title = note.title;
        this.db[i].updatedAt = new Date().toISOString();
      } else { continue; }

      return this.db[i];
    }
  }

  async remove(id: string): Promise<boolean> {
    const idx = this.db.findIndex((v: Note) => v.id == id);
    return !!this.db.splice(idx, 1).length;
  }
}