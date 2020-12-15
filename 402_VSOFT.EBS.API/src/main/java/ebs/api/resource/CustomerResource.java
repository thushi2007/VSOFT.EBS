package ebs.api.resource;

import ebs.api.dto.customer.CustomerDto;
import ebs.api.dto.customer.CustomerListItemDto;
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
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
@Path("customer")
@Api(value = "Customer")
public class CustomerResource {
    private static final Logger log = Logger.getLogger(CustomerResource.class);

    @PersistenceContext()
    private EntityManager em;

    @Inject
    private ModelAutoMapper modelAutoMapper;

    @POST
    @ApiResponses({
            @ApiResponse(code = 200, message = "Create new customer"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 500, message = "Integerernal Server Error")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(CustomerDto newCustomer) {
        if (newCustomer == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Model not valid!").build();
        }

        try {
            Query q = em.createNamedQuery("Salutation.find");
            q.setParameter("sid", newCustomer.getAnredeId());
            SalutationEntity salutEntity = (SalutationEntity) q.getSingleResult();

            CustomerEntity custEntity = this.modelAutoMapper.getAutoMapper().map(newCustomer, CustomerEntity.class);
            custEntity.setSalutation(salutEntity);
            custEntity.setCreatedOn(new Timestamp(System.currentTimeMillis()));
            custEntity.setModifiedOn(new Timestamp(System.currentTimeMillis()));
            this.em.merge(custEntity);

            newCustomer = this.modelAutoMapper.getAutoMapper().map(custEntity, CustomerDto.class);
        } catch (Exception exc) {
            log.error(exc);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exc).build();
        }

        return Response.ok(newCustomer).build();
    }


    @PUT
    @ApiResponses({
            @ApiResponse(code = 200, message = "Update customer"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 500, message = "Integerernal Server Error")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(CustomerDto existCustomer) {
        if (existCustomer == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Model not valid!").build();
        }

        try {
            Query q = em.createNamedQuery("Customer.findById");
            q.setParameter("sid", existCustomer.getId());
            CustomerEntity customer = (CustomerEntity) q.getSingleResult();
            
            this.modelAutoMapper.getAutoMapper().map(existCustomer, customer);
            customer.setModifiedOn(new Timestamp(System.currentTimeMillis()));
            this.em.merge(customer);

            existCustomer = this.modelAutoMapper.getAutoMapper().map(customer, CustomerDto.class);
        } catch (Exception exc) {
            log.error(exc);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exc).build();
        }

        return Response.ok(existCustomer).build();
    }

    @GET
    @ApiResponses({
            @ApiResponse(code = 200, message = "Get all customer"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 500, message = "Integerernal Server Error")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getById() {
        Query q = em.createNamedQuery("Customer.getAll");
        List<CustomerListItemDto> customers = ((ArrayList<CustomerEntity>) q.getResultList())
                .stream()
                .map(category -> modelAutoMapper.getAutoMapper().map(category, CustomerListItemDto.class))
                .collect(Collectors.toList());

        return Response.ok(customers).build();
    }

    @GET
    @ApiResponses({
            @ApiResponse(code = 200, message = "Get customer by id"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 500, message = "Integerernal Server Error")
    })
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") Integer id) {
        CustomerDto customerDto = null;

        try {
            Query q = em.createNamedQuery("Customer.findById");
            q.setParameter("sid", id);
            CustomerEntity customer = (CustomerEntity) q.getSingleResult();

            customerDto = this.modelAutoMapper.getAutoMapper().map(customer, CustomerDto.class);
        } catch (Exception exc) {
            log.error(exc);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exc).build();
        }

        return Response.ok(customerDto).build();
    }

    @GET
    @ApiResponses({
            @ApiResponse(code = 200, message = "Get customer by username"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 404, message = "EndpoInteger not found"),
            @ApiResponse(code = 500, message = "Integerernal Server Error")
    })
    @Path("user/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("username") String username) {
        CustomerDto customerDto = null;

        try {
            Query q = em.createNamedQuery("Customer.findByUsername");
            q.setParameter("uname", username);
            CustomerEntity customer = (CustomerEntity) q.getSingleResult();

            customerDto = this.modelAutoMapper.getAutoMapper().map(customer, CustomerDto.class);
        } catch (Exception exc) {
            log.error(exc);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exc).build();
        }

        return Response.ok(customerDto).build();
    }
}
