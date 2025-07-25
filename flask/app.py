from flask import Flask, request, jsonify
from flask_cors import CORS  
from werkzeug.utils import secure_filename
import os

# Initialize Flask 
app = Flask(__name__)
CORS(app)  # Allow requests from localhost:3000

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Your /predict endpoint (example)
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
    
    # Your prediction logic here
    label = "example_prediction"  # Replace with your actual prediction
    confidence = 0.95  # Replace with your actual confidence score
    
    os.remove(file_path)  # Clean up
    return jsonify({
        'prediction': label,
        'confidence': round(confidence * 100, 2)
    })

# Run the app
if __name__ == '__main__':
    app.run(debug=True, port=5000)