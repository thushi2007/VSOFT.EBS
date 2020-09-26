package ebs.api.resource;

import ebs.api.dto.ArtikelDto;
import ebs.api.model.Artikel;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import java.util.ArrayList;
import java.util.List;

@Path("artikel")
public class ArtikelResource {

    @PersistenceContext()
    private EntityManager em;

    @GET
    @Path("all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<ArtikelDto> all() {
        List<ArtikelDto> allObjs = new ArrayList<ArtikelDto>();

        try {
            Query q = em.createNamedQuery("Artikel.getAll", Artikel.class);
            List<Artikel> allArtikel = (List<Artikel>) q.getResultList();

            for (Artikel b : allArtikel) {
                ArtikelDto be = new ArtikelDto(b);
                allObjs.add(be);
            }
        } catch (Exception exc) {
            allObjs = new ArrayList<ArtikelDto>();
        }

        return allObjs;
    }

    @GET
    @Path("/{kat}/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<ArtikelDto>  getBooksByKat(@PathParam("kat") String mainKatName, @QueryParam("lstct") int countItems) {
        List<ArtikelDto> allObjs = new ArrayList<ArtikelDto>();

        try {
            Query q = em.createNamedQuery("Artikel.getBookByMainKatName");
            q.setParameter("mainKatName", mainKatName);
            q.setMaxResults(countItems);
            List<Artikel> allArtikel = (List<Artikel>) q.getResultList();

            for (Artikel b : allArtikel) {
                ArtikelDto be = new ArtikelDto(b);
                allObjs.add(be);
            }
        } catch (Exception exc) {
            allObjs = new ArrayList<ArtikelDto>();
        }

        return allObjs;
    }


    @GET
    @Path("/{mainkat}/{subkat}/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<ArtikelDto> getBooksByMainAndSubKat(@PathParam("mainkat") String mainKatName, @PathParam("subkat") String subKatName,
                                                @QueryParam("lstct") int countItems) {
        List<ArtikelDto> allObjs = new ArrayList<ArtikelDto>();

        try {
            Query q = em.createNamedQuery("Artikel.getBookByMainSubKatName");
            q.setParameter("mainKatName", mainKatName);
            q.setParameter("subKatName", subKatName);
            q.setMaxResults(countItems);
            List<Artikel> allArtikel = (List<Artikel>) q.getResultList();

            for (Artikel b : allArtikel) {
                ArtikelDto be = new ArtikelDto(b);
                allObjs.add(be);
            }
        } catch (Exception exc) {
            allObjs = new ArrayList<ArtikelDto>();
        }

        return allObjs;
    }
}
