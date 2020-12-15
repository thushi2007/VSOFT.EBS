package ebs.api.resource;

import javax.ejb.Stateless;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.json.bind.JsonbConfig;
import javax.json.bind.config.PropertyNamingStrategy;
import javax.json.bind.config.PropertyOrderStrategy;
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
import java.util.Locale;
import java.util.stream.Collectors;

import ebs.api.dto.CategoryDetailDto;
import ebs.api.dto.EnumDto;
import ebs.api.jwt.JWTAuthed;
import ebs.api.model.CategoryEntity;
import ebs.api.dto.menu.MenuItemDto;

import ebs.api.model.enumeration.SalutationEntity;
import io.swagger.annotations.*;

import org.modelmapper.ModelMapper;
import org.apache.log4j.Logger;

@Stateless
@Path("category")
@Api(value = "Category")
public class CategoryResource {
    private static final Logger log = Logger.getLogger(CheckOutResource.class);

    @PersistenceContext()
    private EntityManager em;

    private ModelMapper autoMapper;
    private Jsonb jsonb;

    public CategoryResource() {
        autoMapper = new ModelMapper();
        JsonbConfig jsonbConfig = new JsonbConfig()
                .withPropertyNamingStrategy(PropertyNamingStrategy.UPPER_CAMEL_CASE)
                .withPropertyOrderStrategy(PropertyOrderStrategy.LEXICOGRAPHICAL)
                .withStrictIJSON(true)
                .withFormatting(true)
                .withDateFormat("dd.MM.yyyy hh:mm:ss", Locale.GERMANY)
                .withNullValues(true);
        jsonb = JsonbBuilder.create(jsonbConfig);
    }

    @GET
    @Path("menu")
    @ApiOperation(value = "Returns all category for the menu")
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getMenuList() {
        Query q = em.createNamedQuery("Category.findAll");
        List<MenuItemDto> allObjs = ((List<CategoryEntity>) q.getResultList())
                .stream()
                .map(categoryEntity -> autoMapper.map(categoryEntity, MenuItemDto.class))
                .collect(Collectors.toList());

        String jsonString = jsonb.toJson(allObjs);
        return Response.ok(jsonString).build();
    }

    @GET
    @Path("list")
    @JWTAuthed(roles = {"Admin"})
    @ApiOperation(
            value = "Returns all category for the admin",
            authorizations = @Authorization(value = "jwt-auth")
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllCategories() {
        Query q = em.createNamedQuery("Category.findAll");
        List<CategoryDetailDto> categories = ((ArrayList<CategoryEntity>) q.getResultList())
                .stream()
                .map(category -> autoMapper.map(category, CategoryDetailDto.class))
                .collect(Collectors.toList());

        String jsonString = jsonb.toJson(categories);
        return Response.ok(jsonString).build();
    }
}
