package ebs.api.dto.menu;

import ebs.api.model.Kategorie;

public class MenuItemDto {
    public String Icon;
    public String SText;
    public String Text;

    public MenuItemDto(Kategorie kat)
    {
        this.Icon = kat.getIcon();
        this.Text = kat.getKategorie();
        this.SText = kat.getSText();
    }
}
