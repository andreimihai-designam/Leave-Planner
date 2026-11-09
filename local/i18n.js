"use strict";

const languages = {
  en: { locale: "en-GB", name: "English" },
  fr: { locale: "fr-FR", name: "Français" },
  es: { locale: "es-ES", name: "Español" },
  it: { locale: "it-IT", name: "Italiano" },
};
const languageKey = "jarvis.leave-planner.language";
let language = "en";
try {
  const savedLanguage = localStorage.getItem(languageKey);
  if (Object.hasOwn(languages, savedLanguage)) language = savedLanguage;
} catch {
  // The language can still be changed for the current session.
}

const translations = new Map(`
Sari la conținut|Skip to content|Aller au contenu|Ir al contenido|Vai al contenuto
Limbă|Language|Langue|Idioma|Lingua
Sold anual|Annual balance|Solde annuel|Saldo anual|Saldo annuale
Disponibile|Available|Disponibles|Disponibles|Disponibili
Rezervate|Reserved|Réservés|Reservados|Riservati
Efectuate|Taken|Pris|Disfrutados|Fruiti
zile de concediu|leave days|jours de congé|días de vacaciones|giorni di ferie
planificate și în așteptare|planned and pending|planifiés et en attente|planificados y pendientes|pianificati e in attesa
zile confirmate|confirmed days|jours confirmés|días confirmados|giorni confermati
Exportă backup|Export backup|Exporter la sauvegarde|Exportar copia|Esporta backup
Importă backup|Import backup|Importer une sauvegarde|Importar copia|Importa backup
CALENDAR|CALENDAR|CALENDRIER|CALENDARIO|CALENDARIO
Luna anterioară|Previous month|Mois précédent|Mes anterior|Mese precedente
Luna următoare|Next month|Mois suivant|Mes siguiente|Mese successivo
Zilele lunii|Days of the month|Jours du mois|Días del mes|Giorni del mese
Lun|Mon|Lun|Lun|Lun
Mar|Tue|Mar|Mar|Mar
Mie|Wed|Mer|Mié|Mer
Joi|Thu|Jeu|Jue|Gio
Vin|Fri|Ven|Vie|Ven
Sâm|Sat|Sam|Sáb|Sab
Dum|Sun|Dim|Dom|Dom
Concediu activ|Active leave|Congé actif|Permiso activo|Assenza attiva
Sărbătoare legală|Public holiday|Jour férié|Festivo oficial|Festività pubblica
Weekend|Weekend|Week-end|Fin de semana|Fine settimana
Zi lucrătoare|Working day|Jour ouvré|Día laborable|Giorno lavorativo
REGISTRU|REGISTER|REGISTRE|REGISTRO|REGISTRO
Înregistrări|Entries|Entrées|Entradas|Voci
Filtru înregistrări|Filter entries|Filtrer les entrées|Filtrar entradas|Filtra voci
Active|Active|Actives|Activas|Attive
Istoric|History|Historique|Historial|Cronologia
Șterse|Deleted|Supprimées|Eliminadas|Eliminate
Închide|Close|Fermer|Cerrar|Chiudi
Data de început|Start date|Date de début|Fecha de inicio|Data di inizio
Data de sfârșit|End date|Date de fin|Fecha de fin|Data di fine
Tip|Type|Type|Tipo|Tipo
Stare|Status|Statut|Estado|Stato
Notițe|Notes|Notes|Notas|Note
(opțional)|(optional)|(facultatif)|(opcional)|(facoltativo)
Concediu de odihnă|Annual leave|Congé annuel|Vacaciones anuales|Ferie annuali
Altă absență|Other absence|Autre absence|Otra ausencia|Altra assenza
Planificat|Planned|Planifié|Planificado|Pianificato
În așteptare|Pending|En attente|Pendiente|In attesa
Efectuat|Taken|Pris|Disfrutado|Fruito
Anulat|Cancelled|Annulé|Cancelado|Annullato
Șters|Deleted|Supprimé|Eliminado|Eliminato
Salvează concediul|Save leave|Enregistrer le congé|Guardar permiso|Salva assenza
Datele locale nu pot fi citite. Verifică permisiunile de stocare ale browserului.|Local data could not be read. Check your browser storage settings.|Impossible de lire les données locales. Vérifiez les paramètres de stockage du navigateur.|No se pudieron leer los datos locales. Revisa el almacenamiento del navegador.|Impossibile leggere i dati locali. Controlla le impostazioni di archiviazione del browser.
Salvarea a eșuat. Verifică stocarea locală. Dacă ai modificat datele în altă filă, reîncarcă pagina.|Save failed. Check local storage. If you changed data in another tab, reload the page.|Échec de l’enregistrement. Vérifiez le stockage local. Si les données ont été modifiées dans un autre onglet, rechargez la page.|No se pudo guardar. Revisa el almacenamiento local. Si cambiaste los datos en otra pestaña, recarga la página.|Salvataggio non riuscito. Controlla l’archiviazione locale. Se hai modificato i dati in un’altra scheda, ricarica la pagina.
Completează ambele date.|Enter both dates.|Renseignez les deux dates.|Introduce ambas fechas.|Inserisci entrambe le date.
Data de sfârșit trebuie să fie în aceeași zi sau după data de început.|The end date must be on or after the start date.|La date de fin doit être égale ou postérieure à la date de début.|La fecha de fin debe ser igual o posterior a la de inicio.|La data di fine deve coincidere con quella di inizio o essere successiva.
Alege date între {0} și {1}.|Choose dates between {0} and {1}.|Choisissez des dates entre {0} et {1}.|Elige fechas entre {0} y {1}.|Scegli date tra {0} e {1}.
Intervalul nu conține zile lucrătoare deductibile.|This range contains no deductible working days.|Cette période ne contient aucun jour ouvré décompté.|El periodo no contiene días laborables deducibles.|Il periodo non contiene giorni lavorativi da scalare.
Intervalul se suprapune cu {0}.|This range overlaps {0}.|Cette période chevauche {0}.|El periodo se solapa con {0}.|Il periodo si sovrappone a {0}.
Sold insuficient pentru anul {0}. Zilele reportate pot fi folosite până la 31 mai.|Insufficient balance for {0}. Carried-over days can be used through 31 May.|Solde insuffisant pour {0}. Les jours reportés sont utilisables jusqu’au 31 mai.|Saldo insuficiente para {0}. Los días trasladados se pueden usar hasta el 31 de mayo.|Saldo insufficiente per il {0}. I giorni riportati sono utilizzabili fino al 31 maggio.
{0} reportate din {1} · până la 31 mai|{0} carried over from {1} · until 31 May|{0} reportés de {1} · jusqu’au 31 mai|{0} trasladados de {1} · hasta el 31 de mayo|{0} riportati dal {1} · fino al 31 maggio
Nu există înregistrări în această secțiune.|No entries in this section.|Aucune entrée dans cette section.|No hay entradas en esta sección.|Nessuna voce in questa sezione.
Șterge această zi|Delete this day|Supprimer ce jour|Eliminar este día|Elimina questo giorno
Nicio înregistrare activă pentru această zi.|No active entries for this day.|Aucune entrée active pour ce jour.|No hay entradas activas para este día.|Nessuna voce attiva per questo giorno.
Adaugă pentru această zi|Add for this day|Ajouter pour ce jour|Añadir para este día|Aggiungi per questo giorno
Restaurează|Restore|Restaurer|Restaurar|Ripristina
Duplică|Duplicate|Dupliquer|Duplicar|Duplica
Șterge|Delete|Supprimer|Eliminar|Elimina
Modifică|Edit|Modifier|Editar|Modifica
Anulează concediul|Cancel leave|Annuler le congé|Cancelar permiso|Annulla assenza
Validează concediul|Confirm as taken|Confirmer le congé pris|Confirmar como disfrutado|Conferma come fruito
Concediu validat ca efectuat|Leave confirmed as taken|Congé confirmé comme pris|Permiso confirmado como disfrutado|Assenza confermata come fruita
0 zile deductibile|0 deductible days|0 jour décompté|0 días deducibles|0 giorni da scalare
{0} zi deductibilă|{0} deductible day|{0} jour décompté|{0} día deducible|{0} giorno da scalare
{0} zile deductibile|{0} deductible days|{0} jours décomptés|{0} días deducibles|{0} giorni da scalare
Adaugă concediu|Add leave|Ajouter un congé|Añadir permiso|Aggiungi assenza
Modifică concediul|Edit leave|Modifier le congé|Editar permiso|Modifica assenza
Duplică înregistrarea|Duplicate entry|Dupliquer l’entrée|Duplicar entrada|Duplica voce
Alege un interval pentru a calcula zilele deductibile.|Select a date range to calculate deductible days.|Sélectionnez une période pour calculer les jours décomptés.|Selecciona un periodo para calcular los días deducibles.|Seleziona un periodo per calcolare i giorni da scalare.
Înainte|Before|Avant|Antes|Prima
După|After|Après|Después|Dopo
Înregistrare modificată|Entry updated|Entrée modifiée|Entrada actualizada|Voce aggiornata
Înregistrare duplicată|Entry duplicated|Entrée dupliquée|Entrada duplicada|Voce duplicata
Înregistrare adăugată|Entry added|Entrée ajoutée|Entrada añadida|Voce aggiunta
Zi de concediu ștearsă|Leave day deleted|Jour de congé supprimé|Día de permiso eliminado|Giorno di assenza eliminato
Zi eliminată din interval|Day removed from range|Jour retiré de la période|Día retirado del periodo|Giorno rimosso dal periodo
Zi ștearsă din intervalul|Day deleted from range|Jour supprimé de la période|Día eliminado del periodo|Giorno eliminato dal periodo
Ziua va fi mutată în Șterse. Celelalte zile din interval rămân în calendar.|This day will move to Deleted. The rest of the range stays on the calendar.|Ce jour sera déplacé vers Supprimées. Les autres jours restent dans le calendrier.|El día se moverá a Eliminadas. Los demás días seguirán en el calendario.|Il giorno verrà spostato in Eliminate. Gli altri giorni restano nel calendario.
Impact asupra soldului|Impact on balance|Effet sur le solde|Efecto en el saldo|Effetto sul saldo
Înapoi|Back|Retour|Volver|Indietro
Confirmă ștergerea zilei|Confirm day deletion|Confirmer la suppression du jour|Confirmar eliminación del día|Conferma eliminazione del giorno
Restaurează înregistrarea|Restore entry|Restaurer l’entrée|Restaurar entrada|Ripristina voce
Intrarea revine cu starea „{0}”.|The entry returns with status “{0}”.|L’entrée retrouve le statut « {0} ».|La entrada recupera el estado «{0}».|La voce torna allo stato «{0}».
Șterge înregistrarea|Delete entry|Supprimer l’entrée|Eliminar entrada|Elimina voce
O poți recupera din secțiunea Șterse.|You can restore it from Deleted.|Vous pourrez la restaurer depuis Supprimées.|Puedes restaurarla desde Eliminadas.|Puoi ripristinarla da Eliminate.
Intrarea rămâne în Istoric cu starea „Anulat”.|The entry stays in History with status “Cancelled”.|L’entrée reste dans l’historique avec le statut « Annulé ».|La entrada queda en el historial como «Cancelada».|La voce resta nella cronologia come «Annullata».
Confirmă validarea|Confirm leave taken|Confirmer le congé pris|Confirmar disfrute|Conferma fruizione
Intervalul trece din „{0}” în „Efectuat”.|This range changes from “{0}” to “Taken”.|La période passe de « {0} » à « Pris ».|El periodo pasa de «{0}» a «Disfrutado».|Il periodo passa da «{0}» a «Fruito».
Se reintroduce în calcul|Added back to the calculation|Réintégré dans le calcul|Se vuelve a incluir en el cálculo|Rientra nel calcolo
Se eliberează din sold|Returned to the balance|Recrédité au solde|Se devuelve al saldo|Torna al saldo
Motivul anulării|Cancellation reason|Motif de l’annulation|Motivo de cancelación|Motivo dell’annullamento
Introdu motivul anulării.|Enter a reason for cancellation.|Indiquez le motif de l’annulation.|Introduce un motivo de cancelación.|Inserisci un motivo per l’annullamento.
Înregistrare restaurată|Entry restored|Entrée restaurée|Entrada restaurada|Voce ripristinata
Înregistrare mutată în Șterse|Entry moved to Deleted|Entrée déplacée vers Supprimées|Entrada movida a Eliminadas|Voce spostata in Eliminate
Concediu anulat|Leave cancelled|Congé annulé|Permiso cancelado|Assenza annullata
Importul va înlocui înregistrările și istoricul din acest browser.|Importing will replace this browser’s entries and history.|L’importation remplacera les entrées et l’historique de ce navigateur.|La importación reemplazará las entradas y el historial de este navegador.|L’importazione sostituirà le voci e la cronologia di questo browser.
Renunță|Cancel|Annuler|Cancelar|Annulla
Înlocuiește datele|Replace data|Remplacer les données|Reemplazar datos|Sostituisci dati
Fișierul nu este un backup Leave Planner valid. Datele locale au fost păstrate.|This is not a valid Leave Planner backup. Local data was kept.|Ce fichier n’est pas une sauvegarde Leave Planner valide. Les données locales ont été conservées.|La copia de Leave Planner no es válida. Se conservaron los datos locales.|Il backup di Leave Planner non è valido. I dati locali sono stati conservati.
Anul Nou|New Year’s Day|Jour de l’An|Año Nuevo|Capodanno
A doua zi de Anul Nou|Second day of the New Year|Deuxième jour de l’An|Segundo día de Año Nuevo|Secondo giorno di Capodanno
Boboteaza|Epiphany|Épiphanie|Epifanía|Epifania
Sfântul Ioan Botezătorul|Saint John the Baptist|Saint Jean-Baptiste|San Juan Bautista|San Giovanni Battista
Ziua Unirii Principatelor Române|Romanian Principalities Union Day|Jour de l’union des principautés roumaines|Unión de los Principados Rumanos|Unione dei Principati romeni
Ziua Muncii|Labour Day|Fête du Travail|Día del Trabajo|Festa dei lavoratori
Ziua Copilului|Children’s Day|Journée des enfants|Día del Niño|Giornata dei bambini
Adormirea Maicii Domnului|Assumption of Mary|Assomption|Asunción de María|Assunzione di Maria
Sfântul Andrei|Saint Andrew’s Day|Saint-André|San Andrés|Sant’Andrea
Ziua Națională|Romanian National Day|Fête nationale roumaine|Fiesta Nacional de Rumanía|Festa nazionale romena
Crăciunul|Christmas Day|Noël|Navidad|Natale
A doua zi de Crăciun|Second day of Christmas|Lendemain de Noël|Segundo día de Navidad|Secondo giorno di Natale
Vinerea Mare|Good Friday|Vendredi saint|Viernes Santo|Venerdì Santo
Paștele ortodox|Orthodox Easter|Pâques orthodoxes|Pascua ortodoxa|Pasqua ortodossa
A doua zi de Paște|Easter Monday|Lundi de Pâques|Lunes de Pascua|Lunedì di Pasqua
Rusaliile|Pentecost|Pentecôte|Pentecostés|Pentecoste
A doua zi de Rusalii|Whit Monday|Lundi de Pentecôte|Lunes de Pentecostés|Lunedì di Pentecoste
`.trim().split("\n").map(row => {
  const [source, en, fr, es, it] = row.split("|");
  return [source, { en, fr, es, it }];
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
