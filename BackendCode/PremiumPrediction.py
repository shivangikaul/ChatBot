import joblib
class  PremiumPrediction:



    def premiumAmount(self,values):


        age=values["age"]
        bmi=values["bmi"]
        smoker=values["smoker"]
        children=values["children"]
        bp=values["bp"]
        gender=values["gender"]
        model1 = joblib.load('insuranceCharges.pkl') 
        charges=model1.predict([[int(age),int(gender),float(bmi),int(children),int(smoker),float(bp)]])
        amount=round(charges[0])
        return {"charges":"the Predicted Insurance Premium Amount which you have to pay is-Rs."+str(amount)}


