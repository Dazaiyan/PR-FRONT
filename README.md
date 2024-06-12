# Practiicereport-frontend
![image](https://github.com/Dazaiyan/PR-FRONT/assets/115562720/694b2882-f8f7-47b2-9339-8d2a7c50bf4b)

Este proyecto es una aplicación web desarrollada con React en el frontend y Express con Postgres en el backend. La aplicación incluye funcionalidades de registro e inicio de sesión para los usuarios.

## Tabla de Contenidos
- [Requisitos Previos](#requisitos-previos)
- [Instalacion](#instalacion)
- [Instalar Dependencias](#instalar-dependencias)
- [Configuracion](#configuracion)
- [Ejecutar](#ejecutar)
- [Uso](#uso)

## Requisitos Previos
Antes de comenzar, asegúrate de tener los siguientes requisitos previos instalados en tu máquina:

- Node.js (v14 o superior)
- npm (v6 o superior) o yarn (opcional)

## Instalacion

### **Clonar el Repositorio**
- Primero, clona el repositorio del proyecto:

git clone https://github.com/Dazaiyan/PR-FRONT.git

### **Navega a la carpeta del frontend**
- cd practiie-report

## Instalar Dependencias
- npm install
- npm install primereact --save
- npm install react-router-dom --save
- npm install @mui/material --save

## Configuracion
- En el archivo src/services/api.ts asegúrate de que la URL base del API esté configurada correctamente:
![image](https://github.com/Dazaiyan/PR-FRONT/assets/115562720/c766e73a-cb8b-46da-bfba-fd9a03ed8568)

## Ejecutar 
- npm start

## Uso
### **Registro de Usuarios**
- Accede a la ruta /register para registrarte como un nuevo usuario.
- Completa el formulario de registro y envíalo.

### **Inicio de Sesión**
- Accede a la ruta /login para iniciar sesión.
- Completa el formulario de inicio de sesión y envíalo.
- Si las credenciales son correctas, serás redirigido a la página de inicio (/home).
