const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.delete('/:id', blogController.blog_delete);
router.get('/create', blogController.blog_create_get);
router.get('/:id', blogController.blog_detail);

router.use((req, res) => {
  res.status(404).render('404', { title: 'Oops!' });
});

module.exports = router;