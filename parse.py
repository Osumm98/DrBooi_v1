import re
with open(r"C:\Users\mrmaf\.gemini\antigravity-ide\brain\47ab7d0b-0e1e-4f73-b936-e4aec863fa59\.system_generated\steps\97\content.md", "r", encoding="utf-8") as f:
    html = f.read()

text = re.sub(r'<style.*?>.*?</style>', '', html, flags=re.DOTALL)
text = re.sub(r'<script.*?>.*?</script>', '', text, flags=re.DOTALL)
text = re.sub(r'<[^>]+>', '\n', text)
lines = [line.strip() for line in text.split('\n') if len(line.strip()) > 3]
for l in lines:
    if l not in ['Live Content', 'Description: Fetched live', '---']:
        print(l)
