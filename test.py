from collections import defaultdict
import json

product_dict = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: defaultdict(list))))

product_dict["a"]["b"]["c"]["d"].append(2)
product_dict["a"]["b"]["c"]["d"].append(3)

print(json.dumps(dict(product_dict), indent=2))