
import tornado.web
import tornado.ioloop
from tornado.web import RequestHandler

import json
import ChatbotModel
import os
class ResponseHandler(tornado.web.RequestHandler):
      
      
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*") 
        self.set_header('Access-Control-Allow-Methods', ' GET,POST,OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "Origin,X-Auth-token,Authorization,Content-Type")

    def options(self):
        self.set_status(204)
        self.finish()
    
    def post(self):
        data=self.request.body
        data1= data.decode('utf-8')
        inp=json.loads(data1)
        inp=inp["text"]
      

   
           
        obj=ChatbotModel.ChatbotModel()
        res=obj.chat(inp)
        self.write(res)
    
    
application=tornado.web.Application([(r"/chatbot/talk",ResponseHandler)
                                 
])

if __name__== "__main__":

    application.listen(4000)
    tornado.ioloop.IOLoop.current().start()
