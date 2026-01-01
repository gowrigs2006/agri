from flask import Blueprint, request, jsonify
import requests

weather_bp = Blueprint("weather", __name__)
API_KEY = "22c804f118714feeb3f110305250807"  # Replace with your real key

@weather_bp.route("/weather", methods=["GET"])
def get_weather():
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if not lat or not lon:
        return jsonify({"error": "Latitude and longitude required"}), 400

    query = f"{lat},{lon}"
    url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={query}"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch weather"}), 500

    data = response.json()
    temperature = data["current"]["temp_c"]
    rain = data["current"].get("precip_mm", 0)

    return jsonify({
        "temp": temperature,
        "rain": rain
    })

