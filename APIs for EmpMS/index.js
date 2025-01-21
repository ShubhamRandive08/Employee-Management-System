const express = require('express') // For get access the express 
const pool = require('./db') // Assuming the connestion wtih the db modules
const app = express() // Create the object of the express()
const path = require('path') // To access the path of the file location
const bodyparser = require('body-parser') // For the send the all param into the format of the body
const port = 3000; // Run the APIs on the that port no.
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator') // Validate the parameter to send by the users which is null or not null or so on
const bcrypt = require('bcrypt')
const multer = require('multer')
const { error } = require('console')
const cors = require('cors')
const { hash } = require('crypto')

app.use(bodyparser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE,GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type");
    next();
})


// app.use(cors({
//     origin: ["http://localhost:5173/"],
//     methods: ['PUT', 'GET', 'DELETE', 'POST'],
//     credentials: true
// }))


app.get('/', async (req, res) => {
    res.send('APIs for Employee Management System.');
})

// Display database admin table data
app.get('/data', [], async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        } else {
            const rs = await pool.query('select * from admin')
            res.json({ status: 200, message: 'success', data: rs.rows })
            // if (rs.length > 0) {
            //     const token = jwt.sign(
            //         { role: "admin" },
            //         "jwt_secret_key",
            //         { expiresIn: '1day' }
            //     );
            //     res.cookie('token', token)
            //     res.json({ status: 200, message: 'success', data: rs.rows })
            // }
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// For the login as a admin
app.post('/login', [
    body('email').isEmail().withMessage('Email is required'),
    body('pass').notEmpty().withMessage('Password is required.')
], async (req, res) => {
    try {
        const error = validationResult(req)

        const { email, pass } = req.body

        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        } else {
            const r = await pool.query('select * from admin where email = $1 and password = $2', [email, pass])

            if (r.rows.length > 0) {
                res.json({ status: '200', message: 'Login Success' })
            } else {
                res.json({ status: '400', message: 'Invalid Credintials' })
            }
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// For the add new category
app.post('/add_category', [
    body('category').notEmpty().withMessage('Category is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);

        const { category } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await pool.query('INSERT INTO category(name) VALUES ($1)', [category]);

        res.json({ status: '200', message: 'Insert Success' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// For get the all category
app.get('/category', async (req, res) => {
    try {
        const rs = await pool.query('select * from category')
        res.json({ status: '200', message: 'Success', data: rs.rows })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// Upload Image

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// For register the new employee
app.post('/addEmployee', upload.single('image'), [
    body('name').notEmpty().withMessage('Name is Required.'),
    body('email').isEmail().withMessage('Name is Required.'),
    body('password').notEmpty().withMessage('Name is Required.'),
    body('salary').notEmpty().withMessage('Name is Required.'),
    body('address').notEmpty().withMessage('Name is Required.'),
    // body('image').notEmpty().withMessage('Name is Required.'),
    body('category_id').notEmpty().withMessage('Name is Required.')
], async (req, res) => {
    try {
        const errors = validationResult(req)

        const { name, email, password, salary, address, category_id } = req.body

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                const r = pool.query('select * from employee where email = $1', [email])
                if (r && r.rows) {
                    console.log(r.rows.length)
                }

                if (r.length > 0) {
                    res.json({ message: 'User Already Registered' })
                } else {
                    pool.query('insert into employee(name,email,password,salary,address,category_id) values ($1,$2,$3,$4,$5,$6)', [name, email, hash, salary, address, category_id])
                    res.json({ status: '200', message: 'User Added Successfully' })
                }
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// For get the all employee record
app.get('/employee', async (req, res) => {
    try {
        const rs = await pool.query('select * from employee')
        res.json({ status: '200', message: 'Success', data: rs.rows })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// For employee record by id
app.post('/emp_by_id', [
    body('id').notEmpty().withMessage('ID is required.')
], async (req, res) => {
    try {
        const errors = validationResult(req)

        const { id } = req.body

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const rs = await pool.query('select * from employee where id = $1', [id])
            res.json({ status: '200', message: 'Success', data: rs.rows })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// for the update the employee record

app.put('/upt_emp', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('salary').notEmpty().withMessage('Salary is required'),
    body('id').notEmpty().withMessage('ID is required'),


], async (req, res) => {
    try {
        const errors = validationResult(req)

        const { name, email, address, salary, id } = req.body

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const rs = await pool.query('update employee set name = $1, email = $2, address = $3, salary = $4  where id = $5', [name, email, address, salary, id])
            res.json({ status: '200', message: 'Update Success' })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// For the delete the employee based on id

app.delete('/del_emp_by_id', [
    body('id').notEmpty().withMessage('ID is requird')
], async (req, res) => {
    try {
        const errors = validationResult(req)

        const { id } = req.body

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const rs = await pool.query('delete from employee where id = $1', [id])
            res.json({ status: '200', message: 'Delete Success' })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// Category by id
app.post('/category_by_id', [
    body('id').notEmpty().withMessage('ID is required')
], async (req, res) => {
    try {
        const errors = validationResult(req)

        const { id } = req.body

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const val = await pool.query('select id from category where id = $1', [id])
            if (val.rows.length > 0) {
                const rs = await pool.query('select * from category where id = $1', [id])
                res.json({ status: '200', message: 'Success', data: rs.rows })
            } else {
                res.json({ status: '400', message: 'ID is not availible' })
            }
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// Update category table
app.put('/upt_cat', [
    body('id').notEmpty().withMessage('ID is required'),
    body('name').notEmpty().withMessage('name is required'),
], async (req, res) => {
    try {
        const errors = validationResult(req)

        const { name, id } = req.body

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            await pool.query('update category set name = $1 where id = $2', [name, id])
            res.json({ status: '200', message: 'Edit Success' })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// Delete category by id
app.delete('/del_cat', [
    body('id').notEmpty().withMessage('ID is required')
], async (req, res) => {
    try {
        const errors = validationResult(req)

        const { id } = req.body

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            await pool.query('delete from category where id = $1', [id])
            res.json({ status: '200', message: 'Delete Success' })
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// Admin Data
app.get('/admin_data', [], async (req, res) => {
    const rs = await pool.query('select * from admin')
    res.json({ staus: '200', message: 'Success', data: rs.rows })
})

// For admin count
app.get('/admincout', async (req, res) => {
    const rs = await pool.query('select * from admin')
    res.json({ status: '200', message: 'Success', data: rs.rows })
    // console.log(rs.rows.length)
})

app.get('/employeecout', async (req, res) => {
    const rs = await pool.query('select * from employee')
    res.json({ status: '200', message: 'Success', data: rs.rows })
})

app.get('/salaruCount', async (req, res) => {
    const rs = await pool.query('select sum(salary) from employee')
    res.json({ status: '200', message: 'Success', data: rs.rows })
})





// API for the dataset table for revison

app.get('/dataset', [], async (req, res) => {
    const rs = await pool.query('select * from dataset')
    res.json({ status: '200', message: 'Success', data: rs.rows })
})

app.put('/addData', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Name is required'),
    body('phone').notEmpty().withMessage('Name is required'),
    body('add').notEmpty().withMessage('Name is required'),

], async (req, res) => {
    try {
        const errors = validationResult(req)

        const {name,email,phone,add} = req.body

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const EmailValidation = await pool.query('select * from dataset where email = $1',[email])

            if(EmailValidation.rows.length > 0){
                res.json({message : 'Email already exits...'})
            }else{
                await pool.query('insert into dataset(name,email,phone,add) values($1,$2,$3,$4)',[name,email,phone,add])
                res.json({status : '200', message : 'Insert Success..'})
            }
        }


    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

app.post('/adminData',[
    body('email').notEmpty().withMessage("Email is required")
], async(req,res)=>{
    try {
        const errors = validationResult(req)

        const {email} = req.body

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const rs = await pool.query('select * from admin where email = $1',[email])
            res.json({status : '200', message : 'Success', data : rs.rows})
        }


    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


app.listen(port, () => {
    console.log(`Server Starts on Port No. http://localhost:${port}`)
})