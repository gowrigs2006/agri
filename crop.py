from flask import Blueprint, request, jsonify
import joblib
import numpy as np

model = joblib.load("models/crop_model.pkl")
crop_bp = Blueprint("crop", __name__)

@crop_bp.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    temperature = data.get("temperature")
    season = data.get("season")
    soil = data.get("soil")

    # Mappings
    season_map = {"Kharif": 0, "Rabi": 1, "Zaid": 2}
    soil_map = {"Alluvial": 0, "Black": 1, "Red": 2, "Laterite": 3, "Sandy": 4}

    season_code = season_map.get(season, -1)
    soil_code = soil_map.get(soil, -1)

    if temperature is None or season_code == -1 or soil_code == -1:
        return jsonify({"error": "Missing or invalid input"}), 400

    features = np.array([[temperature, soil_code, season_code]])
    predicted_crop = model.predict(features)

    return jsonify({"recommended_crop": predicted_crop[0]})
