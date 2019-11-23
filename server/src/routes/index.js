const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/getOrders', async (req,res) => {
    await pool.query('SELECT * FROM orders ORDER BY ID desc', (err, orders) => {
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

router.get('/getLastOrder', async (req,res) => {
    await pool.query('SELECT * FROM orders ORDER BY ID desc LIMIT 1', (err, orders) => {
        if (!err)
        {
            console.log("lastOrder: ", orders)
            res.json({"code": 200, "data": orders});
        }
        else
        {
            console.log(err);
            res.json({"code": 500});
        }
    });
});

router.get('/getOrderTypes', async (req,res) => {
    await pool.query('SELECT * FROM order_type', (err, orders) => {
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

router.get('/getOrderStatus/:id', async (req,res) => {
    const { id } = req.params;
    await pool.query('SELECT status FROM orders WHERE id = ?',[id], (err, orders) => {
        if (!err)
        {
            if (orders[0] == undefined)
            {
                res.json({"code": 200, "data": null});
            }
            else
            {
                console.log(orders[0].status);
                res.json({"code": 200, "data": orders[0]});
            }
        }
        else
        {
            console.log(err);
            res.json({"code": 500});
        }
    });
});

router.get('/getFlavours', async (req,res) => {
    await pool.query('SELECT * FROM flavours', (err, flavours) => {
        if (!err)
        {
            res.json({"code": 200, "data": flavours});
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
router.post('/login', async (req,res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const user = {
        username,
        password 
    };
    await pool.query('SELECT username, userType FROM users WHERE username = ? AND password = ?', [user.username, user.password], (err, users) => {
        if (!err)
        {
            if (users[0] == undefined)
            {
                res.json({"code": 200, "data": null});
            }
            else
            {
                console.log(users[0].username);
                res.json({"code": 200, "data": users[0]});
            }
        }
        else
        {
            console.log(err);
            res.json({"code": 500});
        }
    });
});

router.post('/updateOrder', async (req,res) => {
    console.log(req.body);
    const {id, status } = req.body;
    const order = {
        status 
    };
    await pool.query('UPDATE orders SET ? WHERE id = ?', [order, id], (err, editedOrder) => {
        if (!err)
        {
            res.json({"code": 200, "data": editedOrder});
        }
        else
        {
            console.log(err);
            res.json({ "code": 500, "msg": err });
        }
    });
});

module.exports = router;