from flask import Blueprint, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename
import numpy as np
import os
import json

pest_bp = Blueprint("pest", __name__)
model = load_model("models/pest_model.h5")

with open("models/class_indices.json") as f:
    class_map = json.load(f)
inv_map = {v: k for k, v in class_map.items()}

@pest_bp.route("/detect", methods=["POST"])
def detect_pest():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    img_file = request.files["image"]
    filename = secure_filename(img_file.filename)
    if filename == "":
        return jsonify({"error": "Invalid filename"}), 400

    filepath = os.path.join("static", filename)
    img_file.save(filepath)

    try:
        img = image.load_img(filepath, target_size=(128, 128))
        img_arr = image.img_to_array(img) / 255.0
        img_arr = np.expand_dims(img_arr, axis=0)

        preds = model.predict(img_arr)
        label_index = int(np.argmax(preds))
        label = inv_map[label_index]
    except Exception as e:
        return jsonify({"error": "Failed to process image", "details": str(e)}), 500

    solutions = {
        "Aphid": "Use neem oil or mild insecticidal soap.",
        "LeafBlight": "Apply appropriate fungicide and remove affected leaves.",
        "PowderyMildew": "Use sulfur-based fungicide or baking soda spray.",
        "Healthy": "No issues detected. Continue good practices!"
    }

    return jsonify({
        "pestName": label,
        "solution": solutions.get(label, "No solution available")
    })
