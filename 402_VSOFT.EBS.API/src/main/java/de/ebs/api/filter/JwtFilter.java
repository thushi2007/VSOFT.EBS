package de.ebs.api.filter;

//import com.okta.jwt.JwtVerifier;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "jwtFilter", urlPatterns = "/*")
public class JwtFilter implements Filter {

//    private JwtVerifier jwtVerifier;

    @Override
    public void init(FilterConfig filterConfig) {
//        try {
//            jwtVerifier = new JwtHelper()
//                    .setIssuerUrl("http://localhost:32839")
//                    .setClientId("webapi")
//                    .build();
//        } catch (IOException | ParseException e) {
//            System.err.print("Configuring JWT Verifier failed!");
//            e.printStackTrace();
//        }
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
//        System.out.println("In JwtFilter, path: " + request.getRequestURI());
//        // Get access token from authorization header
//        String authHeader = request.getHeader("authorization");
//        if (authHeader == null) {
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access denied.");
//            return;
//        } else {
//            String accessToken = authHeader.substring(authHeader.indexOf("Bearer ") + 7);
//            try {
//                Jwt jwt = jwtVerifier.decodeAccessToken(accessToken);
//                System.out.println("Hello, " + jwt.getClaims().get("sub"));
//            } catch (JoseException e) {
//                e.printStackTrace();
//                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access denied.");
//                return;
//            }
//        }
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }
}
