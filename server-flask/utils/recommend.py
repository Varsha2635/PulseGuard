def generate_recommendations(risk_level):
    if risk_level == "Low":
        return ["Maintain a balanced diet", "Exercise regularly", "Keep up with routine checkups"]
    elif risk_level == "Moderate":
        return ["Reduce salt intake", "Increase physical activity", "Consult a cardiologist"]
    else:
        return ["Seek immediate medical advice", "Monitor vitals frequently", "Follow a heart-healthy diet"]
