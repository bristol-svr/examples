import { Model } from "../models";
import data, { Note } from '../store'

/**
 * NoteRepository class
 * @class NotRepositorye
 * @methods getNotes
 * @methods postNote
 */
class NoteRepository extends Model<Note> {
  // noteModel: Model<Note>;
  constructor() {
    super(data);
    // this.noteModel = noteModel;
  }

  /**
   * retrieve all available notes
   * @param {string} id
   * @returns bun Response instance
   */
  async getNote(id: string): Promise<Note | undefined> {
    return this.find(id);
  }

  async getAllNotes(): Promise<Array<Note>> {
    return this.findAll();
  }

  /**
   * post a single note data
   * @param {Note} note
   * @returns bun Response instance
   */
  async postNote(note: Note): Promise<Note> {
    return this.save(note);
  }

  /**
   * update a single note
   * @param {Note}  note
   * @returns {Note} updated note
   */
  async updateNote(note: Note): Promise<Note | undefined> {
    return this.update(note);
  }

  /**
   * delete a single note data
   * @param {string} id
   * @returns {Promise<boolean>} true | false
   */
  async deleteNote(id: string): Promise<boolean> {
    return this.remove(id);
  }
}

export default NoteRepository;
