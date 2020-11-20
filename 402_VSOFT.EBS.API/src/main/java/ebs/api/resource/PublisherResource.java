package ebs.api.resource;

import ebs.api.dto.EnumDto;
import ebs.api.model.PublisherEntity;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
@Path("publisher")
@Api(value = "Publisher")
public class PublisherResource {
    private static final Logger log = Logger.getLogger(CheckOutResource.class);
    private ModelMapper autoMapper;

    @PersistenceContext()
    private EntityManager em;

    public PublisherResource() {
        autoMapper = new ModelMapper();
    }

    @GET
    @ApiOperation(value = "Returns all publisher")
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "Endpoint not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllPublisher() {
        autoMapper.typeMap(PublisherEntity.class, EnumDto.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getId(), EnumDto::setId);
                    mapper.map(src -> src.getName(), EnumDto::setName);
                    mapper.map(src -> src.getName(), EnumDto::setValue);
                });

        Query q = em.createNamedQuery("Publisher.getAll");
        List<EnumDto> publishers = ((ArrayList<PublisherEntity>) q.getResultList())
                .stream()
                .map(publisher -> autoMapper.map(publisher, EnumDto.class))
                .collect(Collectors.toList());

        return Response.ok(publishers).build();
    }
}
