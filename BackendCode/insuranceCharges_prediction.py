#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np 
import pandas as pd 
import os
import warnings
warnings.filterwarnings('ignore')
data = pd.read_csv('lifeinsurance.csv')


# In[2]:


print(data.head())


# In[3]:


print(data.isnull().sum())


# In[4]:


from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score,mean_squared_error                                                              


# In[9]:


from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
le.fit(data.gender.drop_duplicates()) 
data.gender = le.transform(data.gender)
le.fit(data.smoker.drop_duplicates()) 
data.smoker = le.transform(data.smoker)


# In[14]:


print(data.head())


# In[11]:


x = data.drop(['charges'], axis = 1)
y = data.charges

x_train,x_test,y_train,y_test = train_test_split(x,y, random_state = 0)
lr = LinearRegression().fit(x_train,y_train)
print(lr)
y_train_pred = lr.predict(x_train)
y_test_pred = lr.predict(x_test)

print(lr.score(x_test,y_test))


# In[12]:




  
from sklearn.externals import joblib 
joblib.dump(lr, 'insuranceCharges.pkl') 


# In[13]:


model = joblib.load('insuranceCharges.pkl') 


# In[15]:


charges=model.predict([[19,0,27.91,0,1,72.0]])
print(charges)


# In[ ]:





# In[ ]:





# In[ ]:




