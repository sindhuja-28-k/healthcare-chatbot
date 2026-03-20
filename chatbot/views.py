from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def home(request):
    return render(request, "home.html")


@csrf_exempt
def chat(request):
    if request.method == "POST":
        data = json.loads(request.body)
        message = data.get("message").lower()

        if "fever" in message:
            reply = "Fever is an increase in body temperature. Drink plenty of fluids and take rest. If it continues for more than two days, consult a doctor."

        elif "cold" in message:
            reply = "Common cold symptoms include runny nose, sneezing, and sore throat. Rest and warm fluids may help."

        elif "headache" in message:
            reply = "Headaches may occur due to stress, dehydration, or lack of sleep. Drinking water and resting may help."

        elif "cough" in message:
            reply = "Cough may be caused by infection or allergies. Warm water, honey, and rest may provide relief."

        elif "stomach pain" in message:
            reply = "Stomach pain can occur due to indigestion or infection. Eat light food and drink plenty of water."

        elif "covid" in message:
            reply = "COVID-19 symptoms include fever, cough, tiredness, and difficulty breathing. Please consult a doctor if symptoms appear."

        elif "thank" in message:
            reply = "You're welcome. Stay healthy!"
        
        elif "chest pain" in message:
            reply = "Chest pain can be serious. Please consult a cardiologist immediately."
        else:
            reply = "I can help with common health symptoms like fever, cold, cough, headache, or stomach pain."

        return JsonResponse({"reply": reply})