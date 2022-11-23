using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ApiJuguetes.Models
{
    [MetadataType(typeof(MetaData))]
    public partial class Juguetes
    {
        sealed class MetaData
        {
            [Required]
            public string Nombre;

            [Required]
            public string Compania;
            
            [Required]
            public decimal Precio;
        }


    }
}