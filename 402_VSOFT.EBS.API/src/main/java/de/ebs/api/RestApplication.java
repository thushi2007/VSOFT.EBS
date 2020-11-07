package de.ebs.api;

import de.ebs.api.resource.EnumResource;
//import io.swagger.annotations.Contact;
//import io.swagger.annotations.Info;
//import io.swagger.annotations.SwaggerDefinition;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

//@Stateless
@ApplicationPath("/api")
//@SwaggerDefinition(info = @Info(
//        title = "EBS Onlineshop REST- API",
//        description = "JavaEE REST API for de.ebs onlineshop",
//        version = "1.0.0",
//        contact = @Contact(
//                name = "Thamilini Vickneswaranathan",
//                email = "info@vsoft.com",
//                url = "http://www.vsoft.com"
//        )
//))
public class RestApplication extends Application {

//    @Override
//    public Set<Class<?>> getClasses() {
//        Set<Class<?>> classes = new HashSet<>();
//        classes.add(EnumResource.class);
//        classes.add(com.github.phillipkruger.apiee.ApieeService.class);
//        return classes;
//    }
}
