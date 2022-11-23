Se requiere crear la tabla en la bd que se prefiera ejecutando el archivo CrearTabla.sql

Cambiar la cadena de conexión en el archivo /ApiJuguetes/Web.config 
en la etiqueta connectionString de <connectionStrings> para apuntar a la bd y tabla creada;

ejemplo de cadena de conexion
--"Server=(localdb)\mssqllocaldb;Database=Jugueteria;Trusted_Connection=True;"

cambiar la key "ApiUrl" en /AppJugueteria/Web.config si la api se inicia en un puerto diferente; 

