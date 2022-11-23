using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ApiJuguetes.Models;

namespace ApiJuguetes.Controllers
{
    public class JuguetesController : ApiController
    {
        private DatabaseEntities db = new DatabaseEntities();

        // GET: api/Juguetes
        public IQueryable<Juguetes> GetJuguetes()
        {
            return db.Juguetes;
        }

        // GET: api/Juguetes/5
        [ResponseType(typeof(Juguetes))]
        public IHttpActionResult GetJuguetes(int id)
        {
            Juguetes juguetes = db.Juguetes.Find(id);
            if (juguetes == null)
            {
                return NotFound();
            }

            return Ok(juguetes);
        }

        // PUT: api/Juguetes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutJuguetes(int id, Juguetes juguetes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != juguetes.Id)
            {
                return BadRequest();
            }

            db.Entry(juguetes).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JuguetesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Juguetes
        [ResponseType(typeof(Juguetes))]
        public IHttpActionResult PostJuguetes(Juguetes juguetes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Juguetes.Add(juguetes);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = juguetes.Id }, juguetes);
        }

        // DELETE: api/Juguetes/5
        [ResponseType(typeof(Juguetes))]
        public IHttpActionResult DeleteJuguetes(int id)
        {
            Juguetes juguetes = db.Juguetes.Find(id);
            if (juguetes == null)
            {
                return NotFound();
            }

            db.Juguetes.Remove(juguetes);
            db.SaveChanges();

            return Ok(juguetes);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool JuguetesExists(int id)
        {
            return db.Juguetes.Count(e => e.Id == id) > 0;
        }
    }
}