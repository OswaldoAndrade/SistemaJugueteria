using ApiJuguetes.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace AppJugueteria.Controllers
{
    public class JuguetesController : Controller
    {
        public HttpClient _client = new HttpClient();
        public string url = ConfigurationManager.AppSettings["ApiUrl"];

        public class Respuesta
        {
            public bool Error { get; set; }
            public string Data { get; set; }
        }

        // GET: Juguetes
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Contact()
        {
            return View();
        }

        //Obtener lista de juguetes
        public async Task<ActionResult> Get()
        {

            Uri uri = new Uri(string.Format(url, string.Empty));
            ActionResult res = null;

            try
            {
                HttpResponseMessage response = await _client.GetAsync(uri);
                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    res = Json(new Respuesta { Error = false, Data = content }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                res = Json(new Respuesta { Error = true, Data = ex.Message });
            }

            return res;
        }


        //Agregar o actualizar un juguete 
        public async Task<ActionResult> Post(int Id, string Nombre, string Descripcion, int RestriccionEdad, string Compania, decimal Precio)
        {
            Uri uri = new Uri(string.Format(url, string.Empty));
            ActionResult res = null;

            Juguetes obj = new Juguetes
            {
                Id = Id,
                Nombre = Nombre,
                Descripcion = Descripcion,
                RestriccionEdad = RestriccionEdad,
                Compania = Compania,
                Precio = Precio
            };

            try
            {
                string json = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpResponseMessage response = null;
                if (Id == 0)
                    response = await _client.PostAsync(uri, content);
                else
                    response = await _client.PutAsync(uri + Id.ToString(), content);

                if (response.IsSuccessStatusCode)
                {
                    res = Json(new Respuesta{ Error = false, Data = json });
                }

            }
            catch (Exception ex)
            {
                res = Json(new Respuesta{ Error = true, Data = ex.Message});
            }
            return res;
        }

        //Eliminar un juguete
        public async Task<ActionResult> Delete(int Id)
        {
            url +=  Id;
            Uri uri = new Uri(url);
            ActionResult res = null;

            try
            {
                HttpResponseMessage response = await _client.DeleteAsync(uri);
                if (response.IsSuccessStatusCode)
                    res = Json(new Respuesta { Error = false, Data = Id.ToString() });
            }
            catch (Exception ex)
            {
                res = Json(new Respuesta { Error = true, Data = ex.Message });
            }
            return res;
        }


    }

}