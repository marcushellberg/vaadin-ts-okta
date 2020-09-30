package com.vaadin.tutorial.views.list;

import java.util.List;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.tutorial.backend.Contact;
import com.vaadin.tutorial.backend.ContactService;

import lombok.RequiredArgsConstructor;

@Endpoint
@RequiredArgsConstructor
public class ListEndpoint {

  private final ContactService service;

  public List<Contact> getContacts() {
    return service.getContacts();
  }

}
