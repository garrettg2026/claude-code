---
description: Interactive assessment to find your top Louisiana Farm Bureau membership benefits
argument-hint: "[optional: brief description of your farming situation]"
allowed-tools: AskUserQuestion, Task, TodoWrite
---

# Louisiana Farm Bureau Benefits Guide

Welcome to the Louisiana Farm Bureau membership benefits assessment. Through a short series of questions I will identify which benefits will matter most to you, then generate a personalized guide tailored to your situation.

$ARGUMENTS

## Phase 1 — Your Connection to Agriculture

Use AskUserQuestion with a single question:

- **header:** "Your role"
- **question:** "How would you best describe your relationship to farming or rural Louisiana?"
- **multiSelect:** false
- **options:**
  - label: "Full-time farmer or rancher" — description: "Agriculture is your primary livelihood"
  - label: "Part-time farmer or rural landowner" — description: "You farm or own rural land alongside other income"
  - label: "Rural resident, non-farming" — description: "You live in a rural area but don't actively farm"
  - label: "Urban supporter or interested citizen" — description: "You live in a city but care about agriculture and Louisiana"

Store the answer as PROFILE_TYPE.

## Phase 2 — Farming Operations (Conditional)

Only ask Phase 2 questions if PROFILE_TYPE is "Full-time farmer or rancher" OR "Part-time farmer or rural landowner". Skip to Phase 3 for all other profiles.

Use AskUserQuestion with two questions in one call:

**Question A:**
- **header:** "Commodity"
- **question:** "Which best describes your primary commodity or land use?"
- **multiSelect:** false
- **options:**
  - label: "Row crops" — description: "Soybeans, corn, cotton, sugarcane, rice, or wheat"
  - label: "Cattle or livestock" — description: "Beef cattle, dairy, hogs, poultry, or other livestock"
  - label: "Specialty crops, horticulture, or forestry" — description: "Vegetables, fruit, nursery, timber, or mixed specialty"
  - label: "Mixed or diversified operation" — description: "Multiple commodity types"

**Question B:**
- **header:** "Operation scale"
- **question:** "How would you describe the scale of your operation?"
- **multiSelect:** false
- **options:**
  - label: "Large commercial" — description: "500+ acres or equivalent livestock scale"
  - label: "Mid-size family farm" — description: "100–500 acres or equivalent"
  - label: "Small farm or rural homestead" — description: "Under 100 acres"

Store answers as COMMODITY and SCALE.

## Phase 3 — Insurance Needs

Use AskUserQuestion:

- **header:** "Insurance"
- **question:** "Which types of insurance coverage are you actively looking for or currently underinsured on? Select all that apply."
- **multiSelect:** true
- **options:**
  - label: "Auto insurance" — description: "Personal vehicles and trucks"
  - label: "Home or property insurance" — description: "Primary residence, rental property, or vacation home"
  - label: "Farm and ranch / equipment insurance" — description: "Farm structures, equipment, livestock, farm liability"
  - label: "Life insurance" — description: "Term or whole life coverage"
  - label: "Health or supplemental health insurance" — description: "Medical coverage or hospital indemnity / critical illness plans"

Store as INSURANCE_NEEDS.

## Phase 4 — Financial and Savings Interests

Use AskUserQuestion:

- **header:** "Savings"
- **question:** "Which financial benefits interest you most? Select all that apply."
- **multiSelect:** true
- **options:**
  - label: "Travel discounts" — description: "Hotel and car rental discounts for personal or business travel"
  - label: "Prescription drug savings" — description: "Member discount card accepted at most Louisiana pharmacies"
  - label: "Farm input discounts" — description: "Seed, fertilizer, and fuel through LFBF partner programs"
  - label: "Agricultural lending (Farm Credit)" — description: "Preferred access to operating loans, real estate, and equipment financing"

Store as FINANCIAL_INTERESTS.

## Phase 5 — Advocacy Priorities

Use AskUserQuestion:

- **header:** "Policy issues"
- **question:** "Which policy or community areas matter most to you? Select all that apply."
- **multiSelect:** true
- **options:**
  - label: "State agricultural policy" — description: "LFBF advocacy during the Baton Rouge legislative session"
  - label: "Federal farm bill and USDA programs" — description: "Crop insurance, commodity titles, conservation funding"
  - label: "Rural community development and infrastructure" — description: "Rural roads, broadband, and community vitality"
  - label: "Environmental stewardship" — description: "Conservation programs and water quality initiatives"
  - label: "Young Farmers and next-generation opportunities" — description: "Programs supporting beginning farmers and ranchers"

Store as ADVOCACY_INTERESTS.

## Phase 6 — Situational Needs

Use AskUserQuestion:

- **header:** "Situations"
- **question:** "Are any of these situations relevant to you right now? Select all that apply."
- **multiSelect:** true
- **options:**
  - label: "Legal questions or disputes" — description: "Need referral to an agricultural or property attorney"
  - label: "Recent or potential disaster impact" — description: "Need information on LFBF's disaster relief assistance program"
  - label: "Commodity market information" — description: "Daily or weekly price updates for planning and marketing decisions"
  - label: "Children or grandchildren in school" — description: "Agricultural education programs available in Louisiana classrooms"

Store as SITUATIONAL_NEEDS.

## Phase 7 — Generate Personalized Report

Use TodoWrite to note "Generating your personalized benefits guide…"

Launch the benefits-matcher agent via Task with this prompt (substituting actual collected values):

"Generate a personalized Louisiana Farm Bureau benefits guide for a user with the following profile:
- Profile type: [PROFILE_TYPE]
- Commodity/land use: [COMMODITY — use 'N/A' if not collected]
- Operation scale: [SCALE — use 'N/A' if not collected]
- Insurance needs selected: [INSURANCE_NEEDS list]
- Financial interests selected: [FINANCIAL_INTERESTS list]
- Advocacy interests selected: [ADVOCACY_INTERESTS list]
- Situational needs selected: [SITUATIONAL_NEEDS list]

Produce a structured, warm, and specific benefits recommendation report as defined in your instructions."

## Phase 8 — Present Results and Offer Next Steps

Present the agent's report in full.

Then use AskUserQuestion:

- **header:** "Next step"
- **question:** "Would you like to go deeper on any of these areas?"
- **multiSelect:** false
- **options:**
  - label: "Learn about LFBF's advocacy and community work" — description: "See the broader impact LFBF has on all Louisiana citizens"
  - label: "How to join or find my local parish office" — description: "Get contact information and next steps for membership"
  - label: "I have all the information I need" — description: "Thank you — close the guide"

**If "Learn about LFBF's advocacy and community work":** Run the /farmers-bureau-benefits-guide:lfbf-about command inline by launching the advocacy-briefer agent via Task with the prompt: "The user wants to learn about Louisiana Farm Bureau's broader public benefit work — advocacy, Ag in the Classroom, Young Farmers programs, environmental stewardship, and rural community development. Provide the full structured overview as defined in your instructions."

**If "How to join or find my local parish office":** Respond with:

"To join Louisiana Farm Bureau or find your local parish Farm Bureau office:

- **Website:** www.lfbf.org
- **Phone:** 1-800-292-5330
- **Parish offices:** Louisiana Farm Bureau has offices in all 64 parishes. Your local office is your point of contact for membership, insurance quotes, and agricultural services.

Membership is open to ALL Louisiana residents — you do not need to be a farmer to join and access most benefits. Annual dues vary by parish; contact your local office for current rates."

**If "I have all the information I need":** Close warmly, thanking the user and noting they can run `/farmers-bureau-benefits-guide:benefits-guide` again at any time or visit www.lfbf.org.
