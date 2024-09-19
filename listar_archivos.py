import os

# Ruta del proyecto
ruta_proyecto = "D:\\Dell\\wamp64\\www\\Perfil"

for root, dirs, files in os.walk(ruta_proyecto):
    for file in files:
        print(os.path.join(root, file))
