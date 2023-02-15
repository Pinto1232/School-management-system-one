const mongoose = require('mongoose');

const foodServiceSchema = new mongoose.Schema({
  menuID: { type: String, required: true },
  menuName: { type: String, required: true },
  menuType: { type: String, required: true },
  menuDate: { type: Date, required: true },
  ingredientsList: { type: String, required: true },
  orderID: { type: String, required: true },
  orderDate: { type: Date, required: true },
  studentID: { type: String, required: true },
  studentName: { type: String, required: true },
  studentClass: { type: String, required: true },
  studentSection: { type: String, required: true },
  foodInventoryReport: { type: String, required: true },
  foodAllergyReport: { type: String, required: true },
  foodTrendAnalysis: { type: String, required: true },
  foodFeedbackReport: { type: String, required: true },
  foodImprovementPlan: { type: String, required: true },
  foodBillingReport: { type: String, required: true },
});

const FoodService = mongoose.model('FoodService', foodServiceSchema);

const createFoodInstance = async (foodData) => {
  const foodService = new FoodService(foodData);

  try {
    const result = await foodService.save();
    console.log(`New food service instance created with ID: ${result.menuID}`);
    return result;
  } catch (error) {
    console.error(`Error creating new food service instance: ${error.message}`);
    throw error;
  }
};

module.exports = createFoodInstance;
