package ebs.api.dto.articleimage;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("ImageDto")
public class ImageDto {
    private String ImageBase64;

    @JsonProperty("ImageBase64")
    public String getImageBase64() {
        return ImageBase64;
    }

    public void setImageBase64(String imageBase64) {
        ImageBase64 = imageBase64;
    }
}
