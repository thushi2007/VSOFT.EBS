package ebs.api.resource;

import ebs.api.dto.article.ArticleDto;
import ebs.api.dto.buy.BuyDetailsDto;
import ebs.api.dto.buy.BuyDto;
import ebs.api.dto.buy.BuyListItemDto;
import ebs.api.dto.customer.CustomerDto;
import ebs.api.dto.customer.CustomerListItemDto;
import ebs.api.formatter.ModelAutoMapper;
import ebs.api.jwt.JWTAuthed;
import ebs.api.model.ArticleEntity;
import ebs.api.model.BuyArticleEntity;
import ebs.api.model.BuyEntity;
import ebs.api.model.CustomerEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.log4j.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
@Path("buy")
@Api(value = "Buy")
public class BuyResource {
    private static final Logger log = Logger.getLogger(CheckOutResource.class);

    @PersistenceContext()
    private EntityManager em;

    @Inject
    private ModelAutoMapper modelAutoMapper;

    @GET
    @JWTAuthed(roles = {"Admin", "Benutzer"})
    @ApiResponses({
            @ApiResponse(code = 200, message = "Get buys"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 500, message = "Integerernal Server Error")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response get() {
        Query q = em.createNamedQuery("Buy.getAll");
        List<BuyListItemDto> buys = ((ArrayList<BuyEntity>) q.getResultList())
                .stream()
                .map(category -> modelAutoMapper.getAutoMapper().map(category, BuyListItemDto.class))
                .collect(Collectors.toList());
        return Response.ok(buys).build();
    }

    @GET
    @JWTAuthed(roles = {"Admin", "Benutzer"})
    @ApiResponses({
            @ApiResponse(code = 200, message = "Get buys"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 500, message = "Integerernal Server Error")
    })
    @Path("user/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getOfUser(@PathParam("username") String username) {
        Query q = em.createNamedQuery("Buy.findBuysOfUser");
        q.setParameter("uname", username);
        List<BuyListItemDto> buys = ((ArrayList<BuyEntity>) q.getResultList())
                .stream()
                .map(category -> modelAutoMapper.getAutoMapper().map(category, BuyListItemDto.class))
                .collect(Collectors.toList());
        return Response.ok(buys).build();
    }

    @GET
    @JWTAuthed(roles = {"Admin", "Benutzer"})
    @ApiResponses({
            @ApiResponse(code = 200, message = "Get buys"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 500, message = "Integerernal Server Error")
    })
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response get(@PathParam("id") Integer id) {
        BuyDetailsDto buy = null;

        try {
            Query qb = em.createNamedQuery("Buy.findById");
            qb.setParameter("sid", id);
            BuyEntity buyEntity = (BuyEntity) qb.getSingleResult();
            buy = this.modelAutoMapper.getAutoMapper().map(buyEntity, BuyDetailsDto.class);
            buy.setCustomer(this.modelAutoMapper.getAutoMapper().map(buyEntity.getCustomer(), CustomerDto.class));

            List<ArticleDto> artLst = new ArrayList<ArticleDto>();

            for (BuyArticleEntity artEntity : buyEntity.getBuyArticles()) {
                ArticleEntity tmpArt = artEntity.getArticle();
                ArticleDto artDto = this.modelAutoMapper.getAutoMapper().map(tmpArt, ArticleDto.class);
                artLst.add(artDto);
            }

            buy.setArticles(artLst);
        } catch (Exception exc) {
            log.error(exc);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exc).build();
        }

        return Response.ok(buy).build();
    }

    @POST
    @ApiResponses({
            @ApiResponse(code = 200, message = "Create new buy"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 500, message = "Integerernal Server Error")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(BuyDto buyDto) {
        try {
            Query q = em.createNamedQuery("Customer.findByUsername");
            q.setParameter("uname", buyDto.getCustomerUsername());
            CustomerEntity customer = (CustomerEntity) q.getSingleResult();

            BuyEntity bEntity = new BuyEntity();
            bEntity.setCustomerId(customer.getId());
            bEntity.setCustomer(customer);
            bEntity.setTotalPrice(buyDto.getTotalPrice());
            bEntity.setBuyDate(new Timestamp(System.currentTimeMillis()));
            bEntity.setCreatedOn(new Timestamp(System.currentTimeMillis()));
            bEntity.setModifiedOn(new Timestamp(System.currentTimeMillis()));
            this.em.persist(bEntity);

            Integer bId = bEntity.getId();

            Query qb = em.createNamedQuery("Buy.findById");
            qb.setParameter("sid", bId);
            BuyEntity buyEntity = (BuyEntity) qb.getSingleResult();

            for (Integer id : buyDto.getArticleIds()) {
                Query qba = em.createNamedQuery("Article.findById");
                qba.setParameter("sid", id);
                ArticleEntity articleEntity = (ArticleEntity) qba.getSingleResult();

                BuyArticleEntity buyArticle = new BuyArticleEntity();
                buyArticle.setBuy(buyEntity);
                buyArticle.setBuyId(buyEntity.getId());
                buyArticle.setArticle(articleEntity);
                buyArticle.setArticleId(articleEntity.getId());
                buyArticle.setCreatedOn(new Timestamp(System.currentTimeMillis()));
                buyArticle.setModifiedOn(new Timestamp(System.currentTimeMillis()));
                this.em.persist(buyArticle);
            }
        } catch (Exception exc) {
            log.error(exc);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exc).build();
        }

        return Response.ok(buyDto).build();
    }
}
