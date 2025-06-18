# Sistema de Agendamiento y Mobiliario USM (ING Y AQR) - ENGINE SERVER.exe



>es un script, compilado en C# cuya funcion principal es iniciar de forma fácil el servidor de node.Js donde se ejecutará el sistema de Agenamiento y Mobiliario de la USM en la Facultad de Ingeniería y arquitectura.  

## Elaborado por los ingenieros 
Chelsea Vega - Ing en sistema - chelseavegasanchez@gmail.com

Daniel Llinas - Ing en sistema - chelseavegasanchez@gmail.com
### Funciones:  

    1. Enciende el servidor, desplega automaticamente el navegador
    2. Apaga el servidor y cierra la consola que se despliega.

### Como usar:
>**1-** _Abres el programa "Sistema de Agendamiento USM (ING Y AQR) - ENGINE SERVER.exe"._   
>>Colócalo dentro de una carpeta dentro de windows ya que se generará un archivo config.txt; este archivo guarda la última ruta donde se ejecutó el archivo "server.js".
    
>**2-** _Sí la ruta no esta marcada_ 
>>abres el explorador y marcas el archivo "server.js". debe estar dentro del proyecto en la carpeta **server**.

>**2-** _Iniciar el servidor_ 
>>Debe abrir el navegador y luego una terminal de powershell con el servidor. **No debes tener dos programas abiertos para usar encender el servidor marcara la segunda terminal error**

>**3-** _Apagar el servidor_ 
>>Se cierra la terminal y la aplicación web deja de funcionar inmediatamente.

     

**en caso de volver a compilar en la consola de c# usar este comando: dotnet publish -c Release -r win-x64 --self-contained true /p:PublishSingleFile=true**