package ebs.api.dto.menu;

import ebs.api.model.SubKategorie;

import java.util.ArrayList;
import java.util.List;

public class MenuSubCollectionDto {
    public String MainSText;

    public List<MenuSubItemDto> SubMenuItems;

    public MenuSubCollectionDto(String katmText, List<SubKategorie> mSubMen) {
        this.MainSText = katmText;
        this.SubMenuItems = new ArrayList<MenuSubItemDto>();

        for (SubKategorie sk : mSubMen) {
            MenuSubItemDto msi = new MenuSubItemDto(sk);
            this.SubMenuItems.add(msi);
        }
    }
}
