package ebs.api.resource;

import ebs.api.model.Artikel;
import ebs.api.model.Person;
import ebs.api.model.Verkauf;
import ebs.api.model.VerkaufArtikel;
import ebs.api.dto.ArtikelDto;
import org.apache.log4j.Logger;

import javax.ejb.Stateful;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.awt.print.Book;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Path("checkout")
public class CheckOutResource {

    private static final Logger log = Logger.getLogger(CheckOutResource.class);

    @PersistenceContext()
    private EntityManager em;

    @POST
    @Path("makeorder")
    @Produces(MediaType.APPLICATION_JSON)
    public Response finish(@HeaderParam(HttpHeaders.AUTHORIZATION) String authToken, List<Long> ArtikelIds) {
        try {

            if (ArtikelIds == null && ArtikelIds.size() <= 0) {
                return Response.status(Response.Status.BAD_REQUEST).entity("Items are missing!").build();
            }

//            Benutzer Bntr = this.jwtService.getCurrentUserByToken(authToken);
//            Bntr = em.find(Benutzer.class, Bntr.getId());
//            Person Pers = Bntr.getPers();

//            if (Bntr == null) {
//                return Response.status(Response.Status.BAD_REQUEST).entity("User not found!").build();
//            }

            Query q = em.createNamedQuery("Artikel.getArtikelByIds");
            q.setParameter("ids", ArtikelIds);
            List<Artikel> Arts = (List<Artikel>) q.getResultList();

            ArrayList<VerkaufArtikel> VerkArts = new ArrayList<VerkaufArtikel>();

            double TotalCHF = 0;

            Verkauf vk = new Verkauf();
//            vk.Kaeufer = Pers;
            vk.setKaufdatum(new Timestamp(System.currentTimeMillis()));
            vk.setErstelltAm(new Timestamp(System.currentTimeMillis()));
            vk.setGeaendertAm(new Timestamp(System.currentTimeMillis()));
            em.persist(vk);

            for (long artId : ArtikelIds) {
                Artikel art = Arts.stream().filter(a -> a.getId() == artId).findFirst().get();

                if (art != null) {
                    VerkaufArtikel VA = new VerkaufArtikel();
                    VA.BetrArtikel = art;
                    VA.BetrVerkauf = vk;
                    VA.setErstelltAm(new Timestamp(System.currentTimeMillis()));
                    VA.setGeaendertAm(new Timestamp(System.currentTimeMillis()));
                    em.persist(VA);

                    TotalCHF += art.getPreis();
                }
            }

            vk.setTotal(TotalCHF);
            em.persist(vk);
        } catch (Exception exc) {
            log.error(exc);
            return Response.serverError().entity("checkout faild!").build();
        }

        return Response.ok("Order saved successfully!").build();
    }

}
