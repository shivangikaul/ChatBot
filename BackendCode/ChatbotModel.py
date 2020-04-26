import json
import numpy
import tflearn
import tensorflow
import random
import nltk
import SentimentAnalysis
import PremiumPrediction
from nltk.stem.lancaster import LancasterStemmer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
sid = SentimentIntensityAnalyzer()
from sklearn.externals import joblib
from nltk.tokenize import word_tokenize 
from nltk.corpus import stopwords 


class ChatbotModel:

    tensorflow.reset_default_graph()
    net = tflearn.input_data(shape=[None, 61])
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, 17, activation="softmax")
    net = tflearn.regression(net)

    model= tflearn.DNN(net)
    model.load("insurance_model.tflearn")
    data={}
    with open("insurance.json") as f:
        data = json.loads(f.read())
    
    
    words = []
    labels = []
    docs_x = []
    docs_y = []

    for intent in data['intents']:
        for pattern in intent['patterns']:
            wrds = nltk.word_tokenize(pattern)
            words.extend(wrds)
            docs_x.append(wrds)
            docs_y.append(intent["tag"])
            
        if intent['tag'] not in labels:
            labels.append(intent['tag'])

   
 
    words = [LancasterStemmer().stem(w.lower()) for w in words if w != "?"]
    words = sorted(list(set(words)))

    labels = sorted(labels)

    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(docs_x):
        bag = []

        wrds = [LancasterStemmer().stem(w.lower()) for w in doc]

        for w in words:
            if w in wrds:
                bag.append(1)
            else:
                bag.append(0)

        output_row = out_empty[:]
        output_row[labels.index(docs_y[x])] = 1

        training.append(bag)
        output.append(output_row)

    training = numpy.array(training)
    output = numpy.array(output)


    def bag_of_words(self,s, words):
        bag = [0 for _ in range(len(words))]

        s_words = nltk.word_tokenize(s)
        s_words = [LancasterStemmer().stem(word.lower()) for word in s_words]

        for se in s_words:
            for i, w in enumerate(words):
                if w == se:
                    bag[i] = 1
                
        return numpy.array(bag)




    def chat(self,inp):
        
      
        inp1=inp["chat"]
        inp1 = inp1.rstrip()

        inp1=inp1.lower()
        if inp1 == "quit":
            values=inp["values1"]

            obj=SentimentAnalysis.SentimentAnalysis()
            output=obj.sentiment(values)
            return output

     
        elif inp1 == "top 3 health insurance policies" or inp1 == "what are the best 3 health insurance policies" or inp1 == "top  three health insurance policies":
            
            return {"message":"1.Religare Care -This health insurance plan comes out with no upper age limit bar. Now this means that it can be applied to a 100 years old person or individual.Religare care offers free health check-up once every year, regardless of claims filed, to individuals of age 18 years and over.This health plan provides no claim bonus (NCB) super add-on cover which makes no claim benefit equivalent to 60% of the Sum Insured.The policy comprises a number of specific treatments that can be done anywhere in the world for Sum Insured of INR 50, 00,000/- and above.            2.Max BUPA health insurance - Max Bupa Health Companion plan comes with 3 variants: individual, family floater and family first.This health insurance plan offers comprehensive coverage up to Rs. 1 Crore Sum Insured.The policy covers all day care treatments.It also covers domiciliary treatment and organ transplant expenses.             3.Star family health optima -Under a single plan, this policy offers wider coverage for the whole family and that too at a reasonable premium.Comes with a 100% automatic restoration of total Sum Insured.The policy covers new-born baby from 16th day of birth.You can avail extra Sum Insured (auto recharge) without any additional cost, up to 30% of Sum Insured."}
         
        elif inp1 == "top 3 life insurance policies" or inp1 == "what are the best 3 life insurance policies" or inp1 == "top three life insurance policies":
           
            return {"message":"1.SBI Life eShield-Plan type:Term,Entry Age:18 years to 65 years,Policy Term :5 years to 30 years,Sum assurred:Minimum - Rs.20 lakh Maximum - No limit            2.HDFC Life Click 2 Protect Plus-Plan type:Term,Entry Age:18 years to 65 years,Policy Term :10 years to 40 years,Sum assurred:Minimum - Rs.25 lakh Maximum - No limit            3.Aviva i-Life-Plan type:Term,Entry Age:18 years to 55 years,Policy Term :10 years to 35 years,Sum assurred:Minimum - Rs.25 lakh Maximum - No limit"}
         
        elif inp1 == "i want to enroll in life insurance" or inp1 == "i want to enroll in health insurance":
           
            return {"message":"That's great! Do you want to know the insurance premium amount which you have to pay?","formDisplay":"yes"}
        
        elif inp1 =="yes":  
            

            values=inp["values1"]
            obj=PremiumPrediction.PremiumPrediction()
            output=obj.premiumAmount(values)
            return output
           
        else:
            results = self.model.predict([self.bag_of_words(inp1, self.words)])
            results_index = numpy.argmax(results)
            tag = self.labels[results_index]
            li=[] ;
            for tg in self.data["intents"]:
                if tg['tag'] == tag:
                    input_words=word_tokenize(inp1)
                    stop_words = set(stopwords.words('english')) 
                    filtered_sentence = [w for w in input_words if not w in stop_words] 

                    
                    for i in tg['patterns']:
                        wordsPattern=word_tokenize(i)

                        for j in wordsPattern:
                            j=j.lower()
                            li.append(j);
                    li1=[w for w in li if not w in stop_words]     
                    
                    count=0
                    for k in filtered_sentence:
                        if k in li1:

                            count=count+1
                    if count>0:
                        responses = tg['responses']  
                        return { "message":random.choice(responses),"formDisplay": "no"}
                        

                    else:
                        
                        return { "message":"Bot - Hey,Sorry i didn't understand.Can you please rephrase your question?","formDisplay": "no"}

         








