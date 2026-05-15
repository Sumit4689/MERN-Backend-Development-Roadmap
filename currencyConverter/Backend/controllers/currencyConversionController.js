require("dotenv").config();

const Converter = async (req, res) => {
  try {
    let { from, to, amount } = req.body;

    if (!from || !to || !amount) {
      return res.status(400).json({
        message: "from, to and amount are required",
      });
    }

    from = from.toLowerCase();
    to = to.toLowerCase();

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount < 0) {
      return res.status(400).json({
        message: "Ammount must be a valid number greater than 0",
      });
    }

    const response = await fetch(
      `${process.env.API_KEY}/currencies/${from}.json`,
    );

    if (!response.ok) {
      return res.status(400).json({
        message: "Invalid Source currency",
      });
    }

    const data = await response.json();

    const rate = data?.[from]?.[to];

    if (!rate) {
      return res.status(400).json({
        message: "Currency not found",
      });
    }

    const result = numericAmount * rate;

    return res.status(200).json({
      "result": result
    });
  } catch (error) {
    console.error("Currency conversion error:", error);

    return res.status(500).json({
      message: "Something went wrong while converting currency",
    });
  }
};

module.exports = { Converter };
