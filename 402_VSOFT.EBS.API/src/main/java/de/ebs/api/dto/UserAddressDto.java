package de.ebs.api.dto;

import de.ebs.api.model.Person;

public class UserAddressDto {
    public String Vorname;
    public String Nachname;
    public String Organisation;

    public String Strasse;
    public String HausNr;
    public String PLZ;
    public String Ort;

    public String EMail;

    public UserAddressDto(){

    }

    public UserAddressDto(Person pers) {
        if (pers != null) {
            this.Vorname = pers.getVorname();
            this.Nachname = pers.getNachname();
            this.Organisation = pers.getOrganisation();
            this.Strasse = pers.getStrasse();
            this.HausNr = pers.getHausNr();
            this.PLZ = pers.getPLZ();
            this.Ort = pers.getOrt();

//            if(pers.getAccount() != null) {
//                this.EMail = pers.getAccount().getEmail();
//            }
        }
    }
}
