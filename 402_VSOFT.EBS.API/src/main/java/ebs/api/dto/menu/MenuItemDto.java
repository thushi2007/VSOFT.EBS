package ebs.api.dto.menu;

import java.util.ArrayList;
import java.util.List;

public class MenuItemDto {
    private long Id;
    private String Category;
    private List<MenuSubItemDto> SubCategories;

    public MenuItemDto() {
        this.SubCategories = new ArrayList<MenuSubItemDto>();
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getCategory() {
        return Category;
    }

    public void setCategory(String category) {
        Category = category;
    }

    public List<MenuSubItemDto> getSubCategories() {
        return SubCategories;
    }

    public void setSubCategories(List<MenuSubItemDto> subCategories) {
        SubCategories = subCategories;
    }
}
