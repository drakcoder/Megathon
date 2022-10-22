from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import pickle

def predict(vals):
    with open('../ML/pickle_model.pkl', 'rb') as file:
        pickle_model = pickle.load(file)
    scaler=MinMaxScaler()
    vals=np.array(vals)
    vals=scaler.fit_transform(vals.reshape(1,-1))
    print(vals)
    y=pickle_model.predict(vals)
    return y