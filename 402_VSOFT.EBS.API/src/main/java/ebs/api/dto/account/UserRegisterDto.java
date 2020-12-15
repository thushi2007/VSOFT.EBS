package ebs.api.dto.account;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("UserRegisterDto")
public class UserRegisterDto {
    private Integer anredeId;
    private String organisation;
    private String Firstname;
    private String Lastname;

    private String Street;
    private String StreetNo;
    private Integer ZIP;
    private String Location;

    private String EMail;

    private String Pwd;
    private String PwdRepeat;

    @JsonProperty("AnredeId")
    public Integer getAnredeId() {
        return anredeId;
    }

    public void setAnredeId(Integer anredeId) {
        this.anredeId = anredeId;
    }

    @JsonProperty("Organisation")
    public String getOrganisation() {
        return organisation;
    }

    public void setOrganisation(String organisation) {
        this.organisation = organisation;
    }

    @JsonProperty("Firstname")
    public String getFirstname() {
        return Firstname;
    }

    public void setFirstname(String firstname) {
        Firstname = firstname;
    }

    @JsonProperty("Lastname")
    public String getLastname() {
        return Lastname;
    }

    public void setLastname(String lastname) {
        Lastname = lastname;
    }

    @JsonProperty("Street")
    public String getStreet() {
        return Street;
    }

    public void setStreet(String street) {
        Street = street;
    }

    @JsonProperty("StreetNo")
    public String getStreetNo() {
        return StreetNo;
    }

    public void setStreetNo(String streetNo) {
        StreetNo = streetNo;
    }

    @JsonProperty("ZIP")
    public Integer getZIP() {
        return ZIP;
    }

    public void setZIP(Integer ZIP) {
        this.ZIP = ZIP;
    }

    @JsonProperty("Location")
    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    @JsonProperty("EMail")
    public String getEMail() {
        return EMail;
    }

    public void setEMail(String EMail) {
        this.EMail = EMail;
    }

    @JsonProperty("Pwd")
    public String getPwd() {
        return Pwd;
    }

    public void setPwd(String pwd) {
        Pwd = pwd;
    }

    @JsonProperty("PwdRepeat")
    public String getPwdRepeat() {
        return PwdRepeat;
    }

    public void setPwdRepeat(String pwdRepeat) {
        PwdRepeat = pwdRepeat;
    }
}
