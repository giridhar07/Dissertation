from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load pre-trained models and scalers
sc_ald = pickle.load(open('sc.pkl', 'rb'))
model_ald = pickle.load(open('model.pkl', 'rb'))

sc_nafld = pickle.load(open('sc_nafld.pkl', 'rb'))
model_nafld = pickle.load(open('model_nafld.pkl', 'rb'))

@app.route('/')
def home():
    return "Backend is running!"

def calculate_risk_score(age, gender, total_bilirubin, direct_bilirubin, alk_phos, alt, ast, total_proteins, albumin, alb_glob_ratio):
    
    """Calculates a risk score based on weighted factors."""

    weights = {
        "age": 1.2,
        "gender": 1.0,  # gender is encoded as 0 (Female) or 1 (Male)
        "total_bilirubin": 1.5,
        "direct_bilirubin": 1.3,
        "alk_phos": 1.4,
        "alt": 1.5,
        "ast": 1.5,
        "total_proteins": -0.5,
        "albumin": -1.0,
        "alb_glob_ratio": -1.2,
    }
    score = (
        age * weights["age"] +
        gender * weights["gender"] +
        total_bilirubin * weights["total_bilirubin"] +
        direct_bilirubin * weights["direct_bilirubin"] +
        alk_phos * weights["alk_phos"] +
        alt * weights["alt"] +
        ast * weights["ast"] +
        total_proteins * weights["total_proteins"] +
        albumin * weights["albumin"] +
        alb_glob_ratio * weights["alb_glob_ratio"]
    )
    return round(score, 2)

def calculate_risk_category(probability):
    
    if probability < 20:
        return "Low Risk"
    elif 21 <= probability < 40:
        return "Mild Risk"
    elif 41 <= probability < 70:
        return "Moderate Risk"
    else:
        return "High Risk"

# ALD Prediction Endpoint
@app.route('/predict/ald', methods=['POST'])
def predict_ald():
    try:
        data = request.json  # Parse JSON data from the request
        
        # Extract and prepare inputs for ALD model
        inputs = [
            float(data['age']),
            float(data['gender']),
            float(data['total_bilirubin']),
            float(data['direct_bilirubin']),
            float(data['alkaline_phosphotase']),
            float(data['alamine_aminotransferase']),
            float(data['aspartate_aminotransferase']),
            float(data['total_proteins']),
            float(data['albumin']),
            float(data['albumin_and_globulin_ratio']),
        ]

        inputs_array = np.array([inputs])  # Reshape for model input
        inputs_scaled = sc_ald.transform(inputs_array)  # Scale the inputs

        probabilities = model_ald.predict_proba(inputs_scaled)[0]  # Use predict_proba for probabilities
        # print("Predicted probabilities:", probabilities)  # Debug probabilities

        probability_of_disease = probabilities[1] * 100  # Probability for class 1
        disease_prediction = 1 if probabilities[1] >= 0.5 else 0  # Binary prediction (Threshold 0.5)

         # Adjust probability and risk category for prediction = 0
        if disease_prediction == 0:
            probability_of_disease = round(min(probabilities[1] * 10, 9.99), 2)  # Cap at 9.99%
            risk_category = "Low Risk"
        else:
            # Determine risk category normally for prediction = 1
            risk_category = calculate_risk_category(probability_of_disease)

        # Return predictions
        return jsonify({
            "prediction": disease_prediction,
            "probability_of_disease": round(probability_of_disease, 2),
            "risk_category": risk_category,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500




# NAFLD Prediction Endpoint

@app.route('/predict/nafld', methods=['POST'])
def predict_nafld():
    try:
        data = request.json  # Parse JSON data from the request

        # Validate required keys
        required_keys = ['age', 'gender', 'weight', 'height', 'bmi', 'futime']
        for key in required_keys:
            if key not in data:
                return jsonify({"error": f"Missing required key: {key}"}), 400

        # Extract and prepare inputs for the NAFLD model
        age = float(data['age'])
        gender = float(data['gender'])
        weight = float(data['weight'])
        height = float(data['height'])
        bmi = float(data['bmi'])
        futime = float(data['futime'])

        # Convert FUtime from days to years
        futime_years = int(futime // 365.25)

        inputs = np.array([[age, gender, weight, height, bmi, futime]])  # Reshape for model input
        inputs_scaled = sc_nafld.transform(inputs)  # Scale the inputs

        # Model prediction and probabilities
        probabilities = model_nafld.predict_proba(inputs_scaled)[0]  # Use predict_proba for probabilities
        # print("Predicted probabilities:", probabilities)  # Debug probabilities

        probability_of_disease = probabilities[1] * 100  # Probability for class 1
        disease_prediction = 1 if probabilities[1] >= 0.5 else 0  # Binary prediction (Threshold 0.5)

        # Adjust probability and risk category for prediction = 0
        if disease_prediction == 0:
            probability_of_disease = round(min(probabilities[1] * 10, 9.99), 2)  # Cap at 9.99%
            risk_category = "Low Risk"
        else:
            # Determine risk category normally for prediction = 1
            if probability_of_disease < 20:
                risk_category = "Low Risk"
            elif 21 <= probability_of_disease < 40:
                risk_category = "Mild Risk"
            elif 41 <= probability_of_disease < 70:
                risk_category = "Moderate Risk"
            else:
                risk_category = "High Risk"

        # Return predictions
        return jsonify({
            "prediction": disease_prediction,  # 1: Likely to have NAFLD, 0: Unlikely
            "probability_of_disease": round(probability_of_disease, 2),
            "risk_category": risk_category,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)