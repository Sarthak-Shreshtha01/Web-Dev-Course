const Category = require("../models/Category")

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// Create tag a handler function
exports.createCategory = async (req, res) => {
  try {
    const {name , description} = req.body;
    // Validation
    if(!name){
        return res.status(400).json({
            success:false,
            message: "Please provide all the required fields"
        })
    }

    // Create entry in DB
    const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});

		console.log(CategorysDetails);

		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});

  } 
  
  catch (error) {
    res.status(400).json({ 
        success: false,
        message: "Something went wrong in creating Category" });
  }
};

// Get all Catgories
exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find();

		res.status(200).json({
			success: true,
			data: allCategorys,
		});

	} 
  catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.categoryPageDetails = async (req ,res) =>{
  try{
    const {categoryId} = req.body;

    // Get course for the specified category
    const selectedCategory = await Category.findById(categoryId)
    .populate({
      path: "courses",
      match: { status: "Published"},
      populate: "ratingAndReviews",
    }).exec();

    console.log( "Selected Course" , selectedCategory);

    // Handle the case when the category is not found
    if(!selectedCategory){
      console.log("Category not found");
      return res.status(404).json({
        success: false,
        message: "Category not found"
      })
    }

    // Handle the case when there are no courses
    if(selectedCategory.courses.length === 0){
      console.log("No courses found in this category");
      return res.status(200).json({
        success: true,
        message: "No courses found in this category",
        data: selectedCategory
      })
    }

    // const selectedCourses = selectedCategory.courses;

    // Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		})

		let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
      ._id
    ).populate({
      path: "courses",
      match: {status :  "Published"},
    }).exec();

		// Get top-selling courses across all categories
		const allCategories = await Category.find().populate({
      path: "courses",
      match: { status: "Published" },
    }).exec();
    
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});

  }

  catch(error){
    res.status(400).json({
      success: false,
      message: error.message
    })  
  }
}