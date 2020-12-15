package ebs.api.resource;

import ebs.api.dto.article.ArticleDto;
import ebs.api.dto.article.CreateArticleDto;
import ebs.api.dto.article.ListArticleItemDto;
import ebs.api.dto.articleimage.ArticleImageDto;
import ebs.api.dto.articleimage.ImageDto;
import ebs.api.dto.buy.BuyListItemDto;
import ebs.api.formatter.ModelAutoMapper;
import ebs.api.jwt.JWTAuthed;
import ebs.api.model.ArticleEntity;

import ebs.api.model.ArticleImageEntity;
import ebs.api.model.BuyEntity;
import ebs.api.model.CustomerEntity;
import io.swagger.annotations.*;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Stateless
@Path("article")
@Api(value = "Article")
public class ArticleResource {
    private static final Logger log = Logger.getLogger(CheckOutResource.class);

    @PersistenceContext()
    private EntityManager em;

    @Inject
    private ModelAutoMapper modelAutoMapper;

    @GET
    @ApiOperation(value = "Returns list of articles")
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response all() {
        Query q = em.createNamedQuery("Article.getAll");
        List<ArticleDto> articles = ((ArrayList<ArticleEntity>) q.getResultList())
                .stream()
                .map(article -> modelAutoMapper.getAutoMapper().map(article, ArticleDto.class))
                .collect(Collectors.toList());

        return Response.ok(articles).build();
    }

    @GET
    @Path("list")
    @JWTAuthed(roles = {"Admin"})
    @ApiOperation(
            value = "Returns list of articles for admin",
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
    public Response get() {
        Query q = em.createNamedQuery("Article.getAll");
        List<ListArticleItemDto> articles = ((ArrayList<ArticleEntity>) q.getResultList())
                .stream()
                .map(article -> modelAutoMapper.getAutoMapper().map(article, ListArticleItemDto.class))
                .collect(Collectors.toList());

        return Response.ok(articles).build();
    }


    @POST
    @JWTAuthed(roles = {"Admin"})
    @ApiOperation(
            value = "Create new article",
            authorizations = @Authorization(value = "jwt-auth")
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Article created"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(CreateArticleDto article) {
        if (article == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Model not valid!").build();
        }

        ArticleEntity articleEntity = this.modelAutoMapper.getAutoMapper().map(article, ArticleEntity.class);
        articleEntity.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        articleEntity.setModifiedOn(new Timestamp(System.currentTimeMillis()));
        this.em.persist(articleEntity);
        this.em.refresh(articleEntity);

        article = this.modelAutoMapper.getAutoMapper().map(articleEntity, CreateArticleDto.class);

        return Response.ok(article).build();
    }

    @POST
    @Path("{id}/image")
    @JWTAuthed(roles = {"Admin"})
    @ApiOperation(
            value = "Upload image for article",
            authorizations = @Authorization(value = "jwt-auth")
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Article image saved"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createImage(@PathParam("id") Integer id, MultipartFormDataInput imageFile) throws IOException {
        Map<String, List<InputPart>> uploadForm = imageFile.getFormDataMap();
        List<InputPart> inputParts = uploadForm.get("File");

        for (InputPart inputPart : inputParts) {
            InputStream inputStream = inputPart.getBody(InputStream.class, null);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len;

            while ((len = inputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, len);
            }

            byte[] bytes = byteArrayOutputStream.toByteArray();

            ArticleImageEntity articleImage = new ArticleImageEntity();
            articleImage.setArticleId(id);
            articleImage.setImage(bytes);
            articleImage.setCreatedOn(new Timestamp(System.currentTimeMillis()));
            articleImage.setModifiedOn(new Timestamp(System.currentTimeMillis()));
            this.em.persist(articleImage);
        }

        return Response.ok().build();
    }


    @GET
    @Path("{id}/image")
    @ApiOperation(
            value = "Get image of article"
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Get article image"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createImage(@PathParam("id") Integer id) {
        List<ImageDto> imgsDto = new ArrayList<ImageDto>();
        Query q = em.createNamedQuery("ArticleImage.getImagesByArticleId");
        q.setParameter("sid", id);
        List<ArticleImageEntity> imgs = ((ArrayList<ArticleImageEntity>) q.getResultList())
                .stream()
                .collect(Collectors.toList());

        for (ArticleImageEntity artImg : imgs) {
            String base64Image = Base64.getEncoder().encodeToString(artImg.getImage());
            ImageDto imDto = new ImageDto();
            imDto.setImageBase64(base64Image);
            imgsDto.add(imDto);
        }

        return Response.ok(imgsDto).build();
    }
}
