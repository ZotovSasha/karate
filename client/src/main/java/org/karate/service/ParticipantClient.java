package org.karate.service;

import org.karate.model.Participant;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

public class ParticipantClient {
    private static final String API_URL = "http://localhost:8080/api/participants";
    private final RestTemplate rest = new RestTemplate();

    public List<Participant> getAllParticipants() {
        return rest.exchange(
                API_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Participant>>() {}
        ).getBody();
    }

    public Participant createParticipant(Participant participant) {
        return rest.postForObject(API_URL, participant, Participant.class);
    }

    public void updateParticipant(Participant participant) {
        rest.put(API_URL + "/" + participant.getId(), participant);
    }

    public void deleteParticipant(Integer id) {
        rest.delete(API_URL + "/" + id);
    }

    public List<Participant> searchParticipants(String query) {
        try {
            return rest.exchange(
                    API_URL + "/search?query=" + URLEncoder.encode(query, StandardCharsets.UTF_8),
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Participant>>() {}
            ).getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.err.println("Ошибка при поиске: " + e.getStatusCode());
            System.err.println("Ответ сервера: " + e.getResponseBodyAsString());
            return Collections.emptyList();
        }
    }
}