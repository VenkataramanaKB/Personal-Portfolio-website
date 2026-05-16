---
title: What Elections Taught Me About Engineering
pubDate: 2026-05-15T12:00:00
category: essays
---

I wrote *production code from the backseat of a car* because elections don’t wait.
*Elections are real-time systems*.
The level of concurrency is breathtaking.

If you had told me that I would work with the *largest political figures in TamilNadu*, I would have laughed. Cut to 2026 april, I have met names that are larger than life, been on the streets collecting political intelligence, writing code in car. 2026 Elections are indeed very personal and challenging.

**What was I building?**

Political Parties are a well-oiled machines.They have SOPs, hierachy, approvals and most intelligent operations that even corporates lacks.

The local representatives have vector database with your family tree and political inclination in it.

Is the process Perfect ? **No**.

Politics is still the least digitalised domain, people write names, phone numbers in ledgers and skim through 100s of pages to find out your house number. You might think this is a one time work but sadly they do this all over again for each elections! Apart from this there revisions in the electoral rolls, addition, deletion. However this process is an integral part in elections so parties aswell as the candidates themselves do this even though they have no choice left. That's why **[PlanPol](https://www.planpol.com/)** built ****PlanPol Booth****.

What exactly PlanPol Booth does is, it knows who your dad, mom is and maps you into a family. That's around 60% work the party representatives do.

Building PlanPol Booth was definitely not easy.

You might ask me why not 100%, its because of few data inconsistencies like

- பாண்டி s/o குமார், மீனா W/o பாண்டியன், they are husband and wife but the husband's name is spelt different.
- House Numbers are highly inconsistent and random

Yes, the instinct is to normalise and create families but we cannot risk the credibility for the sake of numbers. A small spelling normalisation will create huge impact on ground.

That is something that needs to be taken care of. I can say that **missing values are better than wrong values**!!!

---

**Did Politicians adapt to it?**

The perception of people changes the moment you meet them.

I ***urge builders to meet their customers, observe how the hold a glass of tea***, what gets them irriated, what passifies them. These informations are very much necessary to tailor what fits them.

The average age of politicians I met is thrice mine, they had phones with just 3G support, barely working displays. Even the ones with the most recent devices are not tech savy, that's what you'd think. But inspite of this they post in facebook, record videos, voice type passages. *Their usage of technology is just grounded and less complex*.

This gave me the confidence to take product decisions that many of my friends told me the UI is slightly complex but 60-year old party worker was spot on using it!

Yes, there were struggles in internet connectivity, device capability, storage. The product evolved incorporating these requirement and catering to the target segment.

---

**Impact?**

Our product played a key role in it's first elections, multiple constituencies.

We Engineered the Election.

Personally, it's a milestone for me aswell, first product being used by users.

The elections taught me that technology is not just a software problem.  
It is a human coordination problem at massive scale.

And building for that reality changed the way I think about engineering.