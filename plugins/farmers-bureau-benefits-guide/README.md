# Louisiana Farm Bureau Benefits Guide

A Claude Code plugin that guides prospective Louisiana Farm Bureau members to the benefits they'll use most, and educates all Louisiana citizens about the broader advocacy and community work LFBF does on behalf of the state.

## Overview

Louisiana Farm Bureau Federation (LFBF) serves over 100,000 member families and advocates for Louisiana's agricultural community. This plugin makes it easy to:

1. **Discover your best benefits** — an interactive assessment learns your situation and produces a personalized, prioritized benefits guide
2. **Understand LFBF's public impact** — a comprehensive overview of LFBF's advocacy, education, and community programs that benefit all Louisiana citizens, farmer or not

## Commands

### `/farmers-bureau-benefits-guide:benefits-guide`

An interactive 6-question assessment that identifies the Louisiana Farm Bureau benefits most relevant to your situation. Takes about 2–3 minutes. Produces a personalized guide prioritized for your profile.

**Profiles supported:**
| Profile | Top benefits surfaced |
|---------|----------------------|
| Full-time farmer or rancher | Farm/ranch insurance, market price updates, disaster relief, Farm Credit, commodity committees |
| Part-time farmer or rural landowner | Property/farm insurance, farm input discounts, legal referral, ag services |
| Rural resident (non-farming) | Auto insurance, home insurance, prescription discount card, travel discounts |
| Urban supporter or interested citizen | Auto/home insurance, LFBF credit card, prescription discounts, advocacy awareness |

**Usage:**
```
/farmers-bureau-benefits-guide:benefits-guide
```
Or with context:
```
/farmers-bureau-benefits-guide:benefits-guide I have a 200-acre soybean farm in Concordia Parish
```

After the assessment, the command offers deeper dives into advocacy topics or membership enrollment guidance.

---

### `/farmers-bureau-benefits-guide:lfbf-about`

A standalone informational overview of LFBF's work beyond membership benefits. Covers the advocacy, education, stewardship, and community programs that benefit all Louisiana citizens — whether or not they are Farm Bureau members.

**Topics covered:**
- Legislative advocacy in Baton Rouge (right-to-farm, agricultural tax policy, rural infrastructure)
- Federal farm bill positions (commodity support, crop insurance, conservation programs)
- Ag in the Classroom (agricultural education in Louisiana schools statewide)
- Young Farmers and Ranchers program (leadership development, competitions, mentorship)
- Environmental stewardship and the farmer-as-conservationist philosophy
- Rural community development (broadband, hospital access, road funding)

**Usage:**
```
/farmers-bureau-benefits-guide:lfbf-about
```

---

## Agents

These agents are launched automatically by the commands above. They can also be used directly through Claude Code's agent system.

### `benefits-matcher` (green)

Receives a structured member profile from the assessment and generates a warm, specific, prioritized benefits recommendation report. Contains detailed knowledge of all LFBF benefit categories and the logic for matching profile types to relevant benefits. Instructs Claude never to quote specific premium rates — always directs users to their local parish office for actual quotes.

### `advocacy-briefer` (yellow)

Produces a comprehensive, five-section overview of LFBF's public benefit work — framed accessibly for both agricultural and non-agricultural audiences. Uses Louisiana-specific language and concrete examples to make LFBF's policy work tangible and relevant.

---

## Skill

### `lfbf-context` (auto-invoked)

Automatically activates when Louisiana Farm Bureau topics arise in conversation. Provides:
- Accurate organizational context (LFBF vs. LFBF Insurance vs. LFBF Foundation vs. parish Farm Bureaus)
- Quick-reference benefit categories
- Key factual guardrails (what to say and not say about pricing, enrollment, and program availability)
- Guidance on when to recommend each command

---

## Benefit Areas Covered

| Category | Benefits |
|----------|----------|
| Insurance | Auto, Home/Property, Farm & Ranch, Life, Supplemental Health |
| Financial | LFBF Visa credit card, Farm Credit lending, prescription drug discount card |
| Travel & Retail | Hotel discounts (Best Western, IHG, Wyndham), car rental (Enterprise, Hertz, National) |
| Agricultural Services | Market price updates, pest/disease alerts, farm management assistance, soil testing |
| Legal | Agricultural attorney referral network |
| Emergency | LFBF Disaster Relief Program (grant assistance after major disasters) |
| Community | Ag in the Classroom, Young Farmers & Ranchers, scholarships |
| Advocacy | State legislative advocacy, federal farm bill, rural development, environmental stewardship |

---

## Installation

Install this plugin through Claude Code's plugin system or by adding it to your `.claude/plugins` configuration.

---

## Contact Louisiana Farm Bureau

- **Website:** www.lfbf.org
- **Phone:** 1-800-292-5330
- **Local offices:** All 64 Louisiana parishes

Membership is open to all Louisiana residents. You do not need to be a farmer to join.

---

## Version

1.0.0

## License

MIT
