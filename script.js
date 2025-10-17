document.getElementById("sb").addEventListener("click", () => {
  const pref = document.querySelector('input[name="pref"]:checked');
  const text = document.getElementById("ta").value.trim().toLowerCase();

  if (!pref || text === "") {
    alert("Please enter your meals and select a dietary preference.");
    return;
  }

  const ctx = document.getElementById("nutrientChart").getContext("2d");

  // Thresholds for nutrients to be considered sufficient
  const nutrientThresholds = {
    Carbs: 50,
    Protein: 40,
    Fats: 20,
    Fiber: 15,
    Iron: 10,
    Calcium: 15,
    VitaminD: 5,
    VitaminB12: 4,
    Omega3: 8,
    Magnesium: 10,
    Potassium: 10,
    Zinc: 8
  };

  // Specific meal suggestions for next day per preference to fill gaps
  const mealSuggestions = {
    ve: [
      "Include spinach and paneer dishes like palak paneer.",
      "Add chickpea or lentil salads for extra protein and fiber.",
      "Eat a serving of nuts like almonds or walnuts for healthy fats."
    ],
    v: [
      "Eat dal, paneer, and vegetable sabzi for balanced nutrients.",
      "Include a bowl of curd or fortified plant milk for calcium and Vitamin B12.",
      "Enjoy fish like sardines or mackerel for Omega-3 fatty acids."
    ],
    nv: [
      "Include grilled chicken or fish for high-quality protein and Omega-3.",
      "Add green leafy vegetables like spinach for iron and calcium.",
      "Consider eggs or dairy for Vitamin B12 and additional protein."
    ]
  };

  // Demo data: simulated inputs with full 12 nutrients
  const demoData = [
    {
      keywords: ["roti", "dal"],
      pref: "v",
      label: "5 Rotis and a Bowl of Dal",
      nutrients: ["Carbs", "Protein", "Fats", "Fiber", "Iron", "Calcium", "VitaminD", "VitaminB12", "Omega3", "Magnesium", "Potassium", "Zinc"],
      values: [70, 35, 12, 20, 9, 15, 5, 3, 2, 9, 10, 7],
      text: "Carbohydrates and fiber are good, but Vitamin B12 and Omega-3 are low."
    },
    {
      keywords: ["tofu", "salad"],
      pref: "ve",
      label: "Tofu Salad and Smoothie",
      nutrients: ["Carbs", "Protein", "Fats", "Fiber", "Iron", "Calcium", "VitaminD", "VitaminB12", "Omega3", "Magnesium", "Potassium", "Zinc"],
      values: [40, 50, 20, 25, 12, 20, 3, 2, 4, 11, 12, 9],
      text: "Rich in protein and fiber but needs improved Vitamin B12 and Vitamin D."
    },
    {
      keywords: ["chicken", "rice"],
      pref: "nv",
      label: "Chicken, Rice, and Egg",
      nutrients: ["Carbs", "Protein", "Fats", "Fiber", "Iron", "Calcium", "VitaminD", "VitaminB12", "Omega3", "Magnesium", "Potassium", "Zinc"],
      values: [45, 70, 30, 10, 14, 10, 10, 6, 8, 10, 9, 8],
      text: "High in protein and good fats but needs more fiber and micronutrients."
    }
  ];

  // Find matching demo data based on preference and keywords
  let selectedDemo = null;
  for (const item of demoData) {
    if (pref.value === item.pref && item.keywords.some(k => text.includes(k))) {
      selectedDemo = item;
      break;
    }
  }

  if (!selectedDemo) {
    selectedDemo = {
      label: "Sample Meal Analysis",
      nutrients: ["Carbs", "Protein", "Fats", "Fiber", "Iron", "Calcium", "VitaminD", "VitaminB12", "Omega3", "Magnesium", "Potassium", "Zinc"],
      values: [50, 40, 20, 15, 8, 10, 5, 2, 5, 10, 10, 7],
      text: "Sample analysis with estimated nutrient values."
    };
  }
  
  // Analyze nutrients for sufficiency
  const sufficiencies = selectedDemo.nutrients.map((nutrient, index) => {
    const val = selectedDemo.values[index];
    const threshold = nutrientThresholds[nutrient] || 0;
    return { nutrient, value: val, sufficient: val >= threshold };
  });

  // Build result text
  let result = `Your meal provides: `;
  const sufficientNutrients = sufficiencies.filter(n => n.sufficient).map(n => n.nutrient);
  const deficientNutrients = sufficiencies.filter(n => !n.sufficient).map(n => n.nutrient);

  if (sufficientNutrients.length > 0) {
    result += sufficientNutrients.join(", ") + ".\n";
  }
  if (deficientNutrients.length > 0) {
    result += "Yet, you are low on: " + deficientNutrients.join(", ") + ".\n";
  } else {
    result += "You have a well-balanced intake of key nutrients!\n";
  }

  // Suggestions for next day's meals
  result += "\nSuggestions to balance your nutrients tomorrow:\n";
  if (deficientNutrients.length > 0) {
    // Pick suggestions based on deficiencies
    result += "- To boost " + deficientNutrients.join(", ") + ", consider:\n";
    if (pref.value === "v") {
      result += "- Include spinach, chickpeas, and nuts like almonds.\n";
    } else if (pref.value === "nv") {
      result += "- Add fish like mackerel, green leafy vegetables, and eggs.\n";
    } else if (pref.value === "ve") {
      result += "- Incorporate fortified foods, lentils, and seeds.\n";
    }
  } else {
    result += "- Keep up the variety and ensure daily consumption of vegetables and proteins.\n";
  }

  // Include specific dish suggestions based on deficiencies
  result += "\nSample specific meals:\n";
  if (deficientNutrients.includes("VitaminB12") && pref.value === "nv") {
    result += "- Have dishes like fortified cereal, or plant-based milk products (soy/almond milk etc).\n";
  }
  if (deficientNutrients.includes("Omega3") && pref.value === "nv") {
    result += "- Enjoy fish such as sardines or add flaxseed to your meals.\n";
  }
  if (deficientNutrients.includes("Iron") && pref.value === "nv") {
    result += "- Include spinach, lentils, and red meat.\n";
  }
  
  // Show the analysis result
  document.getElementById("s3").style.display = "block";
  document.getElementById("resTitle").innerText = selectedDemo.label;
  document.getElementById("resText").innerText = result;
});


