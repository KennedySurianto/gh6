import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

# Load model & class indices
MODEL_PATH = 'aksara_lontara_model.h5'
CLASS_INDEX_PATH = 'class_indices.npy'

model = load_model(MODEL_PATH)
class_indices = np.load(CLASS_INDEX_PATH, allow_pickle=True).item()
class_names = {v: k for k, v in class_indices.items()}  # reverse mapping

IMG_SIZE = (128, 128)

# Flask app
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def predict_image(img_path):
    img = image.load_img(img_path, target_size=IMG_SIZE, color_mode='grayscale')
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)
    confidence = float(np.max(predictions))
    return class_names[predicted_class], confidence


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    label, confidence = predict_image(file_path)

    return jsonify({
        'predicted_class': label,
        'confidence': confidence
    })


@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Lontara Aksara Prediction API is running"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
