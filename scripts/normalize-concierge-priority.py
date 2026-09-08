import json
from pathlib import Path

path = Path("data/concierge/beaches.priority.json")
data = json.loads(path.read_text(encoding="utf-8"))

kind_map = {
    "services": "service",
    "summer_bus_2026": "transport",
}
volatility_map = {
    "low": "stable",
    "medium": "seasonal",
    "high": "dynamic",
    "stable": "stable",
    "seasonal": "seasonal",
    "dynamic": "dynamic",
}

changed = False
for item in data:
    legacy = item.pop("operationalClaims", None)
    if not legacy:
        continue
    operations = item.setdefault("operations", [])
    for claim in legacy:
        operation = {
            "kind": kind_map.get(claim.get("key"), "other"),
            "value": claim["value"],
            "volatility": volatility_map.get(claim.get("volatility"), "dynamic"),
            "verification": {
                "status": "verified",
                "checkedAt": claim.get("checkedAt"),
                "sourceUrl": claim.get("source"),
            },
        }
        if claim.get("validFrom"):
            operation["validFrom"] = claim["validFrom"]
        if claim.get("validUntil"):
            operation["validUntil"] = claim["validUntil"]
        operations.append(operation)
    changed = True

if changed:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("normalized operationalClaims -> operations")
else:
    print("priority dataset already normalized")
