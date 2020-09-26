package ebs.api.dto.menu;

import java.util.List;

public class MenuCollectionDto {

    public List<MenuItemDto> MainMenuItems;
    public List<MenuSubCollectionDto> SubMenuItems;

    public MenuCollectionDto(List<MenuItemDto> mainMItems, List<MenuSubCollectionDto> subMItems){
        this.MainMenuItems = mainMItems;
        this.SubMenuItems = subMItems;
    }

    public MenuCollectionDto(){}
}
