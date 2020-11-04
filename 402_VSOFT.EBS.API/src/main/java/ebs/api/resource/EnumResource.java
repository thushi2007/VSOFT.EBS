package ebs.api.resource;

import ebs.api.dto.EnumDto;
import ebs.api.model.enumeration.Salutation;
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

import javassist.bytecode.analysis.Type;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

@Stateless
@Path("enum")
@Api(value = "Example service")
public class EnumResource {

    @PersistenceContext(unitName = "ebsDS")
    private EntityManager em;

    @GET
    @Path("sprache")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Gives all available languages back", response = Sprache.class)
    public List<Sprache> getSpracheList() {

        List<Sprache> allObjs;

        try {
            Query q = em.createNamedQuery("Sprache.getSpracheList");
            allObjs = (List<Sprache>) q.getResultList();
            for (Sprache salut : allObjs) {}

        } catch (Exception exc) {
            allObjs = new ArrayList<Sprache>();
        }

        return allObjs;
    }

    @GET
    @Path("salutations")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Gives all available salutations back", response = Salutation.class)
    public List<EnumDto> getAllSalutations() {
        List<EnumDto> allObjs = new ArrayList<EnumDto>();
        ModelMapper modelMapper = new ModelMapper();

        try {
            Query q = em.createNamedQuery("Salutation.getAllSalutation");
            List<Salutation> dbObjs = (List<Salutation>)q.getResultList();


//           allObjs = modelMapper.map(dbObjs, Type.get(List<EnumDto>));
//
//            for (Salutation salut : dbObjs) {
//                EnumDto en = new EnumDto();
//                en.setId(salut.getId());
//                en.setName(salut.getName());
//                en.setValue(salut.getValue());
//                allObjs.add(en);
//            }
        } catch (Exception exc) {
            allObjs = new ArrayList<EnumDto>();
        }

        return allObjs;
    }
}
