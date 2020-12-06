package ebs.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("EnumDto")
public class EnumDto {
    private Long id;
    private String Value;
    private String Name;

    @JsonProperty("Id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonProperty("Name")
    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    @JsonProperty("Value")
    public String getValue() {
        return Value;
    }

    public void setValue(String value) {
        Value = value;
    }
}
