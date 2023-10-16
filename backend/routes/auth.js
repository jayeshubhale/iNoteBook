// Import required modules and dependencies
const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Jayeshisagoodb$oy';


// ROUTE 1:
// Define an endpoint to create a new user: POST "/api/auth/createuser". No authentication required
router.post('/createuser', [
    // Validate user input using express-validator middleware
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() }); // Return validation errors if present
    }

    try {
        // Check if a user with the same email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry, a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user using the User model
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        success=true;
        res.json({ success, authtoken });
        console.log("Signup--->Success -: ",success, "authtoken -: ",authtoken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error"); // Handle server error
    }
});


// ROUTE 2:
// Authenticate a user : POST "/api/auth/login". No login required 
router.post('/login', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    // Check for validation errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors if present
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            
            return res.status(400).json({ success,error: "Please try to login with correct creaditionals" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
           
            return res.status(400).json({ success,error: "Please try to login with correct creaditionals" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error"); // Handle server error
    }


})


// ROUTE 3:
// Get loggedin User details using : POST "/api/auth/getuser". No login required 
router.post('/getuser',fetchuser, async (req, res) => {
    
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error"); // Handle server error
    }

})


module.exports = router; // Export the router for use in other parts of the application
