package ebs.api.model.enumeration;

import ebs.api.model.CustomerEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

@Entity(
        name = "Salutation"
)
@Table(
        name = "VS_E_SALUTATION",
        schema = "ebs"
)
@NamedQueries({
        @NamedQuery(
                name = "Salutation.findAll",
                query = "SELECT s FROM Salutation s"
        )
})
public class SalutationEntity implements Serializable {
    private int id;
    private String name;
    private String value;
    private Timestamp createdOn;
    private Timestamp modifiedOn;
    private Collection<CustomerEntity> customers;

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
    @Column(name = "Name", nullable = true, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "Value", nullable = true, length = 100)
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
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

        SalutationEntity that = (SalutationEntity) o;

        if (id != that.id) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (value != null ? !value.equals(that.value) : that.value != null) return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (value != null ? value.hashCode() : 0);
        result = 31 * result + (createdOn != null ? createdOn.hashCode() : 0);
        result = 31 * result + (modifiedOn != null ? modifiedOn.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "salutation")
    public Collection<CustomerEntity> getCustomers() {
        return customers;
    }

    public void setCustomers(Collection<CustomerEntity> customerEntiiesy) {
        this.customers = customerEntiiesy;
    }
}