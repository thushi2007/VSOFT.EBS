package ebs.api.jwt;

import java.io.IOException;
import java.lang.reflect.Method;
import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

@Provider
@JWTAuthed
@Priority(Priorities.AUTHENTICATION)
public class JWTAuthedFilter implements ContainerRequestFilter {

    @Inject
    private JWTService jwtService;

    @Context
    ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        try {
            Method resourceMethod = resourceInfo.getResourceMethod();
            JWTAuthed methodAnnot = resourceMethod.getAnnotation(JWTAuthed.class);
            String[] roles = new String[]{};

            if (methodAnnot != null) {
                String token = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
                roles = methodAnnot.roles();

                if (token != null) {
                    token = token.replace("Bearer ", "");
                }

                if (token == null || !jwtService.validateToken(token, roles)) {
                    requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
                }
            }

        } catch (Exception e) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }
}
