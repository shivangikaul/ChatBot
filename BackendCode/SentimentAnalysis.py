from nltk.sentiment.vader import SentimentIntensityAnalyzer

class SentimentAnalysis:

    def sentiment(self,values):
      
    
        q1=values["a"]   
        q2=values["b"]  
        q3=values["c"]
        q4=values["d"]
    
        sid = SentimentIntensityAnalyzer()

        a1=sid.polarity_scores(q1)
        print("q1",a1)
        b1=sid.polarity_scores(q2)
        print("q2",b1)
        c1=sid.polarity_scores(q3)            
        print("q3",c1)
        d1=sid.polarity_scores(q4)            
        print("q4!",d1)

        positive=a1["pos"]+b1["pos"]+c1["pos"]+d1["pos"]
        negative=a1["neg"]+b1["neg"]+c1["neg"]+d1["neg"]
        neutral=a1["neu"]+b1["neu"]+c1["neu"]+d1["neu"]

        print("pos-",positive)
        print("neutral",neutral)
        print("neg",negative)

        if (positive>negative) and (positive>neutral):
                print("positive review")
                return {"chat":"Thanks,Bye!!","review":"Thanks for your positive feedback!"}
        elif (negative>positive) and (negative>neutral):
                print("negative review")
                return {"chat":"Thanks,Bye!!","review":"Thanks for valuable feedback.We will consider your views for future reference!"}
        else:
            print("neutral review")
            return {"chat":"Thanks,Bye!!","review":"Thanks for your valuable feedback!"}
    

