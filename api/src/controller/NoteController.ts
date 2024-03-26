import { Context } from '@colstonjs/core';
import NoteRepository from "../repository";

/**
 * NoteController class
 * @class NoteController
 * @methods getNotes
 * @methods postNotes
 */
class NoteController {
  noteRepository: NoteRepository;
  constructor(noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }

  /**
   * retrieve all available notes 
   * @param {*} ctx 
   * @returns bun Response instance
   */
  async getNote(ctx: Context) {
    const id = ctx.req.params.id;
    const note = await this.noteRepository.getNote(id);

    if (!note) {
      return ctx.status(404).json({
        success: false,
        data: null
      })
    }

    return ctx.status(200).json({
      success: true,
      data: note
    });
  }

  /**
   * retrieve all available notes
   * @returns bun Response instance
   */
  async getAllNotes(ctx: Context) {
    const notes = await this.noteRepository.getAllNotes();

    return ctx.status(200).json({
      success: true,
      data: notes
    });
  }

  /**
   * post a single note data
   * @param {*} ctx
   * @returns bun Response instance
   */
  async postNote(ctx: Context) {
    const notes = await this.noteRepository.postNote(ctx.req.body);

    return ctx.status(201).json({
      success: true,
      data: notes
    });
  }

  /**
   * update a single note data
   * @param {*} ctx
   * @returns bun Response instance
   */
  async updateNote(ctx: Context) {
    const note = await this.noteRepository.updateNote(ctx.req.body);
    if (!note) {
      return ctx.status(404).json({
        success: true,
        error: {
          message: 'resource with the id ' + ctx.req.body.id + ' is not found.'
        }
      })
    }
    return ctx.status(200).json({
      success: true,
      data: note
    })
  }

  /**
   * delte a sinlge note data
   * @param {*} ctx
   * @returns bun Response instance
   */
  async deleteNote(ctx: Context) {
    await this.noteRepository.deleteNote(ctx.req.query.id);
    return ctx.status(204).end();
  }
}

export default NoteController
