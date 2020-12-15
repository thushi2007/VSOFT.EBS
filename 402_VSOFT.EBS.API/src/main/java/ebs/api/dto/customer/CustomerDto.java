package ebs.api.dto.customer;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("CustomerDto")
public class CustomerDto {
    private Integer id;
    private Integer anredeId;

    private String organisation;
    private String firstname;
    private String lastname;

    private String street;
    private String streetNo;
    private Integer zip;
    private String location;
    private String eMail;

    private String pwd;
    private String pwdRepeat;

    @JsonProperty("Id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    @JsonProperty("Lastname")
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @JsonProperty("Street")
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    @JsonProperty("StreetNo")
    public String getStreetNo() {
        return streetNo;
    }

    public void setStreetNo(String streetNo) {
        this.streetNo = streetNo;
    }

    @JsonProperty("Zip")
    public Integer getZip() {
        return zip;
    }

    public void setZip(Integer zip) {
        this.zip = zip;
    }

    @JsonProperty("Location")
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @JsonProperty("EMail")
    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    @JsonProperty("Pwd")
    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @JsonProperty("PwdRepeat")
    public String getPwdRepeat() {
        return pwdRepeat;
    }

    public void setPwdRepeat(String pwdRepeat) {
        this.pwdRepeat = pwdRepeat;
    }
}
