from flask import Flask, request, jsonify
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

# Inisialisasi Flask
app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load model dan class indices
model = load_model('aksara_lontara_model.h5')
class_indices = np.load('class_indices.npy', allow_pickle=True).item()
class_names = {v: k for k, v in class_indices.items()}  # index → label

# Ukuran gambar
img_size = (128, 128)

# Fungsi prediksi
def predict_image(image_path):
    img = image.load_img(image_path, target_size=img_size, color_mode='grayscale')
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)
    confidence = float(np.max(predictions))
    return class_names[predicted_class], confidence

# Endpoint prediksi
@app.route('/predict', methods=['POST'])
def upload_and_predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    try:
        label, conf = predict_image(file_path)
        os.remove(file_path)  # hapus file setelah prediksi
        return jsonify({
            'prediction': label,
            'confidence': round(conf * 100, 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Root endpoint
@app.route('/')
def home():
    return 'Aksara Lontara AI Prediction API is running!'

if __name__ == '__main__':
    app.run(debug=True)
