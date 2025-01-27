const Analytics = "Analytics";
const Documentation = "Dokumentation";
const Email = "E-Mail";
const Password = "Passwort";
const Provider = "Methode";
const ResetPasswordToken = "Passwort-Token zurücksetzen";
const Role = "Rolle";
const Username = "Benutzername";
const Users = "Benutzer";
const anErrorOccurred = "Ups! Ein unbekannter Fehler ist aufgetreten. Versuche es erneut.";
const clearLabel = "Zurücksetzen";
const or = "ODER";
const skipToContent = "Zu Inhalt springen";
const submit = "Senden";
const de = {
	Analytics: Analytics,
	"Auth.components.Oops.text": "Dein Account wurde deaktiviert",
	"Auth.components.Oops.text.admin": "Falls das ein Fehler war, kontaktiere bitte deinen Administrator.",
	"Auth.components.Oops.title": "Ups...",
	"Auth.form.button.go-home": "ZURÜCK ZUR STARTSEITE",
	"Auth.form.button.login": "Login",
	"Auth.form.button.login.providers.error": "Durch den ausgewählten Anbieter können wir dich nicht verbinden",
	"Auth.form.button.login.strapi": "Per Strapi einloggen",
	"Auth.form.button.password-recovery": "Passwort zurücksetzen",
	"Auth.form.button.register": "Los geht's",
	"Auth.form.confirmPassword.label": "Passwort bestätigen",
	"Auth.form.currentPassword.label": "Aktuelles Passwort",
	"Auth.form.email.label": "E-Mail",
	"Auth.form.email.placeholder": "z.B. max.mustermann@gmail.com",
	"Auth.form.error.blocked": "Dein Account wurde vom Administrator blockiert.",
	"Auth.form.error.code.provide": "Ungültiger Code.",
	"Auth.form.error.confirmed": "Deine Account E-Mail-Adresse ist nicht bestätigt.",
	"Auth.form.error.email.invalid": "Diese E-Mail-Adresse ist ungültig.",
	"Auth.form.error.email.provide": "Bitte nenne uns deinen Benutzernamen oder deine E-Mail-Adresse.",
	"Auth.form.error.email.taken": "Diese E-Mail-Adresse wird bereits genutzt",
	"Auth.form.error.invalid": "Ungültige Login-Daten.",
	"Auth.form.error.params.provide": "Ungültige Parameter.",
	"Auth.form.error.password.format": "Dein Passwort darf nicht mehr als dreimal das Symbol `$` enthalten.",
	"Auth.form.error.password.local": "Dieser Benutzer hat kein lokales Passwort. Bitte logge dich mithilfe des Providers ein, der bei der Erstellung des Accounts genutzt wurde.",
	"Auth.form.error.password.matching": "Passwörter sind nicht gleich.",
	"Auth.form.error.password.provide": "Bitte gib dein Passwort ein.",
	"Auth.form.error.ratelimit": "Zu viele Versuche, bitte versuche es in einer Minute erneut.",
	"Auth.form.error.user.not-exist": "Diese E-Mail-Adresse ist nicht registriert.",
	"Auth.form.error.username.taken": "Dieser Benutzername ist bereits vergeben",
	"Auth.form.firstname.label": "Vorname",
	"Auth.form.firstname.placeholder": "z.B. Max",
	"Auth.form.forgot-password.email.label": "Gib deine E-Mail ein",
	"Auth.form.forgot-password.email.label.success": "Eine E-Mail wurde erfolgreich verschickt an",
	"Auth.form.lastname.label": "Nachname",
	"Auth.form.lastname.placeholder": "z.B. Mustermann",
	"Auth.form.password.hint": "Das Passwort muss mindestens 8 Zeichen, einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten",
	"Auth.form.register.news.label": "Halte mich über die neuen Features und anstehenden Verbesserungen auf dem Laufenden (damit werden die {terms} und die {policy} akzeptiert).",
	"Auth.form.register.subtitle": "Deine Zugangsdaten werden nur verwendet, um dich im Admin Panel einzuloggen. Alle Daten werden in der lokalen Datenbank gespeichert.",
	"Auth.form.rememberMe.label": "Eingeloggt bleiben",
	"Auth.form.username.label": "Benutzername",
	"Auth.form.username.placeholder": "z.B. Max_Mustermann",
	"Auth.form.welcome.subtitle": "Logge dich in deinen Strapi Account ein",
	"Auth.form.welcome.title": "Willkommen!",
	"Auth.link.ready": "Bereit für den Login?",
	"Auth.link.signin": "Einloggen",
	"Auth.link.signin.account": "Account bereits vorhanden?",
	"Auth.login.sso.divider": "Oder einloggen mit",
	"Auth.login.sso.loading": "Anbieter werden geladen...",
	"Auth.login.sso.subtitle": "Per SSO einloggen",
	"Auth.privacy-policy-agreement.policy": "Datenschutzerklärung",
	"Auth.privacy-policy-agreement.terms": "Nutzungsbedingungen",
	"Auth.reset-password.title": "Passwort zurücksetzen",
	"Content Manager": "Inhalts-Manager",
	"Content Type Builder": "Inhaltstyp-Editor",
	Documentation: Documentation,
	Email: Email,
	"Files Upload": "Dateien hochladen",
	"HomePage.head.title": "Startseite",
	"HomePage.roadmap": "Siehe unsere Roadmap",
	"HomePage.welcome.congrats": "Herzlichen Glückwunsch!",
	"HomePage.welcome.congrats.content": "Angemeldet als erster Administrator. Um die leistungsstarken Funktionen von Strapi zu entdecken,",
	"HomePage.welcome.congrats.content.bold": "empfehlen wir Ihren ersten Inhaltstyp zu erstellen.",
	"Media Library": "Medienbibliothek",
	"New entry": "Neuer Eintrag",
	Password: Password,
	Provider: Provider,
	ResetPasswordToken: ResetPasswordToken,
	Role: Role,
	"Roles & Permissions": "Rollen & Berechtigungen",
	"Roles.ListPage.notification.delete-all-not-allowed": "Manche Rollen konnten nicht gelöscht werden, da sie mit Benutzern verknüpft sind",
	"Roles.ListPage.notification.delete-not-allowed": "Eine Rolle, die mit einem Benutzer verknüpft ist, kann nicht gelöscht werden",
	"Roles.RoleRow.select-all": "Wähle {name} für Mehrfach-Aktionen",
	"Roles.RoleRow.user-count": "Benutzer",
	"Roles.components.List.empty.withSearch": "Es gibt keine Rolle die der Suche ({search}) entspricht...",
	"Settings.PageTitle": "Einstellungen - {name}",
	"Settings.apiTokens.addFirstToken": "Deinen ersten API-Token hinzufügen",
	"Settings.apiTokens.addNewToken": "Neuen API-Token hinzufügen",
	"Settings.tokens.copy.editMessage": "Aus Sicherheitsgründen kannst du deinen Token nur einmal sehen.",
	"Settings.tokens.copy.editTitle": "Auf diesen Token kann nicht mehr zugegriffen werden.",
	"Settings.tokens.copy.lastWarning": "Stell sicher, dass dieser Token kopiert wurde, da du ihn nicht noch einmal sehen können wirst!",
	"Settings.apiTokens.create": "Neuen API-Token erstellen",
	"Settings.apiTokens.description": "Liste der generierten Tokens mit Zugriff auf die API",
	"Settings.apiTokens.emptyStateLayout": "Du hast noch keinen Inhalt...",
	"Settings.tokens.notification.copied": "Token wurde in die Zwischenablage kopiert.",
	"Settings.apiTokens.title": "API-Tokens",
	"Settings.tokens.types.full-access": "Voller Zugriff",
	"Settings.tokens.types.read-only": "Nur Lesezugriff",
	"Settings.application.description": "Globale Informationen über die Administrationsoberfläche",
	"Settings.application.edition-title": "Aktuelle Version",
	"Settings.application.get-help": "Hilfe",
	"Settings.application.link-pricing": "Alle Preisgestaltungen anzeigen",
	"Settings.application.link-upgrade": "Deine Administrationsoberfläche aktualisieren",
	"Settings.application.node-version": "node version",
	"Settings.application.strapi-version": "strapi version",
	"Settings.application.strapiVersion": "strapi version",
	"Settings.application.title": "Übersicht",
	"Settings.error": "Fehler",
	"Settings.global": "Globale Einstellungen",
	"Settings.permissions": "Administrationsoberfläche",
	"Settings.permissions.category": "Berechtigungseinstellungen für die {category}",
	"Settings.permissions.category.plugins": "Berechtigungseinstellungen für das {category} Plugin",
	"Settings.permissions.conditions.anytime": "Jederzeit",
	"Settings.permissions.conditions.apply": "Anwenden",
	"Settings.permissions.conditions.can": "Kann",
	"Settings.permissions.conditions.conditions": "Bedingungen definieren",
	"Settings.permissions.conditions.links": "Links",
	"Settings.permissions.conditions.no-actions": "Keine Aktionen",
	"Settings.permissions.conditions.none-selected": "Jederzeit",
	"Settings.permissions.conditions.or": "ODER",
	"Settings.permissions.conditions.when": "Wenn",
	"Settings.permissions.select-all-by-permission": "Wähle alle {label}-Berechtigungen",
	"Settings.permissions.select-by-permission": "Wähle {label}-Berechtigung",
	"Settings.permissions.users.create": "Benutzer einladen",
	"Settings.permissions.users.email": "E-Mail",
	"Settings.permissions.users.firstname": "Vorname",
	"Settings.permissions.users.lastname": "Nachname",
	"Settings.permissions.users.form.sso": "Mit SSO einloggen",
	"Settings.permissions.users.form.sso.description": "Nutzer können sich per SSO einloggen wenn aktiviert (ON)",
	"Settings.permissions.users.listview.header.subtitle": "Alle Nutzer mit Zugriff auf diese Administrationsoberfläche",
	"Settings.permissions.users.tabs.label": "Tab Berechtigungen",
	"Settings.profile.form.notify.data.loaded": "Deine Profildaten wurden geladen",
	"Settings.profile.form.section.experience.clear.select": "Ausgewählte Sprache der Oberfläche zurücksetzen",
	"Settings.profile.form.section.experience.here": "hier",
	"Settings.profile.form.section.experience.interfaceLanguage": "Sprache der Oberfläche",
	"Settings.profile.form.section.experience.interfaceLanguage.hint": "Dies wird die Oberfläche für dich in der ausgewählten Sprache darstellen.",
	"Settings.profile.form.section.experience.interfaceLanguageHelp": "Diese Einstellungen werden nur für dich angewandt. Mehr Informationen dazu {here}.",
	"Settings.profile.form.section.experience.mode.label": "Modus der Oberfläche",
	"Settings.profile.form.section.experience.mode.hint": "Zeigt die Oberfläche im gewählten Modus.",
	"Settings.profile.form.section.experience.mode.option-label": "{name}-Modus",
	"Settings.profile.form.section.experience.title": "Bedienung",
	"Settings.profile.form.section.head.title": "Nutzerprofil",
	"Settings.profile.form.section.profile.page.title": "Profil-Seite",
	"Settings.roles.create.description": "Die Berechtigungen einer Rolle festlegen",
	"Settings.roles.create.title": "Rolle erstellen",
	"Settings.roles.created": "Rolle erstellt",
	"Settings.roles.edit.title": "Rolle bearbeiten",
	"Settings.roles.form.button.users-with-role": "Benutzer mit dieser Rolle",
	"Settings.roles.form.created": "Erstellt",
	"Settings.roles.form.description": "Name und Beschreibung der Rolle",
	"Settings.roles.form.permission.property-label": "{label} Berechtigungen",
	"Settings.roles.form.permissions.attributesPermissions": "Felderberechtigungen",
	"Settings.roles.form.permissions.create": "Erstellen",
	"Settings.roles.form.permissions.delete": "Löschen",
	"Settings.roles.form.permissions.publish": "Veröffentlichen",
	"Settings.roles.form.permissions.read": "Lesen",
	"Settings.roles.form.permissions.update": "Ändern",
	"Settings.roles.list.button.add": "Neue Rolle hinzufügen",
	"Settings.roles.list.description": "Liste der Rollen",
	"Settings.roles.title.singular": "Rolle",
	"Settings.sso.description": "Einstellungen des Single Sign-On Features konfigurieren.",
	"Settings.sso.form.defaultRole.description": "Die Standard-Rolle wird dem neu erstellten Nutzer zugewiesen",
	"Settings.sso.form.defaultRole.description-not-allowed": "Du hast keine Lese-Berechtigung für die Admin-Rollen",
	"Settings.sso.form.defaultRole.label": "Standard-Rolle",
	"Settings.sso.form.registration.description": "Neuen Nutzer beim Einloggen über SSO erstellen wenn noch kein Account existiert",
	"Settings.sso.form.registration.label": "Auto-Registrierung",
	"Settings.sso.title": "Single Sign-On",
	"Settings.webhooks.create": "Webhook erstellen",
	"Settings.webhooks.create.header": "Neuen Header erstellen",
	"Settings.webhooks.created": "Webhook erstellt",
	"Settings.webhooks.event.publish-tooltip": "Entwurf/Veröffentlichen muss für dieses Event aktiviert sein",
	"Settings.webhooks.events.create": "Erstellen",
	"Settings.webhooks.events.update": "Aktualisieren",
	"Settings.webhooks.form.events": "Events",
	"Settings.webhooks.form.headers": "Header",
	"Settings.webhooks.form.url": "Url",
	"Settings.webhooks.headers.remove": "Header {number} entfernen",
	"Settings.webhooks.key": "Key",
	"Settings.webhooks.list.button.add": "Neuen Webhook hinzufügen",
	"Settings.webhooks.list.description": "POST-Benachrichtigungen bei Änderungen empfangen.",
	"Settings.webhooks.list.empty.description": "Ersten dieser Liste hinzufügen.",
	"Settings.webhooks.list.empty.link": "Siehe unsere Dokumentation",
	"Settings.webhooks.list.empty.title": "Noch keine Webhooks",
	"Settings.webhooks.list.th.actions": "Aktionen",
	"Settings.webhooks.list.th.status": "Status",
	"Settings.webhooks.singular": "Webhook",
	"Settings.webhooks.title": "Webhooks",
	"Settings.webhooks.to.delete": "{webhooksToDeleteLength, plural, one {# Datei} other {# Dateien}} ausgewählt",
	"Settings.webhooks.trigger": "Trigger",
	"Settings.webhooks.trigger.cancel": "Trigger abbrechen",
	"Settings.webhooks.trigger.pending": "Ausstehend ...",
	"Settings.webhooks.trigger.save": "Zur Ausführung speichern",
	"Settings.webhooks.trigger.success": "Erfolg!",
	"Settings.webhooks.trigger.success.label": "Trigger war erfolgreich",
	"Settings.webhooks.trigger.test": "Test-Trigger",
	"Settings.webhooks.trigger.title": "Speichere vor Trigger",
	"Settings.webhooks.value": "Wert",
	"Usecase.back-end": "Backend-Entwickler",
	"Usecase.button.skip": "Diese Frage überspringen",
	"Usecase.content-creator": "Content Creator",
	"Usecase.front-end": "Frontend-Entwickler",
	"Usecase.full-stack": "Full-stack-Entwickler",
	"Usecase.input.work-type": "Welche Rolle beschreibt deine Position am besten?",
	"Usecase.notification.success.project-created": "Projekt wurde erfolgreich erstellt",
	"Usecase.other": "Sonstige",
	"Usecase.title": "Erzähle uns etwas mehr von dir",
	Username: Username,
	Users: Users,
	"Users & Permissions": "Benutzer & Berechtigungen",
	"Users.components.List.empty": "Noch keine Nutzer…",
	"Users.components.List.empty.withFilters": "Es gibt keine Nutzer die den Filtern entsprechen...",
	"Users.components.List.empty.withSearch": "Es gibt keine Nutzer die der Suche ({search}) entsprechen...",
	"admin.pages.MarketPlacePage.head": "Marketplace - Plugins",
	"admin.pages.MarketPlacePage.plugin.copy": "Installations-Befehl kopieren",
	"admin.pages.MarketPlacePage.plugin.copy.success": "Installations-Befehl ist bereit, in deinem Terminal eingefügt zu werden",
	"admin.pages.MarketPlacePage.plugin.info": "Mehr erfahren",
	"admin.pages.MarketPlacePage.plugin.info.label": "Mehr über {pluginName} erfahren",
	"admin.pages.MarketPlacePage.plugin.info.text": "Mehr erfahren",
	"admin.pages.MarketPlacePage.plugin.installed": "Installiert",
	"admin.pages.MarketPlacePage.plugin.tooltip.madeByStrapi": "Erstellt von Strapi",
	"admin.pages.MarketPlacePage.plugin.tooltip.verified": "Plugin verifiziert von Strapi",
	"admin.pages.MarketPlacePage.search.clear": "Plugin-Suche zurücksetzen",
	"admin.pages.MarketPlacePage.search.empty": "Keine Ergebnisse für \"{target}\"",
	"admin.pages.MarketPlacePage.search.placeholder": "Suche nach einem Plugin",
	"admin.pages.MarketPlacePage.submit.plugin.link": "Eigenes Plugin einreichen",
	"admin.pages.MarketPlacePage.subtitle": "Mache mehr mit Strapi",
	anErrorOccurred: anErrorOccurred,
	"app.component.CopyToClipboard.label": "In Zwischenablage kopieren",
	"app.component.search.label": "Suche nach {target}",
	"app.component.table.duplicate": "Dupliziere {target}",
	"app.component.table.edit": "Bearbeite {target}",
	"app.component.table.select.one-entry": "Selektiere {target}",
	"app.components.BlockLink.blog": "Blog",
	"app.components.BlockLink.blog.content": "Lies die neuesten Nachrichten über Strapi und das Ökosystem.",
	"app.components.BlockLink.code": "Code-Beispiele",
	"app.components.BlockLink.code.content": "Lerne duch das Testen von echten Projekten, die von der Community entwickelt wurden.",
	"app.components.BlockLink.documentation.content": "Entdecke grundlegende Konzepte, Anleitungen und Anweisungen.",
	"app.components.BlockLink.tutorial": "Tutorials",
	"app.components.BlockLink.tutorial.content": "Folge Schritt-für-Schritt Anleitungen die zeigen, wie du Strapi nutzen und anpassen kannst.",
	"app.components.Button.cancel": "Abbrechen",
	"app.components.Button.confirm": "Bestätigen",
	"app.components.Button.reset": "Zurücksetzen",
	"app.components.ComingSoonPage.comingSoon": "Bald verfügbar",
	"app.components.ConfirmDialog.title": "Bestätigen",
	"app.components.DownloadInfo.download": "Download wird ausgeführt...",
	"app.components.DownloadInfo.text": "Dies könnte kurz dauern. Danke für deine Geduld.",
	"app.components.EmptyAttributes.title": "Bisher gibt es noch keine Felder",
	"app.components.EmptyStateLayout.content-document": "Kein Inhalt gefunden",
	"app.components.EmptyStateLayout.content-permissions": "Du hast keine ausreichenden Berechtigungen, um auf diesen Inhalt zuzugreifen",
	"app.components.GuidedTour.CM.create.content": "<p>Erstelle und verwalte all deinen Inhalt hier im Content Manager.</p><p>Beispiel: Im Beispiel der Blog-Website, kann man einen Artikel schreiben, speichern und veröffentlichen.</p><p>💡 Kleiner Tipp: Vergiss nicht, beim Inhalt den du erstellst, \"Veröffentlichen\" zu drücken.</p>",
	"app.components.GuidedTour.CM.create.title": "⚡️ Erstelle Inhalt",
	"app.components.GuidedTour.CM.success.content": "<p>Super, ein letzter Schritt noch!</p><b>🚀  Sehe deinen Inhalt in Aktion</b>",
	"app.components.GuidedTour.CM.success.cta.title": "Teste die API",
	"app.components.GuidedTour.CM.success.title": "Schritt 2: Abgeschlossen ✅",
	"app.components.GuidedTour.CTB.create.content": "<p>Sammlungen helfen dir, mehrere Einträge zu managen, während Einzel-Einträge dazu da sind, nur einen Eintrag zu managen.</p> <p>Bsp: Für eine Blog-Website wären die Artikel eine Sammlung, während die Homepage ein Einzel-Eintrag wäre.</p>",
	"app.components.GuidedTour.CTB.create.cta.title": "Einen Inhaltstyp bauen",
	"app.components.GuidedTour.CTB.create.title": "🧠 Erstelle deinen ersten Inhaltstyp",
	"app.components.GuidedTour.CTB.success.content": "<p>Sehr gut!</p><b>⚡️ Was willst du mit der Welt teilen?</b>",
	"app.components.GuidedTour.CTB.success.title": "Schritt 1: Abgeschlossen ✅",
	"app.components.GuidedTour.apiTokens.create.content": "<p>Generiere einen Authentifizierungs-Token hier und greife auf den Inhalt, den du gerade erstellt hast, zu.</p>",
	"app.components.GuidedTour.apiTokens.create.cta.title": "Generiere einen API-Token",
	"app.components.GuidedTour.apiTokens.create.title": "🚀 Sehe Inhalt in Aktion",
	"app.components.GuidedTour.apiTokens.success.content": "<p>Sehe Inhalt in Aktion indem du einen HTTP-Request machst:</p><ul><li><p>Zu dieser URL: <light>https://'<'YOUR_DOMAIN'>'/api/'<'YOUR_CT'>'</light></p></li><li><p>Mit dem Header: <light>Authorization: bearer '<'YOUR_API_TOKEN'>'</light></p></li></ul><p>Mehr dazu, wie du mit deinem Inhalt interagierst, liest du in der <documentationLink>Dokumentation</documentationLink>.</p>",
	"app.components.GuidedTour.apiTokens.success.cta.title": "Zurück zur Startseite",
	"app.components.GuidedTour.apiTokens.success.title": "Schritt 3: Abgeschlossen ✅",
	"app.components.GuidedTour.create-content": "Erstelle Inhalt",
	"app.components.GuidedTour.home.CM.title": "⚡️ Was willst du mit der Welt teilen?",
	"app.components.GuidedTour.home.CTB.cta.title": "Gehe zum Content type Builder",
	"app.components.GuidedTour.home.CTB.title": "🧠 Baue die Struktur des Inhalts",
	"app.components.GuidedTour.home.apiTokens.cta.title": "Teste die API",
	"app.components.GuidedTour.skip": "Tour überspringen",
	"app.components.GuidedTour.title": "3 Schritte zum Loslegen",
	"app.components.HomePage.button.blog": "Mehr dazu im Blog",
	"app.components.HomePage.community": "Finde die Community im Web",
	"app.components.HomePage.community.content": "Diskutiere mit Teammitgliedern, Mitwirkenden und Entwicklern auf verschiedenen Kanälen.",
	"app.components.HomePage.create": "Ersten Content-Type erstellen",
	"app.components.HomePage.roadmap": "Zu unserer Roadmap",
	"app.components.HomePage.welcome": "Willkommen an Bord 👋",
	"app.components.HomePage.welcome.again": "Willkommen 👋",
	"app.components.HomePage.welcomeBlock.content": "Wir freuen uns, dich als Mitglied der Community zu haben. Wir sind offen für Feedback, senden uns einfach eine direkt Nachricht in ",
	"app.components.HomePage.welcomeBlock.content.again": "Wir hoffen, dass du Fortschritte bei deinem Projekt machst ... Lese das Neueste über Strapi. Wir geben unser Bestes, um das Produkt auf der Grundlage deines Feedbacks zu verbessern.",
	"app.components.HomePage.welcomeBlock.content.issues": "Ticket.",
	"app.components.HomePage.welcomeBlock.content.raise": " oder eröffne ",
	"app.components.ImgPreview.hint": "Ziehe eine Datei hierher oder {browse} eine Datei zum hochladen aus",
	"app.components.ImgPreview.hint.browse": "wähle",
	"app.components.InputFile.newFile": "Neue Datei hinzufügen",
	"app.components.InputFileDetails.open": "In einem neuen Tab öffnen",
	"app.components.InputFileDetails.originalName": "Original Name:",
	"app.components.InputFileDetails.remove": "Entferne diese Datei",
	"app.components.InputFileDetails.size": "Größe:",
	"app.components.InstallPluginPage.Download.description": "Es kann einige Sekunden dauern, bis das Plugin heruntergeladen und installiert ist.",
	"app.components.InstallPluginPage.Download.title": "Herunterladen...",
	"app.components.InstallPluginPage.description": "Erweitere deine App ganz einfach.",
	"app.components.LeftMenu.collapse": "Navigationsleiste einklappen",
	"app.components.LeftMenu.expand": "Navigationsleiste ausklappen",
	"app.components.LeftMenu.logout": "Abmelden",
	"app.components.LeftMenu.navbrand.title": "Strapi Dashboard",
	"app.components.LeftMenu.navbrand.workplace": "Arbeitsplatz",
	"app.components.LeftMenuFooter.help": "Hilfe",
	"app.components.LeftMenuFooter.poweredBy": "Powered by ",
	"app.components.LeftMenuLinkContainer.collectionTypes": "Sammlungen",
	"app.components.LeftMenuLinkContainer.configuration": "Konfiguration",
	"app.components.LeftMenuLinkContainer.general": "Allgemein",
	"app.components.LeftMenuLinkContainer.noPluginsInstalled": "Noch keine Plugins installiert",
	"app.components.LeftMenuLinkContainer.plugins": "Plugins",
	"app.components.LeftMenuLinkContainer.singleTypes": "Einzel-Einträge",
	"app.components.ListPluginsPage.deletePlugin.description": "Das Deinstallieren des Plugins kann einen Augenblick dauern.",
	"app.components.ListPluginsPage.deletePlugin.title": "Deinstalliere",
	"app.components.ListPluginsPage.description": "Liste aller im Projekt installierten Plugins.",
	"app.components.ListPluginsPage.head.title": "Plugins anzeigen",
	"app.components.Logout.logout": "Ausloggen",
	"app.components.Logout.profile": "Profil",
	"app.components.MarketplaceBanner": "Entdecke von der Community entwickelte Plugins und noch viel mehr Dinge, um deinem Projekt zu helfen, auf Strapi Awesome.",
	"app.components.MarketplaceBanner.image.alt": "ein Strapi-Raketen-Logo",
	"app.components.MarketplaceBanner.link": "Jetzt entdecken",
	"app.components.NotFoundPage.back": "Zurück zur Homepage",
	"app.components.NotFoundPage.description": "Nicht gefunden",
	"app.components.Official": "Offiziell",
	"app.components.Onboarding.help.button": "Hilfe-Button",
	"app.components.Onboarding.label.completed": "% abgeschlossen",
	"app.components.Onboarding.title": "Videos zum Einstieg",
	"app.components.PluginCard.Button.label.download": "Download",
	"app.components.PluginCard.Button.label.install": "Bereits installiert",
	"app.components.PluginCard.PopUpWarning.install.impossible.autoReload.needed": "Die AutoReload-Funktion muss nicht aktiviert sein. Bitte die App mit `yarn develop` starten.",
	"app.components.PluginCard.PopUpWarning.install.impossible.confirm": "Ich verstehe, dass",
	"app.components.PluginCard.PopUpWarning.install.impossible.environment": "Aus Sicherheitsgründen kann ein Plugin nur in einer Entwicklungsumgebung heruntergeladen werden.",
	"app.components.PluginCard.PopUpWarning.install.impossible.title": "Das Herunterladen ist nicht möglich.",
	"app.components.PluginCard.compatible": "Mit dieser App kompatibel",
	"app.components.PluginCard.compatibleCommunity": "Mit der Community kompatibel",
	"app.components.PluginCard.more-details": "Mehr Details",
	"app.components.ToggleCheckbox.off-label": "Nein",
	"app.components.ToggleCheckbox.on-label": "Ja",
	"app.components.Users.MagicLink.connect": "Diesen Link dem Benutzer zum Registrieren schicken.",
	"app.components.Users.MagicLink.connect.sso": "Sende dem Benutzer diesen Link, das erste Login kann über einen SSO-Anbeiter gemacht werden",
	"app.components.Users.ModalCreateBody.block-title.details": "Details",
	"app.components.Users.ModalCreateBody.block-title.roles": "Rolle des Benutzers",
	"app.components.Users.ModalCreateBody.block-title.roles.description": "Dein Benutzer kann eine oder mehrere Rollen haben",
	"app.components.Users.SortPicker.button-label": "Sortieren nach",
	"app.components.Users.SortPicker.sortby.email_asc": "E-Mail (A nach Z)",
	"app.components.Users.SortPicker.sortby.email_desc": "E-Mail (Z nach A)",
	"app.components.Users.SortPicker.sortby.firstname_asc": "Vorname (A nach Z)",
	"app.components.Users.SortPicker.sortby.firstname_desc": "Vorname (Z nach A)",
	"app.components.Users.SortPicker.sortby.lastname_asc": "Nachname (A nach Z)",
	"app.components.Users.SortPicker.sortby.lastname_desc": "Nachname (Z nach A)",
	"app.components.Users.SortPicker.sortby.username_asc": "Benutzername (A nach Z)",
	"app.components.Users.SortPicker.sortby.username_desc": "Benutzername (Z nach A)",
	"app.components.listPlugins.button": "Neues Plugin hinzufügen",
	"app.components.listPlugins.title.none": "Es ist kein Plugin installiert",
	"app.components.listPluginsPage.deletePlugin.error": "Beim Entfernen des Plugins ist ein Fehler aufgetreten",
	"app.containers.App.notification.error.init": "Beim Aufruf der API ist ein Fehler aufgetreten.",
	"app.containers.AuthPage.ForgotPasswordSuccess.text.contact-admin": "Bitte den Administrator kontaktieren, sollte der Link nicht ankommen.",
	"app.containers.AuthPage.ForgotPasswordSuccess.text.email": "Es kann ein paar Minuten dauern, bis der Wiederherstellungslink ankommt.",
	"app.containers.AuthPage.ForgotPasswordSuccess.title": "E-Mail versendet",
	"app.containers.Users.EditPage.form.active.label": "Aktiv",
	"app.containers.Users.EditPage.header.label": "Bearbeite {name}",
	"app.containers.Users.EditPage.header.label-loading": "Bearbeite Nutzer",
	"app.containers.Users.EditPage.roles-bloc-title": "Zugewiesene Rollen",
	"app.containers.Users.ModalForm.footer.button-success": "Nutzer erstellen",
	"app.links.configure-view": "Anzeige konfigurieren",
	"app.page.not.found": "Oh nein! Wir konnten die Seite, nach der du suchst, nicht finden...",
	"app.static.links.cheatsheet": "CheatSheet",
	"app.utils.SelectOption.defaultMessage": " ",
	"app.utils.add-filter": "Filter hinzufügen",
	"app.utils.close-label": "Schließen",
	"app.utils.defaultMessage": " ",
	"app.utils.duplicate": "Duplizieren",
	"app.utils.edit": "Bearbeiten",
	"app.utils.errors.file-too-big.message": "Datei ist zu groß",
	"app.utils.filter-value": "Filter-Wert",
	"app.utils.filters": "Filter",
	"app.utils.notify.data-loaded": "{target} wurde geladen",
	"app.utils.placeholder.defaultMessage": " ",
	"app.utils.publish": "Veröffentlichen",
	"app.utils.select-all": "Alles auswählen",
	"app.utils.select-field": "Feld auswählen",
	"app.utils.select-filter": "Filter auswählen",
	"app.utils.unpublish": "Nicht veröffentlichen",
	clearLabel: clearLabel,
	"coming.soon": "Dieser Inhalt ist aktuell unter Bearbeitung und wird in ein paar Wochen zurück sein!",
	"component.Input.error.validation.integer": "Der Wert muss eine Ganzzahl sein",
	"components.AutoReloadBlocker.description": "Strapi mit einem der folgenden Befehle ausführen:",
	"components.AutoReloadBlocker.header": "Dieses Plugin benötigt das Neuladen-Feature.",
	"components.ErrorBoundary.title": "Etwas ist falsch gelaufen...",
	"components.FilterOptions.FILTER_TYPES.$contains": "enthält",
	"components.FilterOptions.FILTER_TYPES.$containsi": "enthält (Groß- und Kleinschreibung wird nicht beachtet)",
	"components.FilterOptions.FILTER_TYPES.$endsWith": "endet mit",
	"components.FilterOptions.FILTER_TYPES.$endsWithi": "endet mit (Groß- und Kleinschreibung wird nicht beachtet)",
	"components.FilterOptions.FILTER_TYPES.$eq": "ist",
	"components.FilterOptions.FILTER_TYPES.$eqi": "ist (Groß- und Kleinschreibung wird nicht beachtet)",
	"components.FilterOptions.FILTER_TYPES.$gt": "ist größer als",
	"components.FilterOptions.FILTER_TYPES.$gte": "is größer als oder gleich",
	"components.FilterOptions.FILTER_TYPES.$lt": "is kleiner als",
	"components.FilterOptions.FILTER_TYPES.$lte": "is kleiner als oder gleich",
	"components.FilterOptions.FILTER_TYPES.$ne": "ist nicht",
	"components.FilterOptions.FILTER_TYPES.$nei": "ist nicht (Groß- und Kleinschreibung wird nicht beachtet)",
	"components.FilterOptions.FILTER_TYPES.$notContains": "enthält nicht",
	"components.FilterOptions.FILTER_TYPES.$notContainsi": "enthält nicht (Groß- und Kleinschreibung wird nicht beachtet)",
	"components.FilterOptions.FILTER_TYPES.$notNull": "ist nicht null",
	"components.FilterOptions.FILTER_TYPES.$null": "ist null",
	"components.FilterOptions.FILTER_TYPES.$startsWith": "startet mit",
	"components.FilterOptions.FILTER_TYPES.$startsWithi": "startet mit (Groß- und Kleinschreibung wird nicht beachtet)",
	"components.Input.error.attribute.key.taken": "Dieser Wert existiert bereits",
	"components.Input.error.attribute.sameKeyAndName": "Darf nicht gleich sein",
	"components.Input.error.attribute.taken": "Dieser Feldname ist bereits vergeben",
	"components.Input.error.contain.lowercase": "Das Passwort muss mindestens einen Kleinbuchstaben enthalten",
	"components.Input.error.contain.number": "Das Passwort muss mindestens eine Zahl enthalten",
	"components.Input.error.contain.uppercase": "Das Passwort muss mindestens einen Großbuchstaben enthalten",
	"components.Input.error.contentTypeName.taken": "Dieser Name existiert bereits",
	"components.Input.error.custom-error": "{errorMessage} ",
	"components.Input.error.password.noMatch": "Passwörter stimmen nicht überein",
	"components.Input.error.validation.email": "Das ist keine gültige E-Mail-Adresse",
	"components.Input.error.validation.json": "Dies entspricht nicht dem JSON-Format.",
	"components.Input.error.validation.lowercase": "Dieser Wert muss kleingeschreiben sein.",
	"components.Input.error.validation.max": "Dieser Wert ist zu hoch {max}.",
	"components.Input.error.validation.maxLength": "Dieser Wert ist zu lang {max}.",
	"components.Input.error.validation.min": "Dieser Wert ist zu niedrig {min}.",
	"components.Input.error.validation.minLength": "Dieser Wert ist zu kurz {min}.",
	"components.Input.error.validation.minSupMax": "Darf nicht höher sein",
	"components.Input.error.validation.regex": "Dieser Wert entspricht nicht dem RegEx.",
	"components.Input.error.validation.required": "Die Eingabe dieses Wertes ist erforderlich.",
	"components.Input.error.validation.unique": "Der Wert wird bereits genutzt.",
	"components.InputSelect.option.placeholder": "Hier wählen",
	"components.ListRow.empty": "Es gibt keine Daten.",
	"components.NotAllowedInput.text": "Keine Berechtigung dieses Feld zu sehen",
	"components.OverlayBlocker.description": "Es wird ein Feature verwendet, das einen Neustart des Servers erfordert. Bitte warte bis der Server neu gestartet wurde.",
	"components.OverlayBlocker.description.serverError": "Der Server sollte neu gestartet sein, bitte Logs im Terminal überprüfen.",
	"components.OverlayBlocker.title": "Warten auf Neustart.....",
	"components.OverlayBlocker.title.serverError": "Der Neustart dauert länger als erwartet.",
	"components.PageFooter.select": "Einträge pro Seite",
	"components.ProductionBlocker.description": "Aus Sicherheitsgründen müssen wir dieses Plugin in anderen Umgebungen deaktivieren.",
	"components.ProductionBlocker.header": "Dieses Plugin ist nur in der Entwicklungsumgebung verfügbar.",
	"components.Search.placeholder": "Suche...",
	"components.TableHeader.sort": "Sortiere nach {label}",
	"components.Wysiwyg.ToggleMode.markdown-mode": "Markdown-Modus",
	"components.Wysiwyg.ToggleMode.preview-mode": "Vorschau-Modus",
	"components.Wysiwyg.collapse": "Verkleinern",
	"components.Wysiwyg.selectOptions.H1": "Überschrift H1",
	"components.Wysiwyg.selectOptions.H2": "Überschrift H2",
	"components.Wysiwyg.selectOptions.H3": "Überschrift H3",
	"components.Wysiwyg.selectOptions.H4": "Überschrift H4",
	"components.Wysiwyg.selectOptions.H5": "Überschrift H5",
	"components.Wysiwyg.selectOptions.H6": "Überschrift H6",
	"components.Wysiwyg.selectOptions.title": "Überschrift hinzufügen",
	"components.WysiwygBottomControls.charactersIndicators": "Zeichen",
	"components.WysiwygBottomControls.fullscreen": "Vergrößern",
	"components.WysiwygBottomControls.uploadFiles": "Datei hierher ziehen, {browse} eine Datei zum hochladen auswählen oder aus der Zwischenablage einfügen.",
	"components.WysiwygBottomControls.uploadFiles.browse": "wähle",
	"components.pagination.go-to": "Gehe zu Seite {page}",
	"components.pagination.go-to-next": "Gehe zur nächsten Seite",
	"components.pagination.go-to-previous": "Gehe zur vorherigen Seite",
	"components.pagination.remaining-links": "Und {number} weitere Links",
	"components.popUpWarning.button.cancel": "Nein,abbrechen",
	"components.popUpWarning.button.confirm": "Ja,bestätigen",
	"components.popUpWarning.message": "Wirklich löschen?",
	"components.popUpWarning.title": "Bitte bestätigen",
	"form.button.done": "Fertig",
	"global.actions": "Aktionen",
	"global.back": "Zurück",
	"global.content-manager": "Inhalts-Manager",
	"global.continue": "Weiter",
	"global.delete": "Löschen",
	"global.delete-target": "Lösche {target}",
	"global.description": "Beschreibung",
	"global.details": "Details",
	"global.disabled": "Deaktiviert",
	"global.documentation": "Dokumentation",
	"global.enabled": "Aktiviert",
	"global.finish": "Fertig",
	"global.marketplace": "Marketplace",
	"global.name": "Name",
	"global.none": "Keine",
	"global.plugins": "Plugins",
	"global.profile": "Profil",
	"global.prompt.unsaved": "Seite wirklich verlassen? Alle Änderungen gehen hierdurch verloren.",
	"global.roles": "Rollen",
	"global.save": "Speichern",
	"global.see-more": "Mehr anzeigen",
	"global.select": "Auswählen",
	"global.select-all-entries": "Wähle alle Einträge aus",
	"global.settings": "Einstellungen",
	"global.type": "Typ",
	"global.users": "Benutzer",
	"notification.contentType.relations.conflict": "Content Type hat Konflikt in Beziehungen",
	"notification.default.title": "Information:",
	"notification.error": "Ein Fehler ist aufgetreten",
	"notification.error.layout": "Das Layout konnte nicht abgerufen werden.",
	"notification.form.error.fields": "Das Formular enthält Fehler",
	"notification.form.success.fields": "Änderungen gespeichert",
	"notification.link-copied": "Link in die Zwischenablage kopiert",
	"notification.permission.not-allowed-read": "Keine Berechtigung dieses Dokument einzusehen",
	"notification.success.delete": "Eintrag wurde gelöscht",
	"notification.success.saved": "Gespeichert",
	"notification.success.title": "Erfolg:",
	"notification.version.update.message": "Eine neue Strapi Version ist verfügbar",
	"notification.warning.title": "Warnung:",
	or: or,
	"request.error.model.unknown": "Dieses Schema existiert nicht",
	skipToContent: skipToContent,
	submit: submit
};

export { Analytics, Documentation, Email, Password, Provider, ResetPasswordToken, Role, Username, Users, anErrorOccurred, clearLabel, de as default, or, skipToContent, submit };
//# sourceMappingURL=de-DJOrgE3X.mjs.map
