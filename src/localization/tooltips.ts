const toolTip = {
  en: {
    tipText: {
      linkText: "here.",
      brix: "Brix measures the amount of dissolved solids in solution. 1g of sucrose in 100ml of water is 1 Brix, so it is roughly the same as percent sugar. You can measure brix with a refractometer, calculate it by nutrition facts, or convert your SG to brix over on ExtraCalc to use custom sugar percentages in this calculator. ",
      volumeLines:
        "The first two lines only contain liquid ingredients, all lines on this calculator can be added by either volume or weight.",
      totalVolume:
        "This total volume is an estimate of only the fermentables in solution during primary fermentation, your actual volume WILL be higher if using high fruit loads.",
      totalSecondary:
        "This is the estimated volume of the entire batch including secondary fermentables. This calculator assumes that anything you listed above as a secondary ingredient will not be fermented on. ",
      estimatedFg:
        "Unless you are planning for this mead to stop early, it is best to leave this field at .996, this estimate will be close enough for most recipes.",
      delleUnits:
        "Delle units are a measure of microbial stability. The higher the number, the more likely the brew is stable without the need for additional additives or stabilization methods. Delle units are calculated based on the amount of residual sugar and the ABV of the brew. 73 delle units is considered stable by most, but the actual number varies. Alcohol tolerance is NOT considered in delle stability. Read more ",
      nutrientSg:
        "This is the difference in gravity, taking FG into account. For example, if your OG is listed as 1.100 and your FG is 1.010, this field will read 1.090. This can field can be edited.",
      offsetPpm:
        "Some musts contain some YAN by themselves. This calculator automatically assumes 25ppm per pound of fruit per gallon, but if you would like to change the offset the field is editable.",
      nitrogenRequirements:
        "Determined by your yeast strain. If your yeast is not on the list, and you do not know its nitrogen requirement, enter it as Other: Other Medium N Yeast. This field is also editable if you want to use a yeast at a different requirement level than typical.",
      preferredSchedule:
        "This calculator allows you to enter any combination of Fermaid O, K, and DAP. It is really up to you which nutrients or combinations you decide to use, but certain combos are better for certain situations. Read more about nutrients and schedules ",
      yan: "Yeast Assimilable Nitrogen (YAN) is the amount of nitrogen needed by your yeast to have a healthy fermentation. Your target YAN is determined by your initial gravity and your yeast's nitrogen requirements.",
      numberOfAdditions:
        "Staggered nutrient additions are useful in preventing temperature spikes during fermentation that can stress the yeast. Four nutrient additions is probably the most common regimen, but I personally use three additions or a single addition in most cases.",
      yeastAmount:
        "The yeast amount in this calculator is based on the gravity reading and total volume. The amount is editable, and I recommend that you round up to the nearest packet in most cases.",
      maxGpl:
        "These numbers are calculated based on the nutrient schedule you pick. They are editable if you choose, but that is not recommended unless you know what you're doing.",
      goFerm:
        "Type of Go-ferm effects the amount of water needed for rehydration and the effectiveness of the Fermaid O.",
      oneThird:
        "When 1/3 of the sugars in the must have been consumed. This number is often used for the timing of the final nutrient addition.",
      remainingYan:
        "If your remaining YAN is more than 0, you should consider adjusting the max g/L field. Keep in mind you should probably keep your amount of DAP under .96g/L for risk of off-flavors. Also the TTB limit on Fermaid K is .5g/L due to the limit on thiamine. This is not a concern for homebrewers.",
      stabilizers:
        "Potassium sorbate (k-sorb) AND potassium metabisulfite (k-meta) are both needed to prevent refermentation. They cannot be reliably used to STOP fermentation in most cases. Amounts of k-meta needed for stabilizing are based on your pH. MeadTools assumes 50ppm if you choose not to take a pH reading. K-sorb amount is based on your ABV. It is not effective above around 16%. More info can be found ",
      additives:
        "Any ingredient that doesn't provide fermentable sugars is best placed here. You can use one of the suggested ingredients or add your own.",
      campden:
        "Campden tablets vary quite a bit in the amount of free SO2 that they provide MeadTools assumes that one campden tablet provides 75PPM of free SO2.",
      benchTrials: {
        body: "Bench Trials are a complicated topic that require further research than I can easily provide here. Follow these links for additional information ",
        linkTexts: ["DtM Video, ", "Scott Labs Article, ", "Chef's Article."],
      },
    },
  },
  de: {
    tipText: {
      linkText: "hier.",
      brix: "Brix misst die Menge an gelösten Feststoffen in einer Flüssigkeit. 1g Haushaltszucker in 100ml Wasser sind 1 Brix, es sind also ungefähr der prozentuale Zuckeranteil. Du kannst die Einheit Brix mit einem Refraktometer messen, sie durch die Nährstoffgehaltsangaben berechnen oder mit dem entsprechenden Rechner den SG-Wert zu Brix umrechnen, um sie dann hier als Zuckeranteil zu verwenden.",
      volumeLines:
        "Die ersten beiden Reihen enthalten nur flüssige Zutaten. Alle Zutatenangaben können entweder nach Volumen oder Gewicht gemacht werden.",
      totalVolume:
        "Dieses Gesamtvolumen ist eine Schätzung nur unter Berücksichtigung der vergärbaren Zutaten im Ansatz während der Primärgärung. Dein tatsächliches Volumen WIRD höher sein, wenn du einen hohen Anteil an ganzen Früchte verwendest.",
      totalSecondary:
        'Dies ist das geschätzte Volumen des gesamten Ansatzes inklusive der vergärbaren Zutaten aus der Sekundärgärung. Die Berechnung nimmt an, dass alle Zutaten, die oben als "in Sekundärgärung" markiert wurden, nicht vergoren werden.',
      estimatedFg:
        "Wenn du nicht vor hast, die Gärung vorzeitig zu beenden, ist es vermutlich am besten, dieses Feld bei 0.996 zu belassen. Diese Schätzung wird für die meisten Rezepte genau genug sein.",
      delleUnits:
        "Delle-Einheiten sind eine Maßeinheit für mikrobielle Stabilität. Je höher die Zahl, desto wahrscheinlicher ist der Met/Wein stabil, ohne weitere Zusätze oder Stabilisierungsmethoden zu benötigen. Delle-Einheiten werden Anhand von Restzucker und Alkoholgehalt berechnet. 73 Delle-Einheiten werden von den meisten als stabil angesehen, aber der Wert variiert. Alkoholtoleranz wird bei der Dell-Stabilität NICHT berücksichtigt. Mehr dazu: ",
      nutrientSg:
        'Dies ist die Differenz an SG ("Specific Gravity" = spezifische Dichte), die die FG ("Final Gravity" = finale Dichte) berücksichtigt. Wenn zum Beispiel deine OG ("Original Gravity" = ursprüngliche Dichte) als 1.100 angegebene ist und deine FG als 1.010, wird dieses Feld 1.090 anzeigen. Dieses Feld kann verändert werden.',
      offsetPpm:
        'Manche Ansätze beinhalten bereits einige YAN ("Yeast Assimilable Nitrogen" = Von der Hefe verwendbarer Stickstoff). Dieser Rechner geht automatisch von 25ppm pro Pfund Frucht je Gallone aus.Dieser Wert kann verändert werden.',
      nitrogenRequirements:
        'Hängt vom verwendeten Hefestamm ab. Wenn deine Hefe nicht in dieser Liste ist und du ihren Stickstoffbedarf nicht kennst, nimm am besten "Andere: Andere Hefe mit mittlerem Stickstoffbedarf". Dieser Wert kann verändert werden, wenn du eine Hefe benutzen willst, die einen besonderen Bedarf hat.',
      preferredSchedule:
        "Dieser Rechner ermöglichst es dir, eine Kombination von Fermaid O, Fermaid K und DAP anzugeben. Es steht dir frei, für welche Nährstoffsorten und -kombinationen du dich entscheidest, aber bestimmte Zusammensetzungen sind für bestimmte Situationen besser geeignet. Mehr zu Nährstoffen und Plänen findest du ",
      yan: 'YAN ("Yeast Assimilable Nitrogen" = Von der Hefe verwendbarer Stickstoff) ist die Menge an Stickstoff, die deine Hefe für eine gesunde Gärung benötigt. Die benötigten Werte hängen von der verwendeten Hefe und der OG ("Original Gravity" = ursprüngliche Dichte) ab.',
      numberOfAdditions:
        "Gestaffelte Nährstoffgaben sind nützlich, um während der Gärung Temperaturspitzen zu vermeiden, die deine Hefe unnötigt stressen. Vier Nährstoffgaben sind vermutlich die geläufigste Vorgehensweise, aber ich persönlich bevorzuge drei Gaben oder manchmal sogar nur eine einzige.",
      yeastAmount:
        "Die Hefemenge in diesem Rechner basiert auf der Dichtemessung und dem Gesamtvolumen. Der Wert ist veränderbar und ich schlage vor, dass du in den meisten Fällen auf die nächsthöhere Päckchengröße aufrundest.",
      maxGpl:
        "Diese Werte errechnet sich basierend auf dem Nährstoffplan, den du dir aussuchst. Sie sind veränderbar, aber das ist nicht empfohlen, wenn du nicht genau weisst, was du tust.",
      goFerm:
        "Die GoFerm-Sorte verändert die Menge an Wasser, die für die Rehydration benötigt wird und beeinträchtigt die Effektivität von Fermaid O.",
      oneThird:
        'Der 1/3 SB ("Sugar Break") ist, wenn ein Drittel des Zuckers im Ansatz vergoren wurden. Diese Grenze wird häufig benutzt, um die letzte Nährstoffgabe einzuplanen.',
      remainingYan:
        'Wenn die verbleibenden YAN ("Yeast Assimilable Nitrogen" = Von der Hefe verwendbarer Stickstoff) höer als 0 sind, solltest du erwägen, die Angabe im maximalen g/L-Feld anzupassen. Denke daran, dass du die Menge an Diammoniumphosphat (oft "Hefenährsalz") am besten unter 0.96g/L halten solltest, um Fehlnoten zu vermeiden. Also the TTB limit on Fermaid K is .5g/L due to the limit on thiamine. This is not a concern for homebrewers.',
      stabilizers:
        "Kaliumsorbat und Kaliumdisulfit werden BEIDE zusammen benötigt um eine weitere Gärung zu unterbinden. Sie können in den meisten Fällen NICHT dazu genutzt werden, um eine laufende Gärung verlässlich zu beenden. Die benötigte Menge an Sulfit wird anhand des pH-Wertes bestimmt. MeadTools geht von 50 ppm aus, wenn du keine pH-Messung durchführen kannst oder möchtest. Die Menge an Sorbat hängt vom Alkoholgehalt ab. Es hat über 16% keinen Effekt mehr. Mehr Infos dazu finden sich ",
      additives:
        "Zutaten, die keine vergärbaren Zucker beinhalten, werden am besten hier aufgeführt. Du kannst eine der vorgeschlagenen Zusätze nehmen oder deinen eigenen nutzen.",
      campden:
        "Hinweis: Campden-Tabletten werden größtenteils nur noch in den USA als Alternative zu Kaliumdisulfitpulver verwendet. Campden-Tabletten variieren etwas in der Menge an freiem SO2, die sie enthalten. MeadTools geht bei der Berechnung davon aus, dass eine Campden-Tablette 75PPM freies SO2 enthält.",
      benchTrials: {
        body: "'Bench Trials' sind ein kompliziertes Thema, mit dem man sich vorher gründlich beschäftigen sollte. Hierzu finden sich hier einige nützliche Quellen: ",
        linkTexts: [
          "DtM-Video, ",
          "Artikel von Scott Labs, ",
          "Chefs Artikel.",
        ],
      },
    },
  },
};

export const toolTipTranslations = [toolTip.en, toolTip.de];
