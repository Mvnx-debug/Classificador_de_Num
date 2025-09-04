from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


#config CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "htpp://127.0.0.1:5173"], #port do react

    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
class Numero(BaseModel):
    valor: int


@app.post("/classificar")
def classificar_numero(num: Numero):
    if num.valor % 2 == 0:
        resultado = 'PAR'
    else:
        resultado = 'Ímpar'
    return {'numero': num.valor, 'classificado': resultado}