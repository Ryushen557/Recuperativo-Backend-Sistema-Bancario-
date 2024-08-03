const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('', { title: 'Sistema Bancario Social' });
});

module.exports = router;
