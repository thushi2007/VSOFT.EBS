package ebs.api.resource;

import ebs.api.model.Artikel;
import ebs.api.model.Kategorie;
import ebs.api.model.SubKategorie;
import ebs.api.dto.ArtikelDto;
import ebs.api.dto.menu.MenuCollectionDto;
import ebs.api.dto.menu.MenuItemDto;
import ebs.api.dto.menu.MenuSubCollectionDto;
import ebs.api.dto.menu.MenuSubItemDto;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("gen")
public class GeneralResource {

    @PersistenceContext()
    private EntityManager em;

    @GET
    @Path("menu")
    @Produces(MediaType.APPLICATION_JSON)
    public MenuCollectionDto getMenuList() {
        List<MenuItemDto> allObjs = new ArrayList<MenuItemDto>();
        List<MenuSubCollectionDto> alleSubObj = new ArrayList<MenuSubCollectionDto>();
        MenuCollectionDto mCol = new MenuCollectionDto();

        try {
            Query q = em.createNamedQuery("Kategorie.getAll", Kategorie.class);
            List<Kategorie> allKats = (List<Kategorie>) q.getResultList();

            for (Kategorie b : allKats) {
                MenuItemDto be = new MenuItemDto(b);
                allObjs.add(be);

                MenuSubCollectionDto msItem = new MenuSubCollectionDto(be.SText, b.getSubKategories());
                alleSubObj.add(msItem);
            }

            mCol.MainMenuItems = allObjs;
            mCol.SubMenuItems = alleSubObj;

        } catch (Exception exc) {
            mCol = new MenuCollectionDto();
        }

        return mCol;
    }
}