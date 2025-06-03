package org.karate.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class RoleInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {
        String method = request.getMethod();

        // Разрешаем все GET-запросы
        if ("GET".equalsIgnoreCase(method)) {
            return true;
        }

        String roleHeader = request.getHeader("X-Role");

        // Для не-GET запросов требуем роль организатора
        if ("organizer".equalsIgnoreCase(roleHeader)) {
            return true;
        }

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getWriter().write("Access denied. Organizer role required.");
        return false;
    }
}