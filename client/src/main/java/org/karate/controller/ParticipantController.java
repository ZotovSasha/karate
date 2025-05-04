package org.karate.controller;

import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.layout.GridPane;
import org.karate.model.Participant;
import org.karate.service.ParticipantClient;

import java.util.List;

public class ParticipantController {
    @FXML private TableView<Participant> participantTable;
    @FXML private TextField searchField;

    private final ParticipantClient client = new ParticipantClient();

    @FXML
    public void initialize() {
        refreshTable();
    }

    private void refreshTable() {
        participantTable.setItems(FXCollections.observableArrayList(client.getAllParticipants()));
    }

    @FXML
    private void handleSearch() {
        String query = searchField.getText().trim();
        if (!query.isEmpty()) {
            List<Participant> results = client.searchParticipants(query);
            Platform.runLater(() -> {
                participantTable.getItems().clear();
                participantTable.getItems().addAll(results);
            });
        }
    }

    @FXML
    private void handleAddParticipant() {
        showParticipantDialog(null);
    }

    @FXML
    private void handleEditParticipant() {
        Participant selected = participantTable.getSelectionModel().getSelectedItem();
        if (selected != null) {
            showParticipantDialog(selected);
        }
    }

    @FXML
    private void handleDeleteParticipant() {
        Participant selected = participantTable.getSelectionModel().getSelectedItem();
        if (selected != null) {
            client.deleteParticipant(selected.getId());
            refreshTable();
        }
    }

    private void showParticipantDialog(Participant participant) {
        Dialog<Participant> dialog = new Dialog<>();
        dialog.setTitle(participant == null ? "Новый участник" : "Редактирование");

        // Создание полей формы
        TextField lastNameField = new TextField(participant != null ? participant.getLastName() : "");
        TextField firstNameField = new TextField(participant != null ? participant.getFirstName() : "");
        TextField regionField = new TextField(participant != null ? participant.getRegion() : "");
        ComboBox<String> categoryCombo = new ComboBox<>();

        // Настройка layout
        GridPane grid = new GridPane();
        grid.setHgap(10);
        grid.setVgap(10);
        grid.addRow(0, new Label("Фамилия:"), lastNameField);
        grid.addRow(1, new Label("Имя:"), firstNameField);
        grid.addRow(2, new Label("Регион:"), regionField);
        grid.addRow(3, new Label("Категория:"), categoryCombo);
        dialog.getDialogPane().setContent(grid);

        // Кнопки
        ButtonType saveButtonType = new ButtonType("Сохранить", ButtonBar.ButtonData.OK_DONE);
        dialog.getDialogPane().getButtonTypes().addAll(saveButtonType, ButtonType.CANCEL);

        // Логика сохранения
        dialog.setResultConverter(buttonType -> {
            if (buttonType == saveButtonType) {
                Participant newParticipant = new Participant();
                newParticipant.setLastName(lastNameField.getText());
                newParticipant.setFirstName(firstNameField.getText());
                newParticipant.setRegion(regionField.getText());
                // Здесь должна быть логика для категории
                return newParticipant;
            }
            return null;
        });

        dialog.showAndWait().ifPresent(result -> {
            if (participant == null) {
                client.createParticipant(result);
            } else {
                result.setId(participant.getId());
                client.updateParticipant(result);
            }
            refreshTable();
        });
    }
}