package ebs.api.model;

import ebs.api.model.enumeration.SalutationEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

@Entity(
        name = "CUSTOMER"
)
@Table(
        name = "VS_T_CUSTOMER",
        schema = "ebs"
)
public class CustomerEntity implements Serializable {
    private int id;
    private Integer salutationId;
    private String firstname;
    private String lastname;
    private String organisation;
    private String street;
    private String no;
    private Integer zip;
    private String place;
    private String username;
    private Timestamp createdOn;
    private Timestamp modifiedOn;
    private Collection<BuyEntity> buys;
    private SalutationEntity salutation;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "SalutationId", nullable = true, insertable = false, updatable = false)
    public Integer getSalutationId() {
        return salutationId;
    }

    public void setSalutationId(Integer salutationId) {
        this.salutationId = salutationId;
    }

    @Basic
    @Column(name = "Firstname", nullable = true, length = 200)
    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    @Basic
    @Column(name = "Lastname", nullable = true, length = 200)
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @Basic
    @Column(name = "Organisation", nullable = true, length = 200)
    public String getOrganisation() {
        return organisation;
    }

    public void setOrganisation(String organisation) {
        this.organisation = organisation;
    }

    @Basic
    @Column(name = "Street", nullable = true, length = 200)
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    @Basic
    @Column(name = "No", nullable = true, length = 200)
    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    @Basic
    @Column(name = "ZIP", nullable = true)
    public Integer getZip() {
        return zip;
    }

    public void setZip(Integer zip) {
        this.zip = zip;
    }

    @Basic
    @Column(name = "Place", nullable = true, length = 200)
    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    @Basic
    @Column(name = "Username", nullable = false, length = 300)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "CreatedOn", nullable = true)
    public Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
    }

    @Basic
    @Column(name = "ModifiedOn", nullable = true)
    public Timestamp getModifiedOn() {
        return modifiedOn;
    }

    public void setModifiedOn(Timestamp modifiedOn) {
        this.modifiedOn = modifiedOn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CustomerEntity that = (CustomerEntity) o;

        if (id != that.id) return false;
        if (salutationId != null ? !salutationId.equals(that.salutationId) : that.salutationId != null) return false;
        if (firstname != null ? !firstname.equals(that.firstname) : that.firstname != null) return false;
        if (lastname != null ? !lastname.equals(that.lastname) : that.lastname != null) return false;
        if (organisation != null ? !organisation.equals(that.organisation) : that.organisation != null) return false;
        if (street != null ? !street.equals(that.street) : that.street != null) return false;
        if (no != null ? !no.equals(that.no) : that.no != null) return false;
        if (zip != null ? !zip.equals(that.zip) : that.zip != null) return false;
        if (place != null ? !place.equals(that.place) : that.place != null) return false;
        if (username != null ? !username.equals(that.username) : that.username != null) return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (salutationId != null ? salutationId.hashCode() : 0);
        result = 31 * result + (firstname != null ? firstname.hashCode() : 0);
        result = 31 * result + (lastname != null ? lastname.hashCode() : 0);
        result = 31 * result + (organisation != null ? organisation.hashCode() : 0);
        result = 31 * result + (street != null ? street.hashCode() : 0);
        result = 31 * result + (no != null ? no.hashCode() : 0);
        result = 31 * result + (zip != null ? zip.hashCode() : 0);
        result = 31 * result + (place != null ? place.hashCode() : 0);
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (createdOn != null ? createdOn.hashCode() : 0);
        result = 31 * result + (modifiedOn != null ? modifiedOn.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "customer")
    public Collection<BuyEntity> getBuys() {
        return buys;
    }

    public void setBuys(Collection<BuyEntity> buyEntity) {
        this.buys = buyEntity;
    }

    @ManyToOne
    @JoinColumn(name = "SalutationId", referencedColumnName = "Id", insertable = false, updatable = false)
    public SalutationEntity getSalutation() {
        return salutation;
    }

    public void setSalutation(SalutationEntity salutationEntity) {
        this.salutation = salutationEntity;
    }
}