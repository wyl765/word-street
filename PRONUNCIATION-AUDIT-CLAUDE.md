# Word Street Pronunciation Audit Report (Claude)

## Executive Summary

| Metric | Count |
|--------|-------|
| Total words | 5205 |
| Human recordings (freedictionary) | 3733 |
| TTS synthesized (macos-samantha) | 1472 |
| 🟢 SAFE | 5111 |
| 🟡 WARN | 75 |
| 🔴 DANGER | 19 |
| Words with CMU IPA | 5128 |
| Words without CMU IPA (phrases/rare) | 77 |
| Audio files on disk | 5338 |
| Orphan audio files | 133 |

## Audit 1: File Mapping Correctness

File naming convention: `word.replace(" ","_").replace("'","").lower() + ".mp3"`

**3 minor deviations** (all acceptable):

- `don't judge a book by its cover` → `don_t_judge_a_book_by_its_cover.mp3` (expected `dont_judge_a_book_by_its_cover.mp3`) — ✅ Intentional special-character handling
- `not only...but also` → `not_only_but_also.mp3` (expected `not_onlybut_also.mp3`) — ✅ Intentional special-character handling
- `pull someone's leg` → `pull_someone_s_leg.mp3` (expected `pull_someones_leg.mp3`) — ✅ Intentional special-character handling

**Verdict:** ✅ All mappings are correct. Deviations are intentional apostrophe/ellipsis handling.

## Audit 2: Vocabulary ↔ Audio Completeness

- ✅ Every word in vocabulary has audio: **5205/5205**
- ✅ Every indexed file exists on disk: **5205/5205**
- ⚠️ **133 orphan files** on disk not referenced by vocabulary

### Orphan Files (can be deleted)

- `abdication.mp3`
- `abeyance.mp3`
- `ablation.mp3`
- `abstemious.mp3`
- `accession.mp3`
- `acquiesce.mp3`
- `acquiescence.mp3`
- `aegis.mp3`
- `agility.mp3`
- `ameliorate.mp3`
- `annexation.mp3`
- `annotation.mp3`
- `apprehension.mp3`
- `apropos.mp3`
- `arbitration.mp3`
- `assassination.mp3`
- `assiduous.mp3`
- `augmentation.mp3`
- `autopsy.mp3`
- `beleaguer.mp3`
- `beseech.mp3`
- `brutality.mp3`
- `cadre.mp3`
- `caldron.mp3`
- `carnage.mp3`
- `castigate.mp3`
- `circumlocution.mp3`
- `coercion.mp3`
- `confiscation.mp3`
- `constitution.mp3`
- `conviction.mp3`
- `corrosion.mp3`
- `culmination.mp3`
- `deference.mp3`
- `dilatory.mp3`
- `dissemination.mp3`
- `divergence.mp3`
- `domestication.mp3`
- `dyke.mp3`
- `ebullient.mp3`
- `ecclesiastical.mp3`
- `elucidate.mp3`
- `emancipation.mp3`
- `endowment.mp3`
- `enervate.mp3`
- `enfranchise.mp3`
- `ephemeral.mp3`
- `equivocate.mp3`
- `esoteric.mp3`
- `evasion.mp3`
- `exasperation.mp3`
- `expunge.mp3`
- `fabrication.mp3`
- `fiduciary.mp3`
- `genocide.mp3`
- `hegemony.mp3`
- `hello.mp3`
- `homicide.mp3`
- `ignominious.mp3`
- `immigration.mp3`
- `improvisation.mp3`
- `incendiary.mp3`
- `incontrovertible.mp3`
- `ineffable.mp3`
- `insidious.mp3`
- `insolvent.mp3`
- `intransigent.mp3`
- `inveterate.mp3`
- `jilt.mp3`
- `juxtapose.mp3`
- `languid.mp3`
- `lexicography.mp3`
- `libelous.mp3`
- `lien.mp3`
- `litigious.mp3`
- `magnanimous.mp3`
- `mantle.mp3`
- `marasmus.mp3`
- `massacre.mp3`
- `maudlin.mp3`
- `milieu.mp3`
- `moribund.mp3`
- `munificent.mp3`
- `nihilism.mp3`
- `not_only___but_also.mp3`
- `obfuscate.mp3`
- `obsequious.mp3`
- `orthodoxy.mp3`
- `ostentatious.mp3`
- `parlance.mp3`
- `parochial.mp3`
- `parsimonious.mp3`
- `parsimony.mp3`
- `pecuniary.mp3`
- `perfunctory.mp3`
- `perspicacious.mp3`
- `plebiscite.mp3`
- `polemical.mp3`
- `pontificate.mp3`
- `prevaricate.mp3`
- `prodigal.mp3`
- `promulgate.mp3`
- `prosaic.mp3`
- `proviso.mp3`
- `quiescent.mp3`
- `recalcitrant.mp3`
- `recant.mp3`
- `recumbent.mp3`
- `remiss.mp3`
- `replete.mp3`
- `retaliation.mp3`
- `sacrilege.mp3`
- `schism.mp3`
- `sedition.mp3`
- `sequester.mp3`
- `sobriquet.mp3`
- `specious.mp3`
- `strident.mp3`
- `subversive.mp3`
- `supercilious.mp3`
- `surfeit.mp3`
- `surreptitious.mp3`
- `sycophant.mp3`
- `temporize.mp3`
- `torpid.mp3`
- `transgression.mp3`
- `travesty.mp3`
- `tumult.mp3`
- `turpitude.mp3`
- `ubiquitous.mp3`
- `variegated.mp3`
- `verisimilitude.mp3`
- `vicissitude.mp3`

## Audit 3: TTS Risk Assessment

### 🔴 DANGER — Must Replace

| # | Word | Level | Issue | Recommendation |
|---|------|-------|-------|----------------|
| 1 | **alternate** | 2 | Heteronym: /ˈɔːl.tɚ.nət/ (adj) or /ˈɔːl.tɚ.neɪt/ (verb) | Replace with human recording |
| 2 | **appropriate** | 2 | Heteronym: /əˈproʊ.pri.ət/ (adj) or /əˈproʊ.pri.eɪt/ (verb) | Replace with human recording |
| 3 | **approximate** | 2 | Heteronym: /əˈprɑːk.sɪ.mət/ (adj) or /əˈprɑːk.sɪ.meɪt/ (verb) | Replace with human recording |
| 4 | **by contrast** | 2 | Phrase contains heteronym "contrast" | Replace with human recording |
| 5 | **contrast** | 2 | Heteronym: /ˈkɑːn.træst/ (noun) or /kənˈtræst/ (verb) | Replace with human recording |
| 6 | **delegate** | 2 | Heteronym: /ˈdɛl.ɪ.ɡət/ (noun) or /ˈdɛl.ɪ.ɡeɪt/ (verb) | Replace with human recording |
| 7 | **deliberate** | 2 | Heteronym: /dɪˈlɪb.ɚ.ət/ (adj) or /dɪˈlɪb.ɚ.eɪt/ (verb) | Replace with human recording |
| 8 | **in contrast** | 2 | Phrase contains heteronym "contrast" | Replace with human recording |
| 9 | **live up to** | 2 | Phrase contains heteronym "live" | Replace with human recording |
| 10 | **project** | 2 | Heteronym: /ˈprɑː.dʒɛkt/ (noun) or /prəˈdʒɛkt/ (verb) | Replace with human recording |
| 11 | **supplement** | 2 | Heteronym: /ˈsʌp.lɪ.mənt/ (noun) or /ˈsʌp.lɪ.mɛnt/ (verb) | Replace with human recording |
| 12 | **survey** | 2 | Heteronym: /ˈsɜːr.veɪ/ (noun) or /sɚˈveɪ/ (verb) | Replace with human recording |
| 13 | **transport** | 2 | Heteronym: /ˈtræns.pɔːrt/ (noun) or /trænsˈpɔːrt/ (verb) | Replace with human recording |
| 14 | **aggregate** | 4 | Heteronym: /ˈæɡ.rɪ.ɡət/ (noun) or /ˈæɡ.rɪ.ɡeɪt/ (verb) | Replace with human recording |
| 15 | **graduate** | 4 | Heteronym: /ˈɡrædʒ.u.ət/ (noun) or /ˈɡrædʒ.u.eɪt/ (verb) | Replace with human recording |
| 16 | **subordinate** | 4 | Heteronym: /səˈbɔːr.dɪ.nət/ (noun/adj) or /səˈbɔːr.dɪ.neɪt/ (verb) | Replace with human recording |
| 17 | **attribute** | 5 | Heteronym: /ˈæt.rɪ.bjuːt/ (noun) or /əˈtrɪb.juːt/ (verb) | Replace with human recording |
| 18 | **convict** | 5 | Heteronym: /ˈkɑːn.vɪkt/ (noun) or /kənˈvɪkt/ (verb) | Replace with human recording |
| 19 | **coup** | 5 | French: /kuː/ — silent p | Replace with human recording |

### 🟡 WARN — Spot-Check Recommended

| # | Word | Level | Issue |
|---|------|-------|-------|
| 1 | **compassionate** | 2 | Long word — verify stress placement |
| 2 | **gravitational** | 2 | Long word — verify stress placement |
| 3 | **mosaic** | 2 | /moʊˈzeɪ.ɪk/ |
| 4 | **simultaneously** | 2 | Long word — verify stress placement |
| 5 | **a taste of your own medicine** | 3 | Long phrase — potential prosody issues |
| 6 | **bite off more than you can chew** | 3 | Long phrase — potential prosody issues |
| 7 | **claustrophobia** | 3 | Long word — verify stress placement |
| 8 | **constellation** | 3 | Long word — verify stress placement |
| 9 | **cost an arm and a leg** | 3 | Long phrase — potential prosody issues |
| 10 | **don't judge a book by its cover** | 3 | Long phrase — potential prosody issues |
| 11 | **every cloud has a silver lining** | 3 | Long phrase — potential prosody issues |
| 12 | **metamorphosis** | 3 | /ˌmɛt.ə.ˈmɔːr.fə.sɪs/ |
| 13 | **put all your eggs in one basket** | 3 | Long phrase — potential prosody issues |
| 14 | **the ball is in your court** | 3 | Long phrase — potential prosody issues |
| 15 | **the early bird catches the worm** | 3 | Long phrase — potential prosody issues |
| 16 | **abnegation** | 4 | /ˌæb.nɪˈɡeɪ.ʃən/ — uncommon |
| 17 | **cabal** | 4 | /kəˈbæl/ |
| 18 | **characteristic** | 4 | Long word — verify stress placement |
| 19 | **compartmentalize** | 4 | Long word — verify stress placement |
| 20 | **condescension** | 4 | Long word — verify stress placement |
| 21 | **confederation** | 4 | Long word — verify stress placement |
| 22 | **corroboration** | 4 | Long word — verify stress placement |
| 23 | **discretionary** | 4 | Long word — verify stress placement |
| 24 | **discrimination** | 4 | Long word — verify stress placement |
| 25 | **enfranchisement** | 4 | Long word — verify stress placement |
| 26 | **equanimity** | 4 | /ˌiː.kwəˈnɪm.ɪ.ti/ |
| 27 | **espionage** | 4 | /ˈɛs.pi.ə.nɑːʒ/ |
| 28 | **exponentiation** | 4 | Long word — verify stress placement |
| 29 | **expropriation** | 4 | Long word — verify stress placement |
| 30 | **extrapolation** | 4 | Long word — verify stress placement |
| 31 | **gerrymandering** | 4 | Long word — verify stress placement |
| 32 | **ignominy** | 4 | /ˈɪɡ.nə.mɪn.i/ |
| 33 | **incandescence** | 4 | Long word — verify stress placement |
| 34 | **infrastructure** | 4 | Long word — verify stress placement |
| 35 | **interpolate** | 4 | /ɪnˈtɜːr.pə.leɪt/ |
| 36 | **intransigence** | 4 | Long word — verify stress placement |
| 37 | **memoir** | 4 | French /ˈmɛm.wɑːr/ |
| 38 | **nomenclature** | 4 | /ˈnoʊ.mən.kleɪ.tʃɚ/ |
| 39 | **pedagogy** | 4 | /ˈpɛd.ə.ɡɑː.dʒi/ |
| 40 | **preponderance** | 4 | Long word — verify stress placement |
| 41 | **querulous** | 4 | /ˈkwɛr.ə.ləs/ |
| 42 | **reconciliation** | 4 | Long word — verify stress placement |
| 43 | **reprehensible** | 4 | Long word — verify stress placement |
| 44 | **retrospective** | 4 | Long word — verify stress placement |
| 45 | **subordination** | 4 | Long word — verify stress placement |
| 46 | **substantiation** | 4 | Long word — verify stress placement |
| 47 | **surveillance** | 4 | French /sɚˈveɪ.ləns/ |
| 48 | **unequivocal** | 4 | /ˌʌn.ɪˈkwɪv.ə.kəl/ |
| 49 | **abiotic** | 5 | Scientific /ˌeɪ.baɪˈɑː.tɪk/ |
| 50 | **abrasive** | 5 | /əˈbreɪ.sɪv/ |
| 51 | **appropriation** | 5 | Long word — verify stress placement |
| 52 | **authoritative** | 5 | Long word — verify stress placement |
| 53 | **biodegradable** | 5 | Long word — verify stress placement |
| 54 | **cardiovascular** | 5 | Long word — verify stress placement |
| 55 | **clarification** | 5 | Long word — verify stress placement |
| 56 | **commemoration** | 5 | Long word — verify stress placement |
| 57 | **complementary** | 5 | Long word — verify stress placement |
| 58 | **consequential** | 5 | Long word — verify stress placement |
| 59 | **consolidation** | 5 | Long word — verify stress placement |
| 60 | **contradiction** | 5 | Long word — verify stress placement |
| 61 | **deforestation** | 5 | Long word — verify stress placement |
| 62 | **desegregation** | 5 | Long word — verify stress placement |
| 63 | **etiquette** | 5 | French /ˈɛt.ɪ.kɛt/ |
| 64 | **globalization** | 5 | Long word — verify stress placement |
| 65 | **gratification** | 5 | Long word — verify stress placement |
| 66 | **hallucination** | 5 | Long word — verify stress placement |
| 67 | **indiscriminate** | 5 | Long word — verify stress placement |
| 68 | **indispensable** | 5 | Long word — verify stress placement |
| 69 | **industrialization** | 5 | Long word — verify stress placement |
| 70 | **introspection** | 5 | Long word — verify stress placement |
| 71 | **jurisprudence** | 5 | Long word — verify stress placement |
| 72 | **mystification** | 5 | Long word — verify stress placement |
| 73 | **philanthropist** | 5 | Long word — verify stress placement |
| 74 | **repertoire** | 5 | French /ˈrɛp.ɚ.twɑːr/ |
| 75 | **transcontinental** | 5 | Long word — verify stress placement |

## Audit 4: Complete Word-by-Word Listing

Format: `EMOJI word — /IPA/ — source — RISK [details]`

### Level 1 (600 words)

✅ above — /əbˈʌv/ — freedict — SAFE
✅ acorn — /ˈeɪkɔːrn/ — freedict — SAFE
✅ across — /əkrˈɔːs/ — freedict — SAFE
✅ adventure — /ædvˈɛntʃɜːr/ — freedict — SAFE
✅ after — /ˈæftɜːr/ — freedict — SAFE
✅ against — /əɡˈɛnst/ — freedict — SAFE
✅ almost — /ˈɔːlmˌoʊst/ — freedict — SAFE
✅ along — /əlˈɔːŋ/ — freedict — SAFE
✅ already — /ɔːlrˈɛdiː/ — freedict — SAFE
✅ amazed — /əmˈeɪzd/ — samantha — 🟢 SAFE
✅ among — /əmˈʌŋ/ — freedict — SAFE
✅ amount — /əmˈaʊnt/ — freedict — SAFE
✅ ankle — /ˈæŋkəl/ — freedict — SAFE
✅ annoyed — /ənˈɔɪd/ — freedict — SAFE
✅ ant — /ˈænt/ — freedict — SAFE
✅ anyway — /ˈɛniːwˌeɪ/ — freedict — SAFE
✅ apart — /əpˈɑːrt/ — freedict — SAFE
✅ apron — /ˈeɪprən/ — freedict — SAFE
✅ around — /ɜːrˈaʊnd/ — freedict — SAFE
✅ ash — /ˈæʃ/ — samantha — 🟢 SAFE
✅ ashamed — /əʃˈeɪmd/ — freedict — SAFE
✅ attach — /ətˈætʃ/ — freedict — SAFE
✅ audience — /ˈɑːdiːəns/ — freedict — SAFE
✅ author — /ˈɔːθɜːr/ — freedict — SAFE
✅ average — /ˈævɜːrɪdʒ/ — freedict — SAFE
✅ backward — /bˈækwɜːrd/ — freedict — SAFE
✅ barely — /bˈɛrliː/ — samantha — 🟢 SAFE
✅ bark — /bˈɑːrk/ — freedict — SAFE
✅ barn — /bˈɑːrn/ — freedict — SAFE
✅ battery — /bˈætɜːriː/ — freedict — SAFE
✅ beak — /bˈiːk/ — freedict — SAFE
✅ beautiful — /bjˈuːtəfəl/ — freedict — SAFE
✅ beaver — /bˈiːvɜːr/ — freedict — SAFE
✅ bee — /bˈiː/ — freedict — SAFE
✅ beetle — /bˈiːtəl/ — freedict — SAFE
✅ before — /bɪfˈɔːr/ — freedict — SAFE
✅ beginning — /bɪɡˈɪnɪŋ/ — freedict — SAFE
✅ belong — /bɪlˈɔːŋ/ — freedict — SAFE
✅ below — /bɪlˈoʊ/ — freedict — SAFE
✅ bend — /bˈɛnd/ — freedict — SAFE
✅ beneath — /bɪnˈiːθ/ — freedict — SAFE
✅ berry — /bˈɛriː/ — freedict — SAFE
✅ beside — /bɪsˈaɪd/ — freedict — SAFE
✅ besides — /bɪsˈaɪdz/ — freedict — SAFE
✅ between — /bɪtwˈiːn/ — freedict — SAFE
✅ beyond — /bɪˈɑːnd/ — freedict — SAFE
✅ bitter — /bˈɪtɜːr/ — freedict — SAFE
✅ blanket — /blˈæŋkət/ — freedict — SAFE
✅ blizzard — /blˈɪzɜːrd/ — freedict — SAFE
✅ bloom — /blˈuːm/ — freedict — SAFE
✅ boiling — /bˈɔɪlɪŋ/ — freedict — SAFE
✅ boot — /bˈuːt/ — freedict — SAFE
✅ bored — /bˈɔːrd/ — samantha — 🟢 SAFE
✅ borrow — /bˈɑːrˌoʊ/ — freedict — SAFE
✅ brave — /brˈeɪv/ — freedict — SAFE
✅ breeze — /brˈiːz/ — freedict — SAFE
✅ bridge — /brˈɪdʒ/ — freedict — SAFE
✅ broccoli — /brˈɑːkəliː/ — freedict — SAFE
✅ broom — /brˈuːm/ — freedict — SAFE
✅ bubble — /bˈʌbəl/ — freedict — SAFE
✅ bucket — /bˈʌkət/ — freedict — SAFE
✅ buckle — /bˈʌkəl/ — freedict — SAFE
✅ bunch — /bˈʌntʃ/ — freedict — SAFE
✅ bunny — /bˈʌniː/ — freedict — SAFE
✅ burrow — /bˈɜːroʊ/ — freedict — SAFE
✅ busy — /bˈɪziː/ — freedict — SAFE
✅ butterfly — /bˈʌtɜːrflˌaɪ/ — freedict — SAFE
✅ button — /bˈʌtən/ — freedict — SAFE
✅ cabin — /kˈæbən/ — freedict — SAFE
✅ calm — /kˈɑːm/ — freedict — SAFE
✅ calm down — /kˈɑːm dˈaʊn/ — samantha — 🟢 SAFE
✅ candle — /kˈændəl/ — freedict — SAFE
✅ castle — /kˈæsəl/ — freedict — SAFE
✅ catch — /kˈætʃ/ — freedict — SAFE
✅ caterpillar — /kˈætəpˌɪlɜːr/ — freedict — SAFE
✅ cave — /kˈeɪv/ — freedict — SAFE
✅ celery — /sˈɛlɜːriː/ — freedict — SAFE
✅ cereal — /sˈɪriːəl/ — freedict — SAFE
✅ certain — /sˈɜːrtən/ — freedict — SAFE
✅ chalk — /tʃˈɑːk/ — samantha — 🟢 SAFE
✅ chapter — /tʃˈæptɜːr/ — freedict — SAFE
✅ character — /kˈɛrɪktɜːr/ — freedict — SAFE
✅ chase — /tʃˈeɪs/ — freedict — SAFE
✅ cheek — /tʃˈiːk/ — freedict — SAFE
✅ cheerful — /tʃˈɪrfəl/ — freedict — SAFE
✅ chef — /ʃˈɛf/ — freedict — SAFE
✅ cherry — /tʃˈɛriː/ — freedict — SAFE
✅ chick — /tʃˈɪk/ — freedict — SAFE
✅ chilly — /tʃˈɪliː/ — freedict — SAFE
✅ chin — /tʃˈɪn/ — freedict — SAFE
✅ chop — /tʃˈɑːp/ — freedict — SAFE
✅ clap — /klˈæp/ — freedict — SAFE
✅ claw — /klˈɔː/ — freedict — SAFE
✅ clean up — /klˈiːn ˈʌp/ — freedict — SAFE
✅ clever — /klˈɛvɜːr/ — freedict — SAFE
✅ cliff — /klˈɪf/ — freedict — SAFE
✅ closet — /klˈɑːzət/ — freedict — SAFE
✅ clumsy — /klˈʌmziː/ — freedict — SAFE
✅ coach — /kˈoʊtʃ/ — freedict — SAFE
✅ coconut — /kˈoʊkənˌʌt/ — freedict — SAFE
✅ collar — /kˈɑːlɜːr/ — freedict — SAFE
✅ collect — /kəlˈɛkt/ — freedict — SAFE
✅ come back — /kˈʌm bˈæk/ — freedict — SAFE
✅ come in — /kˈʌm ɪn/ — samantha — 🟢 SAFE
✅ comfortable — /kˈʌmfɜːrtəbəl/ — freedict — SAFE
✅ confused — /kənfjˈuːzd/ — freedict — SAFE
✅ content — /kˈɑːntɛnt/ — freedict — SAFE
✅ cookie — /kˈʊkiː/ — freedict — SAFE
✅ costume — /kɑːstˈuːm/ — freedict — SAFE
✅ cottage — /kˈɑːtədʒ/ — freedict — SAFE
✅ count — /kˈaʊnt/ — freedict — SAFE
✅ cozy — /kˈoʊziː/ — freedict — SAFE
✅ cracker — /krˈækɜːr/ — freedict — SAFE
✅ cranky — /krˈæŋkiː/ — freedict — SAFE
✅ crawl — /krˈɔːl/ — freedict — SAFE
✅ crayon — /krˈeɪˌɑːn/ — freedict — SAFE
✅ creamy — /krˈiːmiː/ — samantha — 🟢 SAFE
✅ create — /kriːˈeɪt/ — freedict — SAFE
✅ crew — /krˈuː/ — samantha — 🟢 SAFE
✅ crooked — /krˈʊkəd/ — freedict — SAFE
✅ crow — /krˈoʊ/ — freedict — SAFE
✅ crowd — /krˈaʊd/ — freedict — SAFE
✅ crowded — /krˈaʊdəd/ — freedict — SAFE
✅ crown — /krˈaʊn/ — freedict — SAFE
✅ crunchy — /krˈʌntʃiː/ — freedict — SAFE
✅ cub — /kˈʌb/ — freedict — SAFE
✅ cupcake — /kˈʌpkˌeɪk/ — freedict — SAFE
✅ curious — /kjˈʊriːəs/ — freedict — SAFE
✅ curtain — /kˈɜːrtən/ — freedict — SAFE
✅ daily — /dˈeɪliː/ — freedict — SAFE
✅ damp — /dˈæmp/ — freedict — SAFE
✅ dash — /dˈæʃ/ — freedict — SAFE
✅ dawn — /dˈɔːn/ — freedict — SAFE
✅ deep — /dˈiːp/ — freedict — SAFE
✅ delighted — /dɪlˈaɪtəd/ — freedict — SAFE
✅ deliver — /dɪlˈɪvɜːr/ — freedict — SAFE
✅ den — /dˈɛn/ — freedict — SAFE
✅ desert — /dˈɛzɜːrt/ — freedict — SAFE
✅ design — /dɪzˈaɪn/ — freedict — SAFE
✅ dew — /dˈuː/ — freedict — SAFE
✅ disappointed — /dˌɪsəpˈɔɪntɪd/ — freedict — SAFE
✅ discover — /dɪskˈʌvɜːr/ — freedict — SAFE
✅ dock — /dˈɑːk/ — freedict — SAFE
✅ dolphin — /dˈɑːlfən/ — freedict — SAFE
✅ double — /dˈʌbəl/ — freedict — SAFE
✅ doughnut — /dˈoʊnˌʌt/ — freedict — SAFE
✅ dozen — /dˈʌzən/ — freedict — SAFE
✅ drag — /drˈæɡ/ — freedict — SAFE
✅ dragon — /drˈæɡən/ — freedict — SAFE
✅ drawer — /drˈɔːr/ — freedict — SAFE
✅ drip — /drˈɪp/ — samantha — 🟢 SAFE
✅ droplet — /drˈɑːplət/ — samantha — 🟢 SAFE
✅ drought — /drˈaʊt/ — freedict — SAFE
✅ dry — /drˈaɪ/ — freedict — SAFE
✅ duckling — /dˈʌklɪŋ/ — freedict — SAFE
✅ dull — /dˈʌl/ — freedict — SAFE
✅ during — /dˈʊrɪŋ/ — freedict — SAFE
✅ dusk — /dˈʌsk/ — freedict — SAFE
✅ dust — /dˈʌst/ — freedict — SAFE
✅ dwarf — /dwˈɔːrf/ — freedict — SAFE
✅ eager — /ˈiːɡɜːr/ — freedict — SAFE
✅ eagle — /ˈiːɡəl/ — freedict — SAFE
✅ early — /ˈɜːrliː/ — freedict — SAFE
✅ echo — /ˈɛkoʊ/ — freedict — SAFE
✅ elbow — /ˈɛlbˌoʊ/ — freedict — SAFE
✅ embarrassed — /ɪmbˈɛrəst/ — samantha — 🟢 SAFE
✅ empty — /ˈɛmptiː/ — freedict — SAFE
✅ ending — /ˈɛndɪŋ/ — samantha — 🟢 SAFE
✅ enormous — /ɪnˈɔːrməs/ — freedict — SAFE
✅ enough — /ɪnˈʌf/ — freedict — SAFE
✅ entire — /ɪntˈaɪɜːr/ — freedict — SAFE
✅ envelope — /ˈɛnvəlˌoʊp/ — freedict — SAFE
✅ equal — /ˈiːkwəl/ — freedict — SAFE
✅ eraser — /ɪrˈeɪsɜːr/ — samantha — 🟢 SAFE
✅ exactly — /ɪɡzˈæktliː/ — freedict — SAFE
✅ excited — /ɪksˈaɪtəd/ — freedict — SAFE
✅ exhausted — /ɪɡzˈɔːstɪd/ — freedict — SAFE
✅ extra — /ˈɛkstrə/ — freedict — SAFE
✅ eyebrow — /ˈaɪbrˌaʊ/ — freedict — SAFE
✅ eyelash — /ˈaɪlˌæʃ/ — samantha — 🟢 SAFE
✅ fairy — /fˈɛriː/ — freedict — SAFE
✅ fall down — /fˈɔːl dˈaʊn/ — samantha — 🟢 SAFE
✅ fancy — /fˈænsiː/ — freedict — SAFE
✅ fasten — /fˈæsən/ — freedict — SAFE
✅ fawn — /fˈɔːn/ — freedict — SAFE
✅ feast — /fˈiːst/ — freedict — SAFE
✅ feather — /fˈɛðɜːr/ — freedict — SAFE
✅ fetch — /fˈɛtʃ/ — freedict — SAFE
✅ few — /fjˈuː/ — freedict — SAFE
✅ fierce — /fˈɪrs/ — freedict — SAFE
✅ figure out — /fˈɪɡjɜːr ˈaʊt/ — freedict — SAFE
✅ finally — /fˈaɪnəliː/ — freedict — SAFE
✅ find out — /fˈaɪnd ˈaʊt/ — freedict — SAFE
✅ fist — /fˈɪst/ — freedict — SAFE
✅ flame — /flˈeɪm/ — freedict — SAFE
✅ float — /flˈoʊt/ — freedict — SAFE
✅ flock — /flˈɑːk/ — freedict — SAFE
✅ flood — /flˈʌd/ — freedict — SAFE
✅ fluffy — /flˈʌfiː/ — freedict — SAFE
✅ flutter — /flˈʌtɜːr/ — freedict — SAFE
✅ foal — /fˈoʊl/ — freedict — SAFE
✅ fog — /fˈɑːɡ/ — freedict — SAFE
✅ foolish — /fˈuːlɪʃ/ — freedict — SAFE
✅ footprint — /fˈʊtprˌɪnt/ — samantha — 🟢 SAFE
✅ forehead — /fˈɔːrhɛd/ — freedict — SAFE
✅ forest — /fˈɔːrəst/ — freedict — SAFE
✅ forever — /fɜːrˈɛvɜːr/ — freedict — SAFE
✅ forget — /fɜːrɡˈɛt/ — freedict — SAFE
✅ forward — /fˈɔːrwɜːrd/ — freedict — SAFE
✅ frame — /frˈeɪm/ — freedict — SAFE
✅ freeze — /frˈiːz/ — freedict — SAFE
✅ freezing — /frˈiːzɪŋ/ — samantha — 🟢 SAFE
✅ fresh — /frˈɛʃ/ — freedict — SAFE
✅ frightened — /frˈaɪtənd/ — freedict — SAFE
✅ frog — /frˈɑːɡ/ — freedict — SAFE
✅ frost — /frˈɔːst/ — freedict — SAFE
✅ frustrated — /frˈʌstrˌeɪtəd/ — samantha — 🟢 SAFE
✅ fur — /fˈɜːr/ — freedict — SAFE
✅ furious — /fjˈʊriːəs/ — freedict — SAFE
✅ fuzzy — /fˈʌziː/ — freedict — SAFE
✅ gather — /ɡˈæðɜːr/ — freedict — SAFE
✅ generous — /dʒˈɛnɜːrəs/ — freedict — SAFE
✅ gentle — /dʒˈɛntəl/ — freedict — SAFE
✅ gently — /dʒˈɛntliː/ — freedict — SAFE
✅ get up — /ɡˈɛt ˈʌp/ — freedict — SAFE
✅ giant — /dʒˈaɪənt/ — freedict — SAFE
✅ gigantic — /dʒaɪɡˈæntɪk/ — samantha — 🟢 SAFE
✅ giggle — /ɡˈɪɡəl/ — freedict — SAFE
✅ give up — /ɡˈɪv ˈʌp/ — samantha — 🟢 SAFE
✅ glance — /ɡlˈæns/ — freedict — SAFE
✅ gloomy — /ɡlˈuːmiː/ — freedict — SAFE
✅ glue — /ɡlˈuː/ — freedict — SAFE
✅ go away — /ɡˈoʊ əwˈeɪ/ — samantha — 🟢 SAFE
✅ goose — /ɡˈuːs/ — freedict — SAFE
✅ grab — /ɡrˈæb/ — freedict — SAFE
✅ graceful — /ɡrˈeɪsfəl/ — freedict — SAFE
✅ grape — /ɡrˈeɪp/ — freedict — SAFE
✅ grate — /ɡrˈeɪt/ — freedict — SAFE
✅ grateful — /ɡrˈeɪtfəl/ — freedict — SAFE
✅ gravy — /ɡrˈeɪviː/ — freedict — SAFE
✅ greedy — /ɡrˈiːdiː/ — samantha — 🟢 SAFE
✅ grumpy — /ɡrˈʌmpiː/ — freedict — SAFE
✅ hail — /hˈeɪl/ — freedict — SAFE
✅ half — /hˈæf/ — samantha — 🟢 SAFE
✅ hang — /hˈæŋ/ — freedict — SAFE
✅ harbor — /hˈɑːrbɜːr/ — freedict — SAFE
✅ heap — /hˈiːp/ — freedict — SAFE
✅ hear — /hˈiːr/ — freedict — SAFE
✅ heel — /hˈiːl/ — freedict — SAFE
✅ hem — /hˈɛm/ — freedict — SAFE
✅ hen — /hˈɛn/ — freedict — SAFE
✅ herd — /hˈɜːrd/ — freedict — SAFE
✅ hip — /hˈɪp/ — freedict — SAFE
✅ hive — /hˈaɪv/ — freedict — SAFE
✅ hold on — /hˈoʊld ˈɑːn/ — freedict — SAFE
✅ hollow — /hˈɑːloʊ/ — freedict — SAFE
✅ homesick — /hˈoʊmsˌɪk/ — samantha — 🟢 SAFE
✅ honey — /hˈʌniː/ — freedict — SAFE
✅ hoodie — /—/ — freedict — SAFE
✅ hoof — /hˈuːf/ — freedict — SAFE
✅ hopeful — /hˈoʊpfəl/ — samantha — 🟢 SAFE
✅ howl — /hˈaʊl/ — freedict — SAFE
✅ huge — /hjˈuːdʒ/ — freedict — SAFE
✅ hum — /hˈʌm/ — freedict — SAFE
✅ hurry up — /hˈɜːriː ˈʌp/ — samantha — 🟢 SAFE
✅ icicle — /ˈaɪsɪkəl/ — samantha — 🟢 SAFE
✅ imagine — /ˌɪmˈædʒən/ — freedict — SAFE
✅ instead — /ˌɪnstˈɛd/ — freedict — SAFE
✅ inventor — /ˌɪnvˈɛntɜːr/ — samantha — 🟢 SAFE
✅ island — /ˈaɪlənd/ — freedict — SAFE
✅ itsy — /ˈɪtsiː/ — samantha — 🟢 SAFE
✅ jealous — /dʒˈɛləs/ — freedict — SAFE
✅ jelly — /dʒˈɛliː/ — freedict — SAFE
✅ journey — /dʒˈɜːrniː/ — freedict — SAFE
✅ juicy — /dʒˈuːsiː/ — freedict — SAFE
✅ jungle — /dʒˈʌŋɡəl/ — freedict — SAFE
✅ kitten — /kˈɪtən/ — freedict — SAFE
✅ knight — /nˈaɪt/ — freedict — SAFE
✅ lace — /lˈeɪs/ — freedict — SAFE
✅ ladder — /lˈædɜːr/ — freedict — SAFE
✅ ladybug — /lˈeɪdiːbˌʌɡ/ — freedict — SAFE
✅ lamb — /lˈæm/ — freedict — SAFE
✅ lamp — /lˈæmp/ — freedict — SAFE
✅ late — /lˈeɪt/ — freedict — SAFE
✅ later — /lˈeɪtɜːr/ — freedict — SAFE
✅ lazy — /lˈeɪziː/ — freedict — SAFE
✅ leap — /lˈiːp/ — freedict — SAFE
✅ leash — /lˈiːʃ/ — freedict — SAFE
✅ legend — /lˈɛdʒənd/ — freedict — SAFE
✅ lemon — /lˈɛmən/ — freedict — SAFE
✅ lend — /lˈɛnd/ — freedict — SAFE
✅ less — /lˈɛs/ — freedict — SAFE
✅ lettuce — /lˈɛtəs/ — freedict — SAFE
✅ lightning — /lˈaɪtnɪŋ/ — freedict — SAFE
✅ lizard — /lˈɪzɜːrd/ — freedict — SAFE
✅ lonely — /lˈoʊnliː/ — freedict — SAFE
✅ look at — /lˈʊk ˈæt/ — samantha — 🟢 SAFE
✅ look out — /lˈʊk ˈaʊt/ — freedict — SAFE
✅ loose — /lˈuːs/ — freedict — SAFE
✅ lose — /lˈuːz/ — freedict — SAFE
✅ loud — /lˈaʊd/ — freedict — SAFE
✅ loudly — /lˈaʊdliː/ — freedict — SAFE
✅ mane — /mˈeɪn/ — freedict — SAFE
✅ many — /mˈɛniː/ — freedict — SAFE
✅ march — /mˈɑːrtʃ/ — freedict — SAFE
✅ match — /mˈætʃ/ — freedict — SAFE
✅ mayor — /mˈeɪɜːr/ — freedict — SAFE
✅ meadow — /mˈɛdˌoʊ/ — freedict — SAFE
✅ meanwhile — /mˈiːnwˌaɪl/ — samantha — 🟢 SAFE
✅ measure — /mˈɛʒɜːr/ — freedict — SAFE
✅ melon — /mˈɛlən/ — freedict — SAFE
✅ melt — /mˈɛlt/ — freedict — SAFE
✅ middle — /mˈɪdəl/ — freedict — SAFE
✅ midnight — /mˈɪdnˌaɪt/ — freedict — SAFE
✅ miserable — /mˈɪzɜːrəbəl/ — freedict — SAFE
✅ mistake — /mɪstˈeɪk/ — freedict — SAFE
✅ mitten — /mˈɪtən/ — freedict — SAFE
✅ moment — /mˈoʊmənt/ — freedict — SAFE
✅ monster — /mˈɑːnstɜːr/ — freedict — SAFE
✅ moose — /mˈuːs/ — freedict — SAFE
✅ more — /mˈɔːr/ — freedict — SAFE
✅ moss — /mˈɔːs/ — freedict — SAFE
✅ mud — /mˈʌd/ — freedict — SAFE
✅ muffin — /mˈʌfən/ — freedict — SAFE
✅ muscle — /mˈʌsəl/ — freedict — SAFE
✅ mushroom — /mˈʌʃruːm/ — freedict — SAFE
✅ narrow — /nˈɛroʊ/ — freedict — SAFE
✅ neighbor — /nˈeɪbɜːr/ — samantha — 🟢 SAFE
✅ nervous — /nˈɜːrvəs/ — freedict — SAFE
✅ nest — /nˈɛst/ — freedict — SAFE
✅ next — /nˈɛkst/ — freedict — SAFE
✅ nibble — /nˈɪbəl/ — samantha — 🟢 SAFE
✅ nod — /nˈɑːd/ — freedict — SAFE
✅ none — /nˈʌn/ — freedict — SAFE
✅ noodle — /nˈuːdəl/ — freedict — SAFE
✅ noon — /nˈuːn/ — freedict — SAFE
✅ notice — /nˈoʊtəs/ — freedict — SAFE
✅ nowadays — /nˈaʊədˌeɪz/ — freedict — SAFE
✅ oatmeal — /ˈoʊtmˌiːl/ — samantha — 🟢 SAFE
✅ often — /ˈɔːfən/ — freedict — SAFE
✅ once — /wˈʌns/ — freedict — SAFE
✅ onion — /ˈʌnjən/ — freedict — SAFE
✅ owl — /ˈaʊl/ — freedict — SAFE
✅ pack — /pˈæk/ — freedict — SAFE
✅ package — /pˈækədʒ/ — samantha — 🟢 SAFE
✅ pair — /pˈɛr/ — freedict — SAFE
✅ pajamas — /pədʒˈɑːməz/ — freedict — SAFE
✅ palm — /pˈɑːm/ — freedict — SAFE
✅ pancake — /pˈænkˌeɪk/ — freedict — SAFE
✅ parade — /pɜːrˈeɪd/ — freedict — SAFE
✅ passenger — /pˈæsəndʒɜːr/ — freedict — SAFE
✅ patient — /pˈeɪʃənt/ — freedict — SAFE
✅ pattern — /pˈætɜːrn/ — freedict — SAFE
✅ paw — /pˈɔː/ — freedict — SAFE
✅ peaceful — /pˈiːsfəl/ — freedict — SAFE
✅ peach — /pˈiːtʃ/ — freedict — SAFE
✅ peanut — /pˈiːnət/ — freedict — SAFE
✅ peek — /pˈiːk/ — samantha — 🟢 SAFE
✅ peel — /pˈiːl/ — freedict — SAFE
✅ pepper — /pˈɛpɜːr/ — freedict — SAFE
✅ perfect — /pɜːrfˈɛkt/ — freedict — SAFE
✅ perhaps — /pɜːrhˈæps/ — freedict — SAFE
✅ petal — /pˈɛtəl/ — samantha — 🟢 SAFE
✅ pick up — /pˈɪk ˈʌp/ — samantha — 🟢 SAFE
✅ piece — /pˈiːs/ — freedict — SAFE
✅ pile — /pˈaɪl/ — freedict — SAFE
✅ pillow — /pˈɪloʊ/ — freedict — SAFE
✅ pinecone — /—/ — samantha — 🟢 SAFE
✅ plain — /plˈeɪn/ — freedict — SAFE
✅ plenty — /plˈɛntiː/ — freedict — SAFE
✅ plum — /plˈʌm/ — freedict — SAFE
✅ pocket — /pˈɑːkət/ — freedict — SAFE
✅ poem — /pˈoʊəm/ — freedict — SAFE
✅ pond — /pˈɑːnd/ — freedict — SAFE
✅ pony — /pˈoʊnˌiː/ — freedict — SAFE
✅ popcorn — /pˈɑːpkˌɔːrn/ — samantha — 🟢 SAFE
✅ portion — /pˈɔːrʃən/ — freedict — SAFE
✅ pour — /pˈɔːr/ — freedict — SAFE
✅ pretend — /priːtˈɛnd/ — freedict — SAFE
✅ pretzel — /prˈɛtzəl/ — freedict — SAFE
✅ princess — /prˈɪnsɛs/ — freedict — SAFE
✅ promise — /prˈɑːməs/ — freedict — SAFE
✅ proud — /prˈaʊd/ — freedict — SAFE
✅ pudding — /pˈʊdɪŋ/ — freedict — SAFE
✅ puddle — /pˈʌdəl/ — freedict — SAFE
✅ puppy — /pˈʌpiː/ — freedict — SAFE
✅ put down — /pˈʊt dˈaʊn/ — freedict — SAFE
✅ quarter — /kwˈɔːrtɜːr/ — freedict — SAFE
✅ quickly — /kwˈɪkliː/ — freedict — SAFE
✅ quietly — /kwˈaɪətliː/ — freedict — SAFE
✅ raccoon — /rækˈuːn/ — freedict — SAFE
✅ rainbow — /rˈeɪnbˌoʊ/ — freedict — SAFE
✅ rascal — /rˈæskəl/ — samantha — 🟢 SAFE
✅ recent — /rˈiːsənt/ — freedict — SAFE
✅ relieved — /rɪlˈiːvd/ — freedict — SAFE
✅ remind — /riːmˈaɪnd/ — samantha — 🟢 SAFE
✅ repair — /rɪpˈɛr/ — freedict — SAFE
✅ rib — /rˈɪb/ — freedict — SAFE
✅ riddle — /rˈɪdəl/ — freedict — SAFE
✅ ripe — /rˈaɪp/ — freedict — SAFE
✅ ripple — /rˈɪpəl/ — freedict — SAFE
✅ roar — /rˈɔːr/ — freedict — SAFE
✅ robin — /rˈɑːbən/ — freedict — SAFE
✅ rooster — /rˈuːstɜːr/ — freedict — SAFE
✅ root — /rˈuːt/ — freedict — SAFE
✅ rotten — /rˈɑːtən/ — samantha — 🟢 SAFE
✅ rough — /rˈʌf/ — freedict — SAFE
✅ rug — /rˈʌɡ/ — freedict — SAFE
✅ ruler — /rˈuːlɜːr/ — freedict — SAFE
✅ run out — /rˈʌn ˈaʊt/ — freedict — SAFE
✅ salty — /sˈɔːltiː/ — freedict — SAFE
✅ sandal — /sˈændəl/ — samantha — 🟢 SAFE
✅ sandwich — /sˈændwɪtʃ/ — freedict — SAFE
✅ scale — /skˈeɪl/ — freedict — SAFE
✅ scarf — /skˈɑːrf/ — freedict — SAFE
✅ scattered — /skˈætɜːrd/ — freedict — SAFE
✅ scissors — /sˈɪzɜːrz/ — freedict — SAFE
✅ scoop — /skˈuːp/ — freedict — SAFE
✅ search — /sˈɜːrtʃ/ — freedict — SAFE
✅ secret — /sˈiːkrət/ — freedict — SAFE
✅ seed — /sˈiːd/ — freedict — SAFE
✅ several — /sˈɛvrəl/ — freedict — SAFE
✅ shadow — /ʃˈædˌoʊ/ — freedict — SAFE
✅ shake — /ʃˈeɪk/ — freedict — SAFE
✅ shallow — /ʃˈæloʊ/ — freedict — SAFE
✅ share — /ʃˈɛr/ — freedict — SAFE
✅ shark — /ʃˈɑːrk/ — freedict — SAFE
✅ sharp — /ʃˈɑːrp/ — freedict — SAFE
✅ shelf — /ʃˈɛlf/ — samantha — 🟢 SAFE
✅ shield — /ʃˈiːld/ — freedict — SAFE
✅ shiny — /ʃˈaɪniː/ — freedict — SAFE
✅ shiver — /ʃˈɪvɜːr/ — freedict — SAFE
✅ shoulder — /ʃˈoʊldɜːr/ — freedict — SAFE
✅ shout — /ʃˈaʊt/ — freedict — SAFE
✅ shove — /ʃˈʌv/ — samantha — 🟢 SAFE
✅ show off — /ʃˈoʊ ˈɔːf/ — freedict — SAFE
✅ shy — /ʃˈaɪ/ — freedict — SAFE
✅ sideways — /sˈaɪdwˌeɪz/ — samantha — 🟢 SAFE
✅ silent — /sˈaɪlənt/ — freedict — SAFE
✅ since — /sˈɪns/ — freedict — SAFE
✅ single — /sˈɪŋɡəl/ — freedict — SAFE
✅ sink — /sˈɪŋk/ — freedict — SAFE
✅ sit down — /sˈɪt dˈaʊn/ — samantha — 🟢 SAFE
✅ skip — /skˈɪp/ — freedict — SAFE
✅ skull — /skˈʌl/ — freedict — SAFE
✅ skunk — /skˈʌŋk/ — freedict — SAFE
✅ sleeve — /slˈiːv/ — freedict — SAFE
✅ slice — /slˈaɪs/ — freedict — SAFE
✅ slimy — /slˈaɪmiː/ — freedict — SAFE
✅ slipper — /slˈɪpɜːr/ — freedict — SAFE
✅ slowly — /slˈoʊliː/ — freedict — SAFE
✅ smoke — /smˈoʊk/ — freedict — SAFE
✅ smooth — /smˈuːð/ — freedict — SAFE
✅ snack — /snˈæk/ — freedict — SAFE
✅ snail — /snˈeɪl/ — freedict — SAFE
✅ sneaker — /snˈiːkɜːr/ — freedict — SAFE
✅ snore — /snˈɔːr/ — freedict — SAFE
✅ snuggle — /snˈʌɡəl/ — freedict — SAFE
✅ soaking — /sˈoʊkɪŋ/ — samantha — 🟢 SAFE
✅ soap — /sˈoʊp/ — freedict — SAFE
✅ solid — /sˈɑːləd/ — freedict — SAFE
✅ soon — /sˈuːn/ — freedict — SAFE
✅ sort — /sˈɔːrt/ — freedict — SAFE
✅ sour — /sˈaʊɜːr/ — freedict — SAFE
✅ spare — /spˈɛr/ — freedict — SAFE
✅ spark — /spˈɑːrk/ — freedict — SAFE
✅ sparkle — /spˈɑːrkəl/ — freedict — SAFE
✅ sparrow — /spˈɛroʊ/ — freedict — SAFE
✅ spider — /spˈaɪdɜːr/ — freedict — SAFE
✅ spill — /spˈɪl/ — freedict — SAFE
✅ spine — /spˈaɪn/ — samantha — 🟢 SAFE
✅ splash — /splˈæʃ/ — freedict — SAFE
✅ sponge — /spˈʌndʒ/ — freedict — SAFE
✅ spread — /sprˈɛd/ — freedict — SAFE
✅ sprinkle — /sprˈɪŋkəl/ — samantha — 🟢 SAFE
✅ sprout — /sprˈaʊt/ — freedict — SAFE
✅ squeeze — /skwˈiːz/ — freedict — SAFE
✅ squirrel — /skwˈɜːrəl/ — freedict — SAFE
✅ stable — /stˈeɪbəl/ — freedict — SAFE
✅ stack — /stˈæk/ — freedict — SAFE
✅ stale — /stˈeɪl/ — freedict — SAFE
✅ stamp — /stˈæmp/ — freedict — SAFE
✅ stand up — /stˈænd ˈʌp/ — freedict — SAFE
✅ stare — /stˈɛr/ — freedict — SAFE
✅ steep — /stˈiːp/ — freedict — SAFE
✅ stem — /stˈɛm/ — freedict — SAFE
✅ stew — /stˈuː/ — freedict — SAFE
✅ sticky — /stˈɪkiː/ — freedict — SAFE
✅ stir — /stˈɜːr/ — freedict — SAFE
✅ stomp — /stˈɑːmp/ — freedict — SAFE
✅ storm — /stˈɔːrm/ — freedict — SAFE
✅ straight — /strˈeɪt/ — freedict — SAFE
✅ strange — /strˈeɪndʒ/ — freedict — SAFE
✅ stranger — /strˈeɪndʒɜːr/ — freedict — SAFE
✅ stream — /strˈiːm/ — freedict — SAFE
✅ stretch — /strˈɛtʃ/ — freedict — SAFE
✅ stubborn — /stˈʌbɜːrn/ — freedict — SAFE
✅ sudden — /sˈʌdən/ — freedict — SAFE
✅ suddenly — /sˈʌdənliː/ — freedict — SAFE
✅ surprise — /sɜːrprˈaɪz/ — freedict — SAFE
✅ surprised — /sɜːrprˈaɪzd/ — freedict — SAFE
✅ swamp — /swˈɑːmp/ — freedict — SAFE
✅ swan — /swˈɑːn/ — freedict — SAFE
✅ switch — /swˈɪtʃ/ — freedict — SAFE
✅ sword — /sˈɔːrd/ — freedict — SAFE
✅ syrup — /sˈɜːrəp/ — freedict — SAFE
✅ tag — /tˈæɡ/ — freedict — SAFE
✅ tail — /tˈeɪl/ — freedict — SAFE
✅ take — /tˈeɪk/ — freedict — SAFE
✅ tale — /tˈeɪl/ — freedict — SAFE
✅ tame — /tˈeɪm/ — freedict — SAFE
✅ tape — /tˈeɪp/ — freedict — SAFE
✅ teach — /tˈiːtʃ/ — freedict — SAFE
✅ terrible — /tˈɛrəbəl/ — freedict — SAFE
✅ terrified — /tˈɛrəfˌaɪd/ — freedict — SAFE
✅ than — /ðˈæn/ — freedict — SAFE
✅ then — /ðˈɛn/ — freedict — SAFE
✅ thermometer — /θɜːrmˈɑːmətɜːr/ — freedict — SAFE
✅ thick — /θˈɪk/ — samantha — 🟢 SAFE
✅ thin — /θˈɪn/ — freedict — SAFE
✅ thorn — /θˈɔːrn/ — freedict — SAFE
✅ throat — /θrˈoʊt/ — freedict — SAFE
✅ throne — /θrˈoʊn/ — freedict — SAFE
✅ through — /θrˈuː/ — freedict — SAFE
✅ throughout — /θruːˈaʊt/ — freedict — SAFE
✅ throw away — /θrˈoʊ əwˈeɪ/ — freedict — SAFE
✅ thumb — /θˈʌm/ — freedict — SAFE
✅ thunder — /θˈʌndɜːr/ — freedict — SAFE
✅ tight — /tˈaɪt/ — samantha — 🟢 SAFE
✅ tiny — /tˈaɪniː/ — freedict — SAFE
✅ tiptoe — /tˈɪptˌoʊ/ — freedict — SAFE
✅ title — /tˈaɪtəl/ — freedict — SAFE
✅ toad — /tˈoʊd/ — freedict — SAFE
✅ toast — /tˈoʊst/ — freedict — SAFE
✅ together — /təɡˈɛðɜːr/ — freedict — SAFE
✅ tongue — /tˈʌŋ/ — freedict — SAFE
✅ toss — /tˈɔːs/ — freedict — SAFE
✅ total — /tˈoʊtəl/ — samantha — 🟢 SAFE
✅ toward — /təwˈɔːrd/ — freedict — SAFE
✅ towel — /tˈaʊəl/ — freedict — SAFE
✅ tower — /tˈaʊɜːr/ — freedict — SAFE
✅ trade — /trˈeɪd/ — freedict — SAFE
✅ trail — /trˈeɪl/ — freedict — SAFE
✅ trap — /trˈæp/ — freedict — SAFE
✅ treasure — /trˈɛʒɜːr/ — freedict — SAFE
✅ treat — /trˈiːt/ — freedict — SAFE
✅ try on — /trˈaɪ ˈɑːn/ — freedict — SAFE
✅ tuck — /tˈʌk/ — freedict — SAFE
✅ tug — /tˈʌɡ/ — freedict — SAFE
✅ tumble — /tˈʌmbəl/ — freedict — SAFE
✅ tunnel — /tˈʌnəl/ — freedict — SAFE
✅ turn off — /tˈɜːrn ˈɔːf/ — freedict — SAFE
✅ turn on — /tˈɜːrn ˈɑːn/ — freedict — SAFE
✅ turtle — /tˈɜːrtəl/ — freedict — SAFE
✅ twice — /twˈaɪs/ — freedict — SAFE
✅ twist — /twˈɪst/ — freedict — SAFE
✅ ugly — /ˈʌɡliː/ — freedict — SAFE
✅ uncomfortable — /ənkˈʌmfɜːrtəbəl/ — freedict — SAFE
✅ uniform — /jˈuːnəfˌɔːrm/ — freedict — SAFE
✅ until — /əntˈɪl/ — freedict — SAFE
✅ unwrap — /ənrˈæp/ — samantha — 🟢 SAFE
✅ upon — /əpˈɑːn/ — freedict — SAFE
✅ valley — /vˈæliː/ — freedict — SAFE
✅ vanish — /vˈænɪʃ/ — samantha — 🟢 SAFE
✅ vase — /vˈeɪs/ — freedict — SAFE
✅ vest — /vˈɛst/ — freedict — SAFE
✅ village — /vˈɪlədʒ/ — freedict — SAFE
✅ vine — /vˈaɪn/ — freedict — SAFE
✅ waffle — /wˈɑːfəl/ — freedict — SAFE
✅ wake up — /wˈeɪk ˈʌp/ — samantha — 🟢 SAFE
✅ wand — /wˈɑːnd/ — freedict — SAFE
✅ warm — /wˈɔːrm/ — freedict — SAFE
✅ wave — /wˈeɪv/ — freedict — SAFE
✅ weekly — /wˈiːkliː/ — freedict — SAFE
✅ weigh — /wˈeɪ/ — freedict — SAFE
✅ whale — /wˈeɪl/ — freedict — SAFE
✅ whenever — /wɛnˈɛvɜːr/ — freedict — SAFE
✅ whether — /wˈɛðɜːr/ — freedict — SAFE
✅ while — /wˈaɪl/ — freedict — SAFE
✅ whirl — /wˈɜːrl/ — freedict — SAFE
✅ whisker — /wˈɪskɜːr/ — samantha — 🟢 SAFE
✅ whisper — /wˈɪspɜːr/ — freedict — SAFE
✅ whole — /hˈoʊl/ — freedict — SAFE
✅ wide — /wˈaɪd/ — freedict — SAFE
✅ wild — /wˈaɪld/ — freedict — SAFE
✅ wilt — /wˈɪlt/ — freedict — SAFE
✅ wing — /wˈɪŋ/ — freedict — SAFE
✅ within — /wɪðˈɪn/ — freedict — SAFE
✅ without — /wɪθˈaʊt/ — freedict — SAFE
✅ wizard — /wˈɪzɜːrd/ — freedict — SAFE
✅ wobble — /wˈɑːbəl/ — freedict — SAFE
✅ wonder — /wˈʌndɜːr/ — freedict — SAFE
✅ wonderful — /wˈʌndɜːrfəl/ — freedict — SAFE
✅ worm — /wˈɜːrm/ — freedict — SAFE
✅ worried — /wˈɜːriːd/ — freedict — SAFE
✅ wrap — /rˈæp/ — freedict — SAFE
✅ wrist — /rˈɪst/ — freedict — SAFE
✅ yawn — /jˈɔːn/ — samantha — 🟢 SAFE
✅ yogurt — /jˈoʊɡɜːrt/ — freedict — SAFE
✅ zipper — /zˈɪpɜːr/ — freedict — SAFE

### Level 2 (1811 words)

✅ abolish — /əbˈɑːlɪʃ/ — freedict — SAFE
✅ about — /əbˈaʊt/ — freedict — SAFE
✅ absorb — /əbzˈɔːrb/ — freedict — SAFE
✅ absurd — /əbsˈɜːrd/ — freedict — SAFE
✅ abundant — /əbˈʌndənt/ — freedict — SAFE
✅ accelerate — /æksˈɛlɜːrˌeɪt/ — freedict — SAFE
✅ accept — /æksˈɛpt/ — freedict — SAFE
✅ accessory — /æksˈɛsɜːriː/ — freedict — SAFE
✅ accident — /ˈæksədənt/ — freedict — SAFE
✅ accommodate — /əkˈɑːmədˌeɪt/ — freedict — SAFE
✅ accomplish — /əkˈɑːmplɪʃ/ — freedict — SAFE
✅ accordingly — /əkˈɔːrdɪŋliː/ — freedict — SAFE
✅ account for — /əkˈaʊnt fˈɔːr/ — samantha — 🟢 SAFE
✅ accumulate — /əkjˈuːmjəlˌeɪt/ — freedict — SAFE
✅ accurate — /ˈækjɜːrət/ — freedict — SAFE
✅ achieve — /ətʃˈiːv/ — freedict — SAFE
✅ acknowledge — /æknˈɑːlɪdʒ/ — freedict — SAFE
✅ acoustics — /əkˈuːstɪks/ — freedict — SAFE
✅ act — /ˈækt/ — freedict — SAFE
✅ act on — /ˈækt ˈɑːn/ — samantha — 🟢 SAFE
✅ action — /ˈækʃən/ — freedict — SAFE
✅ adapt — /ədˈæpt/ — freedict — SAFE
✅ add — /ˈæd/ — freedict — SAFE
✅ add up — /ˈæd ˈʌp/ — freedict — SAFE
✅ addition — /ədˈɪʃən/ — freedict — SAFE
✅ additionally — /ədˈɪʃənˌʌliː/ — samantha — 🟢 SAFE
✅ address — /ˈædrˌɛs/ — freedict — SAFE
✅ adequate — /ˈædəkwət/ — samantha — 🟢 SAFE
✅ adjust — /ədʒˈʌst/ — samantha — 🟢 SAFE
✅ admiral — /ˈædmɜːrəl/ — freedict — SAFE
✅ admire — /ædmˈaɪr/ — freedict — SAFE
✅ adolescent — /ˌædəlˈɛsənt/ — freedict — SAFE
✅ adopt — /ədˈɑːpt/ — freedict — SAFE
✅ adult — /ədˈʌlt/ — freedict — SAFE
✅ advantage — /ædvˈæntɪdʒ/ — freedict — SAFE
✅ adventurous — /ædvˈɛntʃɜːrəs/ — freedict — SAFE
✅ advocate — /ˈædvəkət/ — freedict — SAFE
✅ affect — /əfˈɛkt/ — freedict — SAFE
✅ afford — /əfˈɔːrd/ — freedict — SAFE
✅ afraid — /əfrˈeɪd/ — freedict — SAFE
✅ after all — /ˈæftɜːr ˈɔːl/ — samantha — 🟢 SAFE
✅ afterward — /ˈæftɜːrwɜːrd/ — freedict — SAFE
✅ again — /əɡˈɛn/ — freedict — SAFE
✅ agree — /əɡrˈiː/ — freedict — SAFE
✅ alarm — /əlˈɑːrm/ — freedict — SAFE
✅ album — /ˈælbəm/ — samantha — 🟢 SAFE
✅ alert — /əlˈɜːrt/ — freedict — SAFE
✅ algae — /ˈældʒiː/ — samantha — 🟢 SAFE
✅ alive — /əlˈaɪv/ — freedict — SAFE
✅ allergic — /əlˈɜːrdʒɪk/ — samantha — 🟢 SAFE
✅ alley — /ˈæliː/ — freedict — SAFE
✅ allocate — /ˈæləkˌeɪt/ — samantha — 🟢 SAFE
✅ allowance — /əlˈaʊəns/ — freedict — SAFE
✅ alloy — /ˈælˌɔɪ/ — freedict — SAFE
✅ alone — /əlˈoʊn/ — freedict — SAFE
✅ also — /ˈɔːlsoʊ/ — freedict — SAFE
⚠️ alternate — /ˈɔːltɜːrnət/ — samantha — 🔴 DANGER — Heteronym: /ˈɔːl.tɚ.nət/ (adj) or /ˈɔːl.tɚ.neɪt/ (verb)
✅ although — /ˌɔːlðˈoʊ/ — freedict — SAFE
✅ altogether — /ˌɔːltəɡˈɛðɜːr/ — freedict — SAFE
✅ always — /ˈɔːlwˌeɪz/ — freedict — SAFE
✅ amass — /əmˈæs/ — freedict — SAFE
✅ amaze — /əmˈeɪz/ — freedict — SAFE
✅ amber — /ˈæmbɜːr/ — freedict — SAFE
✅ ambiguous — /æmbˈɪɡjuːəs/ — freedict — SAFE
✅ ambition — /æmbˈɪʃən/ — freedict — SAFE
✅ ambitious — /æmbˈɪʃəs/ — freedict — SAFE
✅ amend — /əmˈɛnd/ — samantha — 🟢 SAFE
✅ amendment — /əmˈɛndmənt/ — samantha — 🟢 SAFE
✅ amid — /əmˈɪd/ — freedict — SAFE
✅ amphibian — /æmfˈɪbiːən/ — freedict — SAFE
✅ ample — /ˈæmpəl/ — freedict — SAFE
✅ ancestor — /ˈænsˌɛstɜːr/ — freedict — SAFE
✅ ancient — /ˈeɪntʃənt/ — freedict — SAFE
✅ angle — /ˈæŋɡəl/ — freedict — SAFE
✅ announce — /ənˈaʊns/ — samantha — 🟢 SAFE
✅ annual — /ˈænjuːəl/ — freedict — SAFE
✅ antenna — /æntˈɛnə/ — freedict — SAFE
✅ anthem — /ˈænθəm/ — samantha — 🟢 SAFE
✅ anticipate — /æntˈɪsəpˌeɪt/ — freedict — SAFE
✅ antonym — /—/ — freedict — SAFE
✅ anxious — /ˈæŋkʃəs/ — freedict — SAFE
✅ any — /ˈɛniː/ — freedict — SAFE
✅ aperture — /ˈæpɜːrtʃɜːr/ — samantha — 🟢 SAFE
✅ apparatus — /ˌæpɜːrˈætəs/ — freedict — SAFE
✅ appeal — /əpˈiːl/ — freedict — SAFE
✅ appear — /əpˈɪr/ — freedict — SAFE
✅ appetite — /ˈæpətˌaɪt/ — freedict — SAFE
✅ applaud — /əplˈɔːd/ — freedict — SAFE
✅ applause — /əplˈɔːz/ — freedict — SAFE
✅ appliance — /əplˈaɪəns/ — freedict — SAFE
✅ appoint — /əpˈɔɪnt/ — freedict — SAFE
✅ approach — /əprˈoʊtʃ/ — freedict — SAFE
⚠️ appropriate — /əprˈoʊpriːət/ — samantha — 🔴 DANGER — Heteronym: /əˈproʊ.pri.ət/ (adj) or /əˈproʊ.pri.eɪt/ (verb)
✅ approve — /əprˈuːv/ — freedict — SAFE
⚠️ approximate — /əprˈɑːksəmət/ — samantha — 🔴 DANGER — Heteronym: /əˈprɑːk.sɪ.mət/ (adj) or /əˈprɑːk.sɪ.meɪt/ (verb)
✅ apricot — /ˈeɪprəkˌɑːt/ — freedict — SAFE
✅ aquatic — /əkwˈɑːtɪk/ — freedict — SAFE
✅ arch — /ˈɑːrtʃ/ — freedict — SAFE
✅ area — /ˈɛriːə/ — freedict — SAFE
✅ argue — /ˈɑːrɡjuː/ — freedict — SAFE
✅ arm — /ˈɑːrm/ — freedict — SAFE
✅ aroma — /ɜːrˈoʊmə/ — freedict — SAFE
✅ arrange — /ɜːrˈeɪndʒ/ — freedict — SAFE
✅ arrive — /ɜːrˈaɪv/ — freedict — SAFE
✅ artery — /ˈɑːrtɜːriː/ — freedict — SAFE
✅ as a matter of fact — /ˈæz ə mˈætɜːr ˈʌv fˈækt/ — samantha — 🟢 SAFE
✅ as a result — /ˈæz ə rɪzˈʌlt/ — samantha — 🟢 SAFE
✅ ask — /ˈæsk/ — freedict — SAFE
✅ asleep — /əslˈiːp/ — freedict — SAFE
✅ aspire — /əspˈaɪr/ — freedict — SAFE
✅ assemble — /əsˈɛmbəl/ — freedict — SAFE
✅ assent — /əsˈɛnt/ — freedict — SAFE
✅ assert — /əsˈɜːrt/ — freedict — SAFE
✅ asset — /ˈæsˌɛt/ — freedict — SAFE
✅ assign — /əsˈaɪn/ — freedict — SAFE
✅ assist — /əsˈɪst/ — freedict — SAFE
✅ assume — /əsˈuːm/ — freedict — SAFE
✅ assure — /əʃˈʊr/ — freedict — SAFE
✅ at first — /ˈæt fˈɜːrst/ — samantha — 🟢 SAFE
✅ at last — /ˈæt lˈæst/ — samantha — 🟢 SAFE
✅ at the same time — /ˈæt ðə sˈeɪm tˈaɪm/ — samantha — 🟢 SAFE
✅ atlas — /ˈætləs/ — samantha — 🟢 SAFE
✅ attack — /ətˈæk/ — freedict — SAFE
✅ attempt — /ətˈɛmpt/ — freedict — SAFE
✅ attention — /ətˈɛnʃən/ — freedict — SAFE
✅ attest — /ətˈɛst/ — freedict — SAFE
✅ attitude — /ˈætətˌuːd/ — freedict — SAFE
✅ attract — /ətrˈækt/ — freedict — SAFE
✅ authority — /əθˈɔːrətiː/ — freedict — SAFE
✅ authorize — /ˈɔːθɜːrˌaɪz/ — freedict — SAFE
✅ autobiography — /ˌɔːtəbaɪˈɑːɡrəfiː/ — freedict — SAFE
✅ available — /əvˈeɪləbəl/ — freedict — SAFE
✅ avalanche — /ˈævəlˌæntʃ/ — freedict — SAFE
✅ avoid — /əvˈɔɪd/ — freedict — SAFE
✅ awake — /əwˈeɪk/ — freedict — SAFE
✅ aware — /əwˈɛr/ — freedict — SAFE
✅ back and forth — /bˈæk ənd fˈɔːrθ/ — samantha — 🟢 SAFE
✅ back down — /bˈæk dˈaʊn/ — freedict — SAFE
✅ back up — /bˈæk ˈʌp/ — freedict — SAFE
✅ backpack — /bˈækpˌæk/ — freedict — SAFE
✅ bacteria — /bæktˈɪriːə/ — freedict — SAFE
✅ badge — /bˈædʒ/ — freedict — SAFE
✅ bagpipe — /bˈæɡpˌaɪp/ — samantha — 🟢 SAFE
✅ bail out — /bˈeɪl ˈaʊt/ — freedict — SAFE
✅ balance — /bˈæləns/ — freedict — SAFE
✅ balcony — /bˈælkəniː/ — freedict — SAFE
✅ balk — /bˈɔːk/ — freedict — SAFE
✅ balloon — /bəlˈuːn/ — freedict — SAFE
✅ ballot — /bˈælət/ — freedict — SAFE
✅ ban — /bˈæn/ — freedict — SAFE
✅ bang out — /bˈæŋ ˈaʊt/ — freedict — SAFE
✅ banjo — /bˈændʒˌoʊ/ — freedict — SAFE
✅ bankrupt — /bˈæŋkrəpt/ — freedict — SAFE
✅ banner — /bˈænɜːr/ — freedict — SAFE
✅ bar graph — /bˈɑːr ɡrˈæf/ — samantha — 🟢 SAFE
✅ bare — /bˈɛr/ — freedict — SAFE
✅ bargain — /bˈɑːrɡən/ — freedict — SAFE
✅ barrier — /bˈæriːɜːr/ — freedict — SAFE
✅ base — /bˈeɪs/ — freedict — SAFE
✅ basic — /bˈeɪsɪk/ — freedict — SAFE
✅ basin — /bˈeɪsən/ — freedict — SAFE
✅ bask — /bˈæsk/ — freedict — SAFE
✅ battle — /bˈætəl/ — freedict — SAFE
✅ bay — /bˈeɪ/ — freedict — SAFE
✅ beach — /bˈiːtʃ/ — freedict — SAFE
✅ beacon — /bˈiːkən/ — freedict — SAFE
✅ bead — /bˈiːd/ — freedict — SAFE
✅ beam — /bˈiːm/ — freedict — SAFE
✅ bear in mind — /bˈɛr ɪn mˈaɪnd/ — samantha — 🟢 SAFE
✅ because — /bɪkˈɔːz/ — freedict — SAFE
✅ because of — /bɪkˈɔːz ˈʌv/ — samantha — 🟢 SAFE
✅ become — /bɪkˈʌm/ — freedict — SAFE
✅ bedrock — /bˈɛdrˌɑːk/ — samantha — 🟢 SAFE
✅ beeswax — /—/ — freedict — SAFE
✅ before long — /bɪfˈɔːr lˈɔːŋ/ — samantha — 🟢 SAFE
✅ beforehand — /bɪfˈɔːrhˌænd/ — freedict — SAFE
✅ beg — /bˈɛɡ/ — freedict — SAFE
✅ begin — /bɪɡˈɪn/ — freedict — SAFE
✅ behalf — /bɪhˈæf/ — samantha — 🟢 SAFE
✅ behave — /bɪhˈeɪv/ — freedict — SAFE
✅ behavior — /bɪhˈeɪvjɜːr/ — samantha — 🟢 SAFE
✅ believe — /bɪlˈiːv/ — freedict — SAFE
✅ bellows — /bˈɛloʊz/ — freedict — SAFE
✅ beneficial — /bˌɛnəfˈɪʃəl/ — samantha — 🟢 SAFE
✅ benefit — /bˈɛnəfɪt/ — freedict — SAFE
✅ bestow — /bɪstˈoʊ/ — samantha — 🟢 SAFE
✅ betray — /bɪtrˈeɪ/ — freedict — SAFE
✅ better — /bˈɛtɜːr/ — freedict — SAFE
✅ bias — /bˈaɪəs/ — freedict — SAFE
✅ biased — /bˈaɪəst/ — freedict — SAFE
✅ bicycle — /bˈaɪsɪkəl/ — freedict — SAFE
✅ bilateral — /baɪlˈætɜːrəl/ — samantha — 🟢 SAFE
✅ binoculars — /bənˈɑːkjəlɜːrz/ — freedict — SAFE
✅ biography — /baɪˈɑːɡrəfiː/ — freedict — SAFE
✅ birch — /bˈɜːrtʃ/ — freedict — SAFE
✅ biscuit — /bˈɪskət/ — freedict — SAFE
✅ bit by bit — /bˈɪt bˈaɪ bˈɪt/ — samantha — 🟢 SAFE
✅ blacksmith — /blˈæksmˌɪθ/ — freedict — SAFE
✅ blame — /blˈeɪm/ — freedict — SAFE
✅ blaze — /blˈeɪz/ — freedict — SAFE
✅ blend — /blˈɛnd/ — freedict — SAFE
✅ blend in — /blˈɛnd ɪn/ — samantha — 🟢 SAFE
✅ blink — /blˈɪŋk/ — freedict — SAFE
✅ block — /blˈɑːk/ — freedict — SAFE
✅ blood — /blˈʌd/ — freedict — SAFE
✅ blossom — /blˈɑːsəm/ — freedict — SAFE
✅ blot out — /blˈɑːt ˈaʊt/ — samantha — 🟢 SAFE
✅ blueprint — /blˈuːprˌɪnt/ — freedict — SAFE
✅ bluff — /blˈʌf/ — freedict — SAFE
✅ boast — /bˈoʊst/ — freedict — SAFE
✅ bobsled — /bˈɑːbslˌɛd/ — samantha — 🟢 SAFE
✅ bog — /bˈɑːɡ/ — freedict — SAFE
✅ boil down to — /bˈɔɪl dˈaʊn tˈuː/ — samantha — 🟢 SAFE
✅ bold — /bˈoʊld/ — freedict — SAFE
✅ bolt — /bˈoʊlt/ — freedict — SAFE
✅ bone — /bˈoʊn/ — freedict — SAFE
✅ bonfire — /bˈɑːnfˌaɪɜːr/ — freedict — SAFE
✅ bonus — /bˈoʊnəs/ — samantha — 🟢 SAFE
✅ bookshelf — /bˈʊkʃˌɛlf/ — samantha — 🟢 SAFE
✅ border — /bˈɔːrdɜːr/ — freedict — SAFE
✅ bossy — /bˈɔːsiː/ — samantha — 🟢 SAFE
✅ botany — /bˈɑːtəniː/ — freedict — SAFE
✅ bother — /bˈɑːðɜːr/ — freedict — SAFE
✅ bounce — /bˈaʊns/ — freedict — SAFE
✅ boundary — /bˈaʊndɜːriː/ — freedict — SAFE
✅ bout — /bˈaʊt/ — freedict — SAFE
✅ boycott — /bˈɔɪkˌɑːt/ — samantha — 🟢 SAFE
✅ bracelet — /brˈeɪslət/ — samantha — 🟢 SAFE
✅ brackish — /brˈækɪʃ/ — samantha — 🟢 SAFE
✅ brain — /brˈeɪn/ — freedict — SAFE
✅ bramble — /brˈæmbəl/ — freedict — SAFE
✅ brass — /brˈæs/ — freedict — SAFE
✅ break down — /brˈeɪk dˈaʊn/ — samantha — 🟢 SAFE
✅ breakfast — /brˈɛkfəst/ — freedict — SAFE
✅ breath — /brˈɛθ/ — freedict — SAFE
✅ breathe — /brˈiːð/ — freedict — SAFE
✅ bridle — /brˈaɪdəl/ — freedict — SAFE
✅ brief — /brˈiːf/ — freedict — SAFE
✅ briefly — /brˈiːfliː/ — freedict — SAFE
✅ bright — /brˈaɪt/ — freedict — SAFE
✅ brilliant — /brˈɪljənt/ — freedict — SAFE
✅ bring — /brˈɪŋ/ — freedict — SAFE
✅ bring about — /brˈɪŋ əbˈaʊt/ — freedict — SAFE
✅ bring up — /brˈɪŋ ˈʌp/ — samantha — 🟢 SAFE
✅ brisk — /brˈɪsk/ — samantha — 🟢 SAFE
✅ bristle — /brˈɪsəl/ — freedict — SAFE
✅ brittle — /brˈɪtəl/ — freedict — SAFE
✅ broad — /brˈɔːd/ — freedict — SAFE
✅ broth — /brˈɔːθ/ — freedict — SAFE
✅ brunt — /brˈʌnt/ — freedict — SAFE
✅ budget — /bˈʌdʒɪt/ — freedict — SAFE
✅ bugle — /bjˈuːɡəl/ — samantha — 🟢 SAFE
✅ build — /bˈɪld/ — freedict — SAFE
✅ build up — /bˈɪld ˈʌp/ — freedict — SAFE
✅ bulb — /bˈʌlb/ — freedict — SAFE
✅ bulk — /bˈʌlk/ — freedict — SAFE
✅ bulletin — /bˈʊlɪtən/ — freedict — SAFE
✅ bumble — /bˈʌmbəl/ — freedict — SAFE
✅ bundle — /bˈʌndəl/ — freedict — SAFE
✅ bunker — /bˈʌŋkɜːr/ — freedict — SAFE
✅ buoy — /bˈuːiː/ — samantha — 🟢 SAFE
✅ burst — /bˈɜːrst/ — freedict — SAFE
✅ bury — /bˈɛriː/ — freedict — SAFE
✅ butter — /bˈʌtɜːr/ — samantha — 🟢 SAFE
✅ by and large — /bˈaɪ ənd lˈɑːrdʒ/ — freedict — SAFE
⚠️ by contrast — /bˈaɪ kˈɑːntræst/ — samantha — 🔴 DANGER — Phrase contains heteronym "contrast"
✅ cactus — /kˈæktəs/ — freedict — SAFE
✅ calendar — /kˈæləndɜːr/ — freedict — SAFE
✅ call off — /kˈɔːl ˈɔːf/ — samantha — 🟢 SAFE
✅ camel — /kˈæməl/ — freedict — SAFE
✅ camp — /kˈæmp/ — freedict — SAFE
✅ campaign — /kæmpˈeɪn/ — freedict — SAFE
✅ canal — /kənˈæl/ — freedict — SAFE
✅ canine — /kˈeɪnˌaɪn/ — freedict — SAFE
✅ canopy — /kˈænəpiː/ — freedict — SAFE
✅ capable — /kˈeɪpəbəl/ — freedict — SAFE
✅ capacity — /kəpˈæsətiː/ — freedict — SAFE
✅ capillary — /kˈæpəlˌɛriː/ — freedict — SAFE
✅ caption — /kˈæpʃən/ — samantha — 🟢 SAFE
✅ capture — /kˈæptʃɜːr/ — freedict — SAFE
✅ carbon — /kˈɑːrbən/ — freedict — SAFE
✅ careful — /kˈɛrfəl/ — freedict — SAFE
✅ carefully — /kˈɛrfəliː/ — freedict — SAFE
✅ caribou — /kˈɛrɪbˌuː/ — freedict — SAFE
✅ carousel — /kˈɛrəsˌɛl/ — samantha — 🟢 SAFE
✅ carpet — /kˈɑːrpət/ — freedict — SAFE
✅ carry — /kˈæriː/ — freedict — SAFE
✅ carry out — /kˈæriː ˈaʊt/ — freedict — SAFE
✅ cart — /kˈɑːrt/ — freedict — SAFE
✅ cartwheel — /kˈɑːrtwˌiːl/ — freedict — SAFE
✅ carve — /kˈɑːrv/ — freedict — SAFE
✅ cashew — /kˈæʃˌuː/ — samantha — 🟢 SAFE
✅ catch on — /kˈætʃ ˈɑːn/ — freedict — SAFE
✅ catch up — /kˈætʃ ˈʌp/ — samantha — 🟢 SAFE
✅ cause — /kˈɑːz/ — freedict — SAFE
✅ caution — /kˈɑːʃən/ — freedict — SAFE
✅ cautious — /kˈɔːʃəs/ — freedict — SAFE
✅ cease — /sˈiːs/ — freedict — SAFE
✅ cedar — /sˈiːdɜːr/ — freedict — SAFE
✅ ceiling — /sˈiːlɪŋ/ — freedict — SAFE
✅ celebrate — /sˈɛləbrˌeɪt/ — freedict — SAFE
✅ celebration — /sˌɛləbrˈeɪʃən/ — freedict — SAFE
✅ cell membrane — /sˈɛl mˈɛmbrˌeɪn/ — samantha — 🟢 SAFE
✅ cellar — /sˈɛlɜːr/ — freedict — SAFE
✅ cellulose — /sˈɛljəlˌoʊs/ — samantha — 🟢 SAFE
✅ center — /sˈɛntɜːr/ — samantha — 🟢 SAFE
✅ century — /sˈɛntʃɜːriː/ — freedict — SAFE
✅ certainly — /sˈɜːrtənliː/ — freedict — SAFE
✅ certify — /sˈɜːrtəfˌaɪ/ — samantha — 🟢 SAFE
✅ challenge — /tʃˈæləndʒ/ — freedict — SAFE
✅ champion — /tʃˈæmpiːən/ — freedict — SAFE
✅ chance — /tʃˈæns/ — freedict — SAFE
✅ change — /tʃˈeɪndʒ/ — freedict — SAFE
✅ chapel — /tʃˈæpəl/ — freedict — SAFE
✅ chariot — /tʃˈɛriːət/ — freedict — SAFE
✅ charm — /tʃˈɑːrm/ — freedict — SAFE
✅ chart — /tʃˈɑːrt/ — freedict — SAFE
✅ chasm — /kˈæzəm/ — freedict — SAFE
✅ check out — /tʃˈɛk ˈaʊt/ — samantha — 🟢 SAFE
✅ cheer — /tʃˈɪr/ — freedict — SAFE
✅ chestnut — /tʃˈɛsnˌʌt/ — freedict — SAFE
✅ chisel — /tʃˈɪzəl/ — freedict — SAFE
✅ choice — /tʃˈɔɪs/ — freedict — SAFE
✅ choose — /tʃˈuːz/ — freedict — SAFE
✅ chord — /kˈɔːrd/ — freedict — SAFE
✅ chromosome — /krˈoʊməsˌoʊm/ — freedict — SAFE
✅ chronic — /krˈɑːnɪk/ — freedict — SAFE
✅ cider — /sˈaɪdɜːr/ — freedict — SAFE
✅ circle — /sˈɜːrkəl/ — freedict — SAFE
✅ circulate — /sˈɜːrkjəlˌeɪt/ — freedict — SAFE
✅ circumstance — /sˈɜːrkəmstˌæns/ — freedict — SAFE
✅ cite — /sˈaɪt/ — samantha — 🟢 SAFE
✅ citizen — /sˈɪtəzən/ — freedict — SAFE
✅ city — /sˈɪtiː/ — freedict — SAFE
✅ civil — /sˈɪvəl/ — freedict — SAFE
✅ claim — /klˈeɪm/ — freedict — SAFE
✅ clam — /klˈæm/ — freedict — SAFE
✅ clarify — /klˈɛrəfˌaɪ/ — freedict — SAFE
✅ clearly — /klˈɪrliː/ — freedict — SAFE
✅ climate — /klˈaɪmət/ — freedict — SAFE
✅ climb — /klˈaɪm/ — freedict — SAFE
✅ cloak — /klˈoʊk/ — freedict — SAFE
✅ close — /klˈoʊs/ — freedict — SAFE
✅ clue — /klˈuː/ — freedict — SAFE
✅ clump — /klˈʌmp/ — freedict — SAFE
✅ coast — /kˈoʊst/ — freedict — SAFE
✅ cobblestone — /kˈɑːbəlstˌoʊn/ — freedict — SAFE
✅ cocoon — /kəkˈuːn/ — freedict — SAFE
✅ coincide — /kˌoʊɪnsˈaɪd/ — freedict — SAFE
✅ collapse — /kəlˈæps/ — freedict — SAFE
✅ colony — /kˈɑːləniː/ — freedict — SAFE
✅ colorful — /kˈʌlɜːrfəl/ — samantha — 🟢 SAFE
✅ column — /kˈɑːləm/ — freedict — SAFE
✅ combine — /kˈɑːmbaɪn/ — freedict — SAFE
✅ come across — /kˈʌm əkrˈɔːs/ — freedict — SAFE
✅ come along — /kˈʌm əlˈɔːŋ/ — freedict — SAFE
✅ come down to — /kˈʌm dˈaʊn tˈuː/ — freedict — SAFE
✅ comet — /kˈɑːmət/ — freedict — SAFE
✅ comfort — /kˈʌmfɜːrt/ — freedict — SAFE
✅ command — /kəmˈænd/ — freedict — SAFE
✅ commence — /kəmˈɛns/ — samantha — 🟢 SAFE
✅ commentary — /kˈɑːməntˌɛriː/ — samantha — 🟢 SAFE
✅ commission — /kəmˈɪʃən/ — freedict — SAFE
✅ commit — /kəmˈɪt/ — freedict — SAFE
✅ common — /kˈɑːmən/ — freedict — SAFE
✅ communicate — /kəmjˈuːnəkˌeɪt/ — freedict — SAFE
✅ community — /kəmjˈuːnətiː/ — freedict — SAFE
✅ commute — /kəmjˈuːt/ — freedict — SAFE
✅ compact — /kˈɑːmpækt/ — freedict — SAFE
✅ companion — /kəmpˈænjən/ — freedict — SAFE
✅ compare — /kəmpˈɛr/ — freedict — SAFE
✅ compared to — /kəmpˈɛrd tˈuː/ — samantha — 🟢 SAFE
✅ compass — /kˈʌmpəs/ — freedict — SAFE
✅ compassion — /kəmpˈæʃən/ — freedict — SAFE
⚠️ compassionate — /kəmpˈæʃənət/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ compel — /kəmpˈɛl/ — freedict — SAFE
✅ compensate — /kˈɑːmpənsˌeɪt/ — freedict — SAFE
✅ compete — /kəmpˈiːt/ — samantha — 🟢 SAFE
✅ compile — /kəmpˈaɪl/ — freedict — SAFE
✅ complain — /kəmplˈeɪn/ — freedict — SAFE
✅ complement — /kˈɑːmpləmənt/ — freedict — SAFE
✅ complete — /kəmplˈiːt/ — freedict — SAFE
✅ complex — /kˈɑːmplɛks/ — samantha — 🟢 SAFE
✅ comply — /kəmplˈaɪ/ — freedict — SAFE
✅ component — /kəmpˈoʊnənt/ — freedict — SAFE
✅ compost — /kˈɑːmpoʊst/ — freedict — SAFE
✅ compound — /kˈɑːmpaʊnd/ — freedict — SAFE
✅ comprehensive — /kˌɑːmpriːhˈɛnsɪv/ — freedict — SAFE
✅ compromise — /kˈɑːmprəmˌaɪz/ — freedict — SAFE
✅ compulsory — /kəmpˈʌlsɜːriː/ — samantha — 🟢 SAFE
✅ concave — /kɑːnkˈeɪv/ — freedict — SAFE
✅ conceive — /kənsˈiːv/ — freedict — SAFE
✅ concentrate — /kˈɑːnsəntrˌeɪt/ — samantha — 🟢 SAFE
✅ concern — /kənsˈɜːrn/ — freedict — SAFE
✅ conclude — /kənklˈuːd/ — freedict — SAFE
✅ conclusion — /kənklˈuːʒən/ — freedict — SAFE
✅ condemn — /kəndˈɛm/ — freedict — SAFE
✅ conduct — /kˈɑːndəkt/ — freedict — SAFE
✅ confident — /kˈɑːnfədənt/ — freedict — SAFE
✅ confine — /kənfˈaɪn/ — freedict — SAFE
✅ confirm — /kənfˈɜːrm/ — freedict — SAFE
✅ conflict — /kˈɑːnflɪkt/ — freedict — SAFE
✅ confront — /kənfrˈʌnt/ — freedict — SAFE
✅ confuse — /kənfjˈuːz/ — samantha — 🟢 SAFE
✅ congress — /kˈɑːŋɡrəs/ — freedict — SAFE
✅ connect — /kənˈɛkt/ — samantha — 🟢 SAFE
✅ conquer — /kˈɑːŋkɜːr/ — freedict — SAFE
✅ conscious — /kˈɑːnʃəs/ — freedict — SAFE
✅ consent — /kənsˈɛnt/ — freedict — SAFE
✅ consequence — /kˈɑːnsəkwəns/ — freedict — SAFE
✅ consequent — /kˈɑːnsəkwənt/ — samantha — 🟢 SAFE
✅ consequently — /kˈɑːnsəkwəntliː/ — freedict — SAFE
✅ conserve — /kənsˈɜːrv/ — samantha — 🟢 SAFE
✅ consider — /kənsˈɪdɜːr/ — freedict — SAFE
✅ considerable — /kənsˈɪdɜːrəbəl/ — freedict — SAFE
✅ considerate — /kənsˈɪdɜːrət/ — samantha — 🟢 SAFE
✅ consist — /kənsˈɪst/ — freedict — SAFE
✅ consistent — /kənsˈɪstənt/ — freedict — SAFE
✅ consolidate — /kənsˈɑːlɪdˌeɪt/ — freedict — SAFE
✅ consonant — /kˈɑːnsənənt/ — freedict — SAFE
✅ conspicuous — /kənspˈɪkjuːəs/ — freedict — SAFE
✅ constant — /kˈɑːnstənt/ — freedict — SAFE
✅ constantly — /kˈɑːnstəntliː/ — freedict — SAFE
✅ constitute — /kˈɑːnstətˌuːt/ — freedict — SAFE
✅ constrain — /kənstrˈeɪn/ — freedict — SAFE
✅ constraint — /kənstrˈeɪnt/ — freedict — SAFE
✅ construct — /kənstrˈʌkt/ — samantha — 🟢 SAFE
✅ consult — /kənsˈʌlt/ — samantha — 🟢 SAFE
✅ contain — /kəntˈeɪn/ — freedict — SAFE
✅ contemplate — /kˈɑːntəmplˌeɪt/ — freedict — SAFE
✅ contempt — /kəntˈɛmpt/ — freedict — SAFE
✅ contend — /kəntˈɛnd/ — freedict — SAFE
✅ contest — /kˈɑːntɛst/ — freedict — SAFE
✅ continent — /kˈɑːntənənt/ — freedict — SAFE
✅ continue — /kəntˈɪnjuː/ — freedict — SAFE
✅ continuously — /kəntˈɪnjuːəsliː/ — freedict — SAFE
✅ contradict — /kˌɑːntrədˈɪkt/ — samantha — 🟢 SAFE
⚠️ contrast — /kˈɑːntræst/ — samantha — 🔴 DANGER — Heteronym: /ˈkɑːn.træst/ (noun) or /kənˈtræst/ (verb)
✅ contribute — /kəntrˈɪbjuːt/ — freedict — SAFE
✅ control — /kəntrˈoʊl/ — freedict — SAFE
✅ controversial — /kˌɑːntrəvˈɜːrʃəl/ — freedict — SAFE
✅ controversy — /kˈɑːntrəvˌɜːrsiː/ — freedict — SAFE
✅ convene — /kənvˈiːn/ — samantha — 🟢 SAFE
✅ convenient — /kənvˈiːnjənt/ — freedict — SAFE
✅ convention — /kənvˈɛnʃən/ — freedict — SAFE
✅ conversation — /kˌɑːnvɜːrsˈeɪʃən/ — freedict — SAFE
✅ convert — /kˈɑːnvɜːrt/ — freedict — SAFE
✅ convex — /kənvˈɛks/ — freedict — SAFE
✅ convey — /kənvˈeɪ/ — freedict — SAFE
✅ convince — /kənvˈɪns/ — freedict — SAFE
✅ cooperate — /koʊˈɑːpɜːrˌeɪt/ — freedict — SAFE
✅ cooperative — /koʊˈɑːpɜːrˌeɪtɪv/ — samantha — 🟢 SAFE
✅ coordinate — /koʊˈɔːrdənət/ — samantha — 🟢 SAFE
✅ cope — /kˈoʊp/ — freedict — SAFE
✅ core — /kˈɔːr/ — freedict — SAFE
✅ cork — /kˈɔːrk/ — freedict — SAFE
✅ corner — /kˈɔːrnɜːr/ — freedict — SAFE
✅ corporate — /kˈɔːrpɜːrət/ — freedict — SAFE
✅ corral — /kɜːrˈæl/ — samantha — 🟢 SAFE
✅ correspond — /kˌɔːrəspˈɑːnd/ — freedict — SAFE
✅ corrupt — /kɜːrˈʌpt/ — freedict — SAFE
✅ cost — /kˈɑːst/ — freedict — SAFE
✅ cotton — /kˈɑːtən/ — freedict — SAFE
✅ counsel — /kˈaʊnsəl/ — freedict — SAFE
✅ count on — /kˈaʊnt ˈɑːn/ — samantha — 🟢 SAFE
✅ counterpart — /kˈaʊntɜːrpˌɑːrt/ — freedict — SAFE
✅ country — /kˈʌntriː/ — freedict — SAFE
✅ courage — /kˈɜːrədʒ/ — freedict — SAFE
✅ courageous — /kɜːrˈeɪdʒəs/ — samantha — 🟢 SAFE
✅ course — /kˈɔːrs/ — freedict — SAFE
✅ courteous — /kˈɜːrtiːəs/ — freedict — SAFE
✅ cover — /kˈʌvɜːr/ — freedict — SAFE
✅ cradle — /krˈeɪdəl/ — freedict — SAFE
✅ crash — /krˈæʃ/ — freedict — SAFE
✅ creative — /kriːˈeɪtɪv/ — samantha — 🟢 SAFE
✅ creature — /krˈiːtʃɜːr/ — freedict — SAFE
✅ credit — /krˈɛdət/ — freedict — SAFE
✅ crest — /krˈɛst/ — freedict — SAFE
✅ crevice — /krˈɛvəs/ — freedict — SAFE
✅ crisis — /krˈaɪsəs/ — freedict — SAFE
✅ criteria — /kraɪtˈɪriːə/ — samantha — 🟢 SAFE
✅ criterion — /kraɪtˈɪriːən/ — freedict — SAFE
✅ critical — /krˈɪtɪkəl/ — freedict — SAFE
✅ crop — /krˈɑːp/ — freedict — SAFE
✅ cross — /krˈɔːs/ — freedict — SAFE
✅ cross out — /krˈɔːs ˈaʊt/ — samantha — 🟢 SAFE
✅ crucial — /krˈuːʃəl/ — freedict — SAFE
✅ cruel — /krˈuːəl/ — freedict — SAFE
✅ crumb — /krˈʌm/ — freedict — SAFE
✅ crumble — /krˈʌmbəl/ — freedict — SAFE
✅ crush — /krˈʌʃ/ — freedict — SAFE
✅ cuddle — /kˈʌdəl/ — freedict — SAFE
✅ cuff — /kˈʌf/ — samantha — 🟢 SAFE
✅ cultivate — /kˈʌltəvˌeɪt/ — freedict — SAFE
✅ culture — /kˈʌltʃɜːr/ — freedict — SAFE
✅ cumulative — /kjˈuːmjələtɪv/ — samantha — 🟢 SAFE
✅ currency — /kˈɜːrənsiː/ — freedict — SAFE
✅ current — /kˈɜːrənt/ — freedict — SAFE
✅ currently — /kˈɜːrəntliː/ — freedict — SAFE
✅ curriculum — /kɜːrˈɪkjələm/ — freedict — SAFE
✅ custody — /kˈʌstədiː/ — samantha — 🟢 SAFE
✅ custom — /kˈʌstəm/ — freedict — SAFE
✅ cut back — /kˈʌt bˈæk/ — samantha — 🟢 SAFE
✅ cut off — /kˈʌt ˈɔːf/ — freedict — SAFE
✅ cycle — /sˈaɪkəl/ — freedict — SAFE
✅ cypress — /sˈaɪprəs/ — freedict — SAFE
✅ dagger — /dˈæɡɜːr/ — samantha — 🟢 SAFE
✅ dandelion — /dˈændəlˌaɪən/ — freedict — SAFE
✅ danger — /dˈeɪndʒɜːr/ — freedict — SAFE
✅ dare — /dˈɛr/ — freedict — SAFE
✅ daring — /dˈɛrɪŋ/ — samantha — 🟢 SAFE
✅ dark — /dˈɑːrk/ — freedict — SAFE
✅ data — /dˈeɪtə/ — freedict — SAFE
✅ day by day — /dˈeɪ bˈaɪ dˈeɪ/ — samantha — 🟢 SAFE
✅ deal — /dˈiːl/ — freedict — SAFE
✅ deal with — /dˈiːl wˈɪð/ — samantha — 🟢 SAFE
✅ debate — /dəbˈeɪt/ — freedict — SAFE
✅ debris — /dəbrˈiː/ — freedict — SAFE
✅ decade — /dɛkˈeɪd/ — freedict — SAFE
✅ decide — /dˌɪsˈaɪd/ — freedict — SAFE
✅ decimal — /dˈɛsəməl/ — freedict — SAFE
✅ decision — /dɪsˈɪʒən/ — freedict — SAFE
✅ deck — /dˈɛk/ — freedict — SAFE
✅ decline — /dɪklˈaɪn/ — freedict — SAFE
✅ decoy — /dəkˈɔɪ/ — freedict — SAFE
✅ dedicate — /dˈɛdəkˌeɪt/ — freedict — SAFE
✅ defend — /dɪfˈɛnd/ — freedict — SAFE
✅ deficiency — /dɪfˈɪʃənsiː/ — samantha — 🟢 SAFE
✅ deficit — /dˈɛfəsət/ — samantha — 🟢 SAFE
✅ definite — /dˈɛfənət/ — freedict — SAFE
✅ definition — /dˌɛfənˈɪʃən/ — freedict — SAFE
✅ delay — /dɪlˈeɪ/ — freedict — SAFE
⚠️ delegate — /dˈɛləɡˌeɪt/ — samantha — 🔴 DANGER — Heteronym: /ˈdɛl.ɪ.ɡət/ (noun) or /ˈdɛl.ɪ.ɡeɪt/ (verb)
⚠️ deliberate — /dɪlˈɪbɜːrət/ — samantha — 🔴 DANGER — Heteronym: /dɪˈlɪb.ɚ.ət/ (adj) or /dɪˈlɪb.ɚ.eɪt/ (verb)
✅ delicate — /dˈɛləkət/ — freedict — SAFE
✅ delight — /dɪlˈaɪt/ — freedict — SAFE
✅ delta — /dˈɛltə/ — freedict — SAFE
✅ demand — /dɪmˈænd/ — freedict — SAFE
✅ demanding — /dɪmˈændɪŋ/ — samantha — 🟢 SAFE
✅ democracy — /dɪmˈɑːkrəsiː/ — samantha — 🟢 SAFE
✅ demonstrate — /dˈɛmənstrˌeɪt/ — freedict — SAFE
✅ denote — /dɪnˈoʊt/ — freedict — SAFE
✅ dense — /dˈɛns/ — freedict — SAFE
✅ deny — /dɪnˈaɪ/ — freedict — SAFE
✅ depend — /dɪpˈɛnd/ — freedict — SAFE
✅ dependable — /dɪpˈɛndəbəl/ — samantha — 🟢 SAFE
✅ depict — /dɪpˈɪkt/ — freedict — SAFE
✅ deplete — /dɪplˈiːt/ — freedict — SAFE
✅ deposit — /dəpˈɑːzɪt/ — freedict — SAFE
✅ derive — /dɜːrˈaɪv/ — freedict — SAFE
✅ descend — /dɪsˈɛnd/ — freedict — SAFE
✅ describe — /dɪskrˈaɪb/ — freedict — SAFE
✅ deserve — /dɪzˈɜːrv/ — freedict — SAFE
✅ designate — /dˈɛzəɡnˌeɪt/ — samantha — 🟢 SAFE
✅ desire — /dɪzˈaɪɜːr/ — freedict — SAFE
✅ desperate — /dˈɛsprɪt/ — freedict — SAFE
✅ despite — /dɪspˈaɪt/ — freedict — SAFE
✅ destroy — /dɪstrˈɔɪ/ — freedict — SAFE
✅ detail — /dɪtˈeɪl/ — freedict — SAFE
✅ detect — /dɪtˈɛkt/ — samantha — 🟢 SAFE
✅ deteriorate — /dɪtˈɪriːɜːrˌeɪt/ — freedict — SAFE
✅ determine — /dətˈɜːrmən/ — freedict — SAFE
✅ determined — /dɪtˈɜːrmənd/ — freedict — SAFE
✅ detour — /dɪtˈʊr/ — samantha — 🟢 SAFE
✅ develop — /dɪvˈɛləp/ — freedict — SAFE
✅ deviate — /dˈiːviːˌeɪt/ — freedict — SAFE
✅ devote — /dɪvˈoʊt/ — freedict — SAFE
✅ devoted — /dɪvˈoʊtɪd/ — freedict — SAFE
✅ diagram — /dˈaɪəɡrˌæm/ — samantha — 🟢 SAFE
✅ dialogue — /dˈaɪəlˌɔːɡ/ — freedict — SAFE
✅ dictate — /dɪktˈeɪt/ — samantha — 🟢 SAFE
✅ diet — /dˈaɪət/ — freedict — SAFE
✅ difference — /dˈɪfɜːrəns/ — freedict — SAFE
✅ dig — /dˈɪɡ/ — freedict — SAFE
✅ digest — /daɪdʒˈɛst/ — freedict — SAFE
✅ digit — /dˈɪdʒət/ — freedict — SAFE
✅ dignity — /dˈɪɡnətiː/ — freedict — SAFE
✅ dilemma — /dɪlˈɛmə/ — freedict — SAFE
✅ dilute — /daɪlˈuːt/ — freedict — SAFE
✅ dim — /dˈɪm/ — freedict — SAFE
✅ dimension — /dɪmˈɛnʃən/ — freedict — SAFE
✅ diminish — /dɪmˈɪnɪʃ/ — freedict — SAFE
✅ dinghy — /dˈɪŋiː/ — freedict — SAFE
✅ dinner — /dˈɪnɜːr/ — freedict — SAFE
✅ dinosaur — /dˈaɪnəsˌɔːr/ — freedict — SAFE
✅ direct — /dɜːrˈɛkt/ — freedict — SAFE
✅ direction — /dɜːrˈɛkʃən/ — freedict — SAFE
✅ disappear — /dˌɪsəpˈɪr/ — freedict — SAFE
✅ disaster — /dɪzˈæstɜːr/ — freedict — SAFE
✅ discipline — /dˈɪsəplən/ — samantha — 🟢 SAFE
✅ discourage — /dɪskˈɜːrɪdʒ/ — freedict — SAFE
✅ discovery — /dɪskˈʌvɜːriː/ — freedict — SAFE
✅ disease — /dɪzˈiːz/ — freedict — SAFE
✅ display — /dɪsplˈeɪ/ — freedict — SAFE
✅ dispose — /dɪspˈoʊz/ — freedict — SAFE
✅ dispute — /dɪspjˈuːt/ — freedict — SAFE
✅ distance — /dˈɪstəns/ — freedict — SAFE
✅ distant — /dˈɪstənt/ — freedict — SAFE
✅ distinct — /dɪstˈɪŋkt/ — freedict — SAFE
✅ distinguish — /dɪstˈɪŋɡwɪʃ/ — freedict — SAFE
✅ distort — /dɪstˈɔːrt/ — freedict — SAFE
✅ distribute — /dɪstrˈɪbjuːt/ — freedict — SAFE
✅ diverse — /daɪvˈɜːrs/ — freedict — SAFE
✅ divide — /dɪvˈaɪd/ — freedict — SAFE
✅ division — /dɪvˈɪʒən/ — freedict — SAFE
✅ dizzy — /dˈɪziː/ — freedict — SAFE
✅ document — /dˈɑːkjəmɛnt/ — freedict — SAFE
✅ dollar — /dˈɑːlɜːr/ — freedict — SAFE
✅ domain — /doʊmˈeɪn/ — freedict — SAFE
✅ dome — /dˈoʊm/ — freedict — SAFE
✅ domestic — /dəmˈɛstɪk/ — freedict — SAFE
✅ dominate — /dˈɑːmənˌeɪt/ — samantha — 🟢 SAFE
✅ donate — /dˈoʊnˌeɪt/ — freedict — SAFE
✅ donkey — /dˈɑːŋkiː/ — freedict — SAFE
✅ doorbell — /dˈɔːrbˌɛl/ — samantha — 🟢 SAFE
✅ doorway — /dˈɔːrwˌeɪ/ — freedict — SAFE
✅ doubt — /dˈaʊt/ — freedict — SAFE
✅ downstairs — /dˈaʊnstˈɛrz/ — freedict — SAFE
✅ draft — /drˈæft/ — freedict — SAFE
✅ drama — /drˈɑːmə/ — freedict — SAFE
✅ drastic — /drˈæstɪk/ — freedict — SAFE
✅ drawbridge — /drˈɔːbrˌɪdʒ/ — samantha — 🟢 SAFE
✅ dread — /drˈɛd/ — freedict — SAFE
✅ drift — /drˈɪft/ — freedict — SAFE
✅ drop off — /drˈɑːp ˈɔːf/ — freedict — SAFE
✅ drown — /drˈaʊn/ — freedict — SAFE
✅ drowsy — /drˈaʊziː/ — freedict — SAFE
✅ drumstick — /drˈʌmstɪk/ — samantha — 🟢 SAFE
✅ due to — /dˈuː tˈuː/ — samantha — 🟢 SAFE
✅ dune — /dˈuːn/ — freedict — SAFE
✅ durable — /dˈʊrəbəl/ — samantha — 🟢 SAFE
✅ duration — /dˈʊrˈeɪʃən/ — freedict — SAFE
✅ dusty — /dˈʌstiː/ — freedict — SAFE
✅ duty — /dˈuːtiː/ — freedict — SAFE
✅ dwindle — /dwˈɪndəl/ — freedict — SAFE
✅ earn — /ˈɜːrn/ — freedict — SAFE
✅ earth — /ˈɜːrθ/ — freedict — SAFE
✅ easel — /ˈiːzəl/ — freedict — SAFE
✅ economy — /ɪkˈɑːnəmiː/ — freedict — SAFE
✅ eddy — /ˈɛdiː/ — freedict — SAFE
✅ edge — /ˈɛdʒ/ — freedict — SAFE
✅ edible — /ˈɛdəbəl/ — freedict — SAFE
✅ effect — /ɪfˈɛkt/ — freedict — SAFE
✅ efficient — /ɪfˈɪʃənt/ — freedict — SAFE
✅ effort — /ˈɛfɜːrt/ — freedict — SAFE
✅ elaborate — /ɪlˈæbrət/ — freedict — SAFE
✅ election — /ɪlˈɛkʃən/ — freedict — SAFE
✅ elegant — /ˈɛləɡənt/ — freedict — SAFE
✅ eliminate — /ɪlˈɪmənˌeɪt/ — freedict — SAFE
✅ elm — /ˈɛlm/ — samantha — 🟢 SAFE
✅ embarrass — /ɪmbˈɛrəs/ — freedict — SAFE
✅ ember — /ˈɛmbɜːr/ — samantha — 🟢 SAFE
✅ emerald — /ˈɛmrəld/ — freedict — SAFE
✅ emerge — /ɪmˈɜːrdʒ/ — samantha — 🟢 SAFE
✅ emit — /ɪmˈɪt/ — freedict — SAFE
✅ emotion — /ɪmˈoʊʃən/ — freedict — SAFE
✅ emphasis — /ˈɛmfəsəs/ — freedict — SAFE
✅ empirical — /ˌɛmpˈɪrɪkəl/ — freedict — SAFE
✅ enable — /ɛnˈeɪbəl/ — freedict — SAFE
✅ encounter — /ɪnkˈaʊntɜːr/ — freedict — SAFE
✅ encourage — /ɛnkˈɜːrɪdʒ/ — freedict — SAFE
✅ end — /ˈɛnd/ — freedict — SAFE
✅ end up — /ˈɛnd ˈʌp/ — samantha — 🟢 SAFE
✅ endangered — /ɛndˈeɪndʒɜːrd/ — samantha — 🟢 SAFE
✅ endure — /ɛndjˈʊr/ — freedict — SAFE
✅ energetic — /ˌɛnɜːrdʒˈɛtɪk/ — freedict — SAFE
✅ energy — /ˈɛnɜːrdʒiː/ — freedict — SAFE
✅ enforce — /ɛnfˈɔːrs/ — samantha — 🟢 SAFE
✅ engulf — /ɪnɡˈʌlf/ — samantha — 🟢 SAFE
✅ ensure — /ɛnʃˈʊr/ — samantha — 🟢 SAFE
✅ enter — /ˈɛntɜːr/ — freedict — SAFE
✅ enthusiastic — /ɪnθˌuːziːˈæstɪk/ — samantha — 🟢 SAFE
✅ entirely — /ɪntˈaɪɜːrliː/ — freedict — SAFE
✅ entity — /ˈɛntətiː/ — freedict — SAFE
✅ environment — /ɪnvˈaɪrənmənt/ — freedict — SAFE
✅ equality — /ɪkwˈɑːlətiː/ — samantha — 🟢 SAFE
✅ equally — /ˈiːkwəliː/ — freedict — SAFE
✅ equate — /ɪkwˈeɪt/ — samantha — 🟢 SAFE
✅ equation — /ɪkwˈeɪʒən/ — freedict — SAFE
✅ equator — /ɪkwˈeɪtɜːr/ — freedict — SAFE
✅ equipment — /ɪkwˈɪpmənt/ — freedict — SAFE
✅ erode — /ɪrˈoʊd/ — samantha — 🟢 SAFE
✅ erosion — /ɪrˈoʊʒən/ — samantha — 🟢 SAFE
✅ error — /ˈɛrɜːr/ — freedict — SAFE
✅ escape — /ɪskˈeɪp/ — freedict — SAFE
✅ especially — /əspˈɛʃliː/ — freedict — SAFE
✅ essential — /ɛsˈɛnʃəl/ — freedict — SAFE
✅ establish — /ɪstˈæblɪʃ/ — freedict — SAFE
✅ estimate — /ˈɛstəmət/ — freedict — SAFE
✅ evaluate — /ɪvˈæljuːˌeɪt/ — freedict — SAFE
✅ evaporate — /ɪvˈæpɜːrˌeɪt/ — freedict — SAFE
✅ even — /ˈiːvɪn/ — freedict — SAFE
✅ even though — /ˈiːvɪn ðˈoʊ/ — freedict — SAFE
✅ eventually — /ɪvˈɛntʃəwəliː/ — freedict — SAFE
✅ evidence — /ˈɛvədəns/ — freedict — SAFE
✅ evident — /ˈɛvədənt/ — freedict — SAFE
✅ evolve — /ɪvˈɑːlv/ — freedict — SAFE
✅ exact — /ɪɡzˈækt/ — freedict — SAFE
✅ exaggerate — /ɪɡzˈædʒɜːrˌeɪt/ — freedict — SAFE
✅ examine — /ɪɡzˈæmɪn/ — freedict — SAFE
✅ exceed — /ɪksˈiːd/ — freedict — SAFE
✅ excellent — /ˈɛksələnt/ — freedict — SAFE
✅ except — /ɪksˈɛpt/ — freedict — SAFE
✅ exception — /ɪksˈɛpʃən/ — freedict — SAFE
✅ excess — /ˈɛksˌɛs/ — freedict — SAFE
✅ exchange — /ɪkstʃˈeɪndʒ/ — freedict — SAFE
✅ excite — /ɪksˈaɪt/ — freedict — SAFE
✅ exclude — /ɪksklˈuːd/ — freedict — SAFE
✅ exhibit — /ɪɡzˈɪbɪt/ — freedict — SAFE
✅ expand — /ɪkspˈænd/ — freedict — SAFE
✅ expect — /ɪkspˈɛkt/ — freedict — SAFE
✅ expedition — /ˌɛkspədˈɪʃən/ — freedict — SAFE
✅ expense — /ɪkspˈɛns/ — freedict — SAFE
✅ experience — /ɪkspˈɪriːəns/ — freedict — SAFE
✅ experiment — /ɪkspˈɛrəmənt/ — freedict — SAFE
✅ expertise — /ˌɛkspɜːrtˈiːz/ — freedict — SAFE
✅ explain — /ɪksplˈeɪn/ — freedict — SAFE
✅ explicit — /ɪksplˈɪsət/ — freedict — SAFE
✅ exploit — /ˈɛksplˌɔɪt/ — freedict — SAFE
✅ explore — /ɪksplˈɔːr/ — freedict — SAFE
✅ explorer — /ɪksplˈɔːrɜːr/ — freedict — SAFE
✅ export — /ˈɛkspɔːrt/ — freedict — SAFE
✅ expose — /ɪkspˈoʊz/ — freedict — SAFE
✅ express — /ɪksprˈɛs/ — freedict — SAFE
✅ extend — /ɪkstˈɛnd/ — samantha — 🟢 SAFE
✅ exterior — /ɪkstˈɪriːɜːr/ — freedict — SAFE
✅ external — /ɪkstˈɜːrnəl/ — freedict — SAFE
✅ extinct — /ɪkstˈɪŋkt/ — freedict — SAFE
✅ extract — /ˈɛkstrˌækt/ — samantha — 🟢 SAFE
✅ extreme — /ɛkstrˈiːm/ — freedict — SAFE
✅ extricate — /ˈɛkstrəkˌeɪt/ — freedict — SAFE
✅ fable — /fˈeɪbəl/ — freedict — SAFE
✅ facilitate — /fəsˈɪlətˌeɪt/ — freedict — SAFE
✅ fact — /fˈækt/ — freedict — SAFE
✅ factor — /fˈæktɜːr/ — freedict — SAFE
✅ fail — /fˈeɪl/ — freedict — SAFE
✅ faint — /fˈeɪnt/ — freedict — SAFE
✅ fair — /fˈɛr/ — freedict — SAFE
✅ falcon — /fˈælkən/ — freedict — SAFE
✅ fall apart — /fˈɔːl əpˈɑːrt/ — freedict — SAFE
✅ fall behind — /fˈɔːl bɪhˈaɪnd/ — freedict — SAFE
✅ familiar — /fəmˈɪljɜːr/ — freedict — SAFE
✅ famine — /fˈæmən/ — freedict — SAFE
✅ famous — /fˈeɪməs/ — freedict — SAFE
✅ far — /fˈɑːr/ — freedict — SAFE
✅ farm — /fˈɑːrm/ — freedict — SAFE
✅ fascinate — /fˈæsənˌeɪt/ — samantha — 🟢 SAFE
✅ fatal — /fˈeɪtəl/ — freedict — SAFE
✅ fate — /fˈeɪt/ — freedict — SAFE
✅ fault — /fˈɔːlt/ — freedict — SAFE
✅ fauna — /fˈɔːnə/ — samantha — 🟢 SAFE
✅ fearless — /fˈɪrləs/ — samantha — 🟢 SAFE
✅ feature — /fˈiːtʃɜːr/ — freedict — SAFE
✅ fence — /fˈɛns/ — freedict — SAFE
✅ ferry — /fˈɛriː/ — freedict — SAFE
✅ fiber — /fˈaɪbɜːr/ — freedict — SAFE
✅ fiction — /fˈɪkʃən/ — freedict — SAFE
✅ fiddle — /fˈɪdəl/ — freedict — SAFE
✅ field — /fˈiːld/ — freedict — SAFE
✅ fig — /fˈɪɡ/ — freedict — SAFE
✅ figure of speech — /fˈɪɡjɜːr ˈʌv spˈiːtʃ/ — freedict — SAFE
✅ fill — /fˈɪl/ — freedict — SAFE
✅ filthy — /fˈɪlθiː/ — freedict — SAFE
✅ find — /fˈaɪnd/ — freedict — SAFE
✅ finish — /fˈɪnɪʃ/ — freedict — SAFE
✅ finite — /fˈaɪnˌaɪt/ — freedict — SAFE
✅ fit — /fˈɪt/ — freedict — SAFE
✅ fjord — /fjˈɔːrd/ — freedict — SAFE
✅ flat — /flˈæt/ — freedict — SAFE
✅ flexible — /flˈɛksəbəl/ — freedict — SAFE
✅ flint — /flˈɪnt/ — freedict — SAFE
✅ flour — /flˈaʊɜːr/ — freedict — SAFE
✅ flourish — /flˈɜːrɪʃ/ — samantha — 🟢 SAFE
✅ flow — /flˈoʊ/ — freedict — SAFE
✅ fluctuate — /flˈʌktʃəwˌeɪt/ — samantha — 🟢 SAFE
✅ foam — /fˈoʊm/ — freedict — SAFE
✅ focal — /fˈoʊkəl/ — samantha — 🟢 SAFE
✅ focus — /fˈoʊkəs/ — samantha — 🟢 SAFE
✅ foggy — /fˈɑːɡiː/ — samantha — 🟢 SAFE
✅ fold — /fˈoʊld/ — freedict — SAFE
✅ folktale — /fˈoʊktˌeɪl/ — samantha — 🟢 SAFE
✅ follow — /fˈɑːloʊ/ — freedict — SAFE
✅ food chain — /fˈuːd tʃˈeɪn/ — freedict — SAFE
✅ food web — /fˈuːd wˈɛb/ — freedict — SAFE
✅ for instance — /fˈɔːr ˈɪnstəns/ — freedict — SAFE
✅ forbid — /fɜːrbˈɪd/ — freedict — SAFE
✅ force — /fˈɔːrs/ — freedict — SAFE
✅ forecast — /fˈɔːrkˌæst/ — freedict — SAFE
✅ forge — /fˈɔːrdʒ/ — freedict — SAFE
✅ forgiving — /fɜːrɡˈɪvɪŋ/ — samantha — 🟢 SAFE
✅ fork — /fˈɔːrk/ — freedict — SAFE
✅ form — /fˈɔːrm/ — freedict — SAFE
✅ format — /fˈɔːrmˌæt/ — freedict — SAFE
✅ formerly — /fˈɔːrmɜːrliː/ — freedict — SAFE
✅ formula — /fˈɔːrmjələ/ — freedict — SAFE
✅ fortunate — /fˈɔːrtʃənət/ — freedict — SAFE
✅ fortune — /fˈɔːrtʃən/ — samantha — 🟢 SAFE
✅ fossil — /fˈɑːsəl/ — freedict — SAFE
✅ foundation — /faʊndˈeɪʃən/ — freedict — SAFE
✅ fraction — /frˈækʃən/ — freedict — SAFE
✅ fragile — /frˈædʒəl/ — freedict — SAFE
✅ fragment — /frˈæɡmənt/ — samantha — 🟢 SAFE
✅ framework — /frˈeɪmwˌɜːrk/ — samantha — 🟢 SAFE
✅ freedom — /frˈiːdəm/ — freedict — SAFE
✅ frequent — /frˈiːkwənt/ — freedict — SAFE
✅ frequently — /frˈiːkwəntliː/ — freedict — SAFE
✅ fresco — /frˈɛskoʊ/ — freedict — SAFE
✅ freshen up — /frˈɛʃən ˈʌp/ — samantha — 🟢 SAFE
✅ friendly — /frˈɛndliː/ — freedict — SAFE
✅ friendship — /frˈɛndʃɪp/ — freedict — SAFE
✅ frighten — /frˈaɪtən/ — freedict — SAFE
✅ from now on — /frˈʌm nˈaʊ ˈɑːn/ — samantha — 🟢 SAFE
✅ front — /frˈʌnt/ — freedict — SAFE
✅ frontier — /frəntˈɪr/ — freedict — SAFE
✅ frozen — /frˈoʊzən/ — freedict — SAFE
✅ fulfill — /fʊlfˈɪl/ — freedict — SAFE
✅ function — /fˈʌŋkʃən/ — freedict — SAFE
✅ fund — /fˈʌnd/ — freedict — SAFE
✅ fundamental — /fˌʌndəmˈɛntəl/ — freedict — SAFE
✅ furthermore — /fˈɜːrðɜːrmˌɔːr/ — freedict — SAFE
✅ galaxy — /ɡˈæləksiː/ — freedict — SAFE
✅ gale — /ɡˈeɪl/ — freedict — SAFE
✅ galley — /ɡˈæliː/ — freedict — SAFE
✅ garnet — /ɡˈɑːrnət/ — samantha — 🟢 SAFE
✅ gas — /ɡˈæs/ — freedict — SAFE
✅ gaze — /ɡˈeɪz/ — freedict — SAFE
✅ gazelle — /ɡəzˈɛl/ — freedict — SAFE
✅ generally — /dʒˈɛnɜːrəliː/ — freedict — SAFE
✅ generate — /dʒˈɛnɜːrˌeɪt/ — freedict — SAFE
✅ generation — /dʒˌɛnɜːrˈeɪʃən/ — freedict — SAFE
✅ genre — /ʒˈɑːnrə/ — freedict — SAFE
✅ gentleman — /dʒˈɛntəlmən/ — freedict — SAFE
✅ genuine — /dʒˈɛnjəwən/ — freedict — SAFE
✅ germ — /dʒˈɜːrm/ — freedict — SAFE
✅ get along — /ɡˈɛt əlˈɔːŋ/ — freedict — SAFE
✅ get by — /ɡˈɛt bˈaɪ/ — freedict — SAFE
✅ get over — /ɡˈɛt ˈoʊvɜːr/ — freedict — SAFE
✅ get rid of — /ɡˈɛt rˈɪd ˈʌv/ — freedict — SAFE
✅ geyser — /ɡˈaɪzɜːr/ — samantha — 🟢 SAFE
✅ glad — /ɡlˈæd/ — freedict — SAFE
✅ glide — /ɡlˈaɪd/ — samantha — 🟢 SAFE
✅ glitter — /ɡlˈɪtɜːr/ — freedict — SAFE
✅ globe — /ɡlˈoʊb/ — freedict — SAFE
✅ glossary — /ɡlˈɔːsɜːriː/ — freedict — SAFE
✅ glossy — /ɡlˈɔːsiː/ — freedict — SAFE
✅ go ahead — /ɡˈoʊ əhˈɛd/ — freedict — SAFE
✅ go along with — /ɡˈoʊ əlˈɔːŋ wˈɪð/ — freedict — SAFE
✅ go through — /ɡˈoʊ θrˈuː/ — samantha — 🟢 SAFE
✅ goal — /ɡˈoʊl/ — freedict — SAFE
✅ gong — /ɡˈɔːŋ/ — freedict — SAFE
✅ gorgeous — /ɡˈɔːrdʒəs/ — freedict — SAFE
✅ government — /ɡˈʌvɜːrmənt/ — freedict — SAFE
✅ grace — /ɡrˈeɪs/ — freedict — SAFE
✅ gradual — /ɡrˈædʒuːəl/ — freedict — SAFE
✅ gradually — /ɡrˈædʒuːəliː/ — freedict — SAFE
✅ granite — /ɡrˈænət/ — freedict — SAFE
✅ grapevine — /ɡrˈeɪpvˌaɪn/ — samantha — 🟢 SAFE
✅ graph — /ɡrˈæf/ — freedict — SAFE
✅ graphic — /ɡrˈæfɪk/ — samantha — 🟢 SAFE
✅ grasp — /ɡrˈæsp/ — freedict — SAFE
✅ gravel — /ɡrˈævəl/ — samantha — 🟢 SAFE
⚠️ gravitational — /ɡrˌævɪtˈeɪʃənəl/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ gravity — /ɡrˈævətiː/ — freedict — SAFE
✅ greatest — /ɡrˈeɪtəst/ — freedict — SAFE
✅ greenhouse effect — /ɡrˈiːnhˌaʊs ɪfˈɛkt/ — samantha — 🟢 SAFE
✅ greet — /ɡrˈiːt/ — freedict — SAFE
✅ griddle — /—/ — samantha — 🟢 SAFE
✅ grim — /ɡrˈɪm/ — freedict — SAFE
✅ grin — /ɡrˈɪn/ — freedict — SAFE
✅ groan — /ɡrˈoʊn/ — freedict — SAFE
✅ grove — /ɡrˈoʊv/ — freedict — SAFE
✅ grow — /ɡrˈoʊ/ — freedict — SAFE
✅ grow up — /ɡrˈoʊ ˈʌp/ — freedict — SAFE
✅ guarantee — /ɡˌɛrəntˈiː/ — samantha — 🟢 SAFE
✅ guard — /ɡˈɑːrd/ — freedict — SAFE
✅ guardian — /ɡˈɑːrdiːən/ — freedict — SAFE
✅ guess — /ɡˈɛs/ — freedict — SAFE
✅ guide — /ɡˈaɪd/ — freedict — SAFE
✅ guideline — /ɡˈaɪdlˌaɪn/ — samantha — 🟢 SAFE
✅ guilty — /ɡˈɪltiː/ — freedict — SAFE
✅ gust — /ɡˈʌst/ — samantha — 🟢 SAFE
✅ gutter — /ɡˈʌtɜːr/ — freedict — SAFE
✅ habit — /hˈæbət/ — freedict — SAFE
✅ habitat — /hˈæbətˌæt/ — samantha — 🟢 SAFE
✅ hallway — /hˈɔːlwˌeɪ/ — samantha — 🟢 SAFE
✅ halt — /hˈɔːlt/ — freedict — SAFE
✅ hammock — /hˈæmək/ — freedict — SAFE
✅ hand in — /hˈænd ɪn/ — samantha — 🟢 SAFE
✅ hand out — /hˈænd ˈaʊt/ — freedict — SAFE
✅ handful — /hˈændfˌʊl/ — freedict — SAFE
✅ hang out — /hˈæŋ ˈaʊt/ — freedict — SAFE
✅ harm — /hˈɑːrm/ — freedict — SAFE
✅ harp — /hˈɑːrp/ — freedict — SAFE
✅ harsh — /hˈɑːrʃ/ — freedict — SAFE
✅ harvest — /hˈɑːrvəst/ — freedict — SAFE
✅ hasten — /hˈeɪsən/ — freedict — SAFE
✅ hazard — /hˈæzɜːrd/ — freedict — SAFE
✅ hazel — /hˈeɪzəl/ — freedict — SAFE
✅ heal — /hˈiːl/ — freedict — SAFE
✅ heart — /hˈɑːrt/ — freedict — SAFE
✅ hearth — /hˈɑːrθ/ — freedict — SAFE
✅ heavy — /hˈɛviː/ — freedict — SAFE
✅ height — /hˈaɪt/ — freedict — SAFE
✅ helpless — /hˈɛlpləs/ — freedict — SAFE
✅ hemisphere — /hˈɛmɪsfˌɪr/ — freedict — SAFE
✅ hence — /hˈɛns/ — freedict — SAFE
✅ heritage — /hˈɛrətədʒ/ — freedict — SAFE
✅ heron — /hˈɛrən/ — freedict — SAFE
✅ hesitate — /hˈɛzətˌeɪt/ — samantha — 🟢 SAFE
✅ hibernate — /hˈaɪbɜːrnˌeɪt/ — samantha — 🟢 SAFE
✅ hickory — /hˈɪkɜːriː/ — freedict — SAFE
✅ hidden — /hˈɪdən/ — freedict — SAFE
✅ hide — /hˈaɪd/ — freedict — SAFE
✅ hierarchy — /hˈaɪɜːrˌɑːrkiː/ — freedict — SAFE
✅ hike — /hˈaɪk/ — freedict — SAFE
✅ hilltop — /hˈɪltˌɑːp/ — samantha — 🟢 SAFE
✅ hint — /hˈɪnt/ — freedict — SAFE
✅ history — /hˈɪstɜːriː/ — freedict — SAFE
✅ holiday — /hˈɑːlədˌeɪ/ — freedict — SAFE
✅ holly — /hˈɑːliː/ — freedict — SAFE
✅ homophone — /hˈoʊmoʊfˌoʊn/ — freedict — SAFE
✅ honest — /ˈɑːnəst/ — freedict — SAFE
✅ honeycomb — /hˈʌniːkˌoʊm/ — samantha — 🟢 SAFE
✅ hop — /hˈɑːp/ — freedict — SAFE
✅ horizon — /hɜːrˈaɪzən/ — freedict — SAFE
✅ horrible — /hˈɔːrəbəl/ — freedict — SAFE
✅ horseshoe — /hˈɔːrsʃˌuː/ — freedict — SAFE
✅ hourglass — /ˈaʊɜːrɡlˌæs/ — samantha — 🟢 SAFE
✅ hourly — /ˈaʊrliː/ — samantha — 🟢 SAFE
✅ however — /hˌaʊˈɛvɜːr/ — freedict — SAFE
✅ hug — /hˈʌɡ/ — freedict — SAFE
✅ humble — /hˈʌmbəl/ — freedict — SAFE
✅ hunt — /hˈʌnt/ — freedict — SAFE
✅ hurry — /hˈɜːriː/ — freedict — SAFE
✅ hurt — /hˈɜːrt/ — freedict — SAFE
✅ husk — /hˈʌsk/ — freedict — SAFE
✅ hygiene — /hˈaɪdʒˌiːn/ — freedict — SAFE
✅ hypothesis — /haɪpˈɑːθəsəs/ — freedict — SAFE
✅ ibis — /ˈaɪbəs/ — samantha — 🟢 SAFE
✅ idea — /aɪdˈiːə/ — freedict — SAFE
✅ ideal — /aɪdˈiːl/ — freedict — SAFE
✅ identical — /aɪdˈɛntɪkəl/ — samantha — 🟢 SAFE
✅ identify — /aɪdˈɛntəfˌaɪ/ — freedict — SAFE
✅ ideology — /ˌaɪdiːˈɑːlədʒiː/ — freedict — SAFE
✅ igloo — /ˈɪɡluː/ — samantha — 🟢 SAFE
✅ ignore — /ˌɪɡnˈɔːr/ — freedict — SAFE
✅ illustrate — /ˈɪləstrˌeɪt/ — freedict — SAFE
✅ illustration — /ˌɪləstrˈeɪʃən/ — freedict — SAFE
✅ image — /ˈɪmədʒ/ — freedict — SAFE
✅ imagination — /ˌɪmˌædʒənˈeɪʃən/ — freedict — SAFE
✅ immediate — /ˌɪmˈiːdˌiːət/ — freedict — SAFE
✅ immediately — /ˌɪmˈiːdˌiːətliː/ — freedict — SAFE
✅ immigrant — /ˈɪməɡrənt/ — samantha — 🟢 SAFE
✅ impact — /ˌɪmpˈækt/ — freedict — SAFE
✅ impatient — /ˌɪmpˈeɪʃənt/ — freedict — SAFE
✅ implication — /ˌɪmpləkˈeɪʃən/ — samantha — 🟢 SAFE
✅ imply — /ˌɪmplˈaɪ/ — freedict — SAFE
✅ import — /ˌɪmpˈɔːrt/ — freedict — SAFE
✅ impose — /ˌɪmpˈoʊz/ — freedict — SAFE
✅ impress — /ˌɪmprˈɛs/ — freedict — SAFE
✅ improve — /ˌɪmprˈuːv/ — freedict — SAFE
✅ in addition — /ɪn ədˈɪʃən/ — freedict — SAFE
✅ in conclusion — /ɪn kənklˈuːʒən/ — samantha — 🟢 SAFE
⚠️ in contrast — /ɪn kˈɑːntræst/ — samantha — 🔴 DANGER — Phrase contains heteronym "contrast"
✅ in fact — /ɪn fˈækt/ — samantha — 🟢 SAFE
✅ in general — /ɪn dʒˈɛnɜːrəl/ — freedict — SAFE
✅ in other words — /ɪn ˈʌðɜːr wˈɜːrdz/ — samantha — 🟢 SAFE
✅ in particular — /ɪn pɜːrtˈɪkjəlɜːr/ — samantha — 🟢 SAFE
✅ in summary — /ɪn sˈʌmɜːriː/ — samantha — 🟢 SAFE
✅ in the end — /ɪn ðə ˈɛnd/ — samantha — 🟢 SAFE
✅ in the meantime — /ɪn ðə mˈiːntˌaɪm/ — samantha — 🟢 SAFE
✅ incentive — /ˌɪnsˈɛntɪv/ — freedict — SAFE
✅ incident — /ˈɪnsədənt/ — freedict — SAFE
✅ include — /ˌɪnklˈuːd/ — freedict — SAFE
✅ incorporate — /ˌɪnkˈɔːrpɜːrˌeɪt/ — freedict — SAFE
✅ increase — /ˌɪnkrˈiːs/ — freedict — SAFE
✅ incredible — /ˌɪnkrˈɛdəbəl/ — samantha — 🟢 SAFE
✅ independence — /ˌɪndɪpˈɛndəns/ — freedict — SAFE
✅ independent — /ˌɪndɪpˈɛndənt/ — freedict — SAFE
✅ index — /ˈɪndɛks/ — freedict — SAFE
✅ indicate — /ˈɪndəkˌeɪt/ — freedict — SAFE
✅ individual — /ˌɪndəvˈɪdʒəwəl/ — freedict — SAFE
✅ induce — /ˌɪndˈuːs/ — freedict — SAFE
✅ infer — /ˌɪnfˈɜːr/ — freedict — SAFE
✅ influence — /ˈɪnfluːəns/ — freedict — SAFE
✅ inform — /ˌɪnfˈɔːrm/ — freedict — SAFE
✅ inhabit — /ˌɪnhˈæbət/ — freedict — SAFE
✅ inherent — /ɪnhˈɪrənt/ — freedict — SAFE
✅ inherit — /ˌɪnhˈɛrət/ — freedict — SAFE
✅ inhibit — /ˌɪnhˈɪbət/ — samantha — 🟢 SAFE
✅ initial — /ˌɪnˈɪʃəl/ — freedict — SAFE
✅ initially — /ˌɪnˈɪʃəliː/ — samantha — 🟢 SAFE
✅ initiate — /ˌɪnˈɪʃiːˌeɪt/ — freedict — SAFE
✅ injure — /ˈɪndʒɜːr/ — freedict — SAFE
✅ innocent — /ˈɪnəsənt/ — freedict — SAFE
✅ innovation — /ˌɪnəvˈeɪʃən/ — samantha — 🟢 SAFE
✅ inquire — /ˌɪnkwˈaɪr/ — freedict — SAFE
✅ insect — /ˈɪnsˌɛkt/ — freedict — SAFE
✅ insert — /ˌɪnsˈɜːrt/ — freedict — SAFE
✅ inside — /ˌɪnsˈaɪd/ — freedict — SAFE
✅ insist — /ˌɪnsˈɪst/ — freedict — SAFE
✅ inspect — /ˌɪnspˈɛkt/ — freedict — SAFE
✅ inspector — /ˌɪnspˈɛktɜːr/ — freedict — SAFE
✅ inspire — /ˌɪnspˈaɪr/ — freedict — SAFE
✅ instance — /ˈɪnstəns/ — freedict — SAFE
✅ instantly — /ˈɪnstəntliː/ — freedict — SAFE
✅ instinct — /ˈɪnstɪŋkt/ — freedict — SAFE
✅ institution — /ˌɪnstɪtˈuːʃən/ — freedict — SAFE
✅ instruct — /ˌɪnstrˈʌkt/ — freedict — SAFE
✅ insulate — /ˈɪnsəlˌeɪt/ — freedict — SAFE
✅ integral — /ˈɪntəɡrəl/ — freedict — SAFE
✅ integrate — /ˈɪntəɡrˌeɪt/ — freedict — SAFE
✅ intense — /ˌɪntˈɛns/ — freedict — SAFE
✅ interact — /ˌɪntɜːrˈækt/ — samantha — 🟢 SAFE
✅ internal — /ˌɪntˈɜːrnəl/ — freedict — SAFE
✅ interpret — /ˌɪntˈɜːrprət/ — freedict — SAFE
✅ interrupt — /ˌɪntɜːrˈʌpt/ — freedict — SAFE
✅ intervene — /ˌɪntɜːrvˈiːn/ — samantha — 🟢 SAFE
✅ introduce — /ˌɪntrədˈuːs/ — freedict — SAFE
✅ invade — /ˌɪnvˈeɪd/ — freedict — SAFE
✅ invention — /ˌɪnvˈɛnʃən/ — freedict — SAFE
✅ investigate — /ˌɪnvˈɛstəɡˌeɪt/ — freedict — SAFE
✅ invisible — /ˌɪnvˈɪzəbəl/ — freedict — SAFE
✅ invite — /ˌɪnvˈaɪt/ — freedict — SAFE
✅ invoke — /ˌɪnvˈoʊk/ — samantha — 🟢 SAFE
✅ involve — /ˌɪnvˈɑːlv/ — freedict — SAFE
✅ isolate — /ˈaɪsəlˌeɪt/ — freedict — SAFE
✅ issue — /ˈɪʃuː/ — freedict — SAFE
✅ item — /ˈaɪtəm/ — freedict — SAFE
✅ ivy — /ˈaɪviː/ — freedict — SAFE
✅ jacket — /dʒˈækət/ — freedict — SAFE
✅ jade — /dʒˈeɪd/ — freedict — SAFE
✅ javelin — /dʒˈævələn/ — freedict — SAFE
✅ joint — /dʒˈɔɪnt/ — freedict — SAFE
✅ journal — /dʒˈɜːrnəl/ — samantha — 🟢 SAFE
✅ joyful — /dʒˈɔɪfəl/ — freedict — SAFE
✅ judge — /dʒˈʌdʒ/ — freedict — SAFE
✅ jump — /dʒˈʌmp/ — freedict — SAFE
✅ justify — /dʒˈʌstəfˌaɪ/ — freedict — SAFE
✅ keen — /kˈiːn/ — freedict — SAFE
✅ keep in mind — /kˈiːp ɪn mˈaɪnd/ — samantha — 🟢 SAFE
✅ keep track of — /kˈiːp trˈæk ˈʌv/ — samantha — 🟢 SAFE
✅ keep up — /kˈiːp ˈʌp/ — freedict — SAFE
✅ kelp — /kˈɛlp/ — samantha — 🟢 SAFE
✅ kennel — /kˈɛnəl/ — freedict — SAFE
✅ key — /kˈiː/ — freedict — SAFE
✅ kind — /kˈaɪnd/ — freedict — SAFE
✅ kindle — /kˈɪndəl/ — freedict — SAFE
✅ kingfisher — /kˈɪŋfˌɪʃɜːr/ — freedict — SAFE
✅ knapsack — /nˈæpsˌæk/ — samantha — 🟢 SAFE
✅ knee — /nˈiː/ — freedict — SAFE
✅ kneel — /nˈiːl/ — freedict — SAFE
✅ knock — /nˈɑːk/ — freedict — SAFE
✅ knock down — /nˈɑːk dˈaʊn/ — freedict — SAFE
✅ knowledge — /nˈɑːlədʒ/ — freedict — SAFE
✅ lack — /lˈæk/ — freedict — SAFE
✅ lagoon — /ləɡˈuːn/ — freedict — SAFE
✅ landform — /lˈændfˌɔːrm/ — samantha — 🟢 SAFE
✅ lantern — /lˈæntɜːrn/ — freedict — SAFE
✅ latch — /lˈætʃ/ — freedict — SAFE
✅ lately — /lˈeɪtliː/ — freedict — SAFE
✅ latitude — /lˈætətˌuːd/ — freedict — SAFE
✅ laugh — /lˈæf/ — freedict — SAFE
✅ launch — /lˈɔːntʃ/ — freedict — SAFE
✅ lava — /lˈɑːvə/ — freedict — SAFE
✅ law — /lˈɔː/ — freedict — SAFE
✅ lay out — /lˈeɪ ˈaʊt/ — samantha — 🟢 SAFE
✅ layer — /lˈeɪɜːr/ — freedict — SAFE
✅ leaf — /lˈiːf/ — freedict — SAFE
✅ leak — /lˈiːk/ — freedict — SAFE
✅ lean — /lˈiːn/ — freedict — SAFE
✅ learn — /lˈɜːrn/ — freedict — SAFE
✅ least — /lˈiːst/ — freedict — SAFE
✅ leave behind — /lˈiːv bɪhˈaɪnd/ — samantha — 🟢 SAFE
✅ leave out — /lˈiːv ˈaʊt/ — samantha — 🟢 SAFE
✅ lecture — /lˈɛktʃɜːr/ — freedict — SAFE
✅ leisure — /lˈɛʒɜːr/ — freedict — SAFE
✅ length — /lˈɛŋkθ/ — freedict — SAFE
✅ let down — /lˈɛt dˈaʊn/ — freedict — SAFE
✅ levee — /lˈɛviː/ — freedict — SAFE
✅ levy — /lˈɛviː/ — freedict — SAFE
✅ liable — /lˈaɪəbəl/ — freedict — SAFE
✅ liberal — /lˈɪbˌɜːrəl/ — freedict — SAFE
✅ liberty — /lˈɪbɜːrtˌiː/ — freedict — SAFE
✅ library — /lˈaɪbrɛrˌiː/ — freedict — SAFE
✅ license — /lˈaɪsəns/ — freedict — SAFE
✅ lichen — /lˈaɪkən/ — freedict — SAFE
✅ life cycle — /lˈaɪf sˈaɪkəl/ — samantha — 🟢 SAFE
✅ likewise — /lˈaɪkwˌaɪz/ — freedict — SAFE
✅ limit — /lˈɪmət/ — freedict — SAFE
✅ line graph — /lˈaɪn ɡrˈæf/ — samantha — 🟢 SAFE
✅ line up — /lˈaɪn ˈʌp/ — freedict — SAFE
✅ link — /lˈɪŋk/ — freedict — SAFE
✅ liquid — /lˈɪkwəd/ — freedict — SAFE
✅ listen — /lˈɪsən/ — freedict — SAFE
✅ literal — /lˈɪtɜːrəl/ — freedict — SAFE
✅ little — /lˈɪtəl/ — freedict — SAFE
⚠️ live up to — /lˈaɪv ˈʌp tˈuː/ — samantha — 🔴 DANGER — Phrase contains heteronym "live"
✅ lively — /lˈaɪvliː/ — freedict — SAFE
✅ locate — /lˈoʊkˌeɪt/ — freedict — SAFE
✅ locket — /lˈɑːkɪt/ — freedict — SAFE
✅ logic — /lˈɑːdʒɪk/ — freedict — SAFE
✅ longitude — /lˈɑːndʒətˌuːd/ — freedict — SAFE
✅ look after — /lˈʊk ˈæftɜːr/ — freedict — SAFE
✅ look forward to — /lˈʊk fˈɔːrwɜːrd tˈuː/ — freedict — SAFE
✅ look into — /lˈʊk ˈɪntuː/ — freedict — SAFE
✅ look out for — /lˈʊk ˈaʊt fˈɔːr/ — samantha — 🟢 SAFE
✅ look up — /lˈʊk ˈʌp/ — freedict — SAFE
✅ loom — /lˈuːm/ — freedict — SAFE
✅ lovely — /lˈʌvliː/ — freedict — SAFE
✅ loyal — /lˈɔɪəl/ — freedict — SAFE
✅ lunch — /lˈʌntʃ/ — freedict — SAFE
✅ lung — /lˈʌŋ/ — freedict — SAFE
✅ luxury — /lˈʌɡʒɜːriː/ — freedict — SAFE
✅ lynx — /lˈɪŋks/ — freedict — SAFE
✅ machine — /məʃˈiːn/ — freedict — SAFE
✅ magic — /mˈædʒɪk/ — freedict — SAFE
✅ magnet — /mˈæɡnət/ — samantha — 🟢 SAFE
✅ magnificent — /mæɡnˈɪfəsənt/ — freedict — SAFE
✅ magnitude — /mˈæɡnətˌuːd/ — samantha — 🟢 SAFE
✅ main idea — /mˈeɪn aɪdˈiːə/ — samantha — 🟢 SAFE
✅ mainly — /mˈeɪnliː/ — samantha — 🟢 SAFE
✅ maintain — /meɪntˈeɪn/ — freedict — SAFE
✅ major — /mˈeɪdʒɜːr/ — freedict — SAFE
✅ majority — /mədʒˈɔːrətiː/ — freedict — SAFE
✅ make — /mˈeɪk/ — freedict — SAFE
✅ make out — /mˈeɪk ˈaʊt/ — freedict — SAFE
✅ make sure — /mˈeɪk ʃˈʊr/ — samantha — 🟢 SAFE
✅ make up — /mˈeɪk ˈʌp/ — samantha — 🟢 SAFE
✅ mammal — /mˈæməl/ — freedict — SAFE
✅ manage — /mˈænədʒ/ — freedict — SAFE
✅ mango — /mˈæŋɡoʊ/ — freedict — SAFE
✅ manifest — /mˈænəfˌɛst/ — freedict — SAFE
✅ mantel — /mˈæntəl/ — samantha — 🟢 SAFE
✅ manufacture — /mˌænjəfˈæktʃɜːr/ — freedict — SAFE
✅ map — /mˈæp/ — freedict — SAFE
✅ maple — /mˈeɪpəl/ — freedict — SAFE
✅ marble — /mˈɑːrbəl/ — freedict — SAFE
✅ marine — /mɜːrˈiːn/ — freedict — SAFE
✅ marsh — /mˈɑːrʃ/ — freedict — SAFE
✅ mask — /mˈæsk/ — freedict — SAFE
✅ massive — /mˈæsɪv/ — freedict — SAFE
✅ mast — /mˈæst/ — freedict — SAFE
✅ material — /mətˈɪriːəl/ — samantha — 🟢 SAFE
✅ matter — /mˈætɜːr/ — freedict — SAFE
✅ mature — /mətʃˈʊr/ — samantha — 🟢 SAFE
✅ maximum — /mˈæksəməm/ — freedict — SAFE
✅ mean — /mˈiːn/ — freedict — SAFE
✅ medicine — /mˈɛdəsən/ — freedict — SAFE
✅ memorial — /məmˈɔːriːəl/ — freedict — SAFE
✅ memory — /mˈɛmɜːriː/ — freedict — SAFE
✅ mental — /mˈɛntəl/ — freedict — SAFE
✅ mention — /mˈɛnʃən/ — freedict — SAFE
✅ merchant — /mˈɜːrtʃənt/ — freedict — SAFE
✅ mercy — /mˈɜːrsiː/ — freedict — SAFE
✅ merely — /mˈɪrliː/ — freedict — SAFE
✅ message — /mˈɛsədʒ/ — freedict — SAFE
✅ messenger — /mˈɛsəndʒɜːr/ — freedict — SAFE
✅ method — /mˈɛθəd/ — freedict — SAFE
✅ migrate — /mˈaɪɡrˌeɪt/ — samantha — 🟢 SAFE
✅ migratory — /mˈaɪɡrətˌɔːriː/ — samantha — 🟢 SAFE
✅ military — /mˈɪlətˌɛriː/ — freedict — SAFE
✅ mineral — /mˈɪnɜːrəl/ — freedict — SAFE
✅ miniature — /mˈɪniːətʃˌʊr/ — samantha — 🟢 SAFE
✅ minimum — /mˈɪnəməm/ — freedict — SAFE
✅ minor — /mˈaɪnɜːr/ — freedict — SAFE
✅ minute — /mˈɪnət/ — freedict — SAFE
✅ miracle — /mˈɪrəkəl/ — samantha — 🟢 SAFE
✅ mirror — /mˈɪrɜːr/ — freedict — SAFE
✅ mischievous — /mˈɪstʃəvəs/ — freedict — SAFE
✅ mission — /mˈɪʃən/ — freedict — SAFE
✅ mist — /mˈɪst/ — freedict — SAFE
✅ mix — /mˈɪks/ — freedict — SAFE
✅ mix up — /mˈɪks ˈʌp/ — freedict — SAFE
✅ mixture — /mˈɪkstʃɜːr/ — freedict — SAFE
✅ moat — /mˈoʊt/ — freedict — SAFE
✅ model — /mˈɑːdəl/ — freedict — SAFE
✅ modern — /mˈɑːdɜːrn/ — freedict — SAFE
✅ modest — /mˈɑːdəst/ — freedict — SAFE
✅ modify — /mˈɑːdəfˌaɪ/ — freedict — SAFE
✅ moist — /mˈɔɪst/ — freedict — SAFE
✅ moisture — /mˈɔɪstʃɜːr/ — freedict — SAFE
✅ monitor — /mˈɑːnətɜːr/ — freedict — SAFE
✅ mood — /mˈuːd/ — freedict — SAFE
✅ moral — /mˈɔːrəl/ — freedict — SAFE
✅ moreover — /mɔːrˈoʊvɜːr/ — freedict — SAFE
✅ morph — /mˈɔːrf/ — freedict — SAFE
✅ mortar — /mˈɔːrtɜːr/ — freedict — SAFE
⚠️ mosaic — /moʊzˈeɪɪk/ — samantha — 🟡 WARN — /moʊˈzeɪ.ɪk/
✅ mostly — /mˈoʊstliː/ — freedict — SAFE
✅ motion — /mˈoʊʃən/ — freedict — SAFE
✅ motive — /mˈoʊtɪv/ — freedict — SAFE
✅ move — /mˈuːv/ — freedict — SAFE
✅ move on — /mˈuːv ˈɑːn/ — freedict — SAFE
✅ mulberry — /mˈʌlbˌɛriː/ — freedict — SAFE
✅ multiply — /mˈʌltəplˌaɪ/ — freedict — SAFE
✅ mutual — /mjˈuːtʃuːəl/ — freedict — SAFE
✅ muzzle — /mˈʌzəl/ — freedict — SAFE
✅ mysterious — /mɪstˈɪriːəs/ — freedict — SAFE
✅ mystery — /mˈɪstɜːriː/ — freedict — SAFE
✅ myth — /mˈɪθ/ — freedict — SAFE
✅ namely — /nˈeɪmliː/ — freedict — SAFE
✅ narrator — /nˈɛreɪtɜːr/ — freedict — SAFE
✅ nation — /nˈeɪʃən/ — freedict — SAFE
✅ nature — /nˈeɪtʃɜːr/ — freedict — SAFE
✅ navigate — /nˈævəɡˌeɪt/ — freedict — SAFE
✅ near — /nˈɪr/ — freedict — SAFE
✅ nearly — /nˈɪrliː/ — freedict — SAFE
✅ neat — /nˈiːt/ — freedict — SAFE
✅ neatly — /nˈiːtliː/ — samantha — 🟢 SAFE
✅ nectar — /nˈɛktɜːr/ — samantha — 🟢 SAFE
✅ neglect — /nəɡlˈɛkt/ — freedict — SAFE
✅ negotiate — /nəɡˈoʊʃiːˌeɪt/ — freedict — SAFE
✅ nerve — /nˈɜːrv/ — freedict — SAFE
✅ nettle — /nˈɛtəl/ — freedict — SAFE
✅ neutral — /nˈuːtrəl/ — freedict — SAFE
✅ never — /nˈɛvɜːr/ — freedict — SAFE
✅ nevertheless — /nˌɛvɜːrðəlˈɛs/ — freedict — SAFE
✅ noble — /nˈoʊbəl/ — freedict — SAFE
✅ noisy — /nˈɔɪziː/ — freedict — SAFE
✅ nonetheless — /nˌʌnðəlˈɛs/ — freedict — SAFE
✅ nonfiction — /nɑːnfˈɪkʃən/ — samantha — 🟢 SAFE
✅ normally — /nˈɔːrməliː/ — samantha — 🟢 SAFE
✅ north — /nˈɔːrθ/ — freedict — SAFE
✅ notable — /nˈoʊtəbəl/ — freedict — SAFE
✅ notably — /nˈoʊtəbliː/ — samantha — 🟢 SAFE
✅ note — /nˈoʊt/ — freedict — SAFE
✅ notify — /nˈoʊtəfˌaɪ/ — samantha — 🟢 SAFE
✅ notion — /nˈoʊʃən/ — freedict — SAFE
✅ novel — /nˈɑːvəl/ — freedict — SAFE
✅ nozzle — /nˈɑːzəl/ — samantha — 🟢 SAFE
✅ numerous — /nˈuːmɜːrəs/ — freedict — SAFE
✅ nutmeg — /nˈʌtmˌɛɡ/ — samantha — 🟢 SAFE
✅ nutrition — /nuːtrˈɪʃən/ — freedict — SAFE
✅ oar — /ˈɔːr/ — freedict — SAFE
✅ oasis — /oʊˈeɪsɪs/ — freedict — SAFE
✅ oath — /ˈoʊθ/ — freedict — SAFE
✅ object — /ˈɑːbdʒɛkt/ — freedict — SAFE
✅ objective — /əbdʒˈɛktɪv/ — freedict — SAFE
✅ obligation — /ˌɑːbləɡˈeɪʃən/ — freedict — SAFE
✅ observe — /əbzˈɜːrv/ — freedict — SAFE
✅ obstacle — /ˈɑːbstəkəl/ — freedict — SAFE
✅ obtain — /əbtˈeɪn/ — freedict — SAFE
✅ obvious — /ˈɑːbviːəs/ — freedict — SAFE
✅ occasion — /əkˈeɪʒən/ — freedict — SAFE
✅ occasionally — /əkˈeɪʒənəliː/ — freedict — SAFE
✅ occupy — /ˈɑːkjəpˌaɪ/ — samantha — 🟢 SAFE
✅ occur — /əkˈɜːr/ — freedict — SAFE
✅ ocean — /ˈoʊʃən/ — freedict — SAFE
✅ odd — /ˈɑːd/ — freedict — SAFE
✅ offense — /əfˈɛns/ — freedict — SAFE
✅ offer — /ˈɔːfɜːr/ — freedict — SAFE
✅ offspring — /ˈɔːfsprˌɪŋ/ — freedict — SAFE
✅ olive — /ˈɑːləv/ — freedict — SAFE
✅ on account of — /ˈɑːn əkˈaʊnt ˈʌv/ — freedict — SAFE
✅ on behalf of — /ˈɑːn bɪhˈæf ˈʌv/ — samantha — 🟢 SAFE
✅ on the contrary — /ˈɑːn ðə kˈɑːntrɛriː/ — samantha — 🟢 SAFE
✅ on the whole — /ˈɑːn ðə hˈoʊl/ — samantha — 🟢 SAFE
✅ once upon a time — /wˈʌns əpˈɑːn ə tˈaɪm/ — samantha — 🟢 SAFE
✅ ongoing — /ˈɑːnɡˌoʊɪŋ/ — freedict — SAFE
✅ operate — /ˈɑːpɜːrˌeɪt/ — freedict — SAFE
✅ opinion — /əpˈɪnjən/ — freedict — SAFE
✅ oppose — /əpˈoʊz/ — freedict — SAFE
✅ opposite — /ˈɑːpəzət/ — freedict — SAFE
✅ optimistic — /ˌɑːptəmˈɪstɪk/ — samantha — 🟢 SAFE
✅ option — /ˈɑːpʃən/ — freedict — SAFE
✅ orbit — /ˈɔːrbət/ — freedict — SAFE
✅ order — /ˈɔːrdɜːr/ — freedict — SAFE
✅ ordinary — /ˈɔːrdənˌɛriː/ — freedict — SAFE
✅ ore — /ˈɔːr/ — freedict — SAFE
✅ organ — /ˈɔːrɡən/ — freedict — SAFE
✅ organize — /ˈɔːrɡənˌaɪz/ — samantha — 🟢 SAFE
✅ origin — /ˈɔːrədʒən/ — freedict — SAFE
✅ originally — /ɜːrˈɪdʒənəliː/ — freedict — SAFE
✅ otherwise — /ˈʌðɜːrwˌaɪz/ — freedict — SAFE
✅ otter — /ˈɑːtɜːr/ — samantha — 🟢 SAFE
✅ out of the blue — /ˈaʊt ˈʌv ðə blˈuː/ — samantha — 🟢 SAFE
✅ outside — /ˈaʊtsˈaɪd/ — samantha — 🟢 SAFE
✅ over — /ˈoʊvɜːr/ — freedict — SAFE
✅ overall — /ˈoʊvɜːrˌɔːl/ — freedict — SAFE
✅ overcome — /ˈoʊvɜːrkˌʌm/ — freedict — SAFE
✅ overlook — /ˈoʊvɜːrlˌʊk/ — freedict — SAFE
✅ overnight — /ˈoʊvɜːrnˈaɪt/ — samantha — 🟢 SAFE
✅ owe — /ˈoʊ/ — freedict — SAFE
✅ oxygen — /ˈɑːksədʒən/ — freedict — SAFE
✅ ozone — /ˈoʊzˌoʊn/ — freedict — SAFE
✅ pace — /pˈeɪs/ — freedict — SAFE
✅ pagoda — /pəɡˈoʊdə/ — samantha — 🟢 SAFE
✅ palace — /pˈæləs/ — freedict — SAFE
✅ pale — /pˈeɪl/ — freedict — SAFE
✅ panel — /pˈænəl/ — freedict — SAFE
✅ paragraph — /pˈærəɡrˌæf/ — freedict — SAFE
✅ parasite — /pˈɛrəsˌaɪt/ — samantha — 🟢 SAFE
✅ parchment — /pˈɑːrtʃmənt/ — samantha — 🟢 SAFE
✅ parsley — /pˈɑːrsliː/ — freedict — SAFE
✅ participate — /pɑːrtˈɪsəpˌeɪt/ — freedict — SAFE
✅ particular — /pɜːrtˈɪkjəlɜːr/ — freedict — SAFE
✅ partly — /pˈɑːrtliː/ — freedict — SAFE
✅ pass out — /pˈæs ˈaʊt/ — samantha — 🟢 SAFE
✅ passage — /pˈæsədʒ/ — freedict — SAFE
✅ passion — /pˈæʃən/ — freedict — SAFE
✅ passive — /pˈæsɪv/ — freedict — SAFE
✅ pasture — /pˈæstʃɜːr/ — freedict — SAFE
✅ patent — /pˈætənt/ — samantha — 🟢 SAFE
✅ path — /pˈæθ/ — freedict — SAFE
✅ patience — /pˈeɪʃəns/ — freedict — SAFE
✅ pause — /pˈɔːz/ — freedict — SAFE
✅ pay attention — /pˈeɪ ətˈɛnʃən/ — freedict — SAFE
✅ pebble — /pˈɛbəl/ — samantha — 🟢 SAFE
✅ peculiar — /pəkjˈuːljɜːr/ — freedict — SAFE
✅ peer — /pˈɪr/ — freedict — SAFE
✅ pelican — /pˈɛləkən/ — freedict — SAFE
✅ penalty — /pˈɛnəltiː/ — samantha — 🟢 SAFE
✅ pendant — /pˈɛndənt/ — freedict — SAFE
✅ perceive — /pɜːrsˈiːv/ — freedict — SAFE
✅ percent — /pɜːrsˈɛnt/ — freedict — SAFE
✅ perform — /pɜːrfˈɔːrm/ — freedict — SAFE
✅ peril — /pˈɛrəl/ — samantha — 🟢 SAFE
✅ period — /pˈɪriːəd/ — freedict — SAFE
✅ permanent — /pˈɜːrmənənt/ — freedict — SAFE
✅ permanently — /pˈɜːrmənəntliː/ — samantha — 🟢 SAFE
✅ permission — /pɜːrmˈɪʃən/ — freedict — SAFE
✅ permit — /pɜːrmˈɪt/ — freedict — SAFE
✅ persist — /pɜːrsˈɪst/ — freedict — SAFE
✅ perspective — /pɜːrspˈɛktɪv/ — freedict — SAFE
✅ pessimistic — /pˌɛsəmˈɪstɪk/ — samantha — 🟢 SAFE
✅ phase — /fˈeɪz/ — samantha — 🟢 SAFE
✅ phenomenon — /fənˈɑːmənˌɑːn/ — freedict — SAFE
✅ philosophy — /fəlˈɑːsəfiː/ — freedict — SAFE
✅ physical — /fˈɪzɪkəl/ — freedict — SAFE
✅ pick out — /pˈɪk ˈaʊt/ — freedict — SAFE
✅ picnic — /pˈɪknˌɪk/ — samantha — 🟢 SAFE
✅ pie chart — /pˈaɪ tʃˈɑːrt/ — samantha — 🟢 SAFE
✅ pier — /pˈɪr/ — freedict — SAFE
✅ pigment — /pˈɪɡmənt/ — freedict — SAFE
✅ pioneer — /pˌaɪənˈɪr/ — freedict — SAFE
✅ place value — /plˈeɪs vˈæljuː/ — samantha — 🟢 SAFE
✅ planet — /plˈænət/ — freedict — SAFE
✅ plankton — /plˈæŋktən/ — samantha — 🟢 SAFE
✅ plastic — /plˈæstɪk/ — freedict — SAFE
✅ playground — /plˈeɪɡrˌaʊnd/ — freedict — SAFE
✅ plea — /plˈiː/ — freedict — SAFE
✅ pleasant — /plˈɛzənt/ — freedict — SAFE
✅ pledge — /plˈɛdʒ/ — freedict — SAFE
✅ plot — /plˈɑːt/ — freedict — SAFE
✅ plump — /plˈʌmp/ — freedict — SAFE
✅ plunge — /plˈʌndʒ/ — freedict — SAFE
✅ point of view — /pˈɔɪnt ˈʌv vjˈuː/ — freedict — SAFE
✅ point out — /pˈɔɪnt ˈaʊt/ — freedict — SAFE
✅ policy — /pˈɑːləsiː/ — freedict — SAFE
✅ polish — /pˈɑːlɪʃ/ — freedict — SAFE
✅ polite — /pəlˈaɪt/ — freedict — SAFE
✅ pollutant — /pəlˈuːtənt/ — samantha — 🟢 SAFE
✅ population — /pˌɑːpjəlˈeɪʃən/ — freedict — SAFE
✅ pose — /pˈoʊz/ — freedict — SAFE
✅ positive — /pˈɑːzətɪv/ — freedict — SAFE
✅ possess — /pəzˈɛs/ — freedict — SAFE
✅ possibly — /pˈɑːsəbliː/ — freedict — SAFE
✅ potential — /pətˈɛnʃəl/ — freedict — SAFE
✅ poverty — /pˈɑːvɜːrtiː/ — freedict — SAFE
✅ powerful — /pˈaʊɜːrfəl/ — freedict — SAFE
✅ practical — /prˈæktəkəl/ — freedict — SAFE
✅ praise — /prˈeɪz/ — freedict — SAFE
✅ precious — /prˈɛʃəs/ — freedict — SAFE
✅ precisely — /prɪsˈaɪsliː/ — freedict — SAFE
✅ predator — /prˈɛdətɜːr/ — samantha — 🟢 SAFE
✅ predict — /prɪdˈɪkt/ — freedict — SAFE
✅ prefer — /prəfˈɜːr/ — freedict — SAFE
✅ prefix — /prˈiːfɪks/ — freedict — SAFE
✅ prejudice — /prˈɛdʒədɪs/ — freedict — SAFE
✅ prepare — /priːpˈɛr/ — freedict — SAFE
✅ presently — /prˈɛzəntliː/ — freedict — SAFE
✅ preserve — /prəzˈɜːrv/ — freedict — SAFE
✅ president — /prˈɛzədˌɛnt/ — freedict — SAFE
✅ pressure — /prˈɛʃɜːr/ — freedict — SAFE
✅ presume — /prɪzˈuːm/ — freedict — SAFE
✅ prevail — /prɪvˈeɪl/ — freedict — SAFE
✅ prevent — /prɪvˈɛnt/ — freedict — SAFE
✅ previous — /prˈiːviːəs/ — freedict — SAFE
✅ previously — /prˈiːviːəsliː/ — freedict — SAFE
✅ prey — /prˈeɪ/ — freedict — SAFE
✅ price — /prˈaɪs/ — freedict — SAFE
✅ primary — /prˈaɪmˌɛriː/ — freedict — SAFE
✅ principle — /prˈɪnsəpəl/ — freedict — SAFE
✅ priority — /praɪˈɔːrətiː/ — samantha — 🟢 SAFE
✅ privilege — /prˈɪvlədʒ/ — freedict — SAFE
✅ prize — /prˈaɪz/ — freedict — SAFE
✅ probably — /prˈɑːbəblˌiː/ — freedict — SAFE
✅ proceed — /prəsˈiːd/ — freedict — SAFE
✅ process — /prˈɑːsˌɛs/ — freedict — SAFE
✅ proclaim — /proʊklˈeɪm/ — samantha — 🟢 SAFE
✅ produce — /prədˈuːs/ — freedict — SAFE
✅ product — /prˈɑːdəkt/ — samantha — 🟢 SAFE
✅ profession — /prəfˈɛʃən/ — freedict — SAFE
✅ profit — /prˈɑːfət/ — freedict — SAFE
✅ progress — /prˈɑːɡrˌɛs/ — freedict — SAFE
✅ prohibit — /proʊhˈɪbət/ — freedict — SAFE
⚠️ project — /prˈɑːdʒɛkt/ — samantha — 🔴 DANGER — Heteronym: /ˈprɑː.dʒɛkt/ (noun) or /prəˈdʒɛkt/ (verb)
✅ prolonged — /prəlˈɔːŋd/ — samantha — 🟢 SAFE
✅ promote — /prəmˈoʊt/ — freedict — SAFE
✅ prompt — /prˈɑːmpt/ — freedict — SAFE
✅ promptly — /prˈɑːmptliː/ — freedict — SAFE
✅ proof — /prˈuːf/ — freedict — SAFE
✅ proportion — /prəpˈɔːrʃən/ — freedict — SAFE
✅ propose — /prəpˈoʊz/ — freedict — SAFE
✅ prospect — /prˈɑːspɛkt/ — freedict — SAFE
✅ prosper — /prˈɑːspɜːr/ — freedict — SAFE
✅ protect — /prətˈɛkt/ — freedict — SAFE
✅ protein — /prˈoʊtˌiːn/ — freedict — SAFE
✅ protest — /prˈoʊtˌɛst/ — freedict — SAFE
✅ provision — /prəvˈɪʒən/ — freedict — SAFE
✅ provoke — /prəvˈoʊk/ — freedict — SAFE
✅ publish — /pˈʌblɪʃ/ — freedict — SAFE
✅ pull over — /pˈʊl ˈoʊvɜːr/ — freedict — SAFE
✅ pulse — /pˈʌls/ — freedict — SAFE
✅ purchase — /pˈɜːrtʃəs/ — freedict — SAFE
✅ pure — /pjˈʊr/ — freedict — SAFE
✅ pursue — /pɜːrsˈuː/ — freedict — SAFE
✅ put away — /pˈʊt əwˈeɪ/ — samantha — 🟢 SAFE
✅ put forward — /pˈʊt fˈɔːrwɜːrd/ — freedict — SAFE
✅ put off — /pˈʊt ˈɔːf/ — freedict — SAFE
✅ put together — /pˈʊt təɡˈɛðɜːr/ — samantha — 🟢 SAFE
✅ put up with — /pˈʊt ˈʌp wˈɪð/ — freedict — SAFE
✅ qualify — /kwˈɑːləfˌaɪ/ — freedict — SAFE
✅ quantity — /kwˈɑːntətiː/ — freedict — SAFE
✅ quiet — /kwˈaɪət/ — freedict — SAFE
✅ quite — /kwˈaɪt/ — freedict — SAFE
✅ quiz — /kwˈɪz/ — freedict — SAFE
✅ quote — /kwˈoʊt/ — freedict — SAFE
✅ quotient — /kwˈoʊʃənt/ — freedict — SAFE
✅ raise — /rˈeɪz/ — freedict — SAFE
✅ random — /rˈændəm/ — freedict — SAFE
✅ range — /rˈeɪndʒ/ — freedict — SAFE
✅ rapid — /rˈæpəd/ — freedict — SAFE
✅ rare — /rˈɛr/ — freedict — SAFE
✅ rarely — /rˈɛrliː/ — freedict — SAFE
✅ rather — /rˈæðɜːr/ — freedict — SAFE
✅ ratio — /rˈeɪʃiːˌoʊ/ — freedict — SAFE
✅ raw — /rˈɑː/ — samantha — 🟢 SAFE
✅ reach — /rˈiːtʃ/ — freedict — SAFE
✅ react — /riːˈækt/ — samantha — 🟢 SAFE
✅ realistic — /rˌiːəlˈɪstɪk/ — samantha — 🟢 SAFE
✅ realize — /rˈiːəlˌaɪz/ — freedict — SAFE
✅ realm — /rˈɛlm/ — freedict — SAFE
✅ reasonable — /rˈiːzənəbəl/ — freedict — SAFE
✅ rebel — /rˈɛbəl/ — freedict — SAFE
✅ recall — /rˈiːkˌɔːl/ — samantha — 🟢 SAFE
✅ recently — /rˈiːsəntliː/ — freedict — SAFE
✅ recognize — /rˈɛkəɡnˌaɪz/ — freedict — SAFE
✅ recommend — /rˌɛkəmˈɛnd/ — freedict — SAFE
✅ recover — /rɪkˈʌvɜːr/ — freedict — SAFE
✅ recycle — /riːsˈaɪkəl/ — samantha — 🟢 SAFE
✅ reduce — /rədˈuːs/ — freedict — SAFE
✅ reference — /rˈɛfɜːrəns/ — freedict — SAFE
✅ reflect — /rɪflˈɛkt/ — freedict — SAFE
✅ reform — /rəfˈɔːrm/ — freedict — SAFE
✅ refund — /rɪfˈʌnd/ — freedict — SAFE
✅ refuse — /rəfjˈuːz/ — freedict — SAFE
✅ regard — /rɪɡˈɑːrd/ — freedict — SAFE
✅ regardless — /rəɡˈɑːrdləs/ — samantha — 🟢 SAFE
✅ region — /rˈiːdʒən/ — freedict — SAFE
✅ register — /rˈɛdʒɪstɜːr/ — freedict — SAFE
✅ regret — /rəɡrˈɛt/ — freedict — SAFE
✅ regroup — /riːɡrˈuːp/ — samantha — 🟢 SAFE
✅ regular — /rˈɛɡjəlɜːr/ — freedict — SAFE
✅ regularly — /rˈɛɡjəlɜːrliː/ — freedict — SAFE
✅ reinforce — /rˌiːɪnfˈɔːrs/ — freedict — SAFE
✅ reject — /rɪdʒˈɛkt/ — freedict — SAFE
✅ relate — /rɪlˈeɪt/ — freedict — SAFE
✅ relative — /rˈɛlətɪv/ — samantha — 🟢 SAFE
✅ relax — /rɪlˈæks/ — freedict — SAFE
✅ release — /riːlˈiːs/ — freedict — SAFE
✅ relevant — /rˈɛləvənt/ — samantha — 🟢 SAFE
✅ reliable — /rɪlˈaɪəbəl/ — freedict — SAFE
✅ relief — /rɪlˈiːf/ — freedict — SAFE
✅ reluctant — /rɪlˈʌktənt/ — freedict — SAFE
✅ rely — /rɪlˈaɪ/ — freedict — SAFE
✅ rely on — /rɪlˈaɪ ˈɑːn/ — samantha — 🟢 SAFE
✅ remain — /rɪmˈeɪn/ — freedict — SAFE
✅ remainder — /rɪmˈeɪndɜːr/ — freedict — SAFE
✅ remarkable — /rɪmˈɑːrkəbəl/ — freedict — SAFE
✅ remedy — /rˈɛmədiː/ — freedict — SAFE
✅ remote — /rɪmˈoʊt/ — freedict — SAFE
✅ remove — /riːmˈuːv/ — freedict — SAFE
✅ renew — /rɪnˈuː/ — freedict — SAFE
✅ repeat — /rɪpˈiːt/ — freedict — SAFE
✅ replace — /rˌiːplˈeɪs/ — freedict — SAFE
✅ represent — /rˌɛprɪzˈɛnt/ — freedict — SAFE
✅ reproduce — /rˌiːprədˈuːs/ — freedict — SAFE
✅ reptile — /rˈɛptaɪl/ — freedict — SAFE
✅ republic — /riːpˈʌblək/ — freedict — SAFE
✅ reputation — /rˌɛpjətˈeɪʃən/ — freedict — SAFE
✅ request — /rɪkwˈɛst/ — freedict — SAFE
✅ require — /rˌiːkwˈaɪɜːr/ — freedict — SAFE
✅ rescue — /rˈɛskjuː/ — freedict — SAFE
✅ research — /riːsˈɜːrtʃ/ — freedict — SAFE
✅ resemble — /rɪzˈɛmbəl/ — freedict — SAFE
✅ reserve — /rɪzˈɜːrv/ — freedict — SAFE
✅ reside — /rɪzˈaɪd/ — freedict — SAFE
✅ resist — /rɪzˈɪst/ — freedict — SAFE
✅ resolution — /rˌɛzəlˈuːʃən/ — freedict — SAFE
✅ resolve — /riːzˈɑːlv/ — freedict — SAFE
✅ resource — /rˈiːsɔːrs/ — freedict — SAFE
✅ respect — /rɪspˈɛkt/ — freedict — SAFE
✅ respectful — /rɪspˈɛktfəl/ — freedict — SAFE
✅ respond — /rɪspˈɑːnd/ — samantha — 🟢 SAFE
✅ responsibility — /riːspˌɑːnsəbˈɪlətiː/ — freedict — SAFE
✅ responsible — /riːspˈɑːnsəbəl/ — freedict — SAFE
✅ restore — /rɪstˈɔːr/ — freedict — SAFE
✅ restrict — /riːstrˈɪkt/ — samantha — 🟢 SAFE
✅ result — /rɪzˈʌlt/ — freedict — SAFE
✅ retain — /rɪtˈeɪn/ — freedict — SAFE
✅ retell — /riːtˈɛl/ — samantha — 🟢 SAFE
✅ retire — /rɪtˈaɪr/ — freedict — SAFE
✅ retreat — /riːtrˈiːt/ — freedict — SAFE
✅ return — /rɪtˈɜːrn/ — freedict — SAFE
✅ reveal — /rɪvˈiːl/ — freedict — SAFE
✅ revenue — /rˈɛvənˌuː/ — freedict — SAFE
✅ reverse — /rɪvˈɜːrs/ — freedict — SAFE
✅ revise — /rɪvˈaɪz/ — freedict — SAFE
✅ revolt — /rɪvˈoʊlt/ — freedict — SAFE
✅ revolution — /rˌɛvəlˈuːʃən/ — freedict — SAFE
✅ reward — /rɪwˈɔːrd/ — freedict — SAFE
✅ rhyme — /rˈaɪm/ — freedict — SAFE
✅ ridiculous — /rɪdˈɪkjələs/ — freedict — SAFE
✅ rights — /rˈaɪts/ — freedict — SAFE
✅ rigid — /rˈɪdʒəd/ — freedict — SAFE
✅ rise — /rˈaɪz/ — freedict — SAFE
✅ rival — /rˈaɪvəl/ — freedict — SAFE
✅ river — /rˈɪvɜːr/ — freedict — SAFE
✅ role — /rˈoʊl/ — freedict — SAFE
✅ round — /rˈaʊnd/ — freedict — SAFE
✅ route — /rˈuːt/ — freedict — SAFE
✅ routine — /ruːtˈiːn/ — freedict — SAFE
✅ row — /rˈoʊ/ — freedict — SAFE
✅ rude — /rˈuːd/ — freedict — SAFE
✅ ruin — /rˈuːən/ — freedict — SAFE
✅ rule — /rˈuːl/ — freedict — SAFE
✅ rule out — /rˈuːl ˈaʊt/ — freedict — SAFE
✅ run into — /rˈʌn ˈɪntuː/ — samantha — 🟢 SAFE
✅ rusty — /rˈʌstiː/ — samantha — 🟢 SAFE
✅ sacred — /sˈeɪkrəd/ — freedict — SAFE
✅ sacrifice — /sˈækrəfˌaɪs/ — freedict — SAFE
✅ safe — /sˈeɪf/ — freedict — SAFE
✅ sail — /sˈeɪl/ — freedict — SAFE
✅ sapling — /sˈæplɪŋ/ — samantha — 🟢 SAFE
✅ satisfactory — /sˌætəsfˈæktriː/ — freedict — SAFE
✅ save — /sˈeɪv/ — freedict — SAFE
✅ scarce — /skˈɛrs/ — freedict — SAFE
✅ scarcely — /skˈɛrsliː/ — freedict — SAFE
✅ scared — /skˈɛrd/ — freedict — SAFE
✅ scatter — /skˈætɜːr/ — freedict — SAFE
✅ scene — /sˈiːn/ — freedict — SAFE
✅ schedule — /skˈɛdʒʊl/ — freedict — SAFE
✅ scheme — /skˈiːm/ — freedict — SAFE
✅ scholar — /skˈɑːlɜːr/ — freedict — SAFE
✅ scope — /skˈoʊp/ — freedict — SAFE
✅ score — /skˈɔːr/ — freedict — SAFE
✅ scour — /skˈaʊɜːr/ — freedict — SAFE
✅ season — /sˈiːzən/ — freedict — SAFE
✅ secure — /sɪkjˈʊr/ — freedict — SAFE
✅ segment — /sˈɛɡmənt/ — samantha — 🟢 SAFE
✅ seize — /sˈiːz/ — freedict — SAFE
✅ seldom — /sˈɛldəm/ — freedict — SAFE
✅ select — /səlˈɛkt/ — freedict — SAFE
✅ selfish — /sˈɛlfɪʃ/ — freedict — SAFE
✅ sensation — /sɛnsˈeɪʃən/ — freedict — SAFE
✅ sensitive — /sˈɛnsətɪv/ — freedict — SAFE
✅ sentence — /sˈɛntəns/ — freedict — SAFE
✅ separate — /sˈɛpɜːrˌeɪt/ — freedict — SAFE
✅ sequence — /sˈiːkwəns/ — freedict — SAFE
✅ series — /sˈɪriːz/ — freedict — SAFE
✅ serious — /sˈɪriːəs/ — freedict — SAFE
✅ set up — /sˈɛt ˈʌp/ — samantha — 🟢 SAFE
✅ setting — /sˈɛtɪŋ/ — freedict — SAFE
✅ settler — /sˈɛtəlɜːr/ — freedict — SAFE
✅ severe — /səvˈɪr/ — freedict — SAFE
✅ shade — /ʃˈeɪd/ — freedict — SAFE
✅ shape — /ʃˈeɪp/ — freedict — SAFE
✅ shelter — /ʃˈɛltɜːr/ — freedict — SAFE
✅ shift — /ʃˈɪft/ — freedict — SAFE
✅ shore — /ʃˈɔːr/ — freedict — SAFE
✅ shortly — /ʃˈɔːrtliː/ — freedict — SAFE
✅ show up — /ʃˈoʊ ˈʌp/ — freedict — SAFE
✅ shut down — /ʃˈʌt dˈaʊn/ — samantha — 🟢 SAFE
✅ sign up — /sˈaɪn ˈʌp/ — samantha — 🟢 SAFE
✅ signal — /sˈɪɡnəl/ — freedict — SAFE
✅ significant — /səɡnˈɪfɪkənt/ — freedict — SAFE
✅ silt — /sˈɪlt/ — freedict — SAFE
✅ similar — /sˈɪməlɜːr/ — freedict — SAFE
✅ similarly — /sˈɪməlɜːrliː/ — freedict — SAFE
✅ simple — /sˈɪmpəl/ — freedict — SAFE
✅ simplify — /sˈɪmpləfˌaɪ/ — samantha — 🟢 SAFE
✅ simply — /sˈɪmpliː/ — freedict — SAFE
✅ simulate — /sˈɪmjələt/ — samantha — 🟢 SAFE
⚠️ simultaneously — /sˌaɪməltˈeɪniːəsliː/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ site — /sˈaɪt/ — freedict — SAFE
✅ skeleton — /skˈɛlətən/ — freedict — SAFE
✅ sketch — /skˈɛtʃ/ — freedict — SAFE
✅ slavery — /slˈeɪvɜːriː/ — freedict — SAFE
✅ slender — /slˈɛndɜːr/ — freedict — SAFE
✅ slight — /slˈaɪt/ — freedict — SAFE
✅ slippery — /slˈɪpɜːriː/ — freedict — SAFE
✅ slow down — /slˈoʊ dˈaʊn/ — samantha — 🟢 SAFE
✅ smell — /smˈɛl/ — freedict — SAFE
✅ snap — /snˈæp/ — freedict — SAFE
✅ soak — /sˈoʊk/ — freedict — SAFE
✅ soft — /sˈɑːft/ — freedict — SAFE
✅ soil — /sˈɔɪl/ — freedict — SAFE
✅ sole — /sˈoʊl/ — freedict — SAFE
✅ soluble — /sˈɑːljəbəl/ — samantha — 🟢 SAFE
✅ solution — /səlˈuːʃən/ — freedict — SAFE
✅ solve — /sˈɑːlv/ — freedict — SAFE
✅ sometimes — /səmtˈaɪmz/ — freedict — SAFE
✅ sort out — /sˈɔːrt ˈaʊt/ — freedict — SAFE
✅ source — /sˈɔːrs/ — freedict — SAFE
✅ speak up — /spˈiːk ˈʌp/ — freedict — SAFE
✅ special — /spˈɛʃəl/ — freedict — SAFE
✅ species — /spˈiːʃiːz/ — freedict — SAFE
✅ specific — /spəsˈɪfɪk/ — freedict — SAFE
✅ specifically — /spəsˈɪfɪkliː/ — freedict — SAFE
✅ spite — /spˈaɪt/ — freedict — SAFE
✅ spore — /spˈɔːr/ — samantha — 🟢 SAFE
✅ spotless — /spˈɑːtləs/ — samantha — 🟢 SAFE
✅ stand out — /stˈænd ˈaʊt/ — samantha — 🟢 SAFE
✅ standard — /stˈændɜːrd/ — freedict — SAFE
✅ stanza — /stˈænzə/ — samantha — 🟢 SAFE
✅ state — /stˈeɪt/ — freedict — SAFE
✅ status — /stˈætəs/ — freedict — SAFE
✅ stay up — /stˈeɪ ˈʌp/ — samantha — 🟢 SAFE
✅ steadily — /stˈɛdəliː/ — freedict — SAFE
✅ steady — /stˈɛdiː/ — freedict — SAFE
✅ still — /stˈɪl/ — freedict — SAFE
✅ stock — /stˈɑːk/ — freedict — SAFE
✅ stomach — /stˈʌmək/ — freedict — SAFE
✅ store — /stˈɔːr/ — freedict — SAFE
✅ strategy — /strˈætədʒiː/ — samantha — 🟢 SAFE
✅ stress — /strˈɛs/ — freedict — SAFE
✅ strict — /strˈɪkt/ — freedict — SAFE
✅ strong — /strˈɔːŋ/ — freedict — SAFE
✅ structure — /strˈʌktʃɜːr/ — freedict — SAFE
✅ struggle — /strˈʌɡəl/ — freedict — SAFE
✅ stuck — /stˈʌk/ — freedict — SAFE
✅ sturdy — /stˈɜːrdiː/ — freedict — SAFE
✅ submerge — /səbmˈɜːrdʒ/ — samantha — 🟢 SAFE
✅ submit — /səbmˈɪt/ — freedict — SAFE
✅ substitute — /sˈʌbstətˌuːt/ — freedict — SAFE
✅ subtract — /səbtrˈækt/ — freedict — SAFE
✅ succeed — /səksˈiːd/ — freedict — SAFE
✅ such as — /sˈʌtʃ ˈæz/ — samantha — 🟢 SAFE
✅ sufficient — /səfˈɪʃənt/ — freedict — SAFE
✅ suffix — /sˈʌfɪks/ — freedict — SAFE
✅ suggest — /sədʒˈɛst/ — freedict — SAFE
✅ suitable — /sˈuːtəbəl/ — freedict — SAFE
✅ sum — /sˈʌm/ — freedict — SAFE
✅ summary — /sˈʌmɜːriː/ — freedict — SAFE
✅ summit — /sˈʌmət/ — freedict — SAFE
✅ superior — /suːpˈɪriːɜːr/ — freedict — SAFE
⚠️ supplement — /sˈʌpləmənt/ — samantha — 🔴 DANGER — Heteronym: /ˈsʌp.lɪ.mənt/ (noun) or /ˈsʌp.lɪ.mɛnt/ (verb)
✅ supply — /səplˈaɪ/ — freedict — SAFE
✅ support — /səpˈɔːrt/ — freedict — SAFE
✅ suppose — /səpˈoʊz/ — freedict — SAFE
✅ surface — /sˈɜːrfəs/ — freedict — SAFE
✅ surround — /sɜːrˈaʊnd/ — freedict — SAFE
⚠️ survey — /sɜːrvˈeɪ/ — samantha — 🔴 DANGER — Heteronym: /ˈsɜːr.veɪ/ (noun) or /sɚˈveɪ/ (verb)
✅ survive — /sɜːrvˈaɪv/ — freedict — SAFE
✅ suspect — /səspˈɛkt/ — freedict — SAFE
✅ suspend — /səspˈɛnd/ — freedict — SAFE
✅ sustain — /səstˈeɪn/ — freedict — SAFE
✅ swallow — /swˈɑːloʊ/ — freedict — SAFE
✅ sweep — /swˈiːp/ — freedict — SAFE
✅ sweet — /swˈiːt/ — freedict — SAFE
✅ swift — /swˈɪft/ — freedict — SAFE
✅ swiftly — /swˈɪftliː/ — freedict — SAFE
✅ syllable — /sˈɪləbəl/ — freedict — SAFE
✅ symbol — /sˈɪmbəl/ — freedict — SAFE
✅ sympathy — /sˈɪmpəθiː/ — freedict — SAFE
✅ symptom — /sˈɪmptəm/ — samantha — 🟢 SAFE
✅ synonym — /sˈɪnənˌɪm/ — freedict — SAFE
✅ table — /tˈeɪbəl/ — freedict — SAFE
✅ tactic — /tˈæktɪk/ — freedict — SAFE
✅ take apart — /tˈeɪk əpˈɑːrt/ — samantha — 🟢 SAFE
✅ take away — /tˈeɪk əwˈeɪ/ — samantha — 🟢 SAFE
✅ take into account — /tˈeɪk ˈɪntuː əkˈaʊnt/ — samantha — 🟢 SAFE
✅ take off — /tˈeɪk ˈɔːf/ — freedict — SAFE
✅ take over — /tˈeɪk ˈoʊvɜːr/ — samantha — 🟢 SAFE
✅ talent — /tˈælənt/ — freedict — SAFE
✅ tally — /tˈæliː/ — freedict — SAFE
✅ target — /tˈɑːrɡət/ — freedict — SAFE
✅ task — /tˈæsk/ — freedict — SAFE
✅ taste — /tˈeɪst/ — freedict — SAFE
✅ tax — /tˈæks/ — freedict — SAFE
✅ team — /tˈiːm/ — freedict — SAFE
✅ tease — /tˈiːz/ — freedict — SAFE
✅ technique — /tɛknˈiːk/ — samantha — 🟢 SAFE
✅ temperature — /tˈɛmprətʃɜːr/ — freedict — SAFE
✅ temporarily — /tˌɛmpɜːrˈɛrəliː/ — samantha — 🟢 SAFE
✅ temporary — /tˈɛmpɜːrˌɛriː/ — freedict — SAFE
✅ tend — /tˈɛnd/ — freedict — SAFE
✅ tense — /tˈɛns/ — freedict — SAFE
✅ territory — /tˈɛrɪtˌɔːriː/ — samantha — 🟢 SAFE
✅ theme — /θˈiːm/ — freedict — SAFE
✅ theory — /θˈɪriː/ — freedict — SAFE
✅ therefore — /ðˈɛrfˌɔːr/ — freedict — SAFE
✅ think over — /θˈɪŋk ˈoʊvɜːr/ — freedict — SAFE
✅ thorough — /θˈɜːroʊ/ — freedict — SAFE
✅ thoughtful — /θˈɔːtfəl/ — freedict — SAFE
✅ threaten — /θrˈɛtən/ — freedict — SAFE
✅ thrive — /θrˈaɪv/ — freedict — SAFE
✅ tightly — /tˈaɪtliː/ — samantha — 🟢 SAFE
✅ tissue — /tˈɪsjˌuː/ — freedict — SAFE
✅ tolerate — /tˈɑːlɜːrˌeɪt/ — freedict — SAFE
✅ tone — /tˈoʊn/ — freedict — SAFE
✅ topic — /tˈɑːpɪk/ — freedict — SAFE
✅ topsoil — /tˈɑːpsˌɔɪl/ — samantha — 🟢 SAFE
✅ track — /trˈæk/ — freedict — SAFE
✅ tradition — /trədˈɪʃən/ — freedict — SAFE
✅ trait — /trˈeɪt/ — freedict — SAFE
✅ transfer — /trænsfˈɜːr/ — freedict — SAFE
✅ transform — /trænsfˈɔːrm/ — freedict — SAFE
✅ transparent — /trænspˈɛrənt/ — freedict — SAFE
⚠️ transport — /trænspˈɔːrt/ — samantha — 🔴 DANGER — Heteronym: /ˈtræns.pɔːrt/ (noun) or /trænsˈpɔːrt/ (verb)
✅ travel — /trˈævəl/ — freedict — SAFE
✅ tremendous — /trəmˈɛndəs/ — freedict — SAFE
✅ trend — /trˈɛnd/ — freedict — SAFE
✅ trial — /trˈaɪəl/ — freedict — SAFE
✅ trick — /trˈɪk/ — freedict — SAFE
✅ triple — /trˈɪpəl/ — freedict — SAFE
✅ triumph — /trˈaɪəmf/ — freedict — SAFE
✅ tropical — /trˈɑːpɪkəl/ — samantha — 🟢 SAFE
✅ trust — /trˈʌst/ — freedict — SAFE
✅ trustworthy — /trˈʌstwˌɜːrðiː/ — freedict — SAFE
✅ turn — /tˈɜːrn/ — freedict — SAFE
✅ turn down — /tˈɜːrn dˈaʊn/ — freedict — SAFE
✅ turn into — /tˈɜːrn ˈɪntuː/ — freedict — SAFE
✅ typically — /tˈɪpɪkliː/ — freedict — SAFE
✅ under — /ˈʌndɜːr/ — freedict — SAFE
✅ undergo — /ˌʌndɜːrɡˈoʊ/ — samantha — 🟢 SAFE
✅ unearth — /ənˈɜːrθ/ — samantha — 🟢 SAFE
✅ unique — /juːnˈiːk/ — freedict — SAFE
✅ unite — /jˈuːnˌaɪt/ — freedict — SAFE
✅ universe — /jˈuːnəvˌɜːrs/ — freedict — SAFE
✅ unless — /ənlˈɛs/ — freedict — SAFE
✅ upstairs — /əpstˈɛrz/ — freedict — SAFE
✅ urge — /ˈɜːrdʒ/ — freedict — SAFE
✅ use up — /jˈuːs ˈʌp/ — samantha — 🟢 SAFE
✅ usual — /jˈuːʒəwəl/ — freedict — SAFE
✅ usually — /jˈuːʒəwəliː/ — freedict — SAFE
✅ utilize — /jˈuːtəlˌaɪz/ — samantha — 🟢 SAFE
✅ vacant — /vˈeɪkənt/ — freedict — SAFE
✅ vaccine — /vˌæksˈiːn/ — freedict — SAFE
✅ valid — /vˈælɪd/ — freedict — SAFE
✅ value — /vˈæljuː/ — freedict — SAFE
✅ vapor — /vˈeɪpɜːr/ — freedict — SAFE
✅ vast — /vˈæst/ — freedict — SAFE
✅ vehicle — /vˈiːhɪkəl/ — freedict — SAFE
✅ vein — /vˈeɪn/ — freedict — SAFE
✅ venture — /vˈɛntʃɜːr/ — freedict — SAFE
✅ verdant — /vˈɜːrdənt/ — freedict — SAFE
✅ verse — /vˈɜːrs/ — freedict — SAFE
✅ version — /vˈɜːrʒən/ — freedict — SAFE
✅ vibrant — /vˈaɪbrənt/ — samantha — 🟢 SAFE
✅ violate — /vˈaɪəleɪt/ — freedict — SAFE
✅ virtual — /vˈɜːrtʃuːəl/ — freedict — SAFE
✅ virus — /vˈaɪrəs/ — freedict — SAFE
✅ visible — /vˈɪzəbəl/ — freedict — SAFE
✅ vision — /vˈɪʒən/ — freedict — SAFE
✅ visit — /vˈɪzɪt/ — freedict — SAFE
✅ vital — /vˈaɪtəl/ — freedict — SAFE
✅ vitamin — /vˈaɪtəmən/ — freedict — SAFE
✅ vivid — /vˈɪvəd/ — freedict — SAFE
✅ vocabulary — /voʊkˈæbjəlˌɛriː/ — freedict — SAFE
✅ voice — /vˈɔɪs/ — freedict — SAFE
✅ volcanic — /vɑːlkˈænɪk/ — samantha — 🟢 SAFE
✅ volume — /vˈɑːljuːm/ — freedict — SAFE
✅ voluntary — /vˈɑːləntɛriː/ — freedict — SAFE
✅ volunteer — /vˌɑːləntˈɪr/ — freedict — SAFE
✅ vote — /vˈoʊt/ — freedict — SAFE
✅ vowel — /vˈaʊəl/ — freedict — SAFE
✅ voyage — /vˈɔɪədʒ/ — freedict — SAFE
✅ vulnerable — /vˈʌlnɜːrəbəl/ — samantha — 🟢 SAFE
✅ wait — /wˈeɪt/ — freedict — SAFE
✅ wander — /wˈɑːndɜːr/ — freedict — SAFE
✅ warmth — /wˈɔːrmθ/ — freedict — SAFE
✅ warn — /wˈɔːrn/ — samantha — 🟢 SAFE
✅ warrant — /wˈɔːrənt/ — freedict — SAFE
✅ watch out — /wˈɑːtʃ ˈaʊt/ — samantha — 🟢 SAFE
✅ water cycle — /wˈɔːtɜːr sˈaɪkəl/ — samantha — 🟢 SAFE
✅ waterfall — /wˈɔːtɜːrfˌɔːl/ — freedict — SAFE
✅ watershed — /wˈɔːtɜːrʃˌɛd/ — freedict — SAFE
✅ weak — /wˈiːk/ — freedict — SAFE
✅ wealthy — /wˈɛlθiː/ — samantha — 🟢 SAFE
✅ wear out — /wˈɛr ˈaʊt/ — samantha — 🟢 SAFE
✅ weather — /wˈɛðɜːr/ — freedict — SAFE
✅ welfare — /wˈɛlfˌɛr/ — samantha — 🟢 SAFE
✅ wheel — /wˈiːl/ — freedict — SAFE
✅ wicked — /wˈɪkəd/ — freedict — SAFE
✅ widespread — /wˈaɪdsprˈɛd/ — samantha — 🟢 SAFE
✅ width — /wˈɪdθ/ — freedict — SAFE
✅ willingly — /wˈɪlɪŋliː/ — freedict — SAFE
✅ wind up — /wˈaɪnd ˈʌp/ — freedict — SAFE
✅ withdraw — /wɪðdrˈɔː/ — freedict — SAFE
✅ witness — /wˈɪtnəs/ — freedict — SAFE
✅ work out — /wˈɜːrk ˈaʊt/ — samantha — 🟢 SAFE
✅ worthless — /wˈɜːrθləs/ — freedict — SAFE
✅ worthy — /wˈɜːrðiː/ — freedict — SAFE
✅ wrap up — /rˈæp ˈʌp/ — freedict — SAFE
✅ yearly — /jˈɪrliː/ — freedict — SAFE
✅ yesterday — /jˈɛstɜːrdˌeɪ/ — freedict — SAFE
✅ yield — /jˈiːld/ — freedict — SAFE
✅ zone — /zˈoʊn/ — freedict — SAFE

### Level 3 (741 words)

✅ a blessing in disguise — /ə blˈɛsɪŋ ɪn dɪsɡˈaɪz/ — samantha — 🟢 SAFE
✅ a penny for your thoughts — /ə pˈɛniː fˈɔːr jˈɔːr θˈɔːts/ — samantha — 🟢 SAFE
⚠️ a taste of your own medicine — /ə tˈeɪst ˈʌv jˈɔːr ˈoʊn mˈɛdəsən/ — samantha — 🟡 WARN — Long phrase — potential prosody issues
✅ abode — /əbˈoʊd/ — freedict — SAFE
✅ above all — /əbˈʌv ˈɔːl/ — samantha — 🟢 SAFE
✅ acacia — /əkˈeɪʃə/ — freedict — SAFE
✅ acquire — /əkwˈaɪɜːr/ — freedict — SAFE
✅ actions speak louder than words — /ˈækʃənz spˈiːk lˈaʊdɜːr ðˈæn wˈɜːrdz/ — samantha — 🟢 SAFE
✅ adage — /ˈædədʒ/ — samantha — 🟢 SAFE
✅ adaptation — /ˌædəptˈeɪʃən/ — samantha — 🟢 SAFE
✅ adrift — /ədrˈɪft/ — freedict — SAFE
✅ advance — /ədvˈæns/ — freedict — SAFE
✅ afflict — /əflˈɪkt/ — freedict — SAFE
✅ affordable — /əfˈɔːrdəbəl/ — samantha — 🟢 SAFE
✅ agriculture — /ˈæɡrɪkˌʌltʃɜːr/ — freedict — SAFE
✅ ajar — /ədʒˈɑːr/ — freedict — SAFE
✅ akin — /əkˈɪn/ — samantha — 🟢 SAFE
✅ alcove — /ˈælkˌoʊv/ — samantha — 🟢 SAFE
✅ alms — /ˈɑːlmz/ — freedict — SAFE
✅ alpine — /ˈælpˌaɪn/ — samantha — 🟢 SAFE
✅ amble — /ˈæmbəl/ — freedict — SAFE
✅ ambrosia — /æmbrˈoʊʒə/ — samantha — 🟢 SAFE
✅ amiable — /ˈeɪmiːəbəl/ — freedict — SAFE
✅ amplify — /ˈæmpləfˌaɪ/ — freedict — SAFE
✅ amulet — /ˈæmjələt/ — samantha — 🟢 SAFE
✅ anagram — /ˈænəɡrˌæm/ — freedict — SAFE
✅ analyze — /ˈænəlˌaɪz/ — freedict — SAFE
✅ ancestry — /ˈænsɛstriː/ — samantha — 🟢 SAFE
✅ angular — /ˈæŋɡjəlɜːr/ — freedict — SAFE
✅ antiquated — /ˈæntəkwˌeɪtɪd/ — samantha — 🟢 SAFE
✅ apex — /ˈeɪpˌɛks/ — samantha — 🟢 SAFE
✅ apparent — /əpˈɛrənt/ — freedict — SAFE
✅ apply — /əplˈaɪ/ — freedict — SAFE
✅ apprentice — /əprˈɛntəs/ — samantha — 🟢 SAFE
✅ aquifer — /ˈækwəfɜːr/ — samantha — 🟢 SAFE
✅ arbiter — /ˈɑːrbɪtɜːr/ — freedict — SAFE
✅ archaeology — /ˌɑːrkiːˈɑːlədʒiː/ — freedict — SAFE
✅ archipelago — /ˌɑːrkəpˈɛləɡˌoʊ/ — freedict — SAFE
✅ ardor — /ˈɑːrdɜːr/ — freedict — SAFE
✅ arid — /ˈærəd/ — freedict — SAFE
✅ aright — /—/ — samantha — 🟢 SAFE
✅ array — /ɜːrˈeɪ/ — freedict — SAFE
✅ artifact — /ˈɑːrtəfˌækt/ — samantha — 🟢 SAFE
✅ artificial — /ˌɑːrtəfˈɪʃəl/ — freedict — SAFE
✅ as soon as — /ˈæz sˈuːn ˈæz/ — samantha — 🟢 SAFE
✅ assail — /əsˈeɪl/ — samantha — 🟢 SAFE
✅ associative — /əsˈoʊʃətˌɪv/ — freedict — SAFE
✅ asteroid — /ˈæstɜːrˌɔɪd/ — freedict — SAFE
✅ atmosphere — /ˈætməsfˌɪr/ — freedict — SAFE
✅ atoll — /ˈætˌɑːl/ — samantha — 🟢 SAFE
✅ atone — /ətˈoʊn/ — freedict — SAFE
✅ atrium — /ˈeɪtriːəm/ — samantha — 🟢 SAFE
✅ aura — /ˈɔːrə/ — freedict — SAFE
✅ authentic — /əθˈɛntɪk/ — samantha — 🟢 SAFE
✅ automatic — /ˌɔːtəmˈætɪk/ — freedict — SAFE
✅ awning — /ˈɑːnɪŋ/ — samantha — 🟢 SAFE
✅ axis — /ˈæksəs/ — freedict — SAFE
✅ babble — /bˈæbəl/ — freedict — SAFE
✅ back to square one — /bˈæk tˈuː skwˈɛr wˈʌn/ — freedict — SAFE
✅ badger — /bˈædʒɜːr/ — freedict — SAFE
✅ baffle — /bˈæfəl/ — freedict — SAFE
✅ bamboo — /bæmbˈuː/ — freedict — SAFE
✅ bane — /bˈeɪn/ — freedict — SAFE
✅ banter — /bˈæntɜːr/ — freedict — SAFE
✅ barbecue — /bˈɑːrbɪkjˌuː/ — freedict — SAFE
✅ barge — /bˈɑːrdʒ/ — samantha — 🟢 SAFE
✅ barking up the wrong tree — /bˈɑːrkɪŋ ˈʌp ðə rˈɔːŋ trˈiː/ — samantha — 🟢 SAFE
✅ barley — /bˈɑːrliː/ — freedict — SAFE
✅ barnacle — /bˈɑːrnəkəl/ — freedict — SAFE
✅ baroque — /bɜːrˈoʊk/ — samantha — 🟢 SAFE
✅ barracks — /bˈærəks/ — freedict — SAFE
✅ barter — /bˈɑːrtɜːr/ — samantha — 🟢 SAFE
✅ basement — /bˈeɪsmənt/ — freedict — SAFE
✅ bastion — /bˈæstʃən/ — freedict — SAFE
✅ batter — /bˈætɜːr/ — freedict — SAFE
✅ bedlam — /bˈɛdləm/ — samantha — 🟢 SAFE
✅ belfry — /bˈɛlfriː/ — samantha — 🟢 SAFE
✅ berth — /bˈɜːrθ/ — freedict — SAFE
✅ better late than never — /bˈɛtɜːr lˈeɪt ðˈæn nˈɛvɜːr/ — samantha — 🟢 SAFE
✅ billow — /bˈɪloʊ/ — freedict — SAFE
✅ bistro — /bˈɪstroʊ/ — freedict — SAFE
⚠️ bite off more than you can chew — /bˈaɪt ˈɔːf mˈɔːr ðˈæn jˈuː kˈæn tʃˈuː/ — samantha — 🟡 WARN — Long phrase — potential prosody issues
✅ bivouac — /bˈɪvwæk/ — freedict — SAFE
✅ blade — /blˈeɪd/ — freedict — SAFE
✅ blazon — /—/ — samantha — 🟢 SAFE
✅ blotch — /blˈɑːttʃ/ — samantha — 🟢 SAFE
✅ boggle — /bˈɑːɡəl/ — freedict — SAFE
✅ boon — /bˈuːn/ — samantha — 🟢 SAFE
✅ boulder — /bˈoʊldɜːr/ — freedict — SAFE
✅ brawn — /brˈɔːn/ — freedict — SAFE
✅ breadth — /brˈɛdθ/ — freedict — SAFE
✅ break the ice — /brˈeɪk ðə ˈaɪs/ — freedict — SAFE
✅ brim — /brˈɪm/ — freedict — SAFE
✅ broach — /brˈoʊtʃ/ — freedict — SAFE
✅ brooch — /brˈuːtʃ/ — samantha — 🟢 SAFE
✅ buccaneer — /bˌʌkənˈiːr/ — samantha — 🟢 SAFE
✅ buffet — /bˈʌfət/ — freedict — SAFE
✅ buggy — /bˈʌɡiː/ — samantha — 🟢 SAFE
✅ bulge — /bˈʌldʒ/ — freedict — SAFE
✅ buoyancy — /bˈɔɪənsiː/ — freedict — SAFE
✅ burden — /bˈɜːrdən/ — freedict — SAFE
✅ burgeon — /bˈɜːrdʒən/ — freedict — SAFE
✅ burn the midnight oil — /bˈɜːrn ðə mˈɪdnˌaɪt ˈɔɪl/ — freedict — SAFE
✅ bustle — /bˈʌsəl/ — samantha — 🟢 SAFE
✅ butterflies in my stomach — /bˈʌtɜːrflˌaɪz ɪn mˈaɪ stˈʌmək/ — samantha — 🟢 SAFE
✅ buttress — /bˈʌtrəs/ — freedict — SAFE
✅ cache — /kˈæʃ/ — freedict — SAFE
✅ cairn — /kˈɛrn/ — freedict — SAFE
✅ calculate — /kˈælkjəlˌeɪt/ — freedict — SAFE
✅ camouflage — /kˈæməflˌɑːʒ/ — samantha — 🟢 SAFE
✅ cancel — /kˈænsəl/ — freedict — SAFE
✅ canter — /kˈæntɜːr/ — samantha — 🟢 SAFE
✅ canyon — /kˈænjən/ — samantha — 🟢 SAFE
✅ capital — /kˈæpətəl/ — freedict — SAFE
✅ capsize — /kˈæpsˌaɪz/ — freedict — SAFE
✅ capsule — /kˈæpsəl/ — samantha — 🟢 SAFE
✅ carafe — /kərˈæf/ — samantha — 🟢 SAFE
✅ carbon dioxide — /kˈɑːrbən daɪˈɑːksˌaɪd/ — samantha — 🟢 SAFE
✅ careless — /kˈɛrləs/ — freedict — SAFE
✅ carnivore — /kˈɑːrnɪvˌɔːr/ — samantha — 🟢 SAFE
✅ carry on — /kˈæriː ˈɑːn/ — freedict — SAFE
✅ casual — /kˈæʒəwəl/ — freedict — SAFE
✅ cauldron — /kˈɑːldrən/ — freedict — SAFE
✅ cell — /sˈɛl/ — freedict — SAFE
✅ census — /sˈɛnsəs/ — freedict — SAFE
✅ centimeter — /sˈɛntəmˌiːtɜːr/ — samantha — 🟢 SAFE
✅ central — /sˈɛntrəl/ — freedict — SAFE
✅ chaplain — /tʃˈæplən/ — freedict — SAFE
✅ char — /tʃˈɑːr/ — freedict — SAFE
✅ cherub — /tʃˈɛrəb/ — freedict — SAFE
✅ chimney — /tʃˈɪmniː/ — freedict — SAFE
✅ chlorophyll — /klˈɔːrəfɪl/ — samantha — 🟢 SAFE
✅ chrysalis — /krˈɪsəlɪs/ — samantha — 🟢 SAFE
✅ chunk — /tʃˈʌŋk/ — freedict — SAFE
✅ cinch — /sˈɪntʃ/ — freedict — SAFE
✅ circuit — /sˈɜːrkət/ — freedict — SAFE
✅ citadel — /sˈɪtədˌɛl/ — freedict — SAFE
✅ civilization — /sˌɪvəlɪzˈeɪʃən/ — samantha — 🟢 SAFE
✅ clad — /klˈæd/ — freedict — SAFE
✅ classify — /klˈæsəfˌaɪ/ — samantha — 🟢 SAFE
✅ clatter — /klˈætɜːr/ — freedict — SAFE
⚠️ claustrophobia — /klˌɔːstrəfˈoʊbiːə/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ cleave — /klˈiːv/ — freedict — SAFE
✅ cleft — /klˈɛft/ — samantha — 🟢 SAFE
✅ clench — /klˈɛntʃ/ — samantha — 🟢 SAFE
✅ cobalt — /kˈoʊbˌɔːlt/ — freedict — SAFE
✅ coil — /kˈɔɪl/ — freedict — SAFE
✅ colander — /kˈɑːləndɜːr/ — freedict — SAFE
✅ collide — /kəlˈaɪd/ — freedict — SAFE
✅ colonnade — /kˌɑːlənˈeɪd/ — samantha — 🟢 SAFE
✅ come up with — /kˈʌm ˈʌp wˈɪð/ — freedict — SAFE
✅ commode — /kəmˈoʊd/ — samantha — 🟢 SAFE
✅ commutative — /—/ — samantha — 🟢 SAFE
✅ composite — /kəmpˈɑːzət/ — freedict — SAFE
✅ compulsion — /kəmpˈʌlʃən/ — samantha — 🟢 SAFE
✅ condensation — /kˌɑːndənsˈeɪʃən/ — samantha — 🟢 SAFE
✅ condiment — /kˈɑːndəmənt/ — samantha — 🟢 SAFE
✅ conductor — /kəndˈʌktɜːr/ — freedict — SAFE
✅ conduit — /kˈɑːnduːɪt/ — samantha — 🟢 SAFE
✅ confide — /kənfˈaɪd/ — samantha — 🟢 SAFE
✅ congruent — /kˈɔːnɡruːˌɛnt/ — samantha — 🟢 SAFE
✅ conifer — /kˈɑːnəfɜːr/ — samantha — 🟢 SAFE
✅ conservation — /kˌɑːnsɜːrvˈeɪʃən/ — samantha — 🟢 SAFE
✅ consort — /kənsˈɔːrt/ — samantha — 🟢 SAFE
⚠️ constellation — /kˌɑːnstəlˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ contour — /kˈɑːntˌʊr/ — freedict — SAFE
✅ convoy — /kˈɑːnvˌɔɪ/ — freedict — SAFE
✅ cornet — /kɔːrnˈɛt/ — freedict — SAFE
✅ corona — /kɜːrˈoʊnə/ — freedict — SAFE
✅ correct — /kɜːrˈɛkt/ — freedict — SAFE
✅ corsair — /kˈɔːrsɛr/ — freedict — SAFE
✅ cosmos — /kˈɑːzmoʊs/ — freedict — SAFE
⚠️ cost an arm and a leg — /kˈɑːst ˈæn ˈɑːrm ənd ə lˈɛɡ/ — samantha — 🟡 WARN — Long phrase — potential prosody issues
✅ countenance — /kˈaʊntənəns/ — freedict — SAFE
✅ cranny — /krˈæniː/ — freedict — SAFE
✅ crater — /krˈeɪtɜːr/ — samantha — 🟢 SAFE
✅ creek — /krˈiːk/ — freedict — SAFE
✅ cringe — /krˈɪndʒ/ — freedict — SAFE
✅ crisp — /krˈɪsp/ — freedict — SAFE
✅ crock — /krˈɑːk/ — freedict — SAFE
✅ crone — /krˈoʊn/ — freedict — SAFE
✅ crouton — /krˈuːtən/ — freedict — SAFE
✅ crustacean — /krəstˈeɪʃən/ — freedict — SAFE
✅ crux — /krˈʌks/ — freedict — SAFE
✅ crypt — /krˈɪpt/ — samantha — 🟢 SAFE
✅ cuisine — /kwɪzˈiːn/ — samantha — 🟢 SAFE
✅ cupboard — /kˈʌbɜːrd/ — freedict — SAFE
✅ curfew — /kˈɜːrfjuː/ — freedict — SAFE
✅ cursory — /kˈɜːrsɜːriː/ — samantha — 🟢 SAFE
✅ curtsy — /kˈɜːrtsiː/ — samantha — 🟢 SAFE
✅ cyclone — /sɪklˈoʊn/ — freedict — SAFE
✅ dale — /dˈeɪl/ — freedict — SAFE
✅ damage — /dˈæmədʒ/ — freedict — SAFE
✅ dapper — /dˈæpɜːr/ — samantha — 🟢 SAFE
✅ dapple — /—/ — samantha — 🟢 SAFE
✅ daze — /dˈeɪz/ — samantha — 🟢 SAFE
✅ decanter — /—/ — samantha — 🟢 SAFE
✅ decibel — /dˈɛsəbˌɛl/ — samantha — 🟢 SAFE
✅ deciduous — /dˌɪsˈɪdʒuːəs/ — freedict — SAFE
✅ decompose — /dˌiːkəmpˈoʊz/ — samantha — 🟢 SAFE
✅ decrease — /dɪkrˈiːs/ — freedict — SAFE
✅ define — /dɪfˈaɪn/ — freedict — SAFE
✅ deft — /dˈɛft/ — freedict — SAFE
✅ dehydrate — /dɪhˈaɪdreɪt/ — samantha — 🟢 SAFE
✅ denominator — /dɪnˈɑːmənˌeɪtɜːr/ — samantha — 🟢 SAFE
✅ denture — /dˈɛntʃɜːr/ — samantha — 🟢 SAFE
✅ device — /dɪvˈaɪs/ — freedict — SAFE
✅ devour — /dɪvˈaʊɜːr/ — freedict — SAFE
✅ diameter — /daɪˈæmətɜːr/ — freedict — SAFE
✅ digestive — /daɪdʒˈɛstɪv/ — freedict — SAFE
✅ dike — /dˈaɪk/ — freedict — SAFE
✅ dime — /dˈaɪm/ — freedict — SAFE
✅ din — /dˈɪn/ — freedict — SAFE
✅ discuss — /dɪskˈʌs/ — freedict — SAFE
✅ dishevel — /dɪʃˈɛvəl/ — freedict — SAFE
✅ disrepute — /dˌɪsrɪpjˈuːt/ — samantha — 🟢 SAFE
✅ dissect — /daɪsˈɛkt/ — samantha — 🟢 SAFE
✅ dissolve — /dɪzˈɑːlv/ — freedict — SAFE
✅ distraught — /dɪstrˈɔːt/ — samantha — 🟢 SAFE
✅ distributive — /dɪstrˈɪbjuːtɪv/ — samantha — 🟢 SAFE
✅ ditto — /dˈɪtoʊ/ — freedict — SAFE
✅ dividend — /dˈɪvɪdˌɛnd/ — freedict — SAFE
✅ divisor — /dɪvˈaɪzɜːr/ — freedict — SAFE
✅ divulge — /dɪvˈʌldʒ/ — freedict — SAFE
✅ dodder — /—/ — samantha — 🟢 SAFE
✅ dogma — /dˈɑːɡmə/ — freedict — SAFE
✅ doldrums — /dˈoʊldrəmz/ — freedict — SAFE
✅ dole — /dˈoʊl/ — freedict — SAFE
✅ dolt — /—/ — freedict — SAFE
⚠️ don't judge a book by its cover — /dont dʒˈʌdʒ ə bˈʊk bˈaɪ ˈɪts kˈʌvɜːr/ — samantha — 🟡 WARN — Long phrase — potential prosody issues
✅ donjon — /—/ — samantha — 🟢 SAFE
✅ dosage — /dˈoʊsədʒ/ — samantha — 🟢 SAFE
✅ dote — /dˈoʊt/ — freedict — SAFE
✅ dowel — /dˈaʊəl/ — samantha — 🟢 SAFE
✅ downpour — /dˈaʊnpɔːr/ — samantha — 🟢 SAFE
✅ drab — /drˈæb/ — samantha — 🟢 SAFE
✅ dragnet — /drˈæɡnˌɛt/ — samantha — 🟢 SAFE
✅ dramatic — /drəmˈætɪk/ — freedict — SAFE
✅ drape — /drˈeɪp/ — freedict — SAFE
✅ dreary — /drˈɪriː/ — freedict — SAFE
✅ drench — /drˈɛntʃ/ — freedict — SAFE
✅ drizzle — /drˈɪzəl/ — freedict — SAFE
✅ drone — /drˈoʊn/ — freedict — SAFE
✅ droop — /drˈuːp/ — freedict — SAFE
✅ dub — /dˈʌb/ — freedict — SAFE
✅ due — /dˈuː/ — freedict — SAFE
✅ dugout — /dˈʌɡˌaʊt/ — samantha — 🟢 SAFE
✅ dungeon — /dˈʌndʒən/ — freedict — SAFE
✅ dye — /dˈaɪ/ — freedict — SAFE
✅ earmark — /ˈɪrmˌɑːrk/ — freedict — SAFE
✅ earthquake — /ˈɜːrθkwˌeɪk/ — freedict — SAFE
✅ earthy — /ˈɜːrθiː/ — samantha — 🟢 SAFE
✅ eave — /ˈiːv/ — samantha — 🟢 SAFE
✅ ebony — /ˈɛbəniː/ — freedict — SAFE
✅ ecosystem — /ˈiːkoʊsˌɪstəm/ — samantha — 🟢 SAFE
✅ edit — /ˈɛdət/ — samantha — 🟢 SAFE
✅ effervescent — /ˌɛfɜːrvˈɛsənt/ — freedict — SAFE
✅ effigy — /ˈɛfɪdʒiː/ — samantha — 🟢 SAFE
✅ egress — /ɪɡrˈɛs/ — freedict — SAFE
✅ elapse — /ɪlˈæps/ — samantha — 🟢 SAFE
✅ elapsed — /ɪlˈæpst/ — samantha — 🟢 SAFE
✅ elate — /ɪlˈeɪt/ — freedict — SAFE
✅ elect — /ɪlˈɛkt/ — freedict — SAFE
✅ electricity — /ɪlˌɛktrˈɪsətiː/ — freedict — SAFE
✅ elevation — /ˌɛləvˈeɪʃən/ — samantha — 🟢 SAFE
✅ elf — /ˈɛlf/ — freedict — SAFE
✅ eligible — /ˈɛlədʒəbəl/ — samantha — 🟢 SAFE
✅ elocution — /ˌɛləkjˈuːʃən/ — samantha — 🟢 SAFE
✅ elongate — /ɪlˈɔːŋɡeɪt/ — samantha — 🟢 SAFE
✅ elude — /ɪlˈuːd/ — freedict — SAFE
✅ emboss — /ɪmbˈɔːs/ — freedict — SAFE
✅ emphasize — /ˈɛmfəsˌaɪz/ — samantha — 🟢 SAFE
✅ emporium — /ˌɛmpˈɔːriːəm/ — freedict — SAFE
✅ enamel — /ɪnˈæməl/ — freedict — SAFE
✅ encore — /ˈɑːnkˌɔːr/ — freedict — SAFE
✅ encrust — /ɛnkrˈʌst/ — samantha — 🟢 SAFE
✅ encyclopedia — /ɪnsˌaɪkləpˈiːdiːə/ — freedict — SAFE
✅ engage — /ɛnɡˈeɪdʒ/ — freedict — SAFE
✅ engross — /ɪnɡrˈoʊs/ — freedict — SAFE
✅ enshroud — /ɪnʃrˈaʊd/ — samantha — 🟢 SAFE
✅ enthrall — /—/ — samantha — 🟢 SAFE
✅ entreat — /—/ — freedict — SAFE
✅ epic — /ˈɛpɪk/ — freedict — SAFE
✅ equivalent — /ɪkwˈɪvələnt/ — freedict — SAFE
✅ errand — /ˈɛrənd/ — freedict — SAFE
✅ errant — /ˈɛrənt/ — samantha — 🟢 SAFE
✅ escarpment — /ɛskˈɑːrpmənt/ — freedict — SAFE
✅ ethereal — /ɪθˈɪriːəl/ — freedict — SAFE
✅ evaporation — /ɪvˌæpɜːrˈeɪʃən/ — freedict — SAFE
✅ eventual — /əvˈɛntʃuːəl/ — samantha — 🟢 SAFE
✅ evergreen — /ˈɛvɜːrɡrˌiːn/ — freedict — SAFE
⚠️ every cloud has a silver lining — /ˈɛvɜːriː klˈaʊd hˈæz ə sˈɪlvɜːr lˈaɪnɪŋ/ — samantha — 🟡 WARN — Long phrase — potential prosody issues
✅ excessive — /ɪksˈɛsɪv/ — samantha — 🟢 SAFE
✅ exclaim — /ɪksklˈeɪm/ — samantha — 🟢 SAFE
✅ exotic — /ɪɡzˈɑːtɪk/ — freedict — SAFE
✅ expanse — /ɪkspˈæns/ — freedict — SAFE
✅ expat — /—/ — samantha — 🟢 SAFE
✅ expel — /ɪkspˈɛl/ — samantha — 🟢 SAFE
✅ expression — /ɪksprˈɛʃən/ — freedict — SAFE
✅ eyelet — /ˈaɪlət/ — freedict — SAFE
✅ facet — /fˈæsət/ — freedict — SAFE
✅ fallow — /fˈælˌoʊ/ — samantha — 🟢 SAFE
✅ falter — /fˈɔːltɜːr/ — freedict — SAFE
✅ fanfare — /fˈænfˌɛr/ — freedict — SAFE
✅ farce — /fˈɑːrs/ — freedict — SAFE
✅ favor — /fˈeɪvɜːr/ — freedict — SAFE
✅ favorable — /fˈeɪvɜːrəbəl/ — freedict — SAFE
✅ feign — /fˈeɪn/ — freedict — SAFE
✅ fertile — /fˈɜːrtəl/ — freedict — SAFE
✅ festoon — /fˌɛstˈuːn/ — freedict — SAFE
✅ fidget — /fˈɪdʒɪt/ — freedict — SAFE
✅ fiesta — /fiːˈɛstə/ — freedict — SAFE
✅ figment — /fˈɪɡmɪnt/ — freedict — SAFE
✅ filament — /fˈɪləmənt/ — samantha — 🟢 SAFE
✅ filly — /fˈɪliː/ — freedict — SAFE
✅ finale — /fənˈæliː/ — samantha — 🟢 SAFE
✅ finesse — /fɪnˈɛs/ — freedict — SAFE
✅ first of all — /fˈɜːrst ˈʌv ˈɔːl/ — freedict — SAFE
✅ flair — /flˈɛr/ — freedict — SAFE
✅ flak — /flˈæk/ — samantha — 🟢 SAFE
✅ flank — /flˈæŋk/ — freedict — SAFE
✅ flask — /flˈæsk/ — freedict — SAFE
✅ flaw — /flˈɔː/ — freedict — SAFE
✅ flee — /flˈiː/ — freedict — SAFE
✅ fleece — /flˈiːs/ — freedict — SAFE
✅ flicker — /flˈɪkɜːr/ — samantha — 🟢 SAFE
✅ flinch — /flˈɪntʃ/ — samantha — 🟢 SAFE
✅ flotsam — /flˈɑːtsəm/ — samantha — 🟢 SAFE
✅ flounce — /flˈaʊns/ — freedict — SAFE
✅ flout — /flˈaʊt/ — freedict — SAFE
✅ flue — /flˈuː/ — samantha — 🟢 SAFE
✅ fluent — /flˈuːənt/ — freedict — SAFE
✅ flurry — /flˈɜːriː/ — freedict — SAFE
✅ foil — /fˈɔɪl/ — freedict — SAFE
✅ foothold — /fˈʊthˌoʊld/ — samantha — 🟢 SAFE
✅ for example — /fˈɔːr ɪɡzˈæmpəl/ — samantha — 🟢 SAFE
✅ foray — /fˈɔːreɪ/ — samantha — 🟢 SAFE
✅ ford — /fˈɔːrd/ — freedict — SAFE
✅ foresee — /fɔːrsˈiː/ — freedict — SAFE
✅ forgive — /fɜːrɡˈɪv/ — samantha — 🟢 SAFE
✅ forlorn — /fɜːrlˈɔːrn/ — freedict — SAFE
✅ formal — /fˈɔːrməl/ — freedict — SAFE
✅ forsake — /fɔːrsˈeɪk/ — samantha — 🟢 SAFE
✅ fort — /fˈɔːrt/ — freedict — SAFE
✅ forte — /fˈɔːrteɪ/ — freedict — SAFE
✅ fortress — /fˈɔːrtrəs/ — freedict — SAFE
✅ fowl — /fˈaʊl/ — freedict — SAFE
✅ foyer — /fˈɔɪɜːr/ — freedict — SAFE
✅ frantic — /frˈæntɪk/ — freedict — SAFE
✅ friction — /frˈɪkʃən/ — freedict — SAFE
✅ frigate — /frˈɪɡət/ — samantha — 🟢 SAFE
✅ fringe — /frˈɪndʒ/ — freedict — SAFE
✅ frolic — /frˈɑːlɪk/ — freedict — SAFE
✅ froth — /frˈɔːθ/ — freedict — SAFE
✅ frustrate — /frˈʌstrˌeɪt/ — freedict — SAFE
✅ fulcrum — /fˈʊlkrəm/ — freedict — SAFE
✅ fumigate — /fjˈuːməɡˌeɪt/ — samantha — 🟢 SAFE
✅ furlong — /fˈɜːrlˌɔːŋ/ — freedict — SAFE
✅ furnish — /fˈɜːrnɪʃ/ — freedict — SAFE
✅ furor — /fjˈʊrɔːr/ — samantha — 🟢 SAFE
✅ gable — /ɡˈeɪbəl/ — samantha — 🟢 SAFE
✅ gadget — /ɡˈædʒət/ — freedict — SAFE
✅ gaffe — /ɡˈæf/ — freedict — SAFE
✅ gait — /ɡˈeɪt/ — samantha — 🟢 SAFE
✅ gallop — /ɡˈæləp/ — samantha — 🟢 SAFE
✅ gambit — /ɡˈæmbɪt/ — freedict — SAFE
✅ gambol — /—/ — freedict — SAFE
✅ garb — /ɡˈɑːrb/ — samantha — 🟢 SAFE
✅ garland — /ɡˈɑːrlənd/ — freedict — SAFE
✅ garner — /ɡˈɑːrnɜːr/ — freedict — SAFE
✅ gasp — /ɡˈæsp/ — samantha — 🟢 SAFE
✅ gem — /dʒˈɛm/ — freedict — SAFE
✅ genteel — /dʒɛntˈiːl/ — samantha — 🟢 SAFE
✅ geography — /dʒiːˈɑːɡrəfiː/ — freedict — SAFE
✅ geothermal — /dʒˌiːoʊθˈɜːrməl/ — samantha — 🟢 SAFE
✅ germinate — /dʒˈɜːrmənˌeɪt/ — samantha — 🟢 SAFE
✅ get along with — /ɡˈɛt əlˈɔːŋ wˈɪð/ — samantha — 🟢 SAFE
✅ get cold feet — /ɡˈɛt kˈoʊld fˈiːt/ — samantha — 🟢 SAFE
✅ ghastly — /ɡˈæstliː/ — freedict — SAFE
✅ giddy — /ɡˈɪdiː/ — freedict — SAFE
✅ girdle — /ɡˈɜːrdəl/ — freedict — SAFE
✅ glacier — /ɡlˈeɪʃɜːr/ — freedict — SAFE
✅ glade — /ɡlˈeɪd/ — freedict — SAFE
✅ glare — /ɡlˈɛr/ — freedict — SAFE
✅ glaze — /ɡlˈeɪz/ — freedict — SAFE
✅ gleam — /ɡlˈiːm/ — freedict — SAFE
✅ glen — /ɡlˈɛn/ — freedict — SAFE
✅ glimmer — /ɡlˈɪmɜːr/ — freedict — SAFE
✅ glimpse — /ɡlˈɪmps/ — freedict — SAFE
✅ glint — /ɡlˈɪnt/ — samantha — 🟢 SAFE
✅ glitch — /ɡlˈɪtʃ/ — freedict — SAFE
✅ gloat — /ɡlˈoʊt/ — samantha — 🟢 SAFE
✅ glow — /ɡlˈoʊ/ — freedict — SAFE
✅ glut — /ɡlˈʌt/ — freedict — SAFE
✅ gnaw — /nˈɔː/ — freedict — SAFE
✅ go over — /ɡˈoʊ ˈoʊvɜːr/ — freedict — SAFE
✅ go the extra mile — /ɡˈoʊ ðə ˈɛkstrə mˈaɪl/ — freedict — SAFE
✅ goblet — /ɡˈɑːblət/ — freedict — SAFE
✅ goods — /ɡˈʊdz/ — freedict — SAFE
✅ gouge — /ɡˈaʊdʒ/ — freedict — SAFE
✅ govern — /ɡˈʌvɜːrn/ — freedict — SAFE
✅ governor — /ɡˈʌvɜːrnɜːr/ — freedict — SAFE
✅ gracious — /ɡrˈeɪʃəs/ — freedict — SAFE
✅ graft — /ɡrˈæft/ — freedict — SAFE
✅ gram — /ɡrˈæm/ — freedict — SAFE
✅ grand — /ɡrˈænd/ — freedict — SAFE
✅ granted — /ɡrˈæntəd/ — freedict — SAFE
✅ grave — /ɡrˈeɪv/ — freedict — SAFE
✅ graze — /ɡrˈeɪz/ — freedict — SAFE
✅ greenery — /ɡrˈiːnɜːriː/ — freedict — SAFE
✅ gregarious — /ɡrəɡˈɛriːəs/ — freedict — SAFE
✅ grid — /ɡrˈɪd/ — freedict — SAFE
✅ grimace — /ɡrˈɪməs/ — samantha — 🟢 SAFE
✅ grindstone — /ɡrˈaɪndstˌoʊn/ — samantha — 🟢 SAFE
✅ grit — /ɡrˈɪt/ — freedict — SAFE
✅ grotto — /ɡrˈɑːtˌoʊ/ — freedict — SAFE
✅ grovel — /ɡrˈɑːvəl/ — freedict — SAFE
✅ grueling — /ɡrˈuːɪlɪŋ/ — samantha — 🟢 SAFE
✅ grumble — /ɡrˈʌmbəl/ — freedict — SAFE
✅ gulp — /ɡˈʌlp/ — freedict — SAFE
✅ hackneyed — /hˈækniːd/ — samantha — 🟢 SAFE
✅ hallow — /hˈæloʊ/ — samantha — 🟢 SAFE
✅ hamlet — /hˈæmlət/ — freedict — SAFE
✅ hangar — /hˈæŋɜːr/ — freedict — SAFE
✅ hardship — /hˈɑːrdʃɪp/ — samantha — 🟢 SAFE
✅ harpoon — /hɑːrpˈuːn/ — freedict — SAFE
✅ harrow — /hˈæroʊ/ — freedict — SAFE
✅ haste — /hˈeɪst/ — freedict — SAFE
✅ hasty — /hˈeɪstiː/ — freedict — SAFE
✅ hatch — /hˈætʃ/ — freedict — SAFE
✅ havoc — /hˈævək/ — freedict — SAFE
✅ headway — /hˈɛdwˌeɪ/ — samantha — 🟢 SAFE
✅ heed — /hˈiːd/ — freedict — SAFE
✅ helm — /hˈɛlm/ — freedict — SAFE
✅ herald — /hˈɛrəld/ — freedict — SAFE
✅ herbivore — /hˈɜːrbɪvˌɔːr/ — samantha — 🟢 SAFE
✅ hermit — /hˈɜːrmət/ — freedict — SAFE
✅ hew — /hjˈuː/ — freedict — SAFE
✅ hibernation — /hˌaɪbɜːrnˈeɪʃən/ — samantha — 🟢 SAFE
✅ hinge — /hˈɪndʒ/ — freedict — SAFE
✅ historic — /hɪstˈɔːrɪk/ — freedict — SAFE
✅ hit the books — /hˈɪt ðə bˈʊks/ — samantha — 🟢 SAFE
✅ hit the nail on the head — /hˈɪt ðə nˈeɪl ˈɑːn ðə hˈɛd/ — freedict — SAFE
✅ hoard — /hˈɔːrd/ — freedict — SAFE
✅ hobble — /hˈɑːbəl/ — freedict — SAFE
✅ hoist — /hˈɔɪst/ — freedict — SAFE
✅ hold your horses — /hˈoʊld jˈɔːr hˈɔːrsəz/ — samantha — 🟢 SAFE
✅ homage — /ˈɑːmədʒ/ — freedict — SAFE
✅ homestead — /hˈoʊmstˌɛd/ — samantha — 🟢 SAFE
✅ hone — /hˈoʊn/ — freedict — SAFE
✅ horizontal — /hˌɔːrəzˈɑːntəl/ — freedict — SAFE
✅ hornet — /hˈɔːrnɪt/ — samantha — 🟢 SAFE
✅ hose — /hˈoʊz/ — samantha — 🟢 SAFE
✅ hosiery — /hˈoʊʒɜːriː/ — samantha — 🟢 SAFE
✅ hospitable — /hˈɑːspˈɪtəbəl/ — samantha — 🟢 SAFE
✅ hostile — /hˈɑːstəl/ — freedict — SAFE
✅ hub — /hˈʌb/ — freedict — SAFE
✅ huddle — /hˈʌdəl/ — freedict — SAFE
✅ hull — /hˈʌl/ — samantha — 🟢 SAFE
✅ humidity — /hjuːmˈɪdətiː/ — samantha — 🟢 SAFE
✅ humus — /hjˈuːməs/ — samantha — 🟢 SAFE
✅ hurdle — /hˈɜːrdəl/ — freedict — SAFE
✅ hurl — /hˈɜːrl/ — freedict — SAFE
✅ hurricane — /hˈɜːrəkˌeɪn/ — freedict — SAFE
✅ hydrate — /hˈaɪdrˌeɪt/ — freedict — SAFE
✅ hymn — /hˈɪm/ — freedict — SAFE
✅ hyperbole — /haɪpˈɜːrbəlˌiː/ — freedict — SAFE
✅ icon — /ˈaɪkɑːn/ — freedict — SAFE
✅ idle — /ˈaɪdəl/ — freedict — SAFE
✅ ignorant — /ˈɪɡnɜːrənt/ — freedict — SAFE
✅ illegal — /ˌɪlˈiːɡəl/ — samantha — 🟢 SAFE
✅ imaginary — /ˌɪmˈædʒənˌɛriː/ — freedict — SAFE
✅ imbue — /ˌɪmbjˈuː/ — samantha — 🟢 SAFE
✅ immense — /ˌɪmˈɛns/ — freedict — SAFE
✅ immune — /ˌɪmjˈuːn/ — freedict — SAFE
✅ impervious — /ˌɪmpˈɜːrviːəs/ — freedict — SAFE
✅ impound — /ˌɪmpˈaʊnd/ — samantha — 🟢 SAFE
✅ in brief — /ɪn brˈiːf/ — samantha — 🟢 SAFE
✅ in hot water — /ɪn hˈɑːt wˈɔːtɜːr/ — samantha — 🟢 SAFE
✅ indent — /ˌɪndˈɛnt/ — freedict — SAFE
✅ industry — /ˈɪndəstriː/ — freedict — SAFE
✅ inferior — /ˌɪnfˈɪriːɜːr/ — freedict — SAFE
✅ inferno — /ˌɪnfˈɜːrnˌoʊ/ — samantha — 🟢 SAFE
✅ infinite — /ˈɪnfənət/ — freedict — SAFE
✅ influential — /ˌɪnfluːˈɛnʃəl/ — samantha — 🟢 SAFE
✅ infuse — /ˌɪnfjˈuːz/ — freedict — SAFE
✅ inlet — /ˈɪnlˌɛt/ — freedict — SAFE
✅ inn — /ˈɪn/ — freedict — SAFE
✅ inquest — /ˈɪnkwˌɛst/ — samantha — 🟢 SAFE
✅ instill — /ˌɪnstˈɪl/ — freedict — SAFE
✅ insular — /ˈɪnsəlɜːr/ — samantha — 🟢 SAFE
✅ insulator — /ˈɪnsəlˌeɪtɜːr/ — samantha — 🟢 SAFE
✅ intend — /ˌɪntˈɛnd/ — freedict — SAFE
✅ interior — /ˌɪntˈɪriːɜːr/ — freedict — SAFE
✅ intersect — /ˌɪntɜːrsˈɛkt/ — freedict — SAFE
✅ interval — /ˈɪntɜːrvəl/ — freedict — SAFE
✅ intrigue — /ˌɪntrˈiːɡ/ — freedict — SAFE
✅ inundate — /ˈɪnəndˌeɪt/ — freedict — SAFE
✅ inverse — /ˌɪnvˈɜːrs/ — freedict — SAFE
✅ invertebrate — /ˌɪnvˈɜːrtəbrət/ — samantha — 🟢 SAFE
✅ invest — /ˌɪnvˈɛst/ — freedict — SAFE
✅ irate — /aɪrˈeɪt/ — samantha — 🟢 SAFE
✅ irk — /ˈɜːrk/ — freedict — SAFE
✅ irrigation — /ˌɪrəɡˈeɪʃən/ — freedict — SAFE
✅ irritate — /ˈɪrɪtˌeɪt/ — freedict — SAFE
✅ isolated — /ˈaɪsəlˌeɪtəd/ — freedict — SAFE
✅ isthmus — /ˈɪsməs/ — freedict — SAFE
✅ ivory — /ˈaɪvɜːriː/ — freedict — SAFE
✅ jaunt — /dʒˈɔːnt/ — freedict — SAFE
✅ jest — /dʒˈɛst/ — freedict — SAFE
✅ jettison — /dʒˈɛtɪsən/ — freedict — SAFE
✅ jinx — /dʒˈɪŋks/ — freedict — SAFE
✅ jolt — /dʒˈoʊlt/ — freedict — SAFE
✅ jostle — /dʒˈɑːsəl/ — freedict — SAFE
✅ jubilant — /dʒˈuːbələnt/ — freedict — SAFE
✅ juncture — /dʒˈʌŋktʃɜːr/ — freedict — SAFE
✅ juniper — /dʒˈuːnəpɜːr/ — samantha — 🟢 SAFE
✅ justice — /dʒˈʌstəs/ — freedict — SAFE
✅ keep an eye on — /kˈiːp ˈæn ˈaɪ ˈɑːn/ — freedict — SAFE
✅ kernel — /kˈɜːrnəl/ — freedict — SAFE
✅ kill two birds with one stone — /kˈɪl tˈuː bˈɜːrdz wˈɪð wˈʌn stˈoʊn/ — freedict — SAFE
✅ kilogram — /kˈɪləɡrˌæm/ — freedict — SAFE
✅ kilometer — /kəlˈɑːmətɜːr/ — freedict — SAFE
✅ kilt — /kˈɪlt/ — samantha — 🟢 SAFE
✅ knack — /nˈæk/ — freedict — SAFE
✅ knead — /nˈiːd/ — freedict — SAFE
✅ knell — /nˈɛl/ — freedict — SAFE
✅ knoll — /nˈoʊl/ — samantha — 🟢 SAFE
✅ lacquer — /lˈækɜːr/ — freedict — SAFE
✅ lair — /lˈɛr/ — freedict — SAFE
✅ lance — /lˈæns/ — freedict — SAFE
✅ landmark — /lˈændmˌɑːrk/ — freedict — SAFE
✅ lanky — /lˈæŋkiː/ — samantha — 🟢 SAFE
✅ larva — /lˈɑːrvə/ — freedict — SAFE
✅ lattice — /lˈætəs/ — freedict — SAFE
✅ lavish — /lˈævɪʃ/ — freedict — SAFE
✅ ledge — /lˈɛdʒ/ — freedict — SAFE
✅ ledger — /lˈɛdʒɜːr/ — freedict — SAFE
✅ leech — /lˈiːtʃ/ — freedict — SAFE
✅ leer — /—/ — freedict — SAFE
✅ legal — /lˈiːɡəl/ — freedict — SAFE
✅ legible — /lˈɛdʒəbəl/ — samantha — 🟢 SAFE
✅ legion — /lˈiːdʒən/ — samantha — 🟢 SAFE
✅ legislature — /lˈɛdʒəslˌeɪtʃɜːr/ — freedict — SAFE
✅ legitimate — /lədʒˈɪtəmət/ — freedict — SAFE
✅ let the cat out of the bag — /lˈɛt ðə kˈæt ˈaʊt ˈʌv ðə bˈæɡ/ — freedict — SAFE
✅ lever — /lˈɛvɜːr/ — freedict — SAFE
✅ lilac — /lˈaɪlˌæk/ — freedict — SAFE
✅ limber — /lˈɪmbɜːr/ — samantha — 🟢 SAFE
✅ limelight — /lˈaɪmlˌaɪt/ — freedict — SAFE
✅ limpid — /—/ — freedict — SAFE
✅ lineage — /lˈɪniːədʒ/ — samantha — 🟢 SAFE
✅ linen — /lˈɪnən/ — freedict — SAFE
✅ lintel — /lˈɪntəl/ — samantha — 🟢 SAFE
✅ listless — /lˈɪstləs/ — freedict — SAFE
✅ litany — /lˈɪtəniː/ — samantha — 🟢 SAFE
✅ liter — /lˈiːtɜːr/ — samantha — 🟢 SAFE
✅ literary — /lˈɪtɜːrˌɛriː/ — freedict — SAFE
✅ lithe — /lˈaɪð/ — freedict — SAFE
✅ livelihood — /lˈaɪvliːhˌʊd/ — samantha — 🟢 SAFE
✅ loam — /lˈoʊm/ — freedict — SAFE
✅ lobe — /lˈoʊb/ — samantha — 🟢 SAFE
✅ locale — /loʊkˈæl/ — samantha — 🟢 SAFE
✅ locomotion — /lˌoʊkəmˈoʊʃən/ — samantha — 🟢 SAFE
✅ loft — /lˈɔːft/ — freedict — SAFE
✅ logical — /lˈɑːdʒɪkəl/ — freedict — SAFE
✅ lore — /lˈɔːr/ — freedict — SAFE
✅ lucid — /lˈuːsəd/ — samantha — 🟢 SAFE
✅ lull — /lˈʌl/ — freedict — SAFE
✅ lumber — /lˈʌmbɜːr/ — freedict — SAFE
✅ lunar — /lˈuːnɜːr/ — freedict — SAFE
✅ lunge — /lˈʌndʒ/ — freedict — SAFE
✅ mandate — /mˈændˌeɪt/ — freedict — SAFE
✅ manipulate — /mənˈɪpjəlˌeɪt/ — freedict — SAFE
✅ manner — /mˈænɜːr/ — freedict — SAFE
✅ marvel — /mˈɑːrvəl/ — freedict — SAFE
✅ mass — /mˈæs/ — freedict — SAFE
✅ mechanical — /məkˈænɪkəl/ — freedict — SAFE
✅ mend — /mˈɛnd/ — freedict — SAFE
✅ meridian — /mɜːrˈɪdiːən/ — freedict — SAFE
✅ mesa — /mˈeɪsə/ — samantha — 🟢 SAFE
⚠️ metamorphosis — /mˌɛtəmˈɔːrfəsəs/ — samantha — 🟡 WARN — /ˌmɛt.ə.ˈmɔːr.fə.sɪs/
✅ meter — /mˈiːtɜːr/ — freedict — SAFE
✅ microscope — /mˈaɪkrəskˌoʊp/ — samantha — 🟢 SAFE
✅ microscopic — /mˌaɪkrəskˈɑːpɪk/ — samantha — 🟢 SAFE
✅ migration — /maɪɡrˈeɪʃən/ — samantha — 🟢 SAFE
✅ mobile — /mˈoʊbəl/ — freedict — SAFE
✅ moderate — /mˈɑːdɜːrət/ — freedict — SAFE
✅ molecule — /mˈɑːləkjˌuːl/ — samantha — 🟢 SAFE
✅ monument — /mˈɑːnjuːmənt/ — freedict — SAFE
✅ multiple — /mˈʌltəpəl/ — samantha — 🟢 SAFE
✅ naked — /nˈeɪkəd/ — freedict — SAFE
✅ native — /nˈeɪtɪv/ — freedict — SAFE
✅ nautical — /nˈɔːtəkəl/ — freedict — SAFE
✅ naval — /nˈeɪvəl/ — freedict — SAFE
✅ negative — /nˈɛɡətɪv/ — freedict — SAFE
✅ nocturnal — /nɑːktˈɜːrnəl/ — freedict — SAFE
✅ nonrenewable — /nɑːnriːnˈuːəbəl/ — samantha — 🟢 SAFE
✅ normal — /nˈɔːrməl/ — freedict — SAFE
✅ not only...but also — /nˈɑːt ˈoʊnliː bˈʌt ˈɔːlsoʊ/ — samantha — 🟢 SAFE
✅ numerator — /nˈuːmərˌeɪtɜːr/ — samantha — 🟢 SAFE
✅ nutrient — /nˈuːtriːənt/ — samantha — 🟢 SAFE
✅ occasional — /əkˈeɪʒənəl/ — freedict — SAFE
✅ official — /əfˈɪʃəl/ — freedict — SAFE
✅ omnivore — /—/ — samantha — 🟢 SAFE
✅ on cloud nine — /ˈɑːn klˈaʊd nˈaɪn/ — samantha — 🟢 SAFE
✅ on the other hand — /ˈɑːn ðə ˈʌðɜːr hˈænd/ — samantha — 🟢 SAFE
✅ on the same page — /ˈɑːn ðə sˈeɪm pˈeɪdʒ/ — samantha — 🟢 SAFE
✅ once in a blue moon — /wˈʌns ɪn ə blˈuː mˈuːn/ — freedict — SAFE
✅ operation — /ˌɑːpɜːrˈeɪʃən/ — freedict — SAFE
✅ organism — /ˈɔːrɡənˌɪzəm/ — freedict — SAFE
✅ original — /ɜːrˈɪdʒənəl/ — freedict — SAFE
✅ outcome — /ˈaʊtkˌʌm/ — samantha — 🟢 SAFE
✅ paleontology — /pˌeɪliːəntˈɑːlədʒiː/ — samantha — 🟢 SAFE
✅ parallel — /pˈɛrəlˌɛl/ — freedict — SAFE
✅ partial — /pˈɑːrʃəl/ — samantha — 🟢 SAFE
✅ peninsula — /pənˈɪnsələ/ — freedict — SAFE
✅ perimeter — /pɜːrˈɪmətɜːr/ — samantha — 🟢 SAFE
✅ perpendicular — /pˌɜːrpəndˈɪkjəlɜːr/ — freedict — SAFE
✅ personal — /pˈɜːrsɪnəl/ — freedict — SAFE
✅ persuade — /pɜːrswˈeɪd/ — freedict — SAFE
✅ petition — /pətˈɪʃən/ — samantha — 🟢 SAFE
✅ pharaoh — /fˈɛroʊ/ — samantha — 🟢 SAFE
✅ photosynthesis — /fˌoʊtoʊsˈɪnθəsɪs/ — freedict — SAFE
✅ piece of cake — /pˈiːs ˈʌv kˈeɪk/ — samantha — 🟢 SAFE
✅ plateau — /plætˈoʊ/ — freedict — SAFE
✅ political — /pəlˈɪtəkəl/ — freedict — SAFE
✅ pollination — /pˌɑːlənˈeɪʃən/ — samantha — 🟢 SAFE
✅ pollution — /pəlˈuːʃən/ — freedict — SAFE
✅ polygon — /pˈɑːlɪɡˌɑːn/ — freedict — SAFE
✅ portable — /pˈɔːrtəbəl/ — samantha — 🟢 SAFE
✅ postpone — /poʊstpˈoʊn/ — freedict — SAFE
✅ practice makes perfect — /prˈæktəs mˈeɪks pɜːrfˈɛkt/ — samantha — 🟢 SAFE
✅ preamble — /priːˈæmbəl/ — samantha — 🟢 SAFE
✅ precipitation — /prɪsˌɪpɪtˈeɪʃən/ — freedict — SAFE
✅ precise — /prɪsˈaɪs/ — samantha — 🟢 SAFE
✅ prime — /prˈaɪm/ — freedict — SAFE
✅ primitive — /prˈɪmətɪv/ — freedict — SAFE
✅ principal — /prˈɪnsəpəl/ — freedict — SAFE
✅ prior to — /prˈaɪɜːr tˈuː/ — samantha — 🟢 SAFE
✅ private — /prˈaɪvət/ — freedict — SAFE
✅ probability — /prˌɑːbəbˈɪlətˌiː/ — freedict — SAFE
✅ probable — /prˈɑːbəbəl/ — freedict — SAFE
✅ productive — /prədˈʌktɪv/ — samantha — 🟢 SAFE
✅ professional — /prəfˈɛʃənəl/ — freedict — SAFE
✅ profound — /proʊfˈaʊnd/ — freedict — SAFE
✅ prominent — /prˈɑːmənənt/ — freedict — SAFE
✅ proper — /prˈɑːpɜːr/ — freedict — SAFE
✅ prosperous — /prˈɑːspɜːrəs/ — freedict — SAFE
✅ prove — /prˈuːv/ — freedict — SAFE
✅ provide — /prəvˈaɪd/ — freedict — SAFE
✅ pull someone's leg — /pˈʊl someones lˈɛɡ/ — freedict — SAFE
✅ punish — /pˈʌnɪʃ/ — freedict — SAFE
⚠️ put all your eggs in one basket — /pˈʊt ˈɔːl jˈɔːr ˈɛɡz ɪn wˈʌn bˈæskət/ — samantha — 🟡 WARN — Long phrase — potential prosody issues
✅ quadrilateral — /—/ — freedict — SAFE
✅ quarry — /kwˈɔːriː/ — freedict — SAFE
✅ radical — /rˈædəkəl/ — freedict — SAFE
✅ radius — /rˈeɪdiːəs/ — freedict — SAFE
✅ raining cats and dogs — /rˈeɪnɪŋ kˈæts ənd dˈɑːɡz/ — samantha — 🟢 SAFE
✅ rather than — /rˈæðɜːr ðˈæn/ — samantha — 🟢 SAFE
✅ reckless — /rˈɛkləs/ — samantha — 🟢 SAFE
✅ regional — /rˈiːdʒənəl/ — freedict — SAFE
✅ regulate — /rˈɛɡjəlˌeɪt/ — freedict — SAFE
✅ renewable — /riːnˈuːəbəl/ — samantha — 🟢 SAFE
✅ respiration — /rˌɛspɜːrˈeɪʃən/ — samantha — 🟢 SAFE
✅ rhythm — /rˈɪðəm/ — freedict — SAFE
✅ ridge — /rˈɪdʒ/ — freedict — SAFE
✅ risk — /rˈɪsk/ — freedict — SAFE
✅ rotation — /roʊtˈeɪʃən/ — samantha — 🟢 SAFE
✅ run out of — /rˈʌn ˈaʊt ˈʌv/ — samantha — 🟢 SAFE
✅ rural — /rˈʊrəl/ — freedict — SAFE
✅ salvage — /sˈælvədʒ/ — samantha — 🟢 SAFE
✅ satisfy — /sˈætəsfˌaɪ/ — freedict — SAFE
✅ scarcity — /skˈɛrsɪtiː/ — samantha — 🟢 SAFE
✅ sediment — /sˈɛdəmənt/ — samantha — 🟢 SAFE
✅ sedimentary — /sˌɛdəmˈɛntɜːriː/ — samantha — 🟢 SAFE
✅ see eye to eye — /sˈiː ˈaɪ tˈuː ˈaɪ/ — freedict — SAFE
✅ seek — /sˈiːk/ — freedict — SAFE
✅ services — /sˈɜːrvəsəz/ — freedict — SAFE
✅ settle — /sˈɛtəl/ — freedict — SAFE
✅ sit on the fence — /sˈɪt ˈɑːn ðə fˈɛns/ — freedict — SAFE
✅ skim — /skˈɪm/ — freedict — SAFE
✅ slope — /slˈoʊp/ — freedict — SAFE
✅ snatch — /snˈætʃ/ — freedict — SAFE
✅ so that — /sˈoʊ ðˈæt/ — samantha — 🟢 SAFE
✅ soar — /sˈɔːr/ — freedict — SAFE
✅ solar — /sˈoʊlɜːr/ — freedict — SAFE
✅ soon after — /sˈuːn ˈæftɜːr/ — samantha — 🟢 SAFE
✅ specimen — /spˈɛsəmən/ — samantha — 🟢 SAFE
✅ spill the beans — /spˈɪl ðə bˈiːnz/ — freedict — SAFE
✅ spout — /spˈaʊt/ — freedict — SAFE
✅ stalagmite — /stˈæləɡmˌaɪt/ — samantha — 🟢 SAFE
✅ stand for — /stˈænd fˈɔːr/ — freedict — SAFE
✅ startle — /stˈɑːrtəl/ — freedict — SAFE
✅ stratosphere — /strˈætəsfˌɪr/ — freedict — SAFE
✅ strengthen — /strˈɛŋθən/ — freedict — SAFE
✅ stump — /stˈʌmp/ — freedict — SAFE
✅ subsequently — /sˈʌbsəkwəntliː/ — freedict — SAFE
✅ suburban — /səbˈɜːrbən/ — samantha — 🟢 SAFE
✅ symmetry — /sˈɪmətriː/ — samantha — 🟢 SAFE
✅ take part in — /tˈeɪk pˈɑːrt ɪn/ — samantha — 🟢 SAFE
✅ technology — /tɛknˈɑːlədʒiː/ — samantha — 🟢 SAFE
✅ telescope — /tˈɛləskˌoʊp/ — freedict — SAFE
✅ tension — /tˈɛnʃən/ — samantha — 🟢 SAFE
✅ terminate — /tˈɜːrmənˌeɪt/ — freedict — SAFE
✅ terrify — /tˈɛrəfˌaɪ/ — samantha — 🟢 SAFE
⚠️ the ball is in your court — /ðə bˈɔːl ˈɪz ɪn jˈɔːr kˈɔːrt/ — samantha — 🟡 WARN — Long phrase — potential prosody issues
⚠️ the early bird catches the worm — /ðə ˈɜːrliː bˈɜːrd kˈætʃəz ðə wˈɜːrm/ — samantha — 🟡 WARN — Long phrase — potential prosody issues
✅ the last straw — /ðə lˈæst strˈɔː/ — samantha — 🟢 SAFE
✅ throw in the towel — /θrˈoʊ ɪn ðə tˈaʊəl/ — freedict — SAFE
✅ thus — /ðˈʌs/ — freedict — SAFE
✅ tide — /tˈaɪd/ — freedict — SAFE
✅ timeline — /tˈaɪmlaɪn/ — freedict — SAFE
✅ to begin with — /tˈuː bɪɡˈɪn wˈɪð/ — samantha — 🟢 SAFE
✅ to illustrate — /tˈuː ˈɪləstrˌeɪt/ — samantha — 🟢 SAFE
✅ to put it simply — /tˈuː pˈʊt ˈɪt sˈɪmpliː/ — samantha — 🟢 SAFE
✅ to summarize — /tˈuː sˈʌmɜːrˌaɪz/ — samantha — 🟢 SAFE
✅ torch — /tˈɔːrtʃ/ — freedict — SAFE
✅ trace — /trˈeɪs/ — freedict — SAFE
✅ translate — /trænzlˈeɪt/ — freedict — SAFE
✅ translucent — /trænslˈuːsənt/ — freedict — SAFE
✅ treaty — /trˈiːtiː/ — freedict — SAFE
✅ tributary — /trˈɪbjətˌɛriː/ — freedict — SAFE
✅ tundra — /tˈʌndrə/ — freedict — SAFE
✅ turn out — /tˈɜːrn ˈaʊt/ — freedict — SAFE
✅ two peas in a pod — /tˈuː pˈiːz ɪn ə pˈɑːd/ — samantha — 🟢 SAFE
✅ typical — /tˈɪpəkəl/ — freedict — SAFE
✅ under the weather — /ˈʌndɜːr ðə wˈɛðɜːr/ — freedict — SAFE
✅ unit — /jˈuːnət/ — freedict — SAFE
✅ urban — /ˈɜːrbən/ — samantha — 🟢 SAFE
✅ variable — /vˈɛriːəbəl/ — freedict — SAFE
✅ verdict — /vˈɜːrdɪkt/ — freedict — SAFE
✅ vertebrate — /vˈɜːrtəbrˌeɪt/ — samantha — 🟢 SAFE
✅ vertex — /vˈɜːrtˌɛks/ — freedict — SAFE
✅ vertical — /vˈɜːrtɪkəl/ — freedict — SAFE
✅ volcano — /vɑːlkˈeɪnoʊ/ — freedict — SAFE
✅ wade — /wˈeɪd/ — freedict — SAFE
✅ weaken — /wˈiːkən/ — samantha — 🟢 SAFE
✅ weathering — /wˈɛðɜːrɪŋ/ — samantha — 🟢 SAFE
✅ when pigs fly — /wˈɛn pˈɪɡz flˈaɪ/ — samantha — 🟢 SAFE
✅ whereas — /wɛrˈæz/ — freedict — SAFE

### Level 4 (954 words)

✅ abandon — /əbˈændən/ — freedict — SAFE
✅ abate — /əbˈeɪt/ — samantha — 🟢 SAFE
✅ abbreviation — /əbrˌiːviːˈeɪʃən/ — freedict — SAFE
✅ aberration — /ˌæbɜːrˈeɪʃən/ — freedict — SAFE
✅ abjure — /—/ — freedict — SAFE
⚠️ abnegation — /ˌæbnɛɡˈeɪʃən/ — samantha — 🟡 WARN — /ˌæb.nɪˈɡeɪ.ʃən/ — uncommon
✅ abstract — /æbstrˈækt/ — freedict — SAFE
✅ abstraction — /æbstrˈækʃən/ — freedict — SAFE
✅ academy — /əkˈædəmiː/ — freedict — SAFE
✅ access — /ˈæksˌɛs/ — freedict — SAFE
✅ accretion — /əkrˈiːʃən/ — samantha — 🟢 SAFE
✅ accuse — /əkjˈuːz/ — freedict — SAFE
✅ acerbic — /əsˈɛrbɪk/ — samantha — 🟢 SAFE
✅ acumen — /əkjˈuːmən/ — samantha — 🟢 SAFE
✅ adept — /ədˈɛpt/ — freedict — SAFE
✅ adjacent — /ədʒˈeɪsənt/ — freedict — SAFE
✅ adjudicate — /ədʒˈuːdɪkˌeɪt/ — freedict — SAFE
✅ adjunct — /ˈædʒˌʌŋkt/ — freedict — SAFE
✅ adulterate — /ədˈʌltɜːrˌeɪt/ — samantha — 🟢 SAFE
✅ adversity — /ædvˈɜːrsɪtˌiː/ — freedict — SAFE
✅ affiliate — /əfˈɪliːˌeɪt/ — freedict — SAFE
✅ affinity — /əfˈɪnətiː/ — samantha — 🟢 SAFE
✅ agenda — /ədʒˈɛndə/ — freedict — SAFE
✅ aggrandize — /əɡrˈændˌaɪz/ — samantha — 🟢 SAFE
⚠️ aggregate — /ˈæɡrəɡət/ — samantha — 🔴 DANGER — Heteronym: /ˈæɡ.rɪ.ɡət/ (noun) or /ˈæɡ.rɪ.ɡeɪt/ (verb)
✅ aggregation — /ˌæɡrəɡˈeɪʃən/ — samantha — 🟢 SAFE
✅ aggressive — /əɡrˈɛsɪv/ — freedict — SAFE
✅ agitate — /ˈædʒətˌeɪt/ — freedict — SAFE
✅ agitation — /ˌædʒətˈeɪʃən/ — freedict — SAFE
✅ algorithm — /ˈælɡɜːrˌɪðəm/ — freedict — SAFE
✅ allegiance — /əlˈiːdʒəns/ — freedict — SAFE
✅ alleviation — /əlˌiːviːˈeɪʃən/ — samantha — 🟢 SAFE
✅ alliance — /əlˈaɪəns/ — freedict — SAFE
✅ allot — /əlˈɑːt/ — samantha — 🟢 SAFE
✅ ally — /ˈælaɪ/ — freedict — SAFE
✅ alter — /ˈɔːltɜːr/ — freedict — SAFE
✅ alternative — /ɔːltˈɜːrnətɪv/ — freedict — SAFE
✅ altitude — /ˈæltətˌuːd/ — freedict — SAFE
✅ amalgamation — /əmˌælɡəmˈeɪʃən/ — samantha — 🟢 SAFE
✅ anachronism — /ənˈækrənˌɪzəm/ — freedict — SAFE
✅ anarchy — /ˈænɜːrkˌiː/ — samantha — 🟢 SAFE
✅ anathema — /ənˈæθəmə/ — freedict — SAFE
✅ anchor — /ˈæŋkɜːr/ — freedict — SAFE
✅ anecdote — /ˈænəkdˌoʊt/ — freedict — SAFE
✅ animosity — /ˌænəmˈɑːsətiː/ — samantha — 🟢 SAFE
✅ annihilate — /ənˈaɪəlˌeɪt/ — freedict — SAFE
✅ anomalous — /ənˈɑːmələs/ — freedict — SAFE
✅ anonymous — /ənˈɑːnəməs/ — freedict — SAFE
✅ antithesis — /æntˈɪθəsəs/ — freedict — SAFE
✅ apotheosis — /əpˌɑːθiːˈoʊsəs/ — freedict — SAFE
✅ appraisal — /əprˈeɪzəl/ — freedict — SAFE
✅ appreciate — /əprˈiːʃiːˌeɪt/ — freedict — SAFE
✅ approbation — /ˌæprəbˈeɪʃən/ — freedict — SAFE
✅ arbitrary — /ˈɑːrbətrˌɛriː/ — freedict — SAFE
✅ architect — /ˈɑːrkətˌɛkt/ — freedict — SAFE
✅ archive — /ˈɑːrkˌaɪv/ — freedict — SAFE
✅ arctic — /ˈɑːrktɪk/ — samantha — 🟢 SAFE
✅ arise — /ɜːrˈaɪz/ — freedict — SAFE
✅ aristocratic — /ɜːrˌɪstəkrˈætɪk/ — freedict — SAFE
✅ arrogate — /ˈæroʊɡˌeɪt/ — samantha — 🟢 SAFE
✅ articulate — /ɑːrtˈɪkjəlˌeɪt/ — freedict — SAFE
✅ aspect — /ˈæspˌɛkt/ — freedict — SAFE
✅ asperity — /əspˈɛrɪtiː/ — samantha — 🟢 SAFE
✅ assault — /əsˈɔːlt/ — freedict — SAFE
✅ assembly — /əsˈɛmbliː/ — freedict — SAFE
✅ assess — /əsˈɛs/ — freedict — SAFE
✅ assimilation — /əsˌɪməlˈeɪʃən/ — samantha — 🟢 SAFE
✅ associate — /əsˈoʊsiːət/ — freedict — SAFE
✅ astounding — /əstˈaʊndɪŋ/ — samantha — 🟢 SAFE
✅ atavism — /ˈætəvɪzəm/ — samantha — 🟢 SAFE
✅ atom — /ˈætəm/ — freedict — SAFE
✅ attain — /ətˈeɪn/ — freedict — SAFE
✅ attainment — /ətˈeɪnmənt/ — freedict — SAFE
✅ audacious — /ɑːdˈeɪʃəs/ — samantha — 🟢 SAFE
✅ austerity — /ˌɔːstˈɛrɪtiː/ — samantha — 🟢 SAFE
✅ autonomous — /ɔːtˈɑːnəməs/ — freedict — SAFE
✅ aviation — /ˌeɪviːˈeɪʃən/ — samantha — 🟢 SAFE
✅ awkward — /ˈɑːkwɜːrd/ — freedict — SAFE
✅ backdrop — /bˈækdrˌɑːp/ — samantha — 🟢 SAFE
✅ backlash — /bˈæklˌæʃ/ — freedict — SAFE
✅ barrage — /bɜːrˈɑːʒ/ — freedict — SAFE
✅ barren — /bˈærən/ — freedict — SAFE
✅ battalion — /bətˈæljən/ — samantha — 🟢 SAFE
✅ begrudge — /bɪɡrˈʌdʒ/ — samantha — 🟢 SAFE
✅ bellwether — /bˈɛlwˌɛðɜːr/ — freedict — SAFE
✅ benchmark — /bˈɛntʃmˌɑːrk/ — samantha — 🟢 SAFE
✅ benefactor — /bˈɛnəfˌæktɜːr/ — freedict — SAFE
✅ beneficiary — /bˌɛnəfˈɪʃiːˌɛriː/ — freedict — SAFE
✅ bequest — /bɪkwˈɛst/ — samantha — 🟢 SAFE
✅ bewilderment — /bɪwˈɪldɜːrmənt/ — samantha — 🟢 SAFE
✅ bifurcate — /bˈɪfɜːrkˌeɪt/ — freedict — SAFE
✅ biome — /bˈaɪˌoʊm/ — samantha — 🟢 SAFE
✅ bizarre — /bəzˈɑːr/ — freedict — SAFE
✅ bland — /blˈænd/ — freedict — SAFE
✅ bleak — /blˈiːk/ — freedict — SAFE
✅ blur — /blˈɜːr/ — freedict — SAFE
✅ bolster — /bˈoʊlstɜːr/ — freedict — SAFE
✅ bond — /bˈɑːnd/ — freedict — SAFE
✅ boom — /bˈuːm/ — freedict — SAFE
✅ bountiful — /bˈaʊntɪfəl/ — freedict — SAFE
✅ bowdlerize — /—/ — freedict — SAFE
✅ brace — /brˈeɪs/ — freedict — SAFE
✅ breach — /brˈiːtʃ/ — freedict — SAFE
✅ breakthrough — /brˈeɪkθrˌuː/ — freedict — SAFE
✅ breed — /brˈiːd/ — freedict — SAFE
✅ brochure — /broʊʃˈʊr/ — freedict — SAFE
✅ bromide — /brˈoʊmˌaɪd/ — freedict — SAFE
✅ browse — /brˈaʊz/ — freedict — SAFE
✅ bureaucracy — /bjʊrˈɑːkrəsiː/ — samantha — 🟢 SAFE
⚠️ cabal — /kəbˈɑːl/ — samantha — 🟡 WARN — /kəˈbæl/
✅ cabinet — /kˈæbənət/ — freedict — SAFE
✅ cadence — /kˈeɪdəns/ — freedict — SAFE
✅ calibrate — /kˈæləbrˌeɪt/ — samantha — 🟢 SAFE
✅ calibration — /kˌæləbrˈeɪʃən/ — samantha — 🟢 SAFE
✅ calumny — /kˈæləmniː/ — freedict — SAFE
✅ canard — /kənˈɑːrd/ — freedict — SAFE
✅ candor — /kˈændɜːr/ — freedict — SAFE
✅ capacious — /kəpˈeɪʃəs/ — freedict — SAFE
✅ capitulation — /kəpˌɪtʃəlˈeɪʃən/ — samantha — 🟢 SAFE
✅ captivate — /kˈæptɪvˌeɪt/ — samantha — 🟢 SAFE
✅ captive — /kˈæptɪv/ — freedict — SAFE
✅ career — /kɜːrˈɪr/ — freedict — SAFE
✅ cargo — /kˈɑːrɡˌoʊ/ — freedict — SAFE
✅ caricature — /kˈɛrəkətʃɜːr/ — freedict — SAFE
✅ catalog — /kˈætəlɔːɡ/ — samantha — 🟢 SAFE
✅ catalyst — /kˈætələst/ — samantha — 🟢 SAFE
✅ catastrophe — /kətˈæstrəfiː/ — freedict — SAFE
✅ categorical — /kˌætəɡˈɑːrɪkəl/ — samantha — 🟢 SAFE
✅ category — /kˈætəɡˌɔːriː/ — freedict — SAFE
✅ causation — /kˌɔːzˈeɪʃən/ — samantha — 🟢 SAFE
✅ celerity — /səlˈɛrətiː/ — freedict — SAFE
✅ censor — /sˈɛnsɜːr/ — freedict — SAFE
✅ ceremony — /sˈɛrəmˌoʊniː/ — freedict — SAFE
✅ chagrin — /ʃəɡrˈɪn/ — freedict — SAFE
✅ chamber — /tʃˈeɪmbɜːr/ — freedict — SAFE
✅ chancellor — /tʃˈænsəlɜːr/ — freedict — SAFE
✅ chaos — /kˈeɪɑːs/ — freedict — SAFE
⚠️ characteristic — /kˌɛrəktɜːrˈɪstɪk/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ charity — /tʃˈɛrɪtiː/ — samantha — 🟢 SAFE
✅ chemical — /kˈɛməkəl/ — freedict — SAFE
✅ chicanery — /ʃɪkˈeɪnɜːriː/ — freedict — SAFE
✅ chronicle — /krˈɑːnɪkəl/ — samantha — 🟢 SAFE
✅ civic — /sˈɪvɪk/ — samantha — 🟢 SAFE
✅ clamorous — /—/ — freedict — SAFE
✅ clause — /klˈɔːz/ — freedict — SAFE
✅ client — /klˈaɪənt/ — freedict — SAFE
✅ coalition — /kˌoʊəlˈɪʃən/ — samantha — 🟢 SAFE
✅ cogitate — /kˈɑːdʒɪtˌeɪt/ — samantha — 🟢 SAFE
✅ cognitive — /kˈɑːɡnɪtɪv/ — freedict — SAFE
✅ cognizant — /kˈɑːɡnəzənt/ — samantha — 🟢 SAFE
✅ coherent — /koʊhˈɪrənt/ — freedict — SAFE
✅ cohesion — /koʊhˈiːʒən/ — freedict — SAFE
✅ collaborate — /kəlˈæbɜːrˌeɪt/ — freedict — SAFE
✅ colloquial — /kəlˈoʊkwiːəl/ — freedict — SAFE
✅ collude — /kəlˈuːd/ — samantha — 🟢 SAFE
✅ commemorate — /kəmˈɛmɜːrˌeɪt/ — samantha — 🟢 SAFE
✅ commerce — /kˈɑːmɜːrs/ — freedict — SAFE
✅ commiserate — /kəmˈɪsɜːrˌeɪt/ — freedict — SAFE
✅ commodity — /kəmˈɑːdətiː/ — samantha — 🟢 SAFE
✅ communique — /kəmjˈuːnəkˌeɪ/ — samantha — 🟢 SAFE
⚠️ compartmentalize — /kəmpˌɑːrtmˈɛntəlˌaɪz/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ compatible — /kəmpˈætəbəl/ — samantha — 🟢 SAFE
✅ compose — /kəmpˈoʊz/ — freedict — SAFE
✅ comprehend — /kˌɑːmpriːhˈɛnd/ — freedict — SAFE
✅ compunction — /kəmpˈʌŋkʃən/ — freedict — SAFE
✅ conceal — /kənsˈiːl/ — freedict — SAFE
✅ concede — /kənsˈiːd/ — freedict — SAFE
✅ concept — /kˈɑːnsɛpt/ — samantha — 🟢 SAFE
✅ concrete — /kənkrˈiːt/ — freedict — SAFE
⚠️ condescension — /kˌɑːndəsˈɛnʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ condition — /kəndˈɪʃən/ — freedict — SAFE
⚠️ confederation — /kənfˌɛdɜːrˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ conference — /kˈɑːnfɜːrəns/ — freedict — SAFE
✅ confess — /kənfˈɛs/ — freedict — SAFE
✅ conflate — /kənflˈeɪt/ — freedict — SAFE
✅ conform — /kənfˈɔːrm/ — samantha — 🟢 SAFE
✅ congregation — /kˌɑːŋɡrəɡˈeɪʃən/ — samantha — 🟢 SAFE
✅ connotation — /kˌɑːnətˈeɪʃən/ — samantha — 🟢 SAFE
✅ consanguinity — /—/ — freedict — SAFE
✅ conscience — /kˈɑːnʃəns/ — freedict — SAFE
✅ consecration — /kˌɑːnsəkrˈeɪʃən/ — samantha — 🟢 SAFE
✅ consecutive — /kənsˈɛkjətɪv/ — samantha — 🟢 SAFE
✅ consensus — /kənsˈɛnsəs/ — samantha — 🟢 SAFE
✅ consternation — /kˌɑːnstɜːrnˈeɪʃən/ — freedict — SAFE
✅ consul — /kˈɑːnsəl/ — samantha — 🟢 SAFE
✅ consume — /kənsˈuːm/ — freedict — SAFE
✅ contact — /kˈɑːntˌækt/ — freedict — SAFE
✅ contaminate — /kəntˈæmənˌeɪt/ — freedict — SAFE
✅ contention — /kəntˈɛnʃən/ — samantha — 🟢 SAFE
✅ context — /kˈɑːntɛkst/ — freedict — SAFE
✅ contiguous — /kəntˈɪɡjuːəs/ — freedict — SAFE
✅ continental — /kˌɑːntənˈɛntəl/ — samantha — 🟢 SAFE
✅ contingent — /kəntˈɪndʒənt/ — samantha — 🟢 SAFE
✅ contract — /kˈɑːntrˌækt/ — freedict — SAFE
✅ contravene — /kˈɑːntrəvˌiːn/ — samantha — 🟢 SAFE
✅ contumacious — /—/ — freedict — SAFE
✅ convergence — /kənvˈɜːrdʒəns/ — samantha — 🟢 SAFE
✅ convergent — /kənvˈɜːrdʒənt/ — samantha — 🟢 SAFE
✅ conveyance — /kənvˈeɪəns/ — samantha — 🟢 SAFE
✅ correlation — /kˌɔːrəlˈeɪʃən/ — samantha — 🟢 SAFE
⚠️ corroboration — /kɜːrˌɔːbɜːrˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ cortex — /kˈɔːrtɛks/ — samantha — 🟢 SAFE
✅ council — /kˈaʊnsəl/ — freedict — SAFE
✅ countermand — /—/ — samantha — 🟢 SAFE
✅ courtesy — /kˈɜːrtəsiː/ — freedict — SAFE
✅ covetous — /—/ — samantha — 🟢 SAFE
✅ craft — /krˈæft/ — freedict — SAFE
✅ crane — /krˈeɪn/ — freedict — SAFE
✅ crave — /krˈeɪv/ — freedict — SAFE
✅ credence — /krˈiːdəns/ — samantha — 🟢 SAFE
✅ credibility — /krˌɛdəbˈɪlɪtiː/ — samantha — 🟢 SAFE
✅ credible — /krˈɛdəbəl/ — samantha — 🟢 SAFE
✅ crossroads — /krˈɔːsrˌoʊdz/ — samantha — 🟢 SAFE
✅ crude — /krˈuːd/ — freedict — SAFE
✅ culpability — /kˌʌlpəbˈɪlɪtiː/ — samantha — 🟢 SAFE
✅ cumulus — /—/ — samantha — 🟢 SAFE
✅ curate — /kjˈʊrət/ — freedict — SAFE
✅ curator — /kjʊrˈeɪtɜːr/ — samantha — 🟢 SAFE
✅ curtailment — /kɜːrtˈeɪlmənt/ — samantha — 🟢 SAFE
✅ customary — /kˈʌstəmˌɛriː/ — freedict — SAFE
✅ cylinder — /sˈɪləndɜːr/ — freedict — SAFE
✅ cynicism — /sˈɪnɪsˌɪzəm/ — freedict — SAFE
✅ debilitation — /—/ — samantha — 🟢 SAFE
✅ decadence — /dˈɛkədəns/ — samantha — 🟢 SAFE
✅ decay — /dɪkˈeɪ/ — freedict — SAFE
✅ deceive — /dɪsˈiːv/ — freedict — SAFE
✅ declare — /dɪklˈɛr/ — freedict — SAFE
✅ declination — /—/ — freedict — SAFE
✅ deduction — /dɪdˈʌkʃən/ — freedict — SAFE
✅ defect — /dˈiːfɛkt/ — freedict — SAFE
✅ defy — /dɪfˈaɪ/ — freedict — SAFE
✅ deleterious — /dˌɛlətˈɪriːəs/ — freedict — SAFE
✅ delineation — /dɪlˌɪniːˈeɪʃən/ — samantha — 🟢 SAFE
✅ delusion — /dɪlˈuːʒən/ — freedict — SAFE
✅ demarcation — /dˌiːmɑːrkˈeɪʃən/ — samantha — 🟢 SAFE
✅ demerit — /diːmˈɛrət/ — samantha — 🟢 SAFE
✅ demographic — /dˌɛməɡrˈæfɪk/ — samantha — 🟢 SAFE
✅ denounce — /dɪnˈaʊns/ — freedict — SAFE
✅ deploy — /dɪplˈɔɪ/ — samantha — 🟢 SAFE
✅ depot — /dˈiːpoʊ/ — freedict — SAFE
✅ deprive — /dɪprˈaɪv/ — samantha — 🟢 SAFE
✅ deputy — /dˈɛpjətiː/ — freedict — SAFE
✅ dereliction — /dˌɛrəlˈɪkʃən/ — samantha — 🟢 SAFE
✅ derivative — /dɜːrˈɪvətɪv/ — freedict — SAFE
✅ descendant — /dɪsˈɛndənt/ — freedict — SAFE
✅ desperation — /dˌɛspɜːrˈeɪʃən/ — samantha — 🟢 SAFE
✅ destitution — /dˈɛstətˌuːʃən/ — freedict — SAFE
✅ detachment — /dɪtˈætʃmənt/ — freedict — SAFE
✅ detain — /dɪtˈeɪn/ — freedict — SAFE
✅ deter — /dɪtˈɜːr/ — freedict — SAFE
✅ deterrence — /dɪtˈɜːrəns/ — samantha — 🟢 SAFE
✅ devastate — /dˈɛvəstˌeɪt/ — freedict — SAFE
✅ devolution — /dˌɛvəlˈuːʃən/ — samantha — 🟢 SAFE
✅ diatribe — /dˈaɪətrˌaɪb/ — freedict — SAFE
✅ differentiate — /dˌɪfɜːrˈɛnʃiːˌeɪt/ — freedict — SAFE
✅ diffusion — /dɪfjˈuːʒən/ — samantha — 🟢 SAFE
✅ dilapidation — /—/ — freedict — SAFE
✅ diligent — /dˈɪlɪdʒənt/ — freedict — SAFE
✅ diplomacy — /dɪplˈoʊməsiː/ — freedict — SAFE
✅ diplomat — /dˈɪpləmˌæt/ — samantha — 🟢 SAFE
✅ dire — /dˈaɪr/ — freedict — SAFE
✅ discernment — /dɪsˈɜːrnmənt/ — samantha — 🟢 SAFE
✅ disclose — /dɪsklˈoʊz/ — freedict — SAFE
✅ discount — /dɪskˈaʊnt/ — freedict — SAFE
✅ discourse — /dˈɪskɔːrs/ — freedict — SAFE
✅ discretion — /dɪskrˈɛʃən/ — freedict — SAFE
⚠️ discretionary — /dɪskrˈɛʃənˌɛriː/ — samantha — 🟡 WARN — Long word — verify stress placement
⚠️ discrimination — /dɪskrˌɪmənˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ disdainful — /dɪsdˈeɪnfəl/ — samantha — 🟢 SAFE
✅ disillusionment — /dˌɪsɪlˈuːʒənmənt/ — freedict — SAFE
✅ disparage — /dɪspˈɛrɪdʒ/ — freedict — SAFE
✅ disperse — /dɪspˈɜːrs/ — freedict — SAFE
✅ disposition — /dˌɪspəzˈɪʃən/ — freedict — SAFE
✅ disrupt — /dɪsrˈʌpt/ — freedict — SAFE
✅ dissent — /dɪsˈɛnt/ — samantha — 🟢 SAFE
✅ dissidence — /dˈɪsədəns/ — samantha — 🟢 SAFE
✅ divergent — /daɪvˈɜːrdʒənt/ — samantha — 🟢 SAFE
✅ doctrine — /dˈɑːktrən/ — freedict — SAFE
✅ dogmatic — /dɑːɡmˈætɪk/ — samantha — 🟢 SAFE
✅ dominant — /dˈɑːmənənt/ — freedict — SAFE
✅ dormancy — /dˈɔːrmənsiː/ — samantha — 🟢 SAFE
✅ dormant — /dˈɔːrmənt/ — samantha — 🟢 SAFE
✅ draconian — /dreɪkˈoʊniːən/ — freedict — SAFE
✅ drain — /drˈeɪn/ — freedict — SAFE
✅ dwelling — /dwˈɛlɪŋ/ — freedict — SAFE
✅ dynamic — /daɪnˈæmɪk/ — freedict — SAFE
✅ dynasty — /dˈaɪnəstiː/ — freedict — SAFE
✅ earnest — /ˈɜːrnɪst/ — freedict — SAFE
✅ ebullience — /ˌɪbˈʊljəns/ — freedict — SAFE
✅ eclipse — /ɪklˈɪps/ — freedict — SAFE
✅ ecology — /ɪkˈɑːlədʒiː/ — samantha — 🟢 SAFE
✅ edification — /ˌɛdəfəkˈeɪʃən/ — samantha — 🟢 SAFE
✅ edition — /ədˈɪʃən/ — freedict — SAFE
✅ efficacious — /ˌɛfəkˈeɪʃəs/ — samantha — 🟢 SAFE
✅ elation — /ɪlˈeɪʃən/ — samantha — 🟢 SAFE
✅ electrode — /ˌɪlˈɛktroʊd/ — samantha — 🟢 SAFE
✅ element — /ˈɛləmənt/ — freedict — SAFE
✅ elevate — /ˈɛləvˌeɪt/ — samantha — 🟢 SAFE
✅ eloquent — /ˈɛləkwənt/ — freedict — SAFE
✅ elucidation — /—/ — samantha — 🟢 SAFE
✅ emanate — /ˈɛmənˌeɪt/ — freedict — SAFE
✅ embassy — /ˈɛmbəsiː/ — freedict — SAFE
✅ embellish — /ɪmbˈɛlɪʃ/ — freedict — SAFE
✅ embolden — /ɛmbˈoʊldən/ — samantha — 🟢 SAFE
✅ emigration — /ˌɛməɡrˈeɪʃən/ — samantha — 🟢 SAFE
✅ emission — /ɪmˈɪʃən/ — freedict — SAFE
✅ employ — /ɛmplˈɔɪ/ — freedict — SAFE
✅ encompass — /ɛnkˈʌmpəs/ — freedict — SAFE
✅ encroachment — /ɛnkrˈoʊtʃmənt/ — freedict — SAFE
✅ endanger — /ɛndˈeɪndʒɜːr/ — samantha — 🟢 SAFE
✅ endorse — /ɛndˈɔːrs/ — freedict — SAFE
⚠️ enfranchisement — /—/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ enhance — /ɛnhˈæns/ — freedict — SAFE
✅ enormity — /ɪnˈɔːrmətiː/ — freedict — SAFE
✅ enterprise — /ˈɛntɜːrprˌaɪz/ — freedict — SAFE
✅ enthusiasm — /ɪnθˈuːziːˌæzəm/ — freedict — SAFE
✅ entitled — /ɛntˈaɪtəld/ — samantha — 🟢 SAFE
✅ entrenchment — /ɛntrˈɛntʃmənt/ — samantha — 🟢 SAFE
✅ envision — /ɛnvˈɪʒən/ — samantha — 🟢 SAFE
✅ epidemic — /ˌɛpədˈɛmɪk/ — freedict — SAFE
✅ episode — /ˈɛpəsˌoʊd/ — freedict — SAFE
✅ epitomize — /ɪpˈɪtəmˌaɪz/ — samantha — 🟢 SAFE
⚠️ equanimity — /ˌiːkwənˈɪmɪtiː/ — samantha — 🟡 WARN — /ˌiː.kwəˈnɪm.ɪ.ti/
✅ equilibrium — /ˌiːkwəlˈɪbriːəm/ — samantha — 🟢 SAFE
✅ equip — /ɪkwˈɪp/ — freedict — SAFE
✅ era — /ˈɛrə/ — freedict — SAFE
✅ eradication — /ɪrˌædəkˈeɪʃən/ — samantha — 🟢 SAFE
✅ erstwhile — /ˈɜːrstwˌaɪl/ — freedict — SAFE
✅ escalate — /ˈɛskəlˌeɪt/ — samantha — 🟢 SAFE
✅ eschew — /ɛstʃˈuː/ — freedict — SAFE
⚠️ espionage — /ˈɛspiːənɑːdʒ/ — samantha — 🟡 WARN — /ˈɛs.pi.ə.nɑːʒ/
✅ esprit — /ɛsprˈiː/ — samantha — 🟢 SAFE
✅ ethnic — /ˈɛθnɪk/ — freedict — SAFE
✅ evacuate — /ɪvˈækjəˌeɪt/ — freedict — SAFE
✅ exacerbation — /ɪɡzˌæsɜːrbˈeɪʃən/ — samantha — 🟢 SAFE
✅ exaltation — /—/ — samantha — 🟢 SAFE
✅ excel — /ɪksˈɛl/ — samantha — 🟢 SAFE
✅ excoriate — /ɛkskˈɔːriːˌeɪt/ — freedict — SAFE
✅ exculpate — /ˌɛkskˈʌlpeɪt/ — samantha — 🟢 SAFE
✅ execute — /ˈɛksəkjˌuːt/ — freedict — SAFE
✅ exempt — /ɪɡzˈɛmpt/ — freedict — SAFE
✅ exert — /ɪɡzˈɜːrt/ — freedict — SAFE
✅ exhaust — /ɪɡzˈɔːst/ — freedict — SAFE
✅ exhortation — /ˌɛɡzˌɔːrtˈeɪʃən/ — samantha — 🟢 SAFE
✅ exigent — /ˈɛksɪdʒənt/ — freedict — SAFE
✅ exile — /ˈɛɡzˌaɪl/ — freedict — SAFE
✅ expatriation — /ɛkspˌeɪtriːˈeɪʃən/ — samantha — 🟢 SAFE
✅ expediency — /ɪkspˈiːdiːənsiː/ — samantha — 🟢 SAFE
✅ expenditure — /ɪkspˈɛndətʃɜːr/ — freedict — SAFE
✅ explication — /ˌɛkspləkˈeɪʃən/ — samantha — 🟢 SAFE
✅ exponent — /ˈɛkspˌoʊnənt/ — samantha — 🟢 SAFE
⚠️ exponentiation — /—/ — samantha — 🟡 WARN — Long word — verify stress placement
⚠️ expropriation — /ˌɛksprˌoʊpriːˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ expurgate — /—/ — freedict — SAFE
✅ extensive — /ɪkstˈɛnsɪv/ — freedict — SAFE
✅ extenuating — /ɪkstˈɛnjuːˌeɪtɪŋ/ — samantha — 🟢 SAFE
✅ extirpate — /ˈɛkstɜːrpˌeɪt/ — freedict — SAFE
✅ extraneous — /ɛkstrˈeɪniːəs/ — freedict — SAFE
✅ extraordinary — /ˌɛkstrəˈɔːrdənˌɛriː/ — freedict — SAFE
⚠️ extrapolation — /ɛkstrˌæpəlˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ exuberance — /ɪɡzˈuːbɜːrəns/ — freedict — SAFE
✅ facilitation — /fəsˌɪlətˈeɪʃən/ — samantha — 🟢 SAFE
✅ faction — /fˈækʃən/ — samantha — 🟢 SAFE
✅ fallacious — /fəlˈeɪʃəs/ — samantha — 🟢 SAFE
✅ fanaticism — /fənˈætəsˌɪzəm/ — freedict — SAFE
✅ fatigue — /fətˈiːɡ/ — freedict — SAFE
✅ fatuous — /fˈætʃəwəs/ — samantha — 🟢 SAFE
✅ feasible — /fˈiːzəbəl/ — freedict — SAFE
✅ fecund — /—/ — freedict — SAFE
✅ federal — /fˈɛdɜːrəl/ — freedict — SAFE
✅ felicity — /fɪlˈɪsətiː/ — freedict — SAFE
✅ fluctuation — /flˌʌktʃuːˈeɪʃən/ — samantha — 🟢 SAFE
✅ fluid — /flˈuːəd/ — freedict — SAFE
✅ foresight — /fˈɔːrsˌaɪt/ — samantha — 🟢 SAFE
✅ forfeit — /fˈɔːrfɪt/ — freedict — SAFE
✅ formidable — /fˈɔːrmədəbəl/ — freedict — SAFE
✅ fortification — /fˌɔːrtəfəkˈeɪʃən/ — freedict — SAFE
✅ fortify — /fˈɔːrtɪfˌaɪ/ — freedict — SAFE
✅ fraud — /frˈɔːd/ — freedict — SAFE
✅ frequency — /frˈiːkwənsiː/ — samantha — 🟢 SAFE
✅ frivolity — /frəvˈɑːlətiː/ — samantha — 🟢 SAFE
✅ frugal — /frˈuːɡəl/ — freedict — SAFE
✅ frugality — /fruːɡˈælətiː/ — samantha — 🟢 SAFE
✅ fruition — /fruːˈɪʃən/ — samantha — 🟢 SAFE
✅ fulminate — /fˈʊlmənˌeɪt/ — freedict — SAFE
✅ futility — /fjuːtˈɪlətiː/ — samantha — 🟢 SAFE
✅ gainsay — /ɡˈeɪnsˌeɪ/ — samantha — 🟢 SAFE
✅ galvanize — /ɡˈælvənˌaɪz/ — freedict — SAFE
✅ garrison — /ɡˈærɪsən/ — freedict — SAFE
✅ garrulous — /ɡˈɛrələs/ — freedict — SAFE
✅ gazette — /ɡəzˈɛt/ — samantha — 🟢 SAFE
✅ genetic — /dʒənˈɛtɪk/ — samantha — 🟢 SAFE
✅ geologist — /dʒiːˈɑːlədʒəst/ — samantha — 🟢 SAFE
✅ germane — /dʒɜːrmˈeɪn/ — freedict — SAFE
⚠️ gerrymandering — /dʒˌɛriːmˈændɜːrɪŋ/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ global — /ɡlˈoʊbəl/ — samantha — 🟢 SAFE
✅ gorge — /ɡˈɔːrdʒ/ — samantha — 🟢 SAFE
✅ gradient — /ɡrˈeɪdiːənt/ — freedict — SAFE
⚠️ graduate — /ɡrˈædʒəwət/ — samantha — 🔴 DANGER — Heteronym: /ˈɡrædʒ.u.ət/ (noun) or /ˈɡrædʒ.u.eɪt/ (verb)
✅ grandiosity — /—/ — samantha — 🟢 SAFE
✅ grant — /ɡrˈænt/ — freedict — SAFE
✅ grapple — /ɡrˈæpəl/ — freedict — SAFE
✅ grassland — /ɡrˈæslˌænd/ — samantha — 🟢 SAFE
✅ gratuitous — /ɡrətˈuːətəs/ — freedict — SAFE
✅ grievance — /ɡrˈiːvəns/ — samantha — 🟢 SAFE
✅ grievous — /ɡrˈiːvəs/ — samantha — 🟢 SAFE
✅ gross — /ɡrˈoʊs/ — freedict — SAFE
✅ gulf — /ɡˈʌlf/ — freedict — SAFE
✅ heterogeneous — /hˌɛtɜːrədʒˈiːnjəs/ — freedict — SAFE
✅ highlight — /hˈaɪlˌaɪt/ — freedict — SAFE
✅ hoax — /hˈoʊks/ — freedict — SAFE
✅ hubris — /hjˈuːbrəs/ — freedict — SAFE
✅ humanitarian — /hjˌuːmˌænətˈɛriːən/ — freedict — SAFE
✅ humid — /hjˈuːməd/ — freedict — SAFE
✅ iconoclast — /ˌaɪkˈɑːnəklˌæst/ — freedict — SAFE
✅ idiosyncrasy — /ˌɪdiːoʊsˈɪnkrəsˌiː/ — freedict — SAFE
✅ ignite — /ˌɪɡnˈaɪt/ — samantha — 🟢 SAFE
⚠️ ignominy — /ˈɪɡnoʊmˌɪniː/ — samantha — 🟡 WARN — /ˈɪɡ.nə.mɪn.i/
✅ illuminate — /ˌɪlˈuːmɪnɪt/ — freedict — SAFE
✅ illumination — /ˌɪlˌuːmənˈeɪʃən/ — samantha — 🟢 SAFE
✅ immutable — /ˌɪmjˈuːtəbəl/ — samantha — 🟢 SAFE
✅ impeach — /ˌɪmpˈiːtʃ/ — samantha — 🟢 SAFE
✅ impecunious — /—/ — freedict — SAFE
✅ imperial — /ˌɪmpˈɪriːəl/ — freedict — SAFE
✅ impertinent — /ˌɪmpˈɜːrtənənt/ — freedict — SAFE
✅ impetus — /ˈɪmpətəs/ — freedict — SAFE
✅ implement — /ˈɪmpləmənt/ — freedict — SAFE
✅ importune — /—/ — freedict — SAFE
✅ impugn — /ˌɪmpjˈuːn/ — freedict — SAFE
✅ impulse — /ˈɪmpəls/ — freedict — SAFE
✅ inaugurate — /ɪnˈɔːɡjɜːrɪt/ — samantha — 🟢 SAFE
⚠️ incandescence — /—/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ incidence — /ˈɪnsədəns/ — samantha — 🟢 SAFE
✅ incisive — /ˌɪnsˈaɪsɪv/ — samantha — 🟢 SAFE
✅ incline — /ˌɪnklˈaɪn/ — freedict — SAFE
✅ incongruity — /ˌɪŋkɔːŋrˈuːɪtiː/ — samantha — 🟢 SAFE
✅ inculcate — /ˈɪŋkəlkˌeɪt/ — freedict — SAFE
✅ indemnify — /ˌɪndˈɛmnəfˌaɪ/ — freedict — SAFE
✅ indigence — /—/ — samantha — 🟢 SAFE
✅ indigenous — /ˌɪndˈɪdʒənəs/ — freedict — SAFE
✅ indolence — /—/ — freedict — SAFE
✅ industrial — /ˌɪndˈʌstriːəl/ — freedict — SAFE
✅ ineluctable — /—/ — freedict — SAFE
✅ inevitable — /ˌɪnˈɛvətəbəl/ — freedict — SAFE
✅ inexorable — /ˌɪnˈɛksɜːrəbəl/ — freedict — SAFE
✅ infant — /ˈɪnfənt/ — freedict — SAFE
✅ inflation — /ˌɪnflˈeɪʃən/ — samantha — 🟢 SAFE
⚠️ infrastructure — /ˌɪnfrəstrˈʌktʃɜːr/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ ingratiate — /ˌɪŋɡrˈeɪʃiːˌeɪt/ — freedict — SAFE
✅ inimical — /ˌɪnˈɪmɪkəl/ — freedict — SAFE
✅ initiative — /ˌɪnˈɪʃətɪv/ — freedict — SAFE
✅ inject — /ˌɪndʒˈɛkt/ — freedict — SAFE
✅ innate — /ˌɪnˈeɪt/ — freedict — SAFE
✅ innocuous — /ˌɪnˈɑːkjuːəs/ — freedict — SAFE
✅ innovate — /ˈɪnəvˌeɪt/ — freedict — SAFE
✅ inoculate — /ˌɪnˈɑːkjəlˌeɪt/ — freedict — SAFE
✅ input — /ˈɪnpˌʊt/ — freedict — SAFE
✅ inscription — /ˌɪnskrˈɪpʃən/ — freedict — SAFE
✅ inscrutable — /ˌɪnskrˈuːtəbəl/ — freedict — SAFE
✅ insight — /ˈɪnsˌaɪt/ — freedict — SAFE
✅ insignificant — /ˌɪnsɪɡnjˈɪfɪkənt/ — freedict — SAFE
✅ insipid — /ˌɪnsˈɪpəd/ — freedict — SAFE
✅ insouciance — /ˌɪnsˈuːsiːəns/ — samantha — 🟢 SAFE
✅ install — /ˌɪnstˈɔːl/ — samantha — 🟢 SAFE
✅ intact — /ˌɪntˈækt/ — freedict — SAFE
✅ integrity — /ˌɪntˈɛɡrətiː/ — freedict — SAFE
✅ intellect — /ˈɪntəlˌɛkt/ — freedict — SAFE
✅ intercept — /ˌɪntɜːrsˈɛpt/ — samantha — 🟢 SAFE
✅ interfere — /ˌɪntɜːrfˈɪr/ — freedict — SAFE
✅ interim — /ˈɪntɜːrəm/ — freedict — SAFE
✅ interloper — /ˈɪntɜːrlˌoʊpɜːr/ — samantha — 🟢 SAFE
✅ internecine — /ˌɪntˈɜːrnəsˌiːn/ — freedict — SAFE
⚠️ interpolate — /ˌɪtˈɜːrpəlˌeɪt/ — samantha — 🟡 WARN — /ɪnˈtɜːr.pə.leɪt/
✅ interregnum — /ˌɪntɜːrrˈɛɡnəm/ — samantha — 🟢 SAFE
✅ intersection — /ˌɪntɜːrsˈɛkʃən/ — samantha — 🟢 SAFE
✅ intimate — /ˈɪntəmət/ — freedict — SAFE
✅ intimidate — /ˌɪntˈɪmɪdˌeɪt/ — samantha — 🟢 SAFE
⚠️ intransigence — /ˌɪntrˈænsədʒəns/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ intrepid — /ɪntrˈɛpəd/ — samantha — 🟢 SAFE
✅ intricate — /ˈɪntrəkət/ — freedict — SAFE
✅ intrinsic — /ˌɪntrˈɪnsɪk/ — samantha — 🟢 SAFE
✅ introduction — /ˌɪntrədˈʌkʃən/ — freedict — SAFE
✅ inventory — /ˌɪnvəntˈɔːriː/ — samantha — 🟢 SAFE
✅ investment — /ˌɪnvˈɛstmənt/ — freedict — SAFE
✅ irascible — /ˌɪrˈæsɪbəl/ — freedict — SAFE
✅ irrational — /ˌɪrˈæʃənəl/ — samantha — 🟢 SAFE
✅ irrigate — /ˈɪrəɡˌeɪt/ — samantha — 🟢 SAFE
✅ isle — /ˈaɪl/ — freedict — SAFE
✅ itinerant — /aɪtˈɪnɜːrənt/ — freedict — SAFE
✅ jargon — /dʒˈɑːrɡən/ — freedict — SAFE
✅ judicial — /dʒuːdˈɪʃəl/ — freedict — SAFE
✅ jurisdiction — /dʒˌʊrəsdˈɪkʃən/ — samantha — 🟢 SAFE
✅ juvenile — /dʒˈuːvənəl/ — freedict — SAFE
✅ kinetic — /kənˈɛtɪk/ — samantha — 🟢 SAFE
✅ labor — /lˈeɪbɜːr/ — freedict — SAFE
✅ laconic — /lɑːkˈɑːnɪk/ — freedict — SAFE
✅ landscape — /lˈændskˌeɪp/ — samantha — 🟢 SAFE
✅ lapse — /lˈæps/ — samantha — 🟢 SAFE
✅ largesse — /lɑːrɡˈɛs/ — freedict — SAFE
✅ lassitude — /—/ — samantha — 🟢 SAFE
✅ legislation — /lˌɛdʒəslˈeɪʃən/ — freedict — SAFE
✅ liaison — /liːˈeɪzˌɑːn/ — samantha — 🟢 SAFE
✅ liberate — /lˈɪbˌɜːrˌeɪt/ — samantha — 🟢 SAFE
✅ literacy — /lˈɪtɜːrəsiː/ — freedict — SAFE
✅ lucrative — /lˈuːkrətɪv/ — samantha — 🟢 SAFE
✅ magistrate — /mˈædʒəstrˌeɪt/ — freedict — SAFE
✅ magnanimity — /—/ — samantha — 🟢 SAFE
✅ malfeasance — /mˌælfˈiːzəns/ — freedict — SAFE
✅ malfeasant — /—/ — samantha — 🟢 SAFE
✅ manuscript — /mˈænjəskrˌɪpt/ — freedict — SAFE
✅ margin — /mˈɑːrdʒən/ — freedict — SAFE
✅ maritime — /mˈɛrətˌaɪm/ — freedict — SAFE
✅ meander — /miːˈændɜːr/ — samantha — 🟢 SAFE
✅ mechanism — /mˈɛkənˌɪzəm/ — freedict — SAFE
✅ media — /mˈiːdiːə/ — samantha — 🟢 SAFE
✅ mediate — /mˈiːdiːˌeɪt/ — samantha — 🟢 SAFE
✅ medieval — /mɪdˈiːvəl/ — samantha — 🟢 SAFE
⚠️ memoir — /mˈɛmwˌɑːr/ — samantha — 🟡 WARN — French /ˈmɛm.wɑːr/
✅ memorize — /mˈɛmɜːrˌaɪz/ — freedict — SAFE
✅ menace — /mˈɛnəs/ — freedict — SAFE
✅ mendacious — /mɛndˈeɪʃəs/ — samantha — 🟢 SAFE
✅ merchandise — /mˈɜːrtʃəndˌaɪz/ — freedict — SAFE
✅ mercurial — /mɜːrkjˈʊriːəl/ — freedict — SAFE
✅ merit — /mˈɛrət/ — freedict — SAFE
✅ meritocracy — /mɛrɪtˈɔːkrəsiː/ — samantha — 🟢 SAFE
✅ metabolism — /mətˈæbəlˌɪzəm/ — samantha — 🟢 SAFE
✅ metropolitan — /mˌɛtrəpˈɑːlətən/ — samantha — 🟢 SAFE
✅ militant — /mˈɪlətənt/ — samantha — 🟢 SAFE
✅ militia — /məlˈɪʃə/ — freedict — SAFE
✅ millennium — /məlˈɛniːəm/ — freedict — SAFE
✅ mimic — /mˈɪmɪk/ — freedict — SAFE
✅ minimal — /mˈɪnəməl/ — freedict — SAFE
✅ ministry — /mˈɪnəstriː/ — samantha — 🟢 SAFE
✅ mobilize — /mˈoʊbəlˌaɪz/ — samantha — 🟢 SAFE
✅ mollify — /mˈɑːləfˌaɪ/ — freedict — SAFE
✅ momentum — /moʊmˈɛntəm/ — freedict — SAFE
✅ monarch — /mˈɑːnˌɑːrk/ — freedict — SAFE
✅ monarchy — /mˈɑːnɑːrkiː/ — freedict — SAFE
✅ monetary — /mˈɑːnətˌɛriː/ — freedict — SAFE
✅ monopolize — /mənˈɑːpəlˌaɪz/ — freedict — SAFE
✅ monopoly — /mənˈɑːpəliː/ — freedict — SAFE
✅ morale — /mɜːrˈæl/ — samantha — 🟢 SAFE
✅ moratorium — /mˌɔːrətˈɔːriːəm/ — freedict — SAFE
✅ mortgage — /mˈɔːrɡədʒ/ — freedict — SAFE
✅ municipal — /mjuːnˈɪsəpəl/ — samantha — 🟢 SAFE
✅ munificence — /—/ — freedict — SAFE
✅ mutiny — /mjˈuːtəniː/ — freedict — SAFE
✅ narrate — /nˈɛrˌeɪt/ — samantha — 🟢 SAFE
✅ narrative — /nˈærətɪv/ — freedict — SAFE
✅ nascent — /nˈeɪsənt/ — freedict — SAFE
✅ nationalism — /nˈæʃənəlˌɪzəm/ — samantha — 🟢 SAFE
✅ nefarious — /nəfˈɛriːəs/ — freedict — SAFE
✅ niche — /nˈɪtʃ/ — freedict — SAFE
✅ nitrogen — /nˈaɪtrədʒən/ — freedict — SAFE
✅ nomadic — /noʊmˈædɪk/ — samantha — 🟢 SAFE
⚠️ nomenclature — /nˈoʊmənklˌeɪtʃɜːr/ — samantha — 🟡 WARN — /ˈnoʊ.mən.kleɪ.tʃɚ/
✅ nominate — /nˈɑːmənət/ — samantha — 🟢 SAFE
✅ nonpartisan — /nɑːnpˈɑːrtəzən/ — samantha — 🟢 SAFE
✅ norm — /nˈɔːrm/ — freedict — SAFE
✅ notorious — /noʊtˈɔːriːəs/ — freedict — SAFE
✅ novice — /nˈɑːvəs/ — samantha — 🟢 SAFE
✅ nuclear — /nˈuːkliːɜːr/ — freedict — SAFE
✅ nugatory — /nˈuːɡɑːtˌɔːriː/ — freedict — SAFE
✅ nullify — /nˈʌləfˌaɪ/ — freedict — SAFE
✅ obdurate — /ˈɑːbdɜːrət/ — freedict — SAFE
✅ oblige — /əblˈaɪdʒ/ — freedict — SAFE
✅ oblique — /əblˈiːk/ — freedict — SAFE
✅ obscure — /əbskjˈʊr/ — freedict — SAFE
✅ obstinate — /ˈɑːbstənət/ — freedict — SAFE
✅ obstruct — /əbstrˈʌkt/ — samantha — 🟢 SAFE
✅ obviate — /ˈɑːbviːˌeɪt/ — freedict — SAFE
✅ offend — /əfˈɛnd/ — freedict — SAFE
✅ offset — /ɔːfsˈɛt/ — samantha — 🟢 SAFE
✅ omit — /oʊmˈɪt/ — freedict — SAFE
✅ onerous — /ˈoʊnɜːrəs/ — samantha — 🟢 SAFE
✅ onset — /ˈɑːnsˌɛt/ — freedict — SAFE
✅ opacity — /oʊpˈæsətiː/ — samantha — 🟢 SAFE
✅ opaque — /oʊpˈeɪk/ — samantha — 🟢 SAFE
✅ oppress — /əprˈɛs/ — samantha — 🟢 SAFE
✅ opprobrium — /əprˈoʊbriːəm/ — samantha — 🟢 SAFE
✅ optimize — /ˈɑːptəmˌaɪz/ — freedict — SAFE
✅ opulence — /ˈɑːpjələns/ — samantha — 🟢 SAFE
✅ oration — /ɔːrˈeɪʃən/ — samantha — 🟢 SAFE
✅ ordinance — /ˈɔːrdənəns/ — freedict — SAFE
✅ orient — /ˈɔːriːˌɛnt/ — freedict — SAFE
✅ oscillate — /ˈɑːsəlˌeɪt/ — freedict — SAFE
✅ oscillation — /ˌɑːsəlˈeɪʃən/ — samantha — 🟢 SAFE
✅ ostensible — /ɑːstˈɛnsəbəl/ — freedict — SAFE
✅ ostracism — /ˈɔːstrəsˌɪzəm/ — samantha — 🟢 SAFE
✅ outbreak — /ˈaʊtbrˌeɪk/ — freedict — SAFE
✅ output — /ˈaʊtpˌʊt/ — samantha — 🟢 SAFE
✅ outrage — /ˈaʊtrˌeɪdʒ/ — freedict — SAFE
✅ outskirts — /ˈaʊtskˌɜːrts/ — freedict — SAFE
✅ overhaul — /ˈoʊvɜːrhˌɔːl/ — freedict — SAFE
✅ overlap — /ˈoʊvɜːrlˌæp/ — freedict — SAFE
✅ overseas — /ˈoʊvɜːrsˈiːz/ — samantha — 🟢 SAFE
✅ oversight — /ˈoʊvɜːrsˌaɪt/ — freedict — SAFE
✅ overt — /oʊvˈɜːrt/ — freedict — SAFE
✅ overture — /ˈoʊvɜːrtʃɜːr/ — freedict — SAFE
✅ overwhelm — /ˌoʊvɜːrwˈɛlm/ — samantha — 🟢 SAFE
✅ palatable — /pˈælətəbəl/ — freedict — SAFE
✅ palimpsest — /pˈælɪsˌɛst/ — freedict — SAFE
✅ panacea — /pˌænəsˈiːə/ — freedict — SAFE
✅ panegyric — /—/ — samantha — 🟢 SAFE
✅ paradigm — /pˈɛrədˌaɪm/ — freedict — SAFE
✅ paradox — /pˈɛrədˌɑːks/ — freedict — SAFE
✅ paradoxical — /pˌɛrədˈɑːksɪkəl/ — freedict — SAFE
✅ paragon — /pˈɛrəɡˌɑːn/ — freedict — SAFE
✅ parliament — /pˈɑːrləmənt/ — freedict — SAFE
✅ partisan — /pˈɑːrtəzən/ — freedict — SAFE
✅ patrimony — /pˈætrəmˌoʊniː/ — samantha — 🟢 SAFE
✅ patron — /pˈeɪtrən/ — freedict — SAFE
✅ patronage — /pˈætrənɪdʒ/ — samantha — 🟢 SAFE
✅ paucity — /pˈɔːsətˌiː/ — samantha — 🟢 SAFE
✅ peak — /pˈiːk/ — freedict — SAFE
✅ pedagogue — /—/ — freedict — SAFE
⚠️ pedagogy — /pˈɛdəɡˌoʊdʒiː/ — samantha — 🟡 WARN — /ˈpɛd.ə.ɡɑː.dʒi/
✅ pedantic — /pədˈæntɪk/ — freedict — SAFE
✅ pejorative — /pədʒˈɔːrətɪv/ — freedict — SAFE
✅ penal — /pˈiːnəl/ — samantha — 🟢 SAFE
✅ penitence — /—/ — samantha — 🟢 SAFE
✅ penultimate — /pɛnˈʌltəmət/ — freedict — SAFE
✅ per capita — /pˈɜːr kˈæpɪtə/ — samantha — 🟢 SAFE
✅ perennial — /pɜːrˈɛniːəl/ — freedict — SAFE
✅ periphery — /pɜːrˈɪfɜːriː/ — freedict — SAFE
✅ permeable — /pˈɜːrmˌiːəbəl/ — samantha — 🟢 SAFE
✅ pernicious — /pɜːrnˈɪʃəs/ — freedict — SAFE
✅ perpetual — /pɜːrpˈɛtʃuːəl/ — freedict — SAFE
✅ persecute — /pˈɜːrsəkjˌuːt/ — freedict — SAFE
✅ persona — /pɜːrsˈoʊnə/ — samantha — 🟢 SAFE
✅ pertinent — /pˈɜːrtɪnɪnt/ — freedict — SAFE
✅ perturbation — /pˌɜːrtɜːrbˈeɪʃən/ — samantha — 🟢 SAFE
✅ pervasive — /pɜːrvˈeɪsɪv/ — freedict — SAFE
✅ petroleum — /pətrˈoʊliːəm/ — freedict — SAFE
✅ petulance — /pˈɛtʃələns/ — samantha — 🟢 SAFE
✅ philanthropy — /fɪlˈænθrəpiː/ — freedict — SAFE
✅ pivotal — /pˈɪvətəl/ — freedict — SAFE
✅ placid — /plˈæsəd/ — freedict — SAFE
✅ plantation — /plˌæntˈeɪʃən/ — freedict — SAFE
✅ platitude — /plˈætɪtˌuːd/ — freedict — SAFE
✅ plausible — /plˈɔːzəbəl/ — freedict — SAFE
✅ plead — /plˈiːd/ — samantha — 🟢 SAFE
✅ plethora — /plˈɛθɜːrə/ — freedict — SAFE
✅ plurality — /plɜːrˈælɪtiː/ — samantha — 🟢 SAFE
✅ poignant — /pˈɔɪnjənt/ — freedict — SAFE
✅ polemic — /pəlˈɛmɪk/ — freedict — SAFE
✅ poll — /pˈoʊl/ — freedict — SAFE
✅ pollinate — /pˈɑːlənˌeɪt/ — samantha — 🟢 SAFE
✅ pollute — /pəlˈuːt/ — freedict — SAFE
✅ ponderous — /pˈɑːndɜːrəs/ — freedict — SAFE
✅ populate — /pˈɑːpjəlˌeɪt/ — samantha — 🟢 SAFE
✅ portentous — /pɔːrtˈɛntəs/ — freedict — SAFE
✅ posterity — /pɑːstˈɛrətiː/ — freedict — SAFE
✅ pragmatic — /præɡmˈætɪk/ — freedict — SAFE
✅ pragmatism — /prˈæɡmətˌɪzəm/ — samantha — 🟢 SAFE
✅ precarious — /priːkˈɛriːəs/ — samantha — 🟢 SAFE
✅ precaution — /priːkˈɔːʃən/ — freedict — SAFE
✅ precede — /prɪsˈiːd/ — samantha — 🟢 SAFE
✅ precedent — /prˈɛsɪdənt/ — samantha — 🟢 SAFE
✅ precipitous — /prɪsˈɪpɪtəs/ — freedict — SAFE
✅ precursor — /priːkˈɜːrsɜːr/ — samantha — 🟢 SAFE
✅ predilection — /prˌɛdəlˈɛkʃən/ — freedict — SAFE
✅ predominant — /prɪdˈɑːmənənt/ — samantha — 🟢 SAFE
✅ preeminent — /priːˈɛmənənt/ — samantha — 🟢 SAFE
✅ preface — /prˈɛfəs/ — freedict — SAFE
✅ preliminary — /prɪlˈɪmənˌɛriː/ — samantha — 🟢 SAFE
✅ premise — /prˈɛmɪs/ — freedict — SAFE
⚠️ preponderance — /priːpˈɑːndrəns/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ presentiment — /—/ — samantha — 🟢 SAFE
✅ preside — /prɪzˈaɪd/ — samantha — 🟢 SAFE
✅ presumptuous — /prɪzˈʌmptʃəwəs/ — freedict — SAFE
✅ prevalent — /prˈɛvələnt/ — freedict — SAFE
✅ primarily — /praɪmˈɛrəliː/ — samantha — 🟢 SAFE
✅ primordial — /prɪmˈɔːrdiːəl/ — freedict — SAFE
✅ probity — /prˈoʊbətiː/ — samantha — 🟢 SAFE
✅ procedure — /prəsˈiːdʒɜːr/ — freedict — SAFE
✅ proclivity — /proʊklˈɪvətiː/ — freedict — SAFE
✅ procrastinate — /prəkrˈæstənˌeɪt/ — freedict — SAFE
✅ procurement — /proʊkjˈʊrmənt/ — samantha — 🟢 SAFE
✅ prodigious — /prədˈɪdʒəs/ — freedict — SAFE
✅ prodigy — /prˈɑːdədʒiː/ — samantha — 🟢 SAFE
✅ proficient — /prɑːfˈɪʃənt/ — freedict — SAFE
✅ profligate — /prˈɔːflɪɡˌeɪt/ — freedict — SAFE
✅ prognosticate — /prˌɑːɡnˈɑːstəkˌeɪt/ — freedict — SAFE
✅ proliferate — /proʊlˈɪfɜːrˌeɪt/ — samantha — 🟢 SAFE
✅ promulgation — /—/ — samantha — 🟢 SAFE
✅ propaganda — /prˌɑːpəɡˈændə/ — freedict — SAFE
✅ propitious — /prəpˈɪʃəs/ — freedict — SAFE
✅ proprietary — /prəprˈaɪətˌɛriː/ — freedict — SAFE
✅ proscribe — /proʊskrˈaɪb/ — samantha — 🟢 SAFE
✅ prosecute — /prˈɑːsəkjˌuːt/ — freedict — SAFE
✅ proselytize — /prˈɑːsələtˌaɪz/ — freedict — SAFE
✅ prospectus — /prəspˈɛktəs/ — samantha — 🟢 SAFE
✅ protocol — /prˈoʊtəkˌɑːl/ — samantha — 🟢 SAFE
✅ protracted — /proʊtrˈæktɪd/ — samantha — 🟢 SAFE
✅ provenance — /prˈɑːvənəns/ — samantha — 🟢 SAFE
✅ province — /prˈɑːvəns/ — freedict — SAFE
✅ provisional — /prəvˈɪʒənəl/ — samantha — 🟢 SAFE
✅ prowess — /prˈaʊəs/ — freedict — SAFE
✅ proximity — /prɑːksˈɪmətiː/ — freedict — SAFE
✅ prudence — /prˈuːdəns/ — freedict — SAFE
✅ prudent — /prˈuːdənt/ — freedict — SAFE
✅ pugnacious — /pəɡnˈæʃɪs/ — samantha — 🟢 SAFE
✅ pulchritude — /—/ — samantha — 🟢 SAFE
✅ punctilious — /pəŋktˈɪliːəs/ — freedict — SAFE
✅ punitive — /pjˈuːnətɪv/ — freedict — SAFE
✅ quagmire — /kwˈæɡmˌaɪɜːr/ — freedict — SAFE
✅ qualm — /—/ — freedict — SAFE
✅ quandary — /kwˈɑːndɜːriː/ — freedict — SAFE
✅ quarantine — /kwˈɔːrəntˌiːn/ — freedict — SAFE
✅ quarrelsome — /kwˈɔːrəlsəm/ — freedict — SAFE
⚠️ querulous — /kwˈɛrələs/ — samantha — 🟡 WARN — /ˈkwɛr.ə.ləs/
✅ quintessential — /kwˌɪntɪsˈɛnʃəl/ — freedict — SAFE
✅ quixotic — /kwɪksˈɑːtɪk/ — freedict — SAFE
✅ quorum — /kwˈɔːrəm/ — freedict — SAFE
✅ quota — /kwˈoʊtə/ — samantha — 🟢 SAFE
✅ rambunctious — /ræmbˈʌŋkʃəs/ — freedict — SAFE
✅ rancor — /rˈæŋkɜːr/ — samantha — 🟢 SAFE
✅ rapacious — /rəpˈæʃɪs/ — freedict — SAFE
✅ rapprochement — /rˌæprˌoʊʃmˈɑːn/ — freedict — SAFE
✅ ratify — /rˈætəfˌaɪ/ — freedict — SAFE
✅ ration — /rˈæʃən/ — freedict — SAFE
✅ rational — /rˈæʃənəl/ — freedict — SAFE
✅ rationale — /rˌæʃənˈæl/ — freedict — SAFE
✅ reaction — /riːˈækʃən/ — freedict — SAFE
✅ recapitulate — /rˌiːkəpˈɪtʃəlˌeɪt/ — samantha — 🟢 SAFE
✅ recede — /rɪsˈiːd/ — freedict — SAFE
✅ reception — /rɪsˈɛpʃən/ — freedict — SAFE
✅ recess — /rɪsˈɛs/ — freedict — SAFE
✅ recidivism — /rəsˈɪdɪvˌɪzəm/ — samantha — 🟢 SAFE
✅ reciprocity — /rˌɛsɪprˈɑːsɪtiː/ — samantha — 🟢 SAFE
✅ reclamation — /rˌɛkləmˈeɪʃən/ — samantha — 🟢 SAFE
✅ reconcile — /rˈɛkənsˌaɪl/ — freedict — SAFE
⚠️ reconciliation — /rˌɛkənsˌɪliːˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ redress — /rɪdrˈɛs/ — freedict — SAFE
✅ redundancy — /rɪdˈʌndənsiː/ — freedict — SAFE
✅ refer — /rəfˈɜːr/ — freedict — SAFE
✅ referendum — /rˌɛfɜːrˈɛndəm/ — samantha — 🟢 SAFE
✅ refuge — /rˈɛfjuːdʒ/ — freedict — SAFE
✅ refurbish — /riːfˈɜːrbɪʃ/ — freedict — SAFE
✅ regime — /rəʒˈiːm/ — freedict — SAFE
✅ reimburse — /rˌiːɪmbˈɜːrs/ — freedict — SAFE
✅ reiterate — /riːˈɪtɜːrˌeɪt/ — freedict — SAFE
✅ relay — /rˈiːlˌeɪ/ — freedict — SAFE
✅ relegate — /rˈɛləɡˌeɪt/ — freedict — SAFE
✅ remonstrate — /—/ — freedict — SAFE
✅ renaissance — /rˌɛnəsˈɑːns/ — freedict — SAFE
✅ render — /rˈɛndɜːr/ — freedict — SAFE
✅ renovate — /rˈɛnəvˌeɪt/ — samantha — 🟢 SAFE
✅ renunciation — /rɪnˌʌnsiːˈeɪʃən/ — samantha — 🟢 SAFE
✅ reparation — /rˌɛpɜːrˈeɪʃən/ — freedict — SAFE
✅ repeal — /rɪpˈiːl/ — freedict — SAFE
✅ replenish — /riːplˈɛnɪʃ/ — freedict — SAFE
✅ replicate — /rˈɛpləkˌeɪt/ — samantha — 🟢 SAFE
✅ repository — /riːpˈɑːzətˌɔːriː/ — freedict — SAFE
⚠️ reprehensible — /rˌɛprɪhˈɛnsəbəl/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ repress — /riːprˈɛs/ — samantha — 🟢 SAFE
✅ reproach — /riːprˈoʊtʃ/ — freedict — SAFE
✅ repudiate — /riːpjˈuːdiːˌeɪt/ — freedict — SAFE
✅ repudiation — /rɪpjˌuːdiːˈeɪʃən/ — samantha — 🟢 SAFE
✅ requisite — /rˈɛkwəzət/ — freedict — SAFE
✅ requisition — /rˌɛkwəzˈɪʃən/ — samantha — 🟢 SAFE
✅ rescind — /rɪsˈɪnd/ — freedict — SAFE
✅ reservoir — /rˈɛzəvwˌɑːr/ — freedict — SAFE
✅ residual — /rɪzˈɪdʒuːəl/ — samantha — 🟢 SAFE
✅ resign — /rɪzˈaɪn/ — freedict — SAFE
✅ resignation — /rˌɛzəɡnˈeɪʃən/ — freedict — SAFE
✅ resilient — /rɪzˈɪljənt/ — freedict — SAFE
✅ resolute — /rˈɛzəlˌuːt/ — freedict — SAFE
✅ resonance — /rˈɛzənəns/ — samantha — 🟢 SAFE
✅ restitution — /rˌɛstɪtˈuːʃən/ — freedict — SAFE
✅ restrain — /riːstrˈeɪn/ — freedict — SAFE
✅ resurgent — /rɪsˈɜːrdʒənt/ — samantha — 🟢 SAFE
✅ retail — /rˈiːtˌeɪl/ — freedict — SAFE
✅ reticence — /rˈɛtɪsəns/ — freedict — SAFE
✅ retract — /riːtrˈækt/ — freedict — SAFE
✅ retrieve — /rɪtrˈiːv/ — freedict — SAFE
✅ retrospect — /rˈɛtrəspˌɛkt/ — samantha — 🟢 SAFE
⚠️ retrospective — /rˌɛtrəspˈɛktɪv/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ revelry — /rˈɛvəlriː/ — samantha — 🟢 SAFE
✅ reverberate — /rɪvˈɜːrbɜːrət/ — samantha — 🟢 SAFE
✅ revolve — /riːvˈɑːlv/ — samantha — 🟢 SAFE
✅ rhetoric — /rˈɛtɜːrɪk/ — samantha — 🟢 SAFE
✅ rigmarole — /—/ — freedict — SAFE
✅ rigorous — /rˈɪɡɜːrəs/ — freedict — SAFE
✅ robust — /roʊbˈʌst/ — freedict — SAFE
✅ roster — /rˈɑːstɜːr/ — freedict — SAFE
✅ rotate — /rˈoʊtˌeɪt/ — freedict — SAFE
✅ rubric — /rˈuːbrɪk/ — freedict — SAFE
✅ ruminate — /rˈuːmɪnˌeɪt/ — freedict — SAFE
✅ rupture — /rˈʌptʃɜːr/ — freedict — SAFE
✅ sacrosanct — /sˈækroʊsæŋkt/ — samantha — 🟢 SAFE
✅ sagacious — /—/ — samantha — 🟢 SAFE
✅ salient — /sˈeɪliːənt/ — freedict — SAFE
✅ sanction — /sˈæŋkʃən/ — freedict — SAFE
✅ sanguine — /sˈæŋɡwɪn/ — freedict — SAFE
✅ sanitary — /sˈænɪtˌɛriː/ — freedict — SAFE
✅ sardonic — /sɑːrdˈɑːnɪk/ — freedict — SAFE
✅ satellite — /sˈætəlˌaɪt/ — samantha — 🟢 SAFE
✅ saturate — /sˈætʃɜːrˌeɪt/ — freedict — SAFE
✅ scaffold — /skˈæfəld/ — freedict — SAFE
✅ scenario — /sɪnˈɛriːoʊ/ — freedict — SAFE
✅ scrupulous — /skrˈuːpjələs/ — freedict — SAFE
✅ scrutinize — /skrˈuːtənˌaɪz/ — freedict — SAFE
✅ sector — /sˈɛktɜːr/ — samantha — 🟢 SAFE
✅ sedentary — /sˈɛdəntˌɛriː/ — samantha — 🟢 SAFE
✅ segregation — /sˌɛɡrəɡˈeɪʃən/ — samantha — 🟢 SAFE
✅ seismic — /sˈaɪzmɪk/ — samantha — 🟢 SAFE
✅ semblance — /sˈɛmbləns/ — freedict — SAFE
✅ seminar — /sˈɛmənˌɑːr/ — samantha — 🟢 SAFE
✅ senate — /sˈɛnət/ — freedict — SAFE
✅ sentiment — /sˈɛntəmənt/ — freedict — SAFE
✅ serendipity — /sˌɛrəndˈɪpɪtiː/ — freedict — SAFE
✅ servile — /sˈɜːrvəl/ — freedict — SAFE
✅ siege — /sˈiːdʒ/ — freedict — SAFE
✅ significance — /səɡnˈɪfɪkəns/ — freedict — SAFE
✅ simultaneity — /—/ — samantha — 🟢 SAFE
✅ simultaneous — /sˌaɪməltˈeɪniːəs/ — freedict — SAFE
✅ skeptic — /skˈɛptɪk/ — freedict — SAFE
✅ skeptical — /skˈɛptəkəl/ — samantha — 🟢 SAFE
✅ solace — /sˈɑːləs/ — freedict — SAFE
✅ solemn — /sˈɑːləm/ — freedict — SAFE
✅ solicitous — /səlˈɪsətəs/ — samantha — 🟢 SAFE
✅ solidarity — /sˌɑːlədˈɛrətiː/ — samantha — 🟢 SAFE
✅ solitary — /sˈɑːlətˌɛriː/ — freedict — SAFE
✅ somewhat — /sˈʌmwˈʌt/ — freedict — SAFE
✅ soporific — /—/ — freedict — SAFE
✅ sovereign — /sˈɑːvrən/ — freedict — SAFE
✅ sovereignty — /sˈɑːvrəntiː/ — samantha — 🟢 SAFE
✅ spectrum — /spˈɛktrəm/ — samantha — 🟢 SAFE
✅ speculate — /spˈɛkjəlˌeɪt/ — samantha — 🟢 SAFE
✅ sphere — /sfˈɪr/ — freedict — SAFE
✅ spontaneous — /spɑːntˈeɪniːəs/ — freedict — SAFE
✅ spurious — /spjˈʊriːəs/ — freedict — SAFE
✅ squalid — /skwˈɑːləd/ — samantha — 🟢 SAFE
✅ stability — /stəbˈɪlɪtiː/ — freedict — SAFE
✅ stagger — /stˈæɡɜːr/ — freedict — SAFE
✅ stagnant — /stˈæɡnənt/ — freedict — SAFE
✅ stagnation — /stæɡnˈeɪʃən/ — samantha — 🟢 SAFE
✅ stake — /stˈeɪk/ — freedict — SAFE
✅ statistic — /stətˈɪstɪk/ — freedict — SAFE
✅ statute — /stˈætʃuːt/ — samantha — 🟢 SAFE
✅ stereotype — /stˈɛriːətˌaɪp/ — samantha — 🟢 SAFE
✅ stimulate — /stˈɪmjəlˌeɪt/ — freedict — SAFE
✅ stimulus — /stˈɪmjələs/ — samantha — 🟢 SAFE
✅ stipend — /stˈaɪpənd/ — freedict — SAFE
✅ stipulate — /stˈɪpjəlˌeɪt/ — freedict — SAFE
✅ stratum — /strˈætəm/ — samantha — 🟢 SAFE
✅ stringent — /strˈɪndʒənt/ — freedict — SAFE
✅ subjugation — /—/ — samantha — 🟢 SAFE
✅ subliminal — /səblˈɪmɪnəl/ — freedict — SAFE
⚠️ subordinate — /səbˈɔːrdənˌeɪt/ — samantha — 🔴 DANGER — Heteronym: /səˈbɔːr.dɪ.nət/ (noun/adj) or /səˈbɔːr.dɪ.neɪt/ (verb)
⚠️ subordination — /səbˌɔːrdənˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ subsequent — /sˈʌbsəkwənt/ — freedict — SAFE
✅ subservient — /səbsˈɜːrviːənt/ — freedict — SAFE
✅ subsidy — /sˈʌbsɪdiː/ — samantha — 🟢 SAFE
✅ subsistence — /səbsˈɪstəns/ — freedict — SAFE
✅ substance — /sˈʌbstəns/ — freedict — SAFE
✅ substantial — /səbstˈænʃəl/ — samantha — 🟢 SAFE
✅ substantiate — /səbstˈæntʃiːˌeɪt/ — samantha — 🟢 SAFE
⚠️ substantiation — /səbstˌæntʃiːˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ subterfuge — /sˈʌbtɜːrfjˌuːdʒ/ — freedict — SAFE
✅ subtle — /sˈʌtəl/ — freedict — SAFE
✅ successor — /səksˈɛsɜːr/ — freedict — SAFE
✅ succinct — /səksˈɪŋkt/ — freedict — SAFE
✅ suffrage — /sˈʌfrɪdʒ/ — freedict — SAFE
✅ summarize — /sˈʌmɜːrˌaɪz/ — freedict — SAFE
✅ superb — /sʊpˈɜːrb/ — freedict — SAFE
✅ superfluous — /sˈuːpɜːrflwˌʌs/ — freedict — SAFE
✅ suppress — /səprˈɛs/ — freedict — SAFE
✅ supreme — /səprˈiːm/ — freedict — SAFE
✅ surplus — /sˈɜːrpləs/ — samantha — 🟢 SAFE
✅ surrender — /sɜːrˈɛndɜːr/ — freedict — SAFE
⚠️ surveillance — /sɜːrvˈeɪləns/ — samantha — 🟡 WARN — French /sɚˈveɪ.ləns/
✅ sustainable — /səstˈeɪnəbəl/ — samantha — 🟢 SAFE
✅ symbiosis — /sˌɪmbaɪˈoʊsəs/ — samantha — 🟢 SAFE
✅ synthetic — /sɪnθˈɛtɪk/ — freedict — SAFE
✅ tangential — /tændʒˈɛnʃəl/ — freedict — SAFE
✅ tantamount — /tˈæntəmˌaʊnt/ — freedict — SAFE
✅ tariff — /tˈɛrəf/ — samantha — 🟢 SAFE
✅ taxonomy — /tˌæksˈɔːnəmˌiː/ — samantha — 🟢 SAFE
✅ temerity — /təmˈɛrətiː/ — freedict — SAFE
✅ temperance — /tˈɛmpɜːrəns/ — freedict — SAFE
✅ tenacity — /tənˈæsɪtiː/ — freedict — SAFE
✅ tenant — /tˈɛnənt/ — freedict — SAFE
✅ tendentious — /tˌɛndˈɛnʃəs/ — freedict — SAFE
✅ tenet — /tˈɛnət/ — samantha — 🟢 SAFE
✅ tenure — /tˈɛnjɜːr/ — freedict — SAFE
✅ tepid — /tˈɛpɪd/ — freedict — SAFE
✅ termagant — /—/ — samantha — 🟢 SAFE
✅ terminal — /tˈɜːrmənəl/ — samantha — 🟢 SAFE
✅ terrain — /tɜːrˈeɪn/ — samantha — 🟢 SAFE
✅ terse — /tˈɜːrs/ — freedict — SAFE
✅ testament — /tˈɛstəmənt/ — samantha — 🟢 SAFE
✅ testify — /tˈɛstəfˌaɪ/ — samantha — 🟢 SAFE
✅ texture — /tˈɛkstʃɜːr/ — freedict — SAFE
✅ theorem — /θˈɪrəm/ — samantha — 🟢 SAFE
✅ therapy — /θˈɛrəpiː/ — samantha — 🟢 SAFE
✅ threat — /θrˈɛt/ — freedict — SAFE
✅ timber — /tˈɪmbɜːr/ — samantha — 🟢 SAFE
✅ tirade — /taɪrˈeɪd/ — freedict — SAFE
✅ torpor — /tˈɔːrpɜːr/ — freedict — SAFE
✅ toxic — /tˈɑːksɪk/ — samantha — 🟢 SAFE
✅ tractable — /trˈæktəbəl/ — freedict — SAFE
✅ transaction — /trænzˈækʃən/ — freedict — SAFE
✅ transient — /trˈænʒənt/ — freedict — SAFE
✅ transition — /trænzˈɪʃən/ — samantha — 🟢 SAFE
✅ transmit — /trænzmˈɪt/ — freedict — SAFE
✅ trenchant — /trˈɛntʃənt/ — freedict — SAFE
✅ trepidation — /trˌɛpɪdˈeɪʃən/ — freedict — SAFE
✅ trigger — /trˈɪɡɜːr/ — samantha — 🟢 SAFE
✅ truculent — /trˈʌkjələnt/ — freedict — SAFE
✅ turbulent — /tˈɜːrbjələnt/ — freedict — SAFE
✅ twilight — /twˈaɪlˌaɪt/ — freedict — SAFE
✅ ubiquity — /juːbˈɪkwɪtiː/ — samantha — 🟢 SAFE
✅ ultimate — /ˈʌltəmət/ — freedict — SAFE
✅ umbrage — /ˈʌmbrɪdʒ/ — freedict — SAFE
✅ unctuous — /ˈʌŋtʃwəs/ — freedict — SAFE
✅ undermine — /ˈʌndɜːrmˌaɪn/ — freedict — SAFE
✅ underpinning — /ˈʌndɜːrpˌɪnɪŋ/ — samantha — 🟢 SAFE
✅ undertake — /ˈʌndɜːrtˌeɪk/ — freedict — SAFE
⚠️ unequivocal — /ˌʌnɪkwˈɪvəkəl/ — samantha — 🟡 WARN — /ˌʌn.ɪˈkwɪv.ə.kəl/
✅ unfold — /ənfˈoʊld/ — freedict — SAFE
✅ universal — /jˌuːnəvˈɜːrsəl/ — freedict — SAFE
✅ unscrupulous — /ənskrˈuːpjələs/ — samantha — 🟢 SAFE
✅ usurpation — /jˌuːsɜːrpˈeɪʃən/ — samantha — 🟢 SAFE
✅ utilitarian — /juːtˌɪlətˈɛriːən/ — samantha — 🟢 SAFE
✅ vacillate — /vˈæsəlˌeɪt/ — freedict — SAFE
✅ vapid — /vˈæpɪd/ — freedict — SAFE
✅ vegetation — /vˌɛdʒətˈeɪʃən/ — freedict — SAFE
✅ vehemence — /vˈiːəməns/ — freedict — SAFE
✅ venerate — /vˈɛnɜːrˌeɪt/ — freedict — SAFE
✅ veracious — /—/ — samantha — 🟢 SAFE
✅ verbose — /—/ — freedict — SAFE
✅ verify — /vˈɛrəfˌaɪ/ — samantha — 🟢 SAFE
✅ versus — /vˈɜːrsəs/ — freedict — SAFE
✅ vestige — /vˈɛstɪdʒ/ — samantha — 🟢 SAFE
✅ veto — /vˈiːtˌoʊ/ — freedict — SAFE
✅ via — /vˈaɪə/ — freedict — SAFE
✅ vibrate — /vˈaɪbreɪt/ — freedict — SAFE
✅ vilification — /vˌɪləfəkˈeɪʃən/ — samantha — 🟢 SAFE
✅ vindictive — /vɪndˈɪktɪv/ — freedict — SAFE
✅ virtuosity — /vɜːrtʃuːˈɑːsɪtiː/ — samantha — 🟢 SAFE
✅ vitriolic — /vˌɪtriːˈɑːlɪk/ — freedict — SAFE
✅ vociferous — /voʊsˈɪfɜːrəs/ — samantha — 🟢 SAFE
✅ volatile — /vˈɑːlətəl/ — freedict — SAFE
✅ volition — /voʊlˈɪʃən/ — freedict — SAFE
✅ wage — /wˈeɪdʒ/ — freedict — SAFE
✅ waiver — /wˈeɪvɜːr/ — samantha — 🟢 SAFE
✅ wanton — /wˈɔːntən/ — freedict — SAFE
✅ warranted — /wˈɔːrəntɪd/ — samantha — 🟢 SAFE
✅ wherewithal — /wˈɛrwɪðˌɔːl/ — freedict — SAFE
✅ withstand — /wɪθstˈænd/ — freedict — SAFE
✅ zealot — /zˈɛlət/ — samantha — 🟢 SAFE

### Level 5 (1099 words)

✅ abdicate — /ˈæbdəkˌeɪt/ — freedict — SAFE
⚠️ abiotic — /—/ — samantha — 🟡 WARN — Scientific /ˌeɪ.baɪˈɑː.tɪk/
✅ abolition — /ˌæbəlˈɪʃən/ — freedict — SAFE
✅ abolitionist — /ˌæbəlˈɪʃənəst/ — samantha — 🟢 SAFE
⚠️ abrasive — /əbrˈeɪsɪv/ — samantha — 🟡 WARN — /əˈbreɪ.sɪv/
✅ abrupt — /əbrˈʌpt/ — freedict — SAFE
✅ abscond — /æbskˈɑːnd/ — samantha — 🟢 SAFE
✅ absentee — /ˌæbsəntˈiː/ — freedict — SAFE
✅ abstain — /əbstˈeɪn/ — freedict — SAFE
✅ abysmal — /əbˈɪzməl/ — freedict — SAFE
✅ accessible — /æksˈɛsəbəl/ — freedict — SAFE
✅ acclaim — /əklˈeɪm/ — freedict — SAFE
✅ acclaimed — /əklˈeɪmd/ — samantha — 🟢 SAFE
✅ acclimate — /ˈækləmˌeɪt/ — freedict — SAFE
✅ accolade — /ˈækəlˌeɪd/ — samantha — 🟢 SAFE
✅ accomplice — /əkˈɑːmpləs/ — freedict — SAFE
✅ accountability — /əkˈaʊntəbˌɪlɪtiː/ — freedict — SAFE
✅ accountable — /əkˈaʊntəbəl/ — freedict — SAFE
✅ accountant — /əkˈaʊntənt/ — samantha — 🟢 SAFE
✅ accreditation — /əkrˌɛdətˈeɪʃən/ — freedict — SAFE
✅ accrue — /əkrˈuː/ — freedict — SAFE
✅ accusatory — /əkjˈuːzətˌɔːriː/ — samantha — 🟢 SAFE
✅ acidity — /əsˈɪdətiː/ — samantha — 🟢 SAFE
✅ acquaintance — /əkwˈeɪntəns/ — freedict — SAFE
✅ acquisition — /ˌækwəzˈɪʃən/ — samantha — 🟢 SAFE
✅ acquittal — /əkwˈɪtəl/ — samantha — 🟢 SAFE
✅ acrimonious — /ˌækrəmˈoʊniːəs/ — freedict — SAFE
✅ acute — /əkjˈuːt/ — freedict — SAFE
✅ adamant — /ˈædəmənt/ — freedict — SAFE
✅ adhesive — /ædhˈiːsɪv/ — freedict — SAFE
✅ adjoining — /ədʒˈɔɪnɪŋ/ — freedict — SAFE
✅ adjourn — /ədʒˈɜːrn/ — freedict — SAFE
✅ administer — /ədmˈɪnəstɜːr/ — freedict — SAFE
✅ admonish — /ædmˈɑːnɪʃ/ — freedict — SAFE
✅ admonition — /ˌædmənˈɪʃən/ — samantha — 🟢 SAFE
✅ adornment — /ədˈɔːrnmənt/ — samantha — 🟢 SAFE
✅ adroit — /ədrˈɔɪt/ — freedict — SAFE
✅ adversary — /ˈædvɜːrsˌɛriː/ — freedict — SAFE
✅ adverse — /ædvˈɜːrs/ — freedict — SAFE
✅ aerial — /ˈɛriːəl/ — samantha — 🟢 SAFE
✅ aesthetic — /ɛsθˈɛtɪk/ — freedict — SAFE
✅ affable — /ˈæfəbəl/ — freedict — SAFE
✅ affidavit — /ˌæfədˈeɪvət/ — freedict — SAFE
✅ affiliation — /əfˌɪliːˈeɪʃən/ — samantha — 🟢 SAFE
✅ affirmation — /ˌæfɜːrmˈeɪʃən/ — freedict — SAFE
✅ affirmative — /əfˈɜːrmətɪv/ — freedict — SAFE
✅ affluent — /ˈæfluːənt/ — samantha — 🟢 SAFE
✅ afoot — /əfˈʊt/ — samantha — 🟢 SAFE
✅ aggravate — /ˈæɡrəvˌeɪt/ — freedict — SAFE
✅ agile — /ˈædʒəl/ — freedict — SAFE
✅ agnostic — /æɡnˈɑːstɪk/ — freedict — SAFE
✅ agonize — /ˈæɡənˌaɪz/ — freedict — SAFE
✅ ailment — /ˈeɪlmənt/ — freedict — SAFE
✅ aisle — /ˈaɪl/ — freedict — SAFE
✅ alacrity — /əlˈækrətiː/ — freedict — SAFE
✅ albeit — /ɔːlbˈiːɪt/ — freedict — SAFE
✅ algebra — /ˈældʒəbrə/ — freedict — SAFE
✅ allay — /əlˈeɪ/ — freedict — SAFE
✅ allegation — /ˌæləɡˈeɪʃən/ — freedict — SAFE
✅ allegory — /ˈæləɡˌɔːriː/ — freedict — SAFE
✅ alleviate — /əlˈiːviːˌeɪt/ — freedict — SAFE
✅ alliteration — /əlˈɪtɜːrˌeɪʃən/ — freedict — SAFE
✅ allude — /əlˈuːd/ — freedict — SAFE
✅ almanac — /ˈɑːlmənˌæk/ — samantha — 🟢 SAFE
✅ aloof — /əlˈuːf/ — samantha — 🟢 SAFE
✅ altruism — /ˈæltruːˌɪzəm/ — samantha — 🟢 SAFE
✅ altruistic — /ˌɔːltruːˈɪstɪk/ — freedict — SAFE
✅ amalgam — /əmˈælɡəm/ — freedict — SAFE
✅ amalgamate — /əmˈælɡəmˌeɪt/ — freedict — SAFE
✅ ambassador — /æmbˈæsədɜːr/ — samantha — 🟢 SAFE
✅ ambiguity — /ˌæmbɪɡjˈuːətiː/ — freedict — SAFE
✅ ambivalent — /æmbˈɪvələnt/ — freedict — SAFE
✅ amenable — /əmˈɛnəbəl/ — samantha — 🟢 SAFE
✅ amenity — /əmˈɛnətiː/ — freedict — SAFE
✅ amicable — /ˈæmɪkəbəl/ — freedict — SAFE
✅ amicably — /ˈæmɪkəbliː/ — samantha — 🟢 SAFE
✅ ammunition — /ˌæmjənˈɪʃən/ — freedict — SAFE
✅ amnesty — /ˈæmnəstiː/ — samantha — 🟢 SAFE
✅ amorphous — /əmˈɔːrfəs/ — freedict — SAFE
✅ amphitheater — /ˈæmfəθiːˈeɪtɜːr/ — samantha — 🟢 SAFE
✅ analogy — /ənˈælədʒiː/ — freedict — SAFE
✅ anarchist — /ˈænɜːrkˌɪst/ — samantha — 🟢 SAFE
✅ anatomy — /ənˈætəmiː/ — freedict — SAFE
✅ anecdotal — /ˌænəkdˈoʊtəl/ — samantha — 🟢 SAFE
✅ anguish — /ˈæŋɡwɪʃ/ — freedict — SAFE
✅ animated — /ˈænəmˌeɪtɪd/ — samantha — 🟢 SAFE
✅ animation — /ˌænəmˈeɪʃən/ — freedict — SAFE
✅ annex — /ˈænˌɛks/ — freedict — SAFE
✅ annotate — /ˈænətˌeɪt/ — samantha — 🟢 SAFE
✅ annuity — /ənˈuːətiː/ — samantha — 🟢 SAFE
✅ anomaly — /ənˈɑːməliː/ — freedict — SAFE
✅ antagonist — /æntˈæɡənəst/ — freedict — SAFE
✅ anthology — /ænθˈɑːlədʒiː/ — samantha — 🟢 SAFE
✅ antidote — /ˈæntɪdˌoʊt/ — samantha — 🟢 SAFE
✅ antipathy — /æntˈɪpəθiː/ — samantha — 🟢 SAFE
✅ antiquity — /æntˈɪkwətiː/ — freedict — SAFE
✅ apathetic — /ˌæpəθˈɛtɪk/ — samantha — 🟢 SAFE
✅ apathy — /ˈæpəθiː/ — freedict — SAFE
✅ aplomb — /əplˈɑːm/ — freedict — SAFE
✅ apparel — /əpˈærəl/ — freedict — SAFE
✅ appease — /əpˈiːz/ — samantha — 🟢 SAFE
✅ appendix — /əpˈɛndɪks/ — freedict — SAFE
✅ apportion — /əpˈɔːrʃən/ — samantha — 🟢 SAFE
✅ appraise — /əprˈeɪz/ — samantha — 🟢 SAFE
✅ apprehend — /ˌæprɪhˈɛnd/ — freedict — SAFE
✅ apprehensive — /ˌæprɪhˈɛnsɪv/ — samantha — 🟢 SAFE
⚠️ appropriation — /əprˌoʊpriːˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ apt — /ˈæpt/ — freedict — SAFE
✅ aqueduct — /ˈækwədˌʌkt/ — freedict — SAFE
✅ arable — /ˈærəbəl/ — samantha — 🟢 SAFE
✅ arbitrate — /ˈɑːrbətrˌeɪt/ — samantha — 🟢 SAFE
✅ arcade — /ɑːrkˈeɪd/ — samantha — 🟢 SAFE
✅ archaic — /ɑːrkˈeɪɪk/ — freedict — SAFE
✅ ardent — /ˈɑːrdənt/ — freedict — SAFE
✅ arduous — /ˈɑːrdʒuːəs/ — freedict — SAFE
✅ aristocracy — /ˌɛrəstˈɑːkrəsiː/ — freedict — SAFE
✅ aristocrat — /ɜːrˈɪstəkrˌæt/ — samantha — 🟢 SAFE
✅ arithmetic — /ˌɛrɪθmˈɛtɪk/ — samantha — 🟢 SAFE
✅ armada — /ɑːrmˈɑːdə/ — samantha — 🟢 SAFE
✅ armament — /ˈɑːrməmənt/ — samantha — 🟢 SAFE
✅ armistice — /ˈɑːrməstəs/ — freedict — SAFE
✅ articulation — /ˌɑːrtɪkjəlˈeɪʃən/ — freedict — SAFE
✅ artisan — /ˈɑːrtəzən/ — samantha — 🟢 SAFE
✅ ascend — /əsˈɛnd/ — freedict — SAFE
✅ ascendancy — /əsˈɛndənsiː/ — samantha — 🟢 SAFE
✅ ascertain — /ˌæsɜːrtˈeɪn/ — freedict — SAFE
✅ aspirant — /ˈæspɜːrənt/ — samantha — 🟢 SAFE
✅ aspiration — /ˌæspɜːrˈeɪʃən/ — samantha — 🟢 SAFE
✅ assailant — /əsˈeɪlənt/ — samantha — 🟢 SAFE
✅ assertion — /əsˈɜːrʃən/ — freedict — SAFE
✅ assertive — /əsˈɜːrtɪv/ — samantha — 🟢 SAFE
✅ assimilate — /əsˈɪməlˌeɪt/ — freedict — SAFE
✅ astonish — /əstˈɑːnɪʃ/ — freedict — SAFE
✅ astronaut — /ˈæstrənˌɑːt/ — freedict — SAFE
✅ astronomy — /əstrˈɑːnəmiː/ — freedict — SAFE
✅ astute — /əstˈuːt/ — samantha — 🟢 SAFE
✅ asylum — /əsˈaɪləm/ — freedict — SAFE
✅ atrocity — /ətrˈɑːsətiː/ — freedict — SAFE
✅ atrophy — /ˈætrəfiː/ — samantha — 🟢 SAFE
✅ attic — /ˈætɪk/ — samantha — 🟢 SAFE
⚠️ attribute — /ˈætrəbjˌuːt/ — samantha — 🔴 DANGER — Heteronym: /ˈæt.rɪ.bjuːt/ (noun) or /əˈtrɪb.juːt/ (verb)
✅ attrition — /ətrˈɪʃən/ — samantha — 🟢 SAFE
✅ audacity — /ɑːdˈæsətiː/ — freedict — SAFE
✅ audible — /ˈɑːdəbəl/ — samantha — 🟢 SAFE
✅ audit — /ˈɔːdɪt/ — freedict — SAFE
✅ augment — /ɔːɡmˈɛnt/ — freedict — SAFE
✅ auspicious — /ɑːspˈɪʃəs/ — freedict — SAFE
✅ austere — /ɔːstˈɪr/ — freedict — SAFE
✅ authenticate — /ɔːθˈɛntəkˌeɪt/ — samantha — 🟢 SAFE
✅ authoritarian — /əθˌɔːrətˈɛriːən/ — freedict — SAFE
⚠️ authoritative — /əθˈɔːrətˌeɪtɪv/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ autocracy — /ɔːtˈɑːkrəsiː/ — samantha — 🟢 SAFE
✅ automation — /ɔːtəmˈeɪʃən/ — samantha — 🟢 SAFE
✅ autonomy — /ɔːtˈɑːnəmiː/ — freedict — SAFE
✅ avarice — /ˈævɜːrəs/ — freedict — SAFE
✅ aversion — /əvˈɜːrʒən/ — samantha — 🟢 SAFE
✅ avert — /əvˈɜːrt/ — freedict — SAFE
✅ avid — /ˈævəd/ — samantha — 🟢 SAFE
✅ axiom — /ˈæksiːəm/ — freedict — SAFE
✅ bachelor — /bˈætʃəlɜːr/ — freedict — SAFE
✅ bailiff — /bˈeɪləf/ — freedict — SAFE
✅ ballad — /bˈæləd/ — freedict — SAFE
✅ banal — /bənˈɑːl/ — freedict — SAFE
✅ bandwidth — /bˈændwɪdθ/ — samantha — 🟢 SAFE
✅ bankruptcy — /bˈæŋkrəpsiː/ — samantha — 🟢 SAFE
✅ barometer — /bɜːrˈɑːmɪtɜːr/ — freedict — SAFE
✅ barricade — /bˈærəkˌeɪd/ — freedict — SAFE
✅ bazaar — /bəzˈɑːr/ — freedict — SAFE
✅ belie — /bɪlˈaɪ/ — freedict — SAFE
✅ bellicose — /bˈɛləkˌoʊs/ — freedict — SAFE
✅ belligerent — /bəlˈɪdʒɜːrənt/ — freedict — SAFE
✅ benevolence — /bənˈɛvələns/ — samantha — 🟢 SAFE
✅ benevolent — /bənˈɛvələnt/ — samantha — 🟢 SAFE
✅ benign — /bɪnˈaɪn/ — freedict — SAFE
✅ berate — /bɪrˈeɪt/ — samantha — 🟢 SAFE
✅ bereft — /bɜːrˈɛft/ — freedict — SAFE
✅ besiege — /bɪsˈiːdʒ/ — samantha — 🟢 SAFE
✅ bewilder — /bɪwˈɪldɜːr/ — freedict — SAFE
✅ bibliography — /bˌɪbliːˈɑːɡrəfiː/ — samantha — 🟢 SAFE
✅ biennial — /baɪˈɛniːəl/ — freedict — SAFE
✅ bilingual — /baɪlˈɪŋɡwəl/ — samantha — 🟢 SAFE
⚠️ biodegradable — /bˌaɪoʊdəɡrˈeɪdəbəl/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ biodiversity — /bˌaɪoʊdaɪvˈɜːrsətiː/ — samantha — 🟢 SAFE
✅ bipartisan — /baɪpˈɑːrtɪzən/ — samantha — 🟢 SAFE
✅ bisect — /—/ — samantha — 🟢 SAFE
✅ blatant — /blˈeɪtənt/ — freedict — SAFE
✅ blemish — /blˈɛmɪʃ/ — freedict — SAFE
✅ blight — /blˈaɪt/ — samantha — 🟢 SAFE
✅ bliss — /blˈɪs/ — samantha — 🟢 SAFE
✅ blithe — /blˈaɪð/ — freedict — SAFE
✅ bloc — /blˈɑːk/ — freedict — SAFE
✅ blockade — /blˌɑːkˈeɪd/ — freedict — SAFE
✅ bombard — /bɑːmbˈɑːrd/ — freedict — SAFE
✅ bombastic — /bɑːmbˈæstɪk/ — freedict — SAFE
✅ botanical — /bətˈænɪkəl/ — freedict — SAFE
✅ bounty — /bˈaʊntiː/ — freedict — SAFE
✅ bouquet — /buːkˈeɪ/ — freedict — SAFE
✅ bowstring — /—/ — samantha — 🟢 SAFE
✅ brandish — /brˈændɪʃ/ — freedict — SAFE
✅ bravado — /brəvˈɑːdoʊ/ — samantha — 🟢 SAFE
✅ brazen — /brˈeɪzən/ — freedict — SAFE
✅ brevity — /brˈɛvətiː/ — freedict — SAFE
✅ brigade — /brəɡˈeɪd/ — freedict — SAFE
✅ brigand — /—/ — freedict — SAFE
✅ brink — /brˈɪŋk/ — samantha — 🟢 SAFE
✅ buoyant — /bˈɔɪənt/ — samantha — 🟢 SAFE
✅ bureaucrat — /bjˈʊrəkrˌæt/ — samantha — 🟢 SAFE
✅ bureaucratic — /bjˌʊrəkrˈætɪk/ — samantha — 🟢 SAFE
✅ caffeine — /kæfˈiːn/ — freedict — SAFE
✅ calamity — /kəlˈæmətiː/ — freedict — SAFE
✅ caliber — /kˈæləbɜːr/ — samantha — 🟢 SAFE
✅ calligraphy — /kəlˈɪɡrəfiː/ — samantha — 🟢 SAFE
✅ callous — /kˈæləs/ — samantha — 🟢 SAFE
✅ candid — /kˈændəd/ — freedict — SAFE
✅ capitalism — /kˈæpɪtəlˌɪzəm/ — samantha — 🟢 SAFE
✅ capitalize — /kˈæpətəlˌaɪz/ — samantha — 🟢 SAFE
✅ capitulate — /kəpˈɪtʃuːlɪt/ — freedict — SAFE
✅ capricious — /kəprˈɪʃəs/ — samantha — 🟢 SAFE
✅ captivating — /kˈæptɪvˌeɪtɪŋ/ — freedict — SAFE
✅ captivity — /kæptˈɪvətiː/ — samantha — 🟢 SAFE
✅ caravan — /kˈærəvˌæn/ — freedict — SAFE
✅ cardinal — /kˈɑːrdənəl/ — freedict — SAFE
⚠️ cardiovascular — /kˌɑːrdiːoʊvˈæskjəlɜːr/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ cascade — /kæskˈeɪd/ — freedict — SAFE
✅ casualty — /kˈæʒəwəltiː/ — freedict — SAFE
✅ catastrophic — /kˌætəstrˈɑːfɪk/ — samantha — 🟢 SAFE
✅ caustic — /kˈɑːstɪk/ — freedict — SAFE
✅ cavalier — /kˌævəlˈɪr/ — freedict — SAFE
✅ cavalry — /kˈævəlriː/ — freedict — SAFE
✅ caveat — /kˈeɪviːˌæt/ — freedict — SAFE
✅ cede — /sˈiːd/ — freedict — SAFE
✅ censorship — /sˈɛnsɜːrʃˌɪp/ — samantha — 🟢 SAFE
✅ censure — /sˈɛnʃɜːr/ — freedict — SAFE
✅ centennial — /sɛntˈɛniːəl/ — freedict — SAFE
✅ centrifugal — /sˈɛntrɪfjˌuːɡəl/ — samantha — 🟢 SAFE
✅ cessation — /sˌɛsˈeɪʃən/ — freedict — SAFE
✅ chaotic — /keɪˈɑːtɪk/ — freedict — SAFE
✅ charisma — /kɜːrˈɪzmə/ — samantha — 🟢 SAFE
✅ charlatan — /ʃˈɑːrlətən/ — freedict — SAFE
✅ chivalry — /ʃˈɪvəlriː/ — samantha — 🟢 SAFE
✅ chronological — /krˌɑːnəlˈɑːdʒɪkəl/ — freedict — SAFE
✅ circa — /sˈɜːrkə/ — samantha — 🟢 SAFE
✅ circumference — /sˌɜːrkˈʌmfrəns/ — freedict — SAFE
✅ circumnavigate — /sˌɜːrkəmnˈævəɡˌeɪt/ — freedict — SAFE
✅ circumscribe — /sˌɜːrkəmskrˈaɪb/ — freedict — SAFE
✅ circumspect — /sˈɜːrkəmspˌɛkt/ — freedict — SAFE
✅ circumvent — /sˌɜːrkəmvˈɛnt/ — samantha — 🟢 SAFE
✅ citizenship — /sˈɪtɪzənʃˌɪp/ — samantha — 🟢 SAFE
✅ civilian — /səvˈɪljən/ — freedict — SAFE
✅ clamber — /klˈæmbɜːr/ — freedict — SAFE
✅ clamor — /klˈæmɜːr/ — freedict — SAFE
✅ clandestine — /klændˈɛstɪn/ — freedict — SAFE
⚠️ clarification — /klˌɛrəfəkˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ clemency — /klˈɛmənsiː/ — freedict — SAFE
✅ cliche — /kliːʃˈeɪ/ — freedict — SAFE
✅ clientele — /klˌaɪəntˈɛl/ — samantha — 🟢 SAFE
✅ clockwise — /klˈɑːkwˌaɪz/ — freedict — SAFE
✅ clout — /klˈaʊt/ — freedict — SAFE
✅ coalesce — /kˌoʊəlˈɛs/ — freedict — SAFE
✅ coax — /kˈoʊks/ — samantha — 🟢 SAFE
✅ coerce — /koʊˈɜːrs/ — freedict — SAFE
✅ coexist — /kˌoʊəɡzˈɪst/ — freedict — SAFE
✅ coffer — /kˈɔːfɜːr/ — freedict — SAFE
✅ cogent — /kˈoʊdʒənt/ — freedict — SAFE
✅ cognition — /kɑːɡnˈɪʃən/ — freedict — SAFE
✅ coherence — /koʊhˈɪrəns/ — samantha — 🟢 SAFE
✅ coincidence — /koʊˈɪnsɪdəns/ — freedict — SAFE
✅ collateral — /kəlˈætɜːrəl/ — freedict — SAFE
✅ colleague — /kˈɑːliːɡ/ — freedict — SAFE
✅ colonialism — /kəlˈoʊniːəlˌɪzəm/ — samantha — 🟢 SAFE
✅ colossal — /kəlˈɑːsəl/ — freedict — SAFE
✅ combustion — /kəmbˈʌstʃən/ — freedict — SAFE
⚠️ commemoration — /kəmˌɛmɜːrˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ commencement — /kəmˈɛnsmənt/ — freedict — SAFE
✅ commensurate — /kəmˈɛnsɜːrət/ — samantha — 🟢 SAFE
✅ commodore — /kˈɑːmədˌɔːr/ — freedict — SAFE
✅ communal — /kəmjˈuːnəl/ — freedict — SAFE
✅ communism — /kˈɑːmjənˌɪzəm/ — samantha — 🟢 SAFE
✅ comparable — /kˈɑːmpɜːrəbəl/ — samantha — 🟢 SAFE
✅ compendium — /kəmpˈɛndiːəm/ — freedict — SAFE
✅ competence — /kˈɑːmpətɪns/ — samantha — 🟢 SAFE
✅ competent — /kˈɑːmpətɪnt/ — freedict — SAFE
✅ complacency — /kəmplˈeɪsənsiː/ — samantha — 🟢 SAFE
✅ complacent — /kəmplˈeɪsənt/ — freedict — SAFE
⚠️ complementary — /kˌɑːmpləmˈɛntriː/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ compliance — /kəmplˈaɪəns/ — freedict — SAFE
✅ complication — /kˌɑːmpləkˈeɪʃən/ — samantha — 🟢 SAFE
✅ compliment — /kˈɑːmpləmɛnt/ — freedict — SAFE
✅ comport — /kəmpˈɔːrt/ — freedict — SAFE
✅ composure — /kəmpˈoʊʒɜːr/ — samantha — 🟢 SAFE
✅ comprise — /kəmprˈaɪz/ — freedict — SAFE
✅ concession — /kənsˈɛʃən/ — samantha — 🟢 SAFE
✅ conciliatory — /kənsˈɪlˌiːətˌɔːriː/ — freedict — SAFE
✅ concise — /kənsˈaɪs/ — freedict — SAFE
✅ conclusive — /kənklˈuːsɪv/ — samantha — 🟢 SAFE
✅ concord — /kˈɑːnkˌɔːrd/ — freedict — SAFE
✅ concurrent — /kənkˈɜːrənt/ — freedict — SAFE
✅ condemnation — /kˌɑːndəmnˈeɪʃən/ — samantha — 🟢 SAFE
✅ condense — /kəndˈɛns/ — freedict — SAFE
✅ condescending — /kˌɑːndɪsˈɛndɪŋ/ — freedict — SAFE
✅ condolence — /kəndˈoʊləns/ — freedict — SAFE
✅ condone — /kəndˈoʊn/ — samantha — 🟢 SAFE
✅ conducive — /kəndˈuːsɪv/ — samantha — 🟢 SAFE
✅ confederacy — /kənfˈɛdɜːrəsiː/ — samantha — 🟢 SAFE
✅ confer — /kənfˈɜːr/ — freedict — SAFE
✅ confiscate — /kˈɑːnfəskˌeɪt/ — freedict — SAFE
✅ confluence — /kˈɑːnfluːəns/ — samantha — 🟢 SAFE
✅ congenial — /kəndʒˈiːnjəl/ — samantha — 🟢 SAFE
✅ conglomerate — /kənɡlˈɑːmɜːrət/ — freedict — SAFE
✅ congregate — /kˈɑːŋɡrəɡˌeɪt/ — freedict — SAFE
✅ conjecture — /kəndʒˈɛktʃɜːr/ — freedict — SAFE
✅ conjunction — /kəndʒˈʌŋkʃən/ — freedict — SAFE
✅ connive — /kənˈaɪv/ — freedict — SAFE
✅ conquest — /kˈɑːŋkwɛst/ — freedict — SAFE
✅ conscientious — /kˌɑːnʃiːˈɛnʃəs/ — freedict — SAFE
✅ conscription — /kənskrˈɪpʃən/ — samantha — 🟢 SAFE
✅ consecrate — /kˈɑːnsəkrˌeɪt/ — freedict — SAFE
⚠️ consequential — /kˌɑːnsəkwˈɛnʃəl/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ conservatory — /kənsˈɜːrvətɔːriː/ — samantha — 🟢 SAFE
✅ consign — /kənsˈaɪn/ — samantha — 🟢 SAFE
⚠️ consolidation — /kənsˌɑːlədˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ conspiracy — /kənspˈɪrəsiː/ — freedict — SAFE
✅ conspire — /kənspˈaɪɜːr/ — samantha — 🟢 SAFE
✅ constituency — /kənstˈɪtʃuːənsiː/ — samantha — 🟢 SAFE
✅ constituent — /kənstˈɪtʃuːənt/ — freedict — SAFE
✅ constitutional — /kˌɑːnstətˈuːʃənəl/ — freedict — SAFE
✅ construe — /kənstrˈuː/ — samantha — 🟢 SAFE
✅ consultation — /kˌɑːnsəltˈeɪʃən/ — freedict — SAFE
✅ consummate — /kˈɑːnsəmət/ — samantha — 🟢 SAFE
✅ contagious — /kəntˈeɪdʒəs/ — samantha — 🟢 SAFE
✅ containment — /kəntˈeɪnmənt/ — samantha — 🟢 SAFE
✅ contemplation — /kˌɑːntəmplˈeɪʃən/ — freedict — SAFE
✅ contentious — /kəntˈɛnʃəs/ — freedict — SAFE
✅ contingency — /kəntˈɪndʒənsiː/ — samantha — 🟢 SAFE
✅ continuity — /kˌɑːntənˈuːətiː/ — freedict — SAFE
✅ contraband — /kˈɑːntrəbˌænd/ — samantha — 🟢 SAFE
✅ contractor — /kˈɑːntrˌæktɜːr/ — samantha — 🟢 SAFE
⚠️ contradiction — /kˌɑːntrədˈɪkʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ contrite — /kəntrˈaɪt/ — freedict — SAFE
✅ conundrum — /kənˈʌndrəm/ — freedict — SAFE
✅ convalesce — /kˌɑːnvəlˈɛs/ — freedict — SAFE
✅ converge — /kənvˈɜːrdʒ/ — samantha — 🟢 SAFE
✅ conversion — /kənvˈɜːrʒən/ — freedict — SAFE
⚠️ convict — /kˈɑːnvɪkt/ — samantha — 🔴 DANGER — Heteronym: /ˈkɑːn.vɪkt/ (noun) or /kənˈvɪkt/ (verb)
✅ copious — /kˈoʊpiːəs/ — samantha — 🟢 SAFE
✅ copse — /—/ — samantha — 🟢 SAFE
✅ copyright — /kˈɑːpiːrˌaɪt/ — freedict — SAFE
✅ coral — /kˈɔːrəl/ — freedict — SAFE
✅ cordial — /kˈɔːrdʒəl/ — freedict — SAFE
✅ coronation — /kˌɔːrənˈeɪʃən/ — samantha — 🟢 SAFE
✅ corporal — /kˈɔːrpɜːrəl/ — freedict — SAFE
✅ correlate — /kˈɔːrəlˌeɪt/ — samantha — 🟢 SAFE
✅ corridor — /kˈɔːrədɜːr/ — freedict — SAFE
✅ corroborate — /kɜːrˈɑːbɜːrˌeɪt/ — freedict — SAFE
✅ corrode — /kɜːrˈoʊd/ — samantha — 🟢 SAFE
✅ corrosive — /kɜːrˈoʊsɪv/ — samantha — 🟢 SAFE
✅ cosmopolitan — /kˌɑːzməpˈɑːlətən/ — freedict — SAFE
✅ counterfeit — /kˈaʊntɜːrfˌɪt/ — freedict — SAFE
⚠️ coup — /kˈuː/ — samantha — 🔴 DANGER — French: /kuː/ — silent p
✅ covert — /kˈoʊvɜːrt/ — freedict — SAFE
✅ credential — /krɪdˈɛnʃəl/ — samantha — 🟢 SAFE
✅ credulous — /krˈɛdʒələs/ — samantha — 🟢 SAFE
✅ creed — /krˈiːd/ — freedict — SAFE
✅ crescendo — /krɪʃˈɛndoʊ/ — freedict — SAFE
✅ crimson — /krˈɪmzən/ — samantha — 🟢 SAFE
✅ critique — /krətˈiːk/ — freedict — SAFE
✅ crucible — /krˈuːsəbəl/ — samantha — 🟢 SAFE
✅ cryptic — /krˈɪptɪk/ — samantha — 🟢 SAFE
✅ culminate — /kˈʌlmɪnˌeɪt/ — freedict — SAFE
✅ culpable — /kˈʌlpəbəl/ — freedict — SAFE
✅ culprit — /kˈʌlprɪt/ — freedict — SAFE
✅ curtail — /kɜːrtˈeɪl/ — freedict — SAFE
✅ cynical — /sˈɪnɪkəl/ — freedict — SAFE
✅ daunting — /dˈɔːntɪŋ/ — freedict — SAFE
✅ dazzle — /dˈæzəl/ — freedict — SAFE
✅ dearth — /dˈɜːrθ/ — freedict — SAFE
✅ debacle — /dəbˈɑːkəl/ — freedict — SAFE
✅ debilitate — /dəbˈɪlətˌeɪt/ — samantha — 🟢 SAFE
✅ debut — /deɪbjˈuː/ — freedict — SAFE
✅ deceit — /dəsˈiːt/ — freedict — SAFE
✅ decimate — /dˈɛsəmˌeɪt/ — samantha — 🟢 SAFE
✅ decisive — /dɪsˈaɪsɪv/ — samantha — 🟢 SAFE
✅ declaration — /dˌɛklɜːrˈeɪʃən/ — freedict — SAFE
✅ decorum — /dɪkˈɔːrəm/ — samantha — 🟢 SAFE
✅ decree — /dɪkrˈiː/ — freedict — SAFE
✅ decry — /dɪkrˈaɪ/ — samantha — 🟢 SAFE
✅ deduce — /dɪdˈuːs/ — freedict — SAFE
✅ deem — /dˈiːm/ — freedict — SAFE
✅ defamation — /dˌɛfəmˈeɪʃən/ — samantha — 🟢 SAFE
✅ default — /dɪfˈɔːlt/ — freedict — SAFE
✅ defer — /dɪfˈɜːr/ — freedict — SAFE
✅ defiance — /dɪfˈaɪəns/ — freedict — SAFE
✅ definitive — /dɪfˈɪnɪtɪv/ — samantha — 🟢 SAFE
⚠️ deforestation — /dɪfˌɔːrɪstˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ defunct — /dɪfˈʌŋkt/ — freedict — SAFE
✅ degradation — /dˌɛɡrədˈeɪʃən/ — freedict — SAFE
✅ deliberation — /dɪlˌɪbɜːrˈeɪʃən/ — samantha — 🟢 SAFE
✅ delicacy — /dˈɛləkəsiː/ — freedict — SAFE
✅ delineate — /dɪlˈɪniːˌeɪt/ — samantha — 🟢 SAFE
✅ delinquent — /dɪlˈɪŋkwənt/ — freedict — SAFE
✅ delude — /dɪlˈuːd/ — freedict — SAFE
✅ deluge — /dˈɛljuːdʒ/ — freedict — SAFE
✅ demagogue — /dˈɛməɡˌɑːɡ/ — freedict — SAFE
✅ demeanor — /dɪmˈiːnɜːr/ — freedict — SAFE
✅ demolish — /dɪmˈɑːlɪʃ/ — freedict — SAFE
✅ denomination — /dɪnˌɔːmənˈeɪʃən/ — samantha — 🟢 SAFE
✅ denouncement — /—/ — samantha — 🟢 SAFE
✅ depiction — /dɪpˈɪkʃən/ — samantha — 🟢 SAFE
✅ depleted — /dɪplˈiːtɪd/ — samantha — 🟢 SAFE
✅ depletion — /dɪplˈiːʃən/ — samantha — 🟢 SAFE
✅ deplore — /dɪplˈɔːr/ — samantha — 🟢 SAFE
✅ deportation — /dˌiːpɔːrtˈeɪʃən/ — samantha — 🟢 SAFE
✅ deprecate — /dˈɛprəkˌeɪt/ — samantha — 🟢 SAFE
✅ depreciate — /dɪprˈiːʃiːˌeɪt/ — freedict — SAFE
✅ deprivation — /dˌɛprəvˈeɪʃən/ — samantha — 🟢 SAFE
✅ derelict — /dˈɛrəlˌɪkt/ — freedict — SAFE
✅ derogatory — /dɜːrˈɑːɡətˌɔːriː/ — samantha — 🟢 SAFE
⚠️ desegregation — /dɪsˌɛɡrəɡˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ desiccate — /dˈɛsəkeɪt/ — freedict — SAFE
✅ designation — /dˌɛzəɡnˈeɪʃən/ — freedict — SAFE
✅ desolate — /dˈɛsələt/ — freedict — SAFE
✅ despair — /dɪspˈɛr/ — freedict — SAFE
✅ despot — /dˈɛspət/ — freedict — SAFE
✅ despotism — /dˈɛspətˌɪzəm/ — freedict — SAFE
✅ destitute — /dˈɛstətˌuːt/ — freedict — SAFE
✅ deterrent — /dɪtˈɜːrrənt/ — samantha — 🟢 SAFE
✅ detonate — /dˈɛtənˌeɪt/ — samantha — 🟢 SAFE
✅ detrimental — /dˌɛtrəmˈɛntəl/ — samantha — 🟢 SAFE
✅ devastation — /dˌɛvəstˈeɪʃən/ — freedict — SAFE
✅ devious — /dˈiːviːəs/ — samantha — 🟢 SAFE
✅ devise — /dɪvˈaɪz/ — freedict — SAFE
✅ devout — /dɪvˈaʊt/ — freedict — SAFE
✅ dexterity — /dɛkstˈɛrətiː/ — freedict — SAFE
✅ dialect — /dˈaɪəlˌɛkt/ — freedict — SAFE
✅ dichotomy — /daɪkˈɑːtəmiː/ — freedict — SAFE
✅ dictator — /dɪktˈeɪtɜːr/ — freedict — SAFE
✅ didactic — /daɪdˈæktɪk/ — freedict — SAFE
✅ diffident — /—/ — samantha — 🟢 SAFE
✅ diffuse — /dɪfjˈuːs/ — freedict — SAFE
✅ digression — /daɪɡrˈɛʃən/ — samantha — 🟢 SAFE
✅ dilapidated — /dəlˈæpədˌeɪtɪd/ — freedict — SAFE
✅ diligence — /dˈɪlədʒəns/ — samantha — 🟢 SAFE
✅ diminutive — /dɪmˈɪnjətɪv/ — freedict — SAFE
✅ diplomatic — /dˌɪpləmˈætɪk/ — freedict — SAFE
✅ dirge — /dˈɜːrdʒ/ — freedict — SAFE
✅ disarmament — /dɪsˈɑːrməmənt/ — samantha — 🟢 SAFE
✅ discern — /dɪsˈɜːrn/ — samantha — 🟢 SAFE
✅ disclaimer — /dɪsklˈeɪmɜːr/ — freedict — SAFE
✅ discrepancy — /dɪskrˈɛpənsiː/ — freedict — SAFE
✅ discriminate — /dɪskrˈɪmənˌeɪt/ — samantha — 🟢 SAFE
✅ disdain — /dɪsdˈeɪn/ — freedict — SAFE
✅ disembark — /dɪsɛmbˈɑːrk/ — freedict — SAFE
✅ dismantle — /dɪsmˈæntəl/ — samantha — 🟢 SAFE
✅ dismay — /dɪsmˈeɪ/ — freedict — SAFE
✅ dismissal — /dɪsmˈɪsəl/ — freedict — SAFE
✅ disparate — /dˈɪspɜːrɪt/ — freedict — SAFE
✅ disparity — /dɪspˈɛrətiː/ — samantha — 🟢 SAFE
✅ dispatch — /dɪspˈætʃ/ — freedict — SAFE
✅ displace — /dɪsplˈeɪs/ — samantha — 🟢 SAFE
✅ disposable — /dɪspˈoʊzəbəl/ — samantha — 🟢 SAFE
✅ disseminate — /dɪsˈɛmənˌeɪt/ — freedict — SAFE
✅ dissident — /dˈɪsədənt/ — freedict — SAFE
✅ dissipate — /dˈɪsəpˌeɪt/ — freedict — SAFE
✅ dissolution — /dˌɪsəlˈuːʃən/ — freedict — SAFE
✅ distinction — /dɪstˈɪŋkʃən/ — freedict — SAFE
✅ diverge — /dɪvˈɜːrdʒ/ — samantha — 🟢 SAFE
✅ diversity — /dɪvˈɜːrsɪtiː/ — freedict — SAFE
✅ divert — /daɪvˈɜːrt/ — freedict — SAFE
✅ docile — /dˈɑːsəl/ — freedict — SAFE
✅ domesticate — /dəmˈɛstəkˌeɪt/ — freedict — SAFE
✅ dominance — /dˈɑːmənəns/ — samantha — 🟢 SAFE
✅ dominion — /dəmˈɪnjən/ — freedict — SAFE
✅ dormitory — /dˈɔːrmətˌɔːriː/ — samantha — 🟢 SAFE
✅ dossier — /dˌɔːsjˈeɪ/ — samantha — 🟢 SAFE
✅ dubious — /dˈuːbiːəs/ — freedict — SAFE
✅ duplicity — /duːplˈɪsɪtiː/ — samantha — 🟢 SAFE
✅ dweller — /dwˈɛlɜːr/ — samantha — 🟢 SAFE
✅ ebbing — /ˈɛbɪŋ/ — freedict — SAFE
✅ echelon — /ˈɛʃəlˌɑːn/ — freedict — SAFE
✅ edict — /ˈiːdɪkt/ — freedict — SAFE
✅ edifice — /ˈɛdəfəs/ — freedict — SAFE
✅ edify — /ˈɛdəfˌaɪ/ — freedict — SAFE
✅ efface — /ɪfˈeɪs/ — samantha — 🟢 SAFE
✅ efficacy — /ˈɛfɪkˌæsiː/ — samantha — 🟢 SAFE
✅ egalitarian — /ɪɡˌælətˈɛriːən/ — freedict — SAFE
✅ egregious — /ɪɡrˈiːdʒəs/ — freedict — SAFE
✅ electorate — /ɪlˈɛktɜːrət/ — freedict — SAFE
✅ elicit — /ɪlˈɪsɪt/ — freedict — SAFE
✅ elite — /ɪlˈiːt/ — samantha — 🟢 SAFE
✅ eloquence — /ˈɛləkwəns/ — freedict — SAFE
✅ elusive — /ɪlˈuːsɪv/ — freedict — SAFE
✅ emaciated — /ɪmˈeɪʃiːˌeɪtɪd/ — freedict — SAFE
✅ emancipate — /ɪmˈænsəpˌeɪt/ — freedict — SAFE
✅ embankment — /ɛmbˈæŋkmənt/ — samantha — 🟢 SAFE
✅ embargo — /ɛmbˈɑːrɡoʊ/ — samantha — 🟢 SAFE
✅ embark — /ɛmbˈɑːrk/ — freedict — SAFE
✅ embezzlement — /ɛmbˈɛzəlmənt/ — freedict — SAFE
✅ emblem — /ˈɛmbləm/ — freedict — SAFE
✅ embody — /ɪmbˈɑːdiː/ — freedict — SAFE
✅ embroil — /ɛmbrˈɔɪl/ — freedict — SAFE
✅ emigrate — /ˈɛməɡrˌeɪt/ — samantha — 🟢 SAFE
✅ eminent — /ˈɛmənənt/ — freedict — SAFE
✅ emissary — /ˈɛməsˌɛriː/ — samantha — 🟢 SAFE
✅ empathy — /ˈɛmpəθiː/ — samantha — 🟢 SAFE
✅ empowerment — /ɪmpˈaʊɜːrmənt/ — samantha — 🟢 SAFE
✅ emulate — /ˈɛmjəlˌeɪt/ — freedict — SAFE
✅ enact — /ɪnˈækt/ — freedict — SAFE
✅ enclave — /ˈɑːnklˌeɪv/ — freedict — SAFE
✅ encryption — /ɛnkrˈɪpʃən/ — samantha — 🟢 SAFE
✅ encumber — /ɛnkˈʌmbɜːr/ — samantha — 🟢 SAFE
✅ endeavor — /ɪndˈɛvɜːr/ — freedict — SAFE
✅ endow — /ɛndˈaʊ/ — freedict — SAFE
✅ engender — /ɛndʒˈɛndɜːr/ — freedict — SAFE
✅ engrave — /ɪnɡrˈeɪv/ — samantha — 🟢 SAFE
✅ enigma — /ɪnˈɪɡmə/ — freedict — SAFE
✅ enlighten — /ˌɛnlˈaɪtən/ — samantha — 🟢 SAFE
✅ enmity — /ˈɛnmətiː/ — freedict — SAFE
✅ enrich — /ɛnrˈɪtʃ/ — samantha — 🟢 SAFE
✅ ensue — /ɪnsˈuː/ — freedict — SAFE
✅ entail — /ɛntˈeɪl/ — freedict — SAFE
✅ entomology — /ˌɛntəmˈɑːlədʒiː/ — samantha — 🟢 SAFE
✅ entrepreneur — /ˌɑːntrəprənˈɜːr/ — freedict — SAFE
✅ enumerate — /ɪnˈuːmɜːrˌeɪt/ — samantha — 🟢 SAFE
✅ envoy — /ˈɛnvɔɪ/ — samantha — 🟢 SAFE
✅ epitaph — /ˈɛpətˌæf/ — freedict — SAFE
✅ epitome — /ɪpˈɪtəmiː/ — freedict — SAFE
✅ epoch — /ˈɛpək/ — freedict — SAFE
✅ equinox — /ˈiːkwənˌɑːks/ — freedict — SAFE
✅ equitable — /ˈɛkwətəbəl/ — samantha — 🟢 SAFE
✅ equity — /ˈɛkwətiː/ — samantha — 🟢 SAFE
✅ equivocal — /ɪkwˈɪvəkəl/ — freedict — SAFE
✅ eradicate — /ɪrˈædəkˌeɪt/ — freedict — SAFE
✅ erratic — /ɪrˈætɪk/ — freedict — SAFE
✅ escapade — /ˈɛskəpˌeɪd/ — freedict — SAFE
✅ espouse — /ɪspˈaʊz/ — samantha — 🟢 SAFE
✅ essence — /ˈɛsəns/ — freedict — SAFE
✅ estate — /ɪstˈeɪt/ — freedict — SAFE
✅ esteem — /əstˈiːm/ — freedict — SAFE
✅ estrange — /ɛstrˈeɪndʒ/ — samantha — 🟢 SAFE
✅ estuary — /ˈɛstʃuːˌɛriː/ — samantha — 🟢 SAFE
✅ eternal — /ɪtˈɜːrnəl/ — freedict — SAFE
✅ ethic — /ˈɛθɪk/ — samantha — 🟢 SAFE
✅ ethical — /ˈɛθɪkəl/ — freedict — SAFE
⚠️ etiquette — /ˈɛtəkət/ — samantha — 🟡 WARN — French /ˈɛt.ɪ.kɛt/
✅ eulogy — /jˈuːlədʒiː/ — samantha — 🟢 SAFE
✅ euphoria — /juːfˈɔːriːə/ — freedict — SAFE
✅ evade — /ɪvˈeɪd/ — freedict — SAFE
✅ evoke — /ɪvˈoʊk/ — freedict — SAFE
✅ exacerbate — /ɪɡzˈæsɜːrbˌeɪt/ — freedict — SAFE
✅ exasperate — /ɪɡzˈæspɜːrˌeɪt/ — freedict — SAFE
✅ excavate — /ˈɛkskəvˌeɪt/ — freedict — SAFE
✅ excerpt — /ˈɛksɜːrpt/ — freedict — SAFE
✅ excise — /ɛksˈaɪs/ — freedict — SAFE
✅ exclamation — /ˌɛkskləmˈeɪʃən/ — freedict — SAFE
✅ exclusive — /ɪksklˈuːsɪv/ — samantha — 🟢 SAFE
✅ excursion — /ɪkskˈɜːrʒən/ — freedict — SAFE
✅ exemplary — /ɪɡzˈɛmplɜːriː/ — freedict — SAFE
✅ exemplify — /ɪɡzˈɛmpləfˌaɪ/ — samantha — 🟢 SAFE
✅ exemption — /ɪɡzˈɛmpʃən/ — samantha — 🟢 SAFE
✅ exhilarate — /ɪɡzˈɪlɜːrˌeɪt/ — freedict — SAFE
✅ exhort — /ɪɡzˈɔːrt/ — freedict — SAFE
✅ exodus — /ˈɛksədəs/ — samantha — 🟢 SAFE
✅ exonerate — /ɪɡzˈɑːnɜːrˌeɪt/ — freedict — SAFE
✅ expatriate — /ɛkspˈeɪtriːˌeɪt/ — samantha — 🟢 SAFE
✅ expedient — /ɪkspˈiːdiːənt/ — freedict — SAFE
✅ expedite — /ˈɛkspɪdˌaɪt/ — freedict — SAFE
✅ exploitation — /ˌɛksplˌɔɪtˈeɪʃən/ — samantha — 🟢 SAFE
✅ exponential — /ˌɛkspoʊnˈɛnʃəl/ — freedict — SAFE
✅ exposition — /ˌɛkspəzˈɪʃən/ — samantha — 🟢 SAFE
✅ exquisite — /ˈɛkskwəzət/ — freedict — SAFE
✅ extenuate — /ɪkstˈɛnjuːˌeɪt/ — freedict — SAFE
✅ extol — /ɪkstˈoʊl/ — freedict — SAFE
✅ extortion — /ɛkstˈɔːrʃən/ — samantha — 🟢 SAFE
✅ extradite — /ˈɛkstrədˌaɪt/ — samantha — 🟢 SAFE
✅ extrapolate — /ɛkstrˈæpəlˌeɪt/ — freedict — SAFE
✅ extravagant — /ɛkstrˈævəɡənt/ — freedict — SAFE
✅ fabricate — /fˈæbrəkˌeɪt/ — samantha — 🟢 SAFE
✅ facade — /fəsˈɑːd/ — freedict — SAFE
✅ facetious — /fəsˈiːʃəs/ — freedict — SAFE
✅ facsimile — /fæksˈɪməliː/ — freedict — SAFE
✅ fallacy — /fˈæləsiː/ — freedict — SAFE
✅ fastidious — /fæstˈɪdiːəs/ — freedict — SAFE
✅ fathom — /fˈæðəm/ — freedict — SAFE
✅ feasibility — /fˌiːzəbˈɪlətiː/ — samantha — 🟢 SAFE
✅ feat — /fˈiːt/ — freedict — SAFE
✅ felicitous — /fɪlˈɪsətəs/ — freedict — SAFE
✅ ferocious — /fɜːrˈoʊʃəs/ — samantha — 🟢 SAFE
✅ fervent — /fˈɜːrvənt/ — samantha — 🟢 SAFE
✅ festive — /fˈɛstɪv/ — freedict — SAFE
✅ fetter — /fˈɛtɜːr/ — freedict — SAFE
✅ feudal — /fjˈuːdəl/ — samantha — 🟢 SAFE
✅ fiasco — /fiːˈæskoʊ/ — freedict — SAFE
✅ fickle — /fˈɪkəl/ — freedict — SAFE
✅ fidelity — /fədˈɛlətiː/ — samantha — 🟢 SAFE
✅ filibuster — /fˈɪləbˌʌstɜːr/ — freedict — SAFE
✅ firebrand — /fˈaɪɜːrbrˌænd/ — freedict — SAFE
✅ fiscal — /fˈɪskəl/ — samantha — 🟢 SAFE
✅ fissure — /fˈɪʃɜːr/ — samantha — 🟢 SAFE
✅ flagrant — /flˈeɪɡrənt/ — freedict — SAFE
✅ fledgling — /flˈɛdʒlɪŋ/ — freedict — SAFE
✅ flora — /flˈɔːrə/ — freedict — SAFE
✅ flotilla — /floʊtˈɪlə/ — samantha — 🟢 SAFE
✅ fluorescent — /flˌʊrˈɛsənt/ — samantha — 🟢 SAFE
✅ foliage — /fˈoʊlɪdʒ/ — samantha — 🟢 SAFE
✅ folklore — /fˈoʊklˌɔːr/ — samantha — 🟢 SAFE
✅ foment — /fˈoʊmɛnt/ — freedict — SAFE
✅ forbearance — /fɔːrbˈɛrəns/ — samantha — 🟢 SAFE
✅ foreclose — /fɔːrklˈoʊz/ — samantha — 🟢 SAFE
✅ foreclosure — /fɔːrklˈoʊʒɜːr/ — samantha — 🟢 SAFE
✅ foremost — /fˈɔːrmˌoʊst/ — freedict — SAFE
✅ forensic — /fɜːrˈɛnsɪk/ — freedict — SAFE
✅ foreseeable — /fɔːrsˈiːəbəl/ — samantha — 🟢 SAFE
✅ forgo — /fɔːrɡˈoʊ/ — samantha — 🟢 SAFE
✅ formulate — /fˈɔːrmjəlˌeɪt/ — samantha — 🟢 SAFE
✅ forthcoming — /fˈɔːrθkˈʌmɪŋ/ — freedict — SAFE
✅ fortitude — /fˈɔːrtɪtˌuːd/ — samantha — 🟢 SAFE
✅ forum — /fˈɔːrəm/ — samantha — 🟢 SAFE
✅ foster — /fˈɑːstɜːr/ — freedict — SAFE
✅ foxglove — /fˈɑːksɡlˌʌv/ — samantha — 🟢 SAFE
✅ fracas — /frˈeɪkəs/ — samantha — 🟢 SAFE
✅ fracture — /frˈæktʃɜːr/ — freedict — SAFE
✅ franchise — /frˈæntʃˌaɪz/ — samantha — 🟢 SAFE
✅ fraternity — /frətˈɜːrnətiː/ — samantha — 🟢 SAFE
✅ freelance — /frˈiːlˌæns/ — samantha — 🟢 SAFE
✅ frivolous — /frˈɪvələs/ — freedict — SAFE
✅ fugitive — /fjˈuːdʒətɪv/ — samantha — 🟢 SAFE
✅ furtive — /fˈɜːrtɪv/ — freedict — SAFE
✅ fuselage — /fjˈuːsəlˌɑːdʒ/ — freedict — SAFE
✅ futile — /fjˈuːtəl/ — samantha — 🟢 SAFE
✅ gauche — /ɡˈoʊʃ/ — freedict — SAFE
✅ gauge — /ɡˈeɪdʒ/ — freedict — SAFE
✅ genealogy — /dʒˌiːniːˈɑːlədʒiː/ — samantha — 🟢 SAFE
✅ genesis — /dʒˈɛnəsəs/ — samantha — 🟢 SAFE
✅ genial — /dʒˈiːnjəl/ — freedict — SAFE
✅ gentry — /dʒˈɛntriː/ — freedict — SAFE
✅ geopolitical — /dʒˌiːoʊpəlˈɪtɪkəl/ — samantha — 🟢 SAFE
✅ geriatric — /dʒˌɛriːˈætrɪk/ — freedict — SAFE
✅ germination — /dʒˌɜːrmənˈeɪʃən/ — samantha — 🟢 SAFE
✅ gist — /dʒˈɪst/ — freedict — SAFE
✅ gladiator — /ɡlˈædiːˌeɪtɜːr/ — samantha — 🟢 SAFE
✅ glean — /ɡlˈiːn/ — freedict — SAFE
⚠️ globalization — /ɡlˌoʊbəlɪzˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ gluttony — /ɡlˈʌtəniː/ — freedict — SAFE
✅ governance — /ɡˈʌvɜːrnəns/ — samantha — 🟢 SAFE
✅ grandiose — /ɡrˌændiːˈoʊs/ — samantha — 🟢 SAFE
✅ grassroots — /ɡrˈæsrˈuːts/ — samantha — 🟢 SAFE
⚠️ gratification — /ɡrˌætəfəkˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ gratify — /ɡrˈætəfˌaɪ/ — samantha — 🟢 SAFE
✅ gratitude — /ɡrˈætətˌuːd/ — freedict — SAFE
✅ gross domestic product — /ɡrˈoʊs dəmˈɛstɪk prˈɑːdəkt/ — samantha — 🟢 SAFE
✅ grotesque — /ɡroʊtˈɛsk/ — freedict — SAFE
✅ groundwater — /ɡrˈaʊndwˌɑːtɜːr/ — samantha — 🟢 SAFE
✅ grudge — /ɡrˈʌdʒ/ — freedict — SAFE
✅ guerrilla — /ɡɜːrˈɪlə/ — samantha — 🟢 SAFE
✅ guise — /ɡˈaɪz/ — freedict — SAFE
✅ habitual — /həbˈɪtʃuːəl/ — freedict — SAFE
⚠️ hallucination — /həlˌuːsənˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ hamper — /hˈæmpɜːr/ — freedict — SAFE
✅ hapless — /hˈæpləs/ — freedict — SAFE
✅ harbinger — /hˈɑːrbɪndʒɜːr/ — freedict — SAFE
✅ harmonious — /hɑːrmˈoʊniːəs/ — samantha — 🟢 SAFE
✅ harness — /hˈɑːrnəs/ — freedict — SAFE
✅ harrowing — /hˈɛroʊɪŋ/ — samantha — 🟢 SAFE
✅ haughty — /hˈɔːtiː/ — samantha — 🟢 SAFE
✅ haven — /hˈeɪvən/ — freedict — SAFE
✅ hazardous — /hˈæzɜːrdəs/ — samantha — 🟢 SAFE
✅ herbicide — /hˈɜːrbɪsˌaɪd/ — freedict — SAFE
✅ hereditary — /hɜːrˈɛdətˌɛriː/ — freedict — SAFE
✅ heredity — /hɜːrˈɛdətiː/ — samantha — 🟢 SAFE
✅ heresy — /hˈɛrəsiː/ — freedict — SAFE
✅ hinder — /hˈɪndɜːr/ — freedict — SAFE
✅ holistic — /hoʊlˈɪstɪk/ — samantha — 🟢 SAFE
✅ homogeneous — /hˌoʊmədʒˈiːniːəs/ — freedict — SAFE
✅ hostage — /hˈɑːstɪdʒ/ — freedict — SAFE
✅ humiliation — /hjuːmˌɪliːˈeɪʃən/ — samantha — 🟢 SAFE
✅ humility — /hjuːmˈɪlɪtiː/ — samantha — 🟢 SAFE
✅ hybrid — /hˈaɪbrəd/ — freedict — SAFE
✅ hydraulic — /haɪdrˈɔːlɪk/ — freedict — SAFE
✅ hypocrisy — /hɪpˈɑːkrəsiː/ — samantha — 🟢 SAFE
✅ hypothermia — /hˌaɪpəθˈɜːrmiːə/ — samantha — 🟢 SAFE
✅ hypothetical — /hˌaɪpəθˈɛtəkəl/ — samantha — 🟢 SAFE
✅ idealism — /aɪdˈiːlɪzəm/ — samantha — 🟢 SAFE
✅ idyllic — /aɪdˈɪlɪk/ — freedict — SAFE
✅ illegitimate — /ˌɪlɪdʒˈɪtəmɪt/ — samantha — 🟢 SAFE
✅ illicit — /ˌɪlˈɪsət/ — samantha — 🟢 SAFE
✅ immerse — /ˌɪmˈɜːrs/ — freedict — SAFE
✅ immigrate — /ˈɪməɡrˌeɪt/ — samantha — 🟢 SAFE
✅ imminent — /ˈɪmənənt/ — freedict — SAFE
✅ immobilize — /ˌɪmˈoʊbəlˌaɪz/ — freedict — SAFE
✅ immunity — /ˌɪmjˈuːnətiː/ — samantha — 🟢 SAFE
✅ impair — /ˌɪmpˈɛr/ — samantha — 🟢 SAFE
✅ impartial — /ˌɪmpˈɑːrʃəl/ — samantha — 🟢 SAFE
✅ impasse — /ˌɪmpˈæs/ — samantha — 🟢 SAFE
✅ impeachment — /ˌɪmpˈiːtʃmənt/ — freedict — SAFE
✅ impeccable — /ˌɪmpˈɛkəbəl/ — freedict — SAFE
✅ impede — /ˌɪmpˈiːd/ — freedict — SAFE
✅ impediment — /ˌɪmpˈɛdəmənt/ — freedict — SAFE
✅ imperative — /ˌɪmpˈɛrətɪv/ — freedict — SAFE
✅ impersonate — /ˌɪmpˈɜːrsənˌeɪt/ — samantha — 🟢 SAFE
✅ implacable — /ˌɪmplˈækəbəl/ — freedict — SAFE
✅ implicate — /ˈɪmplɪkˌeɪt/ — samantha — 🟢 SAFE
✅ implicit — /ˌɪmplˈɪsət/ — freedict — SAFE
✅ implore — /ˌɪmplˈɔːr/ — freedict — SAFE
✅ impregnable — /ˌɪmprˈɛɡnəbəl/ — freedict — SAFE
✅ impromptu — /ˌɪmprˈɑːmptuː/ — samantha — 🟢 SAFE
✅ impropriety — /ˌɪmprəprˈaɪətiː/ — freedict — SAFE
✅ improvise — /ˈɪmprəvˌaɪz/ — freedict — SAFE
✅ impunity — /ˌɪmpjˈuːnɪtiː/ — samantha — 🟢 SAFE
✅ inadvertent — /ˌɪnədvˈɜːrtənt/ — freedict — SAFE
✅ inaugural — /ˌɪnˈɔːɡɜːrəl/ — samantha — 🟢 SAFE
✅ inauguration — /ɪnˌɔːɡjɜːrˈeɪʃən/ — samantha — 🟢 SAFE
✅ inauspicious — /ˌɪnˌaʊspˈɪʃɪs/ — freedict — SAFE
✅ incandescent — /ˌɪnkəndˈɛsənt/ — freedict — SAFE
✅ incarcerate — /ˌɪnkˈɑːrsɜːrˌeɪt/ — samantha — 🟢 SAFE
✅ inception — /ˌɪnsˈɛpʃən/ — freedict — SAFE
✅ incite — /ˌɪnsˈaɪt/ — freedict — SAFE
✅ inclination — /ˌɪnklənˈeɪʃən/ — freedict — SAFE
✅ inclusive — /ˌɪnklˈuːsɪv/ — samantha — 🟢 SAFE
✅ inconclusive — /ˌɪnkənklˈuːsɪv/ — samantha — 🟢 SAFE
✅ incorrigible — /ˌɪnkˈɑːrədʒəbəl/ — freedict — SAFE
✅ incredulous — /ˌɪnkrˈɛdʒələs/ — samantha — 🟢 SAFE
✅ increment — /ˈɪnkrəmənt/ — freedict — SAFE
✅ incriminate — /ˌɪnkrˈɪmənˌeɪt/ — samantha — 🟢 SAFE
✅ incumbent — /ˌɪnkˈʌmbənt/ — samantha — 🟢 SAFE
✅ indefatigable — /ˌɪndɪfˈætɪɡəbəl/ — freedict — SAFE
✅ indelible — /ˌɪndˈɛlɪbəl/ — freedict — SAFE
✅ indictment — /ˌɪndˈaɪtmənt/ — freedict — SAFE
✅ indignant — /ˌɪndˈɪɡnənt/ — freedict — SAFE
✅ indignation — /ˌɪndɪɡnˈeɪʃən/ — freedict — SAFE
⚠️ indiscriminate — /ˌɪndɪskrˈɪmənət/ — samantha — 🟡 WARN — Long word — verify stress placement
⚠️ indispensable — /ˌɪndɪspˈɛnsəbəl/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ indolent — /ˈɪndələnt/ — freedict — SAFE
⚠️ industrialization — /ˌɪndˌʌstriːəlɪzˈeɪʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ inept — /ˌɪnˈɛpt/ — samantha — 🟢 SAFE
✅ inertia — /ˌɪnˈɜːrʃə/ — freedict — SAFE
✅ infallible — /ˌɪnfˈæləbəl/ — freedict — SAFE
✅ infantry — /ˈɪnfəntriː/ — samantha — 🟢 SAFE
✅ inference — /ˈɪnfɜːrəns/ — samantha — 🟢 SAFE
✅ influx — /ˈɪnflˌʌks/ — freedict — SAFE
✅ infringement — /ˌɪnfrˈɪndʒmənt/ — freedict — SAFE
✅ ingenuity — /ˌɪndʒənˈuːətˌiː/ — freedict — SAFE
✅ inheritance — /ˌɪnhˈɛrətəns/ — freedict — SAFE
✅ initiation — /ˌɪnˌɪʃiːˈeɪʃən/ — samantha — 🟢 SAFE
✅ injunction — /ˌɪndʒˈʌŋkʃən/ — samantha — 🟢 SAFE
✅ injustice — /ˌɪndʒˈʌstɪs/ — samantha — 🟢 SAFE
✅ inkwell — /—/ — samantha — 🟢 SAFE
✅ innovative — /ˈɪnəvˌeɪtɪv/ — freedict — SAFE
✅ inquiry — /ˌɪnkwˈaɪrˌiː/ — freedict — SAFE
✅ inquisitive — /ˌɪnkwˈɪzɪtɪv/ — samantha — 🟢 SAFE
✅ insatiable — /ˌɪnsˈeɪʃəbəl/ — samantha — 🟢 SAFE
✅ insolvency — /ˌɪnsˈɑːlvənsiː/ — samantha — 🟢 SAFE
✅ instigate — /ˈɪnstəɡˌeɪt/ — freedict — SAFE
✅ insurgent — /ˌɪnsˈɜːrdʒənt/ — freedict — SAFE
✅ insurrection — /ˌɪnsɜːrˈɛkʃən/ — samantha — 🟢 SAFE
✅ integration — /ˌɪntəɡrˈeɪʃən/ — samantha — 🟢 SAFE
✅ intensify — /ɪntˈɛnsəfˌaɪ/ — samantha — 🟢 SAFE
✅ intercede — /ˌɪntɜːrsˈiːd/ — freedict — SAFE
✅ intermittent — /ˌɪntɜːrmˈɪtənt/ — samantha — 🟢 SAFE
✅ internship — /ˈɪntɜːrnʃˌɪp/ — freedict — SAFE
✅ interrogate — /ˌɪntˈɛrəɡˌeɪt/ — freedict — SAFE
✅ intervention — /ˌɪntɜːrvˈɛnʃən/ — samantha — 🟢 SAFE
✅ intimidation — /ˌɪntˌɪmɪdˈeɪʃən/ — samantha — 🟢 SAFE
✅ intractable — /ˌɪntrˈæktəbəl/ — samantha — 🟢 SAFE
⚠️ introspection — /ˌɪntrəspˈɛkʃən/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ invariably — /ˌɪnvˈɛriːəbliː/ — freedict — SAFE
✅ iridescent — /ˌɪrədˈɛsənt/ — samantha — 🟢 SAFE
✅ irksome — /ˈɜːrksəm/ — freedict — SAFE
✅ irrevocable — /ˌɪrˈɛvəkəbəl/ — samantha — 🟢 SAFE
✅ itinerary — /aɪtˈɪnɜːrˌɛriː/ — freedict — SAFE
✅ jeopardize — /dʒˈɛpɜːrdˌaɪz/ — samantha — 🟢 SAFE
✅ jubilee — /dʒˈuːbəlˌiː/ — samantha — 🟢 SAFE
✅ judicious — /dʒuːdˈɪʃəs/ — samantha — 🟢 SAFE
⚠️ jurisprudence — /dʒˌʊrəsprˈuːdəns/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ juxtaposition — /dʒˌʌkstəpəzˈɪʃən/ — freedict — SAFE
✅ kaleidoscope — /kəlˈaɪdəskˌoʊp/ — freedict — SAFE
✅ keynote — /kˈiːnˌoʊt/ — samantha — 🟢 SAFE
✅ kinship — /kˈɪnʃˌɪp/ — samantha — 🟢 SAFE
✅ laborious — /ləbˈɔːriːəs/ — freedict — SAFE
✅ labyrinth — /lˈæbɜːrˌɪnθ/ — freedict — SAFE
✅ laceration — /lˌæsɜːrˈeɪʃən/ — samantha — 🟢 SAFE
✅ lament — /ləmˈɛnt/ — freedict — SAFE
✅ landlocked — /lˈændlˌɑːkt/ — samantha — 🟢 SAFE
✅ latent — /lˈeɪtənt/ — freedict — SAFE
✅ laud — /lˈɔːd/ — freedict — SAFE
✅ laureate — /lˈɔːriːət/ — freedict — SAFE
✅ legacy — /lˈɛɡəsiː/ — freedict — SAFE
✅ legislative — /lˈɛdʒəslˌeɪtɪv/ — freedict — SAFE
✅ legitimacy — /lədʒˈɪtəməsiː/ — samantha — 🟢 SAFE
✅ lenient — /lˈiːniːənt/ — freedict — SAFE
✅ lethargic — /ləθˈɑːrdʒɪk/ — samantha — 🟢 SAFE
✅ lethargy — /lˈɛθɜːrdʒiː/ — freedict — SAFE
✅ leverage — /lˈɛvɜːrɪdʒ/ — freedict — SAFE
✅ levity — /lˈɛvɪtiː/ — freedict — SAFE
✅ lexicon — /lˈɛksɪkˌɑːn/ — freedict — SAFE
✅ liberation — /lˌɪbˌɜːrˈeɪʃən/ — samantha — 🟢 SAFE
✅ lieutenant — /luːtˈɛnənt/ — freedict — SAFE
✅ liquidate — /lˈɪkwɪdˌeɪt/ — freedict — SAFE
✅ litigation — /lˌɪtəɡˈeɪʃən/ — samantha — 🟢 SAFE
✅ lobby — /lˈɑːbiː/ — samantha — 🟢 SAFE
✅ locomotive — /lˌoʊkəmˈoʊtɪv/ — freedict — SAFE
✅ lofty — /lˈɔːftiː/ — freedict — SAFE
✅ longevity — /lɔːndʒˈɛvətiː/ — samantha — 🟢 SAFE
✅ ludicrous — /lˈuːdəkrəs/ — freedict — SAFE
✅ luminous — /lˈuːmənəs/ — samantha — 🟢 SAFE
✅ lure — /lˈʊr/ — freedict — SAFE
✅ magnate — /mˈæɡnət/ — samantha — 🟢 SAFE
✅ maiden — /mˈeɪdən/ — freedict — SAFE
✅ malevolent — /məlˈɛvələnt/ — freedict — SAFE
✅ malfunction — /mælfˈʌŋkʃən/ — freedict — SAFE
✅ malice — /mˈæləs/ — freedict — SAFE
✅ malign — /məlˈaɪn/ — freedict — SAFE
✅ malleable — /mˈæliːəbəl/ — freedict — SAFE
✅ mammoth — /mˈæməθ/ — samantha — 🟢 SAFE
✅ maneuver — /mənˈuːvɜːr/ — freedict — SAFE
✅ manifesto — /mˌænəfˈɛstˌoʊ/ — samantha — 🟢 SAFE
✅ marauder — /mɜːrˈɔːdɜːr/ — samantha — 🟢 SAFE
✅ martial — /mˈɑːrʃəl/ — samantha — 🟢 SAFE
✅ matriarch — /mˈeɪtriːˌɑːrk/ — samantha — 🟢 SAFE
✅ maximize — /mˈæksəmˌaɪz/ — samantha — 🟢 SAFE
✅ meager — /mˈiːɡɜːr/ — samantha — 🟢 SAFE
✅ mediation — /mˌiːdiːˈeɪʃən/ — samantha — 🟢 SAFE
✅ medium — /mˈiːdiːəm/ — freedict — SAFE
✅ membrane — /mˈɛmbrˌeɪn/ — freedict — SAFE
✅ memento — /mɪmˈɛntoʊ/ — freedict — SAFE
✅ mercantile — /mˈɜːrkəntˌaɪl/ — freedict — SAFE
✅ mercenary — /mˈɜːrsənˌɛriː/ — freedict — SAFE
✅ meritorious — /mˌɛrətˈɔːriːəs/ — samantha — 🟢 SAFE
✅ metaphor — /mˈɛtəfɔːr/ — freedict — SAFE
✅ meteorology — /mˌiːtiːɜːrˈɑːlədʒiː/ — samantha — 🟢 SAFE
✅ methodical — /məθˈɑːdəkəl/ — freedict — SAFE
✅ meticulous — /mətˈɪkjələs/ — freedict — SAFE
✅ metropolis — /mətrˈɑːpələs/ — freedict — SAFE
✅ millennial — /mɪlˈɛniːəl/ — samantha — 🟢 SAFE
✅ minimize — /mˈɪnəmˌaɪz/ — samantha — 🟢 SAFE
✅ miscellaneous — /mˌɪsəlˈeɪniːəs/ — freedict — SAFE
✅ misnomer — /mɪsnˈoʊmɜːr/ — freedict — SAFE
✅ mitigate — /mˈɪtəɡˌeɪt/ — freedict — SAFE
✅ mobilization — /mˌoʊbələzˈeɪʃən/ — samantha — 🟢 SAFE
✅ modicum — /mˈɑːdɪkəm/ — freedict — SAFE
✅ molecular — /məlˈɛkjəlɜːr/ — samantha — 🟢 SAFE
✅ molt — /mˈoʊlt/ — samantha — 🟢 SAFE
✅ monologue — /mˈɑːnəlˌɔːɡ/ — samantha — 🟢 SAFE
✅ monsoon — /mɑːnsˈuːn/ — freedict — SAFE
✅ multifaceted — /mˌʌltiːfˈæsətɪd/ — samantha — 🟢 SAFE
✅ mundane — /məndˈeɪn/ — freedict — SAFE
✅ myriad — /mˈɪriːəd/ — freedict — SAFE
⚠️ mystification — /—/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ negate — /nɪɡˈeɪt/ — samantha — 🟢 SAFE
✅ negligence — /nˈɛɡlədʒəns/ — samantha — 🟢 SAFE
✅ negligible — /nˈɛɡlədʒəbəl/ — samantha — 🟢 SAFE
✅ nemesis — /nˈɛməsɪs/ — samantha — 🟢 SAFE
✅ network — /nˈɛtwˌɜːrk/ — freedict — SAFE
✅ neutrality — /nuːtrˈælətiː/ — freedict — SAFE
✅ nominal — /nˈɑːmənəl/ — samantha — 🟢 SAFE
✅ nonchalant — /nˌɑːnʃəlˈɑːnt/ — freedict — SAFE
✅ nonplussed — /nɑːnplˈʌst/ — freedict — SAFE
✅ notoriety — /nˌoʊtɜːrˈaɪətiː/ — samantha — 🟢 SAFE
✅ noxious — /nˈɑːkʃəs/ — samantha — 🟢 SAFE
✅ nuance — /nˈuːɑːns/ — freedict — SAFE
✅ nurture — /nˈɜːrtʃɜːr/ — freedict — SAFE
✅ objection — /əbdʒˈɛkʃən/ — freedict — SAFE
✅ obligate — /ˈɑːbləɡˌeɪt/ — samantha — 🟢 SAFE
✅ obligatory — /əblˈɪɡətˌɔːriː/ — freedict — SAFE
✅ oblivious — /əblˈɪviːəs/ — samantha — 🟢 SAFE
✅ obsolete — /ˈɑːbsəlˌiːt/ — freedict — SAFE
✅ obtuse — /ɑːbtˈuːs/ — freedict — SAFE
✅ odious — /ˈoʊdiːəs/ — freedict — SAFE
✅ ominous — /ˈɑːmənəs/ — samantha — 🟢 SAFE
✅ omnipotent — /ɑːmnˈɪpətənt/ — freedict — SAFE
✅ opportune — /ˌɑːpɜːrtˈuːn/ — samantha — 🟢 SAFE
✅ oppression — /əprˈɛʃən/ — freedict — SAFE
✅ optimal — /ˈɑːptəməl/ — freedict — SAFE
✅ optimism — /ˈɑːptəmˌɪzəm/ — freedict — SAFE
✅ optimum — /ˈɑːptəməm/ — samantha — 🟢 SAFE
✅ ornate — /ɔːrnˈeɪt/ — freedict — SAFE
✅ ornithology — /ˌɔːrnɪθˈɑːlədʒiː/ — samantha — 🟢 SAFE
✅ orthodontics — /ˌɔːrθədˈɑːntɪks/ — samantha — 🟢 SAFE
✅ ostracize — /ˈɔːstrəsˌaɪz/ — freedict — SAFE
✅ oversee — /ˈoʊvɜːrsˌiː/ — freedict — SAFE
✅ overthrow — /ˈoʊvɜːrθrˌoʊ/ — freedict — SAFE
✅ oxbow — /ˈɑːksbˌoʊ/ — samantha — 🟢 SAFE
✅ palatial — /pəlˈeɪʃəl/ — samantha — 🟢 SAFE
✅ palindrome — /—/ — freedict — SAFE
✅ palliate — /—/ — freedict — SAFE
✅ palpable — /pˈælpəbəl/ — freedict — SAFE
✅ panoramic — /pˌænɜːrˈæmɪk/ — samantha — 🟢 SAFE
✅ parameter — /pɜːrˈæmətɜːr/ — freedict — SAFE
✅ paramount — /pˈɛrəmˌaʊnt/ — freedict — SAFE
✅ pariah — /pɜːrˈaɪə/ — freedict — SAFE
✅ parity — /pˈɛrətiː/ — samantha — 🟢 SAFE
✅ participation — /pɑːrtˌɪsəpˈeɪʃən/ — freedict — SAFE
✅ pastoral — /pˈæstɜːrəl/ — samantha — 🟢 SAFE
✅ pathos — /pˈeɪθɑːs/ — freedict — SAFE
✅ patriot — /pˈeɪtriːət/ — samantha — 🟢 SAFE
✅ peasant — /pˈɛzənt/ — freedict — SAFE
✅ penchant — /pˈɛntʃənt/ — samantha — 🟢 SAFE
✅ penitent — /pˈɛnɪtɪnt/ — freedict — SAFE
✅ pension — /pˈɛnʃən/ — freedict — SAFE
✅ penurious — /pˌɛnjˈuːriːəs/ — samantha — 🟢 SAFE
✅ perilous — /pˈɛrələs/ — freedict — SAFE
✅ permeate — /pˈɜːrmiːˌeɪt/ — samantha — 🟢 SAFE
✅ perpetuate — /pɜːrpˈɛtʃəwˌeɪt/ — samantha — 🟢 SAFE
✅ persecution — /pˌɜːrsəkjˈuːʃən/ — freedict — SAFE
✅ perseverance — /pˌɜːrsəvˈɪrəns/ — samantha — 🟢 SAFE
✅ personable — /pˈɜːrsənəbəl/ — freedict — SAFE
✅ pessimism — /pˈɛsəmˌɪzəm/ — samantha — 🟢 SAFE
✅ petulant — /pˈɛtʃələnt/ — samantha — 🟢 SAFE
⚠️ philanthropist — /fəlˈænθrəpəst/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ pinnacle — /pˈɪnəkəl/ — freedict — SAFE
✅ pious — /pˈaɪəs/ — freedict — SAFE
✅ placate — /plˈeɪkeɪt/ — freedict — SAFE
✅ plague — /plˈeɪɡ/ — freedict — SAFE
✅ plaintive — /plˈeɪntɪv/ — samantha — 🟢 SAFE
✅ plummet — /plˈʌmət/ — freedict — SAFE
✅ polarize — /pˈoʊlɜːrˌaɪz/ — samantha — 🟢 SAFE
✅ portfolio — /pɔːrtfˈoʊliːˌoʊ/ — samantha — 🟢 SAFE
✅ precept — /prˈiːsˌɛpt/ — samantha — 🟢 SAFE
✅ precinct — /prˈiːsˌɪŋkt/ — samantha — 🟢 SAFE
✅ precocious — /prɪkˈoʊʃəs/ — freedict — SAFE
✅ predatory — /prˈɛdətˌɔːriː/ — samantha — 🟢 SAFE
✅ predicament — /prɪdˈɪkəmənt/ — samantha — 🟢 SAFE
✅ predominate — /prɪdˈɑːmənˌeɪt/ — samantha — 🟢 SAFE
✅ preemptive — /priːˈɛmptɪv/ — freedict — SAFE
✅ premonition — /prɛmənˈɪʃən/ — samantha — 🟢 SAFE
✅ preposterous — /prɪpˈɑːstɜːrəs/ — freedict — SAFE
✅ prerequisite — /priːrˈɛkwəzət/ — samantha — 🟢 SAFE
✅ prerogative — /prɪrˈɑːɡətɪv/ — freedict — SAFE
✅ prestige — /prɛstˈiːʒ/ — freedict — SAFE
✅ pretentious — /priːtˈɛnʃəs/ — samantha — 🟢 SAFE
✅ principled — /prˈɪnsəpəld/ — samantha — 🟢 SAFE
✅ prior — /prˈaɪɜːr/ — freedict — SAFE
✅ pristine — /prˈɪstiːn/ — freedict — SAFE
✅ probation — /proʊbˈeɪʃən/ — samantha — 🟢 SAFE
✅ proclamation — /prˌɑːkləmˈeɪʃən/ — freedict — SAFE
✅ proficiency — /prəfˈɪʃənsiː/ — samantha — 🟢 SAFE
✅ profuse — /prəfjˈuːs/ — freedict — SAFE
✅ prognosis — /prɑːɡnˈoʊsəs/ — freedict — SAFE
✅ prohibitive — /proʊhˈɪbətɪv/ — freedict — SAFE
✅ projection — /prədʒˈɛkʃən/ — samantha — 🟢 SAFE
✅ prolific — /proʊlˈɪfɪk/ — freedict — SAFE
✅ propagate — /prˈɑːpəɡˌeɪt/ — freedict — SAFE
✅ propensity — /prəpˈɛnsɪtiː/ — freedict — SAFE
✅ proponent — /prəpˈoʊnənt/ — freedict — SAFE
✅ proportional — /prəpˈɔːrʃənəl/ — samantha — 🟢 SAFE
✅ propriety — /prəprˈaɪətiː/ — samantha — 🟢 SAFE
✅ prosperity — /prɑːspˈɛrətiː/ — freedict — SAFE
✅ protagonist — /proʊtˈæɡənəst/ — freedict — SAFE
✅ protract — /proʊtrˈækt/ — samantha — 🟢 SAFE
✅ provocation — /prˌɑːvəkˈeɪʃən/ — samantha — 🟢 SAFE
✅ pursuant — /pɜːrsˈuːənt/ — samantha — 🟢 SAFE
✅ purview — /pˈɜːrvjˌuː/ — samantha — 🟢 SAFE
✅ rampant — /rˈæmpənt/ — freedict — SAFE
✅ raucous — /rˈɔːkəs/ — freedict — SAFE
✅ raze — /rˈeɪz/ — freedict — SAFE
✅ rebuff — /rɪbˈʌf/ — freedict — SAFE
✅ rebuke — /riːbjˈuːk/ — freedict — SAFE
✅ recession — /rɪsˈɛʃən/ — samantha — 🟢 SAFE
✅ recourse — /rˈiːkɔːrs/ — freedict — SAFE
✅ rectify — /rˈɛktəfˌaɪ/ — samantha — 🟢 SAFE
✅ redundant — /rɪdˈʌndənt/ — freedict — SAFE
✅ refine — /rəfˈaɪn/ — samantha — 🟢 SAFE
✅ refute — /rɪfjˈuːt/ — freedict — SAFE
✅ regimen — /rˈɛdʒəmən/ — freedict — SAFE
✅ relentless — /rɪlˈɛntlɪs/ — samantha — 🟢 SAFE
✅ reliance — /rɪlˈaɪəns/ — freedict — SAFE
✅ relinquish — /rɪlˈɪŋkwɪʃ/ — samantha — 🟢 SAFE
✅ reluctance — /rɪlˈʌktəns/ — freedict — SAFE
✅ remnant — /rˈɛmnənt/ — freedict — SAFE
✅ remuneration — /rɪmjˌuːnɜːrˈeɪʃən/ — freedict — SAFE
✅ renegade — /rˈɛnəɡˌeɪd/ — freedict — SAFE
✅ renounce — /rɪnˈaʊns/ — samantha — 🟢 SAFE
✅ repercussion — /rˌiːpɜːrkˈʌʃən/ — freedict — SAFE
⚠️ repertoire — /rˈɛpɜːrtwˌɑːr/ — samantha — 🟡 WARN — French /ˈrɛp.ɚ.twɑːr/
✅ reprimand — /rˈɛprəmˌænd/ — samantha — 🟢 SAFE
✅ reprove — /—/ — samantha — 🟢 SAFE
✅ repugnant — /rɪpˈʌɡnənt/ — samantha — 🟢 SAFE
✅ resilience — /rɪzˈɪliːəns/ — samantha — 🟢 SAFE
✅ resonate — /rˈɛzənˌeɪt/ — freedict — SAFE
✅ respective — /rɪspˈɛktɪv/ — freedict — SAFE
✅ resurgence — /riːsˈɜːrdʒəns/ — samantha — 🟢 SAFE
✅ retaliate — /rɪtˈæliːˌeɪt/ — samantha — 🟢 SAFE
✅ reticent — /rˈɛtɪsənt/ — freedict — SAFE
✅ retribution — /rˌɛtrəbjˈuːʃən/ — samantha — 🟢 SAFE
✅ revere — /rɪvˈɪr/ — samantha — 🟢 SAFE
✅ revoke — /rɪvˈoʊk/ — samantha — 🟢 SAFE
✅ riveting — /rˈɪvətɪŋ/ — samantha — 🟢 SAFE
✅ rudiment — /rˈuːdɪmənt/ — freedict — SAFE
✅ rudimentary — /rˌuːdəmˈɛntɜːriː/ — samantha — 🟢 SAFE
✅ sabotage — /sˈæbətˌɑːʒ/ — samantha — 🟢 SAFE
✅ sanctuary — /sˈæŋktʃuːˌɛriː/ — samantha — 🟢 SAFE
✅ scathing — /skˈeɪðɪŋ/ — samantha — 🟢 SAFE
✅ scrutiny — /skrˈuːtəniː/ — freedict — SAFE
✅ secession — /sɪsˈɛʃən/ — samantha — 🟢 SAFE
✅ seclusion — /sɪklˈuːʒən/ — freedict — SAFE
✅ semantic — /sɪmˈæntɪk/ — freedict — SAFE
✅ sentinel — /sˈɛntənəl/ — freedict — SAFE
✅ servitude — /sˈɜːrvətˌuːd/ — samantha — 🟢 SAFE
✅ shrewd — /ʃrˈuːd/ — samantha — 🟢 SAFE
✅ sibling — /sˈɪblɪŋ/ — samantha — 🟢 SAFE
✅ sluggish — /slˈʌɡɪʃ/ — freedict — SAFE
✅ sober — /sˈoʊbɜːr/ — freedict — SAFE
✅ solicit — /səlˈɪsɪt/ — freedict — SAFE
✅ solitude — /sˈɑːlətˌuːd/ — freedict — SAFE
✅ solvent — /sˈɑːlvənt/ — samantha — 🟢 SAFE
✅ sordid — /sˈɔːrdəd/ — freedict — SAFE
✅ spawn — /spˈɑːn/ — samantha — 🟢 SAFE
✅ specify — /spˈɛsəfˌaɪ/ — freedict — SAFE
✅ spectacular — /spɛktˈækjəlɜːr/ — samantha — 🟢 SAFE
✅ sporadic — /spɜːrˈædɪk/ — freedict — SAFE
✅ squander — /skwˈɑːndɜːr/ — freedict — SAFE
✅ stance — /stˈæns/ — freedict — SAFE
✅ statutory — /stˈætʃətˌɔːriː/ — freedict — SAFE
✅ staunch — /stˈɔːntʃ/ — freedict — SAFE
✅ steadfast — /stˈɛdfˌæst/ — freedict — SAFE
✅ stigma — /stˈɪɡmə/ — samantha — 🟢 SAFE
✅ stoic — /stˈoʊɪk/ — samantha — 🟢 SAFE
✅ stratagem — /strˈætədʒəm/ — samantha — 🟢 SAFE
✅ strategic — /strətˈiːdʒɪk/ — samantha — 🟢 SAFE
✅ strife — /strˈaɪf/ — freedict — SAFE
✅ subdivide — /sˌʌbdəvˈaɪd/ — freedict — SAFE
✅ subdue — /səbdˈuː/ — samantha — 🟢 SAFE
✅ subjugate — /sˈʌbdʒəɡˌeɪt/ — samantha — 🟢 SAFE
✅ sublime — /səblˈaɪm/ — freedict — SAFE
✅ successive — /səksˈɛsɪv/ — freedict — SAFE
✅ succumb — /səkˈʌm/ — samantha — 🟢 SAFE
✅ suffice — /səfˈaɪs/ — freedict — SAFE
✅ superficial — /sˌuːpɜːrfˈɪʃəl/ — freedict — SAFE
✅ supersede — /sˌuːpɜːrsˈiːd/ — freedict — SAFE
✅ supplant — /səplˈænt/ — freedict — SAFE
✅ supremacy — /səprˈɛməsiː/ — freedict — SAFE
✅ surge — /sˈɜːrdʒ/ — freedict — SAFE
✅ surmise — /sɜːrmˈaɪz/ — freedict — SAFE
✅ susceptible — /səsˈɛptəbəl/ — samantha — 🟢 SAFE
✅ sustenance — /sˈʌstənəns/ — samantha — 🟢 SAFE
✅ symposium — /sɪmpˈoʊziːəm/ — samantha — 🟢 SAFE
✅ synthesis — /sˈɪnθəsəs/ — samantha — 🟢 SAFE
✅ tacit — /tˈæsɪt/ — freedict — SAFE
✅ taciturn — /tˈæsɪtˌɜːrn/ — freedict — SAFE
✅ tact — /tˈækt/ — freedict — SAFE
✅ tangible — /tˈændʒəbəl/ — freedict — SAFE
✅ temperament — /tˈɛmprəmənt/ — samantha — 🟢 SAFE
✅ temperate — /tˈɛmprət/ — freedict — SAFE
✅ tenacious — /tənˈeɪʃəs/ — freedict — SAFE
✅ tentative — /tˈɛntətɪv/ — samantha — 🟢 SAFE
✅ tenuous — /tˈɛnjəwəs/ — samantha — 🟢 SAFE
✅ terrestrial — /tɜːrˈɛstriːəl/ — freedict — SAFE
✅ testimony — /tˈɛstəmˌoʊniː/ — freedict — SAFE
✅ theology — /θiːˈɑːlədʒiː/ — freedict — SAFE
✅ thesis — /θˈiːsəs/ — freedict — SAFE
✅ threshold — /θrˈɛʃˌoʊld/ — freedict — SAFE
✅ topography — /təpˈɑːɡrəfiː/ — freedict — SAFE
✅ totalitarian — /tˌoʊtˌælɪtˈɛriːən/ — samantha — 🟢 SAFE
✅ tout — /tˈaʊt/ — freedict — SAFE
✅ trajectory — /trədʒˈɛktɜːriː/ — freedict — SAFE
✅ tranquility — /træŋkwˈɪlɪtiː/ — samantha — 🟢 SAFE
✅ transcend — /trænsˈɛnd/ — freedict — SAFE
⚠️ transcontinental — /trˌænzkˌɑːntɪnˈɛntəl/ — samantha — 🟡 WARN — Long word — verify stress placement
✅ transgress — /trænzɡrˈɛs/ — freedict — SAFE
✅ transparency — /trænspˈɛrənsiː/ — samantha — 🟢 SAFE
✅ tribunal — /trəbjˈuːnəl/ — freedict — SAFE
✅ trite — /trˈaɪt/ — freedict — SAFE
✅ trivial — /trˈɪviːəl/ — freedict — SAFE
✅ truce — /trˈuːs/ — freedict — SAFE
✅ tumultuous — /tˌuːmˈʌltʃˌuːəs/ — freedict — SAFE
✅ turbine — /tˈɜːrbaɪn/ — freedict — SAFE
✅ turmoil — /tˈɜːrmˌɔɪl/ — freedict — SAFE
✅ tyranny — /tˈɪrəniː/ — freedict — SAFE
✅ ulterior — /əltˈɪriːɜːr/ — freedict — SAFE
✅ unabated — /ˌʌnəbˈeɪtɪd/ — samantha — 🟢 SAFE
✅ unanimous — /juːnˈænəməs/ — freedict — SAFE
✅ unassuming — /ˌʌnəsˈuːmɪŋ/ — samantha — 🟢 SAFE
✅ underscore — /ˌʌndɜːrskˈɔːr/ — freedict — SAFE
✅ unfettered — /ənfˈɛtɜːrd/ — freedict — SAFE
✅ unify — /jˈuːnəfˌaɪ/ — samantha — 🟢 SAFE
✅ unilateral — /jˌuːnəlˈætɜːrəl/ — samantha — 🟢 SAFE
✅ unobtrusive — /ˌʌnəbtrˈuːsɪv/ — samantha — 🟢 SAFE
✅ unorthodox — /ənˈɔːrθədˌɑːks/ — samantha — 🟢 SAFE
✅ unprecedented — /ənprˈɛsɪdˌɛntɪd/ — freedict — SAFE
✅ untenable — /əntˈɛnəbəl/ — samantha — 🟢 SAFE
✅ unwitting — /ənwˈɪtɪŋ/ — samantha — 🟢 SAFE
✅ upheaval — /əphˈiːvəl/ — samantha — 🟢 SAFE
✅ uphold — /əphˈoʊld/ — samantha — 🟢 SAFE
✅ uprising — /əprˈaɪzɪŋ/ — samantha — 🟢 SAFE
✅ usurp — /jˌuːsˈɜːrp/ — freedict — SAFE
✅ utopia — /juːtˈoʊpiːə/ — samantha — 🟢 SAFE
✅ utopian — /juːtˈoʊpiːən/ — samantha — 🟢 SAFE
✅ validate — /vˈælədeɪt/ — freedict — SAFE
✅ vehement — /vˈiːəmənt/ — freedict — SAFE
✅ viable — /vˈaɪəbəl/ — freedict — SAFE
✅ vicinity — /vəsˈɪnətiː/ — samantha — 🟢 SAFE
✅ vigilant — /vˈɪdʒələnt/ — freedict — SAFE
✅ vindicate — /vˈɪndəkeɪt/ — samantha — 🟢 SAFE
✅ voracious — /vɔːrˈeɪʃəs/ — freedict — SAFE
✅ wane — /wˈeɪn/ — freedict — SAFE
✅ whereby — /wɛrbˈaɪ/ — freedict — SAFE
✅ whimsical — /wˈɪmzɪkəl/ — freedict — SAFE
✅ wield — /wˈiːld/ — freedict — SAFE
✅ zealous — /zˈɛləs/ — freedict — SAFE
✅ zenith — /zˈiːnəθ/ — freedict — SAFE

## Risk Distribution by Level

| Level | Total | 🟢 SAFE | 🟡 WARN | 🔴 DANGER |
|-------|-------|---------|---------|-----------|
| 1 | 600 | 600 | 0 | 0 |
| 2 | 1811 | 1794 | 4 | 13 |
| 3 | 741 | 730 | 11 | 0 |
| 4 | 954 | 918 | 33 | 3 |
| 5 | 1099 | 1069 | 27 | 3 |
| **Total** | **5205** | **5111** | **75** | **19** |

## Recommendations

1. **🔴 Replace DANGER words (Priority 1):** These heteronyms and irregular words are very likely mispronounced. Source human recordings from Forvo.com, Cambridge Dictionary audio, or freedictionaryapi.dev.
2. **🟡 Spot-check WARN words (Priority 2):** Listen to ~50% sample. Foreign-origin and complex words may have subtle issues.
3. **🗑️ Clean orphan files (Priority 3):** Delete 133 unreferenced audio files to save ~15-20 MB.
4. **✅ File mapping is solid:** No action needed.
5. **✅ Coverage is complete:** Every word has audio on disk.