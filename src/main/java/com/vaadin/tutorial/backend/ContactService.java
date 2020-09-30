package com.vaadin.tutorial.backend;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import lombok.Getter;

@Service
public class ContactService {

  @Getter
  private List<Contact> contacts;

  @PostConstruct
  public void init() {
    Random r = new Random(0);
    List<String> companies = Arrays.asList("Path-Way Electronics", "E-Tech Management", "Path-E-Tech Management");
    contacts = Stream.of("Gabrielle Patel", "Brian Robinson", "Eduardo Haugen", "Koen Johansen", "Alejandro Macdonald",
        "Angel Karlsson", "Yahir Gustavsson", "Haiden Svensson", "Emily Stewart", "Corinne Davis", "Ryann Davis",
        "Yurem Jackson", "Kelly Gustavsson", "Eileen Walker", "Katelyn Martin", "Israel Carlsson", "Quinn Hansson",
        "Makena Smith", "Danielle Watson", "Leland Harris", "Gunner Karlsen", "Jamar Olsson", "Lara Martin",
        "Ann Andersson", "Remington Andersson", "Rene Carlsson", "Elvis Olsen", "Solomon Olsen", "Jaydan Jackson",
        "Bernard Nilsen").map(name -> {
          String[] split = name.split(" ");
          Contact contact = new Contact();
          contact.setFirstName(split[0]);
          contact.setLastName(split[1]);
          contact.setStatus("Imported");
          contact.setCompany(companies.get(r.nextInt(companies.size())));
          String email = (contact.getFirstName() + "." + contact.getLastName() + "@"
              + contact.getCompany().replaceAll("[\\s-]", "") + ".com").toLowerCase();
          contact.setEmail(email);
          return contact;
        }).collect(Collectors.toList());
  }
}
