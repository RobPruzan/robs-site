nested_set = {(1,3,5,6),(1,2,3,8), (9,10,2,1)}
flattened_set = {}
for tup in nested_set:
  for integer in tup:
    flattened_set.add(integer)