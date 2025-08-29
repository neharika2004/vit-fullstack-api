const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

function alternateCaps(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return result;
}

const FULL_NAME = "neharikagond";  
const DOB = "11122004";        
const EMAIL = "nehags1198@gmail.com";
const ROLL_NUMBER = "22BLC1051";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alphaConcat = "";

    data.forEach(item => {
      if (!isNaN(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item.toString());
        else odd_numbers.push(item.toString());
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphaConcat += item;
      } else {
        special_characters.push(item);
      }
    });

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternateCaps(alphaConcat.split("").reverse().join(""))
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
