package de.ebs.api.resource;

import de.ebs.api.dto.EnumDto;
import de.ebs.api.model.enumeration.Salutation;
import de.ebs.api.model.enumeration.Sprache;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hibernate.Session;

import javax.ejb.Singleton;
import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;

@RequestScoped
@Path("enum")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EnumResource {

    @PersistenceContext(unitName = "ebsDS")
    private EntityManager em;

    @GET
    @Path("sprache")
    @ApiOperation(value = "Gives all available languages back", response = Sprache.class)
    public List<Sprache> getSpracheList() {

        List<Sprache> allObjs;

        try {
            Query q = em.createNamedQuery("Sprache.getSpracheList");
            allObjs = (List<Sprache>) q.getResultList();
            for (Sprache salut : allObjs) {
            }

        } catch (Exception exc) {
            allObjs = new ArrayList<Sprache>();
        }

        return allObjs;
    }

    @GET
    @Path("salutations")
    @ApiOperation(value = "Gives all available salutations back", response = Salutation.class)
    public List<Salutation> getAllSalutations() {
        List<Salutation> allObjs = null;
        ModelMapper modelMapper = new ModelMapper();

        try {
            Query q = em.createNamedQuery("Salutation.getAllSalutation");
            allObjs = (List<Salutation>) q.getResultList();
        } catch (Exception exc) {
            allObjs = new ArrayList<Salutation>();
        }

        return allObjs;
    }
}
