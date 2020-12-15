package ebs.api.dto.menu;

public class MenuSubItemDto {
    private long Id;
    private String Name;

    public MenuSubItemDto() {
    }

    public long getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }
}
