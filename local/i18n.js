"use strict";

const languages = {
  ro: { locale: "ro-RO", name: "Română" },
  en: { locale: "en-GB", name: "English" },
  de: { locale: "de-DE", name: "Deutsch" },
  fr: { locale: "fr-FR", name: "Français" },
};
const languageKey = "jarvis.leave-planner.language";
let language = "ro";
try {
  const savedLanguage = localStorage.getItem(languageKey);
  if (Object.hasOwn(languages, savedLanguage)) language = savedLanguage;
} catch {
  // The language can still be changed for the current session.
}

const translations = new Map(`
Sari la conținut|Skip to content|Zum Inhalt springen|Aller au contenu
Limbă|Language|Sprache|Langue
Sold anual|Annual balance|Jahressaldo|Solde annuel
Disponibile|Available|Verfügbar|Disponibles
Rezervate|Reserved|Reserviert|Réservés
Efectuate|Taken|Genommen|Pris
zile de concediu|leave days|Urlaubstage|jours de congé
planificate și în așteptare|planned and pending|geplant und ausstehend|planifiés et en attente
zile confirmate|confirmed days|bestätigte Tage|jours confirmés
Exportă backup|Export backup|Sicherung exportieren|Exporter la sauvegarde
Importă backup|Import backup|Sicherung importieren|Importer une sauvegarde
CALENDAR|CALENDAR|KALENDER|CALENDRIER
Luna anterioară|Previous month|Vorheriger Monat|Mois précédent
Luna următoare|Next month|Nächster Monat|Mois suivant
Zilele lunii|Days of the month|Tage des Monats|Jours du mois
Lun|Mon|Mo|Lun
Mar|Tue|Di|Mar
Mie|Wed|Mi|Mer
Joi|Thu|Do|Jeu
Vin|Fri|Fr|Ven
Sâm|Sat|Sa|Sam
Dum|Sun|So|Dim
Concediu activ|Active leave|Aktiver Urlaub|Congé actif
Sărbătoare legală|Public holiday|Gesetzlicher Feiertag|Jour férié
Weekend|Weekend|Wochenende|Week-end
Zi lucrătoare|Working day|Arbeitstag|Jour ouvré
REGISTRU|REGISTER|ÜBERSICHT|REGISTRE
Înregistrări|Entries|Einträge|Entrées
Filtru înregistrări|Filter entries|Einträge filtern|Filtrer les entrées
Active|Active|Aktiv|Actives
Istoric|History|Verlauf|Historique
Șterse|Deleted|Gelöscht|Supprimées
Închide|Close|Schließen|Fermer
Data de început|Start date|Startdatum|Date de début
Data de sfârșit|End date|Enddatum|Date de fin
Tip|Type|Art|Type
Stare|Status|Status|Statut
Notițe|Notes|Notizen|Notes
(opțional)|(optional)|(optional)|(facultatif)
Concediu de odihnă|Annual leave|Erholungsurlaub|Congé annuel
Altă absență|Other absence|Andere Abwesenheit|Autre absence
Planificat|Planned|Geplant|Planifié
În așteptare|Pending|Ausstehend|En attente
Efectuat|Taken|Genommen|Pris
Anulat|Cancelled|Storniert|Annulé
Șters|Deleted|Gelöscht|Supprimé
Salvează concediul|Save leave|Urlaub speichern|Enregistrer le congé
Datele locale nu pot fi citite. Verifică permisiunile de stocare ale browserului.|Local data could not be read. Check your browser storage settings.|Lokale Daten konnten nicht gelesen werden. Prüfe die Speichereinstellungen des Browsers.|Impossible de lire les données locales. Vérifiez les paramètres de stockage du navigateur.
Salvarea a eșuat. Verifică stocarea locală. Dacă ai modificat datele în altă filă, reîncarcă pagina.|Save failed. Check local storage. If you changed data in another tab, reload the page.|Speichern fehlgeschlagen. Prüfe den lokalen Speicher. Lade die Seite neu, wenn du Daten in einem anderen Tab geändert hast.|Échec de l’enregistrement. Vérifiez le stockage local. Si les données ont été modifiées dans un autre onglet, rechargez la page.
Completează ambele date.|Enter both dates.|Gib beide Daten ein.|Renseignez les deux dates.
Data de sfârșit trebuie să fie în aceeași zi sau după data de început.|The end date must be on or after the start date.|Das Enddatum darf nicht vor dem Startdatum liegen.|La date de fin doit être égale ou postérieure à la date de début.
Alege date între {0} și {1}.|Choose dates between {0} and {1}.|Wähle Daten zwischen {0} und {1}.|Choisissez des dates entre {0} et {1}.
Intervalul nu conține zile lucrătoare deductibile.|This range contains no deductible working days.|Dieser Zeitraum enthält keine anrechenbaren Arbeitstage.|Cette période ne contient aucun jour ouvré décompté.
Intervalul se suprapune cu {0}.|This range overlaps {0}.|Dieser Zeitraum überschneidet sich mit {0}.|Cette période chevauche {0}.
Sold insuficient pentru anul {0}. Zilele reportate pot fi folosite până la 31 mai.|Insufficient balance for {0}. Carried-over days can be used through 31 May.|Nicht genug Urlaubstage für {0}. Übertragene Tage sind bis zum 31. Mai nutzbar.|Solde insuffisant pour {0}. Les jours reportés sont utilisables jusqu’au 31 mai.
{0} reportate din {1} · până la 31 mai|{0} carried over from {1} · until 31 May|{0} aus {1} übertragen · bis 31. Mai|{0} reportés de {1} · jusqu’au 31 mai
Nu există înregistrări în această secțiune.|No entries in this section.|Keine Einträge in diesem Bereich.|Aucune entrée dans cette section.
Șterge această zi|Delete this day|Diesen Tag löschen|Supprimer ce jour
Nicio înregistrare activă pentru această zi.|No active entries for this day.|Keine aktiven Einträge für diesen Tag.|Aucune entrée active pour ce jour.
Adaugă pentru această zi|Add for this day|Für diesen Tag hinzufügen|Ajouter pour ce jour
Restaurează|Restore|Wiederherstellen|Restaurer
Duplică|Duplicate|Duplizieren|Dupliquer
Șterge|Delete|Löschen|Supprimer
Modifică|Edit|Bearbeiten|Modifier
Anulează concediul|Cancel leave|Urlaub stornieren|Annuler le congé
Validează concediul|Confirm as taken|Als genommen bestätigen|Confirmer le congé pris
Concediu validat ca efectuat|Leave confirmed as taken|Urlaub als genommen bestätigt|Congé confirmé comme pris
0 zile deductibile|0 deductible days|0 anrechenbare Tage|0 jour décompté
{0} zi deductibilă|{0} deductible day|{0} anrechenbarer Tag|{0} jour décompté
{0} zile deductibile|{0} deductible days|{0} anrechenbare Tage|{0} jours décomptés
Adaugă concediu|Add leave|Urlaub hinzufügen|Ajouter un congé
Modifică concediul|Edit leave|Urlaub bearbeiten|Modifier le congé
Duplică înregistrarea|Duplicate entry|Eintrag duplizieren|Dupliquer l’entrée
Alege un interval pentru a calcula zilele deductibile.|Select a date range to calculate deductible days.|Wähle einen Zeitraum, um die anrechenbaren Tage zu berechnen.|Sélectionnez une période pour calculer les jours décomptés.
Înainte|Before|Vorher|Avant
După|After|Nachher|Après
Înregistrare modificată|Entry updated|Eintrag aktualisiert|Entrée modifiée
Înregistrare duplicată|Entry duplicated|Eintrag dupliziert|Entrée dupliquée
Înregistrare adăugată|Entry added|Eintrag hinzugefügt|Entrée ajoutée
Zi de concediu ștearsă|Leave day deleted|Urlaubstag gelöscht|Jour de congé supprimé
Zi eliminată din interval|Day removed from range|Tag aus dem Zeitraum entfernt|Jour retiré de la période
Zi ștearsă din intervalul|Day deleted from range|Tag aus dem Zeitraum gelöscht|Jour supprimé de la période
Ziua va fi mutată în Șterse. Celelalte zile din interval rămân în calendar.|This day will move to Deleted. The rest of the range stays on the calendar.|Dieser Tag wird gelöscht. Die übrigen Tage bleiben im Kalender.|Ce jour sera déplacé vers Supprimées. Les autres jours restent dans le calendrier.
Impact asupra soldului|Impact on balance|Auswirkung auf den Saldo|Effet sur le solde
Înapoi|Back|Zurück|Retour
Confirmă ștergerea zilei|Confirm day deletion|Löschen des Tages bestätigen|Confirmer la suppression du jour
Restaurează înregistrarea|Restore entry|Eintrag wiederherstellen|Restaurer l’entrée
Intrarea revine cu starea „{0}”.|The entry returns with status “{0}”.|Der Eintrag erhält wieder den Status „{0}“.|L’entrée retrouve le statut « {0} ».
Șterge înregistrarea|Delete entry|Eintrag löschen|Supprimer l’entrée
O poți recupera din secțiunea Șterse.|You can restore it from Deleted.|Du kannst den Eintrag unter Gelöscht wiederherstellen.|Vous pourrez la restaurer depuis Supprimées.
Intrarea rămâne în Istoric cu starea „Anulat”.|The entry stays in History with status “Cancelled”.|Der Eintrag bleibt mit dem Status „Storniert“ im Verlauf.|L’entrée reste dans l’historique avec le statut « Annulé ».
Confirmă validarea|Confirm leave taken|Urlaub als genommen bestätigen|Confirmer le congé pris
Intervalul trece din „{0}” în „Efectuat”.|This range changes from “{0}” to “Taken”.|Der Zeitraum wechselt von „{0}“ zu „Genommen“.|La période passe de « {0} » à « Pris ».
Se reintroduce în calcul|Added back to the calculation|Wieder in die Berechnung aufgenommen|Réintégré dans le calcul
Se eliberează din sold|Returned to the balance|Dem Saldo gutgeschrieben|Recrédité au solde
Motivul anulării|Cancellation reason|Stornierungsgrund|Motif de l’annulation
Introdu motivul anulării.|Enter a reason for cancellation.|Gib einen Stornierungsgrund ein.|Indiquez le motif de l’annulation.
Înregistrare restaurată|Entry restored|Eintrag wiederhergestellt|Entrée restaurée
Înregistrare mutată în Șterse|Entry moved to Deleted|Eintrag nach Gelöscht verschoben|Entrée déplacée vers Supprimées
Concediu anulat|Leave cancelled|Urlaub storniert|Congé annulé
Importul va înlocui înregistrările și istoricul din acest browser.|Importing will replace this browser’s entries and history.|Der Import ersetzt die Einträge und den Verlauf in diesem Browser.|L’importation remplacera les entrées et l’historique de ce navigateur.
Renunță|Cancel|Abbrechen|Annuler
Înlocuiește datele|Replace data|Daten ersetzen|Remplacer les données
Fișierul nu este un backup Leave Planner valid. Datele locale au fost păstrate.|This is not a valid Leave Planner backup. Local data was kept.|Die Datei ist keine gültige Leave-Planner-Sicherung. Lokale Daten wurden beibehalten.|Ce fichier n’est pas une sauvegarde Leave Planner valide. Les données locales ont été conservées.
Anul Nou|New Year’s Day|Neujahr|Jour de l’An
A doua zi de Anul Nou|Second day of the New Year|Zweiter Neujahrstag|Deuxième jour de l’An
Boboteaza|Epiphany|Heilige Drei Könige|Épiphanie
Sfântul Ioan Botezătorul|Saint John the Baptist|Johannes der Täufer|Saint Jean-Baptiste
Ziua Unirii Principatelor Române|Romanian Principalities Union Day|Tag der Vereinigung der rumänischen Fürstentümer|Jour de l’union des principautés roumaines
Ziua Muncii|Labour Day|Tag der Arbeit|Fête du Travail
Ziua Copilului|Children’s Day|Kindertag|Journée des enfants
Adormirea Maicii Domnului|Assumption of Mary|Mariä Himmelfahrt|Assomption
Sfântul Andrei|Saint Andrew’s Day|Andreastag|Saint-André
Ziua Națională|Romanian National Day|Rumänischer Nationalfeiertag|Fête nationale roumaine
Crăciunul|Christmas Day|Erster Weihnachtstag|Noël
A doua zi de Crăciun|Second day of Christmas|Zweiter Weihnachtstag|Lendemain de Noël
Vinerea Mare|Good Friday|Karfreitag|Vendredi saint
Paștele ortodox|Orthodox Easter|Orthodoxes Ostern|Pâques orthodoxes
A doua zi de Paște|Easter Monday|Ostermontag|Lundi de Pâques
Rusaliile|Pentecost|Pfingsten|Pentecôte
A doua zi de Rusalii|Whit Monday|Pfingstmontag|Lundi de Pentecôte
`.trim().split("\n").map(row => {
  const [ro, en, de, fr] = row.split("|");
  return [ro, { en, de, fr }];
}));

function t(source, ...values) {
  const text = translations.get(source)?.[language] ?? source;
  return values.length ? text.replace(/\{(\d+)\}/g, (_, index) => values[index] ?? "") : text;
}

function localize(root) {
  for (const element of root.querySelectorAll("[data-text]")) element.textContent = t(element.dataset.text);
  for (const element of root.querySelectorAll("[data-label]")) element.setAttribute("aria-label", t(element.dataset.label));
}

function localizedDate(date, options) {
  return date.toLocaleDateString(languages[language].locale, { ...options, timeZone: "UTC" });
}

function holidayLabel(label) {
  return label?.split(" · ").map(name => t(name)).join(" · ");
}

function localizedHistory(label) {
  if (label.startsWith("Zi ștearsă din intervalul ")) {
    return t("Zi ștearsă din intervalul") + label.slice("Zi ștearsă din intervalul".length);
  }
  return label.split(" · ").map((part, index) => index === 0 ? t(part) : part).join(" · ");
}
