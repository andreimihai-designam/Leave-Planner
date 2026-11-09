"use strict";

const languages = {
  ro: { locale: "ro-RO", name: "Română" },
  en: { locale: "en-GB", name: "English" },
  de: { locale: "de-DE", name: "Deutsch" },
  fr: { locale: "fr-FR", name: "Français" },
  es: { locale: "es-ES", name: "Español" },
  it: { locale: "it-IT", name: "Italiano" },
  zh: { locale: "zh-CN", name: "简体中文" },
  ja: { locale: "ja-JP", name: "日本語" },
  ko: { locale: "ko-KR", name: "한국어" },
  ru: { locale: "ru-RU", name: "Русский" },
  pl: { locale: "pl-PL", name: "Polski" },
  cs: { locale: "cs-CZ", name: "Čeština" },
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
Sari la conținut|Skip to content|Zum Inhalt springen|Aller au contenu|Ir al contenido|Vai al contenuto|跳到内容|コンテンツへ移動|본문으로 이동|К содержимому|Przejdź do treści|Přejít na obsah
Limbă|Language|Sprache|Langue|Idioma|Lingua|语言|言語|언어|Язык|Język|Jazyk
Sold anual|Annual balance|Jahressaldo|Solde annuel|Saldo anual|Saldo annuale|年度余额|年間残高|연간 잔여 일수|Годовой остаток|Saldo roczne|Roční zůstatek
Disponibile|Available|Verfügbar|Disponibles|Disponibles|Disponibili|可用|利用可能|사용 가능|Доступно|Dostępne|K dispozici
Rezervate|Reserved|Reserviert|Réservés|Reservados|Riservati|已预留|予約済み|예약됨|Зарезервировано|Zarezerwowane|Rezervováno
Efectuate|Taken|Genommen|Pris|Disfrutados|Fruiti|已休|取得済み|사용함|Использовано|Wykorzystane|Vyčerpáno
zile de concediu|leave days|Urlaubstage|jours de congé|días de vacaciones|giorni di ferie|休假天数|休暇日数|휴가 일수|дней отпуска|dni urlopu|dnů dovolené
planificate și în așteptare|planned and pending|geplant und ausstehend|planifiés et en attente|planificados y pendientes|pianificati e in attesa|已计划及待确认|予定・保留中|계획 및 대기 중|запланировано и ожидает|planowane i oczekujące|plánované a čekající
zile confirmate|confirmed days|bestätigte Tage|jours confirmés|días confirmados|giorni confermati|已确认天数|確定した日数|확정된 일수|подтверждённых дней|potwierdzone dni|potvrzené dny
Exportă backup|Export backup|Sicherung exportieren|Exporter la sauvegarde|Exportar copia|Esporta backup|导出备份|バックアップをエクスポート|백업 내보내기|Экспорт копии|Eksportuj kopię|Exportovat zálohu
Importă backup|Import backup|Sicherung importieren|Importer une sauvegarde|Importar copia|Importa backup|导入备份|バックアップをインポート|백업 가져오기|Импорт копии|Importuj kopię|Importovat zálohu
CALENDAR|CALENDAR|KALENDER|CALENDRIER|CALENDARIO|CALENDARIO|日历|カレンダー|달력|КАЛЕНДАРЬ|KALENDARZ|KALENDÁŘ
Luna anterioară|Previous month|Vorheriger Monat|Mois précédent|Mes anterior|Mese precedente|上个月|前月|이전 달|Предыдущий месяц|Poprzedni miesiąc|Předchozí měsíc
Luna următoare|Next month|Nächster Monat|Mois suivant|Mes siguiente|Mese successivo|下个月|翌月|다음 달|Следующий месяц|Następny miesiąc|Další měsíc
Zilele lunii|Days of the month|Tage des Monats|Jours du mois|Días del mes|Giorni del mese|本月日期|月の日付|월별 날짜|Дни месяца|Dni miesiąca|Dny v měsíci
Lun|Mon|Mo|Lun|Lun|Lun|一|月|월|Пн|Pn|Po
Mar|Tue|Di|Mar|Mar|Mar|二|火|화|Вт|Wt|Út
Mie|Wed|Mi|Mer|Mié|Mer|三|水|수|Ср|Śr|St
Joi|Thu|Do|Jeu|Jue|Gio|四|木|목|Чт|Cz|Čt
Vin|Fri|Fr|Ven|Vie|Ven|五|金|금|Пт|Pt|Pá
Sâm|Sat|Sa|Sam|Sáb|Sab|六|土|토|Сб|So|So
Dum|Sun|So|Dim|Dom|Dom|日|日|일|Вс|Nd|Ne
Concediu activ|Active leave|Aktiver Urlaub|Congé actif|Permiso activo|Assenza attiva|有效休假|有効な休暇|활성 휴가|Активный отпуск|Aktywny urlop|Aktivní dovolená
Sărbătoare legală|Public holiday|Gesetzlicher Feiertag|Jour férié|Festivo oficial|Festività pubblica|法定假日|祝日|공휴일|Государственный праздник|Święto ustawowe|Státní svátek
Weekend|Weekend|Wochenende|Week-end|Fin de semana|Fine settimana|周末|週末|주말|Выходные|Weekend|Víkend
Zi lucrătoare|Working day|Arbeitstag|Jour ouvré|Día laborable|Giorno lavorativo|工作日|勤務日|근무일|Рабочий день|Dzień roboczy|Pracovní den
REGISTRU|REGISTER|ÜBERSICHT|REGISTRE|REGISTRO|REGISTRO|记录|記録|기록|ЖУРНАЛ|REJESTR|EVIDENCE
Înregistrări|Entries|Einträge|Entrées|Entradas|Voci|条目|項目|항목|Записи|Wpisy|Záznamy
Filtru înregistrări|Filter entries|Einträge filtern|Filtrer les entrées|Filtrar entradas|Filtra voci|筛选条目|項目を絞り込む|항목 필터링|Фильтр записей|Filtruj wpisy|Filtrovat záznamy
Active|Active|Aktiv|Actives|Activas|Attive|有效|有効|활성|Активные|Aktywne|Aktivní
Istoric|History|Verlauf|Historique|Historial|Cronologia|历史|履歴|기록|История|Historia|Historie
Șterse|Deleted|Gelöscht|Supprimées|Eliminadas|Eliminate|已删除|削除済み|삭제됨|Удалённые|Usunięte|Odstraněné
Închide|Close|Schließen|Fermer|Cerrar|Chiudi|关闭|閉じる|닫기|Закрыть|Zamknij|Zavřít
Data de început|Start date|Startdatum|Date de début|Fecha de inicio|Data di inizio|开始日期|開始日|시작일|Дата начала|Data rozpoczęcia|Datum zahájení
Data de sfârșit|End date|Enddatum|Date de fin|Fecha de fin|Data di fine|结束日期|終了日|종료일|Дата окончания|Data zakończenia|Datum ukončení
Tip|Type|Art|Type|Tipo|Tipo|类型|種類|유형|Тип|Typ|Typ
Stare|Status|Status|Statut|Estado|Stato|状态|状態|상태|Статус|Status|Stav
Notițe|Notes|Notizen|Notes|Notas|Note|备注|メモ|메모|Заметки|Notatki|Poznámky
(opțional)|(optional)|(optional)|(facultatif)|(opcional)|(facoltativo)|（可选）|（任意）|(선택 사항)|(необязательно)|(opcjonalnie)|(nepovinné)
Concediu de odihnă|Annual leave|Erholungsurlaub|Congé annuel|Vacaciones anuales|Ferie annuali|年假|年次休暇|연차 휴가|Ежегодный отпуск|Urlop wypoczynkowy|Řádná dovolená
Altă absență|Other absence|Andere Abwesenheit|Autre absence|Otra ausencia|Altra assenza|其他缺勤|その他の欠勤|기타 결근|Другое отсутствие|Inna nieobecność|Jiná nepřítomnost
Planificat|Planned|Geplant|Planifié|Planificado|Pianificato|已计划|予定|계획됨|Запланировано|Zaplanowany|Plánováno
În așteptare|Pending|Ausstehend|En attente|Pendiente|In attesa|待确认|保留中|대기 중|Ожидает|Oczekujący|Čeká na potvrzení
Efectuat|Taken|Genommen|Pris|Disfrutado|Fruito|已休|取得済み|사용함|Использовано|Wykorzystany|Vyčerpáno
Anulat|Cancelled|Storniert|Annulé|Cancelado|Annullato|已取消|取り消し済み|취소됨|Отменено|Anulowany|Zrušeno
Șters|Deleted|Gelöscht|Supprimé|Eliminado|Eliminato|已删除|削除済み|삭제됨|Удалено|Usunięty|Odstraněno
Salvează concediul|Save leave|Urlaub speichern|Enregistrer le congé|Guardar permiso|Salva assenza|保存休假|休暇を保存|휴가 저장|Сохранить отпуск|Zapisz urlop|Uložit dovolenou
Datele locale nu pot fi citite. Verifică permisiunile de stocare ale browserului.|Local data could not be read. Check your browser storage settings.|Lokale Daten konnten nicht gelesen werden. Prüfe die Speichereinstellungen des Browsers.|Impossible de lire les données locales. Vérifiez les paramètres de stockage du navigateur.|No se pudieron leer los datos locales. Revisa el almacenamiento del navegador.|Impossibile leggere i dati locali. Controlla le impostazioni di archiviazione del browser.|无法读取本地数据。请检查浏览器存储设置。|ローカルデータを読み込めません。ブラウザーの保存設定を確認してください。|로컬 데이터를 읽을 수 없습니다. 브라우저 저장 설정을 확인하세요.|Не удалось прочитать локальные данные. Проверьте настройки хранилища браузера.|Nie można odczytać danych lokalnych. Sprawdź ustawienia pamięci przeglądarki.|Místní data nelze načíst. Zkontrolujte nastavení úložiště prohlížeče.
Salvarea a eșuat. Verifică stocarea locală. Dacă ai modificat datele în altă filă, reîncarcă pagina.|Save failed. Check local storage. If you changed data in another tab, reload the page.|Speichern fehlgeschlagen. Prüfe den lokalen Speicher. Lade die Seite neu, wenn du Daten in einem anderen Tab geändert hast.|Échec de l’enregistrement. Vérifiez le stockage local. Si les données ont été modifiées dans un autre onglet, rechargez la page.|No se pudo guardar. Revisa el almacenamiento local. Si cambiaste los datos en otra pestaña, recarga la página.|Salvataggio non riuscito. Controlla l’archiviazione locale. Se hai modificato i dati in un’altra scheda, ricarica la pagina.|保存失败。请检查本地存储。如果在其他标签页修改了数据，请重新加载。|保存に失敗しました。ローカルストレージを確認してください。別のタブで編集した場合は再読み込みしてください。|저장하지 못했습니다. 로컬 저장소를 확인하세요. 다른 탭에서 수정했다면 페이지를 새로고침하세요.|Не удалось сохранить. Проверьте локальное хранилище. Если данные менялись в другой вкладке, обновите страницу.|Nie udało się zapisać. Sprawdź pamięć lokalną. Jeśli zmieniono dane w innej karcie, odśwież stronę.|Uložení se nezdařilo. Zkontrolujte místní úložiště. Pokud jste data změnili na jiné kartě, obnovte stránku.
Completează ambele date.|Enter both dates.|Gib beide Daten ein.|Renseignez les deux dates.|Introduce ambas fechas.|Inserisci entrambe le date.|请输入两个日期。|両方の日付を入力してください。|두 날짜를 모두 입력하세요.|Введите обе даты.|Wprowadź obie daty.|Zadejte obě data.
Data de sfârșit trebuie să fie în aceeași zi sau după data de început.|The end date must be on or after the start date.|Das Enddatum darf nicht vor dem Startdatum liegen.|La date de fin doit être égale ou postérieure à la date de début.|La fecha de fin debe ser igual o posterior a la de inicio.|La data di fine deve coincidere con quella di inizio o essere successiva.|结束日期不能早于开始日期。|終了日は開始日以降にしてください。|종료일은 시작일과 같거나 이후여야 합니다.|Дата окончания не может быть раньше даты начала.|Data zakończenia nie może być wcześniejsza niż data rozpoczęcia.|Datum ukončení nesmí předcházet datu zahájení.
Alege date între {0} și {1}.|Choose dates between {0} and {1}.|Wähle Daten zwischen {0} und {1}.|Choisissez des dates entre {0} et {1}.|Elige fechas entre {0} y {1}.|Scegli date tra {0} e {1}.|请选择 {0} 至 {1} 年之间的日期。|{0}年から{1}年までの日付を選んでください。|{0}년부터 {1}년 사이의 날짜를 선택하세요.|Выберите даты с {0} по {1} год.|Wybierz daty między {0} a {1} rokiem.|Vyberte data mezi roky {0} a {1}.
Intervalul nu conține zile lucrătoare deductibile.|This range contains no deductible working days.|Dieser Zeitraum enthält keine anrechenbaren Arbeitstage.|Cette période ne contient aucun jour ouvré décompté.|El periodo no contiene días laborables deducibles.|Il periodo non contiene giorni lavorativi da scalare.|此时间段没有可扣减的工作日。|この期間には差し引かれる勤務日がありません。|이 기간에는 차감할 근무일이 없습니다.|В периоде нет учитываемых рабочих дней.|Okres nie zawiera dni roboczych do odliczenia.|Období neobsahuje započitatelné pracovní dny.
Intervalul se suprapune cu {0}.|This range overlaps {0}.|Dieser Zeitraum überschneidet sich mit {0}.|Cette période chevauche {0}.|El periodo se solapa con {0}.|Il periodo si sovrappone a {0}.|此时间段与 {0} 重叠。|この期間は{0}と重複しています。|이 기간은 {0}와 겹칩니다.|Период пересекается с {0}.|Okres pokrywa się z {0}.|Období se překrývá s {0}.
Sold insuficient pentru anul {0}. Zilele reportate pot fi folosite până la 31 mai.|Insufficient balance for {0}. Carried-over days can be used through 31 May.|Nicht genug Urlaubstage für {0}. Übertragene Tage sind bis zum 31. Mai nutzbar.|Solde insuffisant pour {0}. Les jours reportés sont utilisables jusqu’au 31 mai.|Saldo insuficiente para {0}. Los días trasladados se pueden usar hasta el 31 de mayo.|Saldo insufficiente per il {0}. I giorni riportati sono utilizzabili fino al 31 maggio.|{0} 年的余额不足。结转天数可使用至 5 月 31 日。|{0}年の残高が不足しています。繰越分は5月31日まで利用できます。|{0}년 잔여 일수가 부족합니다. 이월 일수는 5월 31일까지 사용할 수 있습니다.|Недостаточно дней на {0} год. Перенесённые дни можно использовать до 31 мая включительно.|Niewystarczające saldo na {0} rok. Zaległe dni można wykorzystać do 31 maja.|Nedostatečný zůstatek pro rok {0}. Převedené dny lze využít do 31. května.
{0} reportate din {1} · până la 31 mai|{0} carried over from {1} · until 31 May|{0} aus {1} übertragen · bis 31. Mai|{0} reportés de {1} · jusqu’au 31 mai|{0} trasladados de {1} · hasta el 31 de mayo|{0} riportati dal {1} · fino al 31 maggio|从 {1} 年结转 {0} 天 · 截至 5 月 31 日|{1}年から{0}日繰越 · 5月31日まで|{1}년에서 {0}일 이월 · 5월 31일까지|Перенесено {0} из {1} года · до 31 мая|{0} z {1} roku · do 31 maja|{0} převedeno z roku {1} · do 31. května
Nu există înregistrări în această secțiune.|No entries in this section.|Keine Einträge in diesem Bereich.|Aucune entrée dans cette section.|No hay entradas en esta sección.|Nessuna voce in questa sezione.|此部分没有条目。|このセクションには項目がありません。|이 섹션에 항목이 없습니다.|В этом разделе нет записей.|Brak wpisów w tej sekcji.|V této sekci nejsou žádné záznamy.
Șterge această zi|Delete this day|Diesen Tag löschen|Supprimer ce jour|Eliminar este día|Elimina questo giorno|删除此日|この日を削除|이 날짜 삭제|Удалить этот день|Usuń ten dzień|Odstranit tento den
Nicio înregistrare activă pentru această zi.|No active entries for this day.|Keine aktiven Einträge für diesen Tag.|Aucune entrée active pour ce jour.|No hay entradas activas para este día.|Nessuna voce attiva per questo giorno.|当天没有有效条目。|この日に有効な項目はありません。|이 날짜에 활성 항목이 없습니다.|На этот день нет активных записей.|Brak aktywnych wpisów na ten dzień.|Pro tento den nejsou aktivní záznamy.
Adaugă pentru această zi|Add for this day|Für diesen Tag hinzufügen|Ajouter pour ce jour|Añadir para este día|Aggiungi per questo giorno|为此日添加|この日に追加|이 날짜에 추가|Добавить на этот день|Dodaj na ten dzień|Přidat pro tento den
Restaurează|Restore|Wiederherstellen|Restaurer|Restaurar|Ripristina|恢复|復元|복원|Восстановить|Przywróć|Obnovit
Duplică|Duplicate|Duplizieren|Dupliquer|Duplicar|Duplica|复制|複製|복제|Дублировать|Powiel|Duplikovat
Șterge|Delete|Löschen|Supprimer|Eliminar|Elimina|删除|削除|삭제|Удалить|Usuń|Odstranit
Modifică|Edit|Bearbeiten|Modifier|Editar|Modifica|编辑|編集|편집|Изменить|Edytuj|Upravit
Anulează concediul|Cancel leave|Urlaub stornieren|Annuler le congé|Cancelar permiso|Annulla assenza|取消休假|休暇を取り消す|휴가 취소|Отменить отпуск|Anuluj urlop|Zrušit dovolenou
Validează concediul|Confirm as taken|Als genommen bestätigen|Confirmer le congé pris|Confirmar como disfrutado|Conferma come fruito|确认已休|取得済みにする|사용 완료 확인|Подтвердить использование|Potwierdź wykorzystanie|Potvrdit čerpání
Concediu validat ca efectuat|Leave confirmed as taken|Urlaub als genommen bestätigt|Congé confirmé comme pris|Permiso confirmado como disfrutado|Assenza confermata come fruita|已确认休假完成|休暇を取得済みにしました|휴가 사용 완료 확인됨|Использование отпуска подтверждено|Potwierdzono wykorzystanie urlopu|Čerpání dovolené potvrzeno
0 zile deductibile|0 deductible days|0 anrechenbare Tage|0 jour décompté|0 días deducibles|0 giorni da scalare|0 个可扣减日|差し引き 0 日|차감 0일|0 учитываемых дней|0 dni do odliczenia|0 započitatelných dnů
{0} zi deductibilă|{0} deductible day|{0} anrechenbarer Tag|{0} jour décompté|{0} día deducible|{0} giorno da scalare|{0} 个可扣减日|差し引き {0} 日|차감 {0}일|Учитываемых дней: {0}|Dni do odliczenia: {0}|Započitatelné dny: {0}
{0} zile deductibile|{0} deductible days|{0} anrechenbare Tage|{0} jours décomptés|{0} días deducibles|{0} giorni da scalare|{0} 个可扣减日|差し引き {0} 日|차감 {0}일|Учитываемых дней: {0}|Dni do odliczenia: {0}|Započitatelné dny: {0}
Adaugă concediu|Add leave|Urlaub hinzufügen|Ajouter un congé|Añadir permiso|Aggiungi assenza|添加休假|休暇を追加|휴가 추가|Добавить отпуск|Dodaj urlop|Přidat dovolenou
Modifică concediul|Edit leave|Urlaub bearbeiten|Modifier le congé|Editar permiso|Modifica assenza|编辑休假|休暇を編集|휴가 편집|Изменить отпуск|Edytuj urlop|Upravit dovolenou
Duplică înregistrarea|Duplicate entry|Eintrag duplizieren|Dupliquer l’entrée|Duplicar entrada|Duplica voce|复制条目|項目を複製|항목 복제|Дублировать запись|Powiel wpis|Duplikovat záznam
Alege un interval pentru a calcula zilele deductibile.|Select a date range to calculate deductible days.|Wähle einen Zeitraum, um die anrechenbaren Tage zu berechnen.|Sélectionnez une période pour calculer les jours décomptés.|Selecciona un periodo para calcular los días deducibles.|Seleziona un periodo per calcolare i giorni da scalare.|请选择日期范围以计算扣减天数。|差し引かれる日数を計算する期間を選んでください。|차감 일수를 계산할 기간을 선택하세요.|Выберите период для расчёта учитываемых дней.|Wybierz okres, aby obliczyć dni do odliczenia.|Vyberte období pro výpočet započitatelných dnů.
Înainte|Before|Vorher|Avant|Antes|Prima|修改前|変更前|변경 전|До|Przed|Před
După|After|Nachher|Après|Después|Dopo|修改后|変更後|변경 후|После|Po|Po
Înregistrare modificată|Entry updated|Eintrag aktualisiert|Entrée modifiée|Entrada actualizada|Voce aggiornata|条目已更新|項目を更新しました|항목이 수정됨|Запись изменена|Wpis zaktualizowany|Záznam upraven
Înregistrare duplicată|Entry duplicated|Eintrag dupliziert|Entrée dupliquée|Entrada duplicada|Voce duplicata|条目已复制|項目を複製しました|항목이 복제됨|Запись дублирована|Wpis powielony|Záznam duplikován
Înregistrare adăugată|Entry added|Eintrag hinzugefügt|Entrée ajoutée|Entrada añadida|Voce aggiunta|条目已添加|項目を追加しました|항목이 추가됨|Запись добавлена|Wpis dodany|Záznam přidán
Zi de concediu ștearsă|Leave day deleted|Urlaubstag gelöscht|Jour de congé supprimé|Día de permiso eliminado|Giorno di assenza eliminato|休假日已删除|休暇日を削除しました|휴가일이 삭제됨|День отпуска удалён|Dzień urlopu usunięty|Den dovolené odstraněn
Zi eliminată din interval|Day removed from range|Tag aus dem Zeitraum entfernt|Jour retiré de la période|Día retirado del periodo|Giorno rimosso dal periodo|已从时间段移除日期|期間から日を除外しました|기간에서 날짜가 제외됨|День исключён из периода|Dzień wyłączony z okresu|Den odebrán z období
Zi ștearsă din intervalul|Day deleted from range|Tag aus dem Zeitraum gelöscht|Jour supprimé de la période|Día eliminado del periodo|Giorno eliminato dal periodo|已从时间段删除日期|期間から日を削除しました|기간에서 날짜가 삭제됨|День удалён из периода|Dzień usunięty z okresu|Den odstraněn z období
Ziua va fi mutată în Șterse. Celelalte zile din interval rămân în calendar.|This day will move to Deleted. The rest of the range stays on the calendar.|Dieser Tag wird gelöscht. Die übrigen Tage bleiben im Kalender.|Ce jour sera déplacé vers Supprimées. Les autres jours restent dans le calendrier.|El día se moverá a Eliminadas. Los demás días seguirán en el calendario.|Il giorno verrà spostato in Eliminate. Gli altri giorni restano nel calendario.|该日将移至已删除。其他日期将保留在日历中。|この日は削除済みに移動します。他の日はカレンダーに残ります。|이 날짜는 삭제됨으로 이동합니다. 나머지 날짜는 달력에 남습니다.|День будет перемещён в удалённые. Остальные дни останутся в календаре.|Dzień trafi do usuniętych. Pozostałe dni zostaną w kalendarzu.|Den se přesune mezi odstraněné. Ostatní dny zůstanou v kalendáři.
Impact asupra soldului|Impact on balance|Auswirkung auf den Saldo|Effet sur le solde|Efecto en el saldo|Effetto sul saldo|对余额的影响|残高への影響|잔여 일수에 미치는 영향|Влияние на остаток|Wpływ na saldo|Dopad na zůstatek
Înapoi|Back|Zurück|Retour|Volver|Indietro|返回|戻る|뒤로|Назад|Wstecz|Zpět
Confirmă ștergerea zilei|Confirm day deletion|Löschen des Tages bestätigen|Confirmer la suppression du jour|Confirmar eliminación del día|Conferma eliminazione del giorno|确认删除此日|この日の削除を確定|날짜 삭제 확인|Подтвердить удаление дня|Potwierdź usunięcie dnia|Potvrdit odstranění dne
Restaurează înregistrarea|Restore entry|Eintrag wiederherstellen|Restaurer l’entrée|Restaurar entrada|Ripristina voce|恢复条目|項目を復元|항목 복원|Восстановить запись|Przywróć wpis|Obnovit záznam
Intrarea revine cu starea „{0}”.|The entry returns with status “{0}”.|Der Eintrag erhält wieder den Status „{0}“.|L’entrée retrouve le statut « {0} ».|La entrada recupera el estado «{0}».|La voce torna allo stato «{0}».|条目将恢复为“{0}”。|項目の状態は「{0}」に戻ります。|항목 상태가 ‘{0}’(으)로 돌아갑니다.|Запись вернётся в статус «{0}».|Wpis wróci do stanu „{0}”.|Záznam se vrátí do stavu „{0}“.
Șterge înregistrarea|Delete entry|Eintrag löschen|Supprimer l’entrée|Eliminar entrada|Elimina voce|删除条目|項目を削除|항목 삭제|Удалить запись|Usuń wpis|Odstranit záznam
O poți recupera din secțiunea Șterse.|You can restore it from Deleted.|Du kannst den Eintrag unter Gelöscht wiederherstellen.|Vous pourrez la restaurer depuis Supprimées.|Puedes restaurarla desde Eliminadas.|Puoi ripristinarla da Eliminate.|可在已删除中恢复。|削除済みから復元できます。|삭제됨에서 복원할 수 있습니다.|Запись можно восстановить из удалённых.|Wpis można przywrócić z usuniętych.|Záznam lze obnovit z odstraněných.
Intrarea rămâne în Istoric cu starea „Anulat”.|The entry stays in History with status “Cancelled”.|Der Eintrag bleibt mit dem Status „Storniert“ im Verlauf.|L’entrée reste dans l’historique avec le statut « Annulé ».|La entrada queda en el historial como «Cancelada».|La voce resta nella cronologia come «Annullata».|条目将以“已取消”状态保留在历史记录中。|項目は「取り消し済み」として履歴に残ります。|항목은 ‘취소됨’ 상태로 기록에 남습니다.|Запись останется в истории со статусом «Отменено».|Wpis zostanie w historii jako „Anulowany”.|Záznam zůstane v historii ve stavu „Zrušeno“.
Confirmă validarea|Confirm leave taken|Urlaub als genommen bestätigen|Confirmer le congé pris|Confirmar disfrute|Conferma fruizione|确认已休|取得を確定|사용 완료 확정|Подтвердить использование|Potwierdź wykorzystanie|Potvrdit čerpání
Intervalul trece din „{0}” în „Efectuat”.|This range changes from “{0}” to “Taken”.|Der Zeitraum wechselt von „{0}“ zu „Genommen“.|La période passe de « {0} » à « Pris ».|El periodo pasa de «{0}» a «Disfrutado».|Il periodo passa da «{0}» a «Fruito».|此时间段将从“{0}”变为“已休”。|この期間は「{0}」から「取得済み」に変わります。|이 기간은 ‘{0}’에서 ‘사용함’으로 변경됩니다.|Статус периода изменится с «{0}» на «Использовано».|Okres zmieni stan z „{0}” na „Wykorzystany”.|Období přejde ze stavu „{0}“ do stavu „Vyčerpáno“.
Se reintroduce în calcul|Added back to the calculation|Wieder in die Berechnung aufgenommen|Réintégré dans le calcul|Se vuelve a incluir en el cálculo|Rientra nel calcolo|重新计入|計算に戻す|계산에 다시 포함|Снова учитывается|Ponownie uwzględnione|Znovu započteno
Se eliberează din sold|Returned to the balance|Dem Saldo gutgeschrieben|Recrédité au solde|Se devuelve al saldo|Torna al saldo|返还至余额|残高に戻す|잔여 일수에 반환|Возвращено в остаток|Zwrócone do salda|Vráceno do zůstatku
Motivul anulării|Cancellation reason|Stornierungsgrund|Motif de l’annulation|Motivo de cancelación|Motivo dell’annullamento|取消原因|取り消しの理由|취소 사유|Причина отмены|Powód anulowania|Důvod zrušení
Introdu motivul anulării.|Enter a reason for cancellation.|Gib einen Stornierungsgrund ein.|Indiquez le motif de l’annulation.|Introduce un motivo de cancelación.|Inserisci un motivo per l’annullamento.|请输入取消原因。|取り消しの理由を入力してください。|취소 사유를 입력하세요.|Укажите причину отмены.|Podaj powód anulowania.|Zadejte důvod zrušení.
Înregistrare restaurată|Entry restored|Eintrag wiederhergestellt|Entrée restaurée|Entrada restaurada|Voce ripristinata|条目已恢复|項目を復元しました|항목이 복원됨|Запись восстановлена|Wpis przywrócony|Záznam obnoven
Înregistrare mutată în Șterse|Entry moved to Deleted|Eintrag nach Gelöscht verschoben|Entrée déplacée vers Supprimées|Entrada movida a Eliminadas|Voce spostata in Eliminate|条目已移至已删除|項目を削除済みに移動しました|항목이 삭제됨으로 이동함|Запись перемещена в удалённые|Wpis przeniesiony do usuniętych|Záznam přesunut mezi odstraněné
Concediu anulat|Leave cancelled|Urlaub storniert|Congé annulé|Permiso cancelado|Assenza annullata|休假已取消|休暇を取り消しました|휴가가 취소됨|Отпуск отменён|Urlop anulowany|Dovolená zrušena
Importul va înlocui înregistrările și istoricul din acest browser.|Importing will replace this browser’s entries and history.|Der Import ersetzt die Einträge und den Verlauf in diesem Browser.|L’importation remplacera les entrées et l’historique de ce navigateur.|La importación reemplazará las entradas y el historial de este navegador.|L’importazione sostituirà le voci e la cronologia di questo browser.|导入将替换此浏览器中的条目和历史记录。|インポートすると、このブラウザーの項目と履歴が置き換わります。|가져오면 이 브라우저의 항목과 기록이 대체됩니다.|Импорт заменит записи и историю в этом браузере.|Import zastąpi wpisy i historię w tej przeglądarce.|Import nahradí záznamy a historii v tomto prohlížeči.
Renunță|Cancel|Abbrechen|Annuler|Cancelar|Annulla|取消|キャンセル|취소|Отмена|Anuluj|Zrušit
Înlocuiește datele|Replace data|Daten ersetzen|Remplacer les données|Reemplazar datos|Sostituisci dati|替换数据|データを置き換える|데이터 교체|Заменить данные|Zastąp dane|Nahradit data
Fișierul nu este un backup Leave Planner valid. Datele locale au fost păstrate.|This is not a valid Leave Planner backup. Local data was kept.|Die Datei ist keine gültige Leave-Planner-Sicherung. Lokale Daten wurden beibehalten.|Ce fichier n’est pas une sauvegarde Leave Planner valide. Les données locales ont été conservées.|La copia de Leave Planner no es válida. Se conservaron los datos locales.|Il backup di Leave Planner non è valido. I dati locali sono stati conservati.|此文件不是有效的 Leave Planner 备份。本地数据已保留。|有効な Leave Planner のバックアップではありません。ローカルデータは保持されました。|유효한 Leave Planner 백업이 아닙니다. 로컬 데이터는 유지되었습니다.|Недействительная копия Leave Planner. Локальные данные сохранены.|To nie jest prawidłowa kopia Leave Planner. Dane lokalne zachowano.|Neplatná záloha Leave Planner. Místní data byla zachována.
Anul Nou|New Year’s Day|Neujahr|Jour de l’An|Año Nuevo|Capodanno|元旦|元日|새해 첫날|Новый год|Nowy Rok|Nový rok
A doua zi de Anul Nou|Second day of the New Year|Zweiter Neujahrstag|Deuxième jour de l’An|Segundo día de Año Nuevo|Secondo giorno di Capodanno|元旦次日|新年2日目|새해 둘째 날|Второй день Нового года|Drugi dzień Nowego Roku|Druhý den Nového roku
Boboteaza|Epiphany|Heilige Drei Könige|Épiphanie|Epifanía|Epifania|主显节|公現祭|주현절|Богоявление|Objawienie Pańskie|Zjevení Páně
Sfântul Ioan Botezătorul|Saint John the Baptist|Johannes der Täufer|Saint Jean-Baptiste|San Juan Bautista|San Giovanni Battista|施洗约翰节|洗礼者ヨハネの日|세례자 요한 축일|День Иоанна Крестителя|Dzień św. Jana Chrzciciela|Den sv. Jana Křtitele
Ziua Unirii Principatelor Române|Romanian Principalities Union Day|Tag der Vereinigung der rumänischen Fürstentümer|Jour de l’union des principautés roumaines|Unión de los Principados Rumanos|Unione dei Principati romeni|罗马尼亚公国统一日|ルーマニア公国統一記念日|루마니아 공국 통일 기념일|День объединения Румынских княжеств|Dzień Zjednoczenia Księstw Rumuńskich|Den sjednocení rumunských knížectví
Ziua Muncii|Labour Day|Tag der Arbeit|Fête du Travail|Día del Trabajo|Festa dei lavoratori|劳动节|メーデー|노동절|День труда|Święto Pracy|Svátek práce
Ziua Copilului|Children’s Day|Kindertag|Journée des enfants|Día del Niño|Giornata dei bambini|儿童节|こどもの日|어린이날|День защиты детей|Dzień Dziecka|Den dětí
Adormirea Maicii Domnului|Assumption of Mary|Mariä Himmelfahrt|Assomption|Asunción de María|Assunzione di Maria|圣母升天节|聖母被昇天祭|성모 승천 대축일|Успение Богородицы|Wniebowzięcie Maryi|Nanebevzetí Panny Marie
Sfântul Andrei|Saint Andrew’s Day|Andreastag|Saint-André|San Andrés|Sant’Andrea|圣安德烈节|聖アンデレの日|성 안드레아 축일|День святого Андрея|Dzień św. Andrzeja|Den sv. Ondřeje
Ziua Națională|Romanian National Day|Rumänischer Nationalfeiertag|Fête nationale roumaine|Fiesta Nacional de Rumanía|Festa nazionale romena|罗马尼亚国庆日|ルーマニア国民の日|루마니아 국경일|Национальный день Румынии|Święto Narodowe Rumunii|Národní den Rumunska
Crăciunul|Christmas Day|Erster Weihnachtstag|Noël|Navidad|Natale|圣诞节|クリスマス|성탄절|Рождество|Boże Narodzenie|Boží hod vánoční
A doua zi de Crăciun|Second day of Christmas|Zweiter Weihnachtstag|Lendemain de Noël|Segundo día de Navidad|Secondo giorno di Natale|圣诞节次日|クリスマス翌日|성탄절 다음 날|Второй день Рождества|Drugi dzień Bożego Narodzenia|Druhý svátek vánoční
Vinerea Mare|Good Friday|Karfreitag|Vendredi saint|Viernes Santo|Venerdì Santo|耶稣受难日|聖金曜日|성금요일|Страстная пятница|Wielki Piątek|Velký pátek
Paștele ortodox|Orthodox Easter|Orthodoxes Ostern|Pâques orthodoxes|Pascua ortodoxa|Pasqua ortodossa|东正教复活节|正教会の復活祭|정교회 부활절|Православная Пасха|Prawosławna Wielkanoc|Pravoslavné Velikonoce
A doua zi de Paște|Easter Monday|Ostermontag|Lundi de Pâques|Lunes de Pascua|Lunedì di Pasqua|复活节星期一|復活祭翌日の月曜日|부활절 월요일|Пасхальный понедельник|Poniedziałek Wielkanocny|Velikonoční pondělí
Rusaliile|Pentecost|Pfingsten|Pentecôte|Pentecostés|Pentecoste|圣灵降临节|聖霊降臨祭|성령 강림 대축일|Троица|Zesłanie Ducha Świętego|Letnice
A doua zi de Rusalii|Whit Monday|Pfingstmontag|Lundi de Pentecôte|Lunes de Pentecostés|Lunedì di Pentecoste|圣灵降临节星期一|聖霊降臨祭翌日の月曜日|성령 강림절 월요일|Духов день|Poniedziałek Zielonoświątkowy|Svatodušní pondělí
`.trim().split("\n").map(row => {
  const [ro, en, de, fr, es, it, zh, ja, ko, ru, pl, cs] = row.split("|");
  return [ro, { en, de, fr, es, it, zh, ja, ko, ru, pl, cs }];
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
