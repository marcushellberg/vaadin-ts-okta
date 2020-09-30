package com.vaadin.tutorial.backend;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
  @NotEmpty
  private String firstName = "";

  @NotEmpty
  private String lastName = "";

  @NotNull
  private String status;

  @NotNull
  private String company;

  @Email
  @NotEmpty
  private String email = "";
}
