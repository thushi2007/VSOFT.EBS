package ebs.api.resource;

import ebs.api.dto.EnumDto;
import ebs.api.dto.menu.MenuItemDto;
import ebs.api.formatter.ModelAutoMapper;
import ebs.api.jwt.JWTAuthed;
import ebs.api.model.CategoryEntity;
import ebs.api.model.SubcategoryEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;

import javax.ejb.Stateless;
import javax.inject.Inject;
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
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Stateless
@Path("subcategory")
@Api(value = "SubCategory")
public class SubCategoryResource {
    private static final Logger log = Logger.getLogger(CheckOutResource.class);

    @PersistenceContext()
    private EntityManager em;

    @Inject
    private ModelAutoMapper modelAutoMapper;

    @GET
    @JWTAuthed(roles = {"Admin"})
    @ApiOperation(value = "Returns all subcategory for the admin")
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "Endpoint not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllSubCategories() {
        Query q = em.createNamedQuery("Subcategory.findAll");
        List<MenuItemDto> allObjs = ((List<SubcategoryEntity>) q.getResultList())
                .stream()
                .map(categoryEntity -> modelAutoMapper.getAutoMapper().map(categoryEntity, MenuItemDto.class))
                .collect(Collectors.toList());
        return Response.ok(allObjs).build();
    }

    @GET
    @Path("enum")
    @JWTAuthed(roles = {"Admin"})
    @ApiOperation(value = "Returns all subcategory for the admin")
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "Endpoint not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllSubCategoriesAsEnum() {
        Query q = em.createNamedQuery("Subcategory.findAll");
        List<EnumDto> allObjs = ((List<SubcategoryEntity>) q.getResultList())
                .stream()
                .map(subCategory -> modelAutoMapper.getAutoMapper().map(subCategory, EnumDto.class))
                .collect(Collectors.toList());
        return Response.ok(allObjs).build();
    }
}
