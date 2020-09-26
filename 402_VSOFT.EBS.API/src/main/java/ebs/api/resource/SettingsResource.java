package ebs.api.resource;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("settings")
public class SettingsResource {

    @GET
    @Path("info")
    @Produces(MediaType.APPLICATION_JSON)
    public String info() {
        return "Information sent";
    }
}
