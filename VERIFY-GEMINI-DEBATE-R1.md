# Quality Audit Report: Dictionary Flaws

### 1. `caterpillar`
- **具体词条：** Word: `caterpillar`, Field: `definition`
- **具体问题：** The definition says 'a small animal with many legs that turns into a butterfly', but caterpillars also turn into moths.
- **测试用例：** If shown the definition, the student might assume caterpillars only turn into butterflies, excluding moth larvae.
- **外部证据：** Merriam-Webster: 'the elongated wormlike larva of a butterfly or moth'.

### 2. `bee`
- **具体词条：** Word: `bee`, Field: `definition`
- **具体问题：** The definition says 'a small flying insect that buzzes and can sting', but not all bees can sting (e.g., male drones and stingless bees).
- **测试用例：** If shown the definition, the student might falsely assume every bee has a stinger and can sting.
- **外部证据：** Oxford: 'an insect of a large group to which the honeybee belongs, including many solitary as well as social kinds' (many species are stingless).

### 3. `toad`
- **具体词条：** Word: `toad`, Field: `definition`
- **具体问题：** The definition says 'a small bumpy animal that hops and lives on land', but toads typically walk or make short hops rather than the prominent jumps characteristic of frogs, and they require water to breed.
- **测试用例：** If shown the definition, the student might mistakenly equate toad movement with frog jumping or assume they are completely independent of water.
- **外部证据：** Merriam-Webster: 'any of numerous anuran amphibians... distinguished from the related frogs by being more terrestrial in habit... and having a shorter stockier build with shorter hind legs'.

### 4. `whale`
- **具体词条：** Word: `whale`, Field: `definition`
- **具体问题：** The definition describes it as a 'very large sea animal', but many learners confuse 'animal' with 'fish' in aquatic contexts unless specifically identified as a mammal.
- **测试用例：** If asked 'Is a whale a fish or mammal based on this definition?', the student has no information to prevent them from classifying it as a fish.
- **外部证据：** Cambridge: 'a very large sea mammal that breathes air through a hole at the top of its head'.

### 5. `sandwich`
- **具体词条：** Word: `sandwich`, Field: `definition`
- **具体问题：** The definition says 'food made with bread and something inside', which is overly broad. It could describe a calzone, a pie, or a filled roll.
- **测试用例：** If given the definition, a student might incorrectly classify a hot pocket or meat pie as a sandwich.
- **外部证据：** Merriam-Webster: 'two or more slices of bread or a split roll having a filling in between'.

## 建议固化项
1. **Taxonomy Precision:** Ensure biological definitions account for closely related taxa (e.g., moth vs. butterfly) and avoid absolute statements for traits not shared by all members of a group (e.g., all bees sting).
2. **Category Boundaries:** For food and everyday objects, ensure the defining structural boundaries (e.g., "two slices" for a sandwich) are included to prevent overextension to functionally similar but structurally different items.
3. **Class Specification:** For ambiguous cases like marine mammals, explicitly use the biological class (mammal) rather than the generic "animal" to prevent common misconceptions.
