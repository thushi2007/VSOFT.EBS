package ebs;

import ebs.api.config.AppProperties;
import ebs.api.config.SwaggerConfigs;
import ebs.api.filter.CorsFilter;
import ebs.api.jwt.JWTAuthedFilter;
import ebs.api.jwt.JWTService;
import ebs.api.resource.*;

import io.swagger.annotations.*;
import io.swagger.jaxrs.Reader;
import io.swagger.jaxrs.config.BeanConfig;

import javax.ejb.Stateless;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;


@Stateless
@SwaggerDefinition(info = @Info(
        title = "EBS Onlineshop Backend REST- API",
        description = "JavaEE Backend REST API for ebs onlineshop",
        version = "1.0.0",
        contact = @Contact(
                name = "Thamilini Vickneswaranathan",
                email = "info@vsoft.com",
                url = "https://www.vsoft.com"
        ))
)
@Api(value = "EBS Onlineshop Backend REST- API", authorizations = @Authorization(("jwt-auth")))
@ApplicationPath("/api")
public class RestApplication extends Application {
    private static final AppProperties appProperties = new AppProperties();

    public RestApplication() {
        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setBasePath("/ebs/api");
        beanConfig.setResourcePackage("ebs");
        beanConfig.setScan(true);
    }

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();

        classes.add(EnumResource.class);
        classes.add(CategoryResource.class);
        classes.add(ArticleResource.class);
        classes.add(SubCategoryResource.class);
        classes.add(PublisherResource.class);
        classes.add(AppProperties.class);

        classes.add(JWTService.class);
        classes.add(JWTAuthedFilter.class);
        classes.add(CorsFilter.class);

        classes.add(io.swagger.jaxrs.listing.ApiListingResource.class);
        classes.add(io.swagger.jaxrs.listing.SwaggerSerializers.class);
        classes.add(SwaggerConfigs.class);

        return classes;
    }
}
