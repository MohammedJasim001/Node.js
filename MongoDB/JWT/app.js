import express from 'express'
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const secretKey = 'jjjilll';
const users = [
    {
        name: 'jasim',
        password: 'password111',
        role: 'admin',
    },
    {
        name: 'salman',
        password: 'password112',
        role: 'user',
    },
];

// Login route to authenticate the user and generate a JWT token
app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const user = users.find((e) => e.name === name && e.password === password);

    if (!user) {
        return res.status(404).send('User not found');
    }

    // Generate a token with the user's information
    const token = jwt.sign({ name: user.name, role: user.role }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Middleware to verify the JWT token and authorize the user
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token.');
        }
        console.log(user)
        req.user = user;
        console.log(req.user)
        next();
    });
};

// Protected route example that only authenticated users can access
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).send(`Hello, ${req.user.name}! You have access to this protected route.`);
});

// Admin-only route example to demonstrate role-based authorization
app.get('/admin', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied. Admins only.');
    }
    res.status(200).send('Welcome, Admin! You have access to this admin-only route.');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



// import express, { json } from 'express'
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'


// const app = express()
// app.use(express.json())

// const secretKey = 'asdfggg'

// const users = [
//     {
//         name:"jasim",
//         password:await bcrypt.hash('1234',10),
//         role:'admin'
//     },
//     {
//         name:"salman",
//         password:await bcrypt.hash('1111',10),
//         role:"user"
//     }
// ]
// console.log(users)

// app.post('/register',async(req,res)=>{
//     const {name,password,role} = req.body
//     const existingUser = users.find(e=>e.name===name)
//     if(existingUser) return res.status(400).send('user already exist')

//         const salt = 10

//         const hashedPassword = await bcrypt.hash(password,salt)
        
//         const newUser = {name , password:hashedPassword,role:role||'user'}
//          users.push(newUser)
//          res.status(201).send(newUser)
         
// })

// app.post('/login',async(req,res)=>{
//     const {name,password} = req.body
//     const user = users.find((e)=>e.name === name )
//     if(!user) return res.status(404).send('user not found')

//         const isPasswordValid = await bcrypt.compare(password,user.password)

//         if(!isPasswordValid)  return res.status(404).send('incorrect password')

//         const token = jwt.sign({name:user.name,role:user.role},secretKey)
//          res.status(201).send(token) 
// })

// const authentication = (req,res,next)=>{
//     const header = req.headers['authorization']
    
//     const token = header && header.split(' ')[1]

//     if(!token) return res.status(404).send('no token provided')

//         jwt.verify(token,secretKey,(err,user)=>{
//             if(err) return res.status(403).send('something error to verify')
//                 req.user = user
//             console.log(req.user)
//                 next()
//         })
// }

// app.get('/protected',authentication , (req,res)=>{
//     res.status(200).send(`hi ${req.user.name}`)
// })

// app.get('/admin', authentication, (req, res) => {
//     if (req.user.role !== "admin") {
//         return res.status(403).send('Access denied. Admins only.');
//     }
//     res.status(200).send('Hi Admin, you now have access to this page');
// });

// app.listen(4000,()=>{
//     console.log('sever running on port 4000')
// })