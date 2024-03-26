import { Router } from '@colstonjs/core';
import NoteRepository from '../repository';
import NoteController from '../controller';

const router = new Router({ prefix: '/v1' });
const router2 = new Router({ prefix: '/v2' });

const noteRepository = new NoteRepository();
const noteController = new NoteController(noteRepository);

// router.get('/notes', noteController.getAllNotes.bind(noteController));
// router.get('/note/:id', noteController.getNote.bind(noteController));
// router.post('/note', noteController.postNote.bind(noteController));
// router.delete('/', noteController.deleteNote.bind(noteController));

router.get('/notes', noteController.getAllNotes.bind(noteController))
  .get('/note/:id', noteController.getNote.bind(noteController))
  .post('/note', noteController.postNote.bind(noteController))
  .delete('/', noteController.deleteNote.bind(noteController));

router2.patch('/note', noteController.updateNote.bind(noteController));
// router2.get('/note', ctx => ctx.head())

export {
  router,
  router2
}
