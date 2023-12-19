#Definición de la imagen a utilizar
FROM node

#Definición del directorio de trabajo
WORKDIR /app

#Copiar el package.json
COPY package*.json ./

#Instalación de las dependencias en el contenedor
RUN npm install

#Copiar el resto de archivos 
COPY . .

#Enrutamiento de puertos de mi contenedor
EXPOSE 8080

#Comando a ejecutar al iniciar el contenedor
CMD [ "npm", "start" ]
