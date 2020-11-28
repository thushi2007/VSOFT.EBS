package ebs.api.resource;

import ebs.api.dto.article.ArticleDto;
import ebs.api.dto.article.ListArticleItemDto;
import ebs.api.jwt.JWTAuthed;
import ebs.api.model.ArticleEntity;

import io.swagger.annotations.*;
import org.modelmapper.ModelMapper;

import javax.ejb.Stateless;
import javax.json.bind.Jsonb;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
@Path("article")
@Api(value = "Article")
public class ArticleResource {
    private ModelMapper autoMapper;
    private Jsonb jsonb;

    @PersistenceContext()
    private EntityManager em;

    public ArticleResource() {
        autoMapper = new ModelMapper();
    }

    @GET
    @ApiOperation(value = "Returns list of articles")
    @ApiResponses({
            @ApiResponse(code = 200, message = "List returned"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "Endpoint not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response all() {
        ModelMapper autoMapper = new ModelMapper();
        Query q = em.createNamedQuery("Article.getAll");
        List<ArticleDto> articles = ((ArrayList<ArticleEntity>) q.getResultList())
                .stream()
                .map(article -> autoMapper.map(article, ArticleDto.class))
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
            @ApiResponse(code = 404, message = "Endpoint not found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllSalutationsList() {
        Query q = em.createNamedQuery("Article.getAll");
        List<ListArticleItemDto> articles = ((ArrayList<ArticleEntity>) q.getResultList())
                .stream()
                .map(article -> autoMapper.map(article, ListArticleItemDto.class))
                .collect(Collectors.toList());

        return Response.ok(articles).build();
    }

//    @GET
//    @Path("/{kat}/all")
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<ArticleDto> getBooksByKat(@PathParam("kat") String mainKatName, @QueryParam("lstct") int countItems) {
//        List<ArticleDto> allObjs = new ArrayList<ArticleDto>();
//
////        try {
////            Query q = em.createNamedQuery("Artikel.getBookByMainKatName");
////            q.setParameter("mainKatName", mainKatName);
////            q.setMaxResults(countItems);
////            List<Article> allArtikel = (List<Article>) q.getResultList();
////
////            for (Article b : allArtikel) {
////                ArtikelDto be = new ArtikelDto(b);
////                allObjs.add(be);
////            }
////        } catch (Exception exc) {
////            allObjs = new ArrayList<ArtikelDto>();
////        }
//
//        return allObjs;
//    }
//
//
//    @GET
//    @Path("/{mainkat}/{subkat}/all")
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<ArticleDto> getBooksByMainAndSubKat(@PathParam("mainkat") String mainKatName, @PathParam("subkat") String subKatName,
//                                                    @QueryParam("lstct") int countItems) {
//        List<ArticleDto> allObjs = new ArrayList<ArticleDto>();
//
////        try {
////            Query q = em.createNamedQuery("Artikel.getBookByMainSubKatName");
////            q.setParameter("mainKatName", mainKatName);
////            q.setParameter("subKatName", subKatName);
////            q.setMaxResults(countItems);
////            List<Article> allArtikel = (List<Article>) q.getResultList();
////
////            for (Article b : allArtikel) {
////                ArtikelDto be = new ArtikelDto(b);
////                allObjs.add(be);
////            }
////        } catch (Exception exc) {
////            allObjs = new ArrayList<ArtikelDto>();
////        }
//
//        return allObjs;
//    }
}
