---
 title: Advanced syntax
---
### Spaces
Queries use the plus sign `+` in place of the space character. Wherever you would use a space character, use a plus sign instead.
### Phrase matches
For phrase matches, use double quotation marks `" "` around the words. For example, `"multiple+myeloma"`.
### Grouping
To group several terms together, use parentheses `(` `)`. For example, `(patient.drug.medicinalproduct:cetirizine+loratadine+diphenhydramine)`. Terms separated by plus signs `+` are treated as in a boolean OR.
To join terms as in a boolean AND, use the term `+AND+`. For example, `(patient.drug.medicinalproduct:cetirizine+loratadine+diphenhydramine)+AND+serious:2` requires that *any* of the drug names match *and* that the field `serious` also match.