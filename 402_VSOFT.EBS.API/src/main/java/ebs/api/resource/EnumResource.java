package ebs.api.resource;

import ebs.api.model.enumeration.Sprache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

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
@Api(value = "Example service")
public class EnumResource {

    @PersistenceContext(unitName = "ebsDS")
    private EntityManager em;

    @GET
    @Path("sprache")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Gives all available languages back", notes = "Gives all available languages back",response = Sprache.class)
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
