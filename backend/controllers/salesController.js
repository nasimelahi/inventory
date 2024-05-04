const Order = require('../models/Sale'); // Import Sale model from MongoDB

// Controller to generate daily sales report
const dailySalesReport = async (req, res) => {
  try {
    // Parse the date from the request query parameters (e.g., req.query.date)
    const date = new Date(req.query.date || Date.now()); // Assuming the date is passed as a query parameter

    // Calculate the start and end of the day
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    // Query the database for sales made on the specified day
    const sales = await Order.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    // Calculate total sales, sales made by card, and sales made by cash
    let Sofartoday = 0;
    let Card = 0;
    let Cash = 0;

    sales.forEach((sale) => {
      Sofartoday += sale.total;

      if (sale.paymentMethod === 'card') {
        Card += sale.total;
      } else if (sale.paymentMethod === 'cash') {
        Cash += sale.total;
      }
    });

    // Prepare and send the response
    Sofartoday = Number(Sofartoday.toFixed(2));
    Card = Number(Card.toFixed(2));
    Cash = Number(Cash.toFixed(2));

    const thisMonth = await calculateMonthlySales(date);
    res.json({
      Sofartoday,
      Card,
      Card,
      thisMonth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculateMonthlySales = async (date) => {
  try {
    // Calculate the start and end of the current month
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999); // Last day of the month

    // Query the database for sales made in the current month
    const monthlySales = await Order.find({
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth
      }
    });

    // Calculate total sales for the month
    let totalMonthlySales = 0;
    monthlySales.forEach((sale) => {
      totalMonthlySales += sale.total;
    });

    // Round total sales to two decimal places
    totalMonthlySales = Number(totalMonthlySales.toFixed(2));

    return totalMonthlySales;
  } catch (error) {
    throw error;
  }
};

module.exports = {dailySalesReport }
