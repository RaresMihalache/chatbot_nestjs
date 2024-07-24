"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const tiktoken_1 = require("tiktoken");
let ChatbotService = class ChatbotService {
    constructor(configService) {
        this.configService = configService;
        this.context = [
            {
                role: 'system',
                content: 'Esti un asistent care ajuta cu generarea de oferte pentru clientii care vin spre tine cu potentiale proiecte din domeniul IT (web development, mobile si nu numai). Oferta ta trebuie sa contina urmatoarele sectiuni: "I. Scopul documentatiei", "II. Propunere structura", "III. Sugestii suplimentare", "IV. Pret si timp de implementare". Explica cat mai detaliat si fa in asa fel incat fiecare raspuns sa aiba o lungime de minim 2000 token-uri.',
            },
            {
                role: 'user',
                content: 'Solicitarea client: Aplicatia sa contina 3 ramuri esentiale: 1. Sofer: harta cu traseul sau care sa contina punctele de ridicare si livrare. Timpul estimat pentru ambele . Posibilitatea de a prelua singur o solicitare de la un restaurant sau sa i se acorde livrari. Raport zilnic cu livrarile efectuate.Actualizare in timp real al parcursului sau catre client. 2. Restaurant: preluare comenzi, confirmarea lor si a statusului comenzii in timp real catre client. In orele de varf sa nu mai aiba clientul optiunea de a pune noi comenzi daca dureaza mai mult decat timpul estimat in aplicatie. Solictare sofer si optiunea de a vedea parcursul soferului. 3. Client : sa i-a la cunostinta toate detaliile legate de restaurant ( timp estimate de livrare , timp de preparare etc). sa adauge produse in cos , achizitie cu card sau numerar din aplicatie. Sa primeasca notificari cu fiecare parcurs al comenzii (confirmata, comanda urmeaza sa fie ridicata, comanda a fost ridicata, comanda livrata). Dupa plasarea si confirmarea si preluarea comenzii de catre sofer sa I se prezinte soferul, numarul de contact al acestuia si parcursul sau pe harta. FUNCTIE ADMIN : care poate observa activitatea celor 3 ramuri mentionate si poate efectua un raport pe fiecare. Firma are contracted oar cu restaurante . In aditie mai fac livrari de colete mici sau plicuri la solicitarea clientilor prin urmare ar trebui si o optiune de acest gen in aplicatie unde sa ofere cateva info despre colet (daca e plic sau e o cutie si ce demensiuni/greutate are).',
            },
            {
                role: 'assistant',
                content: `I. Scopul documentului: 

Această ofertă preliminară este bazată pe informațiile pe care ni le-ați furnizat. Înainte de a începe efectiv dezvoltarea și de a vă putea oferi o estimare exactă a costurilor și timpului necesar, va fi necesar să parcurgem câteva etape esențiale de planificare

1. Elaborarea unei diagrame logice pentru a defini arhitectura aplicației. 
2. Crearea unei diagrame ER pentru a structura baza de date. 
3. Realizarea unui design inițial în Figma pentru a elimina orice ambiguitate legată de interfața grafică. 

Pentru începerea etapelor de mai sus, va fi necesar să semnăm un contract de colaborare și să achitați în avans prețul acestora: 

Diagrama logică și diagrama ER: X Euro + TVA 
Proiectul în Figma: X Euro + TVA 
Acești bani se vor scădea din prețul total de dezvoltare odată acceptată oferta fermă. 

Oferta de mai jos este doar orientativă și urmărește să vă ofere o perspectivă asupra modului în care operăm și a costurilor probabile. Pentru o ofertă și un timp de implementare exact, va fi necesar să completăm etapele de planificare menționate

Definiții:
●	React:
○	React este o bibliotecă JavaScript pentru construirea interfețelor de utilizator. Este utilizată pentru crearea unor interfețe de utilizator reactive și eficiente din punct de vedere al performanței.

●	Ionic:
○	Ionic este un framework open-source pentru dezvoltarea de aplicații mobile hibride. Utilizează tehnologii web precum JavaScript/React/Angular  pentru a construi aplicații pentru platforme mobile, cum ar fi iOS și Android.

●	NestJS:
○	NestJS este un framework pentru dezvoltarea de aplicații server-side cu Node.js. Este construit pe baza arhitecturii modulare și utilizează TypeScript pentru a oferi un cod bine structurat și ușor de întreținut.

●	Firebase:
○	Firebase este o platformă de dezvoltare a aplicațiilor mobile. Furnizează servicii precum bază de date în timp real, autentificare, stocare și hosting, facilitând dezvoltarea rapidă și scalabilă a aplicațiilor.

●	MongoDB:
○	MongoDB este un sistem de gestionare a bazelor de date NoSQL, orientat pe documente. În loc de tabele, MongoDB folosește colecții și documente JSON-like, oferind flexibilitate și scalabilitate în stocarea datelor.

●	API (Interfață de Programare a Aplicațiilor):
○	API reprezintă un set de reguli și protocoale care permit comunicarea între diferite componente ale software-ului/aplicației. Este folosit pentru a permite integrarea între diferite aplicații sau servicii, facilitând schimbul de informații și funcționalități între ele.


II. Propunere structură (335 Ore - 2 Programatori): 

1.	Dezvoltarea de bază:
 
a.	Dezvoltarea aplicațiilor folosind tehnologii moderne, cum ar fi React cu Ionic pentru interfața utilizatorului și MongoDB/Firebase pentru baza de date si NestJs pentru back-end.
b.	Conectare utilizatori cu autentificare OTP prin SMS/email pentru securitate sporită.

2.	Aplicație Client (iOS și Android): 
a.	Căutare Restaurante: Utilizatorii pot căuta restaurante pe baza locației, tipului de bucătărie.
b.	Plasare Comenzi: Interfață intuitivă pentru a selecta articole din meniul restaurantului și plasa comanda cu opțiuni precum adăugarea în coș și gestionarea comenzilor anterioare.
c.	Urmărire Livrare: Funcționalitate de monitorizare a comenzilor în timp real, cu notificări și informații despre stadiul livrării.
d.	Recenzii și Evaluări: Utilizatorii pot lăsa recenzii și evaluări pentru restaurantele și livrările lor.
e.	Legare API Stripe pentru Plata cu Cardul: Implementarea unei interfețe de plată folosind API-ul Stripe pentru a permite utilizatorilor să plătească cu cardul.
f.	Stocare Carduri: Opțiunea pentru utilizatori de a salva informațiile cardului pentru a facilita plățile ulterioare și a oferi o experiență de plată mai rapidă.
g.	Opțiune de Plată Ramburs: Posibilitatea pentru utilizatori de a alege opțiunea de plată la livrare.

3.	Aplicație Rider (iOS și Android):
a.	Acceptare Comenzi: Interfață pentru a accepta sau refuza comenzile, cu informații detaliate despre adresa de livrare și conținutul comenzii.
b.	Gestionare Livrări: Funcționalitate cu informații în timp real despre stadiul comenzii.
c.	Raportare Financiară: Funcționalitate pentru a genera rapoarte financiare, inclusiv livrari zilnice și lunare.
d.	Interfață de Navigare: Integrare cu sisteme de navigare pentru a ajuta riderul în timpul livrării (Legare API Google Maps).

4.	Aplicație Restaurant (iOS și Android):
a.	Gestionare Meniu: Interfață pentru a adăuga, șterge sau modifica articolele din meniu, inclusiv prețuri și disponibilitate.
b.	Confirmare Livrări: Posibilitatea de a confirma comenzile și de a oferi informații despre timpul de pregătire și de livrare.
c.	Raportare Financiară: Funcționalitate pentru a genera rapoarte financiare, inclusiv vânzări zilnice și lunare.

5.	Aplicație Admin (Doar Browser):
a.	Gestionare Utilizatori: Crearea și gestionarea conturilor de utilizator, inclusiv drepturile de acces.
b.	Gestionare Restaurante: Crearea și gestionarea restaurantelor.
c.	Gestionare Rider: Crearea și gestionarea riderilor.
d.	Monitorizare Comenzi: Interfață pentru a monitoriza comenzile în timp real și a rezolva problemele semnalate de utilizatori.
e.	Rapoarte și Analize: Generarea de rapoarte și analize financiare, inclusiv vânzări zilnice și lunare.

III. Sugestii suplimentare (24 ore de munca * 2 programatori): 
1.	Generarea automată a facturilor: Legare la API SmartBill pentru a genera automat facturile pentru rideri, restaurante și clienți

IV. Pret și timp de implementare: 

*Fiecare punct poate fi supus modificării, editării sau realizării într-un mod mai sumar, cu reducerea funcționalităților, în vederea obținerii unei costuri mai reduse.

*Prețul este orientativ și nu trebuie să fie limitativ; în cazul în care bugetul beneficiarului este mai restrâns decât oferta noastră în faza de proiectare, putem identifica alternative la costuri inferioare prin integrarea unui număr redus de funcționalități.

Timp estimat de livrare: 
-	Dezvoltare de bază împreună cu aplicațiile Client, Rider, Restaurant și Admin (355 Ore cu 2 Programatori): X Euro + TVA

-	Dezvoltare de bază împreună cu aplicațiile Client, Rider, Restaurant și Admin și sugestii suplimentare (379 Ore cu 2 Programatori): X Euro + TVA

Timpul de livrare este influențat de complexitatea proiectului și cerințele dumneavoastră. Vom lucra în strânsă colaborare cu dumneavoastră pentru a respecta termenele stabilite.

*În cadrul actualei oferte, beneficiați de serviciile a doi programatori specializați în limbajul de programare necesar pentru proiectul dumneavoastră, un manager de proiect care va concepe și coordona proiectul, precum și un grafician responsabil de conceperea interfeței utilizatorului/aplicației. Fiecare echipă din cadrul societății noastre dispune de suportul unui mentor, responsabil de supravegherea și asistarea programatorilor. Prețul pentru această echipă este de X de euro pe oră. 

Termeni de achiziție:

1.	Această ofertă este strict confidențială. Veziv IT Services SRL nu oferă permisiunea de a împărtăși detalii cu terțe părți.
2.	Prețurile sunt fără TVA.
`,
            },
            {
                role: 'user',
                content: 'Solicitarea client: Comenzile se depun doar online. Moment in care este preluata comanda pentru a verifica stocul de materiale,costurile cu care au fost achizitionate si ce resturi de material pot fi folosite in lucrarea solicitata, apoi se realizeaza o oferta de pret care este trimisa catre client. Daca clientul accepta oferta propusa se realizeaza o comanda pe diferenta de material necesare si comanda este data spre prelucrare. Intre timp clientul primeste diverse documente care ii sunt necesare fie ca acesta cunoste acest aspect sau nu. Cum ar fi : Aviz Calitate, SSM, Certificat Performanta si Factura . 1. In momentul in care un client depune online o comanda ERP-ul sa extraga din acea comanda in mod automat un necesar de material; 2. Sa existe o sectiune de “RESTURI MATERIALE” unde sa fie intrudose pe marimi si bucati in sistem iar la momentul unei noi comenzi dupa ce se sugereaza de catre ERP necesarul de materiale sa existe optiunea automata de interogare a stocului curent, a resturilor reutilizabile de materiale si de comenzile deschise. ( exemplu : 1500buc/articol din care 1300buc/articol rezervate pt comenzile deschise si raman pt noua comanda 200buc/articol si 3 resturi care se potrivesc ca dimensiune pt noua comanda). Recapitulare : in momentul in care exista o noua comanda , programul sa extraga automat din stoc necesarul si daca e ceva din resturile de material sa se potriveasca sa se extraga si acelea, astfel incat sa ramana strict necesarul unei noi comenzicatre furnizor.Aceste informatii fiind necesare inainte de a plasa catre furnizor o coamnda cu necesar. 3. In momentul in care comanda este finalizata si este pregatita pentru a fi trimisa catre client anuumite produse se trimit asamblate, insa altele se trimit pe bucati. Angajatul care face inventarul inainte de livrare sa aiba posibilitatea de a trece in ERP componentele lipsa, astfel incat cei care se ocupa de gestiune sa vada in timp real acest lucru sis a efectueze o coamnda pt ele catre furnizor. 4. Pentru partea de documente : documentele mentionate in INTRO sa se automatizeze in stilul in care avem noi in ERP la acordul de confidentialitate. 5. CASH-FLOW: sold curent al firmei in banca si viitoarele plati si incasari impartite pe OP si BO (biletele la ordin sa fie cu reminder la inceput de saptamana- fie ca incaseaza fie ca plateste el). In momentul in care firma in cauza efectueaza un BO fiind un buget stabilit lunar pt ele , programul sa nu ii permita ca din greseala sa depaseasca acel buget in momentul in care noteaza in ERP un nou BO de efectuat. NOTA: singurul program software cu care se lucreaza acum este WinMENTOR.',
            },
            {
                role: 'assistant',
                content: `I. Scopul documentului: 

Această ofertă preliminară este bazată pe informațiile pe care ni le-ați furnizat în același timp înainte de a începe efectiv dezvoltarea și de a vă putea oferi o estimare exactă a costurilor și timpului necesar, va fi necesar să parcurgem câteva etape esențiale de planificare

1. Elaborarea unei diagrame logice pentru a defini arhitectura aplicației. 
2. Crearea unei diagrame ER pentru a structura baza de date. 
3. Realizarea unui design inițial în Figma pentru a elimina orice ambiguitate legată de interfața grafică. 

Pentru începerea etapelor de mai sus, va fi necesar să semnăm un contract de colaborare și să achitați în avans prețul acestora: 

Diagrama logică și diagrama ER: X Euro + TVA 
Proiectul în Figma: X Euro + TVA 
Acești bani se vor scădea din prețul total de dezvoltare odată acceptată oferta fermă. 

Oferta de mai jos este doar orientativă și urmărește să vă ofere o perspectivă asupra modului în care operăm și a costurilor probabile. Pentru o ofertă și un timp de implementare exact, va fi necesar să completăm etapele de planificare menționate

Scopul acestui document este de a prezenta o ofertă pentru dezvoltarea unui CRM/ERP personalizat conform cerințelor.

Definiții:
- CRM (Customer Relationship Management): CRM este un acronim pentru "Customer Relationship Management" sau "Gestionarea Relațiilor cu Clienții" în română. Este o strategie și un set de tehnologii utilizate pentru a gestiona relațiile și interacțiunile cu clienții. Scopul principal al unui sistem CRM este să îmbunătățească relațiile cu clienții, să optimizeze procesele de vânzare și marketing și să ofere o mai bună experiență generală pentru clienți.
- ERP (Enterprise Resource Planning): ERP este un acronim pentru "Enterprise Resource Planning" sau "Planificarea Resurselor Enterprise" în română. Este un sistem de software care ajută organizațiile să gestioneze și să integreze eficient toate procesele lor de afaceri, inclusiv contabilitatea, resursele umane, gestionarea stocurilor, producția, vânzările și multe altele. Scopul principal al unui sistem ERP este să faciliteze fluxurile de lucru interne și să ofere o imagine consolidată și în timp real a resurselor și proceselor organizației.

II. Propunere structură: 

1. Secțiune de Comenzi și Stocuri:

-	Implementarea unui sistem de gestionare a comenzilor online, inclusiv verificarea stocurilor de materiale și costurile de achiziție (Înainte de a plasa comanda, se va genera automat o ofertă. Administratorii vor valida oferta, iar apoi aceasta va fi trimisă către client printr-un buton dedicat. Comanda va fi procesată doar atunci când clientul acceptă oferta, moment în care stocurile vor fi rezervate timp de 2 zile, astfel încât materialele să fie disponibile în momentul acceptării ofertei de către client).
-	Sistem de gestionare a resturilor de materiale, unde informațiile despre dimensiuni și cantități pot fi introduse și monitorizate.
-	Automatizarea extragerii necesarului de materiale din stocuri și din resturile disponibile pentru fiecare comandă nouă.
- Timp de dezvoltate: 25 zile * 2 programatori

2. Secțiune de Livrare și Gestiune:
-	Implementarea unui sistem de gestionare a livrărilor care poate manipula produsele asamblate sau trimise pe bucăți cu posibilitatea angajaților care efectuează inventarul înainte de livrare de a introduce în ERP componentele lipsă.
-	Sincronizarea în timp real a stocurilor și notificare pentru generarea a comenzilor către furnizori pentru componente lipsă.
- Timp de dezvoltate: 15 zile * 2 programatori

3. Automatizarea Documentelor:
-	Implementarea unui sistem de automatizarea generării documentelor necesare, cum ar fi Avize de Calitate, documente SSM, Certificate de performanță.
- Timp de dezvoltate: 5 zile * 2 programatori

4. Gestionarea Cash-Flow-ului:
-	Monitorizarea soldului curent al firmei în bancă și urmărirea viitoarelor plăți și încasări, împărțite pe ordine de plată (OP) și bilete la ordin (BO) automatizare prin importul de fișiere CSV din extrasele băncii.
-	Implementarea unui sistem de gestionare a bugetelor (BO), cu posibilitatea de a seta și monitoriza limitele de cheltuieli pentru fiecare lună. (Notificări și avertizări pentru a preveni depășirea bugetului stabilit.)
- Timp de dezvoltate: 20 zile * 2 programatori

5. Integrarea cu WinMentor:
-	Integrarea cu Mentor, programul software actual, pentru a asigura o tranziție eficientă a datelor și proceselor.
- Timp de dezvoltate: 12 zile * 1 programator

III. Sugestii suplimentare:
-	Implementarea unui API bancar pentru automatizarea operațiunilor de intrare și ieșire din contul bancar al firmei, cu scopul de a sincroniza automat o parte din datele financiare direct de pe cont.
- Timp de dezvoltate: 10 zile * 1 programator

IV. Pret și timp de implementare: 

Timp estimat de livrare: 
-	71 zile * 2 programatori (568 Ore lucratoare dezvoltare bază): X Euro + TVA 
-	10 zile * 1 programator (secțiunea sugestii = 80 Ore lucratoare): X Euro + TVA 
Timpul de livrare este influențat de complexitatea proiectului și cerințele dumneavoastră. 
Vom lucra în strânsă colaborare cu dumneavoastră pentru a respecta termenele stabilite.
`,
            },
            {
                role: 'user',
                content: 'Solicitarea client: Productie mancare cu specific oriental de tipul ready to eat sau ready to cook INTRO: Este o firma producatoare de mancare orientala (semipreparata sau gata de servit) ele toate vin ambalate la caserola cu o valabilitate de 5-7 zile in functie de produs. Clientii lor sunt supermarketuri precum Mega Image , Careffour, Kaufland. Toate comenzile vin pe adresa de mail. Lucreaza cu 2 programe : Edisoft (care detine din ce am inteles 2 subpuncte Doc Process(kaufland) si Tech Net(careffour) din aceste programe se preiau automat in mail comenzile si trece prin SAGA pentru a fi avizate apoi se trece intr-un excel un necesar de materie prima pt productie. Comanda se finalizeaza fie in ziua respectiva fie a2-a zi dimineata si produsul finit este trimis catre magazinul care a efectuat comanda. Se efectueaza receptia de catre magazin apoi se emite factura in SAGA si este trimisa catre magazin pentru a fi achitata. 1. Gestiune stoc materie prima, produs finit, ambalaje,combustibil; 2. Raportare: pe fiecare colaborator si toate punctele de lucru ale acestuia la final de zi/saptamana/luna sa extraga un raport cu ce anume s-a livrat (produs finit si cantitate), costurile si profitul. Optional: 3. Cash Flow: saptamana viitoare sau luna viitoare ce achizitii si plati are de facut si ce incasari il asteapta 4. Resurse Umane : a zis ca vrea ceva basic , din ce am inteles doreste sa aiba o casuta cu toti angajatii si sa existe o evidenta a zilelor libere, concedii etc. Astfel incat daca intr-o zi cauta un anume angajat si nu este prezent sa stie de ce si/sau daca saptamana viitoare are mai multe livrari sa stie exact cati soferi vor fi prezenti la munca.',
            },
            {
                role: 'assistant',
                content: `I. Scopul documentului: 

Această ofertă preliminară este bazată pe informațiile pe care ni le-ați furnizat în același timp înainte de a începe efectiv dezvoltarea și de a vă putea oferi o estimare exactă a costurilor și timpului necesar, va fi necesar să parcurgem câteva etape esențiale de planificare

1. Elaborarea unei diagrame logice pentru a defini arhitectura aplicației. 
2. Crearea unei diagrame ER pentru a structura baza de date. 
3. Realizarea unui design inițial în Figma pentru a elimina orice ambiguitate legată de interfața grafică. 

Pentru începerea etapelor de mai sus, va fi necesar să semnăm un contract de colaborare și să achitați în avans prețul acestora: 

Diagrama logică și diagrama ER: X Euro + TVA 
Proiectul în Figma: X Euro + TVA 
Acești bani se vor scădea din prețul total de dezvoltare odată acceptată oferta fermă. 

Oferta de mai jos este doar orientativă și urmărește să vă ofere o perspectivă asupra modului în care operăm și a costurilor probabile. Pentru o ofertă și un timp de implementare exact, va fi necesar să completăm etapele de planificare menționate

Scopul acestui document este de a prezenta o ofertă pentru dezvoltarea unui CRM/ERP personalizat conform cerințelor.

Definiții:
- CRM (Customer Relationship Management): CRM este un acronim pentru "Customer Relationship Management" sau "Gestionarea Relațiilor cu Clienții" în română. Este o strategie și un set de tehnologii utilizate pentru a gestiona relațiile și interacțiunile cu clienții. Scopul principal al unui sistem CRM este să îmbunătățească relațiile cu clienții, să optimizeze procesele de vânzare și marketing și să ofere o mai bună experiență generală pentru clienți.
- ERP (Enterprise Resource Planning): ERP este un acronim pentru "Enterprise Resource Planning" sau "Planificarea Resurselor Enterprise" în română. Este un sistem de software care ajută organizațiile să gestioneze și să integreze eficient toate procesele lor de afaceri, inclusiv contabilitatea, resursele umane, gestionarea stocurilor, producția, vânzările și multe altele. Scopul principal al unui sistem ERP este să faciliteze fluxurile de lucru interne și să ofere o imagine consolidată și în timp real a resurselor și proceselor organizației.

II. Propunere structură: 

1.	Dezvoltare baza:
a.	Dezvoltarea unui sistem de management folosind tehnologii moderne, cum ar fi React pentru interfața utilizatorului și MongoDB/Firebase pentru baza de date.
b.	Conectare utilizatori bazată pe roluri cu autentificare OTP prin SMS/email pentru securitate sporită. 
- Timp de dezvoltate: 3 zile * 2 programatori

c.	Un sistem de gestionare a stocului, împărțit în categorii (materie prima, produs finit, ambalaje, combustibil, etc) cu posibilitatea de a adăuga și șterge produse și de a modifica cantitatea.
- Timp de dezvoltate: 10 zile * 2 programatori

d.	Un sistem de creare și monitorizare de comenzi cu o interfata simpla si intuitiva pentru a crea si actualiza comenzi. Fiecare comanda va avea un status propriu, va contine materia prima necesara pentru comanda, produsul finit, colaboratorul și toate detaliile relevante pentru comanda. De asemenea va exista opțiunea de a importa comenzi printr-un API Edisoft sau CSV-uri pentru a automatiza procesul de creare comenzi..
- Timp de dezvoltate: 9 zile * 2 programatori

e.	Un sistem de generare de rapoarte pentru fiecare colaborator/punct de lucru care va contine costurile totale, încasările și profitul. Rapoartele se pot genera pe mai multe perioade (1 zi, 1 saptamana, etc).
- Timp de dezvoltate: 9 zile * 2 programatori

2.	Opțional:
a.	Un sistem de monitorizare a costurilor și profiturilor viitoare (pe o perioada de timp aleasă: 1 saptamana, 1 luna, etc), in baza comenzilor existente.
- Timp de dezvoltate: 10 zile * 2 programatori

b.	Un sistem de monitorizare al disponibilității angajatilor care va contine zilele libere ale acestora.
- Timp de dezvoltate: 3 zile * 2 programatori


III. Sugestii suplimentare:
 
A.	Un dashboard de colaboratori cu toate punctele de lucru aferente. Fiecare colaborator va contine comenzile adresate lui, punctele de lucru, costurile, încasările și profitul pentru o monitorizare mai ușoară a întregii operațiuni.
- Timp de dezvoltate: 11 zile * 2 programatori
B.	Integrarea cu API-uri existente SMARTBILL/FGO pentru automatizarea facturilor.
- Timp de dezvoltate: 3 zile * 2 programatori

IV. Pret și timp de implementare: 

Timp estimat de livrare: 
-	31 zile * 2 programatori (496 Ore lucratoare dezvoltare baza): X Euro
-	13 zile * 2 programatori (secțiunea opțional = 208 Ore lucratoare): X Euro
-	14 zile * 2 programatori (secțiunea sugestii = 224 Ore lucratoare): X Euro
Timpul de livrare depinde de complexitatea proiectului și cerințele dvs. Dar, vom lucra în strânsă colaborare cu dvs. pentru a respecta deadline-urile stabilite.
`,
            },
            {
                role: 'user',
                content: 'Solicitarea client: Firma de consultanta si constructii INTRO: clientul are 2 obiecte de activitate. 1 construire cladiri si 2 servicii de consultanta. Doreste un CRM care sa se poata dezvolta in continuare dupa finalizare, prin urmare doreste o colaborare pe termen lung cu noi . Concret, pentru acest moment ii este prioritara partea de consultanta a activitatii sale, insa dupa implementarea acestui CRM , vrea sa il dezvolte mai apoi si pe partea de constructii cu gestiuni materiale, cashflow etc, deoarece, doreste sa deschida si alte puncte de lucru in diverse orase. Programul pe care il folosesc acum este smartbill (facturare si gestiune) si ar trebui sa fie compatibil cu acesta. NOTA: vezi https://midwork.ro/ 1. Proiectare 2. Executie 3. Mentenanta 4. Raportare Aceste casute sa existe per client introdus in CRM, astfel incat sa se vada in timp real ce a solicitat clientul, ce documente s-au trimis, in ce stadiu se afla clientul si intr-un final, dupa inchiderea clientului, tot istoricul acestuia. AUTOMATIZARE documente : clientul odata introdus in CRM cu toate datele sale sa existe posibilitatea de autocompletare a documentatiei cu datele clientului ( tot ce tine de ocbiectul de activitate SSM, SU, facturi , etc) Acest client a mai avut 2 solicitari separate de CRM si legale de site sau eventual sa existe posibilitatea de a corela CRM cu site. Anume : 1. Clientii sa aiba optiunea de a face un ticket pe site care sa se inregistreze automat in CRM pentru a raporta o problema , pt a solicita informatii, oferte etc. 2. Clientii noi sa aiba posibilitatea de a-si face singuri programari pe site sau sa solicite info . Aceste 2 solicitari legate de site le are deoarece acum toti clientii in suna direct pe el, acesta avand numarul afisat pe site la contact si ar dori sa fie indrumati sa faca cele mentionate singuri si apoi sa fie preluati fie de el fie de un angajat.',
            },
            {
                role: 'assistant',
                content: `I. Scopul documentului: 

Această ofertă preliminară este bazată pe informațiile pe care ni le-ați furnizat în același timp înainte de a începe efectiv dezvoltarea și de a vă putea oferi o estimare exactă a costurilor și timpului necesar, va fi necesar să parcurgem câteva etape esențiale de planificare

1. Elaborarea unei diagrame logice pentru a defini arhitectura aplicației. 
2. Crearea unei diagrame ER pentru a structura baza de date. 
3. Realizarea unui design inițial în Figma pentru a elimina orice ambiguitate legată de interfața grafică. 

Pentru începerea etapelor de mai sus, va fi necesar să semnăm un contract de colaborare și să achitați în avans prețul acestora: 

Diagrama logică și diagrama ER: X Euro + TVA 
Proiectul în Figma: X Euro + TVA 

Acești bani se vor scădea din prețul total de dezvoltare odată acceptată oferta fermă. 

Oferta de mai jos este doar orientativă și urmărește să vă ofere o perspectivă asupra modului în care operăm și a costurilor probabile. Pentru o ofertă și un timp de implementare exact, va fi necesar să completăm etapele de planificare menționate

Scopul acestui document este de a prezenta o ofertă pentru dezvoltarea unui CRM/ERP personalizat conform cerințelor.

Definiții:
- CRM (Customer Relationship Management): CRM este un acronim pentru "Customer Relationship Management" sau "Gestionarea Relațiilor cu Clienții" în română. Este o strategie și un set de tehnologii utilizate pentru a gestiona relațiile și interacțiunile cu clienții. Scopul principal al unui sistem CRM este să îmbunătățească relațiile cu clienții, să optimizeze procesele de vânzare și marketing și să ofere o mai bună experiență generală pentru clienți.
- ERP (Enterprise Resource Planning): ERP este un acronim pentru "Enterprise Resource Planning" sau "Planificarea Resurselor Enterprise" în română. Este un sistem de software care ajută organizațiile să gestioneze și să integreze eficient toate procesele lor de afaceri, inclusiv contabilitatea, resursele umane, gestionarea stocurilor, producția, vânzările și multe altele. Scopul principal al unui sistem ERP este să faciliteze fluxurile de lucru interne și să ofere o imagine consolidată și în timp real a resurselor și proceselor organizației.

II. Propunere structură: 
1.	Dezvoltarea CRM de bază (44 de zile lucratoare * 2 programatori):
a.	Dezvoltarea unui sistem CRM folosind tehnologii moderne, cum ar fi React pentru interfața utilizatorului și MongoDB/Firebase pentru baza de date.
b.	Conectare utilizatori bazată pe roluri cu autentificare OTP prin SMS/email pentru securitate sporită.
c.	Integrarea cu API-uri existente SMARTBILL pentru automatizarea facturărilor.
d.	Integrare cu API: OpenAPI (https://openapi.ro/) pentru înregistrarea unui client juridic nou. (Se vor prelua și autocompleta datele firmei în mod automat în baza CUI-ului firmei, cu ajutorul API-ului)
e.	Sistem de permisiuni pentru utilizatori pentru a gestiona accesul la date.
f.	Adăugarea și gestionarea clienților, inclusiv informații firmei, istoricul facturilor și proiectelor/documentelor.
g.	Sistem de calendar pentru programări.
h.	Sistem de raportare pentru activitatea zilnică pe proiect/client.
i.	Sistem pentru adăugarea a multiple proiecte pentru fiecare client, cu secțiunile 'Proiectare, Execuție, Mentenanță, Raportare', care vor avea un status general. În fiecare secțiune se pot adăuga diverse tipuri de documente/fișiere, fiecare cu un status propriu, pentru a permite monitorizarea statusului fiecărui document.
j.	Sistem pentru generarea automată a documentelor, utilizând datele clientului/proiectului prin intermediul API-ului Google Docs, gestionate cu draft-uri.

2.	Legatura Site midwork.ro - CRM:
a.	Un sistem de programari pe baza de calendar. Programarile se vor înregistra automat in google calendar si se va genera un google meet la ora si data respectiva.
b.	Un sistem de tickete, unde clienții pot scrie orice solicitare/problema, urmând ca mesajul sa fie trimis automat pe email.

		Aceste sisteme pot fi dezvoltate in 2 feluri diferite:
i.	Un modul pentru wordpress, care va fi integrat în site-ul existent și se va conecta cu CRM-ul
 - Timp de dezvoltate: 100 ore * 1 programator

ii.	Un site care va fi dezvoltat de la 0 de noi (ex: programari.midwork.ro) si va fi folosit strict pentru tickete și programari
 - Timp de dezvoltate: 40 ore * 1 programator

III. Sugestii suplimentare: 
1.	Sistem care permite lucrul de la mai multe puncte de lucru, cu posibilitatea de a comuta ușor între ele.
 - Timp de dezvoltate: 40 ore * 1 programator
-
2.	Sistem de chat live pentru a discuta cu clienții noi sau clienții deja existenți în CRM.
		 - Timp de dezvoltate: 80 ore * 1 programator - X Euro 

IV. Pret și timp de implementare: 
Timp estimat de livrare: 
-	46.5 zile * 2 programatori (372 Ore lucratoare dezvoltare baza): X Euro
-	15 zile * 2 programatori (secțiunea sugestii  + 120 Ore lucratoare): X Euro
Timpul de livrare depinde de complexitatea proiectului și cerințele dvs. Dar, vom lucra în strânsă colaborare cu dvs. pentru a respecta deadline-urile stabilite.
`,
            },
            {
                role: 'user',
                content: 'Solicitarea client: Obiect de activitate: fabricarea betonului si executari constructii INTRO: Clientul NU doreste ca ERP sa faca legatura cu nicun alt program software. De principiu, tot ceea ce isi doreste este sa inlocuiasca modul actual de munca si anume excelul. Acesta isi obtine clientii/lucrarile din licitatii publice, nu pe mail, site propriu sau orice alta metoda, doar licitatii. 1. Comenzile cu necesarul materie prima : Sa fie introduse manual in sistem cu anumite campuri specifice cum ar fi : cantitate, pret, data comenzii. Pentru acest modul avand acces o singura persoana responsabila cu necesarul unei lucrari sau mai multe si pe baza contractelor incheiate si in curs de desfasurare va efectua un necesar materie prima estimat. 2. Gestiunea stocului sa fie cumva repartizat pe structura lucrarii cu campuri pentru diverse santiere. Punctele 1 si 2 sa fie cumva in sistem CLICK and DROP. Adica in momentul in care se efectueaza o comanda cu necesar pt unul din santiere, produsele, cantitatea lor, pretul de achizitie sa fie „carate” cu 1 click in gestiunea santierului respectiv si sa apara automat pus in stocul santierului in cauza. 3. Raportare : la final de zi/luna sa existe optiunea de a scoate un raport din sistem cu cantitati comandate/consumate per total si per santier cu costurile aferente 4. CASH FLOW – sold curent al firmei in banca si viitoarele plati si incasari impartite pe OP si BO (biletele la ordin sa fie cu reminder la inceput de saptamana- fie ca incaseaza fie ca plateste el). In momentul in care firma in cauza efectueaza un BO fiind un buget stabilit lunar pt ele , programul sa nu ii permita ca din greseala sa depaseasca acel buget in momentul in care noteaza in ERP un nou BO de efectuat. Punctele 3 si 4, interesat sa aiba optiunea de a gestiona si a scoate rapoarte pe cheltuieli, acestea fiind impartite in : cheltuieli directe, cheltuieli indirecte si manopera.',
            },
            {
                role: 'assistant',
                content: `I. Scopul documentului: 

Această ofertă preliminară este bazată pe informațiile pe care ni le-ați furnizat în același timp înainte de a începe efectiv dezvoltarea și de a vă putea oferi o estimare exactă a costurilor și timpului necesar, va fi necesar să parcurgem câteva etape esențiale de planificare

1. Elaborarea unei diagrame logice pentru a defini arhitectura aplicației. 
2. Crearea unei diagrame ER pentru a structura baza de date. 
3. Realizarea unui design inițial în Figma pentru a elimina orice ambiguitate legată de interfața grafică. 

Pentru începerea etapelor de mai sus, va fi necesar să semnăm un contract de colaborare și să achitați în avans prețul acestora: 

Diagrama logică și diagrama ER: X Euro + TVA 
Proiectul în Figma: X Euro + TVA 
Acești bani se vor scădea din prețul total de dezvoltare odată acceptată oferta fermă. 

Oferta de mai jos este doar orientativă și urmărește să vă ofere o perspectivă asupra modului în care operăm și a costurilor probabile. Pentru o ofertă și un timp de implementare exact, va fi necesar să completăm etapele de planificare menționate

Scopul acestui document este de a prezenta o ofertă pentru dezvoltarea unui CRM/ERP personalizat conform cerințelor.

Definiții:
- CRM (Customer Relationship Management): CRM este un acronim pentru "Customer Relationship Management" sau "Gestionarea Relațiilor cu Clienții" în română. Este o strategie și un set de tehnologii utilizate pentru a gestiona relațiile și interacțiunile cu clienții. Scopul principal al unui sistem CRM este să îmbunătățească relațiile cu clienții, să optimizeze procesele de vânzare și marketing și să ofere o mai bună experiență generală pentru clienți.
- ERP (Enterprise Resource Planning): ERP este un acronim pentru "Enterprise Resource Planning" sau "Planificarea Resurselor Enterprise" în română. Este un sistem de software care ajută organizațiile să gestioneze și să integreze eficient toate procesele lor de afaceri, inclusiv contabilitatea, resursele umane, gestionarea stocurilor, producția, vânzările și multe altele. Scopul principal al unui sistem ERP este să faciliteze fluxurile de lucru interne și să ofere o imagine consolidată și în timp real a resurselor și proceselor organizației.

II. Propunere structură: 

1. Secțiune de Comenzi și Gestiunea Materiilor Prime:
-	Implementarea unui modul pentru introducerea manuală a comenzilor în sistem, cu câmpuri specifice precum cantitate, preț și dată a comenzii.
-	Desemnarea unei persoane responsabile pentru gestionarea necesarului de materie primă pe baza contractelor încheiate și a lucrărilor în curs de desfășurare pe baza unui sistem de permisiuni.
-	Efectuarea unui necesar estimat de materie primă pentru fiecare lucrare sau șantier.

2. Gestiunea Stocului:
-	Organizarea gestiunii stocurilor pe structura lucrărilor, cu câmpuri pentru diferite șantiere.
-	Implementarea unui sistem "Drag and Drop" pentru transferul facil al produselor, cantităților și prețurilor de achiziție din comenzi în gestiunea fiecărui șantier.
-	Sistem pentru crearea produselor 'cele mai utilizate' pentru a facilita procesul de creare a produselor pentru noile șantiere adăugate pe parcurs. Un produs finit poate fi compus din mai multe materii prime. Stocurile de materii prime vor fi actualizate în timpul procesului de producție/expediere comandă, și când se apropie de epuizare, se va primi o notificare.

3. Secțiune de Raportare:
-	Dezvoltarea unui sistem de raportare csv care permite generarea de rapoarte la sfârșit de zi/lună cu cantitățile comandate, consumate și costurile aferente, atât în total, cât și pentru fiecare șantier în parte.

III. Sugestii suplimentare: 

4. Gestionarea Cash-Flow-ului:
-	Implementarea unui sistem de gestionare a bugetelor (BO), cu posibilitatea de a seta și monitoriza limitele de cheltuieli pentru fiecare lună. (Notificări și avertizări pentru a preveni depășirea bugetului stabilit.)
-	Crearea unui modul specializat pentru gestionarea și raportarea cheltuielilor, inclusiv cheltuieli directe, cheltuieli indirecte și costurile cu forța de muncă.
-	Personalizarea rapoartelor csv pentru a oferi o viziune detaliată asupra cheltuielilor.

III. Pret și timp de implementare: 

Timp estimat de livrare: 2-3 luni de zile
Timpul de livrare depinde de complexitatea proiectului și cerințele dvs. Dar, vom lucra în strânsă colaborare cu dvs. pentru a respecta deadline-urile stabilite.

PRET: X EURO + TVA - Cu sugestii suplimentare
 (Ore lucrătoare: 400 ore x 2 programmatori)

PRET: X EURO + TVA - Fără sugestii suplimentare
 (Ore lucrătoare: 280 ore x 2 programmatori)


`,
            },
        ];
        this.encoder = (0, tiktoken_1.encoding_for_model)('gpt-3.5-turbo');
        this.MAX_TOKENS = 12500;
    }
    getBotResponse(userMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKey = this.configService.get('OPENAI_API_KEY');
            if (!apiKey) {
                throw new Error('API key is not defined');
            }
            console.log(apiKey);
            this.context.push({ role: 'user', content: userMessage });
            try {
                const response = yield axios_1.default.post('https://api.openai.com/v1/chat/completions', {
                    model: 'gpt-4o',
                    messages: this.context,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                });
                const botMessage = response.data.choices[0].message.content;
                // Add bot response to context
                this.context.push({ role: 'assistant', content: botMessage });
                // Check if the total tokens exceed the limit and delete older messages if needed
                if (response.data.usage &&
                    response.data.usage.total_tokens > this.MAX_TOKENS) {
                    this.deleteOlderMessages();
                }
                return botMessage;
            }
            catch (error) {
                console.error('Error calling OpenAI API:', error);
                return "I'm sorry, I couldn't process your request.";
            }
        });
    }
    deleteOlderMessages() {
        let contextLength = this.getContextLength();
        while (contextLength > this.MAX_TOKENS) {
            for (let i = 0; i < this.context.length; i++) {
                const message = this.context[i];
                if (message.role !== 'system') {
                    this.context.splice(i, 1);
                    contextLength = this.getContextLength();
                    console.log('New context length:', contextLength);
                    break;
                }
            }
        }
    }
    getContextLength() {
        let length = 0;
        this.context.forEach((message) => {
            if (typeof message.content === 'string') {
                length += this.encoder.encode(message.content).length;
            }
        });
        return length;
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map