package ebs.api.resource;

import ebs.api.dto.EnumDto;
import ebs.api.formatter.ModelAutoMapper;
import ebs.api.jwt.JWTAuthed;
import ebs.api.model.AuthorEntity;
import ebs.api.model.PublisherEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.log4j.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
@Path("author")
@Api(value = "Author")
public class AuthorResource {
    private static final Logger log = Logger.getLogger(CheckOutResource.class);

    @PersistenceContext()
    private EntityManager em;

    @Inject
    private ModelAutoMapper modelAutoMapper;

    @GET
    @JWTAuthed(roles = {"Admin"})
    @Path("enum")
    @ApiOperation(value = "Returns all author as enum")
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAuthorEnum() {
        Query q = em.createNamedQuery("Author.getAll");
        List<EnumDto> allObjs = ((List<AuthorEntity>) q.getResultList())
                .stream()
                .map(author -> modelAutoMapper.getAutoMapper().map(author, EnumDto.class))
                .collect(Collectors.toList());
        return Response.ok(allObjs).build();
    }
}
