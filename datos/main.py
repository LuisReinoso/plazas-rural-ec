from bs4 import BeautifulSoup
import requests

soup = BeautifulSoup(open("./output.html"), 'html.parser')
info_plazas = soup.find_all('div')

contador = 1
linea = 1
plaza = {}

for info in info_plazas:
  if (contador == 1):
    plaza['zona'] = info.text
  elif (contador == 2):
    plaza['distrito'] = info.text
  elif (contador == 3):
    plaza['provincia'] = info.text
  elif (contador == 4):
    plaza['canton'] = info.text
  elif (contador == 5):
    plaza['parroquia'] = info.text
  elif (contador == 6):
    plaza['unicodigo'] = info.text
  elif (contador == 7):
    plaza['establecimiento'] = info.text
  elif (contador == 8):
    plaza['tipologia'] = info.text
  elif (contador == 9):
    plaza['numeroPlazasDisponibles'] = int(info.text)
    plaza['numeroIntencionPlaza'] = 0
    requests.request("POST", "http://localhost:1337/plaza", json=plaza)

  contador = contador + 1
  if (contador == 10):
    contador = 1
  linea = linea + 1
