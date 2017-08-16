const express = require('express');
const router = express.Router();

// GET /
router.get('/:resource', (req, res, next) => {

    let resource = req.params.resource;

    res.json({
        confirmation: 'success',
        resource: resource
    });

});



module.exports = router;