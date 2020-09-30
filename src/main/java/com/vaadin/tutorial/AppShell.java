package com.vaadin.tutorial;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;

/**
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 */
@PWA(name = "Okta Login", shortName = "okta--login")
public class AppShell implements AppShellConfigurator {
}
