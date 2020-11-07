package de.ebs.api.resource;

import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;

@Path("kat")
public class KategorieResource {

    @PersistenceContext()
    private EntityManager em;

    @GET
    @Path("all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Object> all()
    {
        Query q = em.createNamedQuery("Kategorie.getAll");
        List<Object> allObjs = (List<Object>) q.getResultList();
        return allObjs;
    }


    @GET
    @Path("testing")
    @Produces(MediaType.APPLICATION_JSON)
    public String testing()
    {
        return "testings";
    }
}
