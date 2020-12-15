package ebs.api.resource;

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
import java.util.ArrayList;
import java.util.List;

import java.util.stream.Collectors;

import ebs.api.config.AppProperties;
import ebs.api.dto.EnumDto;
import ebs.api.dto.enumuration.ListEnumItemDto;
import ebs.api.formatter.ModelAutoMapper;
import ebs.api.jwt.JWTAuthed;
import ebs.api.model.enumeration.LanguageEntity;
import ebs.api.model.enumeration.SalutationEntity;

import io.swagger.annotations.*;

import org.modelmapper.ModelMapper;
import org.apache.log4j.Logger;

@Stateless
@Path("enum")
@Api(value = "Enum")
public class EnumResource {
    private static final Logger log = Logger.getLogger(CheckOutResource.class);

    @PersistenceContext()
    private EntityManager em;

    @Inject
    private ModelAutoMapper modelAutoMapper;

    @GET
    @Path("salutations")
    @ApiOperation(value = "Returns all saluations")
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned", response = EnumDto.class),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllSalutations() {
        Query q = em.createNamedQuery("Salutation.findAll");
        List<EnumDto> salutations = ((ArrayList<SalutationEntity>) q.getResultList())
                .stream()
                .map(salutation -> modelAutoMapper.getAutoMapper().map(salutation, EnumDto.class))
                .collect(Collectors.toList());

        return Response.ok(salutations).build();
    }

    @GET
    @Path("languages")
    @ApiOperation(value = "Returns all languages")
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned", response = EnumDto.class),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllLanguages() {
        Query q = em.createNamedQuery("Language.findAll");
        List<EnumDto> languages = ((ArrayList<LanguageEntity>) q.getResultList())
                .stream()
                .map(salutation -> modelAutoMapper.getAutoMapper().map(salutation, EnumDto.class))
                .collect(Collectors.toList());

        return Response.ok(languages).build();
    }

    @GET
    @Path("language/list")
    @JWTAuthed(roles = {"Admin"})
    @ApiOperation(
            value = "Returns list languages",
            authorizations = @Authorization(value = "jwt-auth")
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned", response = ListEnumItemDto.class),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllLanguagesList() {
        Query q = em.createNamedQuery("Language.findAll");
        List<ListEnumItemDto> languages = ((ArrayList<LanguageEntity>) q.getResultList())
                .stream()
                .map(language -> modelAutoMapper.getAutoMapper().map(language, ListEnumItemDto.class))
                .collect(Collectors.toList());

        return Response.ok(languages).build();
    }

    @GET
    @Path("salutation/list")
    @JWTAuthed(roles = {"Admin"})
    @ApiOperation(
            value = "Returns list languages",
            authorizations = @Authorization(value = "jwt-auth")
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned", response = ListEnumItemDto.class),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllSalutationsList() {
        Query q = em.createNamedQuery("Salutation.findAll");
        List<ListEnumItemDto> languages = ((ArrayList<SalutationEntity>) q.getResultList())
                .stream()
                .map(language -> modelAutoMapper.getAutoMapper().map(language, ListEnumItemDto.class))
                .collect(Collectors.toList());

        return Response.ok(languages).build();
    }
}
