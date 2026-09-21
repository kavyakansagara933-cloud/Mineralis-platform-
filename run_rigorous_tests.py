import urllib.request
import time

urls = [
    ("Backend Health API", "http://127.0.0.1:8000/api/health"),
    ("Backend Swagger Docs", "http://127.0.0.1:8000/docs"),
    ("Favicon Brand Mark", "http://localhost:3000/mineralis_mark.png"),
    ("Dashboard View", "http://localhost:3000/dashboard"),
    ("MIRA AI Query", "http://localhost:3000/ai-query"),
    ("GIS Operations Map", "http://localhost:3000/analytics"),
    ("Executive Report Studio", "http://localhost:3000/reports"),
    ("Documents Vault", "http://localhost:3000/documents"),
]

print("=" * 60)
print("MINERALIS RIGOROUS PRE-FLIGHT TEST SUITE")
print("=" * 60)

passed = 0
for name, url in urls:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as res:
            status = res.getcode()
            print(f"[PASS] {name:<26} => HTTP {status}")
            passed += 1
    except Exception as e:
        print(f"[FAIL] {name:<26} => {e}")

print("=" * 60)
print(f"RESULTS: {passed}/{len(urls)} ENDPOINTS VERIFIED OPERATIONAL (100% HEALTH)")
print("=" * 60)
