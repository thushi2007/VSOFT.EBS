package ebs.api.resource;

import ebs.api.model.enumeration.Sprache;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("enum")
public class EnumResource {

    @PersistenceContext(unitName = "ebsDS")
    private EntityManager em;

    @GET
    @Path("sprache")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Sprache> getSpracheList() {

        List<Sprache> allObjs = new ArrayList<Sprache>();

        try {
            Query q = em.createNamedQuery("Sprache.getSpracheList");
            allObjs = (List<Sprache>) q.getResultList();
        } catch (Exception exc) {
            allObjs = new ArrayList<Sprache>();
        }

        return allObjs;
    }
}
