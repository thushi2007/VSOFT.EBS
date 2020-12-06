package ebs.api.resource;

import ebs.api.dto.account.UserRegisterDto;
import ebs.api.formatter.ModelAutoMapper;
import ebs.api.model.CustomerEntity;
import ebs.api.model.enumeration.SalutationEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.log4j.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.util.ArrayList;

@Stateless
@Path("account")
@Api(value = "Account")
public class AccountResource {
    static Logger logger = Logger.getLogger(AccountResource.class);

    @PersistenceContext()
    private EntityManager em;

    @Inject
    private ModelAutoMapper modelAutoMapper;

    @POST
    @Path("register")
    @ApiResponses({
            @ApiResponse(code = 200, message = "User registrated"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "Endpoint not found"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(UserRegisterDto userModel) {
        if (userModel == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Model not valid!").build();
        }

        try {
            Query q = em.createNamedQuery("Salutation.find");
            q.setParameter("sid", userModel.getAnredeId());
            SalutationEntity salutEntity = (SalutationEntity) q.getSingleResult();

            CustomerEntity custEntity = this.modelAutoMapper.getAutoMapper().map(userModel, CustomerEntity.class);
            custEntity.setSalutation(salutEntity);
            custEntity.setCreatedOn(new Timestamp(System.currentTimeMillis()));
            custEntity.setModifiedOn(new Timestamp(System.currentTimeMillis()));
            this.em.merge(custEntity);
        } catch (Exception exc) {
            logger.error(exc);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exc).build();
        }

        return Response.ok("User successfully registrated").build();
    }
}
