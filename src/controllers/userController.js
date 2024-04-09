const User = require("../model/userSchema");

const bcrypt = require("bcryptjs");

//Register user
const register = async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword, gender } = req.body;

  try {

    if (!firstName || !lastName || !email || !password || !confirmPassword || !gender) {
      const error = new Error("Not all fields are provided");
      console.log(error);
      return res.status(422).json({
        message: "Not all fields are provided"
      })
    }

    // check email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(422).json({
        message: "User already exists",
      })
    }

    if (password !== confirmPassword) {
      return res.status(422).json({
        message: "Passwords do not match",
      })
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "User created successfully!",
      User: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        gender: savedUser.gender,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, message: "Internal server error" });
  }
};


// Login user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(422).json({
      message: "Email and password are required",
    })
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const isPasswordMatch = await (password === user.password);


    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      })
    }

    // If email and password are correct, return user details
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, message: "Internal server error" });
  }
};







// //updateOne user
// const updateone = async (req, res) => {
//   const { username, email, phone, gender } = req.body;

//   try {
//     const updateuser = await user.updateOne(
//       { username: username },
//       { email: email }
//     );

//     console.log(updateuser);
//     res.status(200).json({ message: "User Updated" });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err.message });
//   }
// };

// //updateMany user
// const updatemany = async (req, res) => {
//   const { username, email, phone, gender } = req.body;

//   try {
//     const updatemanyuser = await user.updateOne(
//       { username: username },
//       { email: email, phone: phone, gender: gender }
//     );

//     console.log(updatemanyuser);
//     res.status(200).json({ message: "User data are Updated" });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err.message });
//   }
// };

// //deleteOne user
// const deleteone = async (req, res) => {
//   const { username, email, phone, gender } = req.body;

//   try {
//     const delOne = await user.deleteOne({ username: username });
//     console.log(delOne);
//     res.status(200).json({ message: "data deleted " });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err.message });
//   }
// };

// //deleteMany for particular field using updatemany and $unset
// const deletemany = async (req, res) => {
//   const { username, email, phone, gender } = req.body;

//   try {
//     const delMany = await user.updateMany(
//       { username: username }, // use deleteMany for multiple data with same username
//       { $unset: { gender: gender, phone: phone } }
//     );

//     console.log(delMany);
//     res.status(200).json({ message: "deleted similar data" });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err.message });
//   }
// };

// //insertOne user
// const insertuser = async (req, res) => {
//   const { username, email, phone, gender } = req.body;

//   try {
//     const insertone = await user.create({
//       username: username,
//       email: email,
//       phone: phone,
//       gender: gender,
//     });
//     res.status(200).json(insertone);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err.message });
//   }
// };

// //find user 
// const finduser = async (req, res) => {

//   try {
//     const userfind = await user.find({});

//     if (!userfind) {
//       return res.status(400).json({ message: "There is no user in database with this name" })
//     }
//     return res.status(200).json(userfind);
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// }

// const getoneuser = async (req, res) => {

//   const username = req.query.username

//   try {
//     const oneUser = await user.findOne({ username: username });
//     console.log(oneUser);

//     // if(!oneUser){
//     //     return res.status(400).json({message: "There is no user in database with this name"})         
//     // }           
//     return res.status(200).json(oneUser);
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// }

// //find by Id
// const findbyID = async (req, res) => {
//   const { _id } = req.body

//   try {
//     const byId = await user.findById({ _id: _id })
//     console.log(byId);
//     res.status(200).json(byId);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err.message });
//   };
// };

// //find and update
// const modify = async (req, res) => {
//   const { username, email, phone, gender } = req.body;
//   try {
//     const modified = await user.findOneAndUpdate(
//       { username: username },
//       { email: email, phone: phone, gender: gender },
//       { new: true }
//     );

//     console.log(modified);
//     res.status(200).json(modified);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err.message });
//   }
// };

// // $match 
// const mat = async (req, res) => {
//   const { username, email, phone, gender } = req.body;
//   try {
//     const foundEmail = await user.findOne({ email: email })
//     console.log("found Email:", foundEmail);

//     if (!foundEmail) {
//       res.status(400).json({ message: "did not find the email with given email" })
//     } else {
//       const matchData = await user.findOne({}, { match: { email: email } });
//       res.status(200).json(matchData)
//     }
//     // res.status(200).json({message: "data matched"});

//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// }

module.exports = {
  register,
  login,
  // updateone,
  // updatemany,
  // deleteone,
  // deletemany,
  // insertuser,
  // finduser,
  // getoneuser,
  // findbyID,
  // modify,
  // mat
};
