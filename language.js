// language.js

const translations = {
    en: {
        tagline: "Your AI-powered farming assistant",
        startAdvisory: "Start Advisory",
        sellCrop: "Sell Crop",
        aboutUs: "About Us",
        backHome: "← Back to Home",
        cropTitle: "🌱 Crop Recommendation",
        cropDesc: "Based on your location, we’ll suggest the best crops.",
        seasonLabel: "Select Season:",
        soilLabel: "Select Soil Type:",
        getRecommendations: "Get Recommendations",
        dashboardTitle: "🌾 Crop Dashboard",
        dashboardInfo: "Select the information you'd like to view:",
        weatherInfo: "⛅ Weather Info",
        pestDetection: "🪲 Pest Detection",
        sellTitle: "🌾 Sell Crops to Priya",
        priyaRates: "📈 Priya Rates (per kg)",
        submit: "Submit"
    },
    hi: {
        tagline: "आपका एआई-संचालित खेती सहायक",
        startAdvisory: "सलाह शुरू करें",
        sellCrop: "फसल बेचें",
        aboutUs: "हमारे बारे में",
        backHome: "← होम पर लौटें",
        cropTitle: "🌱 फसल सिफारिश",
        cropDesc: "आपके स्थान के आधार पर सर्वोत्तम फसलें सुझाई जाएंगी।",
        seasonLabel: "मौसम चुनें:",
        soilLabel: "मिट्टी का प्रकार चुनें:",
        getRecommendations: "सिफारिश प्राप्त करें",
        dashboardTitle: "🌾 फसल डैशबोर्ड",
        dashboardInfo: "आप किस जानकारी को देखना चाहते हैं?",
        weatherInfo: "⛅ मौसम जानकारी",
        pestDetection: "🪲 कीट पहचान",
        sellTitle: "🌾 प्रिय को फसल बेचें",
        priyaRates: "📈 प्रिय के रेट (प्रति किलोग्राम)",
        submit: "जमा करें"
    },
    bn: {
        tagline: "আপনার এআই চালিত কৃষি সহকারী",
        startAdvisory: "পরামর্শ শুরু করুন",
        sellCrop: "ফসল বিক্রি করুন",
        aboutUs: "আমাদের সম্পর্কে",
        backHome: "← হোমে ফিরে যান",
        cropTitle: "🌱 ফসল সুপারিশ",
        cropDesc: "আপনার অবস্থানের উপর ভিত্তি করে সেরা ফসলের পরামর্শ দেওয়া হবে।",
        seasonLabel: "ঋতু নির্বাচন করুন:",
        soilLabel: "মাটির ধরন নির্বাচন করুন:",
        getRecommendations: "সুপারিশ পান",
        dashboardTitle: "🌾 ফসল ড্যাশবোর্ড",
        dashboardInfo: "আপনি কোন তথ্য দেখতে চান?",
        weatherInfo: "⛅ আবহাওয়া তথ্য",
        pestDetection: "🪲 কীট সনাক্তকরণ",
        sellTitle: "🌾 প্রিয়াকে ফসল বিক্রি করুন",
        priyaRates: "📈 প্রিয়ার রেট (প্রতি কেজি)",
        submit: "জমা দিন"
    }
};

// Apply translation to all elements with data-i18n
function applyLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// Set language from dropdown or button and store it
function setLanguage(lang) {
    localStorage.setItem("preferredLang", lang);
    applyLanguage(lang);

    // Optional: Hide dropdown menu if exists
    const menu = document.getElementById("langOptions");
    if (menu) {
        menu.style.display = "none";
    }
}

// Initialize language on page load
function initLanguage() {
    const savedLang = localStorage.getItem("preferredLang") || "en";
    applyLanguage(savedLang);
}

// Run on all pages when DOM is loaded
document.addEventListener("DOMContentLoaded", initLanguage);