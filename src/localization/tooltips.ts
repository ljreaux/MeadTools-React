const toolTip = {
  en: {
    tipText: {
      linkText: "here.",
      brix: "Brix measures the amount of dissolved solids in solution. 1g of sucrose in 100mg of water is 1 Brix, so it is roughly the same as percent sugar. You can measure brix with a refractometer, calculate it by nutrition facts, or convert your SG to brix over on ExtraCalc to use custom sugar percentages in this calculator. ",
      volumeLines:
        "The first two lines only contain liquid ingredients, all lines on this calculator can be added by either volume or weight.",
      totalVolume:
        "This total volume is an estimate of only the fermentables in solution during primary fermentation, your actual volume WILL be higher if using high fruit loads.",
      totalSecondary:
        "This is the estimated volume of the entire batch including secondary fermentables. This calculator assumes that anything you listed above as a secondary ingredient will not be fermented on. ",
      estimatedFg:
        "Unless you are planning for this mead to stop early, it is best to leave this field at .996, this estimate will be close enough for most recipes. If you added any secondary additions this estimate will be higher than 1.000, this estimate takes into account what the final backsweetened recipe should be.",
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
    },
  },
};

export const toolTipTranslations = [toolTip.en];
