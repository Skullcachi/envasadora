const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/getOrders', async (req,res) => {
    await pool.query('SELECT * FROM orders', (err, orders) => {
        if (!err)
        {
            res.json({"code": 200, "data": orders});
        }
        else
        {
            console.log(err);
            res.json({"code": 500});
        }
    });
});

router.post('/newOrder', async (req,res) => {
    console.log(req.body);
    const {size, flavour } = req.body;
    const order = {
        size,
        flavour 
    };
    await pool.query('INSERT INTO orders set ?', [order], (err, insertedOrder) => {
        if (!err)
        {
            res.json({"code": 200, "data": insertedOrder});
        }
        else
        {
            console.log(err);
            res.json({"code": 500});
        }
    });
});

module.exports = router;