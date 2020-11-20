package ebs.api.dto.enumuration;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

import java.util.Date;

@JsonTypeName("ListEnumItemDto")
public class ListEnumItemDto {
    private Long Id;
    private String Value;
    private String Name;
    private Date CreatedOn;
    private Date ModifiedOn;

    @JsonProperty("Id")
    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    @JsonProperty("Value")
    public String getValue() {
        return Value;
    }

    public void setValue(String value) {
        Value = value;
    }

    @JsonProperty("Name")
    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    @JsonProperty("CreatedOn")
    public Date getCreatedOn() {
        return CreatedOn;
    }

    public void setCreatedOn(Date createdOn) {
        CreatedOn = createdOn;
    }

    @JsonProperty("ModifiedOn")
    public Date getModifiedOn() {
        return ModifiedOn;
    }

    public void setModifiedOn(Date modifiedOn) {
        ModifiedOn = modifiedOn;
    }
}
