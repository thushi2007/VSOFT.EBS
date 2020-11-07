package de.ebs.api.dto.menu;

import de.ebs.api.model.SubKategorie;

public class MenuSubItemDto {
    public String Icon;
    public String Text;
    public String SText;

    public MenuSubItemDto(SubKategorie skat){
        this.Icon = skat.getIcon();
        this.Text = skat.getSubKategorie();
        this.SText = skat.getSText();
    }
}
