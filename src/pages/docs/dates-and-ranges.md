---
 title: Dates and ranges
---
The openFDA API supports searching by *range* in date, numeric, or string fields.
- Specify an *inclusive* range by using square brackets `[min+TO+max]`. These include the values in the range. For example, `[1+TO+5]` will match **1** through **5**.
- Dates are simple to search by via range. For instance, `[2004-01-01+TO+2005-01-01]` will search for records between Jan 1, 2004 and Jan 1, 2005.