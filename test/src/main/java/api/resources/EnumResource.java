package api.resources;


import api.resources.entity.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;


@Path("enum")
public class EnumResource {

    @PersistenceContext()
    private EntityManager em;

    @GET
    @Path("sprache")
    @Produces(MediaType.APPLICATION_JSON)
//    @ApiOperation(value = "Gives all available languages back", response = Sprache.class)
    public List<Salutation> getSpracheList() {
        Query q = em.createNamedQuery("Salutation.getAllSalutation");
        List<Salutation> jobs = (List<Salutation>) q.getResultList();

        for (Salutation salut : jobs) {
            String name = salut.getName();
        }

        return jobs;
    }
}
